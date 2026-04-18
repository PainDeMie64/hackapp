<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { LayoutDashboard, Search, Clock, FileText, ChevronLeft } from 'lucide-svelte';

	let { collapsed = $bindable(false) }: { collapsed: boolean } = $props();

	if (browser) {
		const saved = localStorage.getItem('sidebar-collapsed');
		if (saved !== null) collapsed = saved === 'true';
	}
	$effect(() => {
		if (browser) localStorage.setItem('sidebar-collapsed', String(collapsed));
	});

	const navItems = [
		{ href: '/', icon: LayoutDashboard, label: 'Accueil', badge: false },
		{ href: '/recherche', icon: Search, label: 'Recherche', badge: false },
		{ href: '/historique', icon: Clock, label: 'Historique', badge: false },
		{ href: '/rapports', icon: FileText, label: 'Rapports', badge: true }
	];

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<aside
	class={cn(
		'hidden md:flex fixed inset-y-0 left-0 z-30 flex-col transition-all duration-300 ease-in-out',
		'bg-white/80 backdrop-blur-xl border-r border-surface-200/60 shadow-[2px_0_24px_-4px_rgba(0,0,0,0.06)]',
		collapsed ? 'w-[72px]' : 'w-64'
	)}
>
	<!-- Branding -->
	<div
		class={cn(
			'flex items-center h-16 border-b border-surface-200/60 transition-all duration-300',
			collapsed ? 'justify-center px-2' : 'px-5'
		)}
	>
		<div class="flex items-center gap-3">
			<div
				class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500 text-white font-bold text-sm shrink-0 shadow-sm"
			>
				A
			</div>
			{#if !collapsed}
				<span
					class="text-lg font-bold text-surface-900 whitespace-nowrap overflow-hidden transition-opacity duration-200"
				>
					ALTEN <span class="text-brand-500">Prospect</span>
				</span>
			{/if}
		</div>
	</div>

	<!-- Navigation -->
	<nav class="flex-1 flex flex-col gap-1 px-3 py-4">
		{#each navItems as item}
			<a
				href={item.href}
				class={cn(
					'group relative flex items-center gap-3 rounded-xl transition-all duration-200 min-h-[48px]',
					collapsed ? 'justify-center px-2' : 'px-4',
					isActive(item.href)
						? 'bg-brand-500 text-white font-semibold shadow-md shadow-brand-500/25'
						: 'text-surface-500 hover:text-surface-900 hover:bg-surface-50 hover:translate-x-1'
				)}
			>
				<div class="relative shrink-0">
					<item.icon class="h-5 w-5" />
					{#if item.badge}
						<span
							class={cn(
								'absolute -top-1 -right-1 w-2 h-2 rounded-full',
								isActive(item.href) ? 'bg-white' : 'bg-red-500'
							)}
						></span>
					{/if}
				</div>
				{#if !collapsed}
					<span class="text-sm font-medium">{item.label}</span>
				{/if}
			</a>
		{/each}
	</nav>

	<!-- Separator -->
	<div class="mx-4 border-t border-surface-200/60"></div>

	<!-- User section -->
	<div class={cn('p-3 transition-all duration-300', collapsed ? 'flex justify-center' : '')}>
		<div
			class={cn(
				'flex items-center gap-3 rounded-xl transition-all duration-200',
				collapsed ? 'justify-center' : 'px-3 py-2'
			)}
		>
			<div
				class="flex items-center justify-center w-9 h-9 rounded-full bg-brand-100 text-brand-600 font-semibold text-sm shrink-0"
			>
				E
			</div>
			{#if !collapsed}
				<div class="flex flex-col min-w-0">
					<span class="text-sm font-semibold text-surface-900 truncate">Elias</span>
					<span class="text-xs text-surface-400 truncate">Business Manager</span>
				</div>
			{/if}
		</div>
	</div>

	<!-- Separator -->
	<div class="mx-4 border-t border-surface-200/60"></div>

	<!-- Collapse button -->
	<div class="p-3 flex justify-center">
		<button
			onclick={() => (collapsed = !collapsed)}
			class={cn(
				'flex items-center justify-center w-9 h-9 rounded-full',
				'border border-surface-200 text-surface-400 bg-white',
				'hover:bg-surface-50 hover:text-surface-600 hover:border-surface-300',
				'transition-all duration-200 cursor-pointer shadow-sm'
			)}
			aria-label={collapsed ? 'Ouvrir la barre laterale' : 'Reduire la barre laterale'}
		>
			<ChevronLeft
				class={cn(
					'h-4 w-4 transition-transform duration-300',
					collapsed ? 'rotate-180' : 'rotate-0'
				)}
			/>
		</button>
	</div>
</aside>

<!-- Mobile bottom bar -->
<div class="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-xl border-t border-surface-200/60 flex shadow-[0_-2px_16px_-4px_rgba(0,0,0,0.06)]">
	{#each navItems as item}
		<a
			href={item.href}
			class={cn(
				'flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-all duration-200 min-h-[56px]',
				isActive(item.href)
					? 'text-brand-500'
					: 'text-surface-400 hover:text-surface-900'
			)}
		>
			<div class="relative">
				<item.icon class="h-5 w-5" />
				{#if item.badge}
					<span
						class={cn(
							'absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500'
						)}
					></span>
				{/if}
			</div>
			<span>{item.label}</span>
		</a>
	{/each}
</div>
