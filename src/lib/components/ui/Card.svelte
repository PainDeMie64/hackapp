<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: 'default' | 'glass' | 'bordered';
		padding?: 'none' | 'sm' | 'md' | 'lg';
		children: Snippet;
	}

	let {
		variant = 'default',
		padding = 'md',
		children,
		class: className,
		...rest
	}: Props = $props();

	const variants = {
		default: 'bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 shadow-sm',
		glass: 'glass',
		bordered: 'border-2 border-surface-200 dark:border-surface-700'
	};

	const paddings = {
		none: '',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8'
	};
</script>

<div class={cn('rounded-xl', variants[variant], paddings[padding], className)} {...rest}>
	{@render children()}
</div>
