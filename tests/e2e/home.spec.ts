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

  test('logo wall has two attributed groups and captions without names', async ({
    page,
  }) => {
    await page.goto('/en/');
    const groups = page.locator('.logo-wall__group');
    await expect(groups).toHaveCount(2);
    await expect(groups.nth(0).locator('.chip-cell')).toHaveCount(8);
    await expect(groups.nth(1).locator('.chip-cell')).toHaveCount(4);
    await expect(groups.locator('.logo-wall__legal')).toHaveCount(2);
  });

  test('stat strip renders six final values in static HTML', async ({
    request,
  }) => {
    const html = await (await request.get('/en/')).text();
    for (const v of [
      '€1M+',
      '0 → 10',
      '50+',
      '99.9%',
      'ISO 27001 + SOC 2',
      '1.4M',
    ]) {
      expect(html, v).toContain(v);
    }
  });
});
