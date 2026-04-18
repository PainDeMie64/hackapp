<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import { CheckCircle, AlertTriangle, MinusCircle, XCircle } from 'lucide-svelte';

	interface Props {
		score: number;
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let { score, size = 'md', class: className }: Props = $props();

	type Tier = 'high' | 'mid' | 'moderate' | 'low';

	let tier = $derived<Tier>(
		score >= 80 ? 'high' : score >= 60 ? 'mid' : score >= 40 ? 'moderate' : 'low'
	);

	const styles: Record<Tier, string> = {
		high: 'bg-score-high-bg text-score-high border-score-high',
		mid: 'bg-score-mid-bg text-score-mid border-score-mid',
		moderate: 'bg-amber-100 text-amber-700 border-amber-500',
		low: 'bg-score-low-bg text-score-low border-score-low'
	};

	const labels: Record<Tier, string> = {
		high: 'Eleve',
		mid: 'Moyen',
		moderate: 'Modere',
		low: 'Faible'
	};

	const icons: Record<Tier, typeof CheckCircle> = {
		high: CheckCircle,
		mid: AlertTriangle,
		moderate: MinusCircle,
		low: XCircle
	};

	const sizes = {
		sm: 'text-sm px-2 py-1 gap-1',
		md: 'text-base px-3 py-1.5 gap-1.5',
		lg: 'text-lg px-3.5 py-2 gap-2'
	};

	let Icon = $derived(icons[tier]);
	let iconSize = $derived(size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4');
</script>

<span class={cn('inline-flex items-center font-bold rounded-lg border-2', styles[tier], sizes[size], className)}>
	<Icon class={iconSize} />
	{score}
	<span class="font-medium text-[0.85em]">{labels[tier]}</span>
</span>
