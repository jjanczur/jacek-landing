import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { ALL_PAGES, EN_PAGES } from './pages';

// Animated numbers must be server-rendered with their final value.
const ZERO_PATTERNS: RegExp[] = [
  /€0M\+/,
  /~0 mo/,
  /~0 req\/sec/,
  />0\+</,
  />0<\/span>/,
  />0%</,
  />0\.0%</,
];

// Claims and terms that must never ship (spec §2.1, §3.5).
const FORBIDDEN: string[] = [
  'field cto',
  'site cto',
  'forward-deployed',
  'forward deployed',
  'certified ai provider',
  'certyfikowany dostawca',
  'zertifizierter ai-anbieter',
  'sso i led',
  'prowadziłem wielokrajowe sso',
  'sso, das ich verantwortet habe',
  'production ai for norges bank',
  'produkcyjne ai dla norges bank',
  'produktives ai für die norges bank',
  'delivered as an independent contractor',
  'kfw',
];

// City-name check runs separately from FORBIDDEN because the About pages
// legitimately reference the university name (Warsaw University of
// Technology / Politechnika Warszawska / Technische Universität Warschau).
// Strip those allowed occurrences, then confirm no bare city reference remains.
const UNIVERSITY_NAME_RE =
  /warsaw university of technology|politechnika warszawska|technische universität warschau|warschauer/g;
const CITY_NAME_RE = /warsaw|warszaw|warschau/;

function blocklist(): string[] {
  const p = 'tests/blocklist.txt';
  if (!existsSync(p)) return [];
  return readFileSync(p, 'utf8')
    .split('\n')
    .map(s => s.trim().toLowerCase())
    .filter(s => s && !s.startsWith('#'));
}

for (const path of ALL_PAGES) {
  test(`no zero-valued counters in static HTML: ${path}`, async ({
    request,
  }) => {
    const res = await request.get(path);
    expect(res.status()).toBe(200);
    const html = await res.text();
    for (const re of ZERO_PATTERNS) {
      expect(html, `${path} matches ${re}`).not.toMatch(re);
    }
  });

  test(`no forbidden claims, terms or names: ${path}`, async ({ request }) => {
    const html = (await (await request.get(path)).text()).toLowerCase();
    for (const s of [...FORBIDDEN, ...blocklist()]) {
      expect(html, `${path} contains "${s}"`).not.toContain(s);
    }
    const withoutUniversityName = html.replace(UNIVERSITY_NAME_RE, '');
    expect(
      withoutUniversityName,
      `${path} contains a bare city reference outside the university name`,
    ).not.toMatch(CITY_NAME_RE);
  });
}

// Bosch may be named as a client, but the four tendering and contracting
// workflows must never be attributed to them: those are published under
// "a global automotive group" (owner instruction, 2026-09-04).
const ATTRIBUTION_RE = /procurement|tendering|contracting|workflow/;

function readableText(html: string): string {
  const metas = [...html.matchAll(/<meta[^>]+content="([^"]*)"/gi)].map(
    m => m[1],
  );
  const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '';
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  return [title, ...metas, body].join(' | ').replace(/\s+/g, ' ').toLowerCase();
}

for (const path of EN_PAGES) {
  test(`no client attribution for the procurement workflows: ${path}`, async ({
    request,
  }) => {
    const text = readableText(await (await request.get(path)).text());
    // Attribution is a property of the sentence, not of raw proximity: naming
    // them in a client list one sentence away from an anonymised claim is fine.
    for (const sentence of text.split(/[.!?;|·]+/)) {
      if (!sentence.includes('bosch')) continue;
      expect(
        sentence,
        `${path}: "bosch" is named in a sentence describing work that must stay sector-only — "${sentence.trim()}"`,
      ).not.toMatch(ATTRIBUTION_RE);
    }
  });
}
