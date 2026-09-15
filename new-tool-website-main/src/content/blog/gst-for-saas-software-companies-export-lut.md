---
title: "GST for SaaS & Software Companies in India: Export under LUT, Domestic 18% & OIDAR Rules"
description: "Master GST compliance for B2B and B2C software & SaaS companies in India. Learn the 5-point export test under Section 2(6), Letter of Undertaking (LUT) workflows, Stripe/PayPal setup, and OIDAR rules."
pubDate: "2026-09-09"
updatedDate: "2026-09-12"
heroImage: "/images/blog/gst-offline-tool-guide.webp"
tags: ["SaaS", "Software Exports", "LUT", "OIDAR", "IT Industry"]
---

India has emerged as the global powerhouse for Software-as-a-Service (SaaS) and cloud software exports. However, navigating the GST regime for software products requires managing complex place of supply rules, international payment gateways, and recurring subscription models.

Is cloud software considered a good or a service? How should Stripe or Paddle subscription revenues be accounted for? When is an Indian SaaS company liable to charge 18% GST to overseas users?

In this guide, we break down the end-to-end GST framework for Indian SaaS startups and software developers.

---

## Validate Your SaaS Export Eligibility

Before shipping software licenses or cloud subscriptions abroad under 0% tax, test your contract terms against the 5 statutory conditions of Section 2(6) using our **[SaaS Export LUT Calculator](/saas-export-lut-calculator)**.

---

## Software Classification: Goods vs Services under GST

Under the GST regime, the classification of software is governed by **Schedule II of the CGST Act**:

- **Software as a Service (SaaS), Cloud Software & Custom Code:** Expressly classified as a **Supply of Services** under **SAC 998314** (Information technology software services) or **SAC 998315** (Hosting and infrastructure services).
- **Packaged Software on Physical Media:** If shrink-wrapped software is sold off-the-shelf on a physical CD/flash drive without developer customization, it is treated as a supply of goods under **HSN 8523**.
- **Standard Tax Rate:** Both domestic SaaS subscriptions and custom software development attract **18% GST** (9% CGST + 9% SGST or 18% IGST).

---

## SaaS Exports: Zero-Rated Supply under Section 16

When an Indian SaaS company licenses software to overseas customers in the US, Europe, or Southeast Asia, the transaction qualifies as a **Zero-Rated Supply of Services** under Section 16 of the IGST Act.

### The 5 Statutory Tests of Section 2(6):
To export at 0% GST without paying 18% tax upfront, your operations must strictly fulfill all five conditions:
1. **Supplier Location:** The SaaS entity is located in India.
2. **Recipient Location:** The subscriber / enterprise buyer is outside India.
3. **Place of Supply:** Outside India (governed by default Section 13(2) rules where recipient address is abroad).
4. **Convertible Foreign Exchange:** Payment is realized in USD, EUR, GBP, or approved Vostro INR accounts.
5. **Distinct Persons:** The customer is an independent third party, not a mere foreign branch or unincorporated liaison office.

### The Letter of Undertaking (LUT) Workflow:
1. File **Form GST RFD-11** on the GST portal at the start of each financial year (prior to April 1st).
2. Generate export invoices displaying your GSTIN, foreign client details, and the mandatory declaration:  
   *"Supply meant for export under Letter of Undertaking without payment of Integrated Tax (IGST)."*
3. Report export revenues under **Table 6A of GSTR-1** and **Table 3.1(b) of GSTR-3B**.
4. Claim 100% refund of unutilized ITC (accumulated on AWS/GCP servers, laptops, and developer tools) via **Form RFD-01 under Rule 89(4)**.

---

## Merchant of Record (MoR): Stripe, Paddle & Lemon Squeezy

Many Indian SaaS founders use Merchant of Record (MoR) platforms like **Paddle**, **Lemon Squeezy**, or **FastSpring** to sell globally. How does this affect GST?

### Direct Gateway (Stripe India / Razorpay) vs MoR (Paddle):
- **With Stripe / Razorpay:** You are the direct seller. You invoice the customer. If the customer is in India, you charge 18% GST. If overseas, you export under LUT at 0% GST.
- **With Paddle / Lemon Squeezy (MoR):** You legally sell your software to the MoR entity (located in the UK or USA) as a single B2B export transaction under LUT. The MoR then resells it to the end consumer, handling local sales taxes (VAT in Europe, Sales Tax in US states). This dramatically simplifies indirect tax compliance for Indian founders.

---

## The OIDAR Threat: Selling B2C SaaS in India

If your SaaS product serves domestic retail consumers or non-GST registered individuals in India (B2C), the service qualifies as **Online Information and Database Access or Retrieval (OIDAR) Services** under Section 2(17) of the IGST Act:
- You **must charge 18% GST** on all Indian B2C subscriptions.
- If your SaaS operates through an overseas holding entity (e.g., in Delaware or Singapore) but sells to non-taxable online recipients in India, that overseas entity is legally mandated to obtain a **Simplified OIDAR GST Registration** in India and remit 18% IGST directly to the Indian treasury.

---

## Frequently Asked Questions (FAQs)

### Can an Indian SaaS company claim ITC on AWS or Google Cloud hosting?
Yes! Inward invoices from AWS India (Amazon Internet Services Pvt Ltd) or Google Cloud India carry 18% GST. You can claim **100% Input Tax Credit** on these cloud hosting bills. If you export your SaaS, you can recover this credit as a cash refund via Form RFD-01.

### Are setup and implementation fees treated as part of the SaaS export?
Yes. Where professional implementation, onboarding, and customization services are bundled naturally with the core SaaS subscription for an overseas enterprise client, the entire contract is treated as a composite zero-rated export supply under Section 2(30).
