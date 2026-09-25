import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.resolve(__dirname, '../src/pages');

// Audit every tool route that declares app or downloadable-document schema, rather than keeping a
// partial hand-maintained list that can miss newly added tools.
const targetTools = fs.readdirSync(pagesDir)
  .filter((file) => file.endsWith('.astro'))
  .filter((file) => {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    return /['"]@type['"]\s*:\s*(?:['"]WebApplication['"]|['"]SoftwareApplication['"]|['"]DigitalDocument['"]|\[)/.test(content)
      && /WebApplication|SoftwareApplication|DigitalDocument/.test(content);
  })
  .sort();

const forbiddenPhrases = [
  { pattern: /100%\s+offline/i, file: 'gst-notice-reply-generator.astro', reason: 'GST notice generator uses AI generation and must not claim 100% offline' },
  { pattern: /official\s+nhai/i, file: 'pin-to-pin-distance-calculator.astro', reason: 'PIN distance must not claim official NHAI distance without live API' },
  { pattern: /exact\s+motorable/i, file: 'pin-to-pin-distance-calculator.astro', reason: 'PIN distance is a centroid estimate, not exact motorable' },
  { pattern: /"aggregateRating"/i, file: null, reason: 'Fake aggregate rating schema is forbidden' },
  { pattern: /\/gst-turnover-calculator/i, file: null, reason: 'Broken link /gst-turnover-calculator must be /aggregate-turnover-calculator' },
];

let totalErrors = 0;

console.log(`\n🔍 Running Taxzentic SEO & FAQ Quality Assurance Gate...`);
console.log(`Checking ${targetTools.length} priority tool pages...\n`);

for (const toolFile of targetTools) {
  const filePath = path.join(pagesDir, toolFile);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [MISSING FILE] ${toolFile} not found.`);
    totalErrors++;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const fileErrors = [];

  // 1. Check title & description
  if (!content.includes('title') || !/const\s+title\s*=/.test(content)) {
    fileErrors.push('Missing "title" constant definition in frontmatter');
  }
  if (!content.includes('description') || !/const\s+description\s*=/.test(content)) {
    fileErrors.push('Missing "description" constant definition in frontmatter');
  }

  // BaseLayout emits a canonical URL from Astro.url.href unless a page
  // explicitly overrides it, so verify the page uses the shared layout.
  if (!/<BaseLayout(?:\s|>)/.test(content)) {
    fileErrors.push('Page does not use BaseLayout, so the canonical fallback is not guaranteed');
  }

  // 3. Check Single H1
  const h1Matches = content.match(/<h1[\s>]/g);
  if (!h1Matches || h1Matches.length === 0) {
    fileErrors.push('No <h1> tag found in template');
  } else if (h1Matches.length > 1) {
    fileErrors.push(`Multiple <h1> tags found (${h1Matches.length})`);
  }

  // 4. Check the schema matches an interactive tool or downloadable document
  if (!content.includes('WebApplication') && !content.includes('SoftwareApplication') && !content.includes('DigitalDocument')) {
    fileErrors.push('Missing WebApplication, SoftwareApplication, or DigitalDocument schema in structuredData');
  }

  // 5. Check FAQPage schema
  if (!content.includes('FAQPage')) {
    fileErrors.push('Missing FAQPage schema in structuredData');
  }

  // 6. Check the 10-FAQ quality floor. FAQ arrays are named differently
  // across older tool pages (for example gstCalculatorFaqs or dueDatesFaqs).
  const faqArrays = [...content.matchAll(/const\s+([\w$]*faq[\w$]*)\s*=\s*\[([\s\S]*?)\];/gi)];
  let faqCount = faqArrays.reduce((sum, match) => {
    const questions = match[2].match(/\b(?:q|question)\s*:\s*['"`]/gi);
    return sum + (questions?.length ?? 0);
  }, 0);
  if (faqCount === 0) {
    const qMatches = content.match(/['"]@type['"]\s*:\s*['"]Question['"]/g);
    faqCount = qMatches ? qMatches.length : 0;
  }

  if (faqCount < 10) {
    fileErrors.push(`FAQ floor failed: Found ${faqCount} FAQs, minimum required is 10`);
  }

  // 7. Check DOM FAQ presence
  if (!content.includes('Frequently Asked Questions')) {
    fileErrors.push('Missing visible "Frequently Asked Questions" heading in HTML');
  }

  // 8. Check forbidden phrases
  for (const { pattern, file, reason } of forbiddenPhrases) {
    if ((file === null || file === toolFile) && pattern.test(content)) {
      fileErrors.push(`Forbidden pattern matched: ${reason}`);
    }
  }

  if (fileErrors.length > 0) {
    console.error(`❌ ${toolFile}:`);
    for (const err of fileErrors) {
      console.error(`   - ${err}`);
    }
    totalErrors += fileErrors.length;
  } else {
    console.log(`✅ ${toolFile} (${faqCount} FAQs, App/Document + FAQPage Schema, H1, BaseLayout canonical)`);
  }
}

console.log(`\n------------------------------------------------------------`);
if (totalErrors === 0) {
  console.log(`🎉 ALL ${targetTools.length} TOOL PAGES PASSED SEO & FAQ QA CHECKS!\n`);
  process.exit(0);
} else {
  console.error(`💥 QA FAILED with ${totalErrors} issue(s).\n`);
  process.exit(1);
}
