<script lang="ts">
	import { Card, Badge, CompanyAvatar, ScoreRing } from '$lib/components/ui/index.js';
	import ScoreBadge from '$lib/components/ui/ScoreBadge.svelte';
	import NewsItem from '$lib/components/ui/NewsItem.svelte';
	import {
		ArrowLeft,
		Sparkles,
		Briefcase,
		Euro,
		UserRound,
		TrendingUp,
		ExternalLink,
		Link2,
		Download,
		BookmarkPlus,
		ArrowUpRight,
		ArrowDownRight,
		Minus
	} from 'lucide-svelte';
	import { formatRevenue, formatEmployees } from '$lib/utils/format.js';

	let { data } = $props();

	let mounted = $state(false);

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

	const signalIconMap: Record<string, any> = {
		'Recrutement': Briefcase,
		'Croissance': TrendingUp,
		'Financement': Euro,
		'Leadership': UserRound
	};

	const signalColorMap: Record<string, { iconBg: string; iconText: string }> = {
		'Recrutement': { iconBg: 'bg-blue-100', iconText: 'text-blue-600' },
		'Croissance': { iconBg: 'bg-green-100', iconText: 'text-green-600' },
		'Financement': { iconBg: 'bg-amber-100', iconText: 'text-amber-600' },
		'Leadership': { iconBg: 'bg-purple-100', iconText: 'text-purple-600' }
	};

	let signals = $derived(data.signals.map((s: any) => ({
		icon: signalIconMap[s.category] ?? Briefcase,
		category: s.category,
		text: s.text,
		date: s.date,
		iconBg: signalColorMap[s.category]?.iconBg ?? 'bg-surface-100',
		iconText: signalColorMap[s.category]?.iconText ?? 'text-surface-600',
		isRecent: s.isRecent
	})));

	let contacts = $derived(data.contacts);

	let news = $derived(data.companyNews);

	let metrics = $derived(data.metrics);

	const contactPalette = [
		'bg-blue-500',
		'bg-emerald-500',
		'bg-violet-500',
		'bg-amber-500',
		'bg-rose-500',
		'bg-cyan-500',
		'bg-indigo-500',
		'bg-teal-500'
	];

	function contactColor(name: string): string {
		let hash = 0;
		for (let i = 0; i < name.length; i++) {
			hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
		}
		return contactPalette[Math.abs(hash) % contactPalette.length];
	}

	function contactInitials(name: string): string {
		const parts = name.trim().split(/\s+/);
		if (parts.length >= 2) {
			return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
		}
		return name.charAt(0).toUpperCase();
	}

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
	.entrance-d4 { animation-delay: 280ms; }
	.entrance-d5 { animation-delay: 360ms; }
	.entrance-d6 { animation-delay: 440ms; }

	@keyframes pulse-ring {
		0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
		50% { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0); }
	}

	.signal-pulse {
		animation: pulse-ring 2s ease-in-out infinite;
	}

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
							<span class="text-surface-300">·</span>
							<span>{company.location}</span>
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
				<button class="inline-flex items-center gap-2 text-sm font-medium text-brand-600 border border-brand-200 bg-white hover:bg-brand-50 px-4 py-2.5 rounded-full transition-all hover:shadow-sm cursor-pointer">
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

			<!-- SCORE BREAKDOWN -->
			<Card padding="lg" class="entrance entrance-d1 rounded-2xl hover:shadow-md transition-shadow duration-300">
				<div class="flex items-center gap-4 mb-6">
					<ScoreRing score={compositeScore} size="md" />
					<div>
						<h2 class="text-lg font-bold text-surface-900">Decomposition du Score</h2>
						<p class="text-sm text-surface-400">Score composite : <span class="font-semibold text-surface-700">{compositeScore}/100</span></p>
					</div>
				</div>
				<div class="flex flex-col gap-5">
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

			<!-- SIGNALS TIMELINE -->
			<Card padding="lg" class="entrance entrance-d3 rounded-2xl hover:shadow-md transition-shadow duration-300">
				<h2 class="text-lg font-bold text-surface-900 mb-5">Signaux Detectes</h2>
				<div class="relative">
					<!-- Timeline line -->
					<div class="absolute left-5 top-0 bottom-0 w-0.5 bg-surface-200 rounded-full"></div>
					<div class="flex flex-col gap-1">
						{#each signals as signal, i}
							<div class="group flex items-start gap-4 relative rounded-xl px-2 py-3 -mx-2 hover:bg-surface-50 transition-all duration-200 hover:scale-[1.01] cursor-default">
								<!-- Icon node -->
								<div class="relative z-10 flex items-center justify-center h-10 w-10 rounded-full {signal.iconBg} {signal.iconText} shrink-0 transition-transform duration-200 group-hover:scale-110 {signal.isRecent ? 'signal-pulse' : ''}">
									<signal.icon class="h-5 w-5" />
								</div>
								<div class="flex-1 pt-0.5">
									<div class="flex items-center gap-2 mb-0.5">
										<Badge size="sm">{signal.category}</Badge>
										<span class="text-sm text-surface-400">{signal.date}</span>
										{#if signal.isRecent}
											<span class="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
										{/if}
									</div>
									<p class="text-base text-surface-700 group-hover:text-surface-900 transition-colors">{signal.text}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</Card>

			<!-- NEWS -->
			<Card padding="lg" class="entrance entrance-d4 rounded-2xl hover:shadow-md transition-shadow duration-300">
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
							<div class="flex items-center gap-1.5">
								<span class="text-xl font-semibold text-surface-900">{m.value}</span>
							</div>
							<div class="flex items-center gap-1 mt-0.5">
								{#if m.trend === 'up'}
									<ArrowUpRight class="h-3.5 w-3.5 text-score-high" />
									<span class="text-xs font-medium text-score-high">{m.delta}</span>
								{:else if m.trend === 'down'}
									<ArrowDownRight class="h-3.5 w-3.5 text-score-low" />
									<span class="text-xs font-medium text-score-low">{m.delta}</span>
								{:else}
									<Minus class="h-3.5 w-3.5 text-surface-400" />
									<span class="text-xs font-medium text-surface-400">{m.delta}</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</Card>

			<!-- CONTACTS -->
			<Card padding="lg" class="entrance entrance-d3 rounded-2xl hover:shadow-md transition-shadow duration-300">
				<h2 class="text-lg font-bold text-surface-900 mb-5">Contacts Cles</h2>
				<div class="flex flex-col gap-1">
					{#each contacts as contact}
						<div class="flex items-center gap-3 py-3 px-3 -mx-3 rounded-xl hover:bg-surface-50 transition-colors cursor-pointer group">
							<!-- Initials avatar -->
							<div class="flex items-center justify-center h-10 w-10 rounded-full {contactColor(contact.name)} text-white text-sm font-bold shrink-0 shadow-sm">
								{contactInitials(contact.name)}
							</div>
							<div class="flex-1 min-w-0">
								<p class="text-base font-medium text-surface-900 group-hover:text-brand-700 transition-colors">{contact.name}</p>
								<p class="text-sm text-surface-400 truncate">{contact.title}</p>
							</div>
							{#if contact.linkedin}
								<button class="flex items-center justify-center h-9 w-9 rounded-lg text-surface-300 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100">
									<Link2 class="h-4 w-4" />
								</button>
							{/if}
						</div>
					{/each}
				</div>
			</Card>

			<!-- SOURCES -->
			<Card padding="lg" class="entrance entrance-d5 rounded-2xl hover:shadow-md transition-shadow duration-300">
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
