import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { EN_PAGES } from './pages';

// Logo hygiene: UUID filenames only, sector-only alt text (spec D20).
const UUID_WEBP = /^\/media\/[0-9a-f]{32}\.webp$/;
const NAMES = [
  'norges',
  'apg',
  'boehringer',
  'kfw',
  'bosch',
  'red bull',
  'redbull',
  'ing ',
  'telekom',
  'idealo',
  'stellantis',
  'sas',
  'tüv',
  'tuv',
  'imf',
  'kenstone',
  'software ag',
  'anita',
];

function localNames(): string[] {
  const p = 'logo-map.local.json';
  if (!existsSync(p)) return [];
  try {
    const map = JSON.parse(readFileSync(p, 'utf8')) as Record<string, string>;
    return Object.values(map).map(v => String(v).toLowerCase());
  } catch {
    return [];
  }
}

for (const path of EN_PAGES) {
  test(`logo hygiene: ${path}`, async ({ page }) => {
    await page.goto(path);
    const imgs = await page.$$eval('img[src^="/media/"]', els =>
      els.map(e => ({
        src: e.getAttribute('src') || '',
        alt: (e.getAttribute('alt') || '').toLowerCase(),
      })),
    );
    for (const img of imgs) {
      expect(img.src, `${path} ${img.src}`).toMatch(UUID_WEBP);
      for (const n of [...NAMES, ...localNames()]) {
        expect(
          ` ${img.alt} `,
          `${path} alt "${img.alt}" names an organisation`,
        ).not.toContain(n);
      }
    }
  });
}
