import type { PageServerLoad } from './$types.js';
import { getDb } from '$lib/server/db/index.js';
import { news, sources, companies } from '$lib/server/db/schema.js';
import { desc } from 'drizzle-orm';
import { formatRelativeDate } from '$lib/utils/format.js';

export const load: PageServerLoad = async ({ platform }) => {
	const empty = { news: [] as { title: string; source: string; date: string; category: 'industrie' | 'client' | 'prospect' }[], companyCount: 0, hasData: false };

	try {
		const d1 = platform?.env?.DB;
		if (!d1) return empty;

		const db = getDb(d1);

		const newsRows = await db
			.select({
				title: news.title,
				category: news.category,
				publishedAt: news.publishedAt,
				sourceId: news.sourceId
			})
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

		const companyRows = await db.select({ id: companies.id }).from(companies);

		return { news: mappedNews, companyCount: companyRows.length, hasData: companyRows.length > 0 || newsRows.length > 0 };
	} catch {
		return empty;
	}
};
