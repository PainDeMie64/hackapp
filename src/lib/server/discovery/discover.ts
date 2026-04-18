import type { Db } from '$lib/server/db/index.js';
import { sources, scrapeResults } from '$lib/server/db/schema.js';
import { eq, and } from 'drizzle-orm';
import { searchSerper, type SerperResult } from './serper.js';
import { buildSearchQueries, deduplicateUrls } from './queries.js';
import { scrapeUrl } from '$lib/server/scraper/scrape-url.js';

export interface DiscoveryConfig {
	db: Db;
	storage: R2Bucket;
	serperApiKey: string;
}

export interface DiscoveryResult {
	sourcesProcessed: number;
	queriesMade: number;
	urlsDiscovered: number;
	urlsScraped: number;
	errors: Array<{ source: string; error: string }>;
	durationMs: number;
}

const SCRAPE_CONCURRENCY = 5;

export async function discoverAndScrape(config: DiscoveryConfig): Promise<DiscoveryResult> {
	const { db, storage, serperApiKey } = config;
	const start = Date.now();
	const errors: DiscoveryResult['errors'] = [];

	const prioritySources = await db.select().from(sources).where(
		and(eq(sources.isActive, true), eq(sources.isPriority, true))
	);

	let totalQueries = 0;
	let allDiscoveredUrls: Array<{ url: string; sourceId: string }> = [];

	// Phase 1: Search for pages within each priority source
	for (const source of prioritySources) {
		try {
			const queries = buildSearchQueries(source);
			const results: SerperResult[] = [];

			for (const query of queries) {
				try {
					const searchResults = await searchSerper(query, serperApiKey, { num: 10 });
					results.push(...searchResults);
					totalQueries++;
					// Small delay between queries to respect Serper rate limits
					await new Promise(r => setTimeout(r, 200));
				} catch (e: unknown) {
					errors.push({ source: source.name ?? source.url, error: `Query failed: ${e instanceof Error ? e.message : String(e)}` });
				}
			}

			const urls = deduplicateUrls(results);
			for (const url of urls) {
				allDiscoveredUrls.push({ url, sourceId: source.id });
			}

			await db.update(sources)
				.set({ lastCrawledAt: new Date() })
				.where(eq(sources.id, source.id));
		} catch (e: unknown) {
			errors.push({ source: source.name ?? source.url, error: e instanceof Error ? e.message : String(e) });
		}
	}

	// Deduplicate across all sources
	const seen = new Set<string>();
	const uniqueUrls = allDiscoveredUrls.filter(({ url }) => {
		const key = url.split('?')[0].split('#')[0].replace(/\/+$/, '').toLowerCase();
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});

	// Phase 2: Scrape discovered URLs in batches
	let scraped = 0;
	for (let i = 0; i < uniqueUrls.length; i += SCRAPE_CONCURRENCY) {
		const batch = uniqueUrls.slice(i, i + SCRAPE_CONCURRENCY);
		const settled = await Promise.allSettled(
			batch.map(async ({ url, sourceId }) => {
				try {
					const data = await scrapeUrl(url, { sourceId, storage });
					await db.insert(scrapeResults).values(data);
					scraped++;
				} catch (e: unknown) {
					errors.push({ source: url, error: (e instanceof Error ? e.message : String(e)).substring(0, 100) });
				}
			})
		);
	}

	return {
		sourcesProcessed: prioritySources.length,
		queriesMade: totalQueries,
		urlsDiscovered: allDiscoveredUrls.length,
		urlsScraped: scraped,
		errors,
		durationMs: Date.now() - start,
	};
}
