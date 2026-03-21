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
