/**
 * Distributed concurrency coordination for multi-Worker-invocation scraping.
 *
 * Problem: When multiple Worker invocations (or cron triggers) run in parallel,
 * each has its own ConcurrencyPool — they do not know about each other. Without
 * coordination, two Workers could hammer the same domain simultaneously.
 *
 * Solution A — KV-based lease system (simpler, eventually consistent):
 *   Each Worker writes a lease to KV before fetching a domain. Other Workers
 *   check the lease and back off. Leases expire via KV's TTL.
 *
 * Solution B — Durable Object per domain (stronger, but more infrastructure):
 *   A DomainRateLimiter DO acts as a single-threaded coordinator for each
 *   domain. Workers call it to acquire/release slots. The DO enforces limits
 *   with perfect consistency.
 *
 * This file implements both. The application chooses based on available bindings.
 */

// ---------------------------------------------------------------------------
// Solution A — KV Lease Coordinator
// ---------------------------------------------------------------------------

export interface KVLeaseOptions {
	/** KV namespace binding. */
	kv: KVNamespace;
	/** Max concurrent scrapes of the same domain across all Workers. Default: 2. */
	maxPerDomain?: number;
	/** Lease TTL in seconds. Default: 30. */
	leaseTtlSeconds?: number;
	/** Key prefix in KV. Default: "scrape-lease:". */
	prefix?: string;
}

/**
 * KV-based lease system for distributed domain-level concurrency control.
 *
 * Mechanism:
 *   - For domain "example.com" with max 2, we use KV keys:
 *       scrape-lease:example.com:0
 *       scrape-lease:example.com:1
 *   - Each key holds the Worker invocation ID and expiration timestamp.
 *   - To acquire: iterate slots 0..max-1, try to claim an empty or expired one.
 *   - To release: delete the key.
 *   - KV TTL acts as a dead-worker failsafe.
 *
 * Consistency note: KV is eventually consistent. Two Workers reading "empty"
 * at the same millisecond could both claim the same slot. This is acceptable
 * for scraping — the worst case is 3 requests instead of 2 to a domain, which
 * is benign. For stronger guarantees, use the Durable Object approach.
 */
export class KVLeaseCoordinator {
	private readonly kv: KVNamespace;
	private readonly maxPerDomain: number;
	private readonly leaseTtlSeconds: number;
	private readonly prefix: string;
	private readonly workerId: string;
	private readonly heldLeases = new Set<string>();

	constructor(opts: KVLeaseOptions) {
		this.kv = opts.kv;
		this.maxPerDomain = opts.maxPerDomain ?? 2;
		this.leaseTtlSeconds = opts.leaseTtlSeconds ?? 30;
		this.prefix = opts.prefix ?? 'scrape-lease:';
		this.workerId = crypto.randomUUID();
	}

	private slotKey(domain: string, slot: number): string {
		return `${this.prefix}${domain}:${slot}`;
	}

	/**
	 * Try to acquire a lease for the given domain.
	 * Returns the slot number on success, or null if all slots are taken.
	 */
	async acquire(domain: string): Promise<number | null> {
		const now = Date.now();

		for (let slot = 0; slot < this.maxPerDomain; slot++) {
			const key = this.slotKey(domain, slot);
			const existing = await this.kv.get(key);

			if (existing) {
				// Check if the lease is logically expired (KV TTL may not have
				// cleaned it up yet due to eventual consistency).
				try {
					const lease = JSON.parse(existing) as { worker: string; expiresAt: number };
					if (lease.expiresAt > now && lease.worker !== this.workerId) {
						continue; // Slot is actively held by another worker.
					}
				} catch {
					// Corrupted value — overwrite it.
				}
			}

			// Claim this slot.
			const lease = {
				worker: this.workerId,
				expiresAt: now + this.leaseTtlSeconds * 1000,
				acquiredAt: now,
			};
			await this.kv.put(key, JSON.stringify(lease), {
				expirationTtl: this.leaseTtlSeconds,
			});

			this.heldLeases.add(key);
			return slot;
		}

		return null; // All slots occupied.
	}

	/**
	 * Release a previously acquired lease.
	 */
	async release(domain: string, slot: number): Promise<void> {
		const key = this.slotKey(domain, slot);
		await this.kv.delete(key);
		this.heldLeases.delete(key);
	}

	/**
	 * Release all leases held by this coordinator instance.
	 * Call this in a finally block or ctx.waitUntil() cleanup.
	 */
	async releaseAll(): Promise<void> {
		const deletions = Array.from(this.heldLeases).map((key) => this.kv.delete(key));
		await Promise.all(deletions);
		this.heldLeases.clear();
	}

	/**
	 * Acquire with retry + exponential backoff.
	 * Will wait up to ~maxWaitMs for a slot to free up.
	 */
	async acquireWithRetry(
		domain: string,
		maxWaitMs: number = 10_000
	): Promise<number> {
		const start = Date.now();
		let backoff = 200;

		while (Date.now() - start < maxWaitMs) {
			const slot = await this.acquire(domain);
			if (slot !== null) return slot;

			// Wait with jitter before retrying.
			const jitter = Math.random() * backoff * 0.5;
			await new Promise((r) => setTimeout(r, backoff + jitter));
			backoff = Math.min(backoff * 1.5, 3000);
		}

		throw new Error(
			`KVLeaseCoordinator: timeout acquiring lease for ${domain} after ${maxWaitMs}ms`
		);
	}
}

// ---------------------------------------------------------------------------
// Solution B — Durable Object Rate Limiter
// ---------------------------------------------------------------------------

/**
 * A Durable Object that acts as a single-threaded rate limiter for one domain.
 *
 * Usage:
 *   1. Declare in wrangler.jsonc:
 *      "durable_objects": { "bindings": [{ "name": "DOMAIN_LIMITER", "class_name": "DomainRateLimiter" }] }
 *   2. In your Worker, get the stub by domain:
 *      const id = env.DOMAIN_LIMITER.idFromName("example.com");
 *      const stub = env.DOMAIN_LIMITER.get(id);
 *   3. POST /acquire to get a slot, POST /release to free it.
 *
 * The DO holds state in memory (transient). If it hibernates, all leases
 * are implicitly released — which is the correct behavior since the Workers
 * that held them are also dead by that point.
 */
export class DomainRateLimiter implements DurableObject {
	private readonly maxConcurrency: number;
	private readonly delayMs: number;
	private activeCount = 0;
	private lastCompletedAt = 0;
	private readonly waiters: Array<() => void> = [];

	constructor(
		private readonly state: DurableObjectState,
		_env: unknown
	) {
		// Configuration could come from env, but sane defaults for scraping.
		this.maxConcurrency = 2;
		this.delayMs = 1200;
	}

	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;

		if (request.method === 'POST' && path === '/acquire') {
			return this.handleAcquire();
		}

		if (request.method === 'POST' && path === '/release') {
			return this.handleRelease();
		}

		if (request.method === 'GET' && path === '/status') {
			return Response.json({
				active: this.activeCount,
				max: this.maxConcurrency,
				queued: this.waiters.length,
				lastCompletedAt: this.lastCompletedAt,
			});
		}

		return new Response('Not found', { status: 404 });
	}

	private async handleAcquire(): Promise<Response> {
		if (this.activeCount < this.maxConcurrency) {
			this.activeCount++;
			await this.enforceDelay();
			return Response.json({ granted: true, slot: this.activeCount - 1 });
		}

		// Park the request until a slot opens. This blocks the fetch() call
		// on the calling Worker's side (the subrequest will hang until we
		// resolve), which is the desired backpressure behavior.
		await new Promise<void>((resolve) => {
			this.waiters.push(resolve);
		});

		await this.enforceDelay();
		return Response.json({ granted: true, slot: this.activeCount - 1 });
	}

	private handleRelease(): Response {
		if (this.waiters.length > 0) {
			// Hand the slot to the next waiter.
			const next = this.waiters.shift()!;
			this.lastCompletedAt = Date.now();
			next();
		} else if (this.activeCount > 0) {
			this.activeCount--;
			this.lastCompletedAt = Date.now();
		}

		return Response.json({ released: true, active: this.activeCount });
	}

	private async enforceDelay(): Promise<void> {
		if (this.lastCompletedAt > 0) {
			const elapsed = Date.now() - this.lastCompletedAt;
			if (elapsed < this.delayMs) {
				await new Promise((r) => setTimeout(r, this.delayMs - elapsed));
			}
		}
	}
}

// ---------------------------------------------------------------------------
// Client wrapper for the Durable Object
// ---------------------------------------------------------------------------

export interface DOCoordinatorOptions {
	/** The DOMAIN_LIMITER Durable Object namespace binding. */
	namespace: DurableObjectNamespace;
}

/**
 * Client-side helper that wraps the DomainRateLimiter DO calls.
 * Use this in your Worker to acquire/release slots with clean syntax.
 */
export class DOLeaseCoordinator {
	private readonly namespace: DurableObjectNamespace;

	constructor(opts: DOCoordinatorOptions) {
		this.namespace = opts.namespace;
	}

	private getStub(domain: string): DurableObjectStub {
		const id = this.namespace.idFromName(domain);
		return this.namespace.get(id);
	}

	async acquire(domain: string): Promise<{ granted: boolean; slot: number }> {
		const stub = this.getStub(domain);
		const response = await stub.fetch('https://do-internal/acquire', {
			method: 'POST',
		});
		return response.json();
	}

	async release(domain: string): Promise<void> {
		const stub = this.getStub(domain);
		await stub.fetch('https://do-internal/release', { method: 'POST' });
	}

	/**
	 * Execute a callback while holding a domain lease. Automatically
	 * releases on completion or error.
	 */
	async withLease<T>(domain: string, fn: () => Promise<T>): Promise<T> {
		await this.acquire(domain);
		try {
			return await fn();
		} finally {
			await this.release(domain);
		}
	}
}
