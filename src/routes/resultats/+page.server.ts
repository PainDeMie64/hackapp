import type { PageServerLoad } from './$types.js';
import { getDb } from '$lib/server/db/index.js';
import { companies, news, sources } from '$lib/server/db/schema.js';

export const load: PageServerLoad = async ({ platform }) => {
	const empty = { prospects: [] as { id: string; name: string; score: number; sector: string; locationCity: string | null; employeeCount: number | null; revenueEur: number | null; growth: string | null; reason: string; sources: string[]; rank: number }[] };

	try {
		const d1 = platform?.env?.DB;
		if (!d1) return empty;

		const db = getDb(d1);

		const companyRows = await db.select().from(companies);
		if (companyRows.length === 0) return empty;

		const allNews = await db.select().from(news);
		const allSources = await db.select({ id: sources.id, name: sources.name }).from(sources);
		const sourceMap = new Map(allSources.map((s) => [s.id, s.name ?? 'Source inconnue']));

		const newsByCompany = new Map<string, typeof allNews>();
		for (const n of allNews) {
			const existing = newsByCompany.get(n.companyId) ?? [];
			existing.push(n);
			newsByCompany.set(n.companyId, existing);
		}

		const prospects = companyRows.map((company) => {
			const companyNews = newsByCompany.get(company.id) ?? [];

			const scores = companyNews
				.map((n) => n.relevanceScore)
				.filter((s): s is number => s != null);
			const score = scores.length > 0
				? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
				: 0;

			const topNews = companyNews.length > 0
				? [...companyNews].sort((a, b) => (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0))[0]
				: null;
			const reason = topNews?.title ?? 'Aucune actualite';

			const sourceNames = [
				...new Set(companyNews.map((n) => sourceMap.get(n.sourceId)).filter(Boolean))
			] as string[];

			return {
				id: company.id,
				name: company.name,
				score,
				sector: company.sector ?? 'N/A',
				locationCity: company.locationCity ?? null,
				employeeCount: company.employeeCount ?? null,
				revenueEur: company.revenueEur ?? null,
				growth: null as string | null,
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
