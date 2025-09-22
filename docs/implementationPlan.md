# Implementation Plan — Astro + GitHub Pages (EN/PL/DE)

## 0) Prereqs

- Node 18+ for local dev only. No server runtime required in prod.
- Repo: `jacek-astro-site` (or your choice).

## 1) Scaffold

```bash
npm create astro@latest jacek-site
# Template: "Minimal", Language: "TypeScript"
cd jacek-site
npm i -D @astrojs/mdx @astrojs/sitemap zod
```

`astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://<user>.github.io/<repo>/', // or 'https://janczura.com'
  base: '/<repo>/', // remove if using user/organization pages or custom domain at root
  integrations: [mdx(), sitemap()],
  trailingSlash: 'always',
});
```

## 2) i18n routing (static, simple)

- Create parallel trees: `src/pages/en`, `src/pages/pl`, `src/pages/de`.
- Pages in each: `index.astro`, `projects.astro`, `talks.astro`, `about.astro`, `contact.astro` (+
  `notes.astro` if used).
- Language switcher maps current path to other locales (route map per page).

`src/components/LanguageSwitcher.astro`

```astro
---
const { lang, pathMap } = Astro.props; // pathMap: { en:'/en/...', pl:'/pl/...', de:'/de/...' }
---

<nav aria-label="Language">
  <a href={pathMap.en} aria-current={lang === 'en' ? 'true' : 'false'}>EN</a>
  <span>·</span>
  <a href={pathMap.pl} aria-current={lang === 'pl' ? 'true' : 'false'}>PL</a>
  <span>·</span>
  <a href={pathMap.de} aria-current={lang === 'de' ? 'true' : 'false'}>DE</a>
</nav>
```

## 3) Content Collections

`src/content/config.ts`

```ts
import { z, defineCollection } from 'astro:content';

const lang = z.enum(['en', 'pl', 'de']);

export const collections = {
  projects: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      period: z.string().optional(),
      role: z.string().optional(),
      tags: z.array(z.string()).default([]),
      outcome: z.string().optional(),
      image: z.string().optional(),
      links: z
        .object({
          href: z.string().url().optional(),
          repo: z.string().url().optional(),
        })
        .partial()
        .optional(),
      lang,
    }),
  }),
  talks: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      event: z.string().optional(),
      date: z.string().optional(),
      youtubeId: z.string().optional(),
      videoUrl: z.string().url().optional(),
      description: z.string().optional(),
      lang,
    }),
  }),
  notes: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.string(),
      type: z.string().optional(),
      link: z.string().url().optional(),
      summary: z.string().optional(),
      lang,
    }),
  }),
};
```

**Example entries (EN)**  
`src/content/projects/entaingine.en.mdx`

```mdx
---
title: 'entAIngine — Enterprise AI Process Automation'
period: '2023–Present'
role: 'Co-founder & CTO'
tags: ['LLM', 'RAG', 'RBAC', 'SaaS']
outcome: 'Governed, provider-agnostic AI workflows for enterprises'
lang: 'en'
---

**Problem.** Enterprises need compliant LLM workflows.  
**Approach.** Multi-tenant, RBAC, model-agnostic orchestration.  
**Impact.** Faster AI adoption with governance and cost controls.
```

`src/content/talks/ai-arch.en.mdx`

```mdx
---
title: 'AI Architecture Patterns'
event: 'Conference Talk'
youtubeId: 'Sf61QaWJDjA'
description: 'Lessons from enterprise LLM platforms.'
lang: 'en'
---
```

_(Create PL/DE copies with translated text and `lang:` updated.)_

## 4) Layout & Components

- `src/layouts/BaseLayout.astro`: `<html lang={lang}>` + head meta (title/desc/og), **hreflang
  alternates**, header, footer, main `<slot/>`.
- `src/components/NavBar.astro`: brand (name), nav links, **ThemeToggle**, **LanguageSwitcher**,
  mobile menu.
- `src/components/VideoEmbed.astro`: responsive 16:9 iframe; `loading="lazy"`, `title` attr.
- `src/components/ProjectCard.astro`, `TalkCard.astro`, `TimelineItem.astro`, `Tag.astro`.

**Theme toggle (minimal JS)**  
`src/components/ThemeToggle.astro`

```astro
<button
  aria-label="Toggle theme"
  on:click={() => {
    const d = document.documentElement;
    const next = d.dataset.theme === 'dark' ? 'light' : 'dark';
    d.dataset.theme = next;
    localStorage.setItem('theme', next);
  }}
>
  <span>🌓</span>
</button>
```

`public/theme-init.js`

```js
(() => {
  const saved = localStorage.getItem('theme');
  document.documentElement.dataset.theme = saved || 'light';
})();
```

Include `<script src="/theme-init.js" is:inline></script>` early in `<head>` to avoid FOUC.

## 5) Styles & Tokens

`src/styles/tokens.css`

```css
:root {
  --bg: #fff;
  --fg: #222;
  --primary: oklch(0.6 0.15 280);
  --accent: oklch(0.65 0.05 180);
  --muted: #f5f5f5;
  --border: #ddd;
  --radius-s: 6px;
  --radius-m: 10px;
  --radius-l: 14px;
  --shadow-1: 0 2px 8px rgba(0, 0, 0, 0.06);
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --font-body: 'Lato', system-ui, sans-serif;
}
:root[data-theme='dark'] {
  --bg: #121212;
  --fg: #eaeaea;
  --primary: oklch(0.65 0.18 280);
  --accent: oklch(0.7 0.05 180);
  --muted: #1e1e1e;
  --border: #333;
}
html,
body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-body);
}
```

Add Lato (choose one):

- Google:
  `<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">`
- Or self-host WOFF2 in `public/fonts/` and `@font-face`.

## 6) Pages (build order)

1. **/en/** Home (hero, highlights, featured work, CTA)
2. **/en/projects** (list all `projects` where `lang==='en'`)
3. **/en/talks** (list `talks` where `lang==='en'`; embed)
4. **/en/about** (bio + timeline + skills)
5. **/en/contact** (mailto + LinkedIn)
6. Duplicate to **/pl/** and **/de/** with translated content.

## 7) Head meta, SEO & hreflang

- In `BaseLayout.astro`, accept `meta: { title, description, ogImage }`.
- Inject JSON-LD `Person` on Home.
- For each page, output `<link rel="alternate" hreflang="en" href=".../en/...">` (+ pl/de +
  x-default).
- Add `@astrojs/sitemap` and `public/robots.txt`.

## 8) CSP (meta)

In Layout `<head>`:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-src https://www.youtube.com https://www.youtube-nocookie.com;"
/>
```

(If using external font CSS, allow `fonts.googleapis.com` / `fonts.gstatic.com` accordingly.)

## 9) GitHub Pages

`.github/workflows/deploy.yml`

```yaml
name: Deploy Astro to GitHub Pages
on:
  push: { branches: [ main ] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

`public/CNAME`

```
janczura.com
```

Set `astro.config.mjs: site` to the final origin. If using project pages
(`<user>.github.io/<repo>/`), set `base`.

## 10) QA Checklist

- **Links:** all EN/PL/DE nav routes resolve; language switch keeps context or falls back to each
  locale’s home.
- **A11y:** One `<h1>` per page, focus states, alt text, contrast AA, skip link.
- **Perf:** Lighthouse ≥95; images optimized; lazy iframes; no unused JS.
- **SEO:** titles, descriptions, OG image, JSON-LD valid (Rich Results), hreflang.
- **Security:** CSP clean (fonts/YouTube allowed), no mixed content.

## 11) Release

- Local: `npm run dev` → `npm run build` → `npx serve dist` for preview.
- Push to `main` → Action publishes Pages → verify custom domain + HTTPS.
- Rollback: revert commit; GH Pages auto redeploys.

## 12) Next Actions for Cursor

- [ ] Scaffold Astro, add MDX/sitemap/zod.
- [ ] Create `tokens.css`, `BaseLayout`, `NavBar`, `Footer`, `ThemeToggle`, `LanguageSwitcher`.
- [ ] Define collections and seed EN content (projects/talks).
- [ ] Translate to PL/DE (UI + content).
- [ ] Add CSP meta, robots.txt, sitemap.
- [ ] Configure Actions + CNAME; set `site`/`base`.
- [ ] Run QA; fix any a11y/SEO/perf gaps; ship.
