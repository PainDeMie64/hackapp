import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db/index.js';
import { searches } from '$lib/server/db/schema.js';
import { desc } from 'drizzle-orm';

export const GET: RequestHandler = async ({ platform }) => {
	if (!platform?.env?.DB) {
		return json({ error: 'Database not configured' }, { status: 503 });
	}

	const db = getDb(platform.env.DB);

	const rows = await db
		.select()
		.from(searches)
		.orderBy(desc(searches.createdAt))
		.all();

	return json({ data: rows });
};

export const POST: RequestHandler = async ({ request, platform }) => {
	if (!platform?.env?.DB) {
		return json({ error: 'Database not configured' }, { status: 503 });
	}

	const db = getDb(platform.env.DB);
	const body = (await request.json()) as {
		sector: string;
		regions?: string | null;
		prospectCount?: number | null;
		freeConditions?: string | null;
		minRevenue?: number | null;
		minHeadcount?: number | null;
		growthPotential?: string | null;
		consultingUsage?: string | null;
	};

	const searchId = crypto.randomUUID();

	await db.insert(searches).values({
		id: searchId,
		sector: body.sector,
		regions: body.regions ?? null,
		prospectCount: body.prospectCount ?? null,
		freeConditions: body.freeConditions ?? null,
		minRevenue: body.minRevenue ?? null,
		minHeadcount: body.minHeadcount ?? null,
		growthPotential: body.growthPotential ?? null,
		consultingUsage: body.consultingUsage ?? null,
		status: 'pending'
	});

	return json({ data: { id: searchId, status: 'pending' } }, { status: 201 });
};
