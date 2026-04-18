import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';
import { companies } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const GET: RequestHandler = async ({ platform }) => {
	if (!platform?.env?.DB) {
		return new Response('Database not configured', { status: 503 });
	}

	const db = getDb(platform.env.DB);
	const rows = await db.select().from(companies).orderBy(desc(companies.prospectScore));

	const headers = [
		'name', 'domain', 'description', 'sector', 'subsector',
		'location_city', 'location_country', 'employee_count', 'revenue_eur',
		'revenue_year', 'tech_stack', 'siren', 'linkedin_url',
		'prospect_score', 'prospect_band', 'status', 'enrichment_status'
	];

	const csvRows = [headers.join(',')];
	for (const row of rows) {
		const values = [
			row.name, row.domain, row.description, row.sector, row.subsector,
			row.locationCity, row.locationCountry, row.employeeCount, row.revenueEur,
			row.revenueYear, row.techStack, row.siren, row.linkedinUrl,
			row.prospectScore, row.prospectBand, row.status, row.enrichmentStatus
		].map(v => {
			if (v === null || v === undefined) return '';
			const s = String(v);
			if (s.includes(',') || s.includes('"') || s.includes('\n')) {
				return '"' + s.replace(/"/g, '""') + '"';
			}
			return s;
		});
		csvRows.push(values.join(','));
	}

	return new Response(csvRows.join('\n'), {
		headers: {
			'Content-Type': 'text/csv; charset=utf-8',
			'Content-Disposition': 'attachment; filename="prospects_alten.csv"',
		},
	});
};
