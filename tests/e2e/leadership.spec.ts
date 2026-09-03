import { test, expect } from '@playwright/test';

const AVAILABILITY =
  'Available for full-time leadership roles · remote-first, on-site when it matters · Polish (native), English (fluent), German (conversational)';

test.describe('leadership', () => {
  test('hero, title tag and hiring CTA', async ({ page }) => {
    await page.goto('/en/leadership/');
    await expect(page).toHaveTitle(
      'Technology Leadership & Enterprise AI — Jacek Janczura',
    );
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('production code');
    await expect(page.locator('.hero a.btn--primary')).toHaveAttribute(
      'href',
      '/en/contact/#hiring',
    );
  });

  test('four ownership pillars each link to a case study', async ({
    page,
    request,
  }) => {
    await page.goto('/en/leadership/');
    await expect(page.locator('.pillar')).toHaveCount(4);
    const hrefs = await page.$$eval(
      '.pillar a[href^="/en/case-studies/"]',
      els => els.map(e => e.getAttribute('href') || ''),
    );
    expect(hrefs).toHaveLength(4);
    for (const href of hrefs) {
      expect((await request.get(href)).status(), href).toBeLessThan(400);
    }
  });

  test('timeline has at least four roles and links the employer reference', async ({
    page,
  }) => {
    await page.goto('/en/leadership/');
    expect(await page.locator('.timeline__row').count()).toBeGreaterThanOrEqual(
      4,
    );
    await expect(
      page.locator('a[href="/docs/EmployerReference-Jacek.pdf"]'),
    ).toHaveCount(1);
  });

  test('availability line is exact and appears once', async ({ page }) => {
    await page.goto('/en/leadership/');
    const pill = page.locator('.availability-line .availability');
    await expect(pill).toHaveCount(1);
    await expect(pill).toContainText(AVAILABILITY);
  });

  test('no role titles or claims the site does not make', async ({
    request,
  }) => {
    const html = (
      await (await request.get('/en/leadership/')).text()
    ).toLowerCase();
    for (const s of [
      'field cto',
      'site cto',
      'forward-deployed',
      'forward deployed',
      'certified ai provider',
      'sso i led',
      'led the six-country',
      'led the multi-country',
      'production ai for norges bank',
    ]) {
      expect(html, `contains "${s}"`).not.toContain(s);
    }
    expect(html).toContain('key contributor');
  });
});
