const fs = require('fs');
const path = require('path');
const sharp = require('C:/Users/divya/.gemini/antigravity-ide/brain/cabc1216-6dca-43fc-b7f7-fb1ca1d4846b/scratch/node_modules/sharp');

const blogDir = path.join(__dirname, '../src/content/blog');
const outDir = path.join(__dirname, '../public/images/blog');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

// Utility to wrap text for SVG
function wrapText(text, maxCharsPerLine) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
        if ((currentLine + word).length > maxCharsPerLine) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine += word + ' ';
        }
    }
    if (currentLine) lines.push(currentLine.trim());
    return lines;
}

async function processBlogs() {
    for (const file of files) {
        const filePath = path.join(blogDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Extract title
        const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
        if (!titleMatch) continue;
        
        const title = titleMatch[1];
        const lines = wrapText(title, 25);
        
        // Create SVG
        const width = 1200;
        const height = 630;
        
        let tspanStr = lines.map((line, i) => {
            return `<tspan x="600" dy="${i === 0 ? 0 : 70}">${line}</tspan>`;
        }).join('');
        
        const svg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#111827" />
                        <stop offset="100%" stop-color="#312e81" />
                    </linearGradient>
                    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#818cf8" />
                        <stop offset="100%" stop-color="#c084fc" />
                    </linearGradient>
                </defs>
                <rect width="${width}" height="${height}" fill="url(#bg)" />
                <rect width="${width}" height="${height}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="40" />
                <circle cx="200" cy="150" r="300" fill="rgba(99, 102, 241, 0.15)" filter="blur(50px)"/>
                <circle cx="1000" cy="500" r="250" fill="rgba(168, 85, 247, 0.15)" filter="blur(50px)"/>
                <text x="600" y="${315 - (lines.length * 35) + 35}" font-family="sans-serif" font-weight="900" font-size="64" fill="url(#textGrad)" text-anchor="middle">
                    ${tspanStr}
                </text>
                <text x="600" y="550" font-family="sans-serif" font-weight="600" font-size="24" fill="#9ca3af" text-anchor="middle" letter-spacing="4">
                    GSTTOOLS ONLINE
                </text>
            </svg>
        `;
        
        const baseName = file.replace('.md', '');
        const outPath = path.join(outDir, `${baseName}.webp`);
        
        // Convert to WebP
        await sharp(Buffer.from(svg))
            .webp({ quality: 80 })
            .toFile(outPath);
            
        console.log(`Generated image for ${baseName}`);
        
        // Update markdown frontmatter if not already present
        if (!content.includes('heroImage:')) {
            content = content.replace(/description:\s*([^\n]+)/, `description: $1\nheroImage: "/images/blog/${baseName}.webp"`);
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

processBlogs().catch(console.error);
