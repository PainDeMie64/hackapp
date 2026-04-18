import { BedrockClient, parseJsonResponse } from '$lib/server/llm/index.js';
import { extractionResultSchema, type ExtractionResult } from './schemas.js';
import { EXTRACTION_SYSTEM_PROMPT } from './prompt.js';

export async function extractCompaniesFromText(
	text: string,
	sourceUrl: string,
	bedrock: BedrockClient
): Promise<ExtractionResult> {
	const truncated = text.slice(0, 100_000);

	const userMessage = `Analyse le texte suivant extrait de la page web ${sourceUrl} et extrais toutes les entreprises identifiees avec leurs signaux de prospection.

Reponds UNIQUEMENT avec un JSON valide (pas de markdown, pas de code fence). Voici le format EXACT attendu:

{"companies":[{"name":"...","domain":"...","description":"...","sector":"...","subsector":"...","locationCity":"...","locationCountry":"...","employeeCount":1000,"revenueEur":1000000,"revenueYear":2025,"techStack":["..."],"siren":"...","scoring":{"firmographic":{"signals":[{"text":"...","strength":"strong","source":"..."}],"confidence":"high"},"recruitment":{"signals":[],"confidence":"low"},"financial":{"signals":[],"confidence":"low"},"project":{"signals":[],"confidence":"low"},"intent":{"signals":[],"confidence":"low"},"regulatory":{"signals":[],"confidence":"low"},"competitive":{"signals":[],"confidence":"low"}},"disqualifiers":[]}]}

IMPORTANT: Chaque entreprise DOIT avoir un objet "scoring" avec les 7 dimensions (firmographic, recruitment, financial, project, intent, regulatory, competitive). Si pas d'info pour une dimension, mets signals: [] et confidence: "low".

<document>
${truncated}
</document>`;

	const result = await bedrock.converse(userMessage, {
		maxTokens: 8192,
		temperature: 0.1,
		system: EXTRACTION_SYSTEM_PROMPT,
	});

	const parsed = parseJsonResponse<unknown>(result.text);
	return extractionResultSchema.parse(parsed);
}
