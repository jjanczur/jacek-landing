import { test, expect } from '@playwright/test';
import { EN_PAGES } from './pages';

for (const path of EN_PAGES) {
  test(`page metadata: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    expect((await page.title()).trim().length).toBeGreaterThan(10);
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect((description ?? '').trim().length).toBeGreaterThan(40);
    const og = await page
      .locator('meta[property="og:image"]')
      .getAttribute('content');
    expect(og ?? '').toMatch(/^https:\/\/janczura\.com\//);
  });
}
