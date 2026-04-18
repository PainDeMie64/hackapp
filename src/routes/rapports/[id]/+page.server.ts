import type { PageServerLoad } from './$types.js';
import { getDb } from '$lib/server/db/index.js';
import { news, sources, companies } from '$lib/server/db/schema.js';
import { desc } from 'drizzle-orm';
import { formatRelativeDate } from '$lib/utils/format.js';

export const load: PageServerLoad = async ({ platform }) => {
	const empty = {
		report: { month: '', generatedDate: '', totalTracked: 0, newProspects: 0, removedProspects: 0, avgScore: 0, avgScoreChange: 0 },
		topMovers: [] as { name: string; score: number; change: number; reason: string }[],
		topDecliners: [] as { name: string; score: number; change: number; reason: string }[],
		sectorBreakdown: [] as { sector: string; count: number; avgScore: number; color: string }[],
		keyEvents: [] as { title: string; source: string; date: string; category: 'industrie' | 'client' | 'prospect' }[],
		newProspects: [] as { name: string; sector: string; score: number }[]
	};

	try {
		const d1 = platform?.env?.DB;
		if (!d1) return empty;

		const db = getDb(d1);

		const allCompanies = await db.select().from(companies);
		const allNews = await db.select().from(news);
		const allSources = await db.select({ id: sources.id, name: sources.name }).from(sources);
		const sourceMap = new Map(allSources.map((s) => [s.id, s.name ?? 'Source inconnue']));

		const newsByCompany = new Map<string, typeof allNews>();
		for (const n of allNews) {
			const existing = newsByCompany.get(n.companyId) ?? [];
			existing.push(n);
			newsByCompany.set(n.companyId, existing);
		}

		const scored = allCompanies.map((c) => {
			const cn = newsByCompany.get(c.id) ?? [];
			const scores = cn.map((n) => n.relevanceScore).filter((s): s is number => s != null);
			const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
			return { ...c, score: avg, newsCount: cn.length };
		});

		const sectorColors: Record<string, string> = {
			aeronautique: 'bg-blue-500', defense: 'bg-indigo-500', energie: 'bg-amber-500',
			naval: 'bg-cyan-500', automobile: 'bg-rose-500', electronique: 'bg-violet-500',
			it: 'bg-emerald-500', pharma: 'bg-pink-500', telecoms: 'bg-teal-500', industrie: 'bg-orange-500'
		};

		const sectorMap = new Map<string, { count: number; totalScore: number }>();
		for (const c of scored) {
			const s = (c.sector ?? 'autre').toLowerCase();
			const existing = sectorMap.get(s) ?? { count: 0, totalScore: 0 };
			existing.count++;
			existing.totalScore += c.score;
			sectorMap.set(s, existing);
		}

		const sectorBreakdown = [...sectorMap.entries()]
			.map(([sector, v]) => ({
				sector: sector.charAt(0).toUpperCase() + sector.slice(1),
				count: v.count,
				avgScore: v.count > 0 ? Math.round(v.totalScore / v.count) : 0,
				color: sectorColors[sector] ?? 'bg-gray-500'
			}))
			.sort((a, b) => b.count - a.count);

		const totalScores = scored.filter((c) => c.score > 0).map((c) => c.score);
		const avgScore = totalScores.length > 0 ? Math.round(totalScores.reduce((a, b) => a + b, 0) / totalScores.length) : 0;

		const newsRows = await db
			.select({ title: news.title, category: news.category, publishedAt: news.publishedAt, sourceId: news.sourceId })
			.from(news)
			.orderBy(desc(news.publishedAt))
			.limit(5);

		const keyEvents = newsRows.map((row) => ({
			title: row.title,
			source: sourceMap.get(row.sourceId) ?? 'Source inconnue',
			date: formatRelativeDate(row.publishedAt),
			category: (row.category ?? 'industrie') as 'industrie' | 'client' | 'prospect'
		}));

		return {
			report: {
				month: 'Avril 2026',
				generatedDate: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
				totalTracked: allCompanies.length,
				newProspects: allCompanies.filter((c) => {
					const created = c.createdAt;
					if (!created) return false;
					const d = created instanceof Date ? created : new Date(created);
					return Date.now() - d.getTime() < 30 * 24 * 60 * 60 * 1000;
				}).length,
				removedProspects: 0,
				avgScore,
				avgScoreChange: 0
			},
			topMovers: scored.filter((c) => c.score >= 70).sort((a, b) => b.score - a.score).slice(0, 3).map((c) => ({
				name: c.name, score: c.score, change: 0, reason: (newsByCompany.get(c.id) ?? [])[0]?.title ?? ''
			})),
			topDecliners: scored.filter((c) => c.score > 0 && c.score < 70).sort((a, b) => a.score - b.score).slice(0, 2).map((c) => ({
				name: c.name, score: c.score, change: 0, reason: (newsByCompany.get(c.id) ?? [])[0]?.title ?? ''
			})),
			sectorBreakdown,
			keyEvents,
			newProspects: scored.filter((c) => {
				const created = c.createdAt;
				if (!created) return false;
				const d = created instanceof Date ? created : new Date(created);
				return Date.now() - d.getTime() < 30 * 24 * 60 * 60 * 1000;
			}).map((c) => ({ name: c.name, sector: c.sector ?? 'N/A', score: c.score }))
		};
	} catch {
		return empty;
	}
};
