<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label?: string;
		error?: string;
		value?: string | number | null;
	}

	let { label, error, value = $bindable(''), class: className, id, ...rest }: Props = $props();

	const fallbackId = crypto.randomUUID();
	let inputId = $derived(id ?? fallbackId);
</script>

<div class="flex flex-col gap-1.5">
	{#if label}
		<label for={inputId} class="text-sm font-medium text-surface-700 dark:text-surface-300">
			{label}
		</label>
	{/if}
	<input
		id={inputId}
		bind:value
		class={cn(
			'w-full rounded-lg border px-3 py-2 text-sm transition-colors',
			'bg-white dark:bg-surface-900',
			'border-surface-300 dark:border-surface-600',
			'placeholder:text-surface-400 dark:placeholder:text-surface-500',
			'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20',
			error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
			className
		)}
		{...rest}
	/>
	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
