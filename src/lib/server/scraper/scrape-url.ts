import { normalizeUrl, extractDomain } from './normalize-url.js';
import type { NewScrapeResult } from '$lib/server/db/schema.js';

const MAX_BODY_BYTES = 2 * 1024 * 1024; // 2MB
const FETCH_TIMEOUT_MS = 15_000;

interface ScrapeOptions {
	sourceId: string;
	storage: R2Bucket;
}

interface MetaData {
	title: string;
	metaDescription: string;
	ogTitle: string;
	ogDescription: string;
	ogImage: string;
	canonicalUrl: string;
	language: string;
	faviconUrl: string;
	jsonLd: string[];
	linkCount: number;
	imageCount: number;
}

async function extractMetadataAndText(response: Response): Promise<{ meta: MetaData; text: string }> {
	const meta: MetaData = {
		title: '', metaDescription: '',
		ogTitle: '', ogDescription: '', ogImage: '',
		canonicalUrl: '', language: '', faviconUrl: '',
		jsonLd: [], linkCount: 0, imageCount: 0
	};

	let jsonLdBuf = '';
	let capturingJsonLd = false;
	let textParts: string[] = [];
	let insideScript = false;
	let insideStyle = false;

	const transformed = new HTMLRewriter()
		.on('html', {
			element(el) { meta.language = el.getAttribute('lang') ?? ''; }
		})
		.on('title', {
			text(chunk) { meta.title += chunk.text; }
		})
		.on('meta[name="description"]', {
			element(el) { meta.metaDescription = el.getAttribute('content') ?? ''; }
		})
		.on('meta[property="og:title"]', {
			element(el) { meta.ogTitle = el.getAttribute('content') ?? ''; }
		})
		.on('meta[property="og:description"]', {
			element(el) { meta.ogDescription = el.getAttribute('content') ?? ''; }
		})
		.on('meta[property="og:image"]', {
			element(el) { meta.ogImage = el.getAttribute('content') ?? ''; }
		})
		.on('link[rel="canonical"]', {
			element(el) { meta.canonicalUrl = el.getAttribute('href') ?? ''; }
		})
		.on('link[rel="icon"], link[rel="shortcut icon"]', {
			element(el) { meta.faviconUrl = el.getAttribute('href') ?? ''; }
		})
		.on('script[type="application/ld+json"]', {
			element() { capturingJsonLd = true; jsonLdBuf = ''; },
			text(chunk) {
				if (capturingJsonLd) jsonLdBuf += chunk.text;
				if (chunk.lastInTextNode) {
					if (jsonLdBuf.trim()) meta.jsonLd.push(jsonLdBuf.trim());
					capturingJsonLd = false;
				}
			}
		})
		.on('script', {
			element(el) {
				if (!el.getAttribute('type')?.includes('ld+json')) insideScript = true;
				el.onEndTag(() => { insideScript = false; });
			}
		})
		.on('style', {
			element(el) {
				insideStyle = true;
				el.onEndTag(() => { insideStyle = false; });
			}
		})
		.on('a[href]', { element() { meta.linkCount++; } })
		.on('img', { element() { meta.imageCount++; } })
		.on('body *', {
			text(chunk) {
				if (!insideScript && !insideStyle && chunk.text.trim()) {
					textParts.push(chunk.text);
				}
			}
		})
		.transform(response);

	await transformed.arrayBuffer();

	const text = textParts.join(' ').replace(/\s+/g, ' ').trim();
	return { meta, text };
}

async function sha256(input: string): Promise<string> {
	const data = new TextEncoder().encode(input);
	const hash = await crypto.subtle.digest('SHA-256', data);
	return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function scrapeUrl(url: string, opts: ScrapeOptions): Promise<NewScrapeResult> {
	const normalized = normalizeUrl(url);
	const domain = extractDomain(url);
	const path = new URL(url).pathname;
	const now = new Date();
	const start = Date.now();

	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

	let response: Response;
	try {
		response = await fetch(url, {
			signal: controller.signal,
			headers: {
				'User-Agent': 'HackAppBot/1.0 (commercial-intelligence-tool)',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.5'
			},
			redirect: 'follow'
		});
	} finally {
		clearTimeout(timer);
	}

	const statusCode = response.status;
	const contentType = response.headers.get('content-type') ?? '';
	const rawLength = response.headers.get('content-length');
	const contentLength = rawLength !== null ? parseInt(rawLength, 10) || null : null;
	const encoding = response.headers.get('content-encoding') ?? null;
	const etag = response.headers.get('etag') ?? null;
	const lastModified = response.headers.get('last-modified') ?? null;
	const finalUrl = response.url !== url ? response.url : null;
	const duration = Date.now() - start;

	const baseResult: Partial<NewScrapeResult> = {
		url, finalUrl, normalizedUrl: normalized, baseDomain: domain, path,
		statusCode, contentType, contentLength, encoding, etag, lastModified,
		scrapedAt: now, scrapeDurationMs: duration, sourceId: opts.sourceId,
		llmStatus: 'pending'
	};

	if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
		await response.body?.cancel();
		return {
			...baseResult,
			title: null, metaDescription: null, ogTitle: null, ogDescription: null,
			ogImage: null, canonicalUrl: null, language: null, faviconUrl: null,
			wordCount: null, linkCount: null, imageCount: null,
			rawHtmlR2Key: null, extractedTextR2Key: null, contentHash: null,
			jsonLd: null, metaKeywords: null,
		} as NewScrapeResult;
	}

	if (contentLength && contentLength > MAX_BODY_BYTES) {
		await response.body?.cancel();
		return {
			...baseResult,
			title: null, metaDescription: null, ogTitle: null, ogDescription: null,
			ogImage: null, canonicalUrl: null, language: null, faviconUrl: null,
			wordCount: null, linkCount: null, imageCount: null,
			rawHtmlR2Key: null, extractedTextR2Key: null, contentHash: null,
			jsonLd: null, metaKeywords: null,
		} as NewScrapeResult;
	}

	const { meta, text } = await extractMetadataAndText(response);
	const wordCount = text.split(/\s+/).filter(Boolean).length;
	const contentHash = await sha256(text);

	const urlHash = await sha256(normalized);
	const epoch = Date.now();
	const textKey = `scrapes/${opts.sourceId}/${urlHash}/${epoch}.txt`;

	let storedTextKey: string | null = null;

	try {
		await opts.storage.put(textKey, text, { httpMetadata: { contentType: 'text/plain; charset=utf-8' } });
		storedTextKey = textKey;
	} catch {
		// R2 failure is non-fatal — metadata in D1 is still valuable
	}

	const jsonLdStr = meta.jsonLd.length > 0 ? JSON.stringify(meta.jsonLd) : null;

	return {
		...baseResult,
		title: meta.title || null,
		metaDescription: meta.metaDescription || null,
		metaKeywords: null,
		ogTitle: meta.ogTitle || null,
		ogDescription: meta.ogDescription || null,
		ogImage: meta.ogImage || null,
		canonicalUrl: meta.canonicalUrl || null,
		language: meta.language || null,
		faviconUrl: meta.faviconUrl || null,
		wordCount, linkCount: meta.linkCount, imageCount: meta.imageCount,
		rawHtmlR2Key: null, extractedTextR2Key: storedTextKey,
		contentHash, jsonLd: jsonLdStr,
	} as NewScrapeResult;
}
