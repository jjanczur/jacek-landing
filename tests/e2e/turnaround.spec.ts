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

  test('the roadmap is visible and animated on a phone (MO-6)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en/turnaround/');
    const rail = page.locator('.roadmap__cards');
    await expect(rail).toBeVisible();
    const railStyles = await rail.evaluate(el => {
      const before = getComputedStyle(el, '::before');
      const after = getComputedStyle(el, '::after');
      return {
        track: before.content,
        progress: after.content,
        pl: getComputedStyle(el).paddingLeft,
      };
    });
    expect(railStyles.track, 'the vertical track exists').not.toBe('none');
    expect(railStyles.progress, 'the vertical progress line exists').not.toBe(
      'none',
    );
    expect(
      parseFloat(railStyles.pl),
      'a left gutter for the rail',
    ).toBeGreaterThan(24);

    // The four milestones all light as the rail draws past them.
    await rail.scrollIntoViewIfNeeded();
    await page.waitForTimeout(3000);
    await expect(page.locator('.mstone.is-lit')).toHaveCount(4);
  });

  test('the roadmap is finished and static under reduced motion', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en/turnaround/');
    await page.locator('.roadmap__cards').scrollIntoViewIfNeeded();
    await expect(page.locator('.mstone.is-lit')).toHaveCount(4);
  });

  test('"what you get" stacks instead of scrolling sideways at 390 (RE-5)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en/turnaround/');
    const overflow = await page
      .locator('.get-scroll')
      .evaluate(el => el.scrollWidth - el.clientWidth);
    expect(overflow, 'no hidden third column').toBeLessThanOrEqual(1);
    // The third column's content is on screen, with its own label.
    const labels = await page
      .locator('.get td')
      .evaluateAll(els =>
        els.map(el =>
          getComputedStyle(el, '::before').content.replace(/^"|"$/g, ''),
        ),
      );
    expect(labels.filter(l => l.includes('How it ends')).length).toBe(4);
  });

  test('one eyebrow colour system (CO-6)', async ({ page }) => {
    await page.goto('/en/turnaround/');
    const sectionLabel = await page
      .locator('.plan__eyebrow')
      .evaluate(el => getComputedStyle(el).color);
    const evidenceLabel = await page
      .locator('.mstone__tag')
      .first()
      .evaluate(el => getComputedStyle(el).color);
    expect(sectionLabel, 'a section label is --primary').not.toBe(
      evidenceLabel,
    );
  });

  test('turnaround inline JS stays inside the 10 KB budget (MO-1)', async ({
    request,
  }) => {
    const html = await (await request.get('/en/turnaround/')).text();
    const inline = [
      ...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g),
    ]
      .map(m => m[1])
      .join('');
    expect(Buffer.byteLength(inline, 'utf8')).toBeLessThan(10_240);
  });
});
