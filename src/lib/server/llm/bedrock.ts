import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';

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
	private client: BedrockRuntimeClient;
	private model: string;

	constructor(config: BedrockConfig) {
		this.model = config.model;
		this.client = new BedrockRuntimeClient({
			region: config.region,
			credentials: {
				accessKeyId: config.accessKeyId,
				secretAccessKey: config.secretAccessKey,
				sessionToken: config.sessionToken,
			},
		});
	}

	async converse(
		userMessage: string,
		opts: { maxTokens?: number; temperature?: number; system?: string } = {}
	): Promise<{ text: string; inputTokens: number; outputTokens: number }> {
		const { maxTokens = 4096, temperature = 0.1, system } = opts;

		let lastError: Error | null = null;
		for (let attempt = 0; attempt < 3; attempt++) {
			if (attempt > 0) {
				await new Promise(r => setTimeout(r, 1000 * Math.pow(3, attempt - 1)));
			}

			try {
				const command = new ConverseCommand({
					modelId: this.model,
					messages: [{ role: 'user', content: [{ text: userMessage }] }],
					inferenceConfig: { maxTokens, temperature },
					...(system ? { system: [{ text: system }] } : {}),
				});

				const response = await this.client.send(command);

				const text = response.output?.message?.content?.[0]?.text ?? '';
				return {
					text: cleanJsonResponse(text),
					inputTokens: response.usage?.inputTokens ?? 0,
					outputTokens: response.usage?.outputTokens ?? 0,
				};
			} catch (e: any) {
				if (e.name === 'ThrottlingException' || e.$metadata?.httpStatusCode >= 500) {
					lastError = e;
					continue;
				}
				throw new BedrockError(e.message ?? String(e), e.$metadata?.httpStatusCode ?? 500);
			}
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
