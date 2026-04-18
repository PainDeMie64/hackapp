/**
 * Structured metadata extracted from an HTML page via HTMLRewriter.
 *
 * Every field is optional because any given page may omit any tag.
 * Arrays (jsonLd, favicons) default to empty when nothing is found.
 */
export interface PageMetadata {
	/** Content of <title>...</title> */
	title: string | null;

	/** <meta name="description" content="..."> */
	description: string | null;

	/** <meta name="keywords" content="..."> — raw comma-separated string */
	keywords: string | null;

	/** <html lang="..."> */
	language: string | null;

	/** <link rel="canonical" href="..."> */
	canonicalUrl: string | null;

	/** Open Graph tags */
	og: {
		title: string | null;
		description: string | null;
		image: string | null;
		type: string | null;
		url: string | null;
	};

	/** Twitter Card tags */
	twitter: {
		title: string | null;
		description: string | null;
		card: string | null;
		image: string | null;
	};

	/** All parsed JSON-LD blocks found in <script type="application/ld+json"> */
	jsonLd: unknown[];

	/** Favicon URLs extracted from <link rel="icon|shortcut icon|apple-touch-icon"> */
	favicons: FaviconEntry[];
}

export interface FaviconEntry {
	href: string;
	rel: string;
	type: string | null;
	sizes: string | null;
}
