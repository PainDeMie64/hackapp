import type { PageServerLoad } from './$types.js';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/server/db/index.js';
import { companies, news, sources, prospectScores } from '$lib/server/db/schema.js';
import { eq, desc } from 'drizzle-orm';
import { formatRelativeDate } from '$lib/utils/format.js';

const SCORE_DIMENSIONS = [
	{ key: 'firmographic', label: 'Firmographie', fields: ['sectorAlignment', 'nafCodeMatch', 'companySize', 'rdDepartmentSize', 'geographicProximity', 'regionalSpecialization', 'companyMaturity', 'organizationalStructure'] },
	{ key: 'financial', label: 'Signaux financiers', fields: ['revenueGrowthGap', 'rdSpendingTrend', 'capexSpikes', 'capexToOpexShift', 'recentFunding', 'publicGrants', 'marginCompression', 'hiringFreezeWithProjects', 'externalSpendInFinancials'] },
	{ key: 'hiring', label: 'Signaux recrutement', fields: ['engineeringJobVolume', 'staleJobPostings', 'repeatedRepostings', 'contractFreelanceLanguage', 'rareSkillsDemand', 'emergingTechDemand', 'highTurnoverSignals', 'recruiterHiringWave', 'aboveMarketSalaries'] },
	{ key: 'project', label: 'Projets & expansion', fields: ['physicalExpansion', 'newProductLaunch', 'platformMigration', 'programMilestones', 'digitalTransformation', 'erpPlmMigration', 'cloudMigration', 'strategicPartnerships'] },
	{ key: 'organizational', label: 'Signaux organisationnels', fields: ['leadershipChange', 'maActivity', 'existingConsultingUsage'] },
	{ key: 'technology', label: 'Signaux technologiques', fields: ['legacyModernization', 'techDebtIndicators', 'cybersecurityGaps', 'industrySpecificSoftware', 'iotIndustry4Adoption'] },
	{ key: 'regulatory', label: 'Pression reglementaire', fields: ['euRegulatoryPressure', 'frenchDefenseBudget', 'certificationNeeds'] },
	{ key: 'events', label: 'Actualites & evenements', fields: ['majorContractWon', 'crisisEvent', 'industryEventPresence'] }
] as const;

export const load: PageServerLoad = async ({ params, platform }) => {
	try {
		const d1 = platform?.env?.DB;
		if (!d1) throw error(503, 'Base de donnees non disponible');

		const db = getDb(d1);

		const companyRows = await db.select().from(companies).where(eq(companies.id, params.id));
		if (companyRows.length === 0) throw error(404, 'Entreprise non trouvee');
		const company = companyRows[0];

		const psRows = await db.select().from(prospectScores).where(eq(prospectScores.companyId, company.id));
		const ps = psRows[0] ?? null;

		const score = ps?.totalScore ?? 0;
		const band = ps?.scoreLabel ?? 'cold';

		const companyNews = await db.select().from(news).where(eq(news.companyId, company.id)).orderBy(desc(news.publishedAt));
		const allSources = await db.select({ id: sources.id, name: sources.name }).from(sources);
		const sourceMap = new Map(allSources.map((s) => [s.id, s.name ?? 'Source inconnue']));

		const hasDetailedScores = ps ? SCORE_DIMENSIONS.some((dim) =>
			dim.fields.some((f) => (ps as any)[f] != null)
		) : false;

		let scoreBreakdown: { label: string; score: number; max: number }[] = [];

		if (hasDetailedScores && ps) {
			scoreBreakdown = SCORE_DIMENSIONS.map((dim) => {
				const values = dim.fields
					.map((f) => (ps as any)[f] as number | null)
					.filter((v): v is number => v != null);
				const avg = values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
				return { label: dim.label, score: avg, max: 100 };
			});
		} else if (companyNews.length > 0) {
			const catMap = new Map<string, number[]>();
			for (const n of companyNews) {
				const cat = n.category ?? 'autre';
				const existing = catMap.get(cat) ?? [];
				if (n.relevanceScore != null) existing.push(n.relevanceScore);
				catMap.set(cat, existing);
			}
			const catLabels: Record<string, string> = {
				regulation: 'Reglementation',
				product_launch: 'Lancement produit',
				partnership: 'Partenariats',
				hiring: 'Recrutement',
				expansion: 'Expansion',
				ma: 'Fusions & acquisitions',
				funding: 'Financement',
				crisis: 'Crise',
				client: 'Client',
				prospect: 'Prospect',
				industrie: 'Industrie',
				other: 'Autre'
			};
			scoreBreakdown = [...catMap.entries()].map(([cat, scores]) => ({
				label: catLabels[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1),
				score: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
				max: 100
			}));
		}

		const mappedNews = companyNews.map((n) => ({
			title: n.title,
			source: sourceMap.get(n.sourceId) ?? 'Source inconnue',
			date: formatRelativeDate(n.publishedAt),
			category: (n.category ?? 'client') as 'industrie' | 'client' | 'prospect'
		}));

		const sourceNames = [...new Set(companyNews.map((n) => sourceMap.get(n.sourceId)).filter(Boolean))] as string[];

		const topNews = companyNews.length > 0
			? [...companyNews].sort((a, b) => (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0))[0]
			: null;
		const reason = topNews?.summary ?? topNews?.title ?? 'Aucune analyse disponible';

		return {
			company,
			score,
			band,
			scoreBreakdown,
			companyNews: mappedNews,
			sources: sourceNames,
			reason,
			lastUpdated: ps?.scoredAt ? formatRelativeDate(ps.scoredAt) : 'N/A'
		};
	} catch (e) {
		if (e && typeof e === 'object' && 'status' in e) throw e;
		throw error(503, 'Erreur de chargement');
	}
};
