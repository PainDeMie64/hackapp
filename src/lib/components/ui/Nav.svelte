<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import { page } from '$app/state';
	import ThemeToggle from './ThemeToggle.svelte';
	import type { Snippet } from 'svelte';
	import { Menu, X } from 'lucide-svelte';

	interface NavLink {
		href: string;
		label: string;
	}

	interface Props {
		title?: string;
		links?: NavLink[];
		actions?: Snippet;
	}

	let { title = 'HackApp', links = [], actions }: Props = $props();
	let mobileOpen = $state(false);
</script>

<nav class="sticky top-0 z-40 glass">
	<div class="container-page">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center gap-8">
				<a href="/" class="text-lg font-bold text-surface-900 dark:text-surface-100 hover:text-brand-500 transition-colors">
					{title}
				</a>
				<div class="hidden md:flex items-center gap-1">
					{#each links as link}
						<a
							href={link.href}
							class={cn(
								'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
								page.url.pathname === link.href
									? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
									: 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800'
							)}
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>

			<div class="flex items-center gap-2">
				{#if actions}
					<div class="hidden md:flex items-center gap-2">
						{@render actions()}
					</div>
				{/if}
				<ThemeToggle />
				<button
					class="md:hidden rounded-lg p-2 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer"
					onclick={() => (mobileOpen = !mobileOpen)}
					aria-label="Toggle menu"
				>
					{#if mobileOpen}
						<X class="h-5 w-5" />
					{:else}
						<Menu class="h-5 w-5" />
					{/if}
				</button>
			</div>
		</div>

		{#if mobileOpen}
			<div class="md:hidden border-t border-surface-200 dark:border-surface-700 pb-4">
				<div class="flex flex-col gap-1 pt-2">
					{#each links as link}
						<a
							href={link.href}
							onclick={() => (mobileOpen = false)}
							class={cn(
								'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
								page.url.pathname === link.href
									? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
									: 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800'
							)}
						>
							{link.label}
						</a>
					{/each}
				</div>
				{#if actions}
					<div class="flex items-center gap-2 px-3 pt-3 border-t border-surface-200 dark:border-surface-700 mt-2">
						{@render actions()}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</nav>
