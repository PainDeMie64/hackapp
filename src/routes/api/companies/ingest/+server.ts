import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';
import { runPipeline } from '$lib/server/prospect/pipeline';
import { BedrockClient } from '$lib/server/llm/index.js';

function makeBedrock(env: Record<string, string>): BedrockClient {
	return new BedrockClient({
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
		sessionToken: env.AWS_SESSION_TOKEN || undefined,
		region: env.AWS_REGION || 'us-west-2',
		model: env.BEDROCK_MODEL || 'mistral.mistral-large-2402-v1:0',
	});
}

export const POST: RequestHandler = async ({ request, platform }) => {
	if (!platform?.env?.DB) {
		return json({ error: 'Database not configured' }, { status: 503 });
	}

	const contentType = request.headers.get('content-type') ?? '';
	const db = getDb(platform.env.DB);
	const bedrock = makeBedrock(platform.env as unknown as Record<string, string>);

	if (contentType.includes('multipart/form-data')) {
		const formData = await request.formData();
		const files = formData.getAll('files') as File[];

		if (files.length === 0) {
			return json({ error: 'No files provided' }, { status: 400 });
		}

		const results = [];
		for (const file of files) {
			if (!file.name.toLowerCase().endsWith('.pdf')) {
				results.push({ file: file.name, error: 'Not a PDF file' });
				continue;
			}

			try {
				const buffer = await file.arrayBuffer();
				const { PDFParse } = await import('pdf-parse');
				const parser = new PDFParse({ data: new Uint8Array(buffer) });
				const textResult = await parser.getText();

				const result = await runPipeline(
					db,
					textResult.text,
					`upload://${file.name}`,
					file.name,
					bedrock
				);

				results.push({ file: file.name, ...result });
			} catch (e) {
				results.push({
					file: file.name,
					error: e instanceof Error ? e.message : String(e),
				});
			}
		}

		return json({ results });
	}

	if (contentType.includes('application/json')) {
		const body = (await request.json()) as { text?: string; sourceUrl?: string; sourceName?: string };
		const { text, sourceUrl, sourceName } = body;

		if (!text || !sourceUrl) {
			return json({ error: 'text and sourceUrl required' }, { status: 400 });
		}

		const result = await runPipeline(db, text, sourceUrl, sourceName, bedrock);
		return json(result);
	}

	return json({ error: 'Unsupported content type' }, { status: 415 });
};
