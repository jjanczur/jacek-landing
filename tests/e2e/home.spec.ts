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
    await expect(groups.locator('.logo-wall__legal')).toHaveCount(0);
    await expect(page.locator('.footer-attribution')).toHaveCount(1);
  });

  test('pillar grid lists four ownership areas with proof', async ({
    page,
  }) => {
    await page.goto('/en/');
    const pillars = page.locator('.pillar');
    await expect(pillars).toHaveCount(4);
    await expect(pillars.first()).toContainText('Customer & commercial');
    await expect(pillars.first().locator('.pillar__proof')).toContainText(
      'Bosch Global Services',
    );
    await expect(page.locator('.pillars h2')).toHaveText(
      /From customer boardroom to production code/,
    );
  });

  // enabled when the case-study routes merge (Task 4/5)
  test.fixme(
    'pillar proof links resolve to their case studies',
    async ({ page, request }) => {
      await page.goto('/en/');
      const hrefs = await page
        .locator('.pillar__link')
        .evaluateAll(els =>
          els.map(el => (el as HTMLAnchorElement).getAttribute('href')),
        );
      expect(hrefs).toHaveLength(4);
      for (const href of hrefs) {
        const res = await request.get(href || '');
        expect(res.status(), `${href}`).toBeLessThan(400);
      }
    },
  );

  test('method section lists four steps of the working loop', async ({
    page,
  }) => {
    await page.goto('/en/');
    const steps = page.locator('.step');
    await expect(steps).toHaveCount(4);
    await expect(steps.first()).toContainText('Find the workflow that matters');
  });

  test('door pair links to the hiring and building audiences', async ({
    page,
  }) => {
    await page.goto('/en/');
    const doors = page.locator('.door');
    await expect(doors).toHaveCount(2);
    await expect(doors.nth(0)).toHaveAttribute('href', '/en/about/');
    await expect(doors.nth(1)).toHaveAttribute('href', '/en/consulting/');
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
