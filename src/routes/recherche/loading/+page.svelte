<script lang="ts">
	import { CheckCircle, Loader2, Circle } from 'lucide-svelte';
	import { cn } from '$lib/utils/cn.js';

	const steps = [
		{ label: 'Consultation de Pappers...', status: 'done' as const },
		{ label: 'Analyse des donnees LinkedIn...', status: 'done' as const },
		{ label: 'Verification sur BOAMP...', status: 'active' as const },
		{ label: 'Enrichissement des profils', status: 'pending' as const },
		{ label: 'Scoring des prospects', status: 'pending' as const }
	];

	const sources = [
		'Pappers', 'LinkedIn', 'BOAMP', 'DARES', 'Les Echos',
		'INSEE', 'Societe.com', 'France Travail'
	];
</script>

<style>
	/* Pulsing brand circle */
	@keyframes pulse-ring {
		0% {
			transform: translate(-50%, -50%) scale(0.85);
			opacity: 0.4;
		}
		50% {
			transform: translate(-50%, -50%) scale(1.15);
			opacity: 0.15;
		}
		100% {
			transform: translate(-50%, -50%) scale(0.85);
			opacity: 0.4;
		}
	}

	@keyframes pulse-ring-outer {
		0% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 0.2;
		}
		50% {
			transform: translate(-50%, -50%) scale(1.35);
			opacity: 0.05;
		}
		100% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 0.2;
		}
	}

	.pulse-circle {
		animation: pulse-ring 3s ease-in-out infinite;
	}

	.pulse-circle-outer {
		animation: pulse-ring-outer 3s ease-in-out infinite;
		animation-delay: 0.5s;
	}

	/* Particle dots */
	@keyframes float-particle {
		0%, 100% {
			transform: translate(0, 0) scale(1);
			opacity: 0.3;
		}
		25% {
			transform: translate(10px, -15px) scale(1.2);
			opacity: 0.6;
		}
		50% {
			transform: translate(-5px, -25px) scale(0.8);
			opacity: 0.2;
		}
		75% {
			transform: translate(-15px, -10px) scale(1.1);
			opacity: 0.5;
		}
	}

	.particle {
		animation: float-particle var(--duration) ease-in-out infinite;
		animation-delay: var(--delay);
	}

	/* Step check bounce */
	@keyframes check-bounce {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		50% {
			transform: scale(1.3);
		}
		70% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.check-animated {
		animation: check-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}

	.check-animated:nth-child(1) { animation-delay: 0.1s; }
	.check-animated:nth-child(2) { animation-delay: 0.3s; }

	/* Progress bar shimmer */
	@keyframes shimmer {
		0% {
			background-position: -200% center;
		}
		100% {
			background-position: 200% center;
		}
	}

	.progress-shimmer {
		background: linear-gradient(
			90deg,
			oklch(0.45 0.15 250) 0%,
			oklch(0.55 0.17 250) 25%,
			oklch(0.65 0.12 230) 50%,
			oklch(0.55 0.17 250) 75%,
			oklch(0.45 0.15 250) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 2s ease-in-out infinite;
	}

	/* Active step pulse */
	@keyframes step-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.6; }
	}

	.step-active-text {
		animation: step-pulse 2s ease-in-out infinite;
	}

	/* Source marquee */
	@keyframes marquee-scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.marquee-track {
		animation: marquee-scroll 20s linear infinite;
	}

	.marquee-track:hover {
		animation-play-state: paused;
	}

	/* Glow effect for the center orb */
	@keyframes orb-glow {
		0%, 100% {
			box-shadow: 0 0 20px 4px oklch(0.45 0.15 250 / 0.15);
		}
		50% {
			box-shadow: 0 0 40px 8px oklch(0.45 0.15 250 / 0.3);
		}
	}

	.orb-glow {
		animation: orb-glow 3s ease-in-out infinite;
	}
</style>

<div class="flex items-center justify-center min-h-[85vh] relative overflow-hidden">

	<!-- Background particles -->
	<div class="absolute inset-0 pointer-events-none" aria-hidden="true">
		{#each Array(12) as _, i}
			<div
				class="particle absolute rounded-full bg-brand-400/30"
				style="
					left: {10 + (i * 7) % 80}%;
					top: {15 + (i * 13) % 70}%;
					width: {3 + (i % 4)}px;
					height: {3 + (i % 4)}px;
					--duration: {4 + (i % 3) * 2}s;
					--delay: {i * 0.4}s;
				"
			></div>
		{/each}
	</div>

	<!-- Central content -->
	<div class="relative z-10 flex flex-col items-center w-full max-w-lg px-4">

		<!-- Pulsing circles behind -->
		<div class="relative w-full flex justify-center mb-8">
			<div
				class="pulse-circle absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-brand-300/20"
				aria-hidden="true"
			></div>
			<div
				class="pulse-circle-outer absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-brand-200/10"
				aria-hidden="true"
			></div>

			<!-- Center orb -->
			<div class="relative orb-glow h-20 w-20 rounded-full bg-brand-500 flex items-center justify-center">
				<Loader2 class="h-8 w-8 text-white animate-spin" />
			</div>
		</div>

		<!-- Progress bar with shimmer -->
		<div class="w-full mb-6">
			<div class="h-2.5 w-full bg-surface-100 rounded-full overflow-hidden">
				<div class="progress-shimmer h-full rounded-full transition-all duration-700 ease-out" style="width: 55%"></div>
			</div>
			<div class="flex justify-between mt-2">
				<span class="text-xs text-surface-400 font-medium">Progression</span>
				<span class="text-xs text-brand-500 font-bold">55%</span>
			</div>
		</div>

		<!-- Title -->
		<div class="text-center mb-8">
			<h2 class="text-xl font-bold text-surface-900 mb-1">Recherche en cours...</h2>
			<p class="text-base text-surface-400">Aeronautique, Pays de la Loire — 20 prospects</p>
		</div>

		<!-- Steps -->
		<div class="w-full bg-white rounded-2xl border border-surface-200 shadow-sm p-5 mb-6">
			<div class="flex flex-col gap-4">
				{#each steps as step, i}
					<div class="flex items-center gap-3">
						{#if step.status === 'done'}
							<div class="check-animated">
								<CheckCircle class="h-5 w-5 text-score-high shrink-0" />
							</div>
						{:else if step.status === 'active'}
							<div class="relative">
								<div class="absolute inset-0 h-5 w-5 rounded-full bg-brand-400/20 animate-ping"></div>
								<Loader2 class="h-5 w-5 text-brand-500 animate-spin shrink-0 relative" />
							</div>
						{:else}
							<Circle class="h-5 w-5 text-surface-300 shrink-0" />
						{/if}
						<span class={cn(
							'text-sm',
							step.status === 'done' ? 'text-surface-400 line-through decoration-surface-300' :
							step.status === 'active' ? 'text-surface-900 font-semibold step-active-text' :
							'text-surface-300'
						)}>
							{step.label}
						</span>
						{#if step.status === 'done'}
							<span class="ml-auto text-xs text-score-high font-medium">OK</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Source marquee -->
		<div class="w-full mb-6 overflow-hidden">
			<p class="text-xs text-surface-300 text-center mb-2 uppercase tracking-wider font-medium">Sources analysees</p>
			<div class="relative overflow-hidden">
				<div class="flex whitespace-nowrap marquee-track">
					{#each [...sources, ...sources] as source, i}
						<span class="inline-flex items-center gap-2 px-4 py-1.5">
							<span class="h-1.5 w-1.5 rounded-full bg-brand-400"></span>
							<span class="text-sm text-surface-500 font-medium">{source}</span>
						</span>
					{/each}
				</div>
			</div>
		</div>

		<!-- Duration info -->
		<p class="text-sm text-surface-300 mb-4 text-center">L'analyse prend generalement entre 30 et 90 secondes.</p>

		<!-- Cancel link (smaller, lighter) -->
		<a href="/recherche" class="text-xs text-surface-300 hover:text-surface-500 transition-colors">
			Annuler
		</a>
	</div>
</div>
