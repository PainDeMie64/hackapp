<script lang="ts">
	import { Card, Button, Input, Select, Textarea, MapModal, TypingIndicator } from '$lib/components/ui/index.js';
	import { Send, ChevronDown, ChevronUp, MapPin, MessageSquare, ListFilter, Sparkles, Building2, Users, Search, X } from 'lucide-svelte';
	import { cn } from '$lib/utils/cn.js';

	let activeTab = $state(0);
	let showAdvanced = $state(false);
	let mapOpen = $state(false);
	let zoneDropdownOpen = $state(false);
	let selectedRegions: string[] = $state([]);
	let selectedRegionNames: string[] = $state([]);

	function toggleZone(slug: string, label: string) {
		if (selectedRegions.includes(slug)) {
			selectedRegions = selectedRegions.filter(s => s !== slug);
			selectedRegionNames = selectedRegionNames.filter(n => n !== label);
		} else {
			selectedRegions = [...selectedRegions, slug];
			selectedRegionNames = [...selectedRegionNames, label];
		}
		region = selectedRegions.length > 0 ? 'carte' : '';
	}
	let isTyping = $state(true);
	let messagesContainer: HTMLDivElement | undefined = $state(undefined);

	let sector = $state('');
	let region = $state('');
	let prospectCount = $state('20');
	let freeConditions = $state('');
	let minRevenue = $state('');
	let minHeadcount = $state('');
	let revenuePerEmployee = $state('');
	let growthPotential = $state('');
	let consultingUsage = $state('');

	const currentStep = 1;
	const totalSteps = 6;

	const tabs = [
		{ label: 'Assistant', icon: MessageSquare },
		{ label: 'Formulaire', icon: ListFilter }
	];

	const chatMessages = [
		{ role: 'bot', text: "Bonjour ! Je vais vous aider a trouver des prospects pour ALTEN. Nous allons proceder etape par etape.", time: '10:44' },
		{ role: 'bot', text: "Dans quel secteur d'activite recherchez-vous des prospects ?", time: '10:45' }
	];

	const quickChoices = ['Aeronautique', 'Automobile', 'Defense', 'Energie', 'Telecoms', 'Autre...'];

	function handleWindowClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (zoneDropdownOpen && !target.closest('.zone-dropdown-container')) {
			zoneDropdownOpen = false;
		}
	}

	$effect(() => {
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	});
</script>

<style>
	@keyframes gradient-rotate {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}

	.animated-border {
		position: relative;
		isolation: isolate;
	}

	.animated-border::before {
		content: '';
		position: absolute;
		inset: -2px;
		border-radius: 14px;
		background: linear-gradient(
			120deg,
			oklch(0.45 0.15 250) 0%,
			oklch(0.66 0.17 250) 25%,
			oklch(0.45 0.15 250) 50%,
			oklch(0.38 0.15 250) 75%,
			oklch(0.45 0.15 250) 100%
		);
		background-size: 300% 300%;
		animation: gradient-rotate 4s ease infinite;
		z-index: -1;
		opacity: 0.6;
	}

	@keyframes shine {
		0% { left: -100%; }
		100% { left: 200%; }
	}

	.btn-shine {
		position: relative;
		overflow: hidden;
	}

	.btn-shine::after {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 50%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.25),
			transparent
		);
		transition: none;
	}

	.btn-shine:hover::after {
		animation: shine 0.75s ease-out;
	}
</style>

<svelte:window onclick={handleWindowClick} />

<div>
	<h1 class="text-2xl font-bold text-surface-900 mb-6">Nouvelle Recherche</h1>

	<!-- Tab switcher: pill style with icons -->
	<div role="tablist" class="flex gap-1.5 p-1.5 bg-surface-100 rounded-xl mb-6 w-fit">
		{#each tabs as tab, i}
			<button
				role="tab"
				aria-selected={activeTab === i}
				tabindex={activeTab === i ? 0 : -1}
				onclick={() => (activeTab = i)}
				class={cn(
					'flex items-center gap-2 text-base font-medium px-5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer',
					activeTab === i
						? 'bg-white text-brand-600 font-semibold shadow-sm'
						: 'text-surface-400 hover:text-surface-700'
				)}
			>
				<tab.icon class="h-4.5 w-4.5" />
				{tab.label}
			</button>
		{/each}
	</div>

	{#if activeTab === 0}
		<!-- Chat tab with animated gradient border -->
		<div class="animated-border rounded-xl">
			<Card padding="none" class="overflow-hidden">
				<div class="flex flex-col h-[600px]">
					<!-- Header -->
					<div class="flex items-center gap-2.5 px-6 py-4 bg-brand-500 text-white">
						<div class="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20">
							<Sparkles class="h-4.5 w-4.5" />
						</div>
						<div>
							<h2 class="text-base font-semibold leading-tight">Assistant IA</h2>
							<p class="text-xs text-white/70">Recherche guidee de prospects</p>
						</div>
					</div>

					<div bind:this={messagesContainer} class="flex-1 overflow-y-auto p-6 space-y-4">
						{#each chatMessages as msg}
							<div class={cn(
								'max-w-[75%]',
								msg.role === 'bot' ? '' : 'ml-auto'
							)}>
								<div class={cn(
									'rounded-2xl p-5 text-lg',
									msg.role === 'bot'
										? 'bg-surface-100 rounded-tl-sm text-surface-900 shadow-sm'
										: 'bg-brand-500 text-white rounded-tr-sm shadow-md shadow-brand-500/20'
								)}>
									{msg.text}
								</div>
								<span class={cn(
									'block text-xs text-surface-400 mt-1.5',
									msg.role === 'bot' ? 'text-left' : 'text-right'
								)}>{msg.time}</span>
							</div>
						{/each}

						{#if isTyping}
							<div class="max-w-[75%]">
								<TypingIndicator class="bg-surface-100 rounded-2xl rounded-tl-sm shadow-sm" />
							</div>
						{/if}

						<div class="flex flex-wrap gap-2 mt-2">
							{#each quickChoices as choice}
								<button
									class="text-lg px-6 py-3 rounded-xl bg-surface-200 text-surface-900 font-medium transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:bg-surface-300 active:translate-y-0"
								>
									{choice}
								</button>
							{/each}
						</div>
					</div>

					<!-- Segmented progress bar -->
					<div class="flex items-center gap-3 px-6 py-3 border-t border-surface-200 bg-surface-50">
						<span class="text-sm font-medium text-surface-500">Question {currentStep} sur {totalSteps}</span>
						<div class="flex gap-1 flex-1 max-w-48">
							{#each Array(totalSteps) as _, i}
								<div
									class={cn(
										'h-1.5 flex-1 rounded-full transition-colors duration-300',
										i < currentStep ? 'bg-brand-500' : 'bg-surface-200'
									)}
								></div>
							{/each}
						</div>
					</div>

					<div class="flex gap-3 p-4 border-t border-surface-200 bg-white">
						<input
							type="text"
							placeholder="Tapez votre reponse..."
							class="flex-1 text-lg px-4 py-3.5 rounded-xl border-2 border-surface-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
						/>
						<Button size="lg" class="px-5 py-3.5 rounded-xl">
							<Send class="h-5 w-5" />
						</Button>
					</div>
				</div>
			</Card>
		</div>
	{:else}
		<!-- Form tab -->
		<Card padding="lg">
			<form class="flex flex-col gap-6" onsubmit={(e) => e.preventDefault()}>
				<!-- Form illustration / header -->
				<div class="flex flex-col items-center text-center pb-2">
					<div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 mb-3">
						<Search class="h-7 w-7" />
					</div>
					<h2 class="text-xl font-bold text-surface-900">Recherche par criteres</h2>
					<p class="text-base text-surface-400 mt-1">Definissez vos criteres pour identifier les meilleurs prospects.</p>
				</div>

				<!-- Criteres principaux section -->
				<div class="flex flex-col gap-5">
					<div class="flex items-center gap-2 pb-1 border-b border-surface-200">
						<h3 class="text-sm font-bold uppercase tracking-wide text-surface-500">Criteres principaux</h3>
					</div>

					<div class="flex flex-col gap-1.5">
						<label for="sector" class="text-base font-semibold text-surface-700">Secteur d'activite *</label>
						<div class="relative">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-surface-400">
								<Building2 class="h-5 w-5" />
							</div>
							<select
								id="sector"
								bind:value={sector}
								class="w-full text-lg pl-12 pr-4 py-3.5 h-14 rounded-xl border-2 border-surface-300 bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 appearance-none"
							>
								<option value="">Choisir un secteur</option>
								<option value="aeronautique">Aeronautique</option>
								<option value="automobile">Automobile</option>
								<option value="defense">Defense</option>
								<option value="energie">Energie / Nucleaire</option>
								<option value="pharma">Pharma / Sciences de la vie</option>
								<option value="telecoms">Telecoms</option>
								<option value="it">IT / Numerique</option>
								<option value="industrie">Industrie</option>
								<option value="autre">Autre</option>
							</select>
						</div>
					</div>

					<div class="flex flex-col gap-1.5">
						<label for="region" class="text-base font-semibold text-surface-700">Zone geographique *</label>
						<div class="flex gap-3">
							<div class="relative flex-1 zone-dropdown-container">
								<button
									type="button"
									onclick={() => (zoneDropdownOpen = !zoneDropdownOpen)}
									class="w-full flex items-center gap-3 text-left text-lg px-4 py-3.5 h-14 rounded-xl border-2 border-surface-300 bg-white hover:border-brand-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors cursor-pointer"
								>
									<MapPin class="h-5 w-5 text-surface-400 shrink-0" />
									{#if selectedRegionNames.length > 0}
										<span class="flex-1 truncate text-surface-900">{selectedRegionNames.length} zone{selectedRegionNames.length > 1 ? 's' : ''} selectionnee{selectedRegionNames.length > 1 ? 's' : ''}</span>
									{:else}
										<span class="flex-1 text-surface-400">Choisir une zone</span>
									{/if}
									<ChevronDown class="h-5 w-5 text-surface-400 shrink-0 transition-transform {zoneDropdownOpen ? 'rotate-180' : ''}" />
								</button>
								{#if zoneDropdownOpen}
									<div class="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-surface-200 rounded-xl shadow-lg max-h-72 overflow-y-auto">
										<div class="p-2">
											<p class="text-xs font-bold uppercase text-surface-400 px-3 py-1.5">Raccourcis</p>
											{#each [{ slug: 'france', label: 'France entiere' }, { slug: 'europe', label: 'Europe' }] as item}
												<button
													type="button"
													onclick={() => toggleZone(item.slug, item.label)}
													class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base hover:bg-surface-50 cursor-pointer transition-colors"
												>
													<div class="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 {selectedRegions.includes(item.slug) ? 'bg-brand-500 border-brand-500' : 'border-surface-300'}">
														{#if selectedRegions.includes(item.slug)}
															<svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
														{/if}
													</div>
													<span class="text-surface-900">{item.label}</span>
												</button>
											{/each}
											<div class="my-1 border-t border-surface-100"></div>
											<p class="text-xs font-bold uppercase text-surface-400 px-3 py-1.5">Pays</p>
											{#each [{ slug: 'france', label: 'France' }, { slug: 'allemagne', label: 'Allemagne' }, { slug: 'belgique', label: 'Belgique' }, { slug: 'espagne', label: 'Espagne' }, { slug: 'italie', label: 'Italie' }, { slug: 'pays-bas', label: 'Pays-Bas' }, { slug: 'royaume-uni', label: 'Royaume-Uni' }, { slug: 'suisse', label: 'Suisse' }] as item}
												<button
													type="button"
													onclick={() => toggleZone(item.slug, item.label)}
													class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base hover:bg-surface-50 cursor-pointer transition-colors"
												>
													<div class="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 {selectedRegions.includes(item.slug) ? 'bg-brand-500 border-brand-500' : 'border-surface-300'}">
														{#if selectedRegions.includes(item.slug)}
															<svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
														{/if}
													</div>
													<span class="text-surface-900">{item.label}</span>
												</button>
											{/each}
										</div>
									</div>
								{/if}
							</div>
							<Button variant="secondary" size="lg" class="px-4 h-14 rounded-xl shrink-0" onclick={() => (mapOpen = true)}>
								<MapPin class="h-5 w-5" />
								Carte
								{#if selectedRegions.length > 0}
									<span class="ml-1 bg-brand-500 text-white rounded-full px-1.5 py-0.5 text-xs font-medium">
										{selectedRegions.length}
									</span>
								{/if}
							</Button>
						</div>
						{#if selectedRegionNames.length > 0}
							<div class="flex flex-wrap gap-1.5 mt-1">
								{#each selectedRegionNames as name}
									<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium bg-brand-50 text-brand-600 border border-brand-100">
										{name}
										<button
											type="button"
											onclick={() => {
												const slug = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
												selectedRegions = selectedRegions.filter(s => s !== slug);
												selectedRegionNames = selectedRegionNames.filter(n => n !== name);
												if (selectedRegionNames.length === 0) region = '';
											}}
											class="hover:text-brand-800 cursor-pointer"
										>
											<X class="h-3.5 w-3.5" />
										</button>
									</span>
								{/each}
							</div>
						{/if}
					</div>

					<div class="flex flex-col gap-1.5">
						<label for="count" class="text-base font-semibold text-surface-700">Nombre de prospects souhaites *</label>
						<div class="relative">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-surface-400">
								<Users class="h-5 w-5" />
							</div>
							<input
								id="count"
								type="number"
								bind:value={prospectCount}
								min="1"
									class="w-full text-lg pl-12 pr-4 py-3.5 h-14 rounded-xl border-2 border-surface-300 bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
							/>
						</div>
						<p class="text-base text-surface-400 mt-0.5">Minimum 1 prospect</p>
					</div>
				</div>

				<div class="flex flex-col gap-1.5">
					<label for="conditions" class="text-base font-semibold text-surface-700">Mots-cles <span class="font-normal text-surface-400">(facultatif)</span></label>
					<textarea
						id="conditions"
						bind:value={freeConditions}
						rows="3"
						placeholder="Ex : utilise CATIA, certifie ISO 26262, membre pole Aerospace Valley..."
						class="w-full text-lg p-4 rounded-xl border-2 border-surface-300 bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none"
					></textarea>
				</div>

				<button
					type="button"
					onclick={() => (showAdvanced = !showAdvanced)}
					class="flex items-center gap-2 text-base font-medium text-brand-500 hover:text-brand-600 cursor-pointer self-start"
				>
					{#if showAdvanced}
						<ChevronUp class="h-5 w-5" />
						Masquer les criteres avances
					{:else}
						<ChevronDown class="h-5 w-5" />
						Plus de criteres
					{/if}
				</button>

				{#if showAdvanced}
					<div class="flex flex-col gap-6 p-6 bg-surface-50 rounded-xl border border-surface-200">
						<div class="flex flex-col gap-1.5">
							<label for="revenue" class="text-base font-semibold text-surface-700">CA minimum <span class="font-normal text-surface-400">(facultatif)</span></label>
							<input
								id="revenue"
								type="number"
								bind:value={minRevenue}
								placeholder="En EUR"
								class="w-full text-lg px-4 py-3.5 h-14 rounded-xl border-2 border-surface-300 bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
							/>
						</div>

						<div class="flex flex-col gap-1.5">
							<label for="headcount" class="text-base font-semibold text-surface-700">Effectif minimum <span class="font-normal text-surface-400">(facultatif)</span></label>
							<input
								id="headcount"
								type="number"
								bind:value={minHeadcount}
								placeholder="Nombre de salaries"
								class="w-full text-lg px-4 py-3.5 h-14 rounded-xl border-2 border-surface-300 bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
							/>
						</div>

						<div class="flex flex-col gap-1.5">
							<label for="ratio" class="text-base font-semibold text-surface-700">Ratio CA/effectif <span class="font-normal text-surface-400">(facultatif)</span></label>
							<input
								id="ratio"
								type="number"
								bind:value={revenuePerEmployee}
								placeholder="EUR par salarie"
								class="w-full text-lg px-4 py-3.5 h-14 rounded-xl border-2 border-surface-300 bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
							/>
						</div>

						<div class="flex flex-col gap-1.5">
							<label for="growth" class="text-base font-semibold text-surface-700">Potentiel de croissance <span class="font-normal text-surface-400">(facultatif)</span></label>
							<select
								id="growth"
								bind:value={growthPotential}
								class="w-full text-lg px-4 py-3.5 h-14 rounded-xl border-2 border-surface-300 bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 appearance-none"
							>
								<option value="">Indifferent</option>
								<option value="faible">Faible</option>
								<option value="moyen">Moyen</option>
								<option value="fort">Fort</option>
							</select>
						</div>

						<div class="flex flex-col gap-1.5">
							<label for="consulting" class="text-base font-semibold text-surface-700">Recours aux prestations intellectuelles <span class="font-normal text-surface-400">(facultatif)</span></label>
							<select
								id="consulting"
								bind:value={consultingUsage}
								class="w-full text-lg px-4 py-3.5 h-14 rounded-xl border-2 border-surface-300 bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 appearance-none"
							>
								<option value="">Indifferent</option>
								<option value="inconnu">Inconnu</option>
								<option value="faible">Faible</option>
								<option value="moyen">Moyen</option>
								<option value="fort">Fort</option>
							</select>
						</div>
					</div>
				{/if}

				<a
					href="/recherche/loading"
					class="btn-shine inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer text-white shadow-md hover:shadow-lg w-full text-lg py-4 mt-2 min-h-14 bg-brand-500 hover:bg-brand-600 active:bg-brand-700"
				>
					Lancer la recherche
				</a>
			</form>
		</Card>
	{/if}
</div>

<MapModal
	bind:open={mapOpen}
	bind:selected={selectedRegions}
	bind:selectedNames={selectedRegionNames}
	onconfirm={() => {
		if (selectedRegions.length > 0) {
			region = 'carte';
		}
	}}
/>
