import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1440, height: 1200 } });

test('generate update screenshots', async ({ page }) => {
    // 1. Homepage
    await page.goto('http://localhost:4321/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.getElementById('preloader')?.remove());
    await page.waitForTimeout(1000); // Wait for animations

    // Full Homepage
    await page.screenshot({ path: 'screenshots/home_full_update.png', fullPage: true });

    // Focus on Awards Section
    const awardsSection = page.locator('.max-content.flex-col.md\\:flex-row'); // Targeting the updated awards section
    if (await awardsSection.isVisible()) {
        await awardsSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'screenshots/home_awards_update.png' });
    }

    // Focus on Process Gallery
    const processSection = page.locator('text=Atelier & Handwerk');
    if (await processSection.isVisible()) {
        await processSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'screenshots/home_process_gallery.png' });
    }

    // 2. Werkschau
    await page.goto('http://localhost:4321/werkschau');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.getElementById('preloader')?.remove());
    await page.waitForTimeout(1000);

    // Full Werkschau
    await page.screenshot({ path: 'screenshots/werkschau_full_update.png', fullPage: true });

    // Focus on new projects (e.g., scroll to bottom of project list)
    // Hard to target dynamic list specifically, but full page covers it.

    // Focus on Detail Gallery
    const detailSection = page.locator('text=Impressionen & Details');
    if (await detailSection.isVisible()) {
        await detailSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000); // Images need to load
        await page.screenshot({ path: 'screenshots/werkschau_details_gallery.png' });
    }
});
