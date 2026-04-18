import { test, expect } from '@playwright/test';

test('accueil page loads', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByText('Bonjour, Elias')).toBeVisible();

	const sidebar = page.locator('aside');
	await expect(sidebar.getByText('Accueil')).toBeVisible();
	await expect(sidebar.getByText('Recherche')).toBeVisible();
	await expect(sidebar.getByText('Historique')).toBeVisible();
	await expect(sidebar.getByText('Rapports')).toBeVisible();

	await expect(page.getByText('Derniere recherche')).toBeVisible();

	await expect(page.getByText('Actualites Recentes')).toBeVisible();
	await expect(page.getByText('Airbus annonce')).toBeVisible();

	await page.screenshot({ path: 'tests/screenshots/accueil.png', fullPage: true });
});

test('recherche page loads with tabs', async ({ page }) => {
	// Navigate via SPA to ensure Svelte 5 client-side rendering is active
	await page.goto('/');
	await page.locator('aside').getByText('Recherche').click();
	await expect(page).toHaveURL('/recherche');

	await expect(page.getByRole('heading', { name: 'Nouvelle Recherche' })).toBeVisible();

	const aiTab = page.getByRole('tab', { name: 'Assistant IA' });
	const formTab = page.getByRole('tab', { name: 'Formulaire' });
	await expect(aiTab).toBeVisible();
	await expect(formTab).toBeVisible();

	// Wait for hydration to complete before clicking
	await page.waitForTimeout(500);
	await formTab.click();

	// Wait for Svelte 5 to update the DOM
	await expect(formTab).toHaveAttribute('aria-selected', 'true', { timeout: 5000 });

	await expect(page.getByText('Zone geographique')).toBeVisible();
	await expect(page.getByText('Nombre de prospects')).toBeVisible();

	await expect(page.getByText('Carte')).toBeVisible();

	await page.screenshot({ path: 'tests/screenshots/recherche.png', fullPage: true });
});

test('resultats page loads with prospects', async ({ page }) => {
	await page.goto('/resultats');

	await expect(page.getByText('AIRBUS SAS')).toBeVisible();

	await expect(page.getByText('98')).toBeVisible();

	const prospectRows = page.locator('[class*="flex items-center gap-4 py-5 px-6"]');
	await expect(prospectRows).toHaveCount(9);

	await expect(page.getByText("Plus d'infos", { exact: false }).first()).toBeVisible();

	await page.screenshot({ path: 'tests/screenshots/resultats.png', fullPage: true });
});

test('historique page loads', async ({ page }) => {
	await page.goto('/historique');

	await expect(page.getByRole('heading', { name: 'Historique des Recherches' })).toBeVisible();

	const searchCards = page.getByText('Voir les resultats');
	await expect(searchCards).toHaveCount(6);

	await page.screenshot({ path: 'tests/screenshots/historique.png', fullPage: true });
});

test('rapports page loads', async ({ page }) => {
	await page.goto('/rapports');

	await expect(page.getByRole('heading', { name: 'Rapports', exact: true })).toBeVisible();

	await expect(page.getByRole('heading', { name: 'Avril 2026' })).toBeVisible();

	await expect(page.getByText('Nouveau', { exact: true })).toBeVisible();

	await expect(page.getByText('Actualites Clients Existants')).toBeVisible();

	await page.screenshot({ path: 'tests/screenshots/rapports.png', fullPage: true });
});

test('sidebar navigation works', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveURL('/');

	const sidebar = page.locator('aside');

	await sidebar.getByText('Recherche').click();
	await expect(page).toHaveURL('/recherche');

	await sidebar.getByText('Historique').click();
	await expect(page).toHaveURL('/historique');

	await sidebar.getByText('Rapports').click();
	await expect(page).toHaveURL('/rapports');

	await sidebar.getByText('Accueil').click();
	await expect(page).toHaveURL('/');
});
