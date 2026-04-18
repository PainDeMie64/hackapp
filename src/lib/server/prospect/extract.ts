import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';
import { extractionResultSchema, type ExtractionResult } from './schemas.js';
import { EXTRACTION_SYSTEM_PROMPT } from './prompt.js';

export async function extractCompaniesFromText(
	text: string,
	sourceUrl: string,
	_apiKey?: string
): Promise<ExtractionResult> {
	const client = new AnthropicBedrock({
		awsRegion: process.env.AWS_DEFAULT_REGION || 'us-west-2',
	});

	const truncated = text.slice(0, 100_000);

	const response = await client.messages.create({
		model: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
		max_tokens: 8192,
		system: EXTRACTION_SYSTEM_PROMPT,
		messages: [
			{
				role: 'user',
				content: `Analyse le texte suivant extrait de la page web ${sourceUrl} et extrais toutes les entreprises identifiees avec leurs signaux de prospection.

Reponds UNIQUEMENT avec un JSON valide (pas de markdown, pas de code fence). Voici le format EXACT attendu:

{"companies":[{"name":"...","domain":"...","description":"...","sector":"...","subsector":"...","locationCity":"...","locationCountry":"...","employeeCount":1000,"revenueEur":1000000,"revenueYear":2025,"techStack":["..."],"siren":"...","scoring":{"firmographic":{"signals":[{"text":"...","strength":"strong","source":"..."}],"confidence":"high"},"recruitment":{"signals":[],"confidence":"low"},"financial":{"signals":[],"confidence":"low"},"project":{"signals":[],"confidence":"low"},"intent":{"signals":[],"confidence":"low"},"regulatory":{"signals":[],"confidence":"low"},"competitive":{"signals":[],"confidence":"low"}},"disqualifiers":[]}]}

IMPORTANT: Chaque entreprise DOIT avoir un objet "scoring" avec les 7 dimensions (firmographic, recruitment, financial, project, intent, regulatory, competitive). Si pas d'info pour une dimension, mets signals: [] et confidence: "low".

<document>
${truncated}
</document>`,
			},
		],
	});

	const content = response.content[0];
	if (content.type !== 'text') {
		throw new Error('Unexpected response type from Claude API');
	}

	const raw = content.text;
	const parsed = parseLooseJson(raw);

	return extractionResultSchema.parse(parsed);
}

function parseLooseJson(text: string): unknown {
	try {
		return JSON.parse(text);
	} catch {
		// Strip markdown fences
		let cleaned = text.replace(/^```(?:json)?\s*/m, '').replace(/\s*```$/m, '');
		// Extract the outermost JSON object
		const match = cleaned.match(/\{[\s\S]*\}/);
		if (!match) throw new Error('No JSON found in Claude response');
		cleaned = match[0];
		// Fix trailing commas before } or ]
		cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
		// Fix unescaped newlines inside strings (crude but handles common cases)
		cleaned = cleaned.replace(/(?<=:\s*"[^"]*)\n(?=[^"]*")/g, '\\n');
		try {
			return JSON.parse(cleaned);
		} catch {
			// Last resort: try to fix truncated JSON by closing brackets
			let depth = 0;
			for (const ch of cleaned) {
				if (ch === '{' || ch === '[') depth++;
				if (ch === '}' || ch === ']') depth--;
			}
			while (depth > 0) {
				cleaned += cleaned.lastIndexOf('[') > cleaned.lastIndexOf('{') ? ']' : '}';
				depth--;
			}
			return JSON.parse(cleaned);
		}
	}
}
