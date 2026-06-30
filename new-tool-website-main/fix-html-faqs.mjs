import fs from 'fs';
import path from 'path';

const filesToFix = [
  "gst-error-report.astro",
  "gstr1-json-to-excel.astro",
  "gstr1-json-validator.astro",
  "gst-state-codes.astro",
  "gstr-2b-reconciliation-tool.astro",
  "merge-excel-files.astro",
  "invoice-generator.astro",
  "gst-registration-checker.astro",
  "composition-scheme-calculator.astro",
  "eway-bill-limit-checker.astro",
  "eway-bill-validity.astro",
  "gst-interest-calculator.astro",
  "gst-penalty-calculator.astro",
  "itc-calculator.astro",
  "rcm-calculator.astro",
  "tcs-gst-calculator.astro",
  "tds-gst-calculator.astro"
];

const faqHtmlSnippet = `
    <!-- FAQ Section -->
    <section class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-20 mt-16 pt-12 border-t border-base" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="text-2xl sm:text-3xl font-bold text-base mb-8">Frequently Asked Questions</h2>
      <div class="space-y-4">
        {structuredData[1].mainEntity.map((faq, i) => (
          <details class="group rounded-xl border border-base bg-surface overflow-hidden" id={\`faq-\${i}\`}>
            <summary class="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-medium text-base hover:bg-subtle transition-colors list-none">
              <span>{faq.name}</span>
              <svg class="h-5 w-5 flex-shrink-0 text-muted group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div class="px-6 pb-5 text-[15px] text-muted leading-relaxed border-t border-base pt-4">{faq.acceptedAnswer.text}</div>
          </details>
        ))}
      </div>
    </section>
`;

for (const filename of filesToFix) {
  const filePath = path.join('src', 'pages', filename);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // STRATEGY:
  // 1. Remove existing HTML FAQ sections if they exist, so we don't have duplicates.
  
  // Type A: <!-- FAQ Section --> ... until </BaseLayout> or next <!-- tag
  // Some files have it before </BaseLayout>
  content = content.replace(/<!-- FAQ Section -->[\s\S]*?(?=<\/BaseLayout>|<script)/g, '');
  
  // Type B: <!-- FAQ --> ... until </section>
  content = content.replace(/<!-- FAQ -->[\s\S]*?<\/section>/g, '');
  
  // Type C: <h3>Frequently Asked Questions</h3> ... until </dl>
  content = content.replace(/<h3>Frequently Asked Questions<\/h3>[\s\S]*?<\/dl>/g, '');

  // 2. Inject the dynamic rendering snippet right before <script> or </BaseLayout>
  // Find the last occurrence of </BaseLayout>
  const insertIndex = content.lastIndexOf('</BaseLayout>');
  if (insertIndex !== -1) {
    // If there's a <script> tag before </BaseLayout>, we might want to insert it before the <script> 
    // to keep the script at the very end, but actually Astro allows components anywhere before </BaseLayout>.
    // Let's insert it right before the <script> block if it exists, otherwise before </BaseLayout>
    let finalInsertIndex = content.lastIndexOf('<script');
    if (finalInsertIndex === -1 || finalInsertIndex < content.lastIndexOf('<BaseLayout')) {
      finalInsertIndex = insertIndex; // no script tag, or script tag is in head
    }
    
    // Safety check: Make sure we aren't inserting INSIDE a script tag.
    // If we insert before `<script>`, we are outside it.
    
    // Wait, in `merge-excel-files.astro`, there are multiple <script> tags:
    // <script is:inline src="..."></script>
    // <script is:inline>...</script>
    // So we should find the FIRST <script that appears after the main content, or just insert it before </BaseLayout>!
    // Astro is fine with HTML being after <script> tags!
    // Let's just insert it right before </BaseLayout> to be completely safe and uniform.
    
    content = content.slice(0, insertIndex) + faqHtmlSnippet + content.slice(insertIndex);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed HTML FAQs for ${filename}`);
  } else {
    console.log(`Could not find </BaseLayout> in ${filename}`);
  }
}
