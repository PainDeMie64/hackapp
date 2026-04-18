#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// --- CSV parser (handles quoted fields with commas) ---
function parseCsv(text) {
	const rows = [];
	let i = 0;
	while (i < text.length) {
		const row = [];
		while (i < text.length) {
			if (text[i] === '"') {
				i++;
				let field = '';
				while (i < text.length) {
					if (text[i] === '"') {
						if (text[i + 1] === '"') { field += '"'; i += 2; }
						else { i++; break; }
					} else { field += text[i]; i++; }
				}
				row.push(field);
				if (text[i] === ',') i++;
			} else {
				let field = '';
				while (i < text.length && text[i] !== ',' && text[i] !== '\n' && text[i] !== '\r') {
					field += text[i]; i++;
				}
				row.push(field);
				if (text[i] === ',') i++;
			}
			if (text[i] === '\n' || text[i] === '\r' || i >= text.length) {
				if (text[i] === '\r') i++;
				if (text[i] === '\n') i++;
				break;
			}
		}
		if (row.length > 1 || row[0]?.trim()) rows.push(row);
	}
	return rows;
}

// --- Type mapping: CSV "Type" → schema type ---
const TYPE_MAP = {
	'Chambre consulaire': 'government',
	'Chambre de commerce': 'government',
	'Registre officiel': 'government',
	'Portail institutionnel': 'government',
	'Open data': 'government',
	'Portail subventions': 'government',

	'Annuaire': 'directory',
	'Annuaire B2B': 'directory',
	'Annuaire spécialisé': 'directory',
	'Base de données': 'directory',
	'Fédération professionnelle': 'directory',
	'Syndicat patronal': 'directory',
	'Ordre professionnel': 'directory',
	'Réseau professionnel': 'directory',
	'Réseau ESS': 'directory',
	'Pôle de compétitivité': 'directory',
	'Cluster': 'directory',
	'Technopole': 'directory',
	'Incubateur': 'directory',
	'Pépinière': 'directory',
	'Agence de développement': 'directory',
	'Écosystème startup': 'directory',

	'Média économique': 'news',
	'Média financier': 'news',
	'Média startup': 'news',
	'Média ESG': 'news',
	'Blog professionnel': 'news',
	'Intelligence économique': 'news',
	'Veille sectorielle': 'news',
	'Études sectorielles': 'news',

	'Newsletter': 'newsletter',

	'Sales intelligence': 'other',
	'Plateforme': 'other',
	'Plateforme financière': 'other',
	'Plateforme RH': 'other',
	'Portail avis': 'other',
	'Portail emploi': 'other',
	'Portail ESG': 'other',
	'Portail thématique': 'other',
	'Recherche & Innovation': 'other',
	'Bourse': 'other',
};

function mapType(csvType) {
	return TYPE_MAP[csvType] || 'other';
}

const PRIORITY_URLS = new Set([
	'https://www.pappers.fr',
	'https://www.societe.com',
	'https://www.bodacc.fr',
	'https://www.insee.fr',
	'https://www.amf-france.org',
	'https://www.banque-france.fr/fr/a-votre-service/entreprise/cotation-des-entreprises',
	'https://dares.travail-emploi.gouv.fr',
]);

function esc(s) {
	return s.replace(/'/g, "''");
}

// --- Main ---
const csvPath = resolve(root, 'banque_entreprises.csv');
const csv = readFileSync(csvPath, 'utf-8');
const rows = parseCsv(csv);
const headers = rows[0];
const data = rows.slice(1);

console.log(`Parsed ${data.length} rows from CSV`);
console.log(`Headers: ${headers.join(' | ')}`);

// Build SQL
const statements = [];

// Clear all tables (respect FK ordering)
statements.push('DELETE FROM news;');
statements.push('DELETE FROM scrape_results;');
statements.push('DELETE FROM sources;');
statements.push('DELETE FROM companies;');

// Insert sources
const seen = new Set();
let dupes = 0;

for (const row of data) {
	const [name, url, type] = row;
	if (!url || !url.startsWith('http')) continue;

	// Deduplicate by URL
	if (seen.has(url)) { dupes++; continue; }
	seen.add(url);

	const mappedType = mapType(type);
	const priority = PRIORITY_URLS.has(url) ? 1 : 0;
	statements.push(
		`INSERT INTO sources (id, url, name, type, is_priority, is_active, created_at, updated_at) ` +
		`VALUES (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-4' || substr(hex(randomblob(2)),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(hex(randomblob(2)),2) || '-' || hex(randomblob(6))), ` +
		`'${esc(url)}', '${esc(name)}', '${esc(mappedType)}', ${priority}, 1, unixepoch(), unixepoch());`
	);
}

if (dupes) console.log(`Skipped ${dupes} duplicate URLs`);
console.log(`Generated ${statements.length - 4} INSERT statements`);

// Write SQL file
const sqlPath = resolve(root, '.wrangler/seed-sources.sql');
writeFileSync(sqlPath, statements.join('\n') + '\n');
console.log(`\nSQL written to ${sqlPath}`);

// Execute against local D1
console.log('\n==> Clearing existing data and seeding sources into local D1...');
try {
	execSync(`npx wrangler d1 execute hackapp-db --local --file ${sqlPath}`, {
		cwd: root,
		stdio: 'inherit',
		env: { ...process.env },
	});
	console.log(`\n✓ Done — ${statements.length - 4} sources inserted into local D1`);
} catch (e) {
	console.error('Failed to execute SQL:', e.message);
	process.exit(1);
}
