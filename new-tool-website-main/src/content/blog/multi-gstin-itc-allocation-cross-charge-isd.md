---
title: "Multi-GSTIN ITC Allocation: Cross Charge vs Input Service Distributor (ISD) Rules 2026"
description: "Master multi-state GST compliance for enterprise operations. Understand mandatory ISD registration under Section 20, Cross Charge mechanisms for common employee costs, and Rule 39 allocation formulas."
pubDate: "2026-09-14"
updatedDate: "2026-09-14"
heroImage: "/images/blog/state-codes-in-gstin.webp"
tags: ["Multi-GSTIN", "ISD", "Cross Charge", "Enterprise Compliance", "ITC Allocation"]
---

For multi-state corporate entities operating across India—such as manufacturing companies with factories in Gujarat, warehouses in Maharashtra, and corporate headquarters in Bengaluru—Input Tax Credit (ITC) allocation is one of the most litigated and scrutinized compliance areas under GST law.

When the head office (HO) incurs massive common expenditures—such as centralized cloud servers (AWS/GCP), nationwide marketing campaigns, SAP ERP licenses, or top management salaries—how should the associated input tax credits and expenses be legally distributed to the operating branch offices (BOs)?

With the **statutory mandate for Input Service Distributor (ISD) registration enacted under the amended Section 20 of the CGST Act**, the optional era has ended.

In this guide, we break down the definitive differences between **Cross Charge** and **Input Service Distribution (ISD)**, the mandatory registration rules, and how to allocate ITC without litigation.

---

## Split Multi-GSTIN Vendor Invoices Effortlessly

Need to distribute vendor invoices across multiple state GSTINs according to turnover or consumption ratios? Use our **[Multi-GSTIN Invoice Splitter Tool](/multi-gstin-invoice-splitter)** to generate state-wise allocation schedules instantly.

---

## Core Definitions: Distinct Persons under GST

Under **Section 25(4) of the CGST Act**, establishments of the same legal entity (same PAN) holding separate GST registrations in different States or Union Territories are legally treated as **"Distinct Persons"**.

### Crucial Legal Consequence:
Under **Schedule I (Entry 2)** to the CGST Act, supply of goods or services between distinct persons **is treated as a taxable supply even if made without consideration**. Therefore, internal transfers, administrative support, and centralized services rendered by the Head Office to its branch offices are fully taxable under GST.

---

## Direct Comparison: ISD vs Cross Charge

| Parameter | Input Service Distributor (ISD) | Cross Charge Mechanism |
|---|---|---|
| **Governing Provision** | Section 20 read with Rule 39 | Section 7 read with Schedule I (Entry 2) |
| **Applicability** | Inward third-party **input services** billed to Head Office (e.g., software, consulting, cloud hosting). | **Internally generated services** provided by HO to branches (e.g., HR, accounting, CEO salary, legal oversight). |
| **Registration Required?** | **Mandatory Separate Registration** as an ISD entity under Section 24(viii). | Executed through the standard normal GSTIN of the Head Office. |
| **Distribution Document** | **ISD Invoice** issued under Rule 54(1) through **Form GSTR-6**. | Standard **Tax Invoice** issued under Section 31 through **Form GSTR-1**. |
| **Covers Goods / Capital Goods?** | **No.** Only covers third-party services. | Can cover both services and internally transferred goods. |
| **ITC Flow to Branches** | Appears in branch **GSTR-2B** under "ISD Credit" (Table 4(A)(4) of GSTR-3B). | Appears in branch **GSTR-2B** as regular B2B inward supply (Table 4(A)(5)). |

---

## The Mandatory ISD Amendment to Section 20

Following the recommendations of the 50th and 52nd GST Council meetings and subsequent legislative notification, **Section 20 was officially amended to make ISD registration mandatory**:

### Key Changes:
- Previously, many multi-state corporates avoided ISD registration by adopting pure "Cross Charge" tax invoicing for third-party services.
- Under the amended law, any office of a supplier which receives tax invoices issued under Section 31 towards the receipt of input services for or on behalf of distinct persons **MUST obtain registration as an ISD** and distribute the input tax credit using the statutory ISD formula.
- Continuing to use regular cross-charge tax invoices for third-party common services now violates Section 20 and can lead to ITC disallowances at the receiving branch offices.

---

## How Rule 39 ISD Allocation Works: The Formula

Under **Rule 39 of the CGST Rules**, input tax credit is distributed across recipient branches based on their turnover:

$$\text{ITC Distributed to Branch } i = \text{Total Common ITC} \times \left( \frac{\text{Turnover of Branch } i \text{ in State}}{\text{Aggregate Turnover of all operational recipient branches}} \right)$$

### Key Rules of ISD Distribution:
1. **Direct Attributable Services:** If an input service is attributable **exclusively to one branch** (e.g., local state SEO agency for Karnataka), the credit must be distributed **only to that specific branch**.
2. **Common Services:** If an input service benefits multiple branches (e.g., nationwide TV advertising or global ERP license), the credit must be distributed **pro-rata based on the turnover** of the respective operational recipient states during the preceding financial year.
3. **Credit Nature Preservation:** CGST + SGST incurred in the same state as HO is distributed as CGST + SGST. If distributed to a branch in another state, it is converted and distributed as **IGST**.

---

## Cross Charge for Internally Generated Services (The Circular 199 Relief)

What about the cost of top executives, internal HR managers, internal audit teams, and IT staff sitting at the corporate headquarters?

Following intense litigation, **CBIC Circular No. 199/11/2023-GST** provided major clarification:
- **Where Full ITC is Available to the Branch:** If the recipient branch office is entitled to claim **full Input Tax Credit** (i.e., makes only taxable supplies), the value declared in the tax invoice by the Head Office is **deemed to be the open market value** under the second proviso to Rule 28.
- **Inclusion of Salary Costs:** In such cases, the Head Office is **not required to include the cost of employee salaries** in the value of services cross-charged to branch offices.
- However, if the recipient branch supplies exempt goods/services (where full ITC is not available), the Head Office must include an allocation of all costs, including internal salaries, in computing the taxable cross charge value.

---

## Frequently Asked Questions (FAQs)

### What return does an Input Service Distributor file?
An ISD must file a specialized monthly return in **Form GSTR-6** on or before the **13th of the following month**, based on auto-drafted invoices in **Form GSTR-6A**.

### Can an ISD distribute credit of Capital Goods?
No. Section 20 and Rule 39 restrict ISD distribution strictly to **Input Services**. If the Head Office purchases capital equipment (such as laptops or servers) for branch offices, the vendor must bill the respective branch GSTIN directly, or the HO must move the asset to the branch via a delivery challan / tax invoice under cross-charge provisions.
