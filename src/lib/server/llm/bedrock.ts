import { signRequest } from './sigv4.js';

export interface BedrockConfig {
	accessKeyId: string;
	secretAccessKey: string;
	sessionToken?: string;
	region: string;
	model: string;
}

export class BedrockError extends Error {
	constructor(message: string, public readonly statusCode: number) {
		super(message);
	}
}

export class BedrockClient {
	private config: BedrockConfig;

	constructor(config: BedrockConfig) {
		this.config = config;
	}

	async converse(
		userMessage: string,
		opts: { maxTokens?: number; temperature?: number; system?: string } = {}
	): Promise<{ text: string; inputTokens: number; outputTokens: number }> {
		const { maxTokens = 4096, temperature = 0.1, system } = opts;
		const url = `https://bedrock-runtime.${this.config.region}.amazonaws.com/model/${encodeURIComponent(this.config.model)}/converse`;

		const body: Record<string, unknown> = {
			messages: [{ role: 'user', content: [{ text: userMessage }] }],
			inferenceConfig: { maxTokens, temperature },
		};
		if (system) {
			body.system = [{ text: system }];
		}

		const bodyStr = JSON.stringify(body);

		let lastError: Error | null = null;
		for (let attempt = 0; attempt < 3; attempt++) {
			if (attempt > 0) {
				await new Promise(r => setTimeout(r, 1000 * Math.pow(3, attempt - 1)));
			}

			const signed = await signRequest({
				method: 'POST',
				url,
				headers: {
					'content-type': 'application/json',
					'accept': 'application/json',
				},
				body: bodyStr,
				region: this.config.region,
				service: 'bedrock-runtime',
				accessKeyId: this.config.accessKeyId,
				secretAccessKey: this.config.secretAccessKey,
				sessionToken: this.config.sessionToken,
			});

			const response = await fetch(signed.url, {
				method: 'POST',
				headers: signed.headers,
				body: signed.body,
			});

			if (response.status === 429 || response.status >= 500) {
				lastError = new BedrockError(`Bedrock ${response.status}`, response.status);
				continue;
			}

			if (!response.ok) {
				const errText = await response.text();
				throw new BedrockError(`Bedrock ${response.status}: ${errText.substring(0, 200)}`, response.status);
			}

			const data = await response.json() as {
				output: { message: { content: Array<{ text: string }> } };
				usage: { inputTokens: number; outputTokens: number };
			};

			const text = data.output.message.content[0]?.text ?? '';
			return {
				text: cleanJsonResponse(text),
				inputTokens: data.usage.inputTokens,
				outputTokens: data.usage.outputTokens,
			};
		}

		throw lastError ?? new BedrockError('Bedrock call failed after 3 retries', 500);
	}
}

function cleanJsonResponse(raw: string): string {
	let text = raw.trim();
	if (text.startsWith('```')) {
		text = text.replace(/^```\w*\n?/, '').replace(/\n?```$/, '').trim();
	}
	return text;
}

export function parseJsonResponse<T>(raw: string): T {
	try {
		return JSON.parse(raw);
	} catch {
		const match = raw.match(/[\[{][\s\S]*[\]}]/);
		if (match) {
			let cleaned = match[0].replace(/,\s*([}\]])/g, '$1');
			return JSON.parse(cleaned);
		}
		throw new Error(`Failed to parse LLM JSON: ${raw.substring(0, 200)}`);
	}
}
