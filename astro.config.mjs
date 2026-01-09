// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://janczura.com',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'always',
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
