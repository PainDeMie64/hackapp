<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Nav, Toaster } from '$lib/components/ui/index.js';

	let { children } = $props();

	const navLinks = [
		{ href: '/', label: 'Home' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>HackApp</title>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Nav title="HackApp" links={navLinks} />
	<main class="flex-1">
		{@render children()}
	</main>
	<footer class="border-t border-surface-200 dark:border-surface-800 py-6">
		<div class="container-page text-center text-sm text-surface-500">
			Built with SvelteKit + Tailwind v4 + Cloudflare
		</div>
	</footer>
</div>

<Toaster />
