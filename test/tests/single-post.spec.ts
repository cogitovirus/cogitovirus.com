import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:1313/');
  // click the first post   
  await page.click('//ul[@class="post-list"]/li[1]');
});

test('tag links work', async ({ page }) => {
    // click the first tag link
    await page.locator('//a[@class="tag-link"][1]').click();
    // expect tags page to be loaded
    await expect(page).toHaveURL(/\/tags\/.*/);
  });
  