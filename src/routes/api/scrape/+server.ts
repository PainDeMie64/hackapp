import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { getDb } from '$lib/server/db/index.js';
import { sources, scrapeResults } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { scrapeUrl } from '$lib/server/scraper/scrape-url.js';
import { getStorage } from '$lib/server/storage/index.js';

export const POST: RequestHandler = async ({ request, platform }) => {
	const db = getDb(platform!.env.DB);
	const storage = getStorage(platform);

	const body = (await request.json()) as { source_ids?: string[] };

	const allSources = body.source_ids
		? await Promise.all(body.source_ids.map(id =>
			db.select().from(sources).where(eq(sources.id, id)).then(r => r[0])
		)).then(r => r.filter(Boolean))
		: await db.select().from(sources).where(eq(sources.isActive, true));

	if (allSources.length === 0) {
		return json({ error: 'No active sources found' }, { status: 404 });
	}

	const results: { url: string; sourceId: string; status: string; error?: string }[] = [];

	for (const source of allSources) {
		try {
			const scrapeData = await scrapeUrl(source.url, { sourceId: source.id, storage });
			await db.insert(scrapeResults).values(scrapeData).onConflictDoNothing();

			await db.update(sources)
				.set({ lastCrawledAt: new Date(), isActive: true })
				.where(eq(sources.id, source.id));

			results.push({ url: source.url, sourceId: source.id, status: 'ok' });
		} catch (e: any) {
			await db.update(sources)
				.set({ isActive: false })
				.where(eq(sources.id, source.id));

			results.push({ url: source.url, sourceId: source.id, status: 'error', error: e.message });
		}
	}

	const ok = results.filter(r => r.status === 'ok').length;
	const failed = results.filter(r => r.status === 'error').length;

	return json({ data: { scraped: ok, failed, total: allSources.length, results } });
};
