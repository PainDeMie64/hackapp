<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		onclose?: () => void;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		children: Snippet;
		title?: string;
	}

	let { open = $bindable(false), onclose, size = 'md', children, title }: Props = $props();

	const sizes = {
		sm: 'max-w-sm',
		md: 'max-w-lg',
		lg: 'max-w-2xl',
		xl: 'max-w-4xl'
	};

	function handleBackdrop() {
		open = false;
		onclose?.();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (open && e.key === 'Escape') handleBackdrop();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		role="dialog"
		aria-modal="true"
		aria-label={title ?? 'Dialog'}
	>
		<button
			class="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default"
			onclick={handleBackdrop}
			aria-label="Close dialog"
			tabindex="-1"
		></button>
		<div class={cn(
			'relative w-full rounded-xl bg-white dark:bg-surface-900 shadow-2xl border border-surface-200 dark:border-surface-700 p-6',
			'animate-in fade-in zoom-in-95',
			sizes[size]
		)}>
			{#if title}
				<h2 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">{title}</h2>
			{/if}
			{@render children()}
		</div>
	</div>
{/if}
