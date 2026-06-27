const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const blogDir = path.join(srcDir, 'content/blog');
const pagesDir = path.join(srcDir, 'pages');

// Get all tools
const toolFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.astro') && f !== 'index.astro' && !f.startsWith('['));
const tools = toolFiles.map(file => {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    const titleMatch = content.match(/const title\s*=\s*['"](.*?)['"]/);
    const title = titleMatch ? titleMatch[1] : file.replace('.astro', '').replace(/-/g, ' ');
    return {
        slug: '/' + file.replace('.astro', ''),
        title: title
    };
});

// Get all blogs
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
const blogs = blogFiles.map(file => {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const titleMatch = content.match(/title:\s*['"](.*?)['"]/);
    const title = titleMatch ? titleMatch[1] : file.replace('.md', '').replace(/-/g, ' ');
    return {
        slug: '/blog/' + file.replace('.md', ''),
        title: title
    };
});

console.log(`Found ${tools.length} tools and ${blogs.length} blogs.`);

// 1. Link every blog to at least 2 tools
let blogsUpdated = 0;
for (const file of blogFiles) {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has internal links to tools
    const existingToolLinks = (content.match(/\]\(\/[a-z0-9-]+\)/g) || []).length;
    
    if (existingToolLinks < 2 && !content.includes('## Related Tools')) {
        // Pick 2 random tools
        const randomTools = tools.sort(() => 0.5 - Math.random()).slice(0, 2);
        const relatedToolsSection = `\n\n## Related Tools\n- [${randomTools[0].title}](${randomTools[0].slug})\n- [${randomTools[1].title}](${randomTools[1].slug})\n`;
        
        content += relatedToolsSection;
        fs.writeFileSync(filePath, content);
        blogsUpdated++;
    }
}
console.log(`Updated ${blogsUpdated} blogs with tool links.`);

// 2. Link every tool to at least 2 blogs
let toolsUpdated = 0;
for (const file of toolFiles) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('<!-- Related Guides -->') && content.includes('<!-- FAQ Section -->')) {
        // Pick 2 random blogs
        const randomBlogs = blogs.sort(() => 0.5 - Math.random()).slice(0, 2);
        
        const relatedBlogsSection = `
  <!-- Related Guides -->
  <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-12">
    <div class="border-t border-base pt-12">
      <h2 class="text-[24px] font-semibold text-base mb-4">Related Guides</h2>
      <ul class="list-disc pl-5 space-y-2">
        <li><a href="${randomBlogs[0].slug}" class="text-primary hover:underline">${randomBlogs[0].title}</a></li>
        <li><a href="${randomBlogs[1].slug}" class="text-primary hover:underline">${randomBlogs[1].title}</a></li>
      </ul>
    </div>
  </div>
`;
        
        // Insert before the last FAQ Section (which is usually at the bottom before </BaseLayout>)
        const faqIndex = content.lastIndexOf('<!-- FAQ Section -->');
        if (faqIndex !== -1) {
            content = content.slice(0, faqIndex) + relatedBlogsSection + content.slice(faqIndex);
            fs.writeFileSync(filePath, content);
            toolsUpdated++;
        }
    }
}
console.log(`Updated ${toolsUpdated} tools with blog links.`);
