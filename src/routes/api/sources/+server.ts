import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { getDb } from '$lib/server/db/index.js';
import { sources } from '$lib/server/db/schema.js';

export const GET: RequestHandler = async ({ platform }) => {
	if (!platform?.env?.DB) return json({ error: 'Platform bindings unavailable' }, { status: 500 });
	const db = getDb(platform.env.DB);
	const all = await db.select().from(sources);
	return json({ data: all, total: all.length });
};
