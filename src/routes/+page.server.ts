import type { PageServerLoad } from './$types.js';
import { getDb } from '$lib/server/db/index.js';
import { news, sources, companies, prospectScores } from '$lib/server/db/schema.js';
import { desc, eq } from 'drizzle-orm';
import { formatRelativeDate } from '$lib/utils/format.js';

export const load: PageServerLoad = async ({ platform }) => {
	const empty = {
		news: [] as { title: string; source: string; date: string; category: 'industrie' | 'client' | 'prospect' }[],
		companyCount: 0,
		topProspects: [] as { name: string; score: number; band: string }[],
		bandBreakdown: { hot: 0, warm: 0, qualified: 0, cold: 0 },
		hasData: false
	};

	try {
		const d1 = platform?.env?.DB;
		if (!d1) return empty;

		const db = getDb(d1);

		const newsRows = await db
			.select({ title: news.title, category: news.category, publishedAt: news.publishedAt, sourceId: news.sourceId })
			.from(news)
			.orderBy(desc(news.publishedAt))
			.limit(5);

		const allSources = await db.select({ id: sources.id, name: sources.name }).from(sources);
		const sourceMap = new Map(allSources.map((s) => [s.id, s.name ?? 'Source inconnue']));

		const mappedNews = newsRows.map((row) => ({
			title: row.title,
			source: sourceMap.get(row.sourceId) ?? 'Source inconnue',
			date: formatRelativeDate(row.publishedAt),
			category: (row.category ?? 'industrie') as 'industrie' | 'client' | 'prospect'
		}));

		const companyRows = await db.select({ id: companies.id, name: companies.name }).from(companies);

		const scores = await db
			.select({ companyId: prospectScores.companyId, totalScore: prospectScores.totalScore, scoreLabel: prospectScores.scoreLabel })
			.from(prospectScores)
			.orderBy(desc(prospectScores.totalScore))
			.limit(3);

		const companyMap = new Map(companyRows.map((c) => [c.id, c.name]));

		const topProspects = scores.map((s) => ({
			name: companyMap.get(s.companyId) ?? 'Inconnu',
			score: s.totalScore ?? 0,
			band: s.scoreLabel ?? 'cold'
		}));

		const allScores = await db
			.select({ scoreLabel: prospectScores.scoreLabel })
			.from(prospectScores);

		const bandBreakdown = { hot: 0, warm: 0, qualified: 0, cold: 0 };
		for (const s of allScores) {
			const band = (s.scoreLabel ?? 'cold').toLowerCase() as keyof typeof bandBreakdown;
			if (band in bandBreakdown) bandBreakdown[band]++;
		}

		return {
			news: mappedNews,
			companyCount: companyRows.length,
			topProspects,
			bandBreakdown,
			hasData: companyRows.length > 0
		};
	} catch {
		return empty;
	}
};
