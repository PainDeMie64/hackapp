<script lang="ts">
	import { Card, Button, Badge, Skeleton } from '$lib/components/ui/index.js';
	import NewsItem from '$lib/components/ui/NewsItem.svelte';
	import { ArrowRight, RefreshCw, Search, FileBarChart, Clock } from 'lucide-svelte';

	let { data } = $props();

	let loading = $state(false);
</script>

<style>
	@keyframes pulse-badge {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.6; }
	}

	.badge-pulse {
		animation: pulse-badge 2s ease-in-out infinite;
	}
</style>

<div>
	<!-- HERO HEADER -->
	<div class="mb-8 pt-4 pb-6 bg-brand-50 rounded-2xl px-6">
		<h1 class="text-3xl font-bold text-surface-900 leading-snug">Bonjour, Elias</h1>
		<p class="text-base text-surface-400 mt-1.5">Vendredi 18 avril 2026</p>
	</div>

	<!-- QUICK ACTIONS -->
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
		<a href="/recherche" class="group flex items-center gap-3 px-5 py-3.5 bg-white border border-surface-200 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg hover:border-brand-200 hover:-translate-y-0.5 cursor-pointer">
			<div class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 text-brand-500 transition-colors duration-300 group-hover:bg-brand-100">
				<Search class="h-5 w-5" />
			</div>
			<span class="font-semibold text-surface-700 text-sm">Nouvelle recherche</span>
		</a>

		<a href="/rapports" class="group flex items-center gap-3 px-5 py-3.5 bg-white border border-surface-200 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg hover:border-brand-200 hover:-translate-y-0.5 cursor-pointer">
			<div class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 text-brand-500 transition-colors duration-300 group-hover:bg-brand-100">
				<FileBarChart class="h-5 w-5" />
			</div>
			<span class="font-semibold text-surface-700 text-sm">Voir les rapports</span>
		</a>

	</div>

	<!-- MAIN CARDS -->
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
		<!-- Prospects -->
		<div class="lg:col-span-7 relative group bg-white border border-surface-200 shadow-sm rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
			<div class="absolute top-4 right-4 pointer-events-none">
				<Search class="h-28 w-28 text-brand-500 opacity-5" />
			</div>
			<div class="relative">
				<p class="text-sm font-semibold text-surface-400 uppercase tracking-wide mb-3">Prospects</p>
				{#if data.companyCount > 0}
					<h2 class="text-xl font-bold text-surface-900 mb-3">{data.companyCount} entreprises suivies</h2>
					<p class="text-base text-surface-400 mb-5">Consultez la liste des prospects identifies et scores.</p>
					<a href="/resultats" class="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm text-base px-6 py-3.5 gap-2.5 w-full text-lg">
						Voir les resultats
						<ArrowRight class="h-5 w-5 ml-1" />
					</a>
				{:else}
					<h2 class="text-xl font-bold text-surface-900 mb-3">Aucun prospect pour le moment</h2>
					<p class="text-base text-surface-400 mb-5">Lancez votre premiere recherche pour identifier des prospects.</p>
					<a href="/recherche" class="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm text-base px-6 py-3.5 gap-2.5 w-full text-lg">
						Nouvelle recherche
						<ArrowRight class="h-5 w-5 ml-1" />
					</a>
				{/if}
			</div>
		</div>

		<!-- Historique -->
		<div class="lg:col-span-5 relative group bg-white border-2 border-surface-200 rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
			<div class="absolute top-4 right-4 pointer-events-none">
				<Clock class="h-24 w-24 text-surface-500 opacity-5" />
			</div>
			<div class="relative">
				<p class="text-sm font-semibold text-surface-400 uppercase tracking-wide mb-3">Historique</p>
				<h2 class="text-xl font-bold text-surface-900 mb-3">Recherches precedentes</h2>
				<p class="text-base text-surface-400 mb-5">Retrouvez vos recherches passees et leurs resultats.</p>
				<a href="/historique" class="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer bg-surface-100 text-surface-900 hover:bg-surface-200 text-base px-6 py-3.5 gap-2.5 w-full text-lg">
					Voir l'historique
				</a>
			</div>
		</div>
	</div>

	<!-- NEWS FEED -->
	<div class="bg-white border border-surface-200 shadow-sm rounded-2xl p-8 transition-all duration-300 hover:shadow-lg">
		<div class="flex items-center justify-between mb-5">
			<h2 class="text-xl font-bold text-surface-900">Actualites Recentes</h2>
			<button class="flex items-center gap-2 text-sm text-surface-400 hover:text-surface-900 transition-colors duration-200 cursor-pointer px-3 py-1.5 rounded-lg hover:bg-surface-50">
				<RefreshCw class="h-4 w-4" />
				Actualiser
			</button>
		</div>
		{#if loading}
			<div class="space-y-1">
				{#each Array(3) as _}
					<div class="flex items-start gap-3 py-4">
						<div class="flex-1 min-w-0 space-y-2">
							<Skeleton class="h-5 w-20" rounded="full" />
							<Skeleton class="h-5 w-full" />
							<Skeleton class="h-5 w-3/4" />
							<Skeleton class="h-4 w-32" />
						</div>
					</div>
				{/each}
			</div>
		{:else if data.news.length === 0}
			<div class="py-12 text-center">
				<p class="text-base text-surface-400">Aucune actualite pour le moment.</p>
				<p class="text-sm text-surface-300 mt-1">Les actualites apparaitront ici lorsque des donnees seront disponibles.</p>
			</div>
		{:else}
			<div class="space-y-1">
				{#each data.news as item}
					<NewsItem {...item} />
				{/each}
			</div>
		{/if}
		<div class="mt-5 pt-5 border-t border-surface-200">
			<Button variant="ghost" class="w-full justify-center text-base rounded-xl">
				Voir toutes les actualites
				<ArrowRight class="h-4 w-4 ml-1" />
			</Button>
		</div>
	</div>
</div>
