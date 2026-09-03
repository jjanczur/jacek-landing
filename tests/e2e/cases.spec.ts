import { test, expect } from '@playwright/test';

const DETAILS = [
  'jaden-data-company-building',
  'kfw-genai-portfolio',
  'bosch-procurement-ai',
  'apg-pension-assistant',
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
