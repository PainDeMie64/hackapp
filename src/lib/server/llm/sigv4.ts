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
	const iso = date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
	return { dateStamp: iso.slice(0, 8), amzDate: iso.slice(0, 15) + 'Z' };
}

export async function signRequest(input: SignatureV4Input): Promise<{
	url: string; headers: Record<string, string>; body: string;
}> {
	const url = new URL(input.url);
	const { dateStamp, amzDate } = formatDate(new Date());

	const headers: Record<string, string> = {
		...input.headers,
		host: url.host,
		'x-amz-date': amzDate,
	};
	if (input.sessionToken) {
		headers['x-amz-security-token'] = input.sessionToken;
	}

	const signedHeaderKeys = Object.keys(headers).sort().map(k => k.toLowerCase());
	const signedHeaders = signedHeaderKeys.join(';');
	const canonicalHeaders = signedHeaderKeys
		.map(k => `${k}:${headers[Object.keys(headers).find(h => h.toLowerCase() === k)!].trim()}`)
		.join('\n') + '\n';

	const payloadHash = await sha256Hex(input.body);
	const canonicalRequest = [
		input.method,
		url.pathname,
		url.searchParams.toString(),
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

	headers['authorization'] = `AWS4-HMAC-SHA256 Credential=${input.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

	return { url: input.url, headers, body: input.body };
}
