---
title: "Pin to Pin Distance for E-Way Bill: NIC Rules, 10% Variation Limit & How to Calculate"
description: "Master pin-to-pin distance calculation for GST E-Way Bills. Understand the NIC algorithm, 10% tolerance limit, validity computation, and how to avoid transit penalties."
pubDate: "2026-08-25"
updatedDate: "2026-09-12"
heroImage: "/images/blog/e-way-bill-rules-2026.webp"
tags: ["E-Way Bill", "Pin to Pin Distance", "Logistics", "GST Compliance"]
---

When generating a GST E-Way Bill under Rule 138 of the CGST Rules, entering the exact transit distance between the dispatch place and delivery location is not optional — it directly determines the **validity period** of the E-Way bill. An under-calculated distance causes premature expiry and risks vehicle detention u/s 129, while an over-calculated distance flags anti-evasion scrutinies.

To eliminate arbitrary entries, the National Informatics Centre (NIC) integrated an automated **Pin-to-Pin distance calculation engine** directly into the E-Way Bill portal ([ewaybillgst.gov.in](https://ewaybillgst.gov.in)). 

In this comprehensive guide, we explain how the NIC portal computes distance, what statutory variation is permitted, and how to use our free **[Pin to Pin Distance Calculator](/pin-to-pin-distance-calculator)** to ensure 100% compliant e-way bills.

---

## What is Pin-to-Pin Distance in GST?

Pin-to-Pin distance refers to the statutory road distance in kilometers between:
1. The **Postal PIN Code of Dispatch** (Supplier / Warehouse / Factory location)
2. The **Postal PIN Code of Delivery** (Customer / Consignee / Port / Job-worker location)

Under the GST e-way bill system, this distance automatically dictates how many days or hours the transporter has to deliver the goods before the e-way bill expires.

Need to calculate distance right now? Use our free **[Pin to Pin Distance Calculator](/pin-to-pin-distance-calculator)** to estimate road distances between any two Indian postal codes instantly.

---

## How Does the NIC Portal Calculate Distance?

The e-way bill system uses an automated database populated from:
- National Highway Authority of India (NHAI) road network data
- Survey of India cartographic maps
- Geographic Information System (GIS) mapping of pin codes across all 28 states and 8 union territories

When you input the dispatch PIN code and recipient PIN code on the portal, the system queries this database and pre-fills the distance in kilometers.

### Key Rules of the Distance Engine:
1. **Shortest Motorable Route**: The distance is calculated based on the shortest, motorable paved road network between the centroid coordinates of both postal codes.
2. **Within Same PIN Code**: If dispatch and delivery share the same 6-digit PIN code, the portal defaults the distance to **1 km to 10 km** depending on urban density.
3. **No Air / Rail Distance**: For road transport, the engine only accounts for motorable highway and arterial road kilometers.

---

## The 10% Distance Variation Rule (Statutory Tolerance)

Because trucks often take ring roads, bypass toll congestions, or follow designated freight corridors, the actual route taken by the driver might differ from the NIC portal's algorithmic line.

To address this practical reality, the CBIC permits a **10% variation tolerance**:
- Taxpayers may increase the distance auto-populated by the portal by up to **+10%**.
- For example, if the NIC portal auto-populates **500 km**, the consignor or transporter can manually enter any value between **450 km and 550 km** without triggering an error.
- If your actual route exceeds the auto-populated distance by more than 10% (e.g. due to bridge collapses, landslides, or state highway diversions), the portal allows manual override with a logged justification in Part-B.

---

## E-Way Bill Validity by Distance (Updated 2026 Rules)

Under Rule 138(10) of the CGST Rules, validity is calculated as follows:

| Type of Cargo | Distance Slab | Validity Period |
|---|---|---|
| **Regular Cargo** (Normal trucks, containers, tempos) | Up to 200 km | 1 Day |
| **Regular Cargo** | Every additional 200 km (or part thereof) | +1 Additional Day |
| **Over-Dimensional Cargo (ODC)** / Multimodal | Up to 20 km | 1 Day |
| **Over-Dimensional Cargo (ODC)** | Every additional 20 km (or part thereof) | +1 Additional Day |

### Worked Example:
- **Route**: New Delhi (110001) to Mumbai (400001)
- **Distance**: ~1,420 km
- **Validity for Normal Cargo**:
  - First 200 km = 1 Day
  - Remaining 1,220 km = 1,220 / 200 = 6.1 days → rounded up to 7 days
  - **Total Validity** = 1 + 7 = **8 Days**

Check your exact validity window using our **[E-Way Bill Validity Calculator](/eway-bill-validity)**.

---

## How to Handle Common Pin-to-Pin Distance Errors

### 1. Distance Shows "0" on the Portal
If the portal displays "0 km" after entering both PIN codes, it indicates that the specific pair has not yet been mapped in the NIC central database.
- **Action**: You are legally permitted to enter the actual motorable road distance manually. Use Google Maps or our **[Pin to Pin Distance Calculator](/pin-to-pin-distance-calculator)** and keep a route printout with the transit driver.

### 2. PIN Code Blocked or Invalid
If either PIN code is marked as "Invalid", verify the state code prefix. The first two digits of the PIN code must match the delivery state:
- Northern States (Delhi, Haryana, Punjab): 11 - 16
- Western & Central (UP, MP, Rajasthan, Gujarat, Maharashtra): 20 - 44
- Southern (Karnataka, Tamil Nadu, Kerala, AP, Telangana): 50 - 69
- Eastern (West Bengal, Odisha, Bihar, Assam, North-East): 70 - 79

Use our **[GST State Code Directory](/gst-state-codes)** to cross-reference states with valid codes.

### 3. Expiry in Transit (Breakdown or Jam)
If the truck suffers a mechanical failure or severe delay and the validity period is about to expire, Rule 138(10) allows the transporter to extend the validity:
- **Extension Window**: Within **8 hours before** or **8 hours after** the expiry time.
- **Requirement**: Update Part-B with the current vehicle location and reason for extension.

---

## Internal Checklists for Dispatches Above ₹50,000

Before releasing a consignment:
1. Verify if the consignment value exceeds the mandatory threshold using our **[E-Way Bill Limit Checker](/eway-bill-limit-checker)** (₹50,000 inter-state, or state-specific intra-state limits like ₹1 Lakh in Maharashtra/Delhi).
2. Compute the exact transit distance using **[Pin to Pin Distance Calculator](/pin-to-pin-distance-calculator)**.
3. Verify the consignee's active GSTIN using our **[GSTIN Validator](/gstin-validator)**.
4. If dispatching goods from multiple branches, split allocations via our **[Multi-GSTIN Invoice Splitter](/multi-gstin-invoice-splitter)**.

---

## Frequently Asked Questions (FAQ)

### Can the tax officer seize goods if distance is slightly incorrect?
As per CBIC Circular No. 64/38/2018-GST, minor distance calculation errors within reasonable parameters do not warrant seizure under Section 129 if there is no intention to evade tax. A nominal penalty of ₹500 (₹250 CGST + ₹250 SGST) under Section 125 may be levied.

### What is the maximum distance allowed in an E-Way Bill?
The NIC portal allows a maximum single trip distance of **4,000 km**. For international maritime shipments leaving Indian territory, distance is calculated only up to the port of exit.

### How is validity calculated for transshipment?
When goods are transferred from one vehicle to another at a transit transshipment hub, the overall validity does **not** reset. The original validity clock continues based on the total pin-to-pin distance from origin to destination.
