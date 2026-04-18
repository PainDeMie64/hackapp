import type { Source } from '$lib/server/db/schema.js';

const ALTEN_SECTORS = [
	'aeronautique defense',
	'automobile',
	'energie nucleaire',
	'telecoms',
	'pharma sciences de la vie',
	'ferroviaire transport',
	'banque assurance IT',
	'semi-conducteurs',
	'ingenierie conseil',
];

const ALTEN_REGIONS = [
	'Nantes', 'Paris', 'Toulouse', 'Lyon', 'Grenoble', 'Aix-en-Provence', 'Rennes',
];

export function buildSearchQueries(source: Source): string[] {
	const domain = new URL(source.url).hostname;
	const queries: string[] = [];

	switch (source.type) {
		case 'directory': {
			// Company directories: search for company listing pages by sector
			for (const sector of ALTEN_SECTORS.slice(0, 4)) {
				queries.push(`site:${domain} entreprise ${sector}`);
			}
			queries.push(`site:${domain} entreprise ingenieur recrutement`);
			break;
		}

		case 'government': {
			// Government sites: search for company data pages
			if (domain.includes('pappers') || domain.includes('societe.com') || domain.includes('verif')) {
				for (const sector of ALTEN_SECTORS.slice(0, 3)) {
					queries.push(`site:${domain} entreprise ${sector} France`);
				}
				queries.push(`site:${domain} entreprise ingenierie conseil`);
			} else if (domain.includes('sirene') || domain.includes('annuaire-entreprises') || domain.includes('infogreffe')) {
				queries.push(`site:${domain} entreprise aeronautique`);
				queries.push(`site:${domain} entreprise energie`);
				queries.push(`site:${domain} entreprise automobile`);
			} else if (domain.includes('boamp') || domain.includes('place') || domain.includes('ted.europa')) {
				queries.push(`site:${domain} ingenierie informatique marche`);
				queries.push(`site:${domain} conseil technique prestation`);
			} else {
				queries.push(`site:${domain} entreprise industrie France`);
			}
			break;
		}

		case 'news': {
			// News sites: search for articles about companies hiring/expanding/investing
			queries.push(`site:${domain} recrutement ingenieur 2025 2026`);
			queries.push(`site:${domain} nouvelle usine investissement France`);
			queries.push(`site:${domain} contrat defense aeronautique`);
			queries.push(`site:${domain} transformation digitale industrie`);
			queries.push(`site:${domain} levee fonds startup deep tech`);
			break;
		}

		case 'newsletter':
		case 'other': {
			// Job boards and others
			if (domain.includes('apec') || domain.includes('indeed') || domain.includes('travail') ||
				domain.includes('welcome') || domain.includes('cadremploi') || domain.includes('hellowork')) {
				queries.push(`site:${domain} ingenieur logiciel embarque`);
				queries.push(`site:${domain} ingenieur aeronautique defense`);
				queries.push(`site:${domain} consultant IT ingenierie`);
			} else {
				// Clusters, associations
				queries.push(`site:${domain} membre entreprise adherent`);
				queries.push(`site:${domain} entreprise innovation ingenierie`);
			}
			break;
		}

		default: {
			queries.push(`site:${domain} entreprise`);
		}
	}

	return queries;
}

export function deduplicateUrls(results: Array<{ link: string }>): string[] {
	const seen = new Set<string>();
	const unique: string[] = [];
	for (const r of results) {
		const normalized = r.link.split('?')[0].split('#')[0].replace(/\/+$/, '').toLowerCase();
		if (!seen.has(normalized)) {
			seen.add(normalized);
			unique.push(r.link);
		}
	}
	return unique;
}
