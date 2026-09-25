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

  redirects: {
    '/blog/gst-composition-scheme-2026-guide': '/blog/gst-composition-scheme-2026',
    '/blog/gst-2-0-new-rates-2025': '/blog/gst-2-0-rate-changes-product-list',
    '/itc-reversal-calculator': '/itc-reversal-checker',
    '/gst-turnover-calculator': '/aggregate-turnover-calculator',
  },

  integrations: [
    sitemap({
      // Keep noindex placeholders and error pages out of the public sitemap.
      filter: (page) => !/\/(?:404|pricing|referral-program|refund-policy|cancellation-policy|your-account)\/?$/.test(new URL(page).pathname),
    }),
  ],

  vite: {
    plugins: [
      // Tailwind CSS v4 via the official Vite plugin (no tailwind.config.js needed)
      tailwindcss(),
    ],
  },
});
