<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/ui/Sidebar.svelte';
	import { Toaster } from '$lib/components/ui/index.js';

	let { children } = $props();
	let collapsed = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
	<title>ALTEN Prospect</title>
</svelte:head>

<div class="flex h-screen overflow-hidden bg-surface-50">
	<Sidebar bind:collapsed />

	<main
		class="flex-1 overflow-y-auto pb-20 md:pb-0 sidebar-offset"
		style:--sidebar-w={collapsed ? '72px' : '256px'}
	>
		<div class="max-w-6xl mx-auto px-6 lg:px-8 py-8">
			{@render children()}
		</div>
	</main>
</div>

<Toaster />

<style>
	.sidebar-offset {
		margin-left: 0;
		transition: margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	@media (min-width: 768px) {
		.sidebar-offset {
			margin-left: var(--sidebar-w, 256px);
		}
	}
</style>
