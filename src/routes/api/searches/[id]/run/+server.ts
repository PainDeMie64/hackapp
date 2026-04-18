import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { getDb } from '$lib/server/db/index.js';
import { searches } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { BedrockClient } from '$lib/server/llm/index.js';
import { runSearchPipeline } from '$lib/server/pipeline/search.js';

export const POST: RequestHandler = async ({ params, platform }) => {
	if (!platform?.env?.DB || !platform?.env?.STORAGE) {
		return json({ error: 'Platform bindings unavailable' }, { status: 500 });
	}

	const env = platform.env as unknown as Record<string, string> & { DB: D1Database; STORAGE: R2Bucket };

	if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY) {
		return json({ error: 'AWS credentials not configured in wrangler.jsonc vars' }, { status: 500 });
	}

	const db = getDb(env.DB);
	const storage = env.STORAGE;

	// ── Fetch the search record ────────────────────────────────────────
	const search = await db
		.select()
		.from(searches)
		.where(eq(searches.id, params.id))
		.get();

	if (!search) {
		return json({ error: 'Search not found' }, { status: 404 });
	}

	if (search.status === 'running') {
		return json({ error: 'Search is already running' }, { status: 409 });
	}

	// ── Build Bedrock client ───────────────────────────────────────────
	const bedrock = new BedrockClient({
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
		sessionToken: env.AWS_SESSION_TOKEN || undefined,
		region: env.AWS_REGION || 'us-west-2',
		model: env.BEDROCK_MODEL || 'mistral.mistral-large-2402-v1:0',
	});

	// ── Build pipeline params from search record ───────────────────────
	const regions: string[] = search.regions
		? ((): string[] => {
				try {
					const parsed: unknown = JSON.parse(search.regions);
					return Array.isArray(parsed) ? parsed : [search.regions];
				} catch {
					return [search.regions];
				}
			})()
		: [];

	const pipelineConfig = {
		db,
		storage,
		bedrock,
		searchId: params.id,
		params: {
			sector: search.sector,
			regions,
			prospectCount: search.prospectCount ?? 10,
			freeConditions: search.freeConditions ?? undefined,
			minRevenue: search.minRevenue ?? undefined,
			minHeadcount: search.minHeadcount ?? undefined,
			growthPotential: search.growthPotential ?? undefined,
			consultingUsage: search.consultingUsage ?? undefined,
		},
	};

	// ── Run pipeline in background ─────────────────────────────────────
	platform.ctx.waitUntil(runSearchPipeline(pipelineConfig));

	return json(
		{ data: { id: params.id, status: 'started', message: 'Search pipeline running in background via ctx.waitUntil()' } },
		{ status: 202 }
	);
};
