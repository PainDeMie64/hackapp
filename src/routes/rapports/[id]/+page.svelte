<script lang="ts">
	import { Card, Button, Badge } from '$lib/components/ui/index.js';
	import ScoreBadge from '$lib/components/ui/ScoreBadge.svelte';
	import CompanyAvatar from '$lib/components/ui/CompanyAvatar.svelte';
	import NewsItem from '$lib/components/ui/NewsItem.svelte';
	import { ArrowLeft, Download, TrendingUp, TrendingDown, Minus, Users, Building2, Search, Sparkles } from 'lucide-svelte';

	let { data } = $props();

	let report = $derived(data.report);
	let topMovers = $derived(data.topMovers);
	let topDecliners = $derived(data.topDecliners);
	let sectorBreakdown = $derived(data.sectorBreakdown);
	let keyEvents = $derived(data.keyEvents);
	let newProspects = $derived(data.newProspects);

	const sectorDotColors = [
		'bg-blue-500', 'bg-indigo-500', 'bg-amber-500', 'bg-cyan-500', 'bg-rose-500', 'bg-violet-500'
	];

	let totalSectorCount = $derived(sectorBreakdown.reduce((sum: number, s: any) => sum + s.count, 0));
</script>

<style>
	@keyframes fade-slide-up {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.kpi-card {
		animation: fade-slide-up 0.4s ease-out both;
	}

	.kpi-card:nth-child(1) { animation-delay: 0ms; }
	.kpi-card:nth-child(2) { animation-delay: 80ms; }
	.kpi-card:nth-child(3) { animation-delay: 160ms; }
	.kpi-card:nth-child(4) { animation-delay: 240ms; }

	@keyframes trend-bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-2px); }
	}

	.trend-arrow {
		animation: trend-bounce 2s ease-in-out infinite;
	}
</style>

<div>
	<div class="flex items-center justify-between mb-8">
		<a href="/rapports" class="flex items-center gap-2 text-base text-surface-400 hover:text-surface-900 transition-colors">
			<ArrowLeft class="h-5 w-5" />
			Retour aux rapports
		</a>
		<Button variant="secondary" size="lg" class="text-base px-5 py-3 rounded-xl">
			<Download class="h-5 w-5" />
			Exporter en PDF
		</Button>
	</div>

	<div class="mb-8">
		<h1 class="text-2xl font-bold text-surface-900">Rapport Bi-Mensuel — {report.month}</h1>
		<p class="text-base text-surface-400 mt-1">Genere le {report.generatedDate}</p>
	</div>

	<!-- KPI Cards -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
		<div class="kpi-card rounded-2xl bg-white border border-surface-200 border-l-4 border-l-blue-500 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
			<div class="flex items-center gap-3">
				<div class="h-11 w-11 rounded-xl bg-blue-500/15 flex items-center justify-center">
					<Users class="h-5 w-5 text-blue-600" />
				</div>
				<div>
					<p class="text-sm text-surface-400 font-medium">Prospects suivis</p>
					<div class="flex items-baseline gap-2">
						<p class="text-2xl font-bold text-surface-900">{report.totalTracked}</p>
						<div class="trend-arrow flex items-center gap-0.5 text-xs font-semibold text-blue-500">
							<Minus class="h-3 w-3" />
							stable
						</div>
					</div>
				</div>
			</div>
			<!-- Mini sparkline -->
			<div class="mt-3 flex items-end gap-0.5 h-6">
				{#each [40, 42, 41, 43, 44, 43, 45] as val, i}
					<div
						class="flex-1 rounded-sm bg-blue-400/40 transition-all duration-300"
						style="height: {(val / 50) * 100}%"
					></div>
				{/each}
			</div>
		</div>

		<div class="kpi-card rounded-2xl bg-white border border-surface-200 border-l-4 border-l-green-500 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
			<div class="flex items-center gap-3">
				<div class="h-11 w-11 rounded-xl bg-green-500/15 flex items-center justify-center">
					<TrendingUp class="h-5 w-5 text-green-600" />
				</div>
				<div>
					<p class="text-sm text-surface-400 font-medium">Nouveaux</p>
					<div class="flex items-baseline gap-2">
						<p class="text-2xl font-bold text-surface-900">+{report.newProspects}</p>
						<div class="trend-arrow flex items-center gap-0.5 text-xs font-semibold text-green-500">
							<TrendingUp class="h-3 w-3" />
							+4
						</div>
					</div>
				</div>
			</div>
			<div class="mt-3 flex items-end gap-0.5 h-6">
				{#each [5, 8, 6, 9, 7, 10, 12] as val}
					<div
						class="flex-1 rounded-sm bg-green-400/40 transition-all duration-300"
						style="height: {(val / 15) * 100}%"
					></div>
				{/each}
			</div>
		</div>

		<div class="kpi-card rounded-2xl bg-white border border-surface-200 border-l-4 border-l-red-500 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
			<div class="flex items-center gap-3">
				<div class="h-11 w-11 rounded-xl bg-red-500/15 flex items-center justify-center">
					<TrendingDown class="h-5 w-5 text-red-500" />
				</div>
				<div>
					<p class="text-sm text-surface-400 font-medium">Retires</p>
					<div class="flex items-baseline gap-2">
						<p class="text-2xl font-bold text-surface-900">-{report.removedProspects}</p>
						<div class="trend-arrow flex items-center gap-0.5 text-xs font-semibold text-red-400">
							<TrendingDown class="h-3 w-3" />
							-1
						</div>
					</div>
				</div>
			</div>
			<div class="mt-3 flex items-end gap-0.5 h-6">
				{#each [4, 2, 5, 3, 2, 4, 3] as val}
					<div
						class="flex-1 rounded-sm bg-red-400/40 transition-all duration-300"
						style="height: {(val / 6) * 100}%"
					></div>
				{/each}
			</div>
		</div>

		<div class="kpi-card rounded-2xl bg-white border border-surface-200 border-l-4 border-l-amber-500 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
			<div class="flex items-center gap-3">
				<div class="h-11 w-11 rounded-xl bg-amber-500/15 flex items-center justify-center">
					<Sparkles class="h-5 w-5 text-amber-600" />
				</div>
				<div>
					<p class="text-sm text-surface-400 font-medium">Score moyen</p>
					<div class="flex items-baseline gap-2">
						<p class="text-2xl font-bold text-surface-900">{report.avgScore}</p>
						<div class="trend-arrow flex items-center gap-0.5 text-xs font-semibold text-green-500">
							<TrendingUp class="h-3 w-3" />
							+{report.avgScoreChange}
						</div>
					</div>
				</div>
			</div>
			<div class="mt-3 flex items-end gap-0.5 h-6">
				{#each [68, 70, 71, 72, 71, 73, 74] as val}
					<div
						class="flex-1 rounded-sm bg-amber-400/40 transition-all duration-300"
						style="height: {((val - 65) / 15) * 100}%"
					></div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Top Movers / Decliners -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
		<Card padding="lg" class="rounded-2xl hover:shadow-md transition-shadow duration-200">
			<h2 class="text-lg font-bold text-surface-900 mb-5 flex items-center gap-2">
				<div class="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
					<TrendingUp class="h-4 w-4 text-green-600" />
				</div>
				Plus Fortes Progressions
			</h2>
			<div class="flex flex-col gap-1">
				{#each topMovers as p, i}
					<div class="flex items-center gap-3 py-3 px-3 -mx-3 rounded-xl border-b border-surface-100 last:border-0 hover:bg-surface-50 transition-colors duration-150">
						<CompanyAvatar name={p.name} size="sm" />
						<div class="flex-1 min-w-0">
							<p class="text-base font-semibold text-surface-900">{p.name}</p>
							<p class="text-sm text-surface-400 truncate">{p.reason}</p>
						</div>
						<div class="flex items-center gap-2.5 shrink-0">
							<div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
								<span class="text-xs font-bold text-green-700">+{p.change}</span>
							</div>
							<ScoreBadge score={p.score} size="sm" />
						</div>
					</div>
				{/each}
			</div>
		</Card>

		<Card padding="lg" class="rounded-2xl hover:shadow-md transition-shadow duration-200">
			<h2 class="text-lg font-bold text-surface-900 mb-5 flex items-center gap-2">
				<div class="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center">
					<TrendingDown class="h-4 w-4 text-red-500" />
				</div>
				A Surveiller
			</h2>
			<div class="flex flex-col gap-1">
				{#each topDecliners as p, i}
					<div class="flex items-center gap-3 py-3 px-3 -mx-3 rounded-xl border-b border-surface-100 last:border-0 hover:bg-surface-50 transition-colors duration-150">
						<CompanyAvatar name={p.name} size="sm" />
						<div class="flex-1 min-w-0">
							<p class="text-base font-semibold text-surface-900">{p.name}</p>
							<p class="text-sm text-surface-400 truncate">{p.reason}</p>
						</div>
						<div class="flex items-center gap-2.5 shrink-0">
							<div class="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
								<span class="text-xs font-bold text-red-600">{p.change}</span>
							</div>
							<ScoreBadge score={p.score} size="sm" />
						</div>
					</div>
				{/each}
			</div>
		</Card>
	</div>

	<!-- Sector Breakdown + New Prospects -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
		<Card padding="lg" class="rounded-2xl hover:shadow-md transition-shadow duration-200">
			<h2 class="text-lg font-bold text-surface-900 mb-5 flex items-center gap-2">
				<div class="h-8 w-8 rounded-lg bg-brand-100 flex items-center justify-center">
					<Building2 class="h-4 w-4 text-brand-500" />
				</div>
				Repartition Sectorielle
			</h2>

			<!-- Stacked horizontal bar -->
			<div class="mb-5">
				<div class="h-5 w-full rounded-full overflow-hidden flex">
					{#each sectorBreakdown as s}
						<div
							class="{s.color} first:rounded-l-full last:rounded-r-full transition-all duration-500"
							style="width: {(s.count / totalSectorCount) * 100}%"
							title="{s.sector}: {s.count}"
						></div>
					{/each}
				</div>
				<!-- Legend dots -->
				<div class="flex flex-wrap gap-x-4 gap-y-1 mt-3">
					{#each sectorBreakdown as s}
						<div class="flex items-center gap-1.5">
							<div class="h-2.5 w-2.5 rounded-full {s.color}"></div>
							<span class="text-xs text-surface-400">{s.sector}</span>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex flex-col gap-2.5">
				{#each sectorBreakdown as s}
					<div class="flex items-center gap-3">
						<div class="h-3 w-3 rounded-full {s.color} shrink-0"></div>
						<span class="text-sm font-medium text-surface-700 w-28 shrink-0">{s.sector}</span>
						<div class="flex-1 h-2.5 bg-surface-100 rounded-full overflow-hidden">
							<div
								class="{s.color} h-full rounded-full transition-all duration-500"
								style="width: {(s.count / 20) * 100}%"
							></div>
						</div>
						<span class="text-xs text-surface-400 w-20 text-right">{s.count} prospects</span>
						<span class="text-sm font-bold text-surface-900 w-8 text-right">{s.avgScore}</span>
					</div>
				{/each}
			</div>
		</Card>

		<Card padding="lg" class="rounded-2xl hover:shadow-md transition-shadow duration-200">
			<h2 class="text-lg font-bold text-surface-900 mb-5 flex items-center gap-2">
				<div class="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
					<Sparkles class="h-4 w-4 text-green-600" />
				</div>
				Nouveaux Prospects
			</h2>
			<div class="flex flex-col gap-1">
				{#each newProspects as p}
					<div class="flex items-center gap-3 py-3 px-3 -mx-3 rounded-xl border-b border-surface-100 last:border-0 hover:bg-surface-50 transition-colors duration-150">
						<CompanyAvatar name={p.name} size="sm" />
						<div class="flex-1 min-w-0">
							<p class="text-base font-semibold text-surface-900">{p.name}</p>
							<p class="text-sm text-surface-400">{p.sector}</p>
						</div>
						<ScoreBadge score={p.score} size="sm" />
					</div>
				{/each}
			</div>
		</Card>
	</div>

	<Card padding="lg" class="rounded-2xl hover:shadow-md transition-shadow duration-200">
		<h2 class="text-lg font-bold text-surface-900 mb-4">Evenements Marquants de la Periode</h2>
		<div class="divide-y divide-surface-200">
			{#each keyEvents as item}
				<NewsItem {...item} />
			{/each}
		</div>
	</Card>
</div>
