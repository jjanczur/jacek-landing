import { test, expect } from '@playwright/test';

test.describe('turnaround', () => {
  test('hero keeps the interim-leadership positioning', async ({ page }) => {
    await page.goto('/en/turnaround/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText(
      'without freezing the roadmap',
    );
    await expect(page.locator('.hero .eyebrow')).toContainText('Interim CTO');
  });

  test('logo wall is one attributed group with no legal paragraph', async ({
    page,
  }) => {
    await page.goto('/en/turnaround/');
    await expect(page.locator('.logo-wall__group')).toHaveCount(1);
    await expect(page.locator('.logo-wall__legal')).toHaveCount(0);
    await expect(page.locator('.chip-cell')).toHaveCount(8);
  });

  test('stats render their final values in static HTML', async ({
    request,
  }) => {
    const html = await (await request.get('/en/turnaround/')).text();
    for (const v of [
      '€1M+',
      'ISO 27001 + SOC 2',
      '~3 months',
      '50+',
      '99.9%',
    ]) {
      expect(html, v).toContain(v);
    }
    for (const re of [/€0M\+/, /~0 mo/, />0\+</, />0%</]) {
      expect(html, `${re}`).not.toMatch(re);
    }
  });

  test('the 90-day roadmap still has four milestones', async ({ page }) => {
    await page.goto('/en/turnaround/');
    await expect(page.locator('[data-roadmap]')).toHaveCount(1);
    await expect(page.locator('[data-mstone]')).toHaveCount(4);
  });

  test('three proof blocks link into a case study', async ({
    page,
    request,
  }) => {
    await page.goto('/en/turnaround/');
    const blocks = page.locator('.proof-block');
    await expect(blocks).toHaveCount(3);
    const hrefs = await page.$$eval(
      '.proof-block a[href^="/en/case-studies/"]',
      els => els.map(e => e.getAttribute('href') || ''),
    );
    expect(hrefs).toHaveLength(3);
    for (const href of hrefs) {
      expect(
        (await request.get(href.split('#')[0])).status(),
        href,
      ).toBeLessThan(400);
    }
  });

  test('"what you get" lists four engagements', async ({ page }) => {
    await page.goto('/en/turnaround/');
    await expect(page.locator('.get__row')).toHaveCount(4);
    await expect(page.locator('.get__row').nth(0)).toContainText(
      'Architecture and risk review',
    );
    await expect(page.locator('.get__row').nth(3)).toContainText(
      'AI production readiness',
    );
  });

  test('closing band sends a project brief', async ({ page }) => {
    await page.goto('/en/turnaround/');
    await expect(page.locator('.cta-band a.btn--primary')).toHaveAttribute(
      'href',
      '/en/contact/#project',
    );
  });
});
