<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	interface Props {
		name: string;
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let { name, size = 'md', class: className }: Props = $props();

	const palette = [
		'bg-blue-600',
		'bg-emerald-600',
		'bg-violet-600',
		'bg-amber-600',
		'bg-rose-600',
		'bg-cyan-600',
		'bg-indigo-600',
		'bg-teal-600'
	];

	function hashName(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
		}
		return Math.abs(hash);
	}

	let letter = $derived(name.trim().charAt(0).toUpperCase());
	let colorClass = $derived(palette[hashName(name) % palette.length]);

	const sizes = {
		sm: 'h-10 w-10 text-sm',
		md: 'h-12 w-12 text-base',
		lg: 'h-14 w-14 text-xl'
	};
</script>

<div
	class={cn(
		'inline-flex items-center justify-center rounded-xl font-bold text-white shrink-0',
		colorClass,
		sizes[size],
		className
	)}
	aria-hidden="true"
>
	{letter}
</div>
