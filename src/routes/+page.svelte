<script lang="ts">
	import { Button, Card, Badge, Input, Textarea, Select, Modal, Spinner } from '$lib/components/ui/index.js';
	import { toast } from '$lib/stores/toast.svelte.js';
	import { Zap, Database, Palette, Layout, Shield, Rocket } from 'lucide-svelte';

	let modalOpen = $state(false);

	const features = [
		{ icon: Zap, title: 'SvelteKit 5', desc: 'Runes, snippets, and the latest Svelte features' },
		{ icon: Palette, title: 'Tailwind v4', desc: 'Lightning CSS, @theme, OKLCH colors' },
		{ icon: Database, title: 'D1 + Drizzle', desc: 'Type-safe SQL on the edge with Cloudflare D1' },
		{ icon: Layout, title: 'UI Components', desc: 'Button, Input, Card, Modal, Badge, Toast, and more' },
		{ icon: Shield, title: 'TypeScript', desc: 'Strict mode, Zod validation, full type safety' },
		{ icon: Rocket, title: 'Cloudflare Pages', desc: 'Deploy globally in seconds with wrangler' }
	];
</script>

<div class="container-page py-16 sm:py-24">
	<div class="text-center max-w-3xl mx-auto mb-16">
		<Badge variant="brand" class="mb-4">Hackathon Ready</Badge>
		<h1 class="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-surface-100 mb-6 tracking-tight">
			Ship fast.<br />
			<span class="text-brand-500">Win hackathons.</span>
		</h1>
		<p class="text-lg text-surface-500 dark:text-surface-400 mb-8 max-w-2xl mx-auto">
			A batteries-included SvelteKit starter with Tailwind v4, Drizzle ORM, Cloudflare D1, a full component library, dark mode, and toast notifications. Just add your idea.
		</p>
		<div class="flex flex-wrap justify-center gap-3">
			<Button size="lg" onclick={() => toast.success('Welcome! Start building something great.')}>
				Get Started
			</Button>
			<Button variant="secondary" size="lg" onclick={() => (modalOpen = true)}>
				View Components
			</Button>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
		{#each features as feature}
			<Card class="hover:shadow-md transition-shadow">
				<div class="flex items-start gap-4">
					<div class="rounded-lg bg-brand-100 dark:bg-brand-900/30 p-2.5 shrink-0">
						<feature.icon class="h-5 w-5 text-brand-600 dark:text-brand-400" />
					</div>
					<div>
						<h3 class="font-semibold text-surface-900 dark:text-surface-100 mb-1">{feature.title}</h3>
						<p class="text-sm text-surface-500 dark:text-surface-400">{feature.desc}</p>
					</div>
				</div>
			</Card>
		{/each}
	</div>

	<Card variant="bordered" class="max-w-2xl mx-auto">
		<h2 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-6">Component Showcase</h2>

		<div class="space-y-6">
			<div class="flex flex-wrap gap-2">
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="danger">Danger</Button>
				<Button loading>Loading</Button>
			</div>

			<div class="flex flex-wrap gap-2">
				<Badge>Default</Badge>
				<Badge variant="brand">Brand</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="danger">Danger</Badge>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Input label="Email" type="email" placeholder="you@example.com" />
				<Input label="With Error" error="This field is required" placeholder="Oops" />
			</div>

			<Textarea label="Message" placeholder="Tell us about your hackathon project..." />

			<Select label="Category">
				<option value="">Select a category</option>
				<option value="ai">AI / ML</option>
				<option value="web3">Web3</option>
				<option value="saas">SaaS</option>
				<option value="dev-tools">Dev Tools</option>
			</Select>

			<div class="flex items-center gap-4">
				<Spinner size="sm" />
				<Spinner size="md" />
				<Spinner size="lg" />
			</div>

			<div class="flex flex-wrap gap-2">
				<Button size="sm" variant="ghost" onclick={() => toast.info('Info toast')}>Info Toast</Button>
				<Button size="sm" variant="ghost" onclick={() => toast.success('Success toast')}>Success Toast</Button>
				<Button size="sm" variant="ghost" onclick={() => toast.warning('Warning toast')}>Warning Toast</Button>
				<Button size="sm" variant="ghost" onclick={() => toast.error('Error toast')}>Error Toast</Button>
			</div>
		</div>
	</Card>
</div>

<Modal bind:open={modalOpen} title="Component Library">
	<p class="text-surface-600 dark:text-surface-400 mb-4">
		This starter includes a full set of accessible, dark-mode-ready UI components. Import them from
		<code class="text-sm bg-surface-100 dark:bg-surface-800 px-1.5 py-0.5 rounded font-mono">$lib/components/ui</code>.
	</p>
	<div class="flex flex-wrap gap-2">
		{#each ['Button', 'Input', 'Textarea', 'Select', 'Card', 'Modal', 'Badge', 'Spinner', 'ThemeToggle', 'Toaster', 'Nav'] as comp}
			<Badge variant="brand">{comp}</Badge>
		{/each}
	</div>
	<div class="mt-6 flex justify-end">
		<Button onclick={() => (modalOpen = false)}>Got it</Button>
	</div>
</Modal>
