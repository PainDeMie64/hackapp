declare module 'pdf-parse' {
	export class PDFParse {
		constructor(opts: { data: Uint8Array });
		getText(): Promise<{ text: string; total: number }>;
	}
}
