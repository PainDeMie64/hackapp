import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';
import { companies } from '$lib/server/db/schema';
import { desc, like, eq, gte, and, sql } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url, platform }) => {
	if (!platform?.env?.DB) return json({ error: 'DB unavailable' }, { status: 503 });
	const db = getDb(platform.env.DB);

	const q = url.searchParams.get('q') || '';
	const sector = url.searchParams.get('sector');
	const band = url.searchParams.get('band');
	const region = url.searchParams.get('region');
	const minScore = url.searchParams.get('min_score');
	const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50'), 200);
	const offset = parseInt(url.searchParams.get('offset') ?? '0');

	const conditions = [];
	if (q) conditions.push(like(companies.name, `%${q}%`));
	if (sector) conditions.push(eq(companies.sector, sector));
	if (band) conditions.push(eq(companies.prospectBand, band));
	if (region) conditions.push(like(companies.locationCity, `%${region}%`));
	if (minScore) conditions.push(gte(companies.prospectScore, parseInt(minScore)));

	const where = conditions.length > 0 ? and(...conditions) : undefined;

	const [rows, countResult] = await Promise.all([
		db.select().from(companies).where(where)
			.orderBy(desc(companies.prospectScore))
			.limit(limit).offset(offset),
		db.select({ count: sql<number>`count(*)` }).from(companies).where(where),
	]);

	return json({
		data: rows,
		total: countResult[0]?.count ?? 0,
		limit, offset,
	});
};
