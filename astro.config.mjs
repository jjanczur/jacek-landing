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
    // Inline small stylesheets to reduce render-blocking requests
    inlineStylesheets: 'auto',
    // Optimize assets
    assets: '_assets',
  },
  vite: {
    build: {
      cssCodeSplit: false, // Bundle CSS into single file per page to reduce requests
    },
  },
});
