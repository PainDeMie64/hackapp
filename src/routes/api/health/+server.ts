import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async ({ platform }) => {
	let dbStatus = 'not_configured';

	if (platform?.env?.DB) {
		try {
			await platform.env.DB.prepare('SELECT 1').first();
			dbStatus = 'connected';
		} catch {
			dbStatus = 'error';
		}
	}

	return json({
		status: 'ok',
		timestamp: new Date().toISOString(),
		db: dbStatus
	});
};
