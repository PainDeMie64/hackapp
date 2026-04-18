/**
 * EnrichmentScraper — orchestrates fetching ~1000 URLs for the enrichment
 * pipeline using ConcurrencyPool.
 *
 * This is the integration layer between the concurrency primitives and the
 * hackapp enrichment logic (SPEC.md Phase B, Step 4).
 */

import { ConcurrencyPool, type FetchTask, type FetchResult, type PoolStats } from './pool.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScrapeTarget {
	/** The URL to fetch. */
	url: string;
	/** Company ID this URL relates to (for routing results back). */
	companyId: string;
	/** Optional source ID from the sources table. */
	sourceId?: string;
	/** Additional metadata passed through to results. */
	meta?: Record<string, unknown>;
}

export interface ScrapedPage {
	url: string;
	companyId: string;
	sourceId?: string;
	html: string;
	statusCode: number;
	contentType: string;
	fetchedAt: number;
	meta?: Record<string, unknown>;
}

export interface ScrapeReport {
	stats: PoolStats;
	pages: ScrapedPage[];
	errors: Array<{ url: string; companyId: string; error: string }>;
}

export interface ScraperOptions {
	/** Max concurrent requests to the same host. Default: 2. */
	perDomainConcurrency?: number;
	/** Minimum ms between requests to the same host. Default: 1200. */
	perDomainDelayMs?: number;
	/** Global max concurrent requests. Default: 50. */
	globalConcurrency?: number;
	/** Per-request timeout in ms. Default: 15000. */
	fetchTimeoutMs?: number;
	/** Max response body size in bytes. Default: 2MB. */
	maxBodyBytes?: number;
	/** Progress callback. */
	onProgress?: (completed: number, total: number) => void;
}

// ---------------------------------------------------------------------------
// EnrichmentScraper
// ---------------------------------------------------------------------------

export class EnrichmentScraper {
	private readonly pool: ConcurrencyPool;
	private readonly maxBodyBytes: number;

	constructor(private readonly opts: ScraperOptions = {}) {
		this.pool = new ConcurrencyPool({
			perDomainConcurrency: opts.perDomainConcurrency ?? 2,
			perDomainDelayMs: opts.perDomainDelayMs ?? 1200,
			globalConcurrency: opts.globalConcurrency ?? 50,
			fetchTimeoutMs: opts.fetchTimeoutMs ?? 15_000,
		});
		this.maxBodyBytes = opts.maxBodyBytes ?? 2 * 1024 * 1024;
	}

	/**
	 * Scrape all targets, returning structured results suitable for passing
	 * to the LLM extraction step.
	 */
	async scrapeAll(targets: ScrapeTarget[]): Promise<ScrapeReport> {
		const tasks: FetchTask<ScrapedPage | null>[] = targets.map((target) => ({
			url: target.url,
			init: {
				redirect: 'follow' as RequestRedirect,
			},
			transform: async (response: Response, url: string): Promise<ScrapedPage | null> => {
				const contentType = response.headers.get('content-type') ?? '';

				// Skip non-HTML responses (PDFs, images, etc.)
				if (!contentType.includes('text/html') && !contentType.includes('text/plain') && !contentType.includes('application/xhtml')) {
					return null;
				}

				// Read body with size guard.
				const reader = response.body?.getReader();
				if (!reader) return null;

				const chunks: Uint8Array[] = [];
				let totalSize = 0;

				try {
					while (true) {
						const { done, value } = await reader.read();
						if (done) break;
						totalSize += value.byteLength;
						if (totalSize > this.maxBodyBytes) {
							reader.cancel();
							break;
						}
						chunks.push(value);
					}
				} catch {
					// Partial read is fine — we use whatever we got.
				}

				const decoder = new TextDecoder();
				const html = chunks.map((c) => decoder.decode(c, { stream: true })).join('') + decoder.decode();

				return {
					url,
					companyId: target.companyId,
					sourceId: target.sourceId,
					html,
					statusCode: response.status,
					contentType,
					fetchedAt: Date.now(),
					meta: target.meta,
				};
			},
		}));

		const { results, stats } = await this.pool.fetchAllWithStats(tasks, this.opts.onProgress);

		const pages: ScrapedPage[] = [];
		const errors: Array<{ url: string; companyId: string; error: string }> = [];

		for (let i = 0; i < results.length; i++) {
			const result = results[i];
			const target = targets[i];

			if (result.ok && result.value) {
				pages.push(result.value);
			} else {
				errors.push({
					url: target.url,
					companyId: target.companyId,
					error: result.error ?? 'Empty or non-HTML response',
				});
			}
		}

		return { stats, pages, errors };
	}

	/**
	 * Streaming variant — yields ScrapedPage results as they arrive.
	 * Use this when you want to start LLM processing before all fetches complete.
	 */
	async *scrapeStream(
		targets: ScrapeTarget[]
	): AsyncGenerator<ScrapedPage | { error: string; url: string; companyId: string }> {
		const targetMap = new Map(targets.map((t) => [t.url, t]));

		const tasks: FetchTask<ScrapedPage | null>[] = targets.map((target) => ({
			url: target.url,
			init: { redirect: 'follow' as RequestRedirect },
			transform: async (response: Response, url: string): Promise<ScrapedPage | null> => {
				const contentType = response.headers.get('content-type') ?? '';
				if (!contentType.includes('text/html') && !contentType.includes('text/plain') && !contentType.includes('application/xhtml')) {
					return null;
				}

				const text = await response.text();
				const html = text.length > this.maxBodyBytes
					? text.slice(0, this.maxBodyBytes)
					: text;

				return {
					url,
					companyId: target.companyId,
					sourceId: target.sourceId,
					html,
					statusCode: response.status,
					contentType,
					fetchedAt: Date.now(),
					meta: target.meta,
				};
			},
		}));

		for await (const result of this.pool.fetchStream(tasks)) {
			const target = targetMap.get(result.url);
			if (!target) continue;

			if (result.ok && result.value) {
				yield result.value;
			} else {
				yield {
					error: result.error ?? 'Empty or non-HTML response',
					url: target.url,
					companyId: target.companyId,
				};
			}
		}
	}
}

// ---------------------------------------------------------------------------
// Helpers: group URLs by domain for analysis / logging
// ---------------------------------------------------------------------------

export function groupByDomain(targets: ScrapeTarget[]): Map<string, ScrapeTarget[]> {
	const groups = new Map<string, ScrapeTarget[]>();
	for (const target of targets) {
		try {
			const host = new URL(target.url).hostname;
			const list = groups.get(host) ?? [];
			list.push(target);
			groups.set(host, list);
		} catch {
			// Malformed URL — put in a catch-all group.
			const list = groups.get('__invalid__') ?? [];
			list.push(target);
			groups.set('__invalid__', list);
		}
	}
	return groups;
}

/**
 * Estimate wall-clock time for a batch given the pool configuration.
 *
 * Useful for showing the user "enrichment will take approximately X minutes"
 * before kicking off a large batch.
 */
export function estimateDuration(
	targets: ScrapeTarget[],
	opts: { perDomainConcurrency?: number; perDomainDelayMs?: number; globalConcurrency?: number; avgFetchMs?: number } = {}
): { estimatedMs: number; estimatedMinutes: number; domainCount: number; maxUrlsPerDomain: number } {
	const groups = groupByDomain(targets);
	const perDomainConcurrency = opts.perDomainConcurrency ?? 2;
	const perDomainDelayMs = opts.perDomainDelayMs ?? 1200;
	const globalConcurrency = opts.globalConcurrency ?? 50;
	const avgFetchMs = opts.avgFetchMs ?? 2000;

	// For each domain, time = ceil(urls / concurrency) * (avgFetch + delay).
	// But domains run in parallel, capped by globalConcurrency.
	const domainTimes: number[] = [];
	let maxUrlsPerDomain = 0;

	groups.forEach((urls) => {
		const batches = Math.ceil(urls.length / perDomainConcurrency);
		const time = batches * (avgFetchMs + perDomainDelayMs);
		domainTimes.push(time);
		maxUrlsPerDomain = Math.max(maxUrlsPerDomain, urls.length);
	});

	// Sort descending — the longest domains dominate.
	domainTimes.sort((a, b) => b - a);

	// With globalConcurrency parallel lanes, wall-clock ~ max of
	// top ceil(domains/global) domain times.
	// Simplified: the bottleneck is the single slowest domain if
	// we have enough global slots, otherwise it is the sum of the
	// top domains divided by global concurrency.
	const waves = Math.ceil(groups.size / globalConcurrency);
	const estimatedMs = waves > 1
		? domainTimes.slice(0, globalConcurrency).reduce((a, b) => a + b, 0) / globalConcurrency * waves
		: domainTimes[0] ?? 0;

	return {
		estimatedMs,
		estimatedMinutes: Math.ceil(estimatedMs / 60_000),
		domainCount: groups.size,
		maxUrlsPerDomain,
	};
}
