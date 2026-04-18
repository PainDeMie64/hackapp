<script lang="ts">
	import { toast } from '$lib/stores/toast.svelte.js';
	import { cn } from '$lib/utils/cn.js';
	import { X } from 'lucide-svelte';

	const typeStyles = {
		info: 'bg-brand-50 border-brand-200 text-brand-800 dark:bg-brand-900/30 dark:border-brand-700 dark:text-brand-200',
		success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200',
		warning: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-200',
		error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200'
	};
</script>

{#if toast.items.length > 0}
	<div class="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 min-w-[320px] max-w-md">
		{#each toast.items as item (item.id)}
			<div
				class={cn(
					'flex items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg',
					'animate-in slide-in-from-right fade-in',
					typeStyles[item.type]
				)}
				role="alert"
			>
				<span class="flex-1">{item.message}</span>
				<button
					onclick={() => toast.remove(item.id)}
					class="shrink-0 rounded p-0.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
					aria-label="Dismiss"
				>
					<X class="h-4 w-4" />
				</button>
			</div>
		{/each}
	</div>
{/if}
