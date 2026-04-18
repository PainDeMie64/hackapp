import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';
import { companies, companyScores } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params, platform }) => {
	if (!platform?.env?.DB) {
		return json({ error: 'Database not configured' }, { status: 503 });
	}

	const db = getDb(platform.env.DB);
	const company = await db.select().from(companies).where(eq(companies.id, params.id)).get();

	if (!company) {
		return json({ error: 'Company not found' }, { status: 404 });
	}

	const scores = await db
		.select()
		.from(companyScores)
		.where(eq(companyScores.companyId, params.id))
		.all();

	const scoreDimensions = scores.map((s) => ({
		dimension: s.dimension,
		score: s.score,
		signals: s.signals ? JSON.parse(s.signals) : [],
		scoredAt: s.scoredAt,
	}));

	return json({
		...company,
		techStack: company.techStack ? JSON.parse(company.techStack) : [],
		scoreDimensions,
	});
};
