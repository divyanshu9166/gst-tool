const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/content/blog');
const imagesDir = path.join(__dirname, '../public/images/blog');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to split text into lines (rudimentary wrapping)
function wrapText(text, maxCharsPerLine) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + word).length > maxCharsPerLine) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });
  if (currentLine) {
    lines.push(currentLine.trim());
  }
  return lines;
}

// Function to generate SVG content
function generateSVG(title) {
  const lines = wrapText(title, 35); // Approx 35 characters per line for this font size
  const lineHeight = 55;
  const totalTextHeight = lines.length * lineHeight;
  const startY = 315 - (totalTextHeight / 2) + 20;

  let textElements = '';
  lines.forEach((line, index) => {
    textElements += `<text x="600" y="${startY + (index * lineHeight)}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="48" font-weight="800" fill="#E0E7FF" text-anchor="middle">${line}</text>\n`;
  });

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="grad1" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1E1B4B;stop-opacity:1" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad1)" />
  ${textElements}
  <text x="600" y="550" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#818CF8" letter-spacing="4" text-anchor="middle">GSTTOOLS ONLINE</text>
</svg>`;
}

// Read all blog posts
const files = fs.readdirSync(blogDir);

files.forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if it already has heroImage
    if (!content.includes('heroImage:')) {
      // Extract title and slug
      const titleMatch = content.match(/title:\s*"([^"]+)"/);
      const slugMatch = content.match(/slug:\s*"([^"]+)"/);

      if (titleMatch && slugMatch) {
        const title = titleMatch[1];
        const slug = slugMatch[1];

        // Generate SVG
        const svgContent = generateSVG(title);
        const svgFilename = `${slug}.svg`;
        const svgPath = path.join(imagesDir, svgFilename);

        fs.writeFileSync(svgPath, svgContent);
        console.log(`Created image: ${svgFilename}`);

        // Update frontmatter
        const heroImageString = `heroImage: "/images/blog/${svgFilename}"\n`;
        // Insert heroImage before the closing ---
        // Find the second ---
        const firstDash = content.indexOf('---');
        const secondDash = content.indexOf('---', firstDash + 3);

        if (secondDash !== -1) {
          content = content.slice(0, secondDash) + heroImageString + content.slice(secondDash);
          fs.writeFileSync(filePath, content);
          console.log(`Updated frontmatter for: ${file}`);
        }
      }
    }
  }
});
console.log('Done!');
