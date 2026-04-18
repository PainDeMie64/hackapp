/**
 * ConcurrencyPool — Per-domain rate-limited fetch pool for Cloudflare Workers.
 *
 * Design constraints:
 *   - Workers have no threads, no shared memory, no setInterval.
 *   - All concurrency is cooperative via Promises.
 *   - Must respect per-domain limits (max N simultaneous) and inter-request delay.
 *   - Must handle 1000 URLs across ~500 domains within a single invocation.
 *   - Workers have a ~30s wall-clock limit on subrequests (Pages: 50 subrequests,
 *     but ctx.waitUntil() background tasks have looser limits).
 *
 * Architecture:
 *   Per domain: a semaphore (bounded queue of promises) + a timestamp of the last
 *   request completion. Global: a pool-wide concurrency cap so we do not open 500
 *   connections at once and exhaust the runtime's socket budget.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PoolOptions {
	/** Max concurrent requests to the same host. Default: 2. */
	perDomainConcurrency?: number;
	/** Minimum ms between finishing one request and starting the next to the same host. Default: 1200. */
	perDomainDelayMs?: number;
	/** Global max concurrent requests across all domains. Default: 50. */
	globalConcurrency?: number;
	/** Timeout per individual fetch in ms. Default: 15000. */
	fetchTimeoutMs?: number;
	/** Custom fetch function (for testing or instrumentation). Defaults to global fetch. */
	fetchFn?: typeof fetch;
}

export interface FetchTask<T = Response> {
	url: string;
	/** Override the Request init per-task. */
	init?: RequestInit;
	/**
	 * Optional transform applied to the Response before it is returned.
	 * If omitted the raw Response is returned.
	 */
	transform?: (response: Response, url: string) => Promise<T> | T;
}

export interface FetchResult<T = Response> {
	url: string;
	ok: boolean;
	value?: T;
	error?: string;
	/** Wall-clock ms from queue entry to result. */
	durationMs: number;
}

export interface PoolStats {
	total: number;
	succeeded: number;
	failed: number;
	totalDurationMs: number;
	/** Domains that had at least one failure. */
	failedDomains: string[];
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function extractHost(url: string): string {
	try {
		return new URL(url).hostname;
	} catch {
		// If the URL is malformed, treat the whole string as the "host"
		// so it still gets rate-limited as a unique domain.
		return url;
	}
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Semaphore — bounded concurrency primitive
// ---------------------------------------------------------------------------

class Semaphore {
	private current = 0;
	private readonly waiting: Array<() => void> = [];

	constructor(private readonly max: number) {}

	async acquire(): Promise<void> {
		if (this.current < this.max) {
			this.current++;
			return;
		}
		// Park until a slot opens.
		return new Promise<void>((resolve) => {
			this.waiting.push(resolve);
		});
	}

	release(): void {
		if (this.waiting.length > 0) {
			// Hand the slot directly to the next waiter (no decrement/increment dance).
			const next = this.waiting.shift()!;
			next();
		} else {
			this.current--;
		}
	}

	get active(): number {
		return this.current;
	}

	get queued(): number {
		return this.waiting.length;
	}
}

// ---------------------------------------------------------------------------
// DomainLane — per-domain semaphore + delay enforcement
// ---------------------------------------------------------------------------

class DomainLane {
	private readonly semaphore: Semaphore;
	private lastCompleted = 0;

	constructor(
		private readonly delayMs: number,
		concurrency: number
	) {
		this.semaphore = new Semaphore(concurrency);
	}

	/**
	 * Acquire a slot and, if needed, wait for the inter-request delay
	 * relative to the last completed request on this domain.
	 */
	async enter(): Promise<void> {
		await this.semaphore.acquire();

		// Enforce minimum gap since last completion on this domain.
		const elapsed = Date.now() - this.lastCompleted;
		if (this.lastCompleted > 0 && elapsed < this.delayMs) {
			await delay(this.delayMs - elapsed);
		}
	}

	leave(): void {
		this.lastCompleted = Date.now();
		this.semaphore.release();
	}
}

// ---------------------------------------------------------------------------
// ConcurrencyPool — the public API
// ---------------------------------------------------------------------------

export class ConcurrencyPool {
	private readonly perDomainConcurrency: number;
	private readonly perDomainDelayMs: number;
	private readonly fetchTimeoutMs: number;
	private readonly fetchFn: typeof fetch;
	private readonly globalSemaphore: Semaphore;
	private readonly lanes = new Map<string, DomainLane>();

	constructor(opts: PoolOptions = {}) {
		this.perDomainConcurrency = opts.perDomainConcurrency ?? 2;
		this.perDomainDelayMs = opts.perDomainDelayMs ?? 1200;
		this.fetchTimeoutMs = opts.fetchTimeoutMs ?? 15_000;
		this.fetchFn = opts.fetchFn ?? fetch;
		this.globalSemaphore = new Semaphore(opts.globalConcurrency ?? 50);
	}

	private getLane(host: string): DomainLane {
		let lane = this.lanes.get(host);
		if (!lane) {
			lane = new DomainLane(this.perDomainDelayMs, this.perDomainConcurrency);
			this.lanes.set(host, lane);
		}
		return lane;
	}

	// ------------------------------------------------------------------
	// Single fetch — public, but usually you want fetchAll.
	// ------------------------------------------------------------------

	async fetch<T = Response>(task: FetchTask<T>): Promise<FetchResult<T>> {
		const start = Date.now();
		const host = extractHost(task.url);
		const lane = this.getLane(host);

		try {
			// Acquire both the global slot and the per-domain slot.
			// Order: global first so we do not starve other domains while waiting
			// for a per-domain slot.
			await this.globalSemaphore.acquire();
			try {
				await lane.enter();
			} catch (err) {
				// If lane.enter fails, release the global slot.
				this.globalSemaphore.release();
				throw err;
			}

			try {
				const controller = new AbortController();
				const timer = setTimeout(() => controller.abort(), this.fetchTimeoutMs);

				const init: RequestInit = {
					...task.init,
					signal: controller.signal,
					headers: {
						'User-Agent': 'HackApp-Bot/1.0 (commercial intelligence; +https://hackapp.example)',
						'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
						'Accept-Language': 'en-US,en;q=0.5,fr;q=0.3',
						...(task.init?.headers as Record<string, string> ?? {}),
					},
				};

				const response = await this.fetchFn(task.url, init);
				clearTimeout(timer);

				const value = task.transform
					? await task.transform(response, task.url)
					: (response as unknown as T);

				return {
					url: task.url,
					ok: response.ok,
					value,
					durationMs: Date.now() - start,
				};
			} finally {
				lane.leave();
				this.globalSemaphore.release();
			}
		} catch (err) {
			return {
				url: task.url,
				ok: false,
				error: err instanceof Error ? err.message : String(err),
				durationMs: Date.now() - start,
			};
		}
	}

	// ------------------------------------------------------------------
	// Batch fetch — the primary entry point for scraping 1000 URLs.
	// ------------------------------------------------------------------

	/**
	 * Process an array of fetch tasks respecting all concurrency and delay
	 * constraints. Results are returned in the same order as the input tasks.
	 *
	 * Internally every task is launched immediately — the semaphores take care
	 * of parking tasks that exceed limits. This means domains with fewer queued
	 * tasks finish faster, while hot domains drip-feed at the configured rate.
	 */
	async fetchAll<T = Response>(
		tasks: FetchTask<T>[],
		onProgress?: (completed: number, total: number) => void
	): Promise<FetchResult<T>[]> {
		let completed = 0;
		const total = tasks.length;

		const promises = tasks.map(async (task, _index) => {
			const result = await this.fetch(task);
			completed++;
			onProgress?.(completed, total);
			return result;
		});

		return Promise.all(promises);
	}

	/**
	 * Convenience: fetch all and return aggregated stats plus results.
	 */
	async fetchAllWithStats<T = Response>(
		tasks: FetchTask<T>[],
		onProgress?: (completed: number, total: number) => void
	): Promise<{ results: FetchResult<T>[]; stats: PoolStats }> {
		const start = Date.now();
		const results = await this.fetchAll(tasks, onProgress);

		const failedDomains = new Set<string>();
		let succeeded = 0;
		let failed = 0;

		for (const r of results) {
			if (r.ok) {
				succeeded++;
			} else {
				failed++;
				failedDomains.add(extractHost(r.url));
			}
		}

		return {
			results,
			stats: {
				total: results.length,
				succeeded,
				failed,
				totalDurationMs: Date.now() - start,
				failedDomains: Array.from(failedDomains),
			},
		};
	}

	/**
	 * Process tasks in streaming fashion, yielding results as they complete
	 * rather than waiting for all to finish. Useful for writing partial
	 * results to D1/R2 as they arrive.
	 */
	async *fetchStream<T = Response>(
		tasks: FetchTask<T>[]
	): AsyncGenerator<FetchResult<T>, void, unknown> {
		// Channel: each task pushes its result into a shared queue that the
		// generator drains. We use a simple resolver-chain pattern since
		// Workers lack ReadableStream BYOB or async iterators on streams.
		type QueueItem = { result: FetchResult<T>; next: Promise<QueueItem> };

		let resolveNext!: (item: QueueItem) => void;
		let head = new Promise<QueueItem>((r) => { resolveNext = r; });

		let remaining = tasks.length;
		if (remaining === 0) return;

		for (const task of tasks) {
			// Fire-and-forget — semaphores handle the actual scheduling.
			this.fetch(task).then((result) => {
				const currentResolve = resolveNext;
				const nextPromise = new Promise<QueueItem>((r) => { resolveNext = r; });
				currentResolve({ result, next: nextPromise });
			});
		}

		while (remaining > 0) {
			const item = await head;
			head = item.next;
			remaining--;
			yield item.result;
		}
	}
}
