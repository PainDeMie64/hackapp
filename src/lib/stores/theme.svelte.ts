import { browser } from '$app/environment';

function createTheme() {
	let dark = $state(false);

	if (browser) {
		dark = document.documentElement.classList.contains('dark');
	}

	return {
		get dark() {
			return dark;
		},
		toggle() {
			dark = !dark;
			if (browser) {
				document.documentElement.classList.toggle('dark', dark);
				localStorage.setItem('theme', dark ? 'dark' : 'light');
			}
		},
		set(value: boolean) {
			dark = value;
			if (browser) {
				document.documentElement.classList.toggle('dark', dark);
				localStorage.setItem('theme', dark ? 'dark' : 'light');
			}
		}
	};
}

export const theme = createTheme();
