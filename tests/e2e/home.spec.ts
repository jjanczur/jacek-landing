import { test, expect } from '@playwright/test';

test.describe('home', () => {
  test('hero renders the founder-CTO positioning with both CTAs', async ({
    page,
  }) => {
    await page.goto('/en/');
    await expect(page.locator('h1')).toContainText('production AI');
    await expect(page.locator('.hero .eyebrow')).toHaveText(/Founder-CTO/);
    await expect(page.locator('.hero a.btn--primary')).toHaveAttribute(
      'href',
      '/en/contact/#hiring',
    );
    await expect(page.locator('.hero a.btn--ghost')).toHaveAttribute(
      'href',
      '/en/case-studies/',
    );
    await expect(page.locator('.hero .availability')).toContainText(
      'Open to CTO and Head of AI roles',
    );
  });

  test('closing band offers both doors', async ({ page }) => {
    await page.goto('/en/');
    const band = page.locator('.cta-band');
    await expect(band.locator('a.btn--primary')).toHaveAttribute(
      'href',
      '/en/contact/#hiring',
    );
    await expect(band.locator('a.btn--ghost')).toHaveAttribute(
      'href',
      '/en/contact/#project',
    );
  });
});
