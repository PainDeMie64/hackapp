import { describe, it, expect } from 'vitest';
import { extractMetadata, resolveBestTitle, resolveBestDescription, resolveBestImage } from './extract.js';
import type { PageMetadata } from './types.js';

// ── Helpers ─────────────────────────────────────────────────────────────
/** Build a Response from an HTML string, ready for HTMLRewriter. */
function html(body: string): Response {
	return new Response(body, {
		headers: { 'Content-Type': 'text/html; charset=utf-8' },
	});
}

// ── Tests ───────────────────────────────────────────────────────────────
describe('extractMetadata', () => {

	// ── Basic fields ──────────────────────────────────────────────────
	it('extracts <title>', async () => {
		const meta = await extractMetadata(html('<html><head><title>Hello World</title></head></html>'));
		expect(meta.title).toBe('Hello World');
	});

	it('extracts title with surrounding whitespace', async () => {
		const meta = await extractMetadata(html('<title>  Spaced Out  </title>'));
		expect(meta.title).toBe('Spaced Out');
	});

	it('returns null for missing title', async () => {
		const meta = await extractMetadata(html('<html><head></head></html>'));
		expect(meta.title).toBeNull();
	});

	it('extracts html lang attribute', async () => {
		const meta = await extractMetadata(html('<html lang="fr"><head></head></html>'));
		expect(meta.language).toBe('fr');
	});

	it('returns null language when html has no lang', async () => {
		const meta = await extractMetadata(html('<html><head></head></html>'));
		expect(meta.language).toBeNull();
	});

	// ── Meta description & keywords ───────────────────────────────────
	it('extracts meta description', async () => {
		const meta = await extractMetadata(html(
			'<meta name="description" content="A great page about things">'
		));
		expect(meta.description).toBe('A great page about things');
	});

	it('extracts meta keywords', async () => {
		const meta = await extractMetadata(html(
			'<meta name="keywords" content="foo, bar, baz">'
		));
		expect(meta.keywords).toBe('foo, bar, baz');
	});

	it('handles case-insensitive meta name', async () => {
		const meta = await extractMetadata(html(
			'<meta name="Description" content="Upper case">'
		));
		expect(meta.description).toBe('Upper case');
	});

	// ── Open Graph ────────────────────────────────────────────────────
	it('extracts all OG tags', async () => {
		const meta = await extractMetadata(html(`
			<meta property="og:title" content="OG Title">
			<meta property="og:description" content="OG Desc">
			<meta property="og:image" content="https://img.example.com/og.jpg">
			<meta property="og:type" content="article">
			<meta property="og:url" content="https://example.com/page">
		`));
		expect(meta.og).toEqual({
			title: 'OG Title',
			description: 'OG Desc',
			image: 'https://img.example.com/og.jpg',
			type: 'article',
			url: 'https://example.com/page',
		});
	});

	it('returns null for missing OG fields', async () => {
		const meta = await extractMetadata(html('<html></html>'));
		expect(meta.og.title).toBeNull();
		expect(meta.og.description).toBeNull();
		expect(meta.og.image).toBeNull();
		expect(meta.og.type).toBeNull();
		expect(meta.og.url).toBeNull();
	});

	// ── Twitter Cards ─────────────────────────────────────────────────
	it('extracts twitter card meta via name attribute', async () => {
		const meta = await extractMetadata(html(`
			<meta name="twitter:title" content="Tweet Title">
			<meta name="twitter:description" content="Tweet Desc">
			<meta name="twitter:card" content="summary_large_image">
			<meta name="twitter:image" content="https://img.example.com/tw.jpg">
		`));
		expect(meta.twitter).toEqual({
			title: 'Tweet Title',
			description: 'Tweet Desc',
			card: 'summary_large_image',
			image: 'https://img.example.com/tw.jpg',
		});
	});

	it('extracts twitter card meta via property attribute (fallback)', async () => {
		const meta = await extractMetadata(html(`
			<meta property="twitter:title" content="Prop Title">
			<meta property="twitter:description" content="Prop Desc">
		`));
		expect(meta.twitter.title).toBe('Prop Title');
		expect(meta.twitter.description).toBe('Prop Desc');
	});

	it('name attribute takes priority over property for twitter', async () => {
		const meta = await extractMetadata(html(`
			<meta name="twitter:title" content="Name Wins">
			<meta property="twitter:title" content="Property Loses">
		`));
		expect(meta.twitter.title).toBe('Name Wins');
	});

	// ── Canonical URL ─────────────────────────────────────────────────
	it('extracts canonical URL', async () => {
		const meta = await extractMetadata(html(
			'<link rel="canonical" href="https://example.com/canonical">'
		));
		expect(meta.canonicalUrl).toBe('https://example.com/canonical');
	});

	it('returns null canonical when absent', async () => {
		const meta = await extractMetadata(html('<html></html>'));
		expect(meta.canonicalUrl).toBeNull();
	});

	// ── Favicons ──────────────────────────────────────────────────────
	it('extracts favicon links', async () => {
		const meta = await extractMetadata(html(`
			<link rel="icon" href="/favicon.ico" type="image/x-icon">
			<link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180">
		`));
		expect(meta.favicons).toHaveLength(2);
		expect(meta.favicons[0]).toEqual({
			href: '/favicon.ico',
			rel: 'icon',
			type: 'image/x-icon',
			sizes: null,
		});
		expect(meta.favicons[1]).toEqual({
			href: '/apple-icon.png',
			rel: 'apple-touch-icon',
			type: null,
			sizes: '180x180',
		});
	});

	it('ignores non-favicon link tags', async () => {
		const meta = await extractMetadata(html(`
			<link rel="stylesheet" href="/style.css">
			<link rel="preconnect" href="https://cdn.example.com">
		`));
		expect(meta.favicons).toHaveLength(0);
	});

	// ── JSON-LD ───────────────────────────────────────────────────────
	it('extracts a single JSON-LD block', async () => {
		const jsonLd = { '@context': 'https://schema.org', '@type': 'Organization', name: 'Acme' };
		const meta = await extractMetadata(html(
			`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
		));
		expect(meta.jsonLd).toHaveLength(1);
		expect(meta.jsonLd[0]).toEqual(jsonLd);
	});

	it('extracts multiple JSON-LD blocks', async () => {
		const block1 = { '@type': 'Organization', name: 'A' };
		const block2 = { '@type': 'WebSite', name: 'B' };
		const meta = await extractMetadata(html(`
			<script type="application/ld+json">${JSON.stringify(block1)}</script>
			<script type="application/ld+json">${JSON.stringify(block2)}</script>
		`));
		expect(meta.jsonLd).toHaveLength(2);
		expect(meta.jsonLd[0]).toEqual(block1);
		expect(meta.jsonLd[1]).toEqual(block2);
	});

	it('skips malformed JSON-LD without throwing', async () => {
		const meta = await extractMetadata(html(
			'<script type="application/ld+json">{ broken json }</script>'
		));
		expect(meta.jsonLd).toHaveLength(0);
	});

	it('ignores regular script tags', async () => {
		const meta = await extractMetadata(html(
			'<script>var x = 1;</script>'
		));
		expect(meta.jsonLd).toHaveLength(0);
	});

	// ── Full realistic page ───────────────────────────────────────────
	it('extracts everything from a realistic HTML document', async () => {
		const meta = await extractMetadata(html(`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<title>ALTEN Group - Engineering &amp; Technology Consulting</title>
				<meta name="description" content="ALTEN is the European leader in Engineering and Technology Consulting.">
				<meta name="keywords" content="engineering, consulting, technology, ALTEN">

				<meta property="og:title" content="ALTEN Group">
				<meta property="og:description" content="European leader in Engineering and Technology Consulting">
				<meta property="og:image" content="https://www.alten.com/og-image.jpg">
				<meta property="og:type" content="website">
				<meta property="og:url" content="https://www.alten.com/">

				<meta name="twitter:card" content="summary_large_image">
				<meta name="twitter:title" content="ALTEN Group">
				<meta name="twitter:description" content="Engineering & Technology Consulting">

				<link rel="canonical" href="https://www.alten.com/">
				<link rel="icon" href="/favicon.ico" type="image/x-icon">
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
				<link rel="stylesheet" href="/styles.css">

				<script type="application/ld+json">
				{
					"@context": "https://schema.org",
					"@type": "Organization",
					"name": "ALTEN",
					"url": "https://www.alten.com",
					"description": "European leader in Engineering and Technology Consulting"
				}
				</script>
			</head>
			<body>
				<h1>Welcome to ALTEN</h1>
				<p>Lots of body content that we do NOT parse...</p>
			</body>
			</html>
		`));

		expect(meta.title).toBe('ALTEN Group - Engineering & Technology Consulting');
		expect(meta.description).toBe('ALTEN is the European leader in Engineering and Technology Consulting.');
		expect(meta.keywords).toBe('engineering, consulting, technology, ALTEN');
		expect(meta.language).toBe('en');
		expect(meta.canonicalUrl).toBe('https://www.alten.com/');

		expect(meta.og.title).toBe('ALTEN Group');
		expect(meta.og.description).toBe('European leader in Engineering and Technology Consulting');
		expect(meta.og.image).toBe('https://www.alten.com/og-image.jpg');
		expect(meta.og.type).toBe('website');
		expect(meta.og.url).toBe('https://www.alten.com/');

		expect(meta.twitter.card).toBe('summary_large_image');
		expect(meta.twitter.title).toBe('ALTEN Group');
		expect(meta.twitter.description).toBe('Engineering & Technology Consulting');

		expect(meta.favicons).toHaveLength(2);
		expect(meta.favicons[0].href).toBe('/favicon.ico');
		expect(meta.favicons[1].href).toBe('/apple-touch-icon.png');

		expect(meta.jsonLd).toHaveLength(1);
		expect((meta.jsonLd[0] as Record<string, unknown>)['@type']).toBe('Organization');
		expect((meta.jsonLd[0] as Record<string, unknown>).name).toBe('ALTEN');
	});

	// ── Edge cases ────────────────────────────────────────────────────
	it('handles completely empty HTML', async () => {
		const meta = await extractMetadata(html(''));
		expect(meta.title).toBeNull();
		expect(meta.description).toBeNull();
		expect(meta.og.title).toBeNull();
		expect(meta.jsonLd).toEqual([]);
		expect(meta.favicons).toEqual([]);
	});

	it('handles meta tags with no content attribute', async () => {
		const meta = await extractMetadata(html(
			'<meta name="description"><meta property="og:title">'
		));
		expect(meta.description).toBeNull();
		expect(meta.og.title).toBeNull();
	});

	it('handles link with missing href', async () => {
		const meta = await extractMetadata(html('<link rel="canonical">'));
		expect(meta.canonicalUrl).toBeNull();
	});

	it('handles JSON-LD with nested objects', async () => {
		const nested = {
			'@context': 'https://schema.org',
			'@type': 'Article',
			author: { '@type': 'Person', name: 'Jane Doe' },
			headline: 'Test Article',
		};
		const meta = await extractMetadata(html(
			`<script type="application/ld+json">${JSON.stringify(nested)}</script>`
		));
		expect(meta.jsonLd).toHaveLength(1);
		const parsed = meta.jsonLd[0] as Record<string, unknown>;
		expect((parsed.author as Record<string, unknown>).name).toBe('Jane Doe');
	});

	it('handles multiple favicons of different types', async () => {
		const meta = await extractMetadata(html(`
			<link rel="icon" href="/favicon.svg" type="image/svg+xml">
			<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
			<link rel="icon" href="/favicon-16.png" type="image/png" sizes="16x16">
			<link rel="shortcut icon" href="/favicon.ico">
		`));
		expect(meta.favicons).toHaveLength(4);
		expect(meta.favicons[0].type).toBe('image/svg+xml');
		expect(meta.favicons[1].sizes).toBe('32x32');
		expect(meta.favicons[3].rel).toBe('shortcut icon');
	});

	it('extracts from page with only body content (no head metadata)', async () => {
		const meta = await extractMetadata(html(`
			<!DOCTYPE html>
			<html>
			<body><p>Just body content, no meta tags at all</p></body>
			</html>
		`));
		expect(meta.title).toBeNull();
		expect(meta.description).toBeNull();
		expect(meta.canonicalUrl).toBeNull();
		expect(meta.og.title).toBeNull();
		expect(meta.twitter.title).toBeNull();
		expect(meta.jsonLd).toEqual([]);
		expect(meta.favicons).toEqual([]);
		expect(meta.language).toBeNull();
	});
});

// ── Resolver utilities ──────────────────────────────────────────────────
describe('resolveBestTitle', () => {
	it('prefers og:title over page title', () => {
		const meta: PageMetadata = {
			title: 'Page Title',
			description: null, keywords: null, language: null, canonicalUrl: null,
			og: { title: 'OG Title', description: null, image: null, type: null, url: null },
			twitter: { title: null, description: null, card: null, image: null },
			jsonLd: [], favicons: [],
		};
		expect(resolveBestTitle(meta)).toBe('OG Title');
	});

	it('falls back to twitter:title', () => {
		const meta: PageMetadata = {
			title: null,
			description: null, keywords: null, language: null, canonicalUrl: null,
			og: { title: null, description: null, image: null, type: null, url: null },
			twitter: { title: 'Twitter Title', description: null, card: null, image: null },
			jsonLd: [], favicons: [],
		};
		expect(resolveBestTitle(meta)).toBe('Twitter Title');
	});

	it('falls back to page title', () => {
		const meta: PageMetadata = {
			title: 'Fallback',
			description: null, keywords: null, language: null, canonicalUrl: null,
			og: { title: null, description: null, image: null, type: null, url: null },
			twitter: { title: null, description: null, card: null, image: null },
			jsonLd: [], favicons: [],
		};
		expect(resolveBestTitle(meta)).toBe('Fallback');
	});

	it('falls back to JSON-LD name field', () => {
		const meta: PageMetadata = {
			title: null,
			description: null, keywords: null, language: null, canonicalUrl: null,
			og: { title: null, description: null, image: null, type: null, url: null },
			twitter: { title: null, description: null, card: null, image: null },
			jsonLd: [{ '@type': 'Organization', name: 'LD Name' }],
			favicons: [],
		};
		expect(resolveBestTitle(meta)).toBe('LD Name');
	});

	it('returns null when nothing available', () => {
		const meta: PageMetadata = {
			title: null,
			description: null, keywords: null, language: null, canonicalUrl: null,
			og: { title: null, description: null, image: null, type: null, url: null },
			twitter: { title: null, description: null, card: null, image: null },
			jsonLd: [], favicons: [],
		};
		expect(resolveBestTitle(meta)).toBeNull();
	});
});

describe('resolveBestDescription', () => {
	it('prefers og:description', () => {
		const meta: PageMetadata = {
			title: null, description: 'Meta desc',
			keywords: null, language: null, canonicalUrl: null,
			og: { title: null, description: 'OG Desc', image: null, type: null, url: null },
			twitter: { title: null, description: null, card: null, image: null },
			jsonLd: [], favicons: [],
		};
		expect(resolveBestDescription(meta)).toBe('OG Desc');
	});

	it('falls back through twitter then meta description', () => {
		const meta: PageMetadata = {
			title: null, description: 'Last resort',
			keywords: null, language: null, canonicalUrl: null,
			og: { title: null, description: null, image: null, type: null, url: null },
			twitter: { title: null, description: null, card: null, image: null },
			jsonLd: [], favicons: [],
		};
		expect(resolveBestDescription(meta)).toBe('Last resort');
	});
});

describe('resolveBestImage', () => {
	it('prefers og:image', () => {
		const meta: PageMetadata = {
			title: null, description: null,
			keywords: null, language: null, canonicalUrl: null,
			og: { title: null, description: null, image: 'https://og.jpg', type: null, url: null },
			twitter: { title: null, description: null, card: null, image: 'https://tw.jpg' },
			jsonLd: [], favicons: [],
		};
		expect(resolveBestImage(meta)).toBe('https://og.jpg');
	});

	it('falls back to twitter:image', () => {
		const meta: PageMetadata = {
			title: null, description: null,
			keywords: null, language: null, canonicalUrl: null,
			og: { title: null, description: null, image: null, type: null, url: null },
			twitter: { title: null, description: null, card: null, image: 'https://tw.jpg' },
			jsonLd: [], favicons: [],
		};
		expect(resolveBestImage(meta)).toBe('https://tw.jpg');
	});

	it('falls back to JSON-LD image field', () => {
		const meta: PageMetadata = {
			title: null, description: null,
			keywords: null, language: null, canonicalUrl: null,
			og: { title: null, description: null, image: null, type: null, url: null },
			twitter: { title: null, description: null, card: null, image: null },
			jsonLd: [{ '@type': 'Article', image: 'https://ld.jpg' }],
			favicons: [],
		};
		expect(resolveBestImage(meta)).toBe('https://ld.jpg');
	});
});
