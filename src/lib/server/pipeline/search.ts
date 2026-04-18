import type { Db } from '$lib/server/db/index.js';
import { companies, prospectScores, searches } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { BedrockClient, parseJsonResponse } from '$lib/server/llm/index.js';
import { buildScoreProspectPrompt } from '$lib/server/llm/prompts.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SearchPipelineConfig {
	db: Db;
	storage: R2Bucket;
	bedrock: BedrockClient;
	searchId: string;
	params: {
		sector: string;
		regions: string[];
		prospectCount: number;
		freeConditions?: string;
		minRevenue?: number;
		minHeadcount?: number;
		growthPotential?: string;
		consultingUsage?: string;
	};
}

export interface SearchPipelineResult {
	status: 'ok' | 'partial' | 'failed';
	companiesFound: number;
	companiesScored: number;
	errors: Array<{ step: string; error: string }>;
	durationMs: number;
}

interface RawCompanyData {
	name: string;
	domain?: string | null;
	description?: string | null;
	sector?: string | null;
	subsector?: string | null;
	locationCity?: string | null;
	locationCountry?: string | null;
	employeeCount?: number | null;
	revenueEur?: number | null;
	revenueYear?: number | null;
	techStack?: string[] | null;
	siren?: string | null;
	linkedinUrl?: string | null;
	source: string;
}

// ---------------------------------------------------------------------------
// Sector NAF codes (Pappers API)
// ---------------------------------------------------------------------------

const SECTOR_NAF: Record<string, string> = {
	aeronautique: '3030Z',
	automobile: '2910Z',
	defense: '2540Z',
	energie: '3511Z',
	pharma: '2120Z',
	telecoms: '6110Z',
	it: '6201Z',
	industrie: '2599B',
};

// ---------------------------------------------------------------------------
// Region to department mapping
// ---------------------------------------------------------------------------

const REGION_DEPARTMENTS: Record<string, string[]> = {
	'pays-de-la-loire': ['44', '49', '53', '72', '85'],
	'ile-de-france': ['75', '77', '78', '91', '92', '93', '94', '95'],
	'occitanie': ['09', '11', '12', '30', '31', '32', '34', '46', '48', '65', '66', '81', '82'],
	'auvergne-rhone-alpes': ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'],
	'bretagne': ['22', '29', '35', '56'],
	'paca': ['04', '05', '06', '13', '83', '84'],
};

const LLM_CONCURRENCY = 3;

// ---------------------------------------------------------------------------
// Concurrency limiter (same pattern as run.ts)
// ---------------------------------------------------------------------------

class Semaphore {
	private queue: Array<() => void> = [];
	private active = 0;
	constructor(private max: number) {}

	async acquire(): Promise<void> {
		if (this.active < this.max) {
			this.active++;
			return;
		}
		return new Promise<void>((resolve) => {
			this.queue.push(() => {
				this.active++;
				resolve();
			});
		});
	}

	release(): void {
		this.active--;
		const next = this.queue.shift();
		if (next) next();
	}
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function departmentsForRegions(regions: string[]): string[] {
	const departments: string[] = [];
	for (const region of regions) {
		const key = region.toLowerCase().trim();
		const depts = REGION_DEPARTMENTS[key];
		if (depts) {
			departments.push(...depts);
		}
	}
	return departments;
}

function nafCodeForSector(sector: string): string | undefined {
	const key = sector.toLowerCase().trim();
	return SECTOR_NAF[key];
}

function regionLabels(regions: string[]): string {
	return regions.map((r) => r.replace(/-/g, ' ')).join(', ');
}

// ---------------------------------------------------------------------------
// Step 1: Fetch from Pappers API (free tier)
// ---------------------------------------------------------------------------

async function fetchFromPappers(
	sector: string,
	regions: string[],
	limit: number
): Promise<{ companies: RawCompanyData[]; error?: string }> {
	const results: RawCompanyData[] = [];
	const nafCode = nafCodeForSector(sector);
	const departments = departmentsForRegions(regions);

	// If no departments mapped, query without department filter
	const deptParam = departments.length > 0 ? departments.slice(0, 5).join(',') : '';

	try {
		const params = new URLSearchParams({
			q: sector,
			par_page: String(Math.min(limit, 20)),
		});
		if (nafCode) {
			params.set('code_naf', nafCode);
		}
		if (deptParam) {
			params.set('departement', deptParam);
		}

		const url = `https://api.pappers.fr/v2/recherche?${params.toString()}`;
		const response = await fetch(url, {
			headers: { 'Accept': 'application/json' },
			signal: AbortSignal.timeout(10_000),
		});

		if (!response.ok) {
			return { companies: [], error: `Pappers API returned ${response.status}` };
		}

		const data = await response.json() as {
			resultats?: Array<{
				nom_entreprise?: string;
				siren?: string;
				siege?: {
					ville?: string;
					departement?: string;
				};
				domaine?: string;
				effectif?: string;
				chiffre_affaires?: number;
				code_naf?: string;
				libelle_code_naf?: string;
				objet_social?: string;
			}>;
		};

		if (data.resultats && Array.isArray(data.resultats)) {
			for (const r of data.resultats) {
				if (!r.nom_entreprise) continue;
				results.push({
					name: r.nom_entreprise,
					siren: r.siren ?? null,
					locationCity: r.siege?.ville ?? null,
					locationCountry: 'France',
					employeeCount: parseEmployeeCount(r.effectif),
					revenueEur: r.chiffre_affaires ?? null,
					sector: sector,
					subsector: r.libelle_code_naf ?? null,
					description: r.objet_social ?? null,
					domain: null,
					source: 'pappers',
				});
			}
		}
	} catch (e: unknown) {
		return {
			companies: results,
			error: `Pappers fetch failed: ${e instanceof Error ? e.message : String(e)}`,
		};
	}

	return { companies: results };
}

function parseEmployeeCount(effectif: string | undefined | null): number | null {
	if (!effectif) return null;
	// Pappers returns ranges like "50 à 99 salariés" — extract first number
	const match = effectif.match(/(\d+)/);
	return match ? parseInt(match[1], 10) : null;
}

// ---------------------------------------------------------------------------
// Step 2: Fetch from Societe.com (scraping)
// ---------------------------------------------------------------------------

async function fetchFromSociete(
	sector: string,
	regions: string[]
): Promise<{ companies: RawCompanyData[]; error?: string }> {
	const results: RawCompanyData[] = [];
	const query = `${sector} ${regionLabels(regions)}`;

	try {
		const url = `https://www.societe.com/cgi-bin/search?champs=${encodeURIComponent(query)}`;
		const response = await fetch(url, {
			headers: {
				'Accept': 'text/html',
				'User-Agent': 'Mozilla/5.0 (compatible; ALTENBot/1.0)',
			},
			signal: AbortSignal.timeout(10_000),
		});

		if (!response.ok) {
			return { companies: [], error: `Societe.com returned ${response.status}` };
		}

		const html = await response.text();

		// Extract company names from search results using regex on HTML
		// Societe.com results have patterns like: <a ... >COMPANY NAME</a> ... SIREN ... ville
		const companyPattern = /class="txt_enseigne[^"]*"[^>]*>([^<]+)<\/a>/gi;
		let match;
		while ((match = companyPattern.exec(html)) !== null && results.length < 20) {
			const name = match[1].trim();
			if (name.length < 2) continue;
			results.push({
				name,
				locationCountry: 'France',
				sector,
				source: 'societe.com',
				domain: null,
				description: null,
				subsector: null,
				locationCity: null,
				employeeCount: null,
				revenueEur: null,
				revenueYear: null,
				techStack: null,
				siren: null,
				linkedinUrl: null,
			});
		}
	} catch (e: unknown) {
		return {
			companies: results,
			error: `Societe.com fetch failed: ${e instanceof Error ? e.message : String(e)}`,
		};
	}

	return { companies: results };
}

// ---------------------------------------------------------------------------
// Step 3: LLM fallback — use Mistral's knowledge to find companies
// ---------------------------------------------------------------------------

async function fetchFromLlmKnowledge(
	bedrock: BedrockClient,
	sector: string,
	regions: string[],
	count: number,
	freeConditions?: string
): Promise<{ companies: RawCompanyData[]; error?: string }> {
	const regionText = regionLabels(regions);
	const conditionsText = freeConditions ? `\nConditions supplementaires: ${freeConditions}` : '';

	const prompt = `Tu es un expert en prospection commerciale B2B en France. Liste exactement ${count} entreprises francaises reelles dans le secteur "${sector}" situees en ${regionText || 'France'}.${conditionsText}

Pour chaque entreprise, fournis un objet JSON avec:
- "name": nom officiel
- "domain": domaine web (ex: airbus.com), null si inconnu
- "description": description courte de l'activite (1-2 phrases)
- "sector": "${sector}"
- "subsector": sous-secteur ou specialisation
- "locationCity": ville du siege
- "employeeCount": nombre approximatif de salaries (entier)
- "revenueEur": chiffre d'affaires annuel approximatif en euros (entier)
- "siren": numero SIREN si connu, null sinon
- "linkedinUrl": URL LinkedIn si connue, null sinon

Retourne UNIQUEMENT un tableau JSON valide. Pas de markdown, pas de code fence, juste le JSON.
Concentre-toi sur des entreprises moyennes et grandes qui pourraient avoir besoin de conseil en ingenierie et IT (clients potentiels ALTEN).`;

	try {
		const result = await bedrock.converse(prompt, {
			maxTokens: 4096,
			temperature: 0.3,
			system: 'Tu es un assistant specialise en intelligence commerciale B2B pour le marche francais.',
		});

		const parsed = parseJsonResponse<Array<{
			name: string;
			domain?: string | null;
			description?: string | null;
			sector?: string | null;
			subsector?: string | null;
			locationCity?: string | null;
			employeeCount?: number | null;
			revenueEur?: number | null;
			siren?: string | null;
			linkedinUrl?: string | null;
		}>>(result.text);

		if (!Array.isArray(parsed)) {
			return { companies: [], error: 'LLM returned non-array response' };
		}

		const companies: RawCompanyData[] = parsed
			.filter((c) => c.name)
			.map((c) => ({
				name: c.name,
				domain: c.domain ?? null,
				description: c.description ?? null,
				sector: c.sector ?? sector,
				subsector: c.subsector ?? null,
				locationCity: c.locationCity ?? null,
				locationCountry: 'France',
				employeeCount: typeof c.employeeCount === 'number' ? c.employeeCount : null,
				revenueEur: typeof c.revenueEur === 'number' ? c.revenueEur : null,
				revenueYear: null,
				techStack: null,
				siren: c.siren ?? null,
				linkedinUrl: c.linkedinUrl ?? null,
				source: 'llm_knowledge',
			}));

		return { companies };
	} catch (e: unknown) {
		return {
			companies: [],
			error: `LLM knowledge fetch failed: ${e instanceof Error ? e.message : String(e)}`,
		};
	}
}

// ---------------------------------------------------------------------------
// Step 4: LLM-based scoring (reuses buildScoreProspectPrompt from prompts.ts)
// ---------------------------------------------------------------------------

async function scoreCompanyWithLlm(
	bedrock: BedrockClient,
	db: Db,
	companyId: string,
	company: {
		name: string;
		domain?: string | null;
		sector?: string | null;
		subsector?: string | null;
		locationCity?: string | null;
		locationCountry?: string | null;
		employeeCount?: number | null;
		revenueEur?: number | null;
		techStack?: string | null;
		description?: string | null;
	}
): Promise<{ totalScore: number; scoreLabel: string }> {
	const result = await bedrock.converse(
		buildScoreProspectPrompt(company),
		{ maxTokens: 600, temperature: 0.1 }
	);
	const scores = parseJsonResponse<Record<string, number>>(result.text);

	const firmographics = avg([
		scores.sector_alignment, scores.naf_code_match, scores.company_size,
		scores.rd_department_size, scores.geographic_proximity, scores.regional_specialization,
		scores.company_maturity, scores.organizational_structure,
	]);
	const financial = avg([
		scores.revenue_growth_gap, scores.rd_spending_trend, scores.capex_spikes,
		scores.capex_to_opex_shift, scores.recent_funding, scores.public_grants,
		scores.margin_compression, scores.hiring_freeze_with_projects, scores.external_spend_in_financials,
	]);
	const hiring = avg([
		scores.engineering_job_volume, scores.stale_job_postings, scores.repeated_repostings,
		scores.contract_freelance_language, scores.rare_skills_demand, scores.emerging_tech_demand,
		scores.high_turnover_signals, scores.recruiter_hiring_wave, scores.above_market_salaries,
	]);
	const project = avg([
		scores.physical_expansion, scores.new_product_launch, scores.platform_migration,
		scores.program_milestones, scores.digital_transformation, scores.erp_plm_migration,
		scores.cloud_migration, scores.strategic_partnerships,
	]);
	const other = avg([
		scores.leadership_change, scores.ma_activity, scores.existing_consulting_usage,
		scores.legacy_modernization, scores.tech_debt_indicators, scores.cybersecurity_gaps,
		scores.industry_specific_software, scores.iot_industry4_adoption,
		scores.eu_regulatory_pressure, scores.french_defense_budget, scores.certification_needs,
		scores.major_contract_won, scores.crisis_event, scores.industry_event_presence,
	]);

	const totalScore = Math.round(
		firmographics * 0.20 + financial * 0.15 + hiring * 0.25 + project * 0.15 + other * 0.25
	);
	const scoreLabel = totalScore >= 75 ? 'Hot' : totalScore >= 55 ? 'Warm' : totalScore >= 35 ? 'Qualified' : 'Cold';

	const existing = await db.select().from(prospectScores).where(eq(prospectScores.companyId, companyId)).get();
	const scoreValues = {
		companyId,
		...scores,
		totalScore,
		scoreLabel,
		scoredAt: new Date(),
		updatedAt: new Date(),
	};

	if (existing) {
		await db.update(prospectScores).set(scoreValues).where(eq(prospectScores.id, existing.id));
	} else {
		await db.insert(prospectScores).values({ ...scoreValues, createdAt: new Date() });
	}

	return { totalScore, scoreLabel };
}

function avg(nums: (number | undefined)[]): number {
	const valid = nums.filter((n): n is number => typeof n === 'number');
	return valid.length > 0 ? valid.reduce((a, b) => a + b, 0) / valid.length : 50;
}

// ---------------------------------------------------------------------------
// Step 5: Upsert company into DB
// ---------------------------------------------------------------------------

async function upsertCompany(
	db: Db,
	raw: RawCompanyData,
	searchId: string
): Promise<string> {
	const companyData = {
		name: raw.name,
		domain: raw.domain ?? null,
		description: raw.description ?? null,
		sector: raw.sector ?? null,
		subsector: raw.subsector ?? null,
		locationCity: raw.locationCity ?? null,
		locationCountry: raw.locationCountry ?? 'France',
		employeeCount: raw.employeeCount ?? null,
		revenueEur: raw.revenueEur ?? null,
		revenueYear: raw.revenueYear ?? null,
		techStack: raw.techStack ? JSON.stringify(raw.techStack) : null,
		siren: raw.siren ?? null,
		linkedinUrl: raw.linkedinUrl ?? null,
		status: 'active' as const,
		enrichmentStatus: 'pending' as const,
	};

	// Try to match by domain first, then by SIREN, then by exact name
	let companyId: string | undefined;

	if (raw.domain) {
		const existing = await db.select().from(companies).where(eq(companies.domain, raw.domain)).get();
		if (existing) {
			await db.update(companies)
				.set({ ...companyData, updatedAt: new Date() })
				.where(eq(companies.id, existing.id));
			companyId = existing.id;
		}
	}

	if (!companyId && raw.siren) {
		const existing = await db.select().from(companies).where(eq(companies.siren, raw.siren)).get();
		if (existing) {
			await db.update(companies)
				.set({ ...companyData, updatedAt: new Date() })
				.where(eq(companies.id, existing.id));
			companyId = existing.id;
		}
	}

	if (!companyId && raw.name) {
		const existing = await db.select().from(companies).where(eq(companies.name, raw.name)).get();
		if (existing) {
			await db.update(companies)
				.set({ ...companyData, updatedAt: new Date() })
				.where(eq(companies.id, existing.id));
			companyId = existing.id;
		}
	}

	if (!companyId) {
		companyId = crypto.randomUUID();
		await db.insert(companies).values({
			id: companyId,
			...companyData,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	return companyId;
}

// ---------------------------------------------------------------------------
// Deduplication
// ---------------------------------------------------------------------------

function deduplicateCompanies(raw: RawCompanyData[]): RawCompanyData[] {
	const seen = new Map<string, RawCompanyData>();

	for (const company of raw) {
		// Normalize name for dedup key
		const key = company.siren
			? `siren:${company.siren}`
			: `name:${company.name.toLowerCase().trim().replace(/\s+/g, ' ')}`;

		const existing = seen.get(key);
		if (!existing) {
			seen.set(key, company);
			continue;
		}

		// Prefer the entry with more data (merge fields)
		seen.set(key, {
			...existing,
			domain: existing.domain ?? company.domain,
			description: existing.description ?? company.description,
			siren: existing.siren ?? company.siren,
			employeeCount: existing.employeeCount ?? company.employeeCount,
			revenueEur: existing.revenueEur ?? company.revenueEur,
			locationCity: existing.locationCity ?? company.locationCity,
			linkedinUrl: existing.linkedinUrl ?? company.linkedinUrl,
			subsector: existing.subsector ?? company.subsector,
			techStack: existing.techStack ?? company.techStack,
			source: existing.source,
		});
	}

	return [...seen.values()];
}

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

function filterByParams(
	raw: RawCompanyData[],
	params: SearchPipelineConfig['params']
): RawCompanyData[] {
	return raw.filter((c) => {
		if (params.minRevenue && c.revenueEur && c.revenueEur < params.minRevenue) {
			return false;
		}
		if (params.minHeadcount && c.employeeCount && c.employeeCount < params.minHeadcount) {
			return false;
		}
		return true;
	});
}

// ---------------------------------------------------------------------------
// Main pipeline
// ---------------------------------------------------------------------------

export async function runSearchPipeline(config: SearchPipelineConfig): Promise<SearchPipelineResult> {
	const { db, bedrock, searchId, params } = config;
	const start = Date.now();
	const errors: SearchPipelineResult['errors'] = [];
	let companiesFound = 0;
	let companiesScored = 0;
	const sem = new Semaphore(LLM_CONCURRENCY);

	// ── Mark search as running ──────────────────────────────────────────
	await db.update(searches)
		.set({ status: 'running', startedAt: new Date() })
		.where(eq(searches.id, searchId));

	try {
		// ── Phase 1: Gather companies from multiple sources ─────────────
		const allRaw: RawCompanyData[] = [];

		const [pappersResult, societeResult] = await Promise.allSettled([
			fetchFromPappers(params.sector, params.regions, params.prospectCount),
			fetchFromSociete(params.sector, params.regions),
		]);

		if (pappersResult.status === 'fulfilled') {
			if (pappersResult.value.error) {
				errors.push({ step: 'fetch_pappers', error: pappersResult.value.error });
			}
			allRaw.push(...pappersResult.value.companies);
		} else {
			errors.push({ step: 'fetch_pappers', error: pappersResult.reason?.message ?? 'Unknown error' });
		}

		if (societeResult.status === 'fulfilled') {
			if (societeResult.value.error) {
				errors.push({ step: 'fetch_societe', error: societeResult.value.error });
			}
			allRaw.push(...societeResult.value.companies);
		} else {
			errors.push({ step: 'fetch_societe', error: societeResult.reason?.message ?? 'Unknown error' });
		}

		// ── Phase 2: LLM fallback if insufficient results ──────────────
		const targetCount = params.prospectCount;
		if (allRaw.length < targetCount) {
			const deficit = targetCount - allRaw.length;
			const llmResult = await fetchFromLlmKnowledge(
				bedrock,
				params.sector,
				params.regions,
				Math.min(deficit + 5, 20), // request a few extra to account for dedup
				params.freeConditions
			);

			if (llmResult.error) {
				errors.push({ step: 'fetch_llm_knowledge', error: llmResult.error });
			}
			allRaw.push(...llmResult.companies);
		}

		// ── Phase 3: Deduplicate and filter ─────────────────────────────
		const deduplicated = deduplicateCompanies(allRaw);
		const filtered = filterByParams(deduplicated, params);
		const finalList = filtered.slice(0, targetCount);

		// ── Phase 4: Upsert companies to DB ─────────────────────────────
		const companyIds: Array<{ id: string; raw: RawCompanyData }> = [];

		for (const raw of finalList) {
			try {
				const id = await upsertCompany(db, raw, searchId);
				companyIds.push({ id, raw });
				companiesFound++;
			} catch (e: unknown) {
				errors.push({
					step: 'upsert_company',
					error: `${raw.name}: ${e instanceof Error ? e.message : String(e)}`,
				});
			}
		}

		// ── Phase 5: Score each company via LLM ─────────────────────────
		let bestScore = 0;

		await Promise.allSettled(
			companyIds.map(async ({ id, raw }) => {
				await sem.acquire();
				try {
					const company = await db.select().from(companies).where(eq(companies.id, id)).get();
					if (!company) return;

					const { totalScore, scoreLabel } = await scoreCompanyWithLlm(bedrock, db, id, company);

					// Update company aggregate score
					const band = totalScore >= 75 ? 'hot' : totalScore >= 55 ? 'warm' : totalScore >= 35 ? 'qualified' : 'cold';
					await db.update(companies)
						.set({
							prospectScore: totalScore,
							prospectBand: band,
							scoredAt: new Date(),
							updatedAt: new Date(),
						})
						.where(eq(companies.id, id));

					if (totalScore > bestScore) {
						bestScore = totalScore;
					}
					companiesScored++;
				} catch (e: unknown) {
					errors.push({
						step: 'score_company',
						error: `${raw.name}: ${e instanceof Error ? e.message : String(e)}`,
					});
				} finally {
					sem.release();
				}
			})
		);

		// ── Update search record with results ───────────────────────────
		const status: SearchPipelineResult['status'] =
			errors.length === 0 ? 'ok' : companiesFound > 0 ? 'partial' : 'failed';

		await db.update(searches)
			.set({
				status: status === 'failed' ? 'failed' : 'completed',
				resultCount: companiesFound,
				bestScore: bestScore > 0 ? bestScore : null,
				completedAt: new Date(),
				errorMessage: errors.length > 0 ? errors.map((e) => `[${e.step}] ${e.error}`).join('; ') : null,
			})
			.where(eq(searches.id, searchId));

		return {
			status,
			companiesFound,
			companiesScored,
			errors,
			durationMs: Date.now() - start,
		};
	} catch (e: unknown) {
		// ── Catastrophic failure — update search status ──────────────────
		const errorMsg = e instanceof Error ? e.message : String(e);

		await db.update(searches)
			.set({
				status: 'failed',
				completedAt: new Date(),
				errorMessage: errorMsg.slice(0, 500),
			})
			.where(eq(searches.id, searchId));

		return {
			status: 'failed',
			companiesFound,
			companiesScored,
			errors: [...errors, { step: 'pipeline', error: errorMsg }],
			durationMs: Date.now() - start,
		};
	}
}
