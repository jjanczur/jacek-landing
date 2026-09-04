import { test, expect } from '@playwright/test';
import { execSync } from 'node:child_process';

type RGB = [number, number, number];

function srgbChannel(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminance([r, g, b]: RGB): number {
  return (
    0.2126 * srgbChannel(r) + 0.7152 * srgbChannel(g) + 0.0722 * srgbChannel(b)
  );
}

function contrast(a: RGB, b: RGB): number {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

// Computed colours can serialise as oklch(); paint them into a 1x1 canvas so
// the browser gives us sRGB bytes regardless of the authored colour space.
const TO_RGB = `
  (value) => {
    const c = document.createElement('canvas');
    c.width = 1; c.height = 1;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  }
`;

for (const theme of ['light', 'dark'] as const) {
  test(`primary button label meets WCAG AA in ${theme}`, async ({ page }) => {
    await page.goto('/en/');
    await page.evaluate(t => {
      document.documentElement.dataset.theme = t;
    }, theme);
    const [fg, bg] = await page
      .locator('a.btn--primary')
      .first()
      .evaluate((el, toRgbSrc) => {
        const toRgb = eval(toRgbSrc) as (v: string) => [number, number, number];
        const s = getComputedStyle(el);
        return [toRgb(s.color), toRgb(s.backgroundColor)];
      }, TO_RGB);
    const ratio = contrast(fg as RGB, bg as RGB);
    expect(ratio, `${theme} primary CTA label contrast`).toBeGreaterThanOrEqual(
      4.5,
    );
  });
}

test('buttons use the engineered radius, not a pill', async ({ page }) => {
  await page.goto('/en/');
  const radius = await page
    .locator('a.btn')
    .first()
    .evaluate(el => getComputedStyle(el).borderTopLeftRadius);
  expect(radius).toBe('6px');
});

test('the availability dot is a fact, not an event', async ({ page }) => {
  await page.goto('/en/');
  const dot = page.locator('.availability__dot').first();
  await expect(dot).toHaveCount(1);
  const anim = await dot.evaluate(el => getComputedStyle(el).animationName);
  expect(anim).toBe('none');
  const size = await dot.evaluate(el => getComputedStyle(el).width);
  expect(size).toBe('6px');
});

test('rhythm, surface and motion tokens all resolve', async ({ page }) => {
  await page.goto('/en/');
  const entries = await page.evaluate(() => {
    const s = getComputedStyle(document.documentElement);
    const names = [
      '--section-y-tight',
      '--section-y',
      '--section-y-loose',
      '--surface-1',
      '--surface-2',
      '--surface-raised',
      '--shadow-raised',
      '--btn-primary-bg',
      '--btn-primary-fg',
      '--reveal-dur',
      '--reveal-distance',
      '--stagger',
    ];
    return names.map(
      n => [n, s.getPropertyValue(n).trim()] as [string, string],
    );
  });
  for (const [name, value] of entries) {
    expect(value, `${name} is undefined`).not.toBe('');
  }
});

test('surface utility classes are defined and visually distinct', async ({
  page,
}) => {
  await page.goto('/en/');
  const result = await page.evaluate(() => {
    const mk = (cls: string) => {
      const el = document.createElement('div');
      el.className = cls;
      document.body.appendChild(el);
      const s = getComputedStyle(el);
      const out = {
        background: s.backgroundColor,
        borderLeft: s.borderLeftWidth,
        borderTop: s.borderTopWidth,
        radius: s.borderTopLeftRadius,
      };
      el.remove();
      return out;
    };
    return {
      body: getComputedStyle(document.body).backgroundColor,
      panel: mk('surface-panel'),
      ruled: mk('surface-ruled'),
      accent: mk('surface-accent'),
      raised: mk('surface-raised'),
    };
  });
  expect(
    result.panel.background,
    'tinted panel must differ from the page',
  ).not.toBe(result.body);
  expect(result.panel.borderTop).toBe('0px');
  expect(result.ruled.borderTop).toBe('1px');
  expect(result.accent.borderLeft).toBe('3px');
  expect(result.raised.radius).toBe('14px');
});

test('reveal timing is retuned and reduced motion still wins', async ({
  page,
}) => {
  await page.goto('/en/');
  const dur = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue('--reveal-dur')
      .trim(),
  );
  expect(dur).toBe('460ms');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/');
  const hidden = await page.evaluate(
    () =>
      Array.from(document.querySelectorAll('.reveal')).filter(
        el => parseFloat(getComputedStyle(el).opacity) < 0.99,
      ).length,
  );
  expect(hidden).toBe(0);
});

// D20 (CS-8): company-named logo source files must never enter git history.
test('company-named logo source files are untracked and ignored', () => {
  const tracked = execSync('git ls-files src/assets/images/logos', {
    encoding: 'utf8',
  }).trim();
  expect(tracked, 'logo source files must never be tracked').toBe('');
  const ignored = execSync(
    'git check-ignore -q src/assets/images/logos/ && echo IGNORED || echo MISSING',
    { encoding: 'utf8' },
  ).trim();
  expect(ignored, '.gitignore must cover src/assets/images/logos/').toBe(
    'IGNORED',
  );
});
