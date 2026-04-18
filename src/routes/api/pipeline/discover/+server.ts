import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { getDb } from '$lib/server/db/index.js';
import { discoverAndScrape } from '$lib/server/discovery/index.js';

export const POST: RequestHandler = async ({ url, platform }) => {
	if (!platform?.env?.DB || !platform?.env?.STORAGE) {
		return json({ error: 'Platform bindings unavailable' }, { status: 500 });
	}

	const env = platform.env as unknown as Record<string, string> & { DB: D1Database; STORAGE: R2Bucket };
	const serperApiKey = env.SERPER_API_KEY;

	if (!serperApiKey) {
		return json({ error: 'SERPER_API_KEY not configured in wrangler.jsonc vars' }, { status: 500 });
	}

	const db = getDb(env.DB);
	const storage = env.STORAGE;

	const sync = url.searchParams.get('sync') === 'true';
	const config = { db, storage, serperApiKey };

	if (sync) {
		const result = await discoverAndScrape(config);
		const httpStatus = result.errors.length === 0 ? 200 : result.urlsScraped > 0 ? 207 : 502;
		return json({ data: result }, { status: httpStatus });
	}

	platform.ctx.waitUntil(discoverAndScrape(config));
	return json({ data: { status: 'started', message: 'Discovery + scraping running in background' } }, { status: 202 });
};
