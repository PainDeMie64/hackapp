<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import { ChevronRight } from 'lucide-svelte';
	import Badge from './Badge.svelte';

	interface Props {
		title: string;
		source: string;
		date: string;
		category?: 'industrie' | 'client' | 'prospect';
		read?: boolean;
		class?: string;
	}

	let { title, source, date, category = 'industrie', read = false, class: className }: Props = $props();

	const categoryLabels = {
		industrie: 'Industrie',
		client: 'Client',
		prospect: 'Prospect'
	};

	const categoryVariants = {
		industrie: 'default' as const,
		client: 'brand' as const,
		prospect: 'success' as const
	};

	const categoryBorders = {
		industrie: 'border-l-blue-500',
		client: 'border-l-brand-500',
		prospect: 'border-l-green-500'
	};
</script>

<div class={cn(
	'group flex items-start gap-3 py-4 cursor-pointer -mx-4 px-4 rounded-r-xl transition-all duration-300 ease-out',
	'border-l-3 hover:bg-surface-50 hover:translate-x-1',
	categoryBorders[category],
	read && 'opacity-60',
	className
)}>
	<div class="flex-1 min-w-0">
		<div class="flex items-center gap-2 mb-1.5">
			<Badge variant={categoryVariants[category]} size="sm">{categoryLabels[category]}</Badge>
		</div>
		<p class={cn('text-lg text-surface-900 line-clamp-2 transition-colors duration-200 group-hover:text-brand-600', !read && 'font-medium')}>{title}</p>
		<p class="text-base text-surface-400 mt-1">{source} · {date}</p>
	</div>
	<ChevronRight class="h-5 w-5 text-surface-300 shrink-0 mt-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-500" />
</div>
