---
title: "Invoice Management System (IMS) GST Guide 2026: Accept, Reject, Pending"
description: "Everything you need to know about the mandatory Invoice Management System (IMS) under GST in 2026. Learn how to manage your GSTR-2B ITC workflows."
heroImage: "/images/blog/invoice-management-system-ims-gst-guide-2026.png"
pubDate: "2026-06-26"
tags: ["IMS", "ITC", "Compliance"]
---

The GST compliance landscape shifted dramatically in early 2026 with the mandatory enforcement of the **Invoice Management System (IMS)**. Gone are the days when you could passively wait for your GSTR-2B to generate and simply claim the auto-populated Input Tax Credit (ITC).

Under the new regime, the GST portal demands active participation. You must explicitly interact with the invoices uploaded by your suppliers before you file your GSTR-3B. If you ignore the IMS dashboard, you risk losing your ITC or facing automated tax notices.

In this comprehensive guide, we will break down exactly how the IMS works, what the "Accept, Reject, Pending" statuses mean, and how you can streamline your monthly ITC reconciliation process.

---

## 1. What is the Invoice Management System (IMS)?

The IMS is a dedicated facility on the official GST portal designed to give taxpayers greater control over their inward supplies. Previously, if a supplier uploaded a fake invoice, or an invoice with an incorrect tax amount, it would auto-populate in your GSTR-2B. Reversing it was a manual, cumbersome process in GSTR-3B.

The IMS intercepts this data *before* it finalizes in your GSTR-2B. When your supplier files their GSTR-1, IFF, or GSTR-1A, the invoices appear on your IMS dashboard. You are then required to take an action on each invoice.

### Why was IMS made mandatory?
The government introduced the IMS to tackle the menace of fake invoicing and to reduce ITC-related litigation. By forcing the recipient to "Accept" or "Reject" an invoice, the government creates a robust, real-time audit trail that binds both the supplier and the buyer.

---

## 2. Understanding the Core Actions: Accept, Reject, Pending

When you log into the IMS dashboard, you must classify each inbound invoice, debit note, or credit note into one of three categories:

### A. Accept
- **What it means:** You agree that the invoice is correct, the goods/services have been received, and you are eligible to claim the ITC.
- **What happens:** The invoice will flow into your GSTR-2B for the current tax period, and the ITC will be auto-populated in your GSTR-3B.
- **Important Note:** If you take *no action* on an invoice by the time GSTR-2B is generated (usually the 14th of the month), the portal will automatically treat it as **"Deemed Accepted."** This is dangerous if your supplier has made an error.

### B. Reject
- **What it means:** The invoice does not belong to you, the amount is completely wrong, or it's a fake invoice.
- **What happens:** The invoice will flow into the "ITC Rejected" section of your GSTR-2B. It will *not* be available for you to claim in GSTR-3B. 
- **The Supplier's View:** Your supplier will be able to see that you rejected the invoice, allowing them to issue a credit note or amend their GSTR-1 in the subsequent month.

### C. Pending
- **What it means:** The invoice is valid, but you are not yet eligible to claim the ITC (e.g., the goods are still in transit, or you have not yet paid the supplier within the 180-day rule).
- **What happens:** The invoice is "parked." It will not appear in the current month's GSTR-2B. It will roll over to the next month's IMS dashboard, where you can choose to "Accept" it once the conditions for claiming ITC are met.

---

## 3. How to Use the IMS Dashboard (Step-by-Step)

Managing the IMS does not have to be a nightmare if you follow a structured monthly workflow.

### Step 1: Access the Dashboard
Log in to the GST Portal (www.gst.gov.in). Navigate to **Dashboard > Services > Returns > Invoice Management System (IMS) Dashboard**. 

### Step 2: Review Inward Supplies
You will see a list of all invoices uploaded by your suppliers. The dashboard allows you to filter by Supplier GSTIN, Invoice Date, or Document Type.

> **Tool Tip:** Need to verify if your supplier's GSTIN is actually active or if it has been cancelled? Use our offline [GSTIN Validator](/gstin-validator) to instantly decode their GSTIN structure and state code.

### Step 3: Take Action
For low-volume businesses, you can select the action (Accept/Reject/Pending) individually via the web interface. For high-volume businesses, the GST portal provides an **Excel-based offline tool**. You can download your invoice JSON, bulk-assign statuses in Excel, and upload the JSON back to the portal.

### Step 4: GSTR-2B Generation
On the 14th of the month, the portal takes a "snapshot" of your IMS actions and generates your GSTR-2B. 

### Step 5: Final Adjustments
If you made a mistake (e.g., accidentally accepted an invoice you meant to reject), you can change the status in the IMS *even after* the GSTR-2B is generated, provided you haven't filed your GSTR-3B yet. If you change a status, you can trigger a "Recompute GSTR-2B" action to update your final ITC figures.

---

## 4. Special Scenarios & 2026 Updates

The IMS received several critical upgrades in early 2026 to handle complex business scenarios:

### Handling Credit Notes
Initially, credit notes were confusing in the IMS. Now, the system allows you to "Accept," "Reject," or keep a credit note "Pending." If you accept a credit note, the corresponding ITC will be reversed in your GSTR-3B. The 2026 update also allows you to manually edit the ITC reversal amount associated with a credit note if partial reversals apply.

### Import of Goods (BoE)
Bills of Entry (BoE) from ICEGATE are now integrated into the IMS. You must accept these records to claim IGST paid on imports.

### Adding Remarks
When you "Reject" or mark an invoice as "Pending," you can now add standardized remarks from a dropdown menu (e.g., "Goods not received," "Tax amount mismatch"). This communicates the exact issue back to your supplier.

---

## 5. Best Practices to Avoid ITC Loss

To ensure you don't lose money to compliance errors, implement these habits:

1. **Never Rely on Deemed Acceptance:** Set a strict internal deadline (e.g., the 10th of every month) to actively review the IMS. Deemed acceptance of a flawed invoice can lead to Section 73/74 demand notices for wrongful ITC availing.
2. **Reconcile Continuously:** Don't wait until the end of the month. Ask your accounting team to reconcile purchase registers with the IMS weekly.
3. **Communicate with Suppliers:** If you reject an invoice, immediately notify your supplier outside the portal as well, so they know they need to issue an amendment or credit note.
4. **Track "Pending" Invoices Carefully:** Keep an internal aging report of "Pending" invoices. You have a legal time limit (typically November 30th of the following financial year) to claim ITC. If an invoice stays pending too long, it will expire.

If you are dealing with complex ITC reversal calculations (like Rule 42 for exempt/taxable supplies), make sure you check your math using our [ITC Reversal Checker](/itc-reversal-checker) before finalizing your GSTR-3B.

---

## Summary

The Invoice Management System is no longer an optional feature—it is the heartbeat of GST compliance in 2026. By shifting from a passive "auto-population" mindset to an active "accept/reject" workflow, businesses can significantly reduce their risk of litigation and ensure they claim every rupee of valid ITC.

Adapt your internal accounting processes today, utilize the bulk offline tools if your volume is high, and never let the portal default to "Deemed Acceptance" blindly.

---

### Related Tools for Your Business
- [ITC Reversal Checker](/itc-reversal-checker)
- [Input Tax Credit (ITC) Calculator](/itc-calculator)
- [GSTIN Validator](/gstin-validator)
- [GST Due Dates Calendar](/gst-due-dates)
