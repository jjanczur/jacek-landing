import { test, expect } from '@playwright/test';
import { EN_PAGES } from './pages';

test('every internal link on English pages resolves', async ({
  page,
  request,
}) => {
  const seen = new Set<string>();
  for (const path of EN_PAGES) {
    await page.goto(path);
    const hrefs = await page.$$eval('a[href^="/"]', as =>
      as.map(a => (a as HTMLAnchorElement).getAttribute('href') || ''),
    );
    for (const href of hrefs) {
      const clean = href.split('#')[0];
      if (!clean || seen.has(clean)) continue;
      seen.add(clean);
      const res = await request.get(clean);
      expect(res.status(), `${clean} (linked from ${path})`).toBeLessThan(400);
    }
  }
});
