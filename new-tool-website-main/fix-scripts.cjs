const fs = require('fs');
const path = require('path');
const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.astro')) {
      results.push(file);
    }
  });
  return results;
};
const files = walk('./src/pages');
let updated = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  // Only target script tags that are exactly <script> (not <script src> or <script lang="ts">)
  if (content.match(/<script>/) && content.match(/( as HTML|: [a-zA-Z]+|type [a-zA-Z]+ =)/)) {
    content = content.replace(/<script>/g, '<script lang="ts">');
    fs.writeFileSync(f, content);
    updated++;
    console.log('Updated ' + f);
  }
});
console.log('Total files updated: ' + updated);
