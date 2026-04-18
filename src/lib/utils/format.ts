const FRENCH_DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const FRENCH_MONTHS = [
	'janv.', 'fevr.', 'mars', 'avr.', 'mai', 'juin',
	'juil.', 'aout', 'sept.', 'oct.', 'nov.', 'dec.'
];

export function formatRevenue(eur: number | null | undefined): string {
	if (eur == null) return 'N/A';
	if (eur >= 1_000_000_000) {
		const mds = eur / 1_000_000_000;
		const formatted = mds % 1 === 0 ? String(mds) : mds.toFixed(1);
		return `${formatted} Mds EUR`;
	}
	if (eur >= 1_000_000) {
		const m = Math.round(eur / 1_000_000);
		return `${m} M EUR`;
	}
	const k = Math.round(eur / 1_000);
	return `${k}k EUR`;
}

export function formatEmployees(count: number | null | undefined): string {
	if (count == null) return 'N/A';
	return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatRelativeDate(date: Date | number | null | undefined): string {
	if (date == null) return '';
	const d = typeof date === 'number' ? new Date(date) : date;
	const now = new Date();
	const diffMs = now.getTime() - d.getTime();
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays === 0 && diffHours >= 0) {
		if (diffHours === 0) return 'A l\'instant';
		return `Il y a ${diffHours}h`;
	}

	if (diffDays === 1) return 'Hier';

	if (diffDays < 7) {
		return FRENCH_DAYS[d.getDay()];
	}

	return `${d.getDate()} ${FRENCH_MONTHS[d.getMonth()]}`;
}
