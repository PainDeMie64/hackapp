import type { PageServerLoad } from './$types.js';
import { getDb } from '$lib/server/db/index.js';
import { companies, news, sources, prospectScores } from '$lib/server/db/schema.js';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ platform, url }) => {
	const sectorFilter = url.searchParams.get('sector');
	const bandFilter = url.searchParams.get('band');
	const empty = { prospects: [] as { id: string; name: string; score: number; band: string; sector: string; locationCity: string | null; employeeCount: number | null; revenueEur: number | null; reason: string; sources: string[]; rank: number }[] };

	try {
		const d1 = platform?.env?.DB;
		if (!d1) return empty;

		const db = getDb(d1);

		const companyRows = await db.select().from(companies);
		if (companyRows.length === 0) return empty;

		const allScores = await db.select().from(prospectScores);
		const scoreMap = new Map(allScores.map((s) => [s.companyId, s]));

		const allNews = await db.select().from(news);
		const allSources = await db.select({ id: sources.id, name: sources.name }).from(sources);
		const sourceMap = new Map(allSources.map((s) => [s.id, s.name ?? 'Source inconnue']));

		const newsByCompany = new Map<string, typeof allNews>();
		for (const n of allNews) {
			const existing = newsByCompany.get(n.companyId) ?? [];
			existing.push(n);
			newsByCompany.set(n.companyId, existing);
		}

		const sectorKeywords: Record<string, string[]> = {
			aeronautique: ['Aerospace', 'Aeronautique', 'Space'],
			automobile: ['Automotive', 'Automobile', 'EV/Battery'],
			defense: ['Defense', 'Defence', 'Naval', 'Maritime'],
			energie: ['Energy', 'Nuclear', 'Hydrogen', 'Renewables'],
			pharma: ['Pharma', 'Medical', 'Life Sciences', 'Biotech'],
			telecoms: ['Telecoms', 'Telecom'],
			it: ['IT', 'Technology', 'Cloud', 'Cybersecurity', 'PLM'],
			industrie: ['Manufacturing', 'Industrial', 'Construction'],
		};

		let filteredCompanies = companyRows;
		if (sectorFilter && sectorKeywords[sectorFilter]) {
			const keywords = sectorKeywords[sectorFilter];
			filteredCompanies = companyRows.filter(c =>
				keywords.some(k => c.sector?.toLowerCase().includes(k.toLowerCase()))
			);
		}
		if (bandFilter) {
			const bands = bandFilter.split(',');
			filteredCompanies = filteredCompanies.filter(c => {
				const ps = scoreMap.get(c.id);
				return bands.includes(ps?.scoreLabel ?? 'cold');
			});
		}

		const prospects = filteredCompanies.map((company) => {
			const ps = scoreMap.get(company.id);
			const score = ps?.totalScore ?? 0;
			const band = ps?.scoreLabel ?? 'cold';

			const companyNews = newsByCompany.get(company.id) ?? [];
			const topNews = companyNews.length > 0
				? [...companyNews].sort((a, b) => (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0))[0]
				: null;
			const reason = topNews?.title ?? 'Aucune actualite';

			const sourceNames = [...new Set(companyNews.map((n) => sourceMap.get(n.sourceId)).filter(Boolean))] as string[];

			return {
				id: company.id,
				name: company.name,
				score,
				band,
				sector: company.sector ?? 'N/A',
				locationCity: company.locationCity ?? null,
				employeeCount: company.employeeCount ?? null,
				revenueEur: company.revenueEur ?? null,
				reason,
				sources: sourceNames,
				rank: 0
			};
		});

		prospects.sort((a, b) => b.score - a.score);
		prospects.forEach((p, i) => { p.rank = i + 1; });

		return { prospects };
	} catch {
		return empty;
	}
};
