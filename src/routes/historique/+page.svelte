<script lang="ts">
	import { Card, Button } from '$lib/components/ui/index.js';
	import ScoreBadge from '$lib/components/ui/ScoreBadge.svelte';
	import { ArrowRight } from 'lucide-svelte';

	let { data } = $props();
</script>

<div>
	<h1 class="text-2xl font-bold text-surface-900 mb-8">Historique des Recherches</h1>

	{#if data.searches.length === 0}
		<Card padding="lg">
			<div class="py-12 text-center">
				<p class="text-lg font-medium text-surface-500">Aucune recherche precedente</p>
				<p class="text-base text-surface-400 mt-1">Vos recherches apparaitront ici.</p>
			</div>
		</Card>
	{/if}

	<div class="flex flex-col gap-4">
		{#each data.searches as search}
			<Card padding="lg">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-surface-400 mb-1">{search.date}</p>
						<h2 class="text-lg font-semibold text-surface-900 mb-2">{search.criteria}</h2>
						<div class="flex items-center gap-4 text-base text-surface-500">
							<span>{search.count} prospects</span>
							<span>·</span>
							<span class="flex items-center gap-2">Meilleur score : <ScoreBadge score={search.bestScore} size="sm" /></span>
						</div>
					</div>
					<a href="/resultats" class="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 cursor-pointer bg-surface-200 text-surface-900 hover:bg-surface-300 shrink-0 text-base px-6 py-3 gap-2">
						Voir les resultats
						<ArrowRight class="h-4 w-4" />
					</a>
				</div>
			</Card>
		{/each}
	</div>
</div>
