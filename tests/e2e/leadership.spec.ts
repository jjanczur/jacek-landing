import { test, expect } from '@playwright/test';

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

  test('availability is a short pill plus a plain line (RE-10)', async ({
    page,
  }) => {
    await page.goto('/en/leadership/');
    const pill = page.locator('.availability-line .availability');
    await expect(pill).toHaveCount(1);
    await expect(pill).toHaveText('Available for full-time leadership roles');
    await expect(page.locator('.availability-line__detail')).toContainText(
      'Polish (native), English (fluent), German (conversational)',
    );
    await page.setViewportSize({ width: 390, height: 900 });
    const lines = await pill.evaluate(el => {
      const s = getComputedStyle(el);
      return Math.round(
        el.getBoundingClientRect().height / parseFloat(s.lineHeight),
      );
    });
    expect(lines, 'the pill must not wrap to a paragraph').toBeLessThanOrEqual(
      2,
    );
  });

  test('"Built from zero" is a ruled list, so seven items has no orphan (RE-8)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/en/leadership/');
    const items = page.locator('#built-section .principle');
    await expect(items).toHaveCount(7);
    const lefts = await items.evaluateAll(els =>
      els.map(el => Math.round(el.getBoundingClientRect().left)),
    );
    expect(
      new Set(lefts).size,
      'one column: a ruled list, not a 2-col grid',
    ).toBe(1);
  });

  test('no two adjacent sections use the same surface role (AI-1)', async ({
    page,
  }) => {
    await page.goto('/en/leadership/');
    const roles = await page.evaluate(() =>
      Array.from(document.querySelectorAll('main [data-surface]')).map(
        el => (el as HTMLElement).dataset.surface,
      ),
    );
    expect(roles.length).toBeGreaterThanOrEqual(4);
    for (let i = 1; i < roles.length; i++) {
      expect(roles[i], `section ${i} repeats ${roles[i - 1]}`).not.toBe(
        roles[i - 1],
      );
    }
  });

  test('reuse is drawn, not only described (GR-2)', async ({ page }) => {
    await page.goto('/en/leadership/');
    await expect(page.locator('.f2p')).toHaveCount(1);
    expect(await page.locator('.f2p__node').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('.f2p__list li')).toHaveCount(7);
  });

  test('the fourth pillar is named in plain words (CP-1)', async ({ page }) => {
    await page.goto('/en/leadership/');
    await expect(page.locator('.pillar').nth(3)).toContainText(
      'Reuse & product feedback',
    );
    const html = (await page.content()).toLowerCase();
    for (const banned of [
      'leverage',
      'seamless',
      'cutting-edge',
      'unlock',
      'empower',
      'elevate',
      'state-of-the-art',
      'pioneered',
    ]) {
      expect(html, `contains "${banned}"`).not.toContain(banned);
    }
  });

  test('the closing band carries the standing condition (CP-7)', async ({
    page,
  }) => {
    await page.goto('/en/leadership/');
    await expect(page.locator('.cta-band .availability')).toContainText(
      'Available for full-time leadership roles · remote-first, on-site when it matters',
    );
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
