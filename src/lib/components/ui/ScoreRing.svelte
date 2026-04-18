<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	interface Props {
		score: number;
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let { score, size = 'md', class: className }: Props = $props();

	const dimensions = {
		sm: { px: 48, stroke: 4, fontSize: 'text-sm', labelSize: 'text-[9px]' },
		md: { px: 64, stroke: 5, fontSize: 'text-lg', labelSize: 'text-[10px]' },
		lg: { px: 80, stroke: 6, fontSize: 'text-xl', labelSize: 'text-xs' }
	};

	let dim = $derived(dimensions[size]);
	let radius = $derived((dim.px - dim.stroke) / 2);
	let circumference = $derived(2 * Math.PI * radius);
	let offset = $derived(circumference - (Math.min(score, 100) / 100) * circumference);

	let tier = $derived<'high' | 'mid' | 'low'>(
		score >= 80 ? 'high' : score >= 60 ? 'mid' : 'low'
	);

	const ringColors = {
		high: 'stroke-score-high',
		mid: 'stroke-score-mid',
		low: 'stroke-score-low'
	};

	const textColors = {
		high: 'text-score-high',
		mid: 'text-score-mid',
		low: 'text-score-low'
	};

	const labels: Record<string, string> = {
		high: 'Eleve',
		mid: 'Moyen',
		low: 'Faible'
	};
</script>

<div class={cn('relative inline-flex items-center justify-center', className)} style="width:{dim.px}px;height:{dim.px}px">
	<svg
		width={dim.px}
		height={dim.px}
		viewBox="0 0 {dim.px} {dim.px}"
		class="absolute inset-0 -rotate-90"
	>
		<circle
			cx={dim.px / 2}
			cy={dim.px / 2}
			r={radius}
			fill="none"
			stroke-width={dim.stroke}
			class="stroke-surface-200 dark:stroke-surface-700"
		/>
		<circle
			cx={dim.px / 2}
			cy={dim.px / 2}
			r={radius}
			fill="none"
			stroke-width={dim.stroke}
			stroke-linecap="round"
			stroke-dasharray={circumference}
			stroke-dashoffset={offset}
			class={cn(ringColors[tier], 'transition-[stroke-dashoffset] duration-500')}
		/>
	</svg>
	<div class="flex flex-col items-center leading-none">
		<span class={cn('font-bold', dim.fontSize, textColors[tier])}>{score}</span>
		<span class={cn('font-medium text-surface-400', dim.labelSize)}>{labels[tier]}</span>
	</div>
</div>
