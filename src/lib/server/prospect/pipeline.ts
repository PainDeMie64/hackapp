import { eq } from 'drizzle-orm';
import type { Db } from '../db/index.js';
import { companies, companyScores, sources, type ScoringDimension } from '../db/schema.js';
import { extractCompaniesFromText } from './extract.js';
import { scoreCompany, type ScoringResult } from './scoring.js';
import type { ExtractedCompany } from './schemas.js';

export interface PipelineResult {
	sourceId: string;
	companiesProcessed: number;
	results: {
		companyId: string;
		name: string;
		score: number;
		band: string;
		isNew: boolean;
	}[];
	errors: string[];
}

async function upsertSource(db: Db, url: string, name?: string): Promise<string> {
	const existing = await db.select().from(sources).where(eq(sources.url, url)).get();
	if (existing) {
		await db
			.update(sources)
			.set({ lastCrawledAt: new Date(), updatedAt: new Date() })
			.where(eq(sources.id, existing.id));
		return existing.id;
	}

	const id = crypto.randomUUID();
	await db.insert(sources).values({
		id,
		url,
		name: name ?? url,
		type: 'pdf',
		isActive: true,
	});
	return id;
}

async function upsertCompany(
	db: Db,
	data: ExtractedCompany,
	scoring: ScoringResult
): Promise<{ id: string; isNew: boolean }> {
	const now = new Date();
	const existing = data.domain
		? await db.select().from(companies).where(eq(companies.domain, data.domain)).get()
		: await db.select().from(companies).where(eq(companies.name, data.name)).get();

	const companyData = {
		name: data.name,
		domain: data.domain ?? null,
		description: data.description ?? null,
		sector: data.sector ?? null,
		subsector: data.subsector ?? null,
		locationCity: data.locationCity ?? null,
		locationCountry: data.locationCountry ?? null,
		employeeCount: data.employeeCount ?? null,
		revenueEur: data.revenueEur ?? null,
		revenueYear: data.revenueYear ?? null,
		techStack: data.techStack ? JSON.stringify(data.techStack) : null,
		siren: data.siren ?? null,
		linkedinUrl: data.linkedinUrl ?? null,
		prospectScore: scoring.totalScore,
		prospectBand: scoring.band,
		scoredAt: now,
		enrichmentStatus: 'completed' as const,
		lastEnrichedAt: now,
		updatedAt: now,
	};

	if (existing) {
		await db.update(companies).set(companyData).where(eq(companies.id, existing.id));
		return { id: existing.id, isNew: false };
	}

	const id = crypto.randomUUID();
	await db.insert(companies).values({ id, ...companyData, status: 'active', createdAt: now });
	return { id, isNew: true };
}

async function upsertScores(
	db: Db,
	companyId: string,
	scoring: ScoringResult
): Promise<void> {
	for (const dim of scoring.dimensions) {
		const existing = await db
			.select()
			.from(companyScores)
			.where(eq(companyScores.companyId, companyId))
			.get();

		const values = {
			companyId,
			dimension: dim.dimension as ScoringDimension,
			score: dim.score,
			signals: JSON.stringify(dim.signals),
			scoredAt: new Date(),
		};

		const match = await db
			.select()
			.from(companyScores)
			.where(eq(companyScores.companyId, companyId))
			.all();

		const existingDim = match.find((r) => r.dimension === dim.dimension);

		if (existingDim) {
			await db
				.update(companyScores)
				.set(values)
				.where(eq(companyScores.id, existingDim.id));
		} else {
			await db.insert(companyScores).values({ id: crypto.randomUUID(), ...values });
		}
	}
}

export async function runPipeline(
	db: Db,
	pdfText: string,
	sourceUrl: string,
	sourceName?: string,
	bedrock?: import('$lib/server/llm/bedrock.js').BedrockClient
): Promise<PipelineResult> {
	const sourceId = await upsertSource(db, sourceUrl, sourceName);
	const errors: string[] = [];

	if (!bedrock) {
		return { sourceId, companiesProcessed: 0, results: [], errors: ['BedrockClient required'] };
	}

	let extraction;
	try {
		extraction = await extractCompaniesFromText(pdfText, sourceUrl, bedrock);
	} catch (e) {
		return {
			sourceId,
			companiesProcessed: 0,
			results: [],
			errors: [`Extraction failed: ${e instanceof Error ? e.message : String(e)}`],
		};
	}

	const results: PipelineResult['results'] = [];

	for (const company of extraction.companies) {
		try {
			const scoring = scoreCompany(company);
			const { id, isNew } = await upsertCompany(db, company, scoring);
			await upsertScores(db, id, scoring);

			results.push({
				companyId: id,
				name: company.name,
				score: scoring.totalScore,
				band: scoring.band,
				isNew,
			});
		} catch (e) {
			errors.push(
				`Failed to process ${company.name}: ${e instanceof Error ? e.message : String(e)}`
			);
		}
	}

	return {
		sourceId,
		companiesProcessed: results.length,
		results,
		errors,
	};
}
