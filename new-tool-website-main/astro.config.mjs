// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ─────────────────────────────────────────────────────────────────────────────
// SITE CONSTANT — replace this with your production domain before deploying.
// Used for canonical URLs, OG tags, and sitemap generation.
// ─────────────────────────────────────────────────────────────────────────────
const SITE = 'https://taxzentic.com';

export default defineConfig({
  // Static output — perfect for Cloudflare Pages / any CDN
  output: 'static',

  site: SITE,

  integrations: [
    sitemap({
      // Exclude legal/utility pages from sitemap if desired — adjust as needed
      filter: (page) => !page.includes('/404'),
    }),
  ],

  vite: {
    plugins: [
      // Tailwind CSS v4 via the official Vite plugin (no tailwind.config.js needed)
      tailwindcss(),
    ],
  },
});
