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
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  const faqMatch = content.match(/FAQ Section.*?(?:\{\[\s*({[\s\S]*?})\s*\]\.map|\{structuredData\[\d+\]\.mainEntity\.map)/s);
  
  if (faqMatch) {
    if (content.includes('structuredData[1].mainEntity.map') || content.includes('structuredData[2].mainEntity.map')) {
      const match = content.match(/mainEntity:\s*\[([\s\S]*?)\]\s*\}/);
      if (match) {
        const count = (match[1].match(/@type':?\s*'Question'/g) || []).length;
        if (count < 10) console.log(`${file}: structuredData has ${count} FAQs`);
      } else {
        console.log(`${file}: structuredData map found, but could not parse count.`);
      }
    } else {
      const arrayContent = faqMatch[0];
      const count = (arrayContent.match(/\{\s*q\s*:/g) || []).length;
      if (count < 10) console.log(`${file}: inline array has ${count} FAQs`);
    }
  } else {
    console.log(`${file}: NO FAQ Section found.`);
  }
}
