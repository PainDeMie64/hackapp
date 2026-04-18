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

export type Source = typeof sources.$inferSelect;
export type NewSource = typeof sources.$inferInsert;
export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;
export type NewsEntry = typeof news.$inferSelect;
export type NewNewsEntry = typeof news.$inferInsert;
