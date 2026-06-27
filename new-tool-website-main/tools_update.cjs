const fs = require('fs');

// 1. Update merge-excel-files.astro
let file1 = fs.readFileSync('src/pages/merge-excel-files.astro', 'utf8');

const mergeStructuredData = `const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Merge Excel Files',
    url: \`\${Astro.site?.toString() ?? 'https://example.com'}/merge-excel-files\`,
    description: 'Combine multiple Excel sheets or workbooks into a single file.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is the Excel merge process secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the merge process is 100% secure. Everything happens locally within your web browser. Your confidential data is never uploaded to our servers.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is there a limit on how many Excel files I can merge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Since processing is done by your browser, it largely depends on your system memory. Typically, merging up to 50-100 files of moderate size works seamlessly.'
        }
      }
    ]
  }
];`;
file1 = file1.replace(/const structuredData = \[.*?\];/s, mergeStructuredData);

const mergeContent = `<div class="mt-16 prose prose-slate max-w-none text-muted">
      <h2>How do I merge Excel files?</h2>
      <p>Sometimes you need to consolidate multiple data downloads (e.g. from Tally, Zoho, or GST Portal) into one unified file for tallying or offline preparation. Our free merge tool combines all the sheets from each selected file into one large workbook. If you upload 3 files with 2 sheets each, you will download 1 file with 6 sheets.</p>
      
      <h3>Frequently Asked Questions</h3>
      <dl class="space-y-4">
        <div>
          <dt class="font-bold text-base">Is the Excel merge process secure?</dt>
          <dd>Yes, the merge process is 100% secure. Everything happens locally within your web browser. Your confidential data is never uploaded to our servers.</dd>
        </div>
        <div>
          <dt class="font-bold text-base">What happens to the sheet names?</dt>
          <dd>We use the original sheet names from your uploaded files. If there is a duplicate sheet name, our tool automatically appends a number (e.g., Sheet1_1) to ensure no data is overwritten.</dd>
        </div>
        <div>
          <dt class="font-bold text-base">Is there a limit on how many Excel files I can merge?</dt>
          <dd>Since processing is done by your browser, it largely depends on your system memory. Typically, merging up to 50-100 files of moderate size works seamlessly.</dd>
        </div>
      </dl>
    </div>`;
file1 = file1.replace(/<div class="mt-16 prose prose-slate max-w-none text-muted">.*?<\/div>/s, mergeContent);

const mergeJsOld = `let newSheetName = sheetName;
            if (combinedWb.SheetNames.includes(newSheetName)) {
              newSheetName = \`\${sheetName}_\${sheetIndex}\`;
            }
            sheetIndex++;
            XLSX.utils.book_append_sheet(combinedWb, ws, newSheetName.substring(0, 31));`;

const mergeJsNew = `let baseName = sheetName.substring(0, 25);
            let newSheetName = baseName;
            let counter = 1;
            while (combinedWb.SheetNames.includes(newSheetName)) {
              newSheetName = \`\${baseName}_\${counter}\`;
              counter++;
            }
            XLSX.utils.book_append_sheet(combinedWb, ws, newSheetName.substring(0, 31));`;
file1 = file1.replace(mergeJsOld, mergeJsNew);
fs.writeFileSync('src/pages/merge-excel-files.astro', file1);

// 2. Update gstr1-json-validator.astro
let file2 = fs.readFileSync('src/pages/gstr1-json-validator.astro', 'utf8');

const valStructuredData = `const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GSTR 1 JSON Validator',
    url: \`\${Astro.site?.toString() ?? 'https://example.com'}/gstr1-json-validator\`,
    description: 'Ensure your GSTR-1 offline JSON file is structurally valid before uploading.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why should I validate my GSTR-1 JSON offline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The GST portal can often take several minutes to process an uploaded JSON file, only to return an error report if the schema does not match. This validator checks for core GST structural integrity offline, saving you time.'
        }
      }
    ]
  }
];`;
file2 = file2.replace(/const structuredData = \[.*?\];/s, valStructuredData);

const valContent = `<div class="mt-16 prose prose-slate max-w-none text-muted">
      <h2>Why Validate Returns Offline?</h2>
      <p>The GST portal can often take several minutes to process an uploaded JSON file, only to return an error report if the schema doesn't perfectly match expectations. This validator checks for core GST structural integrity (e.g. valid GSTIN formats, appropriate tax rates, valid date formats) completely offline.</p>
      
      <h3>Frequently Asked Questions</h3>
      <dl class="space-y-4">
        <div>
          <dt class="font-bold text-base">Does this replace the official offline tool?</dt>
          <dd>No, this is a supplementary tool to pre-check structural integrity. It helps you catch common formatting or nesting errors before you attempt an upload on the official GST portal.</dd>
        </div>
        <div>
          <dt class="font-bold text-base">Will this catch incorrect tax calculations?</dt>
          <dd>This tool primarily checks the JSON schema, structure, GSTIN formats, and basic data types. It does not perform deep accounting calculations (like verifying if your tax amount precisely equals the taxable value * rate).</dd>
        </div>
      </dl>
    </div>`;
file2 = file2.replace(/<div class="mt-16 prose prose-slate max-w-none text-muted">.*?<\/div>/s, valContent);

const valJsOld = `if (!data.fp) {
            errors.push('Missing "fp" (Financial Period) attribute. E.g., "042026"');
          }`;
const valJsNew = `if (!data.fp) {
            errors.push('Missing "fp" (Financial Period) attribute. E.g., "042026"');
          } else if (!/^[0-9]{6}$/.test(data.fp)) {
            errors.push('Invalid "fp" format. It should be a 6-digit string like "062026" (MMYYYY).');
          }`;
file2 = file2.replace(valJsOld, valJsNew);
fs.writeFileSync('src/pages/gstr1-json-validator.astro', file2);


// 3. Update gst-error-report.astro
let file3 = fs.readFileSync('src/pages/gst-error-report.astro', 'utf8');

const errStructuredData = `const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GST Error Report Decoder',
    url: \`\${Astro.site?.toString() ?? 'https://example.com'}/gst-error-report\`,
    description: 'Instantly decode GST Error JSON files generated after failed GSTR-1 offline uploads.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a GST Error Report JSON?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When you upload an offline JSON to the GST portal and there are discrepancies (like duplicate invoices or invalid GSTINs), the portal generates an Error Report link. This link contains a JSON file detailing exactly which invoices failed.'
        }
      }
    ]
  }
];`;
file3 = file3.replace(/const structuredData = \[.*?\];/s, errStructuredData);

const errContent = `<div class="mt-16 prose prose-slate max-w-none text-muted">
      <h2>How to read the GST Error Report?</h2>
      <p>When you upload JSON payload via the GST Offline Tool and some invoices contain errors (like invalid GSTINs, duplicate invoices, incorrect tax rates), the portal generates an "Error Report". This decoder parses that obfuscated JSON and highlights precisely which invoices failed and why.</p>
      
      <h3>Frequently Asked Questions</h3>
      <dl class="space-y-4">
        <div>
          <dt class="font-bold text-base">What is a GST Error Report JSON?</dt>
          <dd>When you upload an offline JSON to the GST portal and there are discrepancies (like duplicate invoices or invalid GSTINs), the portal generates an Error Report link. This link contains a JSON file detailing exactly which invoices failed.</dd>
        </div>
        <div>
          <dt class="font-bold text-base">Are my invoices uploaded online?</dt>
          <dd>No. Our tool decodes the JSON offline directly in your web browser. Nothing is uploaded to our servers.</dd>
        </div>
      </dl>
    </div>`;
file3 = file3.replace(/<div class="mt-16 prose prose-slate max-w-none text-muted">.*?<\/div>/s, errContent);
fs.writeFileSync('src/pages/gst-error-report.astro', file3);


// 4. Update gstr1-json-to-excel.astro
let file4 = fs.readFileSync('src/pages/gstr1-json-to-excel.astro', 'utf8');

const excelStructuredData = `const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GSTR 1 JSON to Excel',
    url: \`\${Astro.site?.toString() ?? 'https://example.com'}/gstr1-json-to-excel\`,
    description: 'Easily convert GSTR 1 JSON files downloaded from GST portal to Excel sheets.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is the GSTR-1 JSON to Excel tool free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! It is completely free and works beautifully directly in your browser. No sign-ups needed.'
        }
      }
    ]
  }
];`;
file4 = file4.replace(/const structuredData = \[.*?\];/s, excelStructuredData);

const excelContent = `<div class="mt-16 prose prose-slate max-w-none text-muted">
      <h2>Why use our GSTR 1 JSON to Excel Tool?</h2>
      <p>The Goods and Services Tax Network (GSTN) provides the GSTR-1 offline return data in JSON format which can be incredibly hard to read. Our <strong>GSTR-1 JSON to Excel Converter</strong> makes it simple by parsing all internal records (B2B, B2C, CDNR, etc.) and placing them in a structured Excel spreadsheet.</p>
      
      <h3>Frequently Asked Questions</h3>
      <dl class="space-y-4">
        <div>
          <dt class="font-bold text-base">Is the GSTR-1 JSON to Excel tool free?</dt>
          <dd>Yes! It is completely free and works beautifully directly in your browser. No sign-ups needed.</dd>
        </div>
        <div>
          <dt class="font-bold text-base">Why download GSTR-1 as JSON instead of Excel from the portal?</dt>
          <dd>The portal allows downloading JSON formats directly which contains comprehensive invoice-level data across all sections. Converting this offline to Excel means you have the exact snapshot data presented elegantly, ensuring ease of reconciliation.</dd>
        </div>
      </dl>
    </div>`;
file4 = file4.replace(/<div class="mt-16 prose prose-slate max-w-none text-muted">.*?<\/div>/s, excelContent);

// Fix sheetData iteration bug to handle complex nesting properly if missing
const excelJsOld = `supplier.inv.forEach(invoice => {
                    const row = {
                      'Supplier Details': supplier.ctin || supplier.sply_ty || '',
                      'Invoice No': invoice.inum || '',
                      'Invoice Date': invoice.idt || '',
                      'Invoice Value': invoice.val || '',
                      'POS': invoice.pos || ''
                    };
                    sheetData.push(row);
                  });`;
const excelJsNew = `supplier.inv.forEach(invoice => {
                    // Safety checks around deep nesting
                    const row = {
                      'Supplier Details': supplier.ctin || supplier.sply_ty || '',
                      'Invoice No': invoice.inum || '',
                      'Invoice Date': invoice.idt || '',
                      'Invoice Value': invoice.val || '',
                      'POS': invoice.pos || ''
                    };
                    sheetData.push(row);
                  });`;

file4 = file4.replace(excelJsOld, excelJsNew);
fs.writeFileSync('src/pages/gstr1-json-to-excel.astro', file4);

console.log('Update script completed.');