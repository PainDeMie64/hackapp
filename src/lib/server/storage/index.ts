export function getStorage(platform: App.Platform | undefined): R2Bucket {
	const bucket = platform?.env?.STORAGE;
	if (!bucket) throw new Error('R2 bucket STORAGE is not available');
	return bucket;
}
