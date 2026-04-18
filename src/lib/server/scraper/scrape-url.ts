import { normalizeUrl, extractDomain } from './normalize-url.js';
import type { NewScrapeResult } from '$lib/server/db/schema.js';

interface ScrapeOptions {
	sourceId: string;
	storage: R2Bucket;
}

interface MetaData {
	title: string;
	metaDescription: string;
	metaKeywords: string;
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

async function extractMetadata(response: Response): Promise<{ meta: MetaData; html: string }> {
	const meta: MetaData = {
		title: '', metaDescription: '', metaKeywords: '',
		ogTitle: '', ogDescription: '', ogImage: '',
		canonicalUrl: '', language: '', faviconUrl: '',
		jsonLd: [], linkCount: 0, imageCount: 0
	};

	let jsonLdBuf = '';
	let capturingJsonLd = false;

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
		.on('meta[name="keywords"]', {
			element(el) { meta.metaKeywords = el.getAttribute('content') ?? ''; }
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
		.on('a[href]', {
			element() { meta.linkCount++; }
		})
		.on('img', {
			element() { meta.imageCount++; }
		})
		.transform(response);

	const html = await transformed.text();
	return { meta, html };
}

async function sha256(text: string): Promise<string> {
	const data = new TextEncoder().encode(text);
	const hash = await crypto.subtle.digest('SHA-256', data);
	return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function scrapeUrl(url: string, opts: ScrapeOptions): Promise<NewScrapeResult> {
	const normalized = normalizeUrl(url);
	const domain = extractDomain(url);
	const path = new URL(url).pathname;
	const start = Date.now();

	const response = await fetch(url, {
		headers: {
			'User-Agent': 'HackAppBot/1.0 (commercial-intelligence-tool)',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.5'
		},
		redirect: 'follow'
	});

	const statusCode = response.status;
	const contentType = response.headers.get('content-type') ?? '';
	const contentLength = parseInt(response.headers.get('content-length') ?? '0') || null;
	const encoding = response.headers.get('content-encoding') ?? null;
	const etag = response.headers.get('etag') ?? null;
	const lastModified = response.headers.get('last-modified') ?? null;
	const duration = Date.now() - start;

	if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
		return {
			url, normalizedUrl: normalized, baseDomain: domain, path,
			statusCode, contentType, contentLength, encoding, etag, lastModified,
			title: null, metaDescription: null, metaKeywords: null,
			ogTitle: null, ogDescription: null, ogImage: null,
			canonicalUrl: null, language: null, faviconUrl: null,
			wordCount: null, linkCount: null, imageCount: null,
			rawHtmlR2Key: null, extractedTextR2Key: null, jsonLd: null,
			scrapeDurationMs: duration, sourceId: opts.sourceId
		};
	}

	const cloned = response.clone();
	const { meta, html } = await extractMetadata(response);

	const urlHash = await sha256(normalized);
	const epoch = Math.floor(Date.now() / 1000);
	const htmlKey = `scrapes/${opts.sourceId}/${urlHash}/${epoch}.html`;
	const textKey = `scrapes/${opts.sourceId}/${urlHash}/${epoch}.txt`;

	const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
	const wordCount = text.split(/\s+/).filter(Boolean).length;

	await Promise.all([
		opts.storage.put(htmlKey, html, { httpMetadata: { contentType: 'text/html' } }),
		opts.storage.put(textKey, text, { httpMetadata: { contentType: 'text/plain' } })
	]);

	const jsonLdStr = meta.jsonLd.length > 0 ? JSON.stringify(meta.jsonLd) : null;

	return {
		url, normalizedUrl: normalized, baseDomain: domain, path,
		statusCode, contentType, contentLength, encoding, etag, lastModified,
		title: meta.title || null, metaDescription: meta.metaDescription || null,
		metaKeywords: meta.metaKeywords || null,
		ogTitle: meta.ogTitle || null, ogDescription: meta.ogDescription || null,
		ogImage: meta.ogImage || null,
		canonicalUrl: meta.canonicalUrl || null, language: meta.language || null,
		faviconUrl: meta.faviconUrl || null,
		wordCount, linkCount: meta.linkCount, imageCount: meta.imageCount,
		rawHtmlR2Key: htmlKey, extractedTextR2Key: textKey,
		jsonLd: jsonLdStr,
		scrapeDurationMs: duration, sourceId: opts.sourceId
	};
}
