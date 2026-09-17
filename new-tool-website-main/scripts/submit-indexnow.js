/**
 * IndexNow Instant Search Engine Indexing Script
 * Submits updated URLs to Bing, Yandex, Seznam, and Naver simultaneously.
 *
 * Usage:
 *   npm run indexnow                          # Submits all URLs from sitemap or default core URLs
 *   npm run indexnow -- /gst-notice-reply-generator /invoice-generator
 *   npm run indexnow -- --all                 # Forces parsing all URLs from dist/sitemap-0.xml
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const HOST = 'taxzentic.com';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

function findIndexNowKey() {
  if (process.env.INDEXNOW_KEY) {
    return process.env.INDEXNOW_KEY.trim();
  }
  const publicDir = path.join(rootDir, 'public');
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    const keyFile = files.find((f) => /^[a-f0-9]{16,64}\.txt$/i.test(f));
    if (keyFile) {
      return fs.readFileSync(path.join(publicDir, keyFile), 'utf8').trim();
    }
  }
  return null;
}

// Default high-priority URLs if sitemap is not built yet
const DEFAULT_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/gst-notice-reply-generator`,
  `https://${HOST}/gst-notices`,
  `https://${HOST}/gst-notice-deadline-calculator`,
  `https://${HOST}/gstr-mismatch-checker`,
  `https://${HOST}/gstr-2b-reconciliation-tool`,
  `https://${HOST}/invoice-generator`,
  `https://${HOST}/gst-calculator`,
  `https://${HOST}/gstin-validator`,
  `https://${HOST}/hsn-code-lookup`,
  `https://${HOST}/blog`,
];

function extractUrlsFromSitemap() {
  const sitemapPath = path.join(rootDir, 'dist', 'sitemap-0.xml');
  if (!fs.existsSync(sitemapPath)) {
    return null;
  }
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  if (matches.length === 0) return null;
  return matches.map((m) => m[1].trim());
}

function getGitChangedUrls() {
  try {
    // Check both committed changes in HEAD vs HEAD~1 and uncommitted working tree changes
    let changedFiles = [];
    try {
      const headDiff = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8', cwd: rootDir });
      changedFiles.push(...headDiff.split('\n'));
    } catch {
      // If single commit or no HEAD~1, check git status
    }

    try {
      const statusOut = execSync('git status --porcelain', { encoding: 'utf8', cwd: rootDir });
      statusOut.split('\n').forEach(line => {
        if (line.length > 3) changedFiles.push(line.substring(3).trim());
      });
    } catch {}

    const urls = new Set();
    for (const file of changedFiles) {
      const trimmed = file.trim().replace(/\\/g, '/');
      if (!trimmed) continue;

      if (trimmed.includes('src/pages/')) {
        const afterPages = trimmed.substring(trimmed.indexOf('src/pages/') + 'src/pages/'.length);
        if (afterPages.endsWith('.astro')) {
          let route = afterPages.replace(/\.astro$/, '');
          if (route === 'index') route = '';
          else if (route.endsWith('/index')) route = route.replace(/\/index$/, '');
          urls.add(`https://${HOST}/${route}`);
        }
      } else if (trimmed.includes('src/content/blog/')) {
        const slug = path.basename(trimmed).replace(/\.md$/, '');
        urls.add(`https://${HOST}/blog/${slug}`);
      }
    }
    return Array.from(urls);
  } catch (err) {
    return [];
  }
}

function resolveTargetUrls() {
  const args = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
  const forceAll = process.argv.includes('--all');

  // 1. If explicit URLs or paths are provided as arguments
  if (args.length > 0) {
    return args.map((arg) => {
      if (arg.startsWith('http://') || arg.startsWith('https://')) {
        return arg;
      }
      const cleanPath = arg.startsWith('/') ? arg : `/${arg}`;
      return `https://${HOST}${cleanPath}`;
    });
  }

  // 2. If --all is explicitly requested, submit entire sitemap
  if (forceAll) {
    const sitemapUrls = extractUrlsFromSitemap();
    if (sitemapUrls && sitemapUrls.length > 0) {
      console.log(`📑 [--all] Loaded complete sitemap of ${sitemapUrls.length} URLs from dist/sitemap-0.xml`);
      return sitemapUrls;
    }
  }

  // 3. Recommended: submit only recently modified/added URLs detected from git
  const changedUrls = getGitChangedUrls();
  if (changedUrls.length > 0) {
    console.log(`🔍 Detected ${changedUrls.length} modified URL(s) from git changes:`);
    changedUrls.forEach((u) => console.log(`   • ${u}`));
    return changedUrls;
  }

  // 4. Fallback to default core URLs
  console.log(`ℹ️ No git changes detected. Submitting ${DEFAULT_URLS.length} core default URLs (Use --all for full sitemap).`);
  return DEFAULT_URLS;
}

async function submitToIndexNow() {
  const key = findIndexNowKey();
  if (!key) {
    console.error('❌ IndexNow key file not found in public/*.txt directory.');
    process.exit(1);
  }

  const keyLocation = `https://${HOST}/${key}.txt`;

  console.log('\n🚀 Starting IndexNow URL Submission...');
  console.log(`🌐 Host:         ${HOST}`);
  console.log(`🔑 Key Location: ${keyLocation}`);

  const rawUrls = resolveTargetUrls();
  // Filter unique valid URLs belonging to the host
  const urls = [...new Set(rawUrls)].filter((u) => u.includes(HOST));

  if (urls.length === 0) {
    console.error('❌ No valid URLs found to submit.');
    process.exit(1);
  }

  console.log(`\n📤 Submitting ${urls.length} URL(s) to IndexNow:`);
  urls.slice(0, 5).forEach((u) => console.log(`   • ${u}`));
  if (urls.length > 5) {
    console.log(`   ... and ${urls.length - 5} more`);
  }

  // IndexNow allows up to 10,000 URLs per batch
  const batch = urls.slice(0, 10000);

  const payload = {
    host: HOST,
    key,
    keyLocation,
    urlList: batch,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    console.log(`\n📡 HTTP Response: ${response.status} ${response.statusText}`);

    if (response.status === 200) {
      console.log('✅ Success (200): All URLs submitted successfully to IndexNow!');
      console.log('Bing and participating search engines (Yandex, Seznam, Naver) have been notified.');
    } else if (response.status === 202) {
      console.log('✅ Accepted (202): URLs received! IndexNow key verification is in progress.');
    } else if (response.status === 400) {
      console.error('❌ Bad Request (400): Invalid request format or parameters.');
    } else if (response.status === 403) {
      console.warn('⚠️ Forbidden (403): The IndexNow key file was not found or did not match at:');
      console.warn(`   ${keyLocation}`);
      console.warn('   Note: If you have not yet deployed the new key file to production,');
      console.warn(`   deploy your website first so https://${HOST}/${key}.txt is reachable by Bing.`);
    } else if (response.status === 422) {
      console.error('❌ Unprocessable Entity (422): URLs do not match the specified host.');
    } else if (response.status === 429) {
      console.warn('⚠️ Rate Limited (429): Too many requests. Please wait a few minutes.');
    } else {
      const text = await response.text();
      console.log('Response body:', text);
    }
  } catch (err) {
    console.error('❌ Network Error while contacting IndexNow:', err.message);
  }

  console.log('\n🔍 You can monitor real-time crawl activity at:');
  console.log('   https://www.bing.com/webmasters (IndexNow tab)\n');
}

submitToIndexNow();
