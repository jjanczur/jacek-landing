import { test, expect } from '@playwright/test';

test.describe('consulting hub', () => {
  test('hero states the engagement model and both CTAs', async ({ page }) => {
    await page.goto('/en/consulting/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('end date');
    await expect(page.locator('.hero a.btn--primary')).toHaveAttribute(
      'href',
      '/en/contact/#project',
    );
  });

  test('two angle doors link to turnaround and builder', async ({ page }) => {
    await page.goto('/en/consulting/');
    const doors = page.locator('.door');
    await expect(doors).toHaveCount(2);
    await expect(doors.nth(0)).toHaveAttribute('href', '/en/turnaround/');
    await expect(doors.nth(1)).toHaveAttribute('href', '/en/builder/');
  });

  test('four offers, including engineering enablement', async ({ page }) => {
    await page.goto('/en/consulting/');
    const offers = page.locator('.pillar');
    await expect(offers).toHaveCount(4);
    await expect(offers.nth(0)).toContainText('Architecture & risk review');
    await expect(offers.nth(1)).toContainText('Interim CTO / AI lead');
    await expect(offers.nth(2)).toContainText('Production AI thin slice');
    await expect(offers.nth(3)).toContainText(
      'AI transformation & engineering enablement',
    );
  });

  test('good fit and not a fit are both listed', async ({ page }) => {
    await page.goto('/en/consulting/');
    expect(await page.locator('.fit--good li').count()).toBeGreaterThanOrEqual(
      4,
    );
    expect(await page.locator('.fit--not li').count()).toBeGreaterThanOrEqual(
      4,
    );
  });

  test('how engagements run, and the project brief CTA', async ({ page }) => {
    await page.goto('/en/consulting/');
    await expect(page.locator('.cta-band .availability')).toContainText(
      'Remote-first, on-site when it matters; NDA on request',
    );
    await expect(page.locator('.cta-band a.btn--primary')).toHaveAttribute(
      'href',
      '/en/contact/#project',
    );
  });

  test('no rates, contracting entity or availability figures', async ({
    request,
  }) => {
    const html = (
      await (await request.get('/en/consulting/')).text()
    ).toLowerCase();
    for (const s of [
      'day rate',
      'per hour',
      'hourly rate',
      'retainer fee',
      'invoice',
      'days per week',
      'gmbh',
    ]) {
      expect(html, `contains "${s}"`).not.toContain(s);
    }
  });
});
