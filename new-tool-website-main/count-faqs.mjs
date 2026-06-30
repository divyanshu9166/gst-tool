import fs from 'fs';
import path from 'path';

function findAstroFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findAstroFiles(filePath));
    } else if (file.endsWith('.astro')) {
      results.push(filePath);
    }
  }
  return results;
}

const files = findAstroFiles('src/pages');
const summary = [];

for (const file of files) {
  // Skip non-tool pages
  if (['404.astro', 'about.astro', 'contact.astro', 'faq.astro', 'pricing.astro', 'privacy-policy.astro', 'referral-program.astro', 'refund-policy.astro', 'terms.astro', 'your-account.astro', 'index.astro'].includes(path.basename(file))) {
    continue;
  }
  if (file.includes('blog')) continue;
  
  const content = fs.readFileSync(file, 'utf8');
  
  // Count how many times '@type': 'Question' or '@type":"Question"' appears
  const count1 = (content.match(/@type['"]?\s*:\s*['"]Question['"]/g) || []).length;
  // Count how many times `q:` appears inside a FAQ map array
  // We can just count the number of `{ q: ` or `{q:`
  const count2 = (content.match(/{\s*['"]?q['"]?\s*:/g) || []).length;
  
  const total = Math.max(count1, count2);
  
  summary.push({ file, total });
}

summary.sort((a, b) => a.total - b.total);
summary.forEach(s => console.log(`${s.total} FAQs -> ${s.file}`));
