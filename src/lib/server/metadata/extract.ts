import type { PageMetadata, FaviconEntry } from './types.js';

/**
 * Decode common HTML entities that appear in text nodes.
 * HTMLRewriter's text handler delivers raw text with entities preserved,
 * so we decode the most common ones manually.
 */
function decodeEntities(raw: string): string {
	return raw
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&apos;/g, "'")
		.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

/**
 * Extract structured metadata from an HTML Response using Cloudflare's
 * HTMLRewriter — a streaming, zero-copy HTML parser that runs on the edge.
 *
 * This function consumes the Response body (it must not have been read yet).
 * It returns a fully-populated PageMetadata object; missing fields are null.
 *
 * Usage:
 *   const resp = await fetch('https://example.com');
 *   const meta = await extractMetadata(resp);
 */
export async function extractMetadata(response: Response): Promise<PageMetadata> {
	// ── Mutable state that handlers will write into ──────────────────────
	const meta: PageMetadata = {
		title: null,
		description: null,
		keywords: null,
		language: null,
		canonicalUrl: null,
		og: { title: null, description: null, image: null, type: null, url: null },
		twitter: { title: null, description: null, card: null, image: null },
		jsonLd: [],
		favicons: [],
	};

	// Title is captured across potentially multiple text chunks.
	let capturingTitle = false;
	let titleChunks: string[] = [];

	// JSON-LD blocks can span multiple text chunks too.
	let capturingJsonLd = false;
	let jsonLdChunks: string[] = [];

	// ── Build the rewriter ──────────────────────────────────────────────
	const rewriter = new HTMLRewriter()

		// <html lang="...">
		.on('html', {
			element(el) {
				meta.language = el.getAttribute('lang');
			},
		})

		// <title>...</title>
		.on('title', {
			element() {
				capturingTitle = true;
				titleChunks = [];
			},
			text(chunk) {
				if (capturingTitle) {
					titleChunks.push(chunk.text);
					if (chunk.lastInTextNode) {
						capturingTitle = false;
						const raw = decodeEntities(titleChunks.join('').trim());
						if (raw) meta.title = raw;
					}
				}
			},
		})

		// <meta name="..." content="..."> and <meta property="..." content="...">
		.on('meta', {
			element(el) {
				const content = el.getAttribute('content');
				if (content === null) return;

				// name-based meta tags (description, keywords, twitter:*)
				const name = el.getAttribute('name')?.toLowerCase();
				if (name) {
					switch (name) {
						case 'description':
							meta.description = content;
							break;
						case 'keywords':
							meta.keywords = content;
							break;
						case 'twitter:title':
							meta.twitter.title = content;
							break;
						case 'twitter:description':
							meta.twitter.description = content;
							break;
						case 'twitter:card':
							meta.twitter.card = content;
							break;
						case 'twitter:image':
							meta.twitter.image = content;
							break;
					}
				}

				// property-based meta tags (og:*)
				const property = el.getAttribute('property')?.toLowerCase();
				if (property) {
					switch (property) {
						case 'og:title':
							meta.og.title = content;
							break;
						case 'og:description':
							meta.og.description = content;
							break;
						case 'og:image':
							meta.og.image = content;
							break;
						case 'og:type':
							meta.og.type = content;
							break;
						case 'og:url':
							meta.og.url = content;
							break;
						// Some sites put twitter tags as property instead of name
						case 'twitter:title':
							meta.twitter.title ??= content;
							break;
						case 'twitter:description':
							meta.twitter.description ??= content;
							break;
						case 'twitter:card':
							meta.twitter.card ??= content;
							break;
						case 'twitter:image':
							meta.twitter.image ??= content;
							break;
					}
				}
			},
		})

		// <link rel="canonical" href="...">
		// <link rel="icon|shortcut icon|apple-touch-icon" href="...">
		.on('link', {
			element(el) {
				const rel = el.getAttribute('rel')?.toLowerCase();
				const href = el.getAttribute('href');
				if (!rel || !href) return;

				if (rel === 'canonical') {
					meta.canonicalUrl = href;
					return;
				}

				const faviconRels = ['icon', 'shortcut icon', 'apple-touch-icon', 'apple-touch-icon-precomposed'];
				if (faviconRels.includes(rel)) {
					const entry: FaviconEntry = {
						href,
						rel,
						type: el.getAttribute('type'),
						sizes: el.getAttribute('sizes'),
					};
					meta.favicons.push(entry);
				}
			},
		})

		// <script type="application/ld+json">...</script>
		.on('script[type="application/ld+json"]', {
			element() {
				capturingJsonLd = true;
				jsonLdChunks = [];
			},
			text(chunk) {
				if (capturingJsonLd) {
					jsonLdChunks.push(chunk.text);
					if (chunk.lastInTextNode) {
						capturingJsonLd = false;
						const raw = jsonLdChunks.join('').trim();
						if (raw) {
							try {
								meta.jsonLd.push(JSON.parse(raw));
							} catch {
								// Malformed JSON-LD — skip silently.
								// In production you might want to log this.
							}
						}
					}
				}
			},
		});

	// ── Run the rewriter ────────────────────────────────────────────────
	// HTMLRewriter.transform() returns a new Response whose body is a
	// ReadableStream. We must consume that stream for the handlers to fire.
	const transformed = rewriter.transform(response);
	await transformed.arrayBuffer();

	return meta;
}

/**
 * Convenience: fetch a URL and extract its metadata in one call.
 */
export async function fetchAndExtractMetadata(
	url: string,
	init?: RequestInit,
): Promise<PageMetadata> {
	const response = await fetch(url, {
		...init,
		headers: {
			'User-Agent': 'HackApp-Bot/1.0 (metadata extraction)',
			'Accept': 'text/html,application/xhtml+xml',
			...init?.headers,
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
	}

	return extractMetadata(response);
}

/**
 * Build a "best guess" title and description by cascading through
 * available metadata fields in priority order.
 */
export function resolveBestTitle(meta: PageMetadata): string | null {
	return meta.og.title ?? meta.twitter.title ?? meta.title ?? getJsonLdField(meta, 'name');
}

export function resolveBestDescription(meta: PageMetadata): string | null {
	return meta.og.description ?? meta.twitter.description ?? meta.description ?? getJsonLdField(meta, 'description');
}

export function resolveBestImage(meta: PageMetadata): string | null {
	return meta.og.image ?? meta.twitter.image ?? getJsonLdField(meta, 'image');
}

/** Extract a top-level string field from the first JSON-LD block. */
function getJsonLdField(meta: PageMetadata, field: string): string | null {
	for (const block of meta.jsonLd) {
		if (block && typeof block === 'object' && field in block) {
			const val = (block as Record<string, unknown>)[field];
			if (typeof val === 'string') return val;
		}
	}
	return null;
}
