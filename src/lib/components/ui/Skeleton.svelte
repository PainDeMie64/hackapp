<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	interface Props {
		class?: string;
		rounded?: 'sm' | 'md' | 'lg' | 'full';
	}

	let { class: className, rounded = 'md' }: Props = $props();

	const roundedMap = {
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		full: 'rounded-full'
	};
</script>

<div
	class={cn(
		'animate-pulse bg-surface-200 dark:bg-surface-700',
		roundedMap[rounded],
		className
	)}
	aria-hidden="true"
></div>
