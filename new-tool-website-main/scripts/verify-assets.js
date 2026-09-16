/**
 * Automated Asset & Hero Image Verification Gate for Taxzentic CI/CD.
 *
 * Scans all markdown blog posts in src/content/blog, extracts `heroImage` frontmatter,
 * and ensures every referenced image file physically exists in the public/ directory.
 * Also verifies the existence of public/og-default.png.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const blogDir = path.join(rootDir, 'src', 'content', 'blog');
const publicDir = path.join(rootDir, 'public');

console.log('🔍 Running Taxzentic Asset & Hero Image Build Gate...\n');

let hasErrors = false;
let verifiedCount = 0;

// 1. Verify og-default.png
const ogDefaultPath = path.join(publicDir, 'og-default.png');
if (!fs.existsSync(ogDefaultPath)) {
  console.error('❌ Missing primary Open Graph fallback: public/og-default.png');
  hasErrors = true;
} else {
  console.log('✅ Verified primary Open Graph image: public/og-default.png');
}

// 2. Scan blog hero images
if (fs.existsSync(blogDir)) {
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  console.log(`📁 Checking heroImage references in ${files.length} blog posts...\n`);

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const heroMatch = content.match(/^heroImage:\s*["']?([^"'\r\n]+)["']?/m);

    if (heroMatch && heroMatch[1]) {
      const heroRel = heroMatch[1].trim();
      // Remove leading slash if present
      const cleanRel = heroRel.startsWith('/') ? heroRel.slice(1) : heroRel;
      const fullPath = path.join(publicDir, cleanRel);

      if (!fs.existsSync(fullPath)) {
        console.error(`❌ Broken heroImage in ${file}:`);
        console.error(`   Referenced: ${heroRel}`);
        console.error(`   Expected:   ${fullPath}\n`);
        hasErrors = true;
      } else {
        verifiedCount++;
      }
    } else {
      console.warn(`⚠️ Post ${file} has no heroImage defined in frontmatter.`);
    }
  }
}

if (hasErrors) {
  console.error('\n❌ Asset verification FAILED. Please repair or replace missing hero images.');
  process.exit(1);
} else {
  console.log(`\n🎉 Asset verification PASSED! All ${verifiedCount} blog hero images verified in public/.`);
  process.exit(0);
}
