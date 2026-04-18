import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	return { searches: [] as { date: string; criteria: string; count: number; bestScore: number }[] };
};
