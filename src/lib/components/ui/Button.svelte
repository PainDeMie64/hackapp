<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		loading?: boolean;
		children: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		loading = false,
		children,
		class: className,
		disabled,
		...rest
	}: Props = $props();

	const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:focus-ring';

	const variants = {
		primary: 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm',
		secondary: 'bg-surface-200 text-surface-900 hover:bg-surface-300 dark:bg-surface-700 dark:text-surface-100 dark:hover:bg-surface-600',
		ghost: 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800',
		danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm'
	};

	const sizes = {
		sm: 'text-sm px-3 py-1.5 gap-1.5',
		md: 'text-sm px-4 py-2 gap-2',
		lg: 'text-base px-6 py-3 gap-2.5'
	};
</script>

<button
	class={cn(base, variants[variant], sizes[size], className)}
	disabled={disabled || loading}
	{...rest}
>
	{#if loading}
		<svg class="animate-spin -ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
		</svg>
	{/if}
	{@render children()}
</button>
