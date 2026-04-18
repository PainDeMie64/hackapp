<script lang="ts">
	import { Card, Button, Badge } from '$lib/components/ui/index.js';
	import NewsItem from '$lib/components/ui/NewsItem.svelte';
	import { Download } from 'lucide-svelte';

	let { data } = $props();
</script>

<div>
	<h1 class="text-2xl font-bold text-surface-900 mb-8">Rapports</h1>

	<h2 class="text-lg font-semibold text-surface-500 uppercase tracking-wide mb-4">Rapports Bi-Mensuels</h2>

	<div class="flex flex-col gap-4 mb-10">
		{#each data.reports as report}
			<Card padding="lg">
				<div class="flex items-center justify-between">
					<div>
						<div class="flex items-center gap-3 mb-2">
							<h3 class="text-xl font-bold text-surface-900">{report.month}</h3>
							{#if report.isNew}
								<Badge variant="success">Nouveau</Badge>
							{/if}
						</div>
						<p class="text-base text-surface-400 mb-1">Genere le {report.date}</p>
						<p class="text-base text-surface-500">
							{report.tracked} prospects suivis · {report.newProspects} nouveaux
						</p>
					</div>
					<div class="flex gap-3">
						<a href="/rapports/{report.month.toLowerCase().replace(' ', '-')}" class="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 cursor-pointer bg-surface-200 text-surface-900 hover:bg-surface-300 text-base px-6 py-3">
							Consulter
						</a>
						<Button variant="ghost" size="lg" class="text-base px-4 py-3 rounded-xl">
							<Download class="h-5 w-5" />
							PDF
						</Button>
					</div>
				</div>
			</Card>
		{/each}
	</div>

	<h2 class="text-lg font-semibold text-surface-500 uppercase tracking-wide mb-4">Actualites Clients Existants</h2>

	<Card padding="lg">
		<div class="divide-y divide-surface-200">
			{#each data.clientNews as item}
				<NewsItem {...item} />
			{/each}
		</div>
	</Card>
</div>
