import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const pagesDir = path.join(rootDir, 'src/pages');
const blogDir = path.join(rootDir, 'src/content/blog');
const publicDir = path.join(rootDir, 'public');

console.log(`\n🔗 Running Taxzentic Internal Link Integrity QA Gate...\n`);

// 1. Collect all known valid routes
const validRoutes = new Set();
validRoutes.add('/');

// Scan pagesDir
function scanPages(dir, baseRoute = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      scanPages(path.join(dir, entry.name), `${baseRoute}/${entry.name}`);
    } else if (entry.name.endsWith('.astro')) {
      const pageName = entry.name.replace(/\.astro$/, '');
      if (pageName === 'index') {
        validRoutes.add(baseRoute || '/');
      } else {
        validRoutes.add(`${baseRoute}/${pageName}`);
      }
    }
  }
}
scanPages(pagesDir);

// Scan blog posts
if (fs.existsSync(blogDir)) {
  const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  for (const file of blogFiles) {
    const slug = file.replace(/\.(md|mdx)$/, '');
    validRoutes.add(`/blog/${slug}`);
  }
}

// Scan public assets
if (fs.existsSync(publicDir)) {
  function scanPublic(dir, baseRoute = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        scanPublic(path.join(dir, entry.name), `${baseRoute}/${entry.name}`);
      } else {
        validRoutes.add(`${baseRoute}/${entry.name}`);
      }
    }
  }
  scanPublic(publicDir);
}

// Helper to check route validity with dynamic patterns
function isValidRoute(route) {
  const clean = route.replace(/\/$/, '') || '/';
  if (validRoutes.has(clean)) return true;

  // Dynamic route patterns:
  // 1. /gst-rate-on-[product]
  if (clean.startsWith('/gst-rate-on-')) return true;
  // 2. /blog/category/*
  if (clean.startsWith('/blog/category/')) return true;
  // 3. /blog/tag/*
  if (clean.startsWith('/blog/tag/')) return true;
  // 4. /blog/page/*
  if (clean.startsWith('/blog/page/')) return true;
  // 5. /authors/*
  if (clean.startsWith('/authors/')) return true;

  return false;
}

// 2. Scan all files for href="(/...)"
const filesToScan = [];
function collectFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath);
    } else if (entry.name.endsWith('.astro') || entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      filesToScan.push(fullPath);
    }
  }
}
collectFiles(path.join(rootDir, 'src'));

let brokenCount = 0;
const checkedLinks = new Map(); // file -> broken links array

const linkRegex = /href=["'](\/[^"'#? ]*)["'#?]/g;
const mdLinkRegex = /\[[^\]]*\]\((\/[^)\s#?]+)[^)]*\)/g;

for (const filePath of filesToScan) {
  const relPath = path.relative(rootDir, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const rawLink = match[1];
    if (rawLink.startsWith('//')) continue;
    const targetRoute = rawLink.replace(/\/$/, '') || '/';

    if (!isValidRoute(targetRoute)) {
      if (!checkedLinks.has(relPath)) {
        checkedLinks.set(relPath, new Set());
      }
      checkedLinks.get(relPath).add(targetRoute);
      brokenCount++;
    }
  }

  while ((match = mdLinkRegex.exec(content)) !== null) {
    const rawLink = match[1];
    if (rawLink.startsWith('//')) continue;
    const targetRoute = rawLink.replace(/\/$/, '') || '/';

    if (!isValidRoute(targetRoute)) {
      if (!checkedLinks.has(relPath)) {
        checkedLinks.set(relPath, new Set());
      }
      checkedLinks.get(relPath).add(targetRoute);
      brokenCount++;
    }
  }
}

if (brokenCount > 0) {
  console.error(`💥 Found ${brokenCount} broken internal link(s):\n`);
  for (const [file, links] of checkedLinks.entries()) {
    console.error(`❌ In ${file}:`);
    for (const link of links) {
      console.error(`   - Target "${link}" does not exist`);
    }
  }
  process.exit(1);
} else {
  console.log(`✅ Scanned ${filesToScan.length} source files.`);
  console.log(`🎉 ZERO BROKEN INTERNAL LINKS FOUND! All internal links resolve to valid routes.\n`);
  process.exit(0);
}
