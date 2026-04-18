#!/usr/bin/env -S npx tsx
/**
 * Batch PDF ingestion script.
 * Usage: npx tsx scripts/ingest-pdfs.ts [folder]
 * Default folder: data/pdfs/
 * Requires ANTHROPIC_API_KEY in .env or environment.
 */

import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { PDFParse } from 'pdf-parse';

const PDF_DIR = process.argv[2] || path.join(process.cwd(), 'data', 'pdfs');

if (!fs.existsSync(PDF_DIR)) {
	console.error(`Error: PDF directory not found: ${PDF_DIR}`);
	console.error('Create it and add PDF files to ingest.');
	process.exit(1);
}

const files = fs.readdirSync(PDF_DIR).filter((f) => f.toLowerCase().endsWith('.pdf'));

if (files.length === 0) {
	console.error(`No PDF files found in ${PDF_DIR}`);
	process.exit(1);
}

console.log(`Found ${files.length} PDF(s) in ${PDF_DIR}\n`);

async function main() {
	// Dynamic import to support ESM
	const { extractCompaniesFromText } = await import('../src/lib/server/prospect/extract.js');
	const { scoreCompany } = await import('../src/lib/server/prospect/scoring.js');

	const allResults: Array<{
		file: string;
		companies: Array<{ name: string; score: number; band: string; dimensions: Record<string, number> }>;
	}> = [];

	for (const file of files) {
		const filePath = path.join(PDF_DIR, file);
		console.log(`Processing: ${file}`);

		try {
			const buffer = fs.readFileSync(filePath);
			const parser = new PDFParse({ data: new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) });
			const textResult = await parser.getText();
			const text = textResult.text;
			console.log(`  Extracted ${text.length} chars from ${textResult.total} pages`);

			if (text.trim().length < 50) {
				console.log('  Skipping: too little text extracted\n');
				continue;
			}

			const sourceUrl = `file://${filePath}`;
			const extraction = await extractCompaniesFromText(text, sourceUrl);

			console.log(`  Found ${extraction.companies.length} companies`);

			const fileResults: typeof allResults[number] = { file, companies: [] };

			for (const company of extraction.companies) {
				const scoring = scoreCompany(company);
				const dimensions: Record<string, number> = {};
				for (const d of scoring.dimensions) {
					dimensions[d.dimension] = d.score;
				}

				fileResults.companies.push({
					name: company.name,
					score: scoring.totalScore,
					band: scoring.band,
					dimensions,
				});

				const bandEmoji = { hot: '🔥', warm: '🟡', qualified: '🔵', cold: '⚪' }[scoring.band];
				console.log(`    ${bandEmoji} ${company.name}: ${scoring.totalScore}/100 (${scoring.band})`);
			}

			allResults.push(fileResults);
			console.log();
		} catch (e) {
			console.error(`  Error processing ${file}:`, e instanceof Error ? e.message : e);
			console.log();
		}
	}

	// Write results to JSON for downstream use (e.g., API ingest)
	const outputPath = path.join(process.cwd(), 'data', 'extraction-results.json');
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, JSON.stringify(allResults, null, 2));
	console.log(`Results written to ${outputPath}`);

	const totalCompanies = allResults.reduce((sum, r) => sum + r.companies.length, 0);
	const hot = allResults.flatMap((r) => r.companies).filter((c) => c.band === 'hot').length;
	const warm = allResults.flatMap((r) => r.companies).filter((c) => c.band === 'warm').length;
	console.log(`\nSummary: ${totalCompanies} companies from ${allResults.length} PDFs`);
	console.log(`  🔥 Hot: ${hot}  🟡 Warm: ${warm}  🔵 Qualified: ${totalCompanies - hot - warm}`);
}

main().catch((e) => {
	console.error('Fatal error:', e);
	process.exit(1);
});
