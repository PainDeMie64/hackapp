import type { Db } from '$lib/server/db/index.js';
import { sources, scrapeResults, companies, news, prospectScores } from '$lib/server/db/schema.js';
import { eq, and } from 'drizzle-orm';
import { scrapeUrl } from '$lib/server/scraper/scrape-url.js';
import { BedrockClient, parseJsonResponse } from '$lib/server/llm/index.js';
import { extractCompaniesFromText } from '$lib/server/prospect/extract.js';
import { scoreCompany } from '$lib/server/prospect/scoring.js';
import { buildExtractNewsPrompt, buildScoreProspectPrompt } from '$lib/server/llm/prompts.js';
import { discoverAndScrape } from '$lib/server/discovery/index.js';

export interface PipelineConfig {
	db: Db;
	storage: R2Bucket;
	bedrock: BedrockClient;
	serperApiKey?: string;
}

export interface PipelineResult {
	status: 'ok' | 'partial' | 'failed';
	phases: {
		discovered: number;
		scraped: number;
		companiesExtracted: number;
		newsInserted: number;
		companiesScored: number;
	};
	errors: Array<{ step: string; entity: string; error: string }>;
	durationMs: number;
}

const SCRAPE_CONCURRENCY = 10;
const LLM_CONCURRENCY = 5;

class Semaphore {
	private queue: Array<() => void> = [];
	private active = 0;
	constructor(private max: number) {}
	async acquire(): Promise<void> {
		if (this.active < this.max) { this.active++; return; }
		return new Promise<void>(resolve => {
			this.queue.push(() => { this.active++; resolve(); });
		});
	}
	release(): void {
		this.active--;
		const next = this.queue.shift();
		if (next) next();
	}
}

async function runBatch<T, R>(
	items: T[], concurrency: number, fn: (item: T) => Promise<R>
): Promise<Array<{ item: T; result?: R; error?: string }>> {
	const sem = new Semaphore(concurrency);
	const results = await Promise.allSettled(
		items.map(async (item) => {
			await sem.acquire();
			try {
				const result = await fn(item);
				return { item, result };
			} catch (e: unknown) {
				return { item, error: e instanceof Error ? e.message : String(e) };
			} finally {
				sem.release();
			}
		})
	);
	return results.map(r => r.status === 'fulfilled' ? r.value : { item: items[0], error: 'Promise rejected' });
}

export async function runFullPipeline(config: PipelineConfig): Promise<PipelineResult> {
	const { db, storage, bedrock, serperApiKey } = config;
	const start = Date.now();
	const errors: PipelineResult['errors'] = [];
	const phases = { discovered: 0, scraped: 0, companiesExtracted: 0, newsInserted: 0, companiesScored: 0 };

	// ── Phase 0: Discover URLs via Serper (if API key available) ─────
	if (serperApiKey) {
		try {
			const discovery = await discoverAndScrape({ db, storage, serperApiKey });
			phases.discovered = discovery.urlsDiscovered;
			phases.scraped = discovery.urlsScraped;
			for (const e of discovery.errors) {
				errors.push({ step: 'discover', entity: e.source, error: e.error });
			}
		} catch (e: unknown) {
			errors.push({ step: 'discover', entity: 'all', error: e instanceof Error ? e.message : String(e) });
		}
	}

	// ── Phase 1: Also scrape source homepages directly (parallel) ────
	const prioritySources = await db.select().from(sources).where(
		and(eq(sources.isActive, true), eq(sources.isPriority, true))
	);

	const scrapeSettled = await runBatch(prioritySources, SCRAPE_CONCURRENCY, async (source) => {
		const data = await scrapeUrl(source.url, { sourceId: source.id, storage });
		await db.insert(scrapeResults).values(data);
		await db.update(sources).set({ lastCrawledAt: new Date() }).where(eq(sources.id, source.id));
		phases.scraped++;
		return data;
	});

	for (const r of scrapeSettled) {
		if (r.error) errors.push({ step: 'scrape', entity: (r.item as any).url, error: r.error });
	}

	// ── Phase 2: Extract companies from ALL scrape results (parallel LLM) ─
	const pendingScrapes = await db.select().from(scrapeResults)
		.where(and(eq(scrapeResults.llmStatus, 'pending'), eq(scrapeResults.statusCode, 200)));

	type CompanyRef = { companyId: string; name: string; text: string; sourceId: string };
	const extractedCompanies: CompanyRef[] = [];

	await runBatch(pendingScrapes.filter(s => s.extractedTextR2Key), LLM_CONCURRENCY, async (scrape) => {
		const obj = await storage.get(scrape.extractedTextR2Key!);
		if (!obj) return;
		const text = await obj.text();
		if (text.length < 50) return;

		const extraction = await extractCompaniesFromText(text, scrape.url, bedrock);

		for (const company of extraction.companies) {
			try {
				const scoring = scoreCompany(company);
				const companyData = {
					name: company.name,
					domain: company.domain ?? null,
					description: company.description ?? null,
					sector: company.sector ?? null,
					subsector: company.subsector ?? null,
					locationCity: company.locationCity ?? null,
					locationCountry: company.locationCountry ?? null,
					employeeCount: company.employeeCount ?? null,
					revenueEur: company.revenueEur ?? null,
					revenueYear: company.revenueYear ?? null,
					techStack: company.techStack ? JSON.stringify(company.techStack) : null,
					siren: company.siren ?? null,
					linkedinUrl: company.linkedinUrl ?? null,
					prospectScore: scoring.totalScore,
					prospectBand: scoring.band,
					status: 'active' as const,
					enrichmentStatus: 'pending' as const,
				};

				let companyId: string;
				if (company.domain) {
					const existing = await db.select().from(companies).where(eq(companies.domain, company.domain)).get();
					if (existing) {
						await db.update(companies).set({ ...companyData, updatedAt: new Date() }).where(eq(companies.id, existing.id));
						companyId = existing.id;
					} else {
						companyId = crypto.randomUUID();
						await db.insert(companies).values({ id: companyId, ...companyData, createdAt: new Date(), updatedAt: new Date() });
					}
				} else {
					companyId = crypto.randomUUID();
					await db.insert(companies).values({ id: companyId, ...companyData, createdAt: new Date(), updatedAt: new Date() });
				}

				phases.companiesExtracted++;
				extractedCompanies.push({ companyId, name: company.name, text, sourceId: scrape.sourceId });
			} catch (e: unknown) {
				errors.push({ step: 'upsert_company', entity: company.name, error: (e instanceof Error ? e.message : String(e)).substring(0, 150) });
			}
		}

		try {
			await db.update(scrapeResults).set({ llmStatus: 'processed', processedAt: new Date() })
				.where(eq(scrapeResults.id, scrape.id));
		} catch {}
	});

	// ── Phase 3: News + Scores in parallel (all companies, max concurrency) ─
	await runBatch(extractedCompanies, LLM_CONCURRENCY, async ({ companyId, name, text, sourceId }) => {
		const company = await db.select().from(companies).where(eq(companies.id, companyId)).get();
		if (!company) return;

		// Run news + scoring in parallel for each company
		await Promise.allSettled([
			(async () => {
				try {
					const result = await bedrock.converse(
						buildExtractNewsPrompt({ name: company.name, domain: company.domain, sector: company.sector }, text),
						{ maxTokens: 4096, temperature: 0.1 }
					);
					const newsItems = parseJsonResponse<Array<{
						title: string; summary?: string; category?: string;
						sentiment?: string; relevance_score?: number; source_url?: string;
					}>>(result.text);

					if (!Array.isArray(newsItems)) return;

					for (const item of newsItems) {
						if (!item.title) continue;
						try {
							await db.insert(news).values({
								companyId,
								sourceId,
								title: item.title,
								summary: item.summary ?? null,
								category: item.category ?? null,
								sourceUrl: item.source_url ?? `https://${company.domain ?? 'unknown'}`,
								sentiment: item.sentiment ?? null,
								relevanceScore: item.relevance_score ?? null,
								extractedAt: new Date(),
							}).onConflictDoNothing();
							phases.newsInserted++;
						} catch {}
					}

					await db.update(companies)
						.set({ enrichmentStatus: 'completed', lastEnrichedAt: new Date() })
						.where(eq(companies.id, companyId));
				} catch (e: unknown) {
					errors.push({ step: 'extract_news', entity: name, error: (e instanceof Error ? e.message : String(e)).substring(0, 150) });
				}
			})(),

			(async () => {
				try {
					const result = await bedrock.converse(
						buildScoreProspectPrompt(company),
						{ maxTokens: 600, temperature: 0.1 }
					);
					const scores = parseJsonResponse<Record<string, number>>(result.text);

					const firmographics = avg([scores.sector_alignment, scores.naf_code_match, scores.company_size,
						scores.rd_department_size, scores.geographic_proximity, scores.regional_specialization,
						scores.company_maturity, scores.organizational_structure]);
					const financial = avg([scores.revenue_growth_gap, scores.rd_spending_trend, scores.capex_spikes,
						scores.capex_to_opex_shift, scores.recent_funding, scores.public_grants,
						scores.margin_compression, scores.hiring_freeze_with_projects, scores.external_spend_in_financials]);
					const hiring = avg([scores.engineering_job_volume, scores.stale_job_postings, scores.repeated_repostings,
						scores.contract_freelance_language, scores.rare_skills_demand, scores.emerging_tech_demand,
						scores.high_turnover_signals, scores.recruiter_hiring_wave, scores.above_market_salaries]);
					const project = avg([scores.physical_expansion, scores.new_product_launch, scores.platform_migration,
						scores.program_milestones, scores.digital_transformation, scores.erp_plm_migration,
						scores.cloud_migration, scores.strategic_partnerships]);
					const other = avg([scores.leadership_change, scores.ma_activity, scores.existing_consulting_usage,
						scores.legacy_modernization, scores.tech_debt_indicators, scores.cybersecurity_gaps,
						scores.industry_specific_software, scores.iot_industry4_adoption,
						scores.eu_regulatory_pressure, scores.french_defense_budget, scores.certification_needs,
						scores.major_contract_won, scores.crisis_event, scores.industry_event_presence]);

					const totalScore = Math.round(firmographics * 0.20 + financial * 0.15 + hiring * 0.25 + project * 0.15 + other * 0.25);
					const scoreLabel = totalScore >= 75 ? 'Hot' : totalScore >= 55 ? 'Warm' : totalScore >= 35 ? 'Qualified' : 'Cold';

					const existing = await db.select().from(prospectScores).where(eq(prospectScores.companyId, companyId)).get();
					const scoreValues = { companyId, ...scores, totalScore, scoreLabel, scoredAt: new Date(), updatedAt: new Date() };

					if (existing) {
						await db.update(prospectScores).set(scoreValues).where(eq(prospectScores.id, existing.id));
					} else {
						await db.insert(prospectScores).values({ ...scoreValues, createdAt: new Date() });
					}
					phases.companiesScored++;
				} catch (e: unknown) {
					errors.push({ step: 'score_prospect', entity: name, error: (e instanceof Error ? e.message : String(e)).substring(0, 150) });
				}
			})(),
		]);
	});

	const status = errors.length === 0 ? 'ok' : phases.companiesExtracted > 0 ? 'partial' : 'failed';
	return { status, phases, errors, durationMs: Date.now() - start };
}

function avg(nums: (number | undefined)[]): number {
	const valid = nums.filter((n): n is number => typeof n === 'number');
	return valid.length > 0 ? valid.reduce((a, b) => a + b, 0) / valid.length : 50;
}
