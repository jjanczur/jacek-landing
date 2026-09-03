import { test, expect } from '@playwright/test';

const PAGES = ['/en/', '/en/turnaround/', '/en/builder/'];
const REVEALABLE = '.reveal, .chip-cell, .mstone';

type Page = import('@playwright/test').Page;

// The scroll-reveal IntersectionObserver in BaseLayout.astro uses
// `rootMargin: '0px 0px -8% 0px'`, so an element only counts as
// "above the fold" for the purposes of an eager, no-scroll reveal once it
// sits within the top 92% of the viewport — mirror that here so the check
// matches what the observer actually does, instead of the full 100vh.
const ABOVE_FOLD_MARGIN = 0.92;

/** Count revealable elements that are still (partly) transparent. */
async function hiddenCount(
  page: Page,
  selector: string,
  onlyAboveFold: boolean,
) {
  return page.evaluate(
    ({ selector, onlyAboveFold, aboveFoldMargin }) => {
      const vh = window.innerHeight * aboveFoldMargin;
      return Array.from(document.querySelectorAll(selector)).filter(el => {
        if (onlyAboveFold && el.getBoundingClientRect().top >= vh) return false;
        return parseFloat(getComputedStyle(el).opacity) < 0.99;
      }).length;
    },
    { selector, onlyAboveFold, aboveFoldMargin: ABOVE_FOLD_MARGIN },
  );
}

/** Scroll through the whole document in viewport-sized steps so every IntersectionObserver fires. */
async function scrollThrough(page: Page) {
  // Give the initial IntersectionObserver pass a moment to settle before the
  // first programmatic scroll, so above-the-fold content isn't skipped by a
  // race between page load and the first `scrollTo` call.
  await page.waitForTimeout(100);
  // 400px steps (see reveal.spec.ts brief note): 800px steps can jump past
  // elements near the top of the page before the observer has a chance to
  // mark them, and can jump past the turnaround roadmap's 0.35 threshold
  // without enough dwell time. Step count is derived from the step size
  // itself (not viewport height) so the loop still reaches the bottom.
  const step = 400;
  const scrollHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  const steps = Math.ceil(scrollHeight / step);
  for (let i = 1; i <= steps; i++) {
    await page.evaluate(y => window.scrollTo(0, y), i * step);
    await page.waitForTimeout(250);
  }
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  // The turnaround roadmap's own IntersectionObserver-triggered animation
  // (see turnaround.astro) runs for up to ~2.4s once its 0.35 threshold is
  // crossed, then each milestone card fades in over another 0.55s; on top
  // of the standard 700ms reveal fade, give all of that room to finish.
  await page.waitForTimeout(3000);
}

for (const path of PAGES) {
  test(`above-the-fold content is visible after load without scrolling: ${path}`, async ({
    page,
  }) => {
    await page.goto(path, { waitUntil: 'load' });
    // reveal transition is 700 ms; give it time plus margin
    await page.waitForTimeout(1200);
    expect(await hiddenCount(page, REVEALABLE, true)).toBe(0);
  });

  test(`all content is visible after scrolling through the page: ${path}`, async ({
    page,
  }) => {
    await page.goto(path, { waitUntil: 'load' });
    await scrollThrough(page);
    expect(await hiddenCount(page, REVEALABLE, false)).toBe(0);
  });

  test(`all content is visible in print media without scrolling: ${path}`, async ({
    page,
  }) => {
    await page.emulateMedia({ media: 'print' });
    await page.goto(path, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    expect(await hiddenCount(page, REVEALABLE, false)).toBe(0);
  });
}
