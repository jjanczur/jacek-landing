import { test, expect } from '@playwright/test';

const BANNED = [
  'leverage',
  'seamless',
  'cutting-edge',
  'unlock',
  'empower',
  'elevate',
  'state-of-the-art',
  'pioneered',
];

const PRINCIPLES = [
  'Start with the workflow, not the model',
  'Ship the smallest loop that really runs',
  'Treat evaluation, security and observability as product capabilities',
  'Leave a stronger team and a reusable system',
];

test.describe('about', () => {
  test('hero carries the role line, the availability line and the CV link', async ({
    page,
  }) => {
    await page.goto('/en/about/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.hero__sub')).toContainText(
      'Co-founder & CTO of Jaden Data until June 2024',
    );
    await expect(page.locator('.hero__sub')).toContainText(
      'fractional CTO and consulting partner since',
    );
    await expect(page.locator('.hero .availability')).toContainText(
      'remote-first, on-site when it matters',
    );
    await expect(page.locator('.hero a.btn--ghost')).toHaveAttribute(
      'href',
      '/docs/Jacek_Janczura_CV.pdf',
    );
    await expect(page.locator('.hero a.btn--primary')).toHaveAttribute(
      'href',
      '/en/contact/#hiring',
    );
  });

  test('opening narrative is three paragraphs next to the headshot', async ({
    page,
  }) => {
    await page.goto('/en/about/');
    await expect(page.locator('.about-narrative__p')).toHaveCount(3);
    await expect(page.locator('.about-portrait img')).toHaveCount(1);
    const body = page.locator('.about-narrative__body');
    await expect(body).toContainText(
      'key contributor to the six-country login rollout',
    );
    await expect(body).toContainText(
      'cross-ledger CBDC bridge with Norges Bank',
    );
  });

  test('operating principles, leadership scope and technical depth are complete', async ({
    page,
  }) => {
    await page.goto('/en/about/');
    for (const principle of PRINCIPLES) {
      await expect(page.locator('body')).toContainText(principle);
    }
    await expect(page.locator('.about-scope__item')).toHaveCount(8);
    await expect(page.locator('.about-depth__item')).toHaveCount(5);
  });

  test('timeline has one row per role and keeps the employer reference', async ({
    page,
  }) => {
    await page.goto('/en/about/');
    await expect(page.locator('.about-timeline li')).toHaveCount(5);
    await expect(
      page.locator(
        '.about-timeline a[href="/docs/EmployerReference-Jacek.pdf"]',
      ),
    ).toHaveCount(1);
    const timeline = page.locator('.about-timeline');
    await expect(timeline).toContainText('Co-founder & CTO');
    await expect(timeline).toContainText('1.4M accounts in three months');
  });

  test('credentials and outside work are present, and the leadership claim is not repeated', async ({
    page,
  }) => {
    await page.goto('/en/about/');
    const credentials = page.locator('.about-credentials');
    await expect(credentials).toContainText('Technische Universität Berlin');
    await expect(credentials).toContainText('KnowledgeX');
    await expect(page.locator('.about-outside')).toContainText(
      'Windsurfing Instructor',
    );
    await expect(page.locator('.about-outside')).not.toContainText(
      'translate directly to technical leadership',
    );
  });

  test('copy avoids the banned vocabulary', async ({ request }) => {
    const html = (await (await request.get('/en/about/')).text()).toLowerCase();
    for (const word of BANNED) {
      expect(html, `/en/about/ contains "${word}"`).not.toContain(word);
    }
  });
});
