<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	interface Props extends HTMLSelectAttributes {
		label?: string;
		error?: string;
		children: Snippet;
	}

	let { label, error, children, class: className, id, ...rest }: Props = $props();

	let selectId = $derived(id ?? crypto.randomUUID());
</script>

<div class="flex flex-col gap-1.5">
	{#if label}
		<label for={selectId} class="text-sm font-medium text-surface-700 dark:text-surface-300">
			{label}
		</label>
	{/if}
	<select
		id={selectId}
		class={cn(
			'w-full rounded-lg border px-3 py-2 text-sm transition-colors appearance-none',
			'bg-white dark:bg-surface-900',
			'border-surface-300 dark:border-surface-600',
			'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20',
			error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
			className
		)}
		{...rest}
	>
		{@render children()}
	</select>
	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
