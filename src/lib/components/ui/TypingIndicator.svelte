<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<div class={cn('flex items-center gap-1.5 px-4 py-3', className)}>
	<span class="h-2 w-2 rounded-full bg-surface-400 animate-bounce" style="animation-delay: 0ms"></span>
	<span class="h-2 w-2 rounded-full bg-surface-400 animate-bounce" style="animation-delay: 150ms"></span>
	<span class="h-2 w-2 rounded-full bg-surface-400 animate-bounce" style="animation-delay: 300ms"></span>
</div>
