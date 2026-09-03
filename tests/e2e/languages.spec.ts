import { test, expect } from '@playwright/test';

const BLOCKED = [
  '/pl/',
  '/de/',
  '/pl/turnaround/',
  '/de/about/',
  '/pl/builder/',
];

for (const path of BLOCKED) {
  test(`unpublished language redirects to English: ${path}`, async ({
    request,
  }) => {
    const res = await request.get(path, { maxRedirects: 0 });
    expect(res.status()).toBe(200);
    const html = await res.text();
    const target = path.replace(/^\/(pl|de)\//, '/en/');
    expect(html).toContain(`http-equiv="refresh"`);
    expect(html).toContain(`url=https://janczura.com${target}`);
    expect(html).toMatch(/<meta name="robots" content="noindex/);
    expect(html).not.toMatch(/hreflang="(pl|de)"/);
    expect(html).not.toContain('class="navbar"');
  });
}

test('English pages expose no Polish or German alternates or switcher', async ({
  page,
  request,
}) => {
  for (const path of ['/en/', '/en/about/', '/en/turnaround/']) {
    const html = await (await request.get(path)).text();
    expect(html, path).not.toMatch(/hreflang="(pl|de)"/);
    expect(html, path).not.toMatch(/href="\/(pl|de)\//);
    await page.goto(path);
    await expect(page.locator('[aria-label="Change language"]')).toHaveCount(0);
  }
});
