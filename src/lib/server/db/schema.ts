import { sqliteTable, text, integer, uniqueIndex, index } from 'drizzle-orm/sqlite-core';

export const sources = sqliteTable('sources', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	url: text('url').notNull().unique(),
	name: text('name'),
	type: text('type'),
	isActive: integer('is_active', { mode: 'boolean' }).default(true),
	lastCrawledAt: integer('last_crawled_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
});

export const companies = sqliteTable('companies', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	domain: text('domain').unique(),
	description: text('description'),
	sector: text('sector'),
	subsector: text('subsector'),
	locationCity: text('location_city'),
	locationCountry: text('location_country'),
	employeeCount: integer('employee_count'),
	revenueEur: integer('revenue_eur'),
	revenueYear: integer('revenue_year'),
	techStack: text('tech_stack'),
	usesConsultingServices: integer('uses_consulting_services', { mode: 'boolean' }),
	linkedinUrl: text('linkedin_url'),
	siren: text('siren'),
	logoUrl: text('logo_url'),
	status: text('status').default('active'),
	enrichmentStatus: text('enrichment_status').default('pending'),
	lastEnrichedAt: integer('last_enriched_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
}, (table) => ([
	index('companies_sector').on(table.sector),
	index('companies_country').on(table.locationCountry)
]));

export const news = sqliteTable('news', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	companyId: text('company_id').notNull().references(() => companies.id),
	sourceId: text('source_id').notNull().references(() => sources.id),
	title: text('title').notNull(),
	summary: text('summary'),
	category: text('category'),
	sourceUrl: text('source_url').notNull(),
	reportKey: text('report_key'),
	sentiment: text('sentiment'),
	relevanceScore: integer('relevance_score'),
	publishedAt: integer('published_at', { mode: 'timestamp' }),
	extractedAt: integer('extracted_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
}, (table) => ([
	uniqueIndex('news_company_source_url').on(table.companyId, table.sourceUrl),
	index('news_published_at').on(table.publishedAt)
]));

// ---------------------------------------------------------------------------
// Raw scrape results — pre-LLM staging table
// ---------------------------------------------------------------------------
// Stores everything extractable from HTTP response + HTML parsing alone.
// A downstream pipeline queries this table to feed pages into LLM processing.
//
// R2 key structure (bucket: hackapp-storage):
//   scrapes/{source_id}/{sha256(normalized_url)}/{scraped_at_epoch}.html  — raw HTML
//   scrapes/{source_id}/{sha256(normalized_url)}/{scraped_at_epoch}.txt   — extracted text
//
// The sha256 of the normalized URL keeps keys filesystem-safe and deterministic.
// Nesting under source_id allows efficient R2 prefix listing per-source.
// The epoch suffix enables keeping historical snapshots of the same page.
// ---------------------------------------------------------------------------
export const scrapeResults = sqliteTable('scrape_results', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

	// ── URL info ──────────────────────────────────────────────────────────
	url: text('url').notNull(),
	normalizedUrl: text('normalized_url').notNull(),
	baseDomain: text('base_domain').notNull(),
	path: text('path').notNull(),

	// ── HTTP response info ────────────────────────────────────────────────
	statusCode: integer('status_code').notNull(),
	contentType: text('content_type'),
	contentLength: integer('content_length'),
	encoding: text('encoding'),
	etag: text('etag'),
	lastModified: text('last_modified'),

	// ── Page metadata (parsed from HTML <head>) ───────────────────────────
	title: text('title'),
	metaDescription: text('meta_description'),
	metaKeywords: text('meta_keywords'),
	ogTitle: text('og_title'),
	ogDescription: text('og_description'),
	ogImage: text('og_image'),
	canonicalUrl: text('canonical_url'),
	language: text('language'),
	faviconUrl: text('favicon_url'),

	// ── Content metrics (computed during scrape) ──────────────────────────
	wordCount: integer('word_count'),
	linkCount: integer('link_count'),
	imageCount: integer('image_count'),

	// ── Content pointers (full bodies live in R2) ─────────────────────────
	rawHtmlR2Key: text('raw_html_r2_key'),
	extractedTextR2Key: text('extracted_text_r2_key'),

	// ── Structured data ───────────────────────────────────────────────────
	// Raw JSON-LD from the page, stored as a JSON string.
	// May contain a single object or an array of objects.
	jsonLd: text('json_ld'),

	// ── Crawl info ────────────────────────────────────────────────────────
	scrapedAt: integer('scraped_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
	scrapeDurationMs: integer('scrape_duration_ms'),
	sourceId: text('source_id').notNull().references(() => sources.id)
}, (table) => ([
	// The LLM pipeline queries by source to process unprocessed pages
	index('scrape_results_source_id').on(table.sourceId),

	// Filter/deduplicate by domain
	index('scrape_results_base_domain').on(table.baseDomain),

	// Chronological ordering for pipeline consumption
	index('scrape_results_scraped_at').on(table.scrapedAt),

	// Conditional re-scrape: skip pages that returned the same etag
	index('scrape_results_normalized_url').on(table.normalizedUrl),

	// HTTP-level filtering (e.g., only process 200s)
	index('scrape_results_status_code').on(table.statusCode)
]));

// ---------------------------------------------------------------------------
// Type exports
// ---------------------------------------------------------------------------
export type Source = typeof sources.$inferSelect;
export type NewSource = typeof sources.$inferInsert;
export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;
export type NewsEntry = typeof news.$inferSelect;
export type NewNewsEntry = typeof news.$inferInsert;
export type ScrapeResult = typeof scrapeResults.$inferSelect;
export type NewScrapeResult = typeof scrapeResults.$inferInsert;
