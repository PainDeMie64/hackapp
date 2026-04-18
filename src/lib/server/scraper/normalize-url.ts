const TRACKING_PARAMS = new Set([
	'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
	'fbclid', 'gclid', 'gclsrc', 'dclid', 'msclkid',
	'ref', 'source', 'mc_cid', 'mc_eid', '_ga', '_gl',
	'hsa_cam', 'hsa_grp', 'hsa_mt', 'hsa_src', 'hsa_ad', 'hsa_acc',
	'hsa_net', 'hsa_ver', 'hsa_la', 'hsa_ol', 'hsa_kw'
]);

export function normalizeUrl(raw: string): string {
	const url = new URL(raw);

	url.protocol = 'https:';
	url.hostname = url.hostname.toLowerCase().replace(/^www\./, '');
	if (url.port === '443' || url.port === '80') url.port = '';
	url.hash = '';

	const params = new URLSearchParams(url.search);
	const cleaned = new URLSearchParams();
	const keys = [...params.keys()].sort();
	for (const key of keys) {
		if (!TRACKING_PARAMS.has(key.toLowerCase())) {
			cleaned.set(key, params.get(key)!);
		}
	}
	url.search = cleaned.toString() ? `?${cleaned.toString()}` : '';

	url.pathname = url.pathname.replace(/\/+$/, '') || '/';

	return url.toString();
}

export function extractDomain(url: string): string {
	return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
}
