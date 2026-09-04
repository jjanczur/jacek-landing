// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const LANGS = ['en', 'pl', 'de'];

// Case-study routes whose slug named a client that the case itself now
// describes by industry. The old URLs stay alive as redirects so inbound
// links and search results still land, and stay out of the sitemap so the
// retired address is not the one that gets indexed.
const RETIRED_CASE_SLUGS = {
  'bosch-procurement-ai': 'automotive-procurement-ai',
  'kfw-genai-portfolio': 'development-bank-genai-portfolio',
};

const retiredCaseRedirects = Object.fromEntries(
  LANGS.flatMap(lang =>
    Object.entries(RETIRED_CASE_SLUGS).map(([from, to]) => [
      `/${lang}/case-studies/${from}/`,
      `/${lang}/case-studies/${to}/`,
    ]),
  ),
);

const RETIRED_CASE_RE = new RegExp(
  `/case-studies/(${Object.keys(RETIRED_CASE_SLUGS).join('|')})/`,
);

// https://astro.build/config
export default defineConfig({
  site: 'https://janczura.com',
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        !/\/(pl|de)\//.test(page) &&
        !/\/projects\//.test(page) &&
        !RETIRED_CASE_RE.test(page),
    }),
  ],
  trailingSlash: 'always',
  redirects: {
    '/en/projects/': '/en/case-studies/',
    '/pl/projects/': '/en/case-studies/',
    '/de/projects/': '/en/case-studies/',
    ...retiredCaseRedirects,
  },
  build: {
    // Inline stylesheets to eliminate render-blocking CSS requests
    // This reduces critical path latency by removing the CSS file from the dependency chain
    inlineStylesheets: 'always',
    // Optimize assets
    assets: '_assets',
  },
  vite: {
    build: {
      cssCodeSplit: false, // Bundle CSS into single file per page to reduce requests
    },
  },
});
