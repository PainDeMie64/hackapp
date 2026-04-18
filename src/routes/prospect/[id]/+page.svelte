<script lang="ts">
	import { Card, Badge, CompanyAvatar, ScoreRing } from '$lib/components/ui/index.js';
	import ScoreBadge from '$lib/components/ui/ScoreBadge.svelte';
	import NewsItem from '$lib/components/ui/NewsItem.svelte';
	import {
		ArrowLeft,
		Sparkles,
		ExternalLink,
		Download,
		BookmarkPlus
	} from 'lucide-svelte';
	import { formatRevenue, formatEmployees } from '$lib/utils/format.js';

	let { data } = $props();

	let mounted = $state(false);

	function exportCsv() {
		const c = data.company;
		const headers = ['name','domain','sector','subsector','location_city','location_country','employee_count','revenue_eur','tech_stack','siren','prospect_score','prospect_band'];
		const values = [c.name,c.domain,c.sector,c.subsector,c.locationCity,c.locationCountry,c.employeeCount,c.revenueEur,c.techStack,c.siren,c.prospectScore,c.prospectBand]
			.map(v => v === null || v === undefined ? '' : String(v).includes(',') ? `"${v}"` : String(v));
		const csv = headers.join(',') + '\n' + values.join(',');
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url; a.download = `${c.name?.replace(/\s+/g, '_') ?? 'company'}.csv`;
		a.click(); URL.revokeObjectURL(url);
	}

	$effect(() => {
		mounted = true;
	});

	let company = $derived({
		id: data.company.id,
		name: data.company.name,
		score: data.score,
		sector: data.company.sector ?? 'N/A',
		location: data.company.locationCity ?? 'N/A',
		website: data.company.domain ?? '',
		headcount: formatEmployees(data.company.employeeCount),
		revenue: formatRevenue(data.company.revenueEur),
		reason: data.reason,
		sources: data.sources,
		lastUpdated: data.lastUpdated
	});

	let scoreBreakdown = $derived(data.scoreBreakdown);

	const compositeScore = $derived(
		scoreBreakdown.length > 0
			? Math.round(scoreBreakdown.reduce((sum: number, item: any) => sum + item.score, 0) / scoreBreakdown.length)
			: data.score
	);

	let news = $derived(data.companyNews);

	let metrics = $derived(
		[
			{ label: 'Effectif', value: data.company.employeeCount ? formatEmployees(data.company.employeeCount) : '' },
			{ label: 'Chiffre d\'affaires', value: data.company.revenueEur ? formatRevenue(data.company.revenueEur) : '' },
			{ label: 'Secteur', value: data.company.sector ?? '' },
			{ label: 'Ville', value: data.company.locationCity ?? '' },
			{ label: 'Pays', value: data.company.locationCountry ?? '' },
			{ label: 'Site web', value: data.company.domain && !data.company.domain.includes(' ') && data.company.domain.includes('.') ? data.company.domain : '' },
			{ label: 'SIREN', value: data.company.siren ?? '' }
		].filter((m) => m.value.length > 0)
	);

	function barWidth(score: number, max: number): string {
		return `${(score / max) * 100}%`;
	}

	function barColor(score: number): string {
		if (score >= 80) return 'bg-score-high';
		if (score >= 60) return 'bg-score-mid';
		return 'bg-score-low';
	}

</script>

<style>
	@keyframes bar-grow {
		from { width: 0%; }
	}

	.bar-animate {
		animation: bar-grow 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
	}

	@keyframes fade-up {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.entrance {
		opacity: 0;
		animation: fade-up 500ms ease-out forwards;
	}

	.entrance-d1 { animation-delay: 50ms; }
	.entrance-d2 { animation-delay: 120ms; }
	.entrance-d3 { animation-delay: 200ms; }

	@keyframes score-ring-fill {
		from { stroke-dashoffset: var(--circumference); }
	}

	.score-ring-animate {
		animation: score-ring-fill 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
	}
</style>

<div>
	<!-- HERO BANNER -->
	<div class="entrance mb-8">
		<div class="bg-white border border-surface-200 border-t-4 border-t-brand-500 rounded-2xl px-6 sm:px-8 lg:px-10 pt-6 pb-8">
			<!-- Back link -->
			<a href="/resultats" class="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-surface-700 transition-colors mb-6">
				<ArrowLeft class="h-4 w-4" />
				Retour aux resultats
			</a>

			<!-- Row 1: Company info (left) + Score ring (right) -->
			<div class="flex items-start justify-between gap-6 mb-5">
				<!-- Left: Avatar + Name + Badge + Details -->
				<div class="flex items-center gap-5 min-w-0">
					<CompanyAvatar name={company.name} size="lg" class="!h-18 !w-18 !text-2xl !rounded-2xl shadow-md" />
					<div class="min-w-0">
						<div class="flex items-center gap-3 mb-1.5 flex-wrap">
							<h1 class="text-2xl font-bold text-surface-900">{company.name}</h1>
							<ScoreBadge score={company.score} size="md" />
						</div>
						<div class="flex items-center gap-2 flex-wrap text-base text-surface-500">
							<span>{company.sector}</span>
							{#if company.location && company.location !== 'N/A'}
								<span class="text-surface-300">·</span>
								<span>{company.location}</span>
							{/if}
							{#if company.website && company.website.includes('.')}
								<span class="text-surface-300">·</span>
								<a
									href="https://{company.website}"
									target="_blank"
									rel="noopener"
									class="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 bg-brand-100 hover:bg-brand-200 pl-3 pr-2.5 py-1 rounded-full transition-colors"
								>
									{company.website}
									<ExternalLink class="h-3.5 w-3.5" />
								</a>
							{/if}
						</div>
					</div>
				</div>

				<!-- Right: Score Ring -->
				<div class="shrink-0">
					<ScoreRing score={company.score} size="lg" class="!w-24 !h-24" />
				</div>
			</div>

			<!-- Row 2: Action Buttons -->
			<div class="flex items-center gap-3 pt-4 border-t border-surface-200">
				<button class="inline-flex items-center gap-2 text-sm font-medium text-brand-600 border border-brand-200 bg-white hover:bg-brand-50 px-4 py-2.5 rounded-full transition-all hover:shadow-sm cursor-pointer">
					<BookmarkPlus class="h-4 w-4" />
					Ajouter au rapport
				</button>
				<button onclick={exportCsv} class="inline-flex items-center gap-2 text-sm font-medium text-brand-600 border border-brand-200 bg-white hover:bg-brand-50 px-4 py-2.5 rounded-full transition-all hover:shadow-sm cursor-pointer">
					<Download class="h-4 w-4" />
					Exporter
				</button>
			</div>
		</div>
	</div>

	<!-- MAIN GRID -->
	<div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
		<!-- LEFT COLUMN -->
		<div class="lg:col-span-3 flex flex-col gap-6">

			<!-- SCORE -->
			<Card padding="lg" class="entrance entrance-d1 rounded-2xl hover:shadow-md transition-shadow duration-300">
				<div class="flex items-center gap-4 mb-4">
					<ScoreRing score={data.score} size="md" />
					<div>
						<h2 class="text-lg font-bold text-surface-900">Score Prospect</h2>
						<p class="text-sm text-surface-400">
							Score total : <span class="font-semibold text-surface-700">{data.score}/100</span>
							— <span class="font-semibold capitalize">{data.band}</span>
						</p>
					</div>
				</div>
				{#if scoreBreakdown.length > 0}
					<div class="flex flex-col gap-5 mt-4">
						{#each scoreBreakdown as item, i}
							<div>
								<div class="flex items-center justify-between mb-1.5">
									<span class="text-sm font-medium text-surface-600">{item.label}</span>
								</div>
								<div class="relative h-4 bg-surface-100 rounded-full overflow-hidden">
									<div
										class="h-full rounded-full {barColor(item.score)} {mounted ? 'bar-animate' : ''}"
										style="width: {barWidth(item.score, item.max)}; animation-delay: {i * 100}ms"
									>
										<span class="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-bold text-white drop-shadow-sm">
											{item.score}
										</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</Card>

			<!-- AI REASON -->
			<Card padding="lg" class="entrance entrance-d2 rounded-2xl hover:shadow-md transition-shadow duration-300">
				<div class="flex items-center gap-2 mb-5">
					<Sparkles class="h-5 w-5 text-brand-500" />
					<h2 class="text-lg font-bold text-surface-900">Pourquoi ce prospect</h2>
					<Badge size="sm">IA</Badge>
				</div>
				<p class="text-lg text-surface-700 italic leading-relaxed">{company.reason}</p>
			</Card>

			<!-- NEWS -->
			<Card padding="lg" class="entrance entrance-d3 rounded-2xl hover:shadow-md transition-shadow duration-300">
				<h2 class="text-lg font-bold text-surface-900 mb-4">Actualites Recentes</h2>
				<div class="divide-y divide-surface-200">
					{#each news as item}
						<NewsItem {...item} />
					{/each}
				</div>
			</Card>
		</div>

		<!-- RIGHT COLUMN -->
		<div class="lg:col-span-2 flex flex-col gap-6">

			<!-- METRICS GRID -->
			<Card padding="lg" class="entrance entrance-d1 rounded-2xl hover:shadow-md transition-shadow duration-300">
				<h2 class="text-lg font-bold text-surface-900 mb-5">Metriques Cles</h2>
				<div class="grid grid-cols-2 gap-5">
					{#each metrics as m}
						<div class="flex flex-col gap-0.5">
							<span class="text-sm text-surface-400 font-medium">{m.label}</span>
							<span class="text-xl font-semibold text-surface-900">{m.value}</span>
						</div>
					{/each}
				</div>
			</Card>

			<!-- SOURCES -->
			<Card padding="lg" class="entrance entrance-d2 rounded-2xl hover:shadow-md transition-shadow duration-300">
				<h2 class="text-lg font-bold text-surface-900 mb-3">Sources</h2>
				<div class="flex flex-wrap gap-2 mb-3">
					{#each company.sources as source}
						<Badge>{source}</Badge>
					{/each}
				</div>
				<p class="text-sm text-surface-400">Mis a jour le {company.lastUpdated}</p>
			</Card>
		</div>
	</div>
</div>
