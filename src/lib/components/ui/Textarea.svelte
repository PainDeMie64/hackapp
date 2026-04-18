<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends HTMLTextareaAttributes {
		label?: string;
		error?: string;
	}

	let { label, error, class: className, id, ...rest }: Props = $props();

	let textareaId = $derived(id ?? crypto.randomUUID());
</script>

<div class="flex flex-col gap-1.5">
	{#if label}
		<label for={textareaId} class="text-sm font-medium text-surface-700 dark:text-surface-300">
			{label}
		</label>
	{/if}
	<textarea
		id={textareaId}
		class={cn(
			'w-full rounded-lg border px-3 py-2 text-sm transition-colors resize-y min-h-[80px]',
			'bg-white dark:bg-surface-900',
			'border-surface-300 dark:border-surface-600',
			'placeholder:text-surface-400 dark:placeholder:text-surface-500',
			'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20',
			error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
			className
		)}
		{...rest}
	></textarea>
	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
