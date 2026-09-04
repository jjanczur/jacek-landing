import { test, expect } from '@playwright/test';

test.describe('builder', () => {
  test('hero states the systems positioning and sends a brief', async ({
    page,
  }) => {
    await page.goto('/en/builder/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.hero .eyebrow')).toContainText(
      'Production AI systems · Enterprise AI architecture',
    );
    await expect(page.locator('.hero__sub')).toContainText(
      'Document-heavy workflows',
    );
    await expect(page.locator('.hero__sub')).toContainText(
      'Customer-facing assistants',
    );
    await expect(page.locator('.hero a.btn--primary')).toHaveAttribute(
      'href',
      '/en/contact/#project',
    );
  });

  test('the architecture diagram and its graph store survive', async ({
    page,
  }) => {
    await page.goto('/en/builder/');
    await expect(page.locator('#arch-svg')).toHaveCount(1);
    await expect(page.locator('#arch-svg')).toContainText('Graph DB');
    await expect(page.locator('#throughput')).toContainText('req/sec');
  });

  test('logo wall is one attributed group with no legal paragraph', async ({
    page,
  }) => {
    await page.goto('/en/builder/');
    await expect(page.locator('.logo-wall__group')).toHaveCount(1);
    await expect(page.locator('.logo-wall__legal')).toHaveCount(0);
    await expect(page.locator('.chip-cell')).toHaveCount(7);
  });

  test('stats render final values, never zeros', async ({ request }) => {
    const html = await (await request.get('/en/builder/')).text();
    for (const v of [
      '1,000+',
      'thousands',
      '99.9%',
      '50+',
      'ISO 27001 + SOC 2',
    ]) {
      expect(html, v).toContain(v);
    }
    for (const re of [/~0 req\/sec/, />0%</, />0\+</]) {
      expect(html, `${re}`).not.toMatch(re);
    }
  });

  test('evaluation section lists seven concerns', async ({ page }) => {
    await page.goto('/en/builder/');
    await expect(page.locator('.eval-item')).toHaveCount(7);
    await expect(page.locator('.eval-item').nth(0)).toContainText('Eval sets');
  });

  test('proof rows cover four engagements, three of them linked', async ({
    page,
    request,
  }) => {
    await page.goto('/en/builder/');
    await expect(page.locator('.case-row')).toHaveCount(4);
    const hrefs = await page.$$eval('a.case-row[href]', els =>
      els.map(e => e.getAttribute('href') || ''),
    );
    expect(hrefs).toHaveLength(3);
    for (const href of hrefs) {
      expect((await request.get(href)).status(), href).toBeLessThan(400);
    }
  });

  test('doors and closing band', async ({ page }) => {
    await page.goto('/en/builder/');
    await expect(page.locator('.door')).toHaveCount(2);
    await expect(page.locator('.door').nth(1)).toHaveAttribute(
      'href',
      '/en/turnaround/',
    );
    const band = page.locator('.cta-band');
    await expect(band.locator('a.btn--primary')).toHaveAttribute(
      'href',
      '/en/contact/#project',
    );
    await expect(band.locator('a.btn--ghost')).toHaveAttribute(
      'href',
      '/en/contact/#project',
    );
    await expect(band.locator('a.btn--ghost')).toContainText(
      'Request an architecture review',
    );
  });

  test('idealo wording stays "key contributor"', async ({ request }) => {
    const html = (
      await (await request.get('/en/builder/')).text()
    ).toLowerCase();
    expect(html).toContain('key contributor');
    for (const s of [
      'sso i led',
      'led the six-country',
      'multi-country sso i led',
    ]) {
      expect(html, `contains "${s}"`).not.toContain(s);
    }
  });
});
