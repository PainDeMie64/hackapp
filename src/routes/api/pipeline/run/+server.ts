import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { getDb } from '$lib/server/db/index.js';
import { BedrockClient } from '$lib/server/llm/index.js';
import { runFullPipeline } from '$lib/server/pipeline/index.js';

export const POST: RequestHandler = async ({ url, platform }) => {
	if (!platform?.env?.DB || !platform?.env?.STORAGE) {
		return json({ error: 'Platform bindings unavailable' }, { status: 500 });
	}

	const env = platform.env as unknown as Record<string, string> & { DB: D1Database; STORAGE: R2Bucket };

	if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY) {
		return json({ error: 'AWS credentials not configured in wrangler.jsonc vars' }, { status: 500 });
	}

	const db = getDb(env.DB);
	const storage = env.STORAGE;
	const bedrock = new BedrockClient({
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
		sessionToken: env.AWS_SESSION_TOKEN || undefined,
		region: env.AWS_REGION || 'us-west-2',
		model: env.BEDROCK_MODEL || 'mistral.mistral-large-2402-v1:0',
	});

	const sync = url.searchParams.get('sync') === 'true';
	const config = { db, storage, bedrock, serperApiKey: env.SERPER_API_KEY || undefined };

	if (sync) {
		const result = await runFullPipeline(config);
		const httpStatus = result.status === 'ok' ? 200 : result.status === 'partial' ? 207 : 502;
		return json({ data: result }, { status: httpStatus });
	}

	platform.ctx.waitUntil(runFullPipeline(config));
	return json({ data: { status: 'started', message: 'Pipeline running in background via ctx.waitUntil()' } }, { status: 202 });
};
