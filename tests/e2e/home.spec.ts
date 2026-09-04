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

  test('closing band states the two decisions concretely', async ({ page }) => {
    await page.goto('/en/');
    const band = page.locator('.cta-band');
    await expect(band.locator('h2')).toHaveText('Hiring, or building?');
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

  test('the wall is rectangular at every breakpoint (RE-1, RE-2)', async ({
    page,
  }) => {
    await page.goto('/en/');
    for (const [width, columns] of [
      [390, 2],
      [768, 3],
      [1440, 4],
    ] as const) {
      await page.setViewportSize({ width, height: 900 });
      const cols = await page
        .locator('.logo-wall__grid')
        .first()
        .evaluate(
          el => getComputedStyle(el).gridTemplateColumns.split(' ').length,
        );
      expect(cols, `${width}px`).toBe(columns);
    }
  });

  test('every logo carries a normalising scale (GR-6)', async ({ page }) => {
    await page.goto('/en/');
    const heights = await page
      .locator('.chip-logo')
      .evaluateAll(els =>
        els.map(el => Math.round(el.getBoundingClientRect().height)),
      );
    expect(heights.length).toBe(12);
    // Ink-normalised, not bounding-box normalised: rendered heights must vary.
    expect(new Set(heights).size).toBeGreaterThan(1);
    for (const h of heights) {
      expect(h).toBeGreaterThanOrEqual(30);
      expect(h).toBeLessThanOrEqual(60);
    }
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
    await expect(pillars.nth(3)).toContainText('Reuse & product feedback');
    await expect(page.locator('.pillars h2')).toHaveText(
      /From customer boardroom to production code/,
    );
  });

  test('pillar 01 is the lead card and the rest are narrow (AI-7)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/en/');
    const widths = await page
      .locator('.pillar')
      .evaluateAll(els => els.map(el => el.getBoundingClientRect().width));
    expect(widths[0]).toBeGreaterThan(widths[1] * 1.6);
  });

  test('pillar proof links resolve to their case studies', async ({
    page,
    request,
  }) => {
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
  });

  test('the working loop is drawn, not asserted (GR-1)', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('.loop')).toHaveCount(1);
    await expect(page.locator('.loop__svg--radial .loop__node')).toHaveCount(4);
    await expect(page.locator('.loop__svg--radial .loop__arc')).toHaveCount(4);
    await expect(
      page.locator('.loop__svg--radial .loop__arc--return'),
    ).toHaveCount(1);
    const steps = page.locator('.loop__steps li');
    await expect(steps).toHaveCount(4);
    await expect(steps.first()).toContainText('Find the workflow that matters');
    await expect(page.locator('.step-list')).toHaveCount(0);
  });

  test('the loop renders finished under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/');
    const offsets = await page
      .locator('.loop__svg--radial .loop__arc')
      .evaluateAll(els => els.map(el => getComputedStyle(el).strokeDashoffset));
    for (const o of offsets) expect(parseFloat(o)).toBe(0);
    await expect(page.locator('.loop__pulse')).toBeHidden();
  });

  test('door pair links to the leadership and consulting audiences', async ({
    page,
  }) => {
    await page.goto('/en/');
    const doors = page.locator('.door');
    await expect(doors).toHaveCount(2);
    await expect(doors.nth(0)).toHaveAttribute('href', '/en/leadership/');
    await expect(doors.nth(1)).toHaveAttribute('href', '/en/consulting/');
  });

  test('featured section lists four cases with resolving links', async ({
    page,
    request,
  }) => {
    await page.goto('/en/');
    const rows = page.locator('.featured .case-rows .case-row');
    await expect(rows).toHaveCount(4);
    const hrefs = await page
      .locator('.featured a.case-row__link[href]')
      .evaluateAll(els =>
        els.map(el => (el as HTMLAnchorElement).getAttribute('href')),
      );
    expect(hrefs).toHaveLength(4);
    for (const href of hrefs) {
      const res = await request.get(href || '');
      expect(res.status(), `${href}`).toBeLessThan(400);
    }
    await expect(page.locator('.featured a.btn--ghost')).toHaveAttribute(
      'href',
      '/en/case-studies/',
    );
  });

  test('stat strip is five values in one type size on one baseline (RE-3, RE-4)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/en/');
    const values = page.locator('.stat-strip .stat__value');
    await expect(values).toHaveCount(5);
    const sizes = await values.evaluateAll(els =>
      els.map(el => getComputedStyle(el).fontSize),
    );
    expect(new Set(sizes).size, 'one value size for the whole row').toBe(1);
    const labelTops = await page
      .locator('.stat-strip .stat__label')
      .evaluateAll(els =>
        els.map(el => Math.round(el.getBoundingClientRect().top)),
      );
    expect(new Set(labelTops).size, 'labels share one baseline').toBe(1);
  });

  test('stat values and the footnote fact are in the static HTML', async ({
    request,
  }) => {
    const html = await (await request.get('/en/')).text();
    for (const v of ['€1M+', '>10<', '50+', '99.9%', '3 months', '1.4M']) {
      expect(html, v).toContain(v);
    }
    expect(html, 'the sixth number moved to a footnote').toContain(
      'stat-strip__footnote',
    );
  });

  test('home inline JS stays inside the 10 KB budget (MO-1)', async ({
    request,
  }) => {
    const html = await (await request.get('/en/')).text();
    const inline = [
      ...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g),
    ]
      .map(m => m[1])
      .join('');
    expect(Buffer.byteLength(inline, 'utf8')).toBeLessThan(10_240);
  });
});
