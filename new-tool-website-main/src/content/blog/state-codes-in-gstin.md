---
title: "Understanding State Codes in the 15-Digit GSTIN Format"
description: "Learn how the first two digits of a GST number represent the Indian State. Use our GSTIN Validator to instantly decode the state of any business."
heroImage: "/images/blog/state-codes-in-gstin.webp"
pubDate: "2026-06-18"
tags: ["GSTIN Validator", "Fraud Prevention"]
---

Have you ever wondered why every GST number in Maharashtra starts with `27`, while every number in Delhi starts with `07`? The Indian Goods and Services Tax Identification Number (GSTIN) is not just a random string of 15 characters; it is a highly structured code.

Decoding this code is crucial for businesses, especially when determining whether to charge CGST/SGST (intra-state) or IGST (inter-state) on an invoice. You can decode and verify any GST number instantly using our [GSTIN Validator](/gstin-validator).

## The Role of the First Two Digits

The first two digits of a 15-digit GSTIN represent the **State Code** as defined under the Indian Census of 2011. Since GST is a destination-based tax, knowing the supplier's and the recipient's state is fundamental to compliance.

If your business is located in Karnataka (State Code 29) and your buyer's GSTIN also starts with `29`, the transaction is intra-state. You must charge CGST and SGST. If the buyer's GSTIN starts with `33` (Tamil Nadu), the transaction is inter-state, and you must charge IGST. 

*(If you are unsure of the exact tax split amounts, use our [GST Calculator](/gst-calculator) to get instant figures).*

## Common GST State Codes

Here is a quick reference for some of the most common state codes in India:
- **07** - Delhi
- **09** - Uttar Pradesh
- **19** - West Bengal
- **24** - Gujarat
- **27** - Maharashtra
- **29** - Karnataka
- **33** - Tamil Nadu
- **36** - Telangana

## Why State Code Mismatches are Red Flags

When verifying a new vendor's invoice, always look at the address printed on the bill and compare it to the GSTIN.
If a vendor provides an invoice with an address in Mumbai, Maharashtra, but their GSTIN starts with `09` (Uttar Pradesh), **do not process the payment immediately**. This is a major red flag for potential tax fraud.

To perform a thorough check:
1. Enter the number into our [GSTIN Validator](/gstin-validator).
2. The tool will mathematically verify the checksum and instantly display the associated state name.
3. If the state does not match the billing address, contact the vendor for clarification.

## Complete the Verification Loop

Checking the state code is just one part of due diligence. You must also ensure the embedded PAN (characters 3 to 12) matches the vendor's legal identity. Furthermore, before claiming Input Tax Credit, always verify the active status of the registration on the official [GST Portal](https://www.gst.gov.in/).

By integrating a quick GSTIN validation into your accounting workflow, you protect your business from compliance headaches and ensure your [GST Return Due Dates](/gst-due-dates) are met without ITC reversals.
