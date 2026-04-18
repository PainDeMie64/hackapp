#!/usr/bin/env -S npx tsx
/**
 * Export prospects from D1 to a Google Sheet, sorted by score (best first).
 *
 * Usage:
 *   npx tsx scripts/export-sheets.ts                     # local D1
 *   npx tsx scripts/export-sheets.ts --remote            # remote D1
 *   npx tsx scripts/export-sheets.ts --spreadsheet-id=ID # write to existing sheet
 *
 * Requires:
 *   GOOGLE_SERVICE_ACCOUNT_JSON env var or google-credentials.json in project root
 *   containing a Google Cloud service account key with Sheets API enabled.
 *
 * If --spreadsheet-id is not provided, a new spreadsheet is created and shared
 * with the email in GOOGLE_SHARE_EMAIL (or the service account itself).
 */

import 'dotenv/config';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { google } from 'googleapis';

// ─── CLI args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const isRemote = args.includes('--remote');
const spreadsheetArg = args.find((a) => a.startsWith('--spreadsheet-id='));
const existingSpreadsheetId = spreadsheetArg?.split('=')[1];
const shareEmail = process.env.GOOGLE_SHARE_EMAIL;

// ─── D1 query helper ─────────────────────────────────────────────────────────
function queryD1(sql: string): unknown[] {
	const flag = isRemote ? '--remote' : '--local';
	const cmd = `npx wrangler d1 execute hackapp-db ${flag} --json --command "${sql.replace(/"/g, '\\"')}"`;
	const raw = execSync(cmd, { cwd: process.cwd(), encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
	const parsed = JSON.parse(raw);
	return parsed[0]?.results ?? [];
}

// ─── Google auth ─────────────────────────────────────────────────────────────
function getAuth() {
	let credentials: Record<string, string>;
	const envJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
	if (envJson) {
		credentials = JSON.parse(envJson);
	} else {
		const credPath = path.join(process.cwd(), 'google-credentials.json');
		if (!fs.existsSync(credPath)) {
			console.error('Error: No Google credentials found.');
			console.error('Set GOOGLE_SERVICE_ACCOUNT_JSON env var or place google-credentials.json in project root.');
			process.exit(1);
		}
		credentials = JSON.parse(fs.readFileSync(credPath, 'utf-8'));
	}
	return new google.auth.GoogleAuth({
		credentials,
		scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
	});
}

// ─── Fetch data ──────────────────────────────────────────────────────────────
interface CompanyRow {
	id: string;
	name: string;
	domain: string | null;
	description: string | null;
	sector: string | null;
	subsector: string | null;
	location_city: string | null;
	location_country: string | null;
	employee_count: number | null;
	revenue_eur: number | null;
	revenue_year: number | null;
	tech_stack: string | null;
	siren: string | null;
	status: string | null;
	enrichment_status: string | null;
	prospect_score: number | null;
	prospect_band: string | null;
}

interface ProspectScoreRow {
	company_id: string;
	total_score: number | null;
	score_label: string | null;
	[key: string]: unknown;
}

interface CompanyScoreRow {
	company_id: string;
	dimension: string;
	score: number;
}

function fetchData() {
	console.log(`Querying D1 (${isRemote ? 'remote' : 'local'})...`);

	const companies = queryD1(
		`SELECT id, name, domain, description, sector, subsector, location_city, location_country, employee_count, revenue_eur, revenue_year, tech_stack, siren, status, enrichment_status, prospect_score, prospect_band FROM companies ORDER BY name`
	) as CompanyRow[];
	console.log(`  ${companies.length} companies`);

	const prospectScores = queryD1(
		`SELECT company_id, total_score, score_label, sector_alignment, naf_code_match, company_size, rd_department_size, geographic_proximity, revenue_growth_gap, rd_spending_trend, engineering_job_volume, stale_job_postings, rare_skills_demand, physical_expansion, digital_transformation, cloud_migration, leadership_change, eu_regulatory_pressure, certification_needs, major_contract_won FROM prospect_scores`
	) as ProspectScoreRow[];
	console.log(`  ${prospectScores.length} prospect_scores`);

	const companyScores = queryD1(
		`SELECT company_id, dimension, score FROM company_scores`
	) as CompanyScoreRow[];
	console.log(`  ${companyScores.length} company_scores`);

	return { companies, prospectScores, companyScores };
}

// ─── Build sheet rows ────────────────────────────────────────────────────────
function buildRows(data: ReturnType<typeof fetchData>) {
	const { companies, prospectScores, companyScores } = data;

	const psMap = new Map(prospectScores.map((ps) => [ps.company_id, ps]));
	const csMap = new Map<string, Record<string, number>>();
	for (const cs of companyScores) {
		if (!csMap.has(cs.company_id)) csMap.set(cs.company_id, {});
		csMap.get(cs.company_id)![cs.dimension] = cs.score;
	}

	const DIMENSIONS = ['firmographic', 'recruitment', 'financial', 'project', 'intent', 'regulatory', 'competitive'] as const;

	const headers = [
		'Rang',
		'Entreprise',
		'Score Global',
		'Band',
		'Secteur',
		'Sous-secteur',
		'Ville',
		'Pays',
		'Effectifs',
		'CA (EUR)',
		'Année CA',
		'Domaine',
		'SIREN',
		'Stack Tech',
		'Statut',
		'Enrichissement',
		// 7 dimension scores
		'Score Firmographic',
		'Score Recrutement',
		'Score Financier',
		'Score Projet',
		'Score Intention',
		'Score Réglementaire',
		'Score Compétitif',
		// Key prospect_scores criteria
		'Alignement Secteur',
		'Taille Entreprise',
		'Croissance CA',
		'Dépenses R&D',
		'Volume Offres',
		'Postes Stales',
		'Compétences Rares',
		'Expansion Physique',
		'Transformation Digitale',
		'Migration Cloud',
		'Changement Direction',
		'Pression Réglementaire UE',
		'Certifications',
		'Contrat Majeur',
		'Description',
	];

	const rows = companies.map((c) => {
		const ps = psMap.get(c.id);
		const cs = csMap.get(c.id) ?? {};

		// Best available score: prefer prospect_score (from our pipeline), fallback to prospect_scores.total_score
		const score = c.prospect_score ?? ps?.total_score ?? 0;
		const band = c.prospect_band ?? ps?.score_label ?? '';

		let techStack = '';
		if (c.tech_stack) {
			try { techStack = JSON.parse(c.tech_stack).join(', '); } catch { techStack = c.tech_stack; }
		}

		return {
			score,
			row: [
				0, // placeholder for rank
				c.name,
				score,
				band,
				c.sector ?? '',
				c.subsector ?? '',
				c.location_city ?? '',
				c.location_country ?? '',
				c.employee_count ?? '',
				c.revenue_eur ?? '',
				c.revenue_year ?? '',
				c.domain ?? '',
				c.siren ?? '',
				techStack,
				c.status ?? '',
				c.enrichment_status ?? '',
				cs.firmographic ?? '',
				cs.recruitment ?? '',
				cs.financial ?? '',
				cs.project ?? '',
				cs.intent ?? '',
				cs.regulatory ?? '',
				cs.competitive ?? '',
				(ps?.sector_alignment as number) ?? '',
				(ps?.company_size as number) ?? '',
				(ps?.revenue_growth_gap as number) ?? '',
				(ps?.rd_spending_trend as number) ?? '',
				(ps?.engineering_job_volume as number) ?? '',
				(ps?.stale_job_postings as number) ?? '',
				(ps?.rare_skills_demand as number) ?? '',
				(ps?.physical_expansion as number) ?? '',
				(ps?.digital_transformation as number) ?? '',
				(ps?.cloud_migration as number) ?? '',
				(ps?.leadership_change as number) ?? '',
				(ps?.eu_regulatory_pressure as number) ?? '',
				(ps?.certification_needs as number) ?? '',
				(ps?.major_contract_won as number) ?? '',
				c.description ?? '',
			] as (string | number)[],
		};
	});

	// Sort by score descending
	rows.sort((a, b) => b.score - a.score);

	// Fill in ranks
	rows.forEach((r, i) => {
		r.row[0] = i + 1;
	});

	return { headers, rows: rows.map((r) => r.row) };
}

// ─── Write to Google Sheets ──────────────────────────────────────────────────
async function writeToSheets(headers: string[], rows: (string | number)[][]) {
	const auth = getAuth();
	const sheets = google.sheets({ version: 'v4', auth });
	const drive = google.drive({ version: 'v3', auth });

	let spreadsheetId: string;

	if (existingSpreadsheetId) {
		spreadsheetId = existingSpreadsheetId;
		console.log(`Using existing spreadsheet: ${spreadsheetId}`);
	} else {
		const res = await sheets.spreadsheets.create({
			requestBody: {
				properties: {
					title: `HackApp Prospects — ${new Date().toISOString().slice(0, 10)}`,
				},
				sheets: [{ properties: { title: 'Prospects' } }],
			},
		});
		spreadsheetId = res.data.spreadsheetId!;
		console.log(`Created spreadsheet: ${spreadsheetId}`);

		if (shareEmail) {
			await drive.permissions.create({
				fileId: spreadsheetId,
				requestBody: { role: 'writer', type: 'user', emailAddress: shareEmail },
				sendNotificationEmail: false,
			});
			console.log(`Shared with ${shareEmail}`);
		}
	}

	// Clear existing data
	try {
		await sheets.spreadsheets.values.clear({
			spreadsheetId,
			range: 'Prospects!A:ZZ',
		});
	} catch {
		// Sheet might not exist yet in existing spreadsheet
	}

	// Write headers + data
	const allRows = [headers, ...rows];
	await sheets.spreadsheets.values.update({
		spreadsheetId,
		range: 'Prospects!A1',
		valueInputOption: 'RAW',
		requestBody: { values: allRows },
	});

	// Format: freeze header row, bold header, auto-resize, color bands
	const sheetId = 0;
	await sheets.spreadsheets.batchUpdate({
		spreadsheetId,
		requestBody: {
			requests: [
				// Freeze header
				{
					updateSheetProperties: {
						properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
						fields: 'gridProperties.frozenRowCount',
					},
				},
				// Bold header
				{
					repeatCell: {
						range: { sheetId, startRowIndex: 0, endRowIndex: 1 },
						cell: {
							userEnteredFormat: {
								backgroundColor: { red: 0.2, green: 0.3, blue: 0.6 },
								textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
							},
						},
						fields: 'userEnteredFormat(backgroundColor,textFormat)',
					},
				},
				// Color the Band column based on value (conditional formatting)
				...[
					{ band: 'hot', color: { red: 0.85, green: 0.2, blue: 0.2 } },
					{ band: 'warm', color: { red: 0.95, green: 0.7, blue: 0.2 } },
					{ band: 'qualified', color: { red: 0.3, green: 0.6, blue: 0.9 } },
					{ band: 'cold', color: { red: 0.7, green: 0.7, blue: 0.7 } },
					{ band: 'Chaud', color: { red: 0.85, green: 0.2, blue: 0.2 } },
					{ band: 'Tiède', color: { red: 0.95, green: 0.7, blue: 0.2 } },
					{ band: 'Qualifié', color: { red: 0.3, green: 0.6, blue: 0.9 } },
					{ band: 'Froid', color: { red: 0.7, green: 0.7, blue: 0.7 } },
				].map(({ band, color }) => ({
					addConditionalFormatRule: {
						rule: {
							ranges: [{ sheetId, startColumnIndex: 3, endColumnIndex: 4, startRowIndex: 1 }],
							booleanRule: {
								condition: { type: 'TEXT_EQ' as const, values: [{ userEnteredValue: band }] },
								format: {
									backgroundColor: color,
									textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
								},
							},
						},
						index: 0,
					},
				})),
				// Auto-resize first columns
				{
					autoResizeDimensions: {
						dimensions: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 16 },
					},
				},
			],
		},
	});

	const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
	console.log(`\n✅ Spreadsheet ready: ${url}`);
	console.log(`   ${rows.length} prospects exported, sorted by score (best first)`);
	return url;
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
	const data = fetchData();

	if (data.companies.length === 0) {
		console.error('No companies found in DB. Run the ingestion pipeline first.');
		process.exit(1);
	}

	const { headers, rows } = buildRows(data);
	await writeToSheets(headers, rows);
}

main().catch((e) => {
	console.error('Fatal error:', e);
	process.exit(1);
});
