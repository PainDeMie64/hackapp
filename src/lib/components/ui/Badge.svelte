<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger';
		size?: 'sm' | 'md';
		children: Snippet;
		class?: string;
	}

	let { variant = 'default', size = 'md', children, class: className }: Props = $props();

	const variants = {
		default: 'bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300',
		brand: 'bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300',
		success: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
		warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
		danger: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
	};

	const sizes = {
		sm: 'text-xs px-2 py-0.5',
		md: 'text-xs px-2.5 py-1'
	};
</script>

<span class={cn('inline-flex items-center rounded-full font-medium', variants[variant], sizes[size], className)}>
	{@render children()}
</span>
