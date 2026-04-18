<script lang="ts">
	import { Card, Badge, CompanyAvatar, ScoreRing } from '$lib/components/ui/index.js';
	import ScoreBadge from '$lib/components/ui/ScoreBadge.svelte';
	import MetricCell from '$lib/components/ui/MetricCell.svelte';
	import {
		ArrowLeft,
		Sparkles,
		Trophy,
		BarChart3,
		ArrowUpDown,
		Hash,
		Zap,
		ChevronRight,
		Search
	} from 'lucide-svelte';
	import { formatRevenue, formatEmployees } from '$lib/utils/format.js';

	let { data } = $props();

	let hero = $derived(data.prospects.length > 0 ? data.prospects[0] : null);
	let prospects = $derived(data.prospects.slice(1));

	const allScores = $derived(data.prospects.map((p: any) => p.score as number));
	let averageScore = $derived(allScores.length > 0 ? Math.round(allScores.reduce((a: number, b: number) => a + b, 0) / allScores.length) : 0);
	let maxScore = $derived(allScores.length > 0 ? Math.max(...allScores) : 0);
	let totalResults = $derived(allScores.length);

	let activeSort = $state<'score' | 'ca'>('score');

	function scoreBorder(score: number): string {
		if (score >= 80) return 'border-l-4 border-l-score-high';
		if (score >= 60) return 'border-l-4 border-l-score-mid';
		return 'border-l-4 border-l-score-low';
	}
</script>

<div class="space-y-6">
	<!-- Back link -->
	<div class="flex items-center gap-4">
		<a
			href="/"
			class="flex items-center gap-2 text-base text-surface-400 hover:text-surface-900 transition-colors"
		>
			<ArrowLeft class="h-5 w-5" />
			Retour
		</a>
		<span class="text-surface-300">|</span>
		<p class="text-lg font-medium text-surface-500">
			{totalResults} prospect{totalResults > 1 ? 's' : ''} dans la base
		</p>
	</div>

	<!-- Summary stats bar -->
	<div
		class="flex flex-wrap items-center gap-6 rounded-2xl bg-white border border-surface-200 shadow-sm px-6 py-4"
	>
		<div class="flex items-center gap-2">
			<div class="flex items-center justify-center h-8 w-8 rounded-lg bg-brand-50">
				<Hash class="h-4 w-4 text-brand-500" />
			</div>
			<div class="flex flex-col">
				<span class="text-xs font-medium text-surface-400">Resultats</span>
				<span class="text-lg font-bold text-surface-900">{totalResults}</span>
			</div>
		</div>

		<div class="w-px h-8 bg-surface-200"></div>

		<div class="flex items-center gap-2">
			<div class="flex items-center justify-center h-8 w-8 rounded-lg bg-brand-50">
				<BarChart3 class="h-4 w-4 text-brand-500" />
			</div>
			<div class="flex flex-col">
				<span class="text-xs font-medium text-surface-400">Score moyen</span>
				<span class="text-lg font-bold text-surface-900">{averageScore}</span>
			</div>
		</div>

		<div class="w-px h-8 bg-surface-200"></div>

		<div class="flex items-center gap-2">
			<div class="flex items-center justify-center h-8 w-8 rounded-lg bg-score-high-bg">
				<Zap class="h-4 w-4 text-score-high" />
			</div>
			<div class="flex flex-col">
				<span class="text-xs font-medium text-surface-400">Score max</span>
				<span class="text-lg font-bold text-score-high">{maxScore}</span>
			</div>
		</div>

		<div class="flex-1"></div>

		<div class="flex items-center gap-2">
			<button
				class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors {activeSort ===
				'score'
					? 'bg-brand-500 text-white shadow-sm'
					: 'bg-surface-100 text-surface-500 hover:bg-surface-200'}"
				onclick={() => (activeSort = 'score')}
			>
				<ArrowUpDown class="h-3.5 w-3.5" />
				Trier par score
			</button>
			<button
				class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors {activeSort ===
				'ca'
					? 'bg-brand-500 text-white shadow-sm'
					: 'bg-surface-100 text-surface-500 hover:bg-surface-200'}"
				onclick={() => (activeSort = 'ca')}
			>
				<ArrowUpDown class="h-3.5 w-3.5" />
				Trier par CA
			</button>
		</div>
	</div>

	{#if !hero}
		<Card padding="lg" class="rounded-2xl">
			<div class="py-12 text-center">
				<Search class="h-12 w-12 text-surface-300 mx-auto mb-4" />
				<p class="text-lg font-medium text-surface-500">Aucun prospect trouve</p>
				<p class="text-base text-surface-400 mt-1">Lancez une recherche pour voir les resultats ici.</p>
				<a href="/recherche" class="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer bg-brand-500 text-white hover:bg-brand-600 text-base px-6 py-3 mt-6">
					Nouvelle recherche
				</a>
			</div>
		</Card>
	{:else}

	<!-- Hero Card (#1 prospect) -->
	<div class="animate-in fade-in slide-in-from-bottom" style="--tw-enter-translate-y: 12px;">
		<Card
			padding="none"
			class="relative overflow-hidden rounded-2xl {scoreBorder(hero.score)}"
		>
			<!-- Ribbon badge -->
			<div
				class="absolute top-4 left-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-brand-500 text-white px-3 py-1 text-sm font-semibold shadow-md"
			>
				<Trophy class="h-3.5 w-3.5" />
				Meilleur prospect
			</div>

			<div class="relative p-8 pt-14">
				<div class="flex items-start justify-between mb-6">
					<div class="flex items-center gap-4">
						<CompanyAvatar name={hero.name} size="lg" />
						<div>
							<h2 class="text-2xl font-bold text-surface-900">{hero.name}</h2>
							<p class="text-base text-surface-400">
								{hero.sector ?? 'N/A'} · {hero.locationCity ?? 'N/A'}
							</p>
						</div>
					</div>
					<ScoreRing score={hero.score} size="lg" />
				</div>

				<div
					class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6 pb-6 border-b border-surface-200"
				>
					<MetricCell label="Effectif" value={formatEmployees(hero.employeeCount)} />
					<MetricCell label="Chiffre d'affaires" value={formatRevenue(hero.revenueEur)} />
					<MetricCell label="Secteur" value={hero.sector ?? 'N/A'} />
					<MetricCell label="Localisation" value={hero.locationCity ?? 'N/A'} />
				</div>

				<!-- AI analysis with left border accent -->
				<div
					class="bg-surface-50 rounded-xl p-5 mb-6 border-l-4 border-l-brand-500"
				>
					<div class="flex items-center gap-2 mb-2">
						<Sparkles class="h-4 w-4 text-brand-500" />
						<span class="text-sm font-medium text-surface-400">Analyse IA</span>
					</div>
					<p class="text-lg text-surface-700 italic leading-relaxed">
						{hero.reason}
					</p>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex gap-2">
						{#each (hero.sources ?? []) as source}
							<Badge>{source}</Badge>
						{/each}
					</div>
					<a
						href="/prospect/{hero.id}"
						class="inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 cursor-pointer bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm text-lg px-8 py-3"
					>
						Plus d'informations
						<ChevronRight class="h-5 w-5" />
					</a>
				</div>
			</div>
		</Card>
	</div>

	<!-- Prospect rows (#2+) with timeline -->
	<div class="relative flex flex-col gap-3">
		<!-- Vertical dotted timeline line -->
		<div
			class="absolute left-[39px] top-6 bottom-6 w-px border-l-2 border-dashed border-surface-200 pointer-events-none z-0"
		></div>

		{#each prospects as p, i}
			<div
				class="animate-in fade-in slide-in-from-bottom"
				style="--tw-enter-translate-y: 8px; animation-delay: {(i + 1) * 60}ms; animation-fill-mode: backwards;"
			>
				<Card
					padding="none"
					class="relative z-10 rounded-2xl transition-all duration-200 hover:shadow-md hover:scale-[1.005] {scoreBorder(
						p.score
					)} {i % 2 === 1 ? 'bg-surface-50' : ''}"
				>
					<div class="flex items-center gap-4 py-5 px-6">
						<!-- Timeline node: score badge acts as the node -->
						<div class="flex flex-col items-center gap-1 shrink-0 w-14">
							<span
								class="text-lg font-bold text-surface-300 text-center"
							>
								#{p.rank}
							</span>
							<div
								class="h-2.5 w-2.5 rounded-full bg-surface-300 ring-4 ring-white"
							></div>
						</div>

						<CompanyAvatar name={p.name} size="sm" />

						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-3 mb-1">
								<h3 class="text-lg font-semibold text-surface-900">
									{p.name}
								</h3>
								<ScoreBadge score={p.score} size="sm" />
							</div>
							<p class="text-base text-surface-400">
								{p.sector ?? 'N/A'} · {formatEmployees(p.employeeCount)} sal. · {formatRevenue(p.revenueEur)}
							</p>
							<p class="text-base text-surface-500 italic mt-1">
								{p.reason}
							</p>
						</div>
						<a
							href="/prospect/{p.id}"
							class="inline-flex items-center justify-center gap-1 font-medium rounded-xl transition-all duration-150 text-surface-500 hover:text-brand-600 hover:bg-brand-50 shrink-0 text-sm px-3 py-2"
						>
							Voir
							<ChevronRight class="h-4 w-4" />
						</a>
					</div>
				</Card>
			</div>
		{/each}
	</div>

	{/if}
</div>
