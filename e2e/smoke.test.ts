import { test, expect } from '@playwright/test';

test.describe('Home', () => {
    test('loads and shows trip title', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/giappon|budapest|trip/i);
        // Hero section must be visible
        await expect(page.locator('main')).toBeVisible();
    });

    test('navigation links are present', async ({ page }) => {
        await page.goto('/');
        const nav = page.locator('nav');
        await expect(nav).toBeVisible();
    });
});

test.describe('Itinerary', () => {
    test('itinerary page loads and lists days', async ({ page }) => {
        await page.goto('/itinerary');
        await expect(page.locator('main')).toBeVisible();
        // At least one day card should render
        await expect(page.locator('main a, main [role="link"], main article').first()).toBeVisible();
    });
});

test.describe('Budget', () => {
    test('budget page renders without crashing', async ({ page }) => {
        await page.goto('/budget');
        await expect(page.locator('main')).toBeVisible();
    });
});

test.describe('Globe hero', () => {
    test('resolves past the loading shell within 10s (globe or static fallback)', async ({ page }) => {
        await page.goto('/');
        // HeroShell (the loading placeholder) has no heading; both GlobeHero
        // and StaticGlobeFallback render the trip title, so this proves we
        // moved past the loading state either way.
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10_000 });
    });

    test('trip pills are visible and reachable', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('button', { name: /giappone/i })).toBeVisible();
        await expect(page.getByRole('button', { name: /budapest/i })).toBeVisible();
    });

    test('selecting the active trip opens a card with an internal CTA', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: /giappone/i }).click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await expect(dialog.getByText('Apri il viaggio')).toBeVisible();
        await expect(dialog.getByRole('link', { name: /apri il viaggio/i })).toHaveAttribute('href', '/itinerary');
    });

    test('selecting the other trip opens a card with an external CTA', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: /budapest/i }).click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        const cta = dialog.getByRole('link', { name: /apri il viaggio/i });
        await expect(cta).toHaveAttribute('href', /^https:\/\//);
    });
});

test.describe('Admin login', () => {
    test('lock icon triggers login modal', async ({ page }) => {
        await page.goto('/');
        const lockBtn = page.locator('button[title="Admin Login"]');
        await expect(lockBtn).toBeVisible();
        await lockBtn.click();
        // Login modal should appear
        await expect(page.getByPlaceholder('Password Admin')).toBeVisible();
    });

    test('wrong password shows error message', async ({ page }) => {
        await page.goto('/');
        await page.locator('button[title="Admin Login"]').click();
        await page.getByPlaceholder('Password Admin').fill('wrong');
        await page.getByRole('button', { name: 'Accedi' }).click();
        await expect(page.getByText('Password errata')).toBeVisible();
    });
});
