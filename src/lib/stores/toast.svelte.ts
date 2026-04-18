type ToastType = 'info' | 'success' | 'warning' | 'error';

interface Toast {
	id: string;
	message: string;
	type: ToastType;
	duration: number;
}

function createToaster() {
	let toasts = $state<Toast[]>([]);

	function add(message: string, type: ToastType = 'info', duration = 4000) {
		const id = crypto.randomUUID();
		toasts.push({ id, message, type, duration });
		if (duration > 0) {
			setTimeout(() => remove(id), duration);
		}
		return id;
	}

	function remove(id: string) {
		toasts = toasts.filter((t) => t.id !== id);
	}

	return {
		get items() {
			return toasts;
		},
		info: (msg: string, duration?: number) => add(msg, 'info', duration),
		success: (msg: string, duration?: number) => add(msg, 'success', duration),
		warning: (msg: string, duration?: number) => add(msg, 'warning', duration),
		error: (msg: string, duration?: number) => add(msg, 'error', duration),
		remove
	};
}

export const toast = createToaster();
