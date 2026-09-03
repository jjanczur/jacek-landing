import { test, expect } from '@playwright/test';

const FORMSPREE = 'https://formspree.io/f/myzngpqa';
const CALENDLY =
  'https://calendly.com/jacek-janczura/30min?hide_event_type_details=0&hide_gdpr_banner=1';

const HIRING_FIELDS = ['email', 'company', 'role', 'stage', 'message'];
const PROJECT_FIELDS = [
  'email',
  'company',
  'problem',
  'constraints',
  'timeline',
  'budget',
];

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

const FORBIDDEN = [
  'field cto',
  'site cto',
  'forward-deployed',
  'certified ai provider',
  'day rate',
  'hourly rate',
  'notice period',
  'per week',
];

test.describe('contact', () => {
  test('both paths are addressable and both panels are on the page', async ({
    page,
  }) => {
    await page.goto('/en/contact/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#hiring')).toBeVisible();
    await expect(page.locator('#project')).toBeVisible();
    await expect(page.locator('a[href="#hiring"]').first()).toBeVisible();
    await expect(page.locator('a[href="#project"]').first()).toBeVisible();
    await expect(page.locator('#hiring')).toContainText('Head of AI');
    await expect(page.locator('#hiring')).toContainText(
      'remote-first, on-site when it matters',
    );
    await expect(page.locator('#project')).toContainText('NDA on request');
    await expect(
      page.locator('#hiring a[href="/docs/Jacek_Janczura_CV.pdf"]'),
    ).toHaveCount(1);
  });

  test('the hiring form posts to the shared endpoint with the hiring path', async ({
    page,
  }) => {
    await page.goto('/en/contact/');
    const form = page.locator('#hiring form');
    await expect(form).toHaveAttribute('action', FORMSPREE);
    await expect(form).toHaveAttribute('method', /post/i);
    await expect(form.locator('input[name="path"]')).toHaveValue('hiring');
    for (const name of HIRING_FIELDS) {
      await expect(
        form.locator(`[name="${name}"]`),
        `hiring form is missing ${name}`,
      ).toHaveCount(1);
    }
  });

  test('the project form posts to the shared endpoint with the project path', async ({
    page,
  }) => {
    await page.goto('/en/contact/');
    const form = page.locator('#project form');
    await expect(form).toHaveAttribute('action', FORMSPREE);
    await expect(form).toHaveAttribute('method', /post/i);
    await expect(form.locator('input[name="path"]')).toHaveValue('project');
    for (const name of PROJECT_FIELDS) {
      await expect(
        form.locator(`[name="${name}"]`),
        `project form is missing ${name}`,
      ).toHaveCount(1);
    }
  });

  test('every field has a label and calendly stays as the quick option', async ({
    page,
  }) => {
    await page.goto('/en/contact/');
    // Scoped to <main>: the NavBar renders its own (mobile-only, hidden at
    // desktop widths) Calendly link ahead of the page content in DOM order,
    // so an unscoped .first() would pick that up instead of this page's
    // quick-option button.
    await expect(
      page.locator(`main a[href="${CALENDLY}"]`).first(),
    ).toBeVisible();
    const controls = page.locator(
      '.path-form input:not([type="hidden"]):not([name="_gotcha"]), .path-form textarea, .path-form select',
    );
    const count = await controls.count();
    expect(count).toBe(HIRING_FIELDS.length + PROJECT_FIELDS.length);
    for (let i = 0; i < count; i++) {
      const id = await controls.nth(i).getAttribute('id');
      expect(id, 'every control needs an id for its label').toBeTruthy();
      await expect(page.locator(`label[for="${id}"]`)).toHaveCount(1);
    }
  });

  test('copy avoids the banned and forbidden vocabulary', async ({
    request,
  }) => {
    const html = (
      await (await request.get('/en/contact/')).text()
    ).toLowerCase();
    for (const word of [...BANNED, ...FORBIDDEN]) {
      expect(html, `/en/contact/ contains "${word}"`).not.toContain(word);
    }
  });
});

test.describe('contact without javascript', () => {
  test.use({ javaScriptEnabled: false });

  test('both panels and both forms work with scripting off', async ({
    page,
  }) => {
    await page.goto('/en/contact/');
    await expect(page.locator('#hiring form')).toBeVisible();
    await expect(page.locator('#project form')).toBeVisible();
    await page.goto('/en/contact/#project');
    await expect(page.locator('#project form')).toBeVisible();
    await expect(page.locator('#hiring form')).toBeVisible();
  });
});
