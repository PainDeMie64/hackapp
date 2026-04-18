import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';
import { companies, companyScores } from '$lib/server/db/schema';
import { desc, asc, eq, like, sql } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url, platform }) => {
	if (!platform?.env?.DB) {
		return json({ error: 'Database not configured' }, { status: 503 });
	}

	const db = getDb(platform.env.DB);

	const band = url.searchParams.get('band');
	const sector = url.searchParams.get('sector');
	const search = url.searchParams.get('search');
	const sortBy = url.searchParams.get('sort') || 'prospect_score';
	const order = url.searchParams.get('order') || 'desc';
	const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
	const offset = parseInt(url.searchParams.get('offset') || '0');

	const conditions = [];
	if (band) conditions.push(eq(companies.prospectBand, band));
	if (sector) conditions.push(eq(companies.sector, sector));
	if (search) conditions.push(like(companies.name, `%${search}%`));

	const where = conditions.length > 0
		? sql`${sql.join(conditions, sql` AND `)}`
		: undefined;

	const sortColumn = sortBy === 'name' ? companies.name
		: sortBy === 'sector' ? companies.sector
		: sortBy === 'employee_count' ? companies.employeeCount
		: sortBy === 'revenue_eur' ? companies.revenueEur
		: companies.prospectScore;

	const orderFn = order === 'asc' ? asc : desc;

	const [rows, countResult] = await Promise.all([
		db
			.select()
			.from(companies)
			.where(where)
			.orderBy(orderFn(sortColumn))
			.limit(limit)
			.offset(offset),
		db
			.select({ count: sql<number>`count(*)` })
			.from(companies)
			.where(where),
	]);

	return json({
		companies: rows,
		total: countResult[0]?.count ?? 0,
		limit,
		offset,
	});
};
