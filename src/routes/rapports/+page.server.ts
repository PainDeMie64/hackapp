import type { PageServerLoad } from './$types.js';
import { getDb } from '$lib/server/db/index.js';
import { news, sources } from '$lib/server/db/schema.js';
import { eq, desc } from 'drizzle-orm';
import { formatRelativeDate } from '$lib/utils/format.js';

export const load: PageServerLoad = async ({ platform }) => {
	const empty = {
		reports: [] as { month: string; date: string; tracked: number; newProspects: number; isNew: boolean }[],
		clientNews: [] as { title: string; source: string; date: string; category: 'client' }[]
	};

	try {
		const d1 = platform?.env?.DB;
		if (!d1) return empty;

		const db = getDb(d1);

		const clientNewsRows = await db
			.select({ title: news.title, publishedAt: news.publishedAt, sourceId: news.sourceId })
			.from(news)
			.where(eq(news.category, 'client'))
			.orderBy(desc(news.publishedAt))
			.limit(5);

		const allSources = await db.select({ id: sources.id, name: sources.name }).from(sources);
		const sourceMap = new Map(allSources.map((s) => [s.id, s.name ?? 'Source inconnue']));

		const clientNews = clientNewsRows.map((row) => ({
			title: row.title,
			source: sourceMap.get(row.sourceId) ?? 'Source inconnue',
			date: formatRelativeDate(row.publishedAt),
			category: 'client' as const
		}));

		const reports = [
			{ month: 'Avril 2026', date: '18 avril 2026', tracked: 313, newProspects: 47, isNew: true },
			{ month: 'Mars 2026', date: '1 mars 2026', tracked: 266, newProspects: 32, isNew: false },
		];

		return { reports, clientNews };
	} catch {
		return empty;
	}
};
