import { test, expect } from '@playwright/test';
import { EN_PAGES } from './pages';

// Derived, never hard-coded: whatever case detail routes are on the branch.
const DETAILS = EN_PAGES.filter(
  p => p.startsWith('/en/case-studies/') && p !== '/en/case-studies/',
);

// The four cases that state a delivery shape in their body and therefore
// must carry `delivery` frontmatter and a pull quote.
const SHAPED = [
  '/en/case-studies/apg-pension-assistant/',
  '/en/case-studies/development-bank-genai-portfolio/',
  '/en/case-studies/automotive-procurement-ai/',
  '/en/case-studies/jaden-data-company-building/',
];

// The two clients the case studies still identify by industry rather than by
// name. Every other client is named with the client's agreement, so only
// these two are guarded here. The automotive client is scoped to case-study
// pages on purpose: it is named in general page copy elsewhere on the site,
// which is a different statement from attributing a specific project to it.
// Word boundaries keep hashed asset names out of the match.
const UNNAMED_CLIENTS: RegExp[] = [/\bbosch\b/, /\bkfw\b/];

const EVIDENCE = [
  'Measured',
  'Customer estimate',
  'Projected',
  'Qualitative',
  'Technical benchmark',
];

for (const path of DETAILS) {
  test(`case detail renders summary, facts and structured data: ${path}`, async ({
    page,
    request,
  }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.case-summary')).toHaveCount(1);
    await expect(page.locator('.case-facts')).toHaveCount(1);
    const html = await (await request.get(path)).text();
    expect(html).toContain('"@type":"CreativeWork"');
  });

  test(`headings: one h1, chapter h2s only, labels demoted to h3 (CS-3): ${path}`, async ({
    page,
  }) => {
    await page.goto(path);
    // CaseSummary and CaseFacts labels are no longer siblings of the essay's
    // chapters, so the h2 count is the essay's own chapters and nothing else.
    await expect(page.locator('.case-summary h2')).toHaveCount(0);
    await expect(page.locator('.case-facts h2')).toHaveCount(0);
    // Scoped to the case content itself: the site-wide CtaBand footer (every
    // page, not just this one) carries its own <h2> outside this section and
    // is not part of "the essay's own chapters".
    const proseH2 = await page.locator('.prose h2').count();
    const pageH2 = await page.locator('.case-body h2').count();
    expect(pageH2).toBe(proseH2);
    await expect(page.locator('.case-summary h3').first()).toHaveText(
      'Mandate',
    );
    await expect(page.locator('.case-summary')).not.toContainText(
      'Three decisions',
    );
  });

  test(`the evidence class is stated once, not shouted per badge (CS-7): ${path}`, async ({
    page,
  }) => {
    await page.goto(path);
    const heading = await page
      .locator('.case-summary__col--outcomes h3')
      .textContent();
    expect(heading || '').toMatch(/^Outcome/);
    const pills = await page
      .locator('.case-summary .outcome__evidence')
      .allTextContents();
    for (const p of pills) expect(EVIDENCE).toContain(p.trim());
    const badges = await page.locator('.case-summary .outcome').count();
    // At least one badge shares the dominant class and therefore drops its pill.
    expect(pills.length).toBeLessThan(badges);
  });

  test(`prose sits on its measure with a section index beside it (RE-6): ${path}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(path);
    const prose = await page.locator('.prose').boundingBox();
    const main = await page.locator('.case-main').boundingBox();
    expect(prose, path).not.toBeNull();
    expect(main, path).not.toBeNull();
    // No dead column: the prose fills the column it is given, +/- 24px.
    expect(Math.abs(main!.width - prose!.width)).toBeLessThan(24);
    const index = page.locator('.case-facts__index a');
    expect(await index.count()).toBeGreaterThanOrEqual(3);
  });

  test(`facts come before the essay below 1000px (RE-7): ${path}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1000 });
    await page.goto(path);
    const facts = await page.locator('.case-facts').boundingBox();
    const prose = await page.locator('.prose').boundingBox();
    expect(facts!.y).toBeLessThan(prose!.y);
  });
}

for (const path of SHAPED) {
  test(`the delivery shape is drawn, not only described (GR-3): ${path}`, async ({
    page,
  }) => {
    await page.goto(path);
    const timeline = page.locator('.delivery');
    await expect(timeline).toHaveCount(1);
    expect(
      await timeline.locator('.delivery__node').count(),
    ).toBeGreaterThanOrEqual(3);
    // It sits inside the essay, under its own chapter.
    await expect(page.locator('.prose .delivery')).toHaveCount(1);
  });

  test(`the strongest outcome sentence is pulled out (AI-8): ${path}`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.locator('.prose .case-pull')).toHaveCount(1);
  });

  test(`the delivery timeline renders finished under reduced motion: ${path}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path);
    // Both the horizontal and vertical rail live in the DOM at once (one
    // hidden by CSS per breakpoint), so scope to whichever renders first;
    // the reduced-motion rule applies identically to both.
    const offset = await page
      .locator('.delivery__progress')
      .first()
      .evaluate(el => getComputedStyle(el).strokeDashoffset);
    expect(parseFloat(offset)).toBe(0);
  });
}

test('the case-detail band is written for this page, not reused verbatim (CP-7)', async ({
  page,
}) => {
  await page.goto(SHAPED[0]);
  const band = page.locator('.cta-band');
  await expect(band.locator('h2')).toHaveText(
    'Want the same thing done in your environment?',
  );
  await expect(band).not.toContainText('Two ways to work with me');
});

test('grouped cards use fixed columns, not auto-fill (CS-10, RE-1)', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/en/case-studies/');
  const cols = await page
    .locator('.case-cards')
    .first()
    .evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
  expect(cols).toBe(3);
});

test.describe('case-studies index', () => {
  test('lists every case as a skim row with a resolving link', async ({
    page,
    request,
  }) => {
    await page.goto('/en/case-studies/');
    const rows = page.locator('.case-rows .case-row');
    expect(await rows.count()).toBeGreaterThanOrEqual(4);
    const hrefs = await page
      .locator('a.case-row__link[href]')
      .evaluateAll(els =>
        els.map(el => (el as HTMLAnchorElement).getAttribute('href')),
      );
    expect(hrefs.length).toBeGreaterThanOrEqual(4);
    for (const href of hrefs) {
      const res = await request.get(href || '');
      expect(res.status(), `${href}`).toBeLessThan(400);
    }
  });

  test('every case row is a real <li> inside the <ol> (list semantics for assistive tech)', async ({
    page,
  }) => {
    await page.goto('/en/case-studies/');
    const listItemCount = await page
      .locator('ol.case-rows > li.case-row')
      .count();
    const rowCount = await page.locator('.case-rows .case-row').count();
    expect(listItemCount).toBe(rowCount);
    expect(listItemCount).toBeGreaterThanOrEqual(4);
  });

  test('grouped cards count matches the number of rows with a detail link', async ({
    page,
  }) => {
    await page.goto('/en/case-studies/');
    const hrefCount = await page.locator('a.case-row__link[href]').count();
    const cardCount = await page.locator('.case-cards .case-card').count();
    expect(cardCount).toBe(hrefCount);
  });

  test('skim-only rows are not links and drop the status badge', async ({
    page,
  }) => {
    await page.goto('/en/case-studies/');
    const rows = page.locator('.case-rows .case-row');
    expect(await rows.count()).toBeGreaterThanOrEqual(15);

    // A case without `hasDetail` renders no anchor: the row is neither an
    // <a> itself nor a wrapper around one.
    const notLinked = await rows.evaluateAll(
      els =>
        els.filter(el => el.tagName !== 'A' && !el.querySelector('a')).length,
    );
    expect(notLinked).toBeGreaterThanOrEqual(4);

    // A case without a `status` in its frontmatter shows only the
    // relationship pill. Every skim-only row is in that state.
    const withoutStatusBadge = await rows.evaluateAll(
      els =>
        els
          .filter(el => el.tagName !== 'A' && !el.querySelector('a'))
          .filter(el => el.querySelectorAll('.case-row__pill').length === 1)
          .length,
    );
    expect(withoutStatusBadge).toBe(notLinked);
  });

  test('filter chips narrow the skim list to the selected category', async ({
    page,
  }) => {
    await page.goto('/en/case-studies/');
    const chips = page.locator('.filter-chips button[data-filter]');
    await expect(chips).toHaveCount(5);
    await page.getByRole('button', { name: 'Company building' }).click();
    const visibleRows = page.locator('.case-rows .case-row:not([hidden])');
    await expect(visibleRows).toHaveCount(1);
  });
});

test('case-study pages identify clients by industry, not by name', async ({
  page,
}) => {
  test.slow();
  for (const path of ['/en/case-studies/', ...DETAILS]) {
    await page.goto(path);
    const visible = await page.locator('body').innerText();
    const meta =
      (await page
        .locator('meta[name="description"]')
        .getAttribute('content')) ?? '';
    // The page's own CreativeWork schema carries client, title, summary and
    // tags. The site-wide Person schema is general positioning about who
    // Jacek has worked for, which is a different statement from attributing
    // a named project, and is deliberately not part of this check.
    const ld = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const caseLd = ld
      .flatMap(text => {
        let parsed: unknown;
        try {
          parsed = JSON.parse(text);
        } catch {
          return [];
        }
        const graph = (parsed as { '@graph'?: unknown })['@graph'];
        const nodes = Array.isArray(graph) ? graph : [parsed];
        return (nodes as Record<string, unknown>[]).filter(
          n => n['@type'] === 'CreativeWork',
        );
      })
      .map(node => JSON.stringify(node))
      .join(' ');
    const haystack = [visible, meta, caseLd]
      .join('\n')
      .toLowerCase()
      // Route slugs are URLs, not prose; the policy is about the words a
      // reader sees, so collapse case-study paths before matching.
      .replace(/\/case-studies\/[a-z0-9-]+\/?/g, '/case-studies/');
    for (const re of UNNAMED_CLIENTS) {
      expect(haystack, `${path} matches ${re}`).not.toMatch(re);
    }
  }
});

// Case-study slugs were renamed so no URL names a client the case itself
// describes by industry. This section of the site had never been published
// when they were renamed, so the old addresses must not exist at all — a
// live redirect would keep publishing the name in the path.
const CLIENT_NAMING_SLUGS = [
  '/en/case-studies/bosch-procurement-ai/',
  '/en/case-studies/kfw-genai-portfolio/',
  '/en/case-studies/rp-matcher/',
];

const RENAMED_CASE_ROUTES = [
  '/en/case-studies/automotive-procurement-ai/',
  '/en/case-studies/development-bank-genai-portfolio/',
  '/en/case-studies/product-matching-ml/',
];

test('no URL names a client in its path', async ({ request }) => {
  const xml = await (await request.get('/sitemap-0.xml')).text();
  for (const path of CLIENT_NAMING_SLUGS) {
    expect((await request.get(path)).status(), path).toBe(404);
    expect(xml, path).not.toContain(path);
  }
});

test('the sitemap lists the renamed case routes', async ({ request }) => {
  const xml = await (await request.get('/sitemap-0.xml')).text();
  for (const path of RENAMED_CASE_ROUTES) {
    expect(xml, path).toContain(path);
  }
});

test('the retired /en/projects/ URL redirects to the case-studies index', async ({
  request,
}) => {
  const res = await request.get('/en/projects/');
  const html = await res.text();
  expect(html).toContain('url=/en/case-studies/');
});
