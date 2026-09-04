import { test, expect } from '@playwright/test';

const NAV = [
  ['Case studies', '/en/case-studies/'],
  ['Leadership', '/en/leadership/'],
  ['Consulting', '/en/consulting/'],
  ['About', '/en/about/'],
  ['Contact', '/en/contact/'],
] as const;

test('primary navigation lists the five destinations (CS-1)', async ({
  page,
}) => {
  await page.goto('/en/');
  for (const [label, href] of NAV) {
    await expect(
      page.locator(`nav a[href="${href}"]`).first(),
      label,
    ).toHaveCount(1);
  }
  const html = await page.content();
  expect(html).not.toContain('/en/projects/');
});

test('the link set is visible at 768, not behind a hamburger (RE-9)', async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto('/en/');
  await expect(page.locator('.desktop-nav')).toBeVisible();
  await expect(page.locator('.mobile-menu-button')).toBeHidden();
  for (const [, href] of NAV) {
    await expect(page.locator(`.desktop-nav a[href="${href}"]`)).toBeVisible();
  }
  // ...and it still collapses on a phone.
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.mobile-menu-button')).toBeVisible();
  await expect(page.locator('.desktop-nav')).toBeHidden();
});

test('the nav does not overflow its bar at 768 or 1024', async ({ page }) => {
  for (const width of [768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en/');
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow, `${width}px`).toBeLessThanOrEqual(1);
  }
});

test('footer is three columns with one attribution line (CS-5, D21)', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/en/');
  await expect(page.locator('.footer-group')).toHaveCount(3);
  const work = page.locator('.footer-group--work');
  await expect(work.locator('a[href="/en/turnaround/"]')).toHaveCount(1);
  await expect(work.locator('a[href="/en/builder/"]')).toHaveCount(1);
  await expect(page.locator('footer a[href="/en/case-studies/"]')).toHaveCount(
    1,
  );
  await expect(page.locator('footer a[href="/en/leadership/"]')).toHaveCount(1);
  await expect(page.locator('.footer-attribution')).toHaveCount(1);
  await expect(page.locator('.footer-cta')).toHaveCount(0);
  const tops = await page
    .locator('.footer-group')
    .evaluateAll(els =>
      els.map(el => Math.round(el.getBoundingClientRect().top)),
    );
  expect(new Set(tops).size, 'three columns on one row').toBe(1);
});

test('every secondary CTA that points at the index resolves (CS-2)', async ({
  page,
  request,
}) => {
  for (const path of ['/en/', '/en/leadership/']) {
    await page.goto(path);
    const hrefs = await page
      .locator('a[href="/en/case-studies/"]')
      .evaluateAll(els => els.map(el => (el as HTMLAnchorElement).href));
    expect(hrefs.length, path).toBeGreaterThan(0);
  }
  expect((await request.get('/en/case-studies/')).status()).toBeLessThan(400);
});

test('the hero is a static rule field, not an animated aurora (AI-5, GR-5)', async ({
  page,
}) => {
  await page.goto('/en/');
  await expect(page.locator('.aurora')).toHaveCount(0);
  await expect(page.locator('.hero__rules')).toHaveCount(1);
  // Scope this to the hero background: the page legitimately animates
  // elsewhere (scroll reveals, the working-loop diagram).
  const animated = await page.evaluate(() => {
    const field = document.querySelector('.hero__rules');
    if (!field) return -1;
    return document
      .getAnimations()
      .filter(a => a.playState === 'running')
      .filter(a => {
        const t = (a as unknown as { effect?: { target?: Element } }).effect
          ?.target;
        return !!t && (t === field || field.contains(t));
      }).length;
  });
  expect(animated, 'nothing animates in the hero background').toBe(0);
  await expect(page.locator('.hero__rules line')).toHaveCount(14);
  await expect(page.locator('.hero__rules rect')).toHaveCount(3);
});

test('llms.txt lists the current pages and no retired ones', async ({
  request,
}) => {
  const txt = await (await request.get('/llms.txt')).text();
  for (const url of [
    'https://janczura.com/en/',
    'https://janczura.com/en/leadership/',
    'https://janczura.com/en/case-studies/',
    'https://janczura.com/en/consulting/',
    'https://janczura.com/en/turnaround/',
    'https://janczura.com/en/builder/',
    'https://janczura.com/en/about/',
    'https://janczura.com/en/contact/',
  ]) {
    expect(txt, url).toContain(url);
  }
  expect(txt).not.toContain('/en/projects/');
});

test('only the theme guard is a render-blocking inline script (MO-1)', async ({
  request,
}) => {
  const html = await (await request.get('/en/contact/')).text();
  // "Render-blocking inline" = a classic <script> with no `src` and no
  // `type="module"`. Module scripts are deferred by the HTML spec (they
  // never block parsing and run after the DOM is built), and Astro also
  // minifies/dead-code-eliminates them — so a bundled `<script>` counts
  // toward the budget only if it lost its `type="module"`, not merely
  // because Astro chose to inline its (small, import-free) bundle into the
  // page instead of extracting a separate _assets/*.js file. Astro does
  // extract a separate file once a bundled script is large enough to be
  // worth a second request (verified against the Tools pages' ~12 KB
  // minified scripts, which do get their own _assets/*.js); the scroll
  // reveal / service worker / nav scripts here are all well under that, so
  // Astro inlines their deferred, minified output — which is the desired
  // outcome, not a loophole.
  const scripts = [
    ...html.matchAll(
      /<script((?:(?!<\/script>)[\s\S])*?)>([\s\S]*?)<\/script>/g,
    ),
  ];
  const inline = scripts
    .filter(m => !/\bsrc=/.test(m[1]) && !/type="module"/.test(m[1]))
    .map(m => m[2])
    .filter(s => !s.includes('"@context"')); // JSON-LD is data, not script
  expect(inline.length, 'one inline script: the theme-flash guard').toBe(1);
  expect(inline[0]).toContain('localStorage');
  expect(Buffer.byteLength(inline.join(''), 'utf8')).toBeLessThan(1024);
});
