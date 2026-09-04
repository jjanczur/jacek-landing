import { test, expect } from '@playwright/test';

test.describe('builder', () => {
  test('the split hero keeps copy left and the live diagram right (CS-9)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/en/builder/');
    await expect(page.locator('h1')).toHaveCount(1);
    const copy = await page.locator('.hero__copy').boundingBox();
    const aside = await page.locator('.hero__aside').boundingBox();
    expect(copy!.x).toBeLessThan(aside!.x);
  });

  test('the reference system is a data-driven diagram component (GR-4)', async ({
    page,
  }) => {
    await page.goto('/en/builder/');
    await expect(page.locator('.arch-diagram')).toHaveCount(1);
    await expect(page.locator('.arch-diagram .arch__node')).toHaveCount(8);
    await expect(page.locator('.arch-diagram .arch__edge')).toHaveCount(8);
    await expect(page.locator('.arch-diagram__meter-caption')).toContainText(
      /illustrative throughput/i,
    );
  });

  test('the first-person numbered narrative survives, with no cards (CS-9)', async ({
    page,
  }) => {
    await page.goto('/en/builder/');
    const cols = page.locator('.detail__col');
    expect(await cols.count()).toBeGreaterThanOrEqual(3);
    const borders = await cols.evaluateAll(els =>
      els.map(el => getComputedStyle(el).borderTopWidth),
    );
    for (const b of borders) expect(b).toBe('0px');
    // Astro preserves a single leading whitespace text node ahead of the
    // first child here (the source has the number on its own line), so
    // trim before asserting the column opens on its number.
    const firstColText = await cols
      .first()
      .evaluate(el => (el.textContent || '').trim());
    expect(firstColText).toMatch(/^0?1/);
  });

  test('sections are separated by full-bleed hairlines (CS-9)', async ({
    page,
  }) => {
    await page.goto('/en/builder/');
    expect(
      await page.locator('main .section--divided').count(),
    ).toBeGreaterThanOrEqual(2);
  });

  test('the hiring door points at the leadership page', async ({ page }) => {
    await page.goto('/en/builder/');
    await expect(page.locator('.door').first()).toHaveAttribute(
      'href',
      '/en/leadership/',
    );
  });

  test('the diagram renders finished under reduced motion', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/builder/');
    const offsets = await page
      .locator('.arch__edge')
      .evaluateAll(els => els.map(el => getComputedStyle(el).strokeDashoffset));
    for (const o of offsets) expect(parseFloat(o) || 0).toBe(0);
    await expect(page.locator('.arch__pulse')).toHaveCount(0);
  });

  test('the throughput figure is labelled illustrative and is final in the HTML', async ({
    request,
  }) => {
    const html = await (await request.get('/en/builder/')).text();
    expect(html).toContain('~3,200 req/sec');
    expect(html.toLowerCase()).toContain('illustrative throughput');
    expect(html).not.toMatch(/~0 req\/sec/);
  });

  test('builder inline JS stays inside the 10 KB budget (MO-1)', async ({
    request,
  }) => {
    const html = await (await request.get('/en/builder/')).text();
    // JSON-LD is structured data, not JavaScript: it is never parsed or
    // executed as script, so it does not belong in a script-weight budget.
    const inline = [
      ...html.matchAll(/<script((?![^>]*\bsrc=)[^>]*)>([\s\S]*?)<\/script>/g),
    ]
      .filter(m => !/type=["']application\/ld\+json["']/.test(m[1]))
      .map(m => m[2])
      .join('');
    expect(Buffer.byteLength(inline, 'utf8')).toBeLessThan(10_240);
  });
});
