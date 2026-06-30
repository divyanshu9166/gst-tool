import fs from 'fs';
import path from 'path';
import { transformSync } from 'esbuild';

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
  let content = fs.readFileSync(file, 'utf8');
  
  // Find all <script lang="ts">...</script> blocks
  const scriptRegex = /<script\s+lang="ts">([\s\S]*?)<\/script>/g;
  
  let match;
  let modified = false;
  
  while ((match = scriptRegex.exec(content)) !== null) {
    const tsCode = match[1];
    try {
      const jsCode = transformSync(tsCode, { loader: 'ts' }).code;
      // Replace the entire tag with plain <script>
      const newTag = `<script>\n${jsCode.trim()}\n</script>`;
      content = content.replace(match[0], newTag);
      modified = true;
    } catch (e) {
      console.error(`Error transforming ${file}:`, e.message);
    }
  }
  
  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed: ${file}`);
  }
}
