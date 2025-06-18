import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:1313/');
});

test('main page has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/cogitovirus.com/);
});

test('main page has navigation', async ({ page }) => {
  await page.locator('#nav').isVisible();
});
