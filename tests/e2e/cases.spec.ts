import { test, expect } from '@playwright/test';

const DETAILS = [
  'jaden-data-company-building',
  'kfw-genai-portfolio',
  'bosch-procurement-ai',
  'apg-pension-assistant',
  'entaingine-platform',
  'rp-matcher',
  'flowhive-vc',
  'taufolio',
  'idealo-and-ing-scale',
  'regulated-distributed-systems',
];
const EVIDENCE = [
  'Measured',
  'Customer estimate',
  'Projected',
  'Qualitative',
  'Technical benchmark',
];

for (const slug of DETAILS) {
  test(`case detail renders summary, facts and structured data: ${slug}`, async ({
    page,
    request,
  }) => {
    const path = `/en/case-studies/${slug}/`;
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    const summary = page.locator('.case-summary');
    await expect(summary).toHaveCount(1);
    await expect(summary.locator('.case-summary__decision')).toHaveCount(3);
    const evidence = await summary
      .locator('.outcome__evidence')
      .allTextContents();
    expect(evidence.length).toBeGreaterThan(0);
    for (const e of evidence) expect(EVIDENCE).toContain(e.trim());
    await expect(page.locator('.case-facts')).toHaveCount(1);
    expect(await page.locator('.prose h2').count()).toBeGreaterThanOrEqual(7);
    const html = await (await request.get(path)).text();
    expect(html).toContain('"@type":"CreativeWork"');
  });
}

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
    expect(notLinked).toBeGreaterThanOrEqual(5);

    // A case without a `status` in its frontmatter shows only the
    // relationship pill. Four of the five skim-only rows have no status;
    // the fifth (proof of concept) keeps its own.
    const withoutStatusBadge = await rows.evaluateAll(
      els =>
        els.filter(el => el.querySelectorAll('.case-row__pill').length === 1)
          .length,
    );
    expect(withoutStatusBadge).toBe(4);
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

test('the retired /en/projects/ URL redirects to the case-studies index', async ({
  request,
}) => {
  const res = await request.get('/en/projects/');
  const html = await res.text();
  expect(html).toContain('url=/en/case-studies/');
});
