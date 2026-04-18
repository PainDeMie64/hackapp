<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import { X } from 'lucide-svelte';
	import { browser } from '$app/environment';

	interface Props {
		open: boolean;
		selected: string[];
		selectedNames: string[];
		onconfirm?: () => void;
	}

	let {
		open = $bindable(false),
		selected = $bindable([]),
		selectedNames = $bindable([]),
		onconfirm
	}: Props = $props();

	let mapContainer: HTMLDivElement | undefined = $state(undefined);
	let map: any = $state(null);
	let geoLayer: any = $state(null);
	let mode = $state<'regions' | 'departements'>('regions');

	const REGIONS_URL = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson';
	const DEPTS_URL = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson';

	function getSlug(name: string): string {
		return name
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}

	function isSelected(name: string): boolean {
		return selected.includes(getSlug(name));
	}

	function toggleArea(name: string) {
		const slug = getSlug(name);
		if (selected.includes(slug)) {
			selected = selected.filter((s) => s !== slug);
			selectedNames = selectedNames.filter((n) => getSlug(n) !== slug);
		} else {
			selected = [...selected, slug];
			selectedNames = [...selectedNames, name];
		}
		if (geoLayer) {
			geoLayer.eachLayer((layer: any) => styleLayer(layer));
		}
	}

	function styleLayer(layer: any) {
		const name = layer.feature?.properties?.nom;
		if (!name) return;
		const sel = isSelected(name);
		layer.setStyle({
			fillColor: sel ? '#1D5FAD' : '#EEF0F4',
			fillOpacity: sel ? 0.7 : 0.4,
			color: sel ? '#0D3A72' : '#ACB1BC',
			weight: sel ? 2.5 : 1.5
		});
	}

	async function loadGeoJSON() {
		if (!browser || !map) return;

		if (geoLayer) {
			map.removeLayer(geoLayer);
			geoLayer = null;
		}

		const L = await import('leaflet');
		const url = mode === 'regions' ? REGIONS_URL : DEPTS_URL;

		try {
			const resp = await fetch(url);
			const geojson = await resp.json() as any;

			geoLayer = L.geoJSON(geojson, {
				style: () => ({
					fillColor: '#EEF0F4',
					fillOpacity: 0.4,
					color: '#ACB1BC',
					weight: mode === 'regions' ? 1.5 : 1
				}),
				onEachFeature: (feature: any, layer: any) => {
					const name = feature.properties?.nom;
					if (!name) return;

					styleLayer(layer);

					layer.on('click', () => toggleArea(name));
					layer.on('mouseover', (e: any) => {
						if (!isSelected(name)) {
							e.target.setStyle({ fillColor: '#DAE4F5', fillOpacity: 0.6, color: '#1D5FAD', weight: 2 });
						}
					});
					layer.on('mouseout', () => styleLayer(layer));

					const code = feature.properties?.code ?? '';
					const label = mode === 'departements' && code ? `${code} - ${name}` : name;
					layer.bindTooltip(label, {
						permanent: false,
						direction: 'center',
						className: 'region-tooltip'
					});
				}
			}).addTo(map);
		} catch {
			// fetch failed
		}
	}

	async function initMap() {
		if (!browser || !mapContainer) return;

		const L = await import('leaflet');

		if (map) {
			map.remove();
			map = null;
			geoLayer = null;
		}

		map = L.map(mapContainer, {
			center: [46.6, 2.5],
			zoom: 6,
			zoomControl: true,
			attributionControl: false,
			maxBounds: L.latLngBounds([41, -6], [52, 10]),
			minZoom: 5,
			maxZoom: 10
		});

		L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
			subdomains: 'abcd'
		}).addTo(map);

		await loadGeoJSON();
	}

	$effect(() => {
		if (open && mapContainer) {
			setTimeout(() => initMap(), 100);
		}
	});

	function switchMode(newMode: 'regions' | 'departements') {
		if (mode === newMode) return;
		mode = newMode;
		loadGeoJSON();
	}

	function handleClose() {
		if (map) {
			map.remove();
			map = null;
			geoLayer = null;
		}
		open = false;
	}

	function handleConfirm() {
		onconfirm?.();
		handleClose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (open && e.key === 'Escape') handleClose();
	}

	function removeArea(slug: string) {
		selectedNames = selectedNames.filter((n) => getSlug(n) !== slug);
		selected = selected.filter((s) => s !== slug);
		if (geoLayer) {
			geoLayer.eachLayer((layer: any) => styleLayer(layer));
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Carte de France">
		<button
			class="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default"
			onclick={handleClose}
			aria-label="Fermer"
			tabindex="-1"
		></button>

		<div class="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-surface-200 overflow-hidden animate-in fade-in zoom-in-95">
			<div class="flex items-center justify-between px-6 py-4 border-b border-surface-200">
				<div>
					<h2 class="text-lg font-bold text-surface-900">Selectionner sur la carte</h2>
					{#if selected.length > 0}
						<p class="text-sm text-surface-400">{selected.length} {mode === 'regions' ? 'region' : 'departement'}{selected.length > 1 ? 's' : ''} selectionnee{selected.length > 1 ? 's' : ''}</p>
					{:else}
						<p class="text-sm text-surface-400">Cliquez sur {mode === 'regions' ? 'les regions' : 'les departements'}</p>
					{/if}
				</div>
				<button onclick={handleClose} class="flex items-center justify-center w-10 h-10 rounded-xl text-surface-400 hover:bg-surface-100 hover:text-surface-900 transition-colors cursor-pointer">
					<X class="h-5 w-5" />
				</button>
			</div>

			<div class="flex gap-2 px-6 py-3 border-b border-surface-200 bg-surface-50">
				<button
					onclick={() => switchMode('regions')}
					class={cn(
						'px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer',
						mode === 'regions' ? 'bg-brand-500 text-white shadow-sm' : 'bg-white text-surface-500 hover:bg-surface-100 border border-surface-200'
					)}
				>
					Regions
				</button>
				<button
					onclick={() => switchMode('departements')}
					class={cn(
						'px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer',
						mode === 'departements' ? 'bg-brand-500 text-white shadow-sm' : 'bg-white text-surface-500 hover:bg-surface-100 border border-surface-200'
					)}
				>
					Departements
				</button>
			</div>

			<div bind:this={mapContainer} class="w-full h-[420px]"></div>

			{#if selected.length > 0}
				<div class="px-6 py-3 border-t border-surface-200 bg-surface-50 max-h-24 overflow-y-auto">
					<div class="flex flex-wrap gap-2">
						{#each selectedNames as name}
							<button
								onclick={() => removeArea(getSlug(name))}
								class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-brand-100 text-brand-700 hover:bg-brand-200 transition-colors cursor-pointer"
							>
								{name}
								<X class="h-3.5 w-3.5" />
							</button>
						{/each}
					</div>
				</div>
			{/if}

			<div class="flex justify-end gap-3 px-6 py-4 border-t border-surface-200">
				<button
					onclick={handleClose}
					class="px-5 py-2.5 rounded-xl text-base font-medium text-surface-600 hover:bg-surface-100 transition-colors cursor-pointer"
				>
					Annuler
				</button>
				<button
					onclick={handleConfirm}
					class="px-6 py-2.5 rounded-xl text-base font-medium bg-brand-500 text-white hover:bg-brand-600 transition-colors cursor-pointer shadow-sm"
				>
					Confirmer
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(.region-tooltip) {
		background: white;
		border: 1px solid #CDCFD5;
		border-radius: 8px;
		padding: 4px 10px;
		font-size: 13px;
		font-weight: 500;
		color: #1B1F26;
		box-shadow: 0 2px 8px rgba(0,0,0,0.1);
	}
	:global(.leaflet-container) {
		background: #F5F6F8;
		font-family: 'Inter', sans-serif;
	}
</style>

<svelte:head>
	{#if open}
		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
	{/if}
</svelte:head>
