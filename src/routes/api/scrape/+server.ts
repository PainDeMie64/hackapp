import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { getDb } from '$lib/server/db/index.js';
import { sources, scrapeResults } from '$lib/server/db/schema.js';
import { eq, inArray, desc } from 'drizzle-orm';
import { scrapeUrl } from '$lib/server/scraper/scrape-url.js';
import { getStorage } from '$lib/server/storage/index.js';

const MAX_BATCH = 20;
const CONCURRENCY = 5;

export const GET: RequestHandler = async ({ platform, url }) => {
	if (!platform?.env?.DB) return json({ error: 'Platform bindings unavailable' }, { status: 500 });
	const db = getDb(platform.env.DB);

	const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50'), 200);
	const recent = await db.select({
		id: scrapeResults.id,
		url: scrapeResults.url,
		finalUrl: scrapeResults.finalUrl,
		statusCode: scrapeResults.statusCode,
		title: scrapeResults.title,
		wordCount: scrapeResults.wordCount,
		sourceId: scrapeResults.sourceId,
		llmStatus: scrapeResults.llmStatus,
		scrapedAt: scrapeResults.scrapedAt,
		scrapeDurationMs: scrapeResults.scrapeDurationMs,
	}).from(scrapeResults)
		.orderBy(desc(scrapeResults.scrapedAt))
		.limit(limit);

	return json({ data: recent, total: recent.length });
};

export const POST: RequestHandler = async ({ request, platform }) => {
	if (!platform?.env?.DB || !platform?.env?.STORAGE) {
		return json({ error: 'Platform bindings unavailable' }, { status: 500 });
	}
	const db = getDb(platform.env.DB);
	const storage = platform.env.STORAGE;

	let body: { source_ids?: string[] } = {};
	try {
		const text = await request.text();
		if (text.trim()) body = JSON.parse(text);
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	let allSources;
	if (body.source_ids && body.source_ids.length > 0) {
		allSources = await db.select().from(sources).where(inArray(sources.id, body.source_ids));
		const found = new Set(allSources.map(s => s.id));
		const missing = body.source_ids.filter(id => !found.has(id));
		if (missing.length > 0) {
			return json({ error: 'Sources not found', missing_ids: missing }, { status: 404 });
		}
	} else {
		allSources = await db.select().from(sources).where(eq(sources.isActive, true));
	}

	if (allSources.length === 0) {
		return json({ error: 'No active sources found' }, { status: 404 });
	}

	if (allSources.length > MAX_BATCH && !body.source_ids) {
		return json({
			error: `Too many active sources (${allSources.length}). Pass specific source_ids or limit active sources to ${MAX_BATCH}.`,
			active_count: allSources.length
		}, { status: 400 });
	}

	const results: { url: string; sourceId: string; status: string; error?: string }[] = [];

	for (let i = 0; i < allSources.length; i += CONCURRENCY) {
		const batch = allSources.slice(i, i + CONCURRENCY);
		const settled = await Promise.allSettled(
			batch.map(async (source) => {
				try {
					const scrapeData = await scrapeUrl(source.url, { sourceId: source.id, storage });
					await db.insert(scrapeResults).values(scrapeData);
					await db.update(sources)
						.set({ lastCrawledAt: new Date() })
						.where(eq(sources.id, source.id));
					return { url: source.url, sourceId: source.id, status: 'ok' as const };
				} catch (e: unknown) {
					const msg = e instanceof Error ? e.message : String(e);
					return { url: source.url, sourceId: source.id, status: 'error' as const, error: msg.substring(0, 200) };
				}
			})
		);

		for (const result of settled) {
			if (result.status === 'fulfilled') {
				results.push(result.value);
			}
		}
	}

	const ok = results.filter(r => r.status === 'ok').length;
	const failed = results.filter(r => r.status === 'error').length;
	const status = failed === 0 ? 'ok' : ok === 0 ? 'all_failed' : 'partial';
	const httpStatus = failed === 0 ? 200 : ok === 0 ? 502 : 207;

	return json({ status, data: { scraped: ok, failed, total: allSources.length, results } }, { status: httpStatus });
};
