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

	const body = (await request.json()) as { urls?: string[] };
	const urls = body.urls;

	if (!Array.isArray(urls) || urls.length === 0) {
		return json({ error: 'urls must be a non-empty array' }, { status: 400 });
	}

	const results: { url: string; status: string; error?: string }[] = [];

	for (const url of urls) {
		try {
			const parsed = new URL(url);
			const domain = parsed.hostname.replace(/^www\./, '').toLowerCase();

			let [source] = await db.select().from(sources).where(eq(sources.url, url)).limit(1);
			if (!source) {
				[source] = await db.insert(sources).values({
					url,
					name: domain,
					type: 'other',
					isActive: true
				}).returning();
			}

			const scrapeData = await scrapeUrl(url, { sourceId: source.id, storage });
			await db.insert(scrapeResults).values(scrapeData).onConflictDoNothing();

			results.push({ url, status: 'ok' });
		} catch (e: any) {
			results.push({ url, status: 'error', error: e.message });
		}
	}

	const ok = results.filter(r => r.status === 'ok').length;
	const failed = results.filter(r => r.status === 'error').length;

	return json({ data: { scraped: ok, failed, total: urls.length, results } });
};
