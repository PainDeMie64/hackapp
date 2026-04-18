<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte.js';
	import { cn } from '$lib/utils/cn.js';
	import { Moon, Sun } from 'lucide-svelte';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<button
	onclick={() => theme.toggle()}
	class={cn(
		'rounded-lg p-2 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer',
		className
	)}
	aria-label={theme.dark ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{#if theme.dark}
		<Sun class="h-5 w-5" />
	{:else}
		<Moon class="h-5 w-5" />
	{/if}
</button>
