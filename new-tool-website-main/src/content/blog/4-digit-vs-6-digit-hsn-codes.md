---
title: "4-Digit vs 6-Digit HSN Codes: What is the Rule for 2026?"
description: "Understand the GST 4-digit and 6-digit HSN/SAC invoice rules, the ₹5 crore turnover threshold, B2C exceptions and GSTR-1 Table 12 reporting."
pubDate: "2026-06-18"
updatedDate: "2026-09-25"
heroImage: "/images/blog/4-digit-vs-6-digit-hsn-codes.webp"
tags: ["HSN Code", "Invoicing", "Compliance", "GST Updates"]
---

GST invoices use HSN codes for goods and SAC codes for services. The number of digits normally required on the invoice depends on the supplier's aggregate turnover in the **preceding financial year**, under Notification No. 78/2020-Central Tax. The code helps identify a classification; it does not by itself determine the tax rate or resolve every classification question.

Use the [HSN/SAC Lookup](/hsn-code-lookup) to research a code and the [Invoice Generator](/invoice-generator) to prepare an invoice layout. Verify the final classification and rate against the current tariff and notification before issuing the document.

## The 4-digit and 6-digit rule

| Aggregate turnover in preceding financial year | Usual minimum HSN/SAC digits on a tax invoice | B2C invoice treatment |
| --- | --- | --- |
| Up to ₹5 crore | 4 digits | The notification allows the supplier not to mention the required digits on invoices to unregistered persons. |
| More than ₹5 crore | 6 digits | The 6-digit requirement applies to invoices, including supplies to unregistered persons. |

The threshold is measured using aggregate turnover for the preceding financial year, not the value of one invoice or only the current month's sales. Check the notification and any applicable special direction for the specific taxpayer or supply.

## HSN for goods and SAC for services

**HSN** classifies goods. **SAC** classifies services under the GST service classification scheme. GST invoice digit requirements use the same turnover bands for HSN and SAC reporting, but an HSN code must not be used as a substitute for a service classification.

A code is one part of the tax analysis. The full description, tariff notes, supply facts, exemptions and rate notifications may affect classification and tax treatment. For example, a broad product name such as “software” or “phone accessory” may not identify the correct code or rate on its own.

## 8-digit codes and customs

Eight-digit tariff items are used in India's Customs Tariff for detailed goods classification. An 8-digit customs tariff item is not a universal GST invoice requirement for every domestic transaction; the GST invoice digit minimum follows the turnover rule above unless a specific applicable requirement says otherwise. Do not create a six-digit code by simply cutting the last two digits from an eight-digit code: the resulting code may not be a valid tariff entry.

## GSTR-1 Table 12 is a separate reporting step

The invoice rule and the portal's return-table workflow are related but distinct. GSTR-1 Table 12 reports an HSN/SAC-wise summary of outward supplies. GSTN's current guidance describes separate B2B and B2C tabs from the May 2025 return period and sets out the portal's HSN selection and validation behavior. Its advisory says B2C HSN reporting is not mandatory in Table 12 at present; confirm the live form and latest advisory when filing.

Do not assume every HSN warning blocks filing. GSTN's advisory describes some Table 12 value checks as warning-mode validations, while the current portal may enforce other field and code requirements. Follow the error or warning shown for the actual return period and correct a code using the official code list rather than inventing or truncating one.

## Practical checks before issuing an invoice

1. Decide whether the supply is goods, services or a composite/mixed supply; choose the appropriate classification process.
2. Determine the supplier's aggregate turnover for the preceding financial year.
3. Apply the 4-digit or 6-digit invoice requirement and check the B2C exception where relevant.
4. Select a valid code and description from the GST tariff or official portal; do not guess from a search result alone.
5. Verify the rate and any conditions using the [GST Rate Finder](/gst-rate-finder). Use the [GST Calculator](/gst-calculator) only for the arithmetic after the correct rate is established.
6. Reconcile the invoice summary with GSTR-1 Table 12 and the applicable return period in the [GST Due Dates Calendar](/gst-due-dates).

## Frequently asked questions

### My turnover is ₹3 crore. Do I need an HSN/SAC code on a B2C invoice?

For a supplier with preceding-year aggregate turnover up to ₹5 crore, Notification 78/2020 permits omission of the required digits on a tax invoice to an unregistered person. The supplier still needs to classify and report the supply correctly where applicable.

### My turnover is above ₹5 crore. How many digits should the invoice show?

The general minimum is 6 digits for HSN or SAC on invoices. Check whether a special rule applies to your transaction.

### Does a valid HSN code always give me the correct GST rate?

No. Classification, the complete product or service description, tariff notes, exemptions and the applicable rate notification all matter. Confirm the rate separately.

### Do services use HSN or SAC?

Services are classified using SAC. Goods use HSN. Use the code system that matches the actual supply.

### Is an 8-digit HSN required on every GST invoice?

No. The ordinary GST invoice minimum is 4 or 6 digits based on the preceding-year turnover rule. Customs declarations can require a more detailed tariff item for imports and exports.

### Is the HSN field in GSTR-1 Table 12 the same as the invoice rule?

They are related but not identical. Table 12 has its own portal workflow and validation guidance; check the live GSTN advisory for the period being filed.

## Official references

- [Notification No. 78/2020-Central Tax](https://gstcouncil.gov.in/sites/default/files/2024-05/notfctn-78-central-tax-english-2020.pdf) — invoice digit thresholds and the B2C exception for turnover up to ₹5 crore.
- [GSTN advisory on HSN reporting in Table 12](https://tutorial.gst.gov.in/downloads/news/updated_advisory_hsn_table12_25042025.pdf) — phase 3, B2B/B2C tabs and current validation guidance.
- [GST Portal GSTR-1 guide](https://tutorial.gst.gov.in/userguide/returns/Creation_of_Outward_Supplies_Return_in_GSTR-1.htm) — return-table filing workflow.
- [CBIC invoice rules](https://cbic-gst.gov.in/gst-invoice-rules.html) — invoice particulars under the CGST Rules.

This article is general information. A code search result is a research aid, not a binding classification decision for a particular product or service.
