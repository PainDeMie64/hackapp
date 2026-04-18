interface SignatureV4Input {
	method: string;
	url: string;
	headers: Record<string, string>;
	body: string;
	region: string;
	service: string;
	accessKeyId: string;
	secretAccessKey: string;
	sessionToken?: string;
}

async function hmacSha256(key: ArrayBuffer | string, data: string): Promise<ArrayBuffer> {
	const keyBuffer = typeof key === 'string' ? new TextEncoder().encode(key) : key;
	const cryptoKey = await crypto.subtle.importKey(
		'raw', keyBuffer, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
	);
	return crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(data));
}

async function sha256Hex(data: string): Promise<string> {
	const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
	return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function getSignatureKey(
	secretKey: string, dateStamp: string, region: string, service: string
): Promise<ArrayBuffer> {
	const kDate = await hmacSha256('AWS4' + secretKey, dateStamp);
	const kRegion = await hmacSha256(kDate, region);
	const kService = await hmacSha256(kRegion, service);
	return hmacSha256(kService, 'aws4_request');
}

function formatDate(date: Date): { dateStamp: string; amzDate: string } {
	const y = date.getUTCFullYear();
	const m = String(date.getUTCMonth() + 1).padStart(2, '0');
	const d = String(date.getUTCDate()).padStart(2, '0');
	const h = String(date.getUTCHours()).padStart(2, '0');
	const mi = String(date.getUTCMinutes()).padStart(2, '0');
	const s = String(date.getUTCSeconds()).padStart(2, '0');
	const dateStamp = `${y}${m}${d}`;
	const amzDate = `${dateStamp}T${h}${mi}${s}Z`;
	return { dateStamp, amzDate };
}

export async function signRequest(input: SignatureV4Input): Promise<{
	url: string; headers: Record<string, string>; body: string;
}> {
	const url = new URL(input.url);
	const { dateStamp, amzDate } = formatDate(new Date());

	// Normalize all headers to lowercase keys upfront
	const normalized: Record<string, string> = {};
	for (const [k, v] of Object.entries(input.headers)) {
		normalized[k.toLowerCase()] = v.trim();
	}
	normalized['host'] = url.host;
	normalized['x-amz-date'] = amzDate;
	if (input.sessionToken) {
		normalized['x-amz-security-token'] = input.sessionToken;
	}

	const signedHeaderKeys = Object.keys(normalized).sort();
	const signedHeaders = signedHeaderKeys.join(';');
	const canonicalHeaders = signedHeaderKeys
		.map(k => `${k}:${normalized[k]}`)
		.join('\n') + '\n';

	// Sort query parameters per AWS SigV4 spec
	const sortedParams = [...url.searchParams.entries()].sort(([a], [b]) => a.localeCompare(b));
	const canonicalQueryString = sortedParams.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');

	const payloadHash = await sha256Hex(input.body);
	const canonicalRequest = [
		input.method,
		url.pathname,
		canonicalQueryString,
		canonicalHeaders,
		signedHeaders,
		payloadHash,
	].join('\n');

	const scope = `${dateStamp}/${input.region}/${input.service}/aws4_request`;
	const stringToSign = [
		'AWS4-HMAC-SHA256',
		amzDate,
		scope,
		await sha256Hex(canonicalRequest),
	].join('\n');

	const signingKey = await getSignatureKey(input.secretAccessKey, dateStamp, input.region, input.service);
	const signatureBuffer = await hmacSha256(signingKey, stringToSign);
	const signature = [...new Uint8Array(signatureBuffer)].map(b => b.toString(16).padStart(2, '0')).join('');

	normalized['authorization'] = `AWS4-HMAC-SHA256 Credential=${input.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

	return { url: input.url, headers: normalized, body: input.body };
}
