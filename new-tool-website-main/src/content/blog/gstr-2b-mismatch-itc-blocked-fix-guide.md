---
title: "GSTR-2B Mismatches: Why Your ITC is Blocked & How to Fix It in 2026"
description: "Is your Input Tax Credit blocked due to a GSTR-2B mismatch? Learn the new 2026 rules, how to respond to ASMT-10 notices, and strategies to unblock your ITC."
pubDate: "2026-06-19"
heroImage: "/images/blog/gstr-2b-mismatch-itc-blocked-fix-guide.webp"
tags: ["Input Tax Credit", "GSTR-2B", "Compliance", "Notices"]
---

Input Tax Credit (ITC) is the lifeblood of working capital for any GST-registered business in India. However, since the introduction of GSTR-2B, the era of provisional ITC claims is officially over. 

In 2026, the GST Network (GSTN) enforces a draconian hard-lock system: **If an invoice is not visible in your GSTR-2B, you cannot claim the ITC.** Period. 

Even minor discrepancies between your purchase register and the auto-populated GSTR-2B can result in your ITC being blocked, followed swiftly by an automated ASMT-10 scrutiny notice. This guide explains why these mismatches happen and the exact steps you must take to unblock your money.

## What is GSTR-2B?

GSTR-2B is an auto-drafted, static ITC statement generated on the 14th of every month. It provides a definitive summary of the eligible and ineligible ITC available to you, based entirely on the GSTR-1, IFF, and GSTR-5 returns filed by your suppliers.

Unlike GSTR-2A (which is dynamic and changes if a supplier files a late return), GSTR-2B is locked for that specific month.

## The Top 3 Causes of GSTR-2B Mismatches

If your accounting software says you have ₹5 Lakhs in ITC, but your GSTR-2B only shows ₹3 Lakhs, where did the ₹2 Lakhs go? Here are the usual culprits:

### 1. Supplier Default (The Most Common)
Your vendor generated an invoice and collected the GST from you, but they simply failed to file their GSTR-1 by the 11th of the month. Because they missed the deadline, the invoice will not flow into your current month's GSTR-2B. You cannot claim this ITC until the *next* month when (and if) they finally file.

### 2. Wrong GSTIN Entered
Your vendor filed their GSTR-1 on time, but they made a typo and entered the wrong GSTIN (perhaps billing it to your branch in another state, or a completely different company). The ITC is now sitting in someone else's GSTR-2B.

### 3. B2C Classification Error
Your vendor entered your correct GSTIN on the physical invoice, but when uploading the data to the GST portal, their accountant accidentally uploaded your transaction under the "B2C" (Business to Consumer) table instead of the "B2B" table. B2C sales do not transmit ITC to the buyer.

## How to Fix Blocked ITC in 2026

If you discover a mismatch *before* filing your GSTR-3B, you must take immediate action. You can no longer claim the missing ITC and wait for the vendor to fix it later. 

### Step 1: Use the Invoice Management System (IMS)
In 2026, the government mandates the use of the new Invoice Management System (IMS). If an invoice is missing from your dashboard, you can use the IMS communication tool to send a formal "Missing Invoice" ping directly to your supplier's portal. This acts as an official record that you attempted to reconcile the discrepancy.

### Step 2: Withhold Vendor Payments
Update your vendor contracts immediately. Add a strict clause: *“Payment of the GST component of any invoice will only be released after the invoice successfully reflects in the buyer's GSTR-2B.”* If a vendor fails to file, withhold the 18% tax component from their payout.

### Step 3: Amend Next Month
If the vendor fixes the error (e.g., they amend the B2C entry to B2B in their next GSTR-1), the ITC will flow into your *subsequent* month's GSTR-2B. You can legally claim it then. 

## Responding to an ASMT-10 Notice

If you claimed ITC in your GSTR-3B that exceeds your GSTR-2B limit (perhaps due to an old 2023 practice), the system will issue an ASMT-10 notice. 

**Do not ignore it.** 
1. **Reconcile:** Identify the specific invoices causing the excess claim.
2. **Reverse:** If you claimed ineligible ITC, you must reverse it immediately and pay it back in cash along with 18% interest using Form DRC-03.
3. **Reply:** File a reply via Form ASMT-11 within 30 days, attaching your reconciliation statement and proof of DRC-03 payment.

## Conclusion

Manual reconciliation is impossible for businesses with hundreds of purchase invoices. To avoid blocked working capital, you must use automated reconciliation tools that instantly compare your ERP purchase register against the JSON data of your GSTR-2B. Always verify your vendor's filing status using our free [GSTIN Validator](/gstin-validator) before issuing massive purchase orders.


## Related Tools
- [Pricing - Free GST Tools](/pricing)
- [GSTR-9 Annual Return Filing Checklist (FY 2025-26)](/gstr-9-annual-return-checklist)
