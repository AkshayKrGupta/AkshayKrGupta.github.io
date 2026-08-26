import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  compressHTML: true,
  site: process.env.SITE_URL || 'https://akshaykrgupta.github.io',
  base: process.env.BASE_PATH || '/',
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-dark-dimmed',
        wrap: false,
      },
      gfm: true,
    }),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/drafts/'),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: false,
    },
  },
  prefetch: true,
});
