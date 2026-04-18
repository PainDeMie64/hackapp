<script lang="ts">
	interface Props {
		label: string;
		value: string;
	}

	let { label, value }: Props = $props();
</script>

<div class="flex flex-col gap-0.5">
	<span class="text-sm text-surface-400 font-medium">{label}</span>
	<span class="text-xl font-semibold text-surface-900">{value}</span>
</div>
