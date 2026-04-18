import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db/index.js';
import { searches } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params, platform }) => {
	if (!platform?.env?.DB) {
		return json({ error: 'Database not configured' }, { status: 503 });
	}

	const db = getDb(platform.env.DB);
	const search = await db
		.select()
		.from(searches)
		.where(eq(searches.id, params.id))
		.get();

	if (!search) {
		return json({ error: 'Search not found' }, { status: 404 });
	}

	return json({ data: search });
};

export const PATCH: RequestHandler = async ({ params, request, platform }) => {
	if (!platform?.env?.DB) {
		return json({ error: 'Database not configured' }, { status: 503 });
	}

	const db = getDb(platform.env.DB);
	const body = (await request.json()) as Record<string, unknown>;

	const allowedFields = ['status', 'resultCount', 'bestScore', 'completedAt', 'errorMessage'] as const;
	const updateData: Record<string, unknown> = {};

	for (const field of allowedFields) {
		if (field in body) {
			updateData[field] = body[field];
		}
	}

	if (Object.keys(updateData).length === 0) {
		return json({ error: 'No valid fields to update' }, { status: 400 });
	}

	await db
		.update(searches)
		.set(updateData)
		.where(eq(searches.id, params.id));

	const updated = await db
		.select()
		.from(searches)
		.where(eq(searches.id, params.id))
		.get();

	if (!updated) {
		return json({ error: 'Search not found' }, { status: 404 });
	}

	return json({ data: updated });
};
