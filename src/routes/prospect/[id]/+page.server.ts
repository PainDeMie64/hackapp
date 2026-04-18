import type { PageServerLoad } from './$types.js';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/server/db/index.js';
import { companies, news, sources } from '$lib/server/db/schema.js';
import { eq, desc } from 'drizzle-orm';
import { formatRelativeDate } from '$lib/utils/format.js';

export const load: PageServerLoad = async ({ params, platform }) => {
	try {
		const d1 = platform?.env?.DB;
		if (!d1) throw error(503, 'Base de donnees non disponible');

		const db = getDb(d1);

		const companyRows = await db.select().from(companies).where(eq(companies.id, params.id));
		if (companyRows.length === 0) throw error(404, 'Entreprise non trouvee');

		const company = companyRows[0];

		const companyNews = await db
			.select()
			.from(news)
			.where(eq(news.companyId, company.id))
			.orderBy(desc(news.publishedAt));

		const allSources = await db.select({ id: sources.id, name: sources.name }).from(sources);
		const sourceMap = new Map(allSources.map((s) => [s.id, s.name ?? 'Source inconnue']));

		const scores = companyNews.map((n) => n.relevanceScore).filter((s): s is number => s != null);
		const score = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

		const categoryGroups = new Map<string, number[]>();
		for (const n of companyNews) {
			const cat = n.category ?? 'Autre';
			const existing = categoryGroups.get(cat) ?? [];
			if (n.relevanceScore != null) existing.push(n.relevanceScore);
			categoryGroups.set(cat, existing);
		}

		const scoreBreakdown = [...categoryGroups.entries()].map(([label, catScores]) => ({
			label,
			score: catScores.length > 0 ? Math.round(catScores.reduce((a, b) => a + b, 0) / catScores.length) : 0,
			max: 100
		}));

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
			scoreBreakdown,
			companyNews: mappedNews,
			sources: sourceNames,
			reason,
			lastUpdated: company.updatedAt ? formatRelativeDate(company.updatedAt) : 'N/A'
		};
	} catch (e) {
		if (e && typeof e === 'object' && 'status' in e) throw e;
		throw error(503, 'Erreur de chargement');
	}
};
