import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.resolve(__dirname, '../src/pages');

// List of interactive tools requiring the 10-FAQ quality floor and SEO schema
const targetTools = [
  'pin-to-pin-distance-calculator.astro',
  'gst-notice-reply-generator.astro',
  'msme-delayed-payment-calculator.astro',
  'gstr1-json-to-excel.astro',
  'bulk-gstin-validator.astro',
  'freelancer-invoice-generator.astro',
  'msme-registration-checker.astro',
  'saas-export-lut-calculator.astro',
  'tds-rate-finder.astro',
  'e-invoice-eligibility-checker.astro',
  'ecommerce-seller-toolkit.astro',
  'gst-amnesty-tracker.astro',
  'gst-health-score.astro',
  'gst-refund-calculator.astro',
  'gst-refund-tracker.astro',
  'gstr-mismatch-checker.astro',
  'hra-exemption-calculator.astro',
  'income-tax-calculator.astro',
  'real-estate-gst-calculator.astro',
  'restaurant-gst-calculator.astro',
  'section-44ad-calculator.astro',
  'tds-section-finder.astro',
  'credit-debit-note-generator.astro',
  'gst-rate-finder.astro',
  'qrmp-eligibility-checker.astro',
];

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

  // 2. Check canonical tag
  if (!content.includes('canonical') || !/<BaseLayout[^>]*canonical/s.test(content)) {
    fileErrors.push('Missing "canonical" prop passed to BaseLayout');
  }

  // 3. Check Single H1
  const h1Matches = content.match(/<h1[\s>]/g);
  if (!h1Matches || h1Matches.length === 0) {
    fileErrors.push('No <h1> tag found in template');
  } else if (h1Matches.length > 1) {
    fileErrors.push(`Multiple <h1> tags found (${h1Matches.length})`);
  }

  // 4. Check WebApplication / SoftwareApplication schema
  if (!content.includes('WebApplication') && !content.includes('SoftwareApplication')) {
    fileErrors.push('Missing WebApplication or SoftwareApplication schema in structuredData');
  }

  // 5. Check FAQPage schema
  if (!content.includes('FAQPage')) {
    fileErrors.push('Missing FAQPage schema in structuredData');
  }

  // 6. Check 10-FAQ quality floor
  // Count items in faqs array
  const faqsArrayMatch = content.match(/const\s+faqs\s*=\s*\[([\s\S]*?)\];/);
  let faqCount = 0;
  if (faqsArrayMatch) {
    const questions = faqsArrayMatch[1].match(/q:\s*['"`]/g);
    faqCount = questions ? questions.length : 0;
  } else {
    // If not in faqs array, check structuredData mainEntity questions
    const qMatches = content.match(/'@type':\s*'Question'/g) || content.match(/"@type":\s*"Question"/g);
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
    console.log(`✅ ${toolFile} (${faqCount} FAQs, WebApp + FAQPage Schema, H1, Canonical)`);
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
