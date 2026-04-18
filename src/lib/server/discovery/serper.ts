const SERPER_URL = 'https://google.serper.dev/search';

export interface SerperResult {
	title: string;
	link: string;
	snippet: string;
	position: number;
}

export async function searchSerper(
	query: string,
	apiKey: string,
	opts: { num?: number; gl?: string; hl?: string } = {}
): Promise<SerperResult[]> {
	const { num = 10, gl = 'fr', hl = 'fr' } = opts;

	const response = await fetch(SERPER_URL, {
		method: 'POST',
		headers: {
			'X-API-KEY': apiKey,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ q: query, num, gl, hl }),
	});

	if (!response.ok) {
		throw new Error(`Serper ${response.status}: ${await response.text()}`);
	}

	const data = await response.json() as {
		organic?: Array<{ title: string; link: string; snippet: string; position: number }>;
	};

	return (data.organic ?? []).map(r => ({
		title: r.title,
		link: r.link,
		snippet: r.snippet,
		position: r.position,
	}));
}
