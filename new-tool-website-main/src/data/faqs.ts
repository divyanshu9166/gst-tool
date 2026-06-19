/**
 * FAQ data — used on the home page and /faq route.
 * Answers are written as plain text (HTML tags stripped for JSON-LD).
 * The `answerHtml` field is used for rendering; `answerText` for JSON-LD.
 */

export interface FaqItem {
  question: string;
  answerHtml: string;
  answerText: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'What is GST tool?',
    answerHtml: `<p>A <strong>GST tool</strong> is a software utility designed to help Indian taxpayers calculate tax amounts, validate GSTIN numbers, find HSN codes, and generate invoices. While the government provides a basic offline Java-based GST tool, our platform provides a suite of <strong>free GST tools online</strong> that require no downloads, no Java installation, and no portal login. It works instantly on any device.</p>`,
    answerText: 'A GST tool helps taxpayers calculate tax, validate GSTINs, and generate invoices. Our platform provides free online GST tools that require no downloads or portal login, working instantly on any device.',
  },
  {
    question: 'Is there a free GST tool for e-commerce?',
    answerHtml: `<p>Yes! We offer a dedicated <strong>free GST tool for e-commerce</strong> sellers on Amazon, Flipkart, and Meesho. You can use our TCS Calculator to compute your 1% Tax Collected at Source, and our Invoice Generator to instantly create B2B or B2C bills without any complex accounting software.</p>`,
    answerText: 'Yes, we offer a free GST tool for e-commerce sellers. You can use our TCS Calculator to compute Tax Collected at Source and our Invoice Generator to create instant B2C and B2B bills.',
  },
  {
    question: 'Can I use this GST tool offline?',
    answerHtml: `<p>Yes, our entire suite is built as a Progressive Web App (PWA). Once you load the site, it functions as a highly optimized <strong>offline GST tool</strong>. You can calculate taxes, search HSN codes, and validate the format of GST numbers without an active internet connection. It is significantly faster than the legacy <strong>GST tool v1.0</strong>.</p>`,
    answerText: 'Yes, our suite functions as an offline GST tool. Once loaded, you can calculate taxes and search HSN codes without an internet connection. It is faster than legacy v1.0 tools.',
  },
  {
    question: 'What is GST?',
    answerHtml: `<p>GST (Goods and Services Tax) is a comprehensive, multi-stage, destination-based indirect tax levied on every value addition in India. It replaced a complex web of central and state taxes such as VAT, service tax, excise duty, and CST. GST is collected at each stage of the supply chain, but the tax burden ultimately falls on the final consumer.</p>`,
    answerText: 'GST (Goods and Services Tax) is a comprehensive, multi-stage, destination-based indirect tax levied on every value addition in India. It replaced a complex web of central and state taxes such as VAT, service tax, excise duty, and CST. GST is collected at each stage of the supply chain, but the tax burden ultimately falls on the final consumer.',
  },
  {
    question: 'How to get GST number?',
    answerHtml: `<p>To get a GST number (GSTIN), follow these steps:</p><ol><li>Visit the official GST portal at <strong>gst.gov.in</strong>.</li><li>Click on "Services → Registration → New Registration".</li><li>Fill in Part A with your PAN, mobile number, and email.</li><li>Verify via OTP and receive a Temporary Reference Number (TRN).</li><li>Complete Part B with business details, documents (PAN, Aadhaar, address proof, bank details), and submit.</li><li>An ARN (Application Reference Number) is generated.</li><li>A GST officer reviews and approves; GSTIN is issued within 7 working days.</li></ol>`,
    answerText: 'To get a GST number (GSTIN): 1. Visit gst.gov.in. 2. Click Services → Registration → New Registration. 3. Fill Part A with PAN, mobile, email and verify via OTP. 4. Complete Part B with business details and documents. 5. Submit to receive an ARN. 6. GSTIN is issued within 7 working days after officer approval.',
  },
  {
    question: 'GST kab lagu hua?',
    answerHtml: `<p>GST bharat mein <strong>1 July 2017</strong> ko lagu hua. Yeh ek aitihaasik kar sudhar tha jisme "One Nation, One Tax" ka concept implement kiya gaya. GST Council ki pehli meeting 22–23 September 2016 ko hui thi.</p>`,
    answerText: 'GST bharat mein 1 July 2017 ko lagu hua. Yeh ek aitihaasik kar sudhar tha jisme "One Nation, One Tax" ka concept implement kiya gaya. GST Council ki pehli meeting 22–23 September 2016 ko hui thi.',
  },
  {
    question: 'How to download GST certificate?',
    answerHtml: `<p>To download your GST Registration Certificate:</p><ol><li>Log in to the GST portal at <strong>gst.gov.in</strong> using your credentials.</li><li>Go to <strong>Services → User Services → View/Download Certificates</strong>.</li><li>Select the certificate type (Registration Certificate — Form GST REG-06).</li><li>Click "Download" to save the PDF.</li></ol>`,
    answerText: 'To download your GST certificate: Log in to gst.gov.in → Services → User Services → View/Download Certificates → select Registration Certificate (Form GST REG-06) → Download PDF.',
  },
  {
    question: 'How to file GST return?',
    answerHtml: `<p>GST returns are filed online on the GST portal. The main return forms are: <strong>GSTR-1</strong> (outward supplies) — monthly or quarterly. <strong>GSTR-3B</strong> (summary return with tax payment) — monthly. <strong>GSTR-9</strong> (annual return) — once a year. Steps: Log in to gst.gov.in → Services → Returns → Returns Dashboard → select period → fill details → pay tax (if any) → submit and file with DSC or EVC.</p>`,
    answerText: 'GST returns are filed on gst.gov.in. Key forms: GSTR-1 (outward supplies, monthly/quarterly), GSTR-3B (summary return with payment, monthly), GSTR-9 (annual). Log in → Services → Returns → Returns Dashboard → select period → fill → pay → file.',
  },
  {
    question: 'GST number kya hota hai?',
    answerHtml: `<p>GST number (GSTIN) ek 15-character ka alphanumeric code hota hai jo har GST-registered business ko diya jata hai. Iska format hai: <strong>2-digit state code + 10-digit PAN + 1-digit entity number + "Z" + 1 checksum digit</strong>. Jaise: <code>27AABCU9603R1ZX</code>. Aap hamare <a href="/gstin-validator">GSTIN Validator</a> se koi bhi GST number check kar sakte hain.</p>`,
    answerText: 'GST number (GSTIN) ek 15-character alphanumeric code hai: 2-digit state code + 10-digit PAN + 1-digit entity number + "Z" + 1 checksum. Jaise: 27AABCU9603R1ZX (27 = Maharashtra). Hamare GSTIN Validator se check karein.',
  },
  {
    question: 'What is the full form of GST?',
    answerHtml: `<p>The full form of GST is <strong>Goods and Services Tax</strong>. It is a unified indirect tax framework that subsumes most central and state indirect taxes in India, creating a single national market.</p>`,
    answerText: 'The full form of GST is Goods and Services Tax. It is a unified indirect tax framework that subsumes most central and state indirect taxes in India, creating a single national market.',
  },
  {
    question: 'GST kya hai?',
    answerHtml: `<p>GST ek indirect tax hai jo India mein goods aur services ki supply par lagaya jata hai. Isme CGST (Central GST), SGST (State GST), aur IGST (Integrated GST) shamil hain. Har registered taxpayer apne purchases par paid GST ka credit (Input Tax Credit) le sakta hai, jisse double taxation se bachav hota hai.</p>`,
    answerText: 'GST ek indirect tax hai jo India mein goods aur services ki supply par lagaya jata hai. Isme CGST (Central GST), SGST (State GST), aur IGST (Integrated GST) shamil hain. Har registered taxpayer apne purchases par paid GST ka credit (Input Tax Credit) le sakta hai, jisse double taxation se bachav hota hai.',
  },
  {
    question: 'How to calculate GST?',
    answerHtml: `<p>To calculate GST: <strong>Adding GST:</strong> GST Amount = (Original Price × GST Rate) ÷ 100. Total Price = Original Price + GST Amount. <strong>Removing GST (reverse):</strong> Original Price = Total Price ÷ (1 + GST Rate ÷ 100). GST Amount = Total Price − Original Price. Use our free <a href="/gst-calculator">GST Calculator</a> for instant results.</p>`,
    answerText: 'Adding GST: GST Amount = (Original Price × GST Rate) ÷ 100; Total = Original + GST. Removing GST: Original = Total ÷ (1 + Rate ÷ 100); GST = Total − Original. Use our free GST Calculator for instant results.',
  },
  {
    question: 'How to check GST number?',
    answerHtml: `<p>You can check a GST number (GSTIN) in two ways: 1. <strong>Offline format check:</strong> Use our free <a href="/gstin-validator">GSTIN Validator</a> to instantly verify the format and checksum. 2. <strong>Official portal:</strong> Visit <strong>gst.gov.in → Search Taxpayer → Search by GSTIN/UIN</strong> to verify registration status real time.</p>`,
    answerText: 'Check a GST number: 1. Use our free GSTIN Validator for offline format and checksum verification. 2. Visit gst.gov.in → Search Taxpayer → Search by GSTIN/UIN for real-time status.',
  },
  {
    question: 'How to apply for GST number?',
    answerHtml: `<p>To apply for a GST number: Visit <strong>gst.gov.in</strong> → Services → Registration → New Registration. You need your PAN card, Aadhaar card, business address proof, bank account details, and a digital photograph. Fill Part A, verify OTP, then fill Part B. Registration is mandatory if turnover exceeds ₹40 lakh (goods) or ₹20 lakh (services).</p>`,
    answerText: 'To apply for a GST number: Visit gst.gov.in → Services → Registration → New Registration. Required: PAN, Aadhaar, address proof, bank details. Mandatory if turnover exceeds ₹40 lakh (goods) or ₹20 lakh (services).',
  },
  {
    question: 'When new GST rates will be applicable?',
    answerHtml: `<p>New GST rates become applicable from the date specified in the official Gazette notifications issued by the Government of India, following recommendations by the GST Council. Always check the <strong>CBIC website (cbic.gov.in)</strong> or the GST portal for the latest rate notifications and their effective dates.</p>`,
    answerText: 'New GST rates become applicable from the date specified in official Gazette notifications issued after GST Council meetings. Check cbic.gov.in or gst.gov.in for the latest rate notifications and effective dates.',
  },
  {
    question: 'What is GST number?',
    answerHtml: `<p>A GST number (GSTIN - Goods and Services Tax Identification Number) is a unique 15-character alphanumeric identifier assigned to every GST-registered business in India. The format is: <strong>2-digit state code + 10-digit PAN + 1-digit entity number + "Z" + 1 checksum digit</strong>. You can validate any GSTIN using our free <a href="/gstin-validator">GSTIN Validator tool</a>.</p>`,
    answerText: 'A GST number (GSTIN - Goods and Services Tax Identification Number) is a unique 15-character alphanumeric identifier assigned to every GST-registered business in India. The format is: 2-digit state code + 10-digit PAN + 1-digit entity number + "Z" + 1 checksum digit.',
  },
  {
    question: 'How much GST on gold?',
    answerHtml: `<p>Gold attracts <strong>3% GST</strong> in India (HSN 7108). This applies to gold in unwrought, semi-manufactured, or powder form. Additionally, making charges on gold jewellery attract <strong>5% GST</strong>. So the effective GST on gold jewellery is 3% on the gold value + 5% on making charges.</p>`,
    answerText: 'Gold attracts 3% GST (HSN 7108) in India. Making charges on gold jewellery attract 5% GST. So effective GST on jewellery = 3% on gold value + 5% on making charges.',
  },
  {
    question: 'कार की कीमतें GST बचत',
    answerHtml: `<p>Cars par GST rate unki engine capacity aur type ke hisab se alag hoti hai. Petrol/diesel cars (1200cc se kam, 4m se kam) par <strong>28% GST + 1% cess</strong>. Badi cars (1500cc se zyada) par <strong>28% GST + 15% cess</strong>. Electric vehicles (EVs) par sirf <strong>5% GST</strong> lagti hai, jo ek badi bachat hai.</p>`,
    answerText: 'Cars par GST: Chhoti petrol/diesel cars (1200cc se kam) par 28% + 1% cess. Badi cars (1500cc+) par 28% + 15% cess. Electric vehicles par sirf 5% GST — yeh sabse badi bachat hai.',
  },
  {
    question: 'GST kya hota hai?',
    answerHtml: `<p>GST ek indirect tax hai jo India mein goods aur services ki supply par lagaya jata hai. Isme CGST (Central GST), SGST (State GST), aur IGST (Integrated GST) shamil hain. Har registered taxpayer apne purchases par paid GST ka credit (Input Tax Credit) le sakta hai, jisse double taxation se bachav hota hai.</p>`,
    answerText: 'GST ek indirect tax hai jo India mein goods aur services ki supply par lagaya jata hai. Isme CGST (Central GST), SGST (State GST), aur IGST (Integrated GST) shamil hain. Har registered taxpayer apne purchases par paid GST ka credit (Input Tax Credit) le sakta hai, jisse double taxation se bachav hota hai.',
  },
  {
    question: 'What is ITC in GST?',
    answerHtml: `<p>ITC stands for <strong>Input Tax Credit</strong>. It allows a GST-registered business to reduce the GST it has already paid on purchases (inputs) from the GST it collects on sales (output tax). For example, if you paid ₹1,800 GST on raw materials and collected ₹3,600 GST on finished goods, you only pay ₹1,800 net to the government. ITC prevents the cascading effect of taxes and is a core feature of the GST system.</p>`,
    answerText: 'ITC (Input Tax Credit) allows GST-registered businesses to deduct GST paid on purchases from GST collected on sales. It prevents cascading taxes. E.g., if you paid ₹1,800 GST on inputs and collected ₹3,600 on outputs, you pay only ₹1,800 net.',
  },
  {
    question: 'What is RCM in GST?',
    answerHtml: `<p>RCM stands for <strong>Reverse Charge Mechanism</strong>. Normally, the supplier pays GST to the government. Under RCM, the liability to pay GST shifts to the recipient (buyer) of goods or services. RCM applies in specific cases notified by the government — for example, services from an unregistered supplier to a registered business, legal services, GTA (goods transport agency) services, etc. The recipient must self-invoice and pay GST directly.</p>`,
    answerText: 'RCM (Reverse Charge Mechanism) shifts the GST payment liability from the supplier to the recipient (buyer). It applies in specific notified cases such as services from unregistered suppliers, legal services, and GTA services. The recipient must self-invoice and pay GST directly.',
  },
  {
    question: 'How to make GST number?',
    answerHtml: `<p>To make/get a GST number: Visit <strong>gst.gov.in</strong> → Services → Registration → New Registration. You need: PAN card, Aadhaar card, business address proof, bank account details, and a digital photograph. Businesses with annual turnover above ₹40 lakh (₹20 lakh for services, ₹10 lakh for special category states) must register. Voluntary registration is also allowed below the threshold.</p>`,
    answerText: 'To get a GST number: Visit gst.gov.in → Services → Registration → New Registration. Required: PAN, Aadhaar, address proof, bank details. Mandatory if turnover exceeds ₹40 lakh (goods) or ₹20 lakh (services). Voluntary registration is also allowed.',
  },
  {
    question: 'When was GST implemented in India?',
    answerHtml: `<p>GST was implemented in India on <strong>1 July 2017</strong>, following the passage of the Constitution (101st Amendment) Act, 2016. It was introduced at midnight on 30 June–1 July 2017 in a special session of Parliament.</p>`,
    answerText: 'GST was implemented in India on 1 July 2017, following the passage of the Constitution (101st Amendment) Act, 2016. It was introduced at midnight on 30 June–1 July 2017 in a special session of Parliament.',
  }
];

export default faqs;
