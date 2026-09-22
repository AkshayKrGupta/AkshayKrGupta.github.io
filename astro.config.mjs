import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  compressHTML: true,
  site: process.env.SITE_URL || 'https://akshaykgupta.me',
  base: process.env.BASE_PATH || '/',
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        themes: {
          light: 'github-light',
          dark: 'github-dark-dimmed',
        },
        wrap: false,
      },
      gfm: true,
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      wrap: false,
    },
  },
  prefetch: true,
});
