/**
 * Centralized Regulatory Constants and Statutory Rates for Taxzentic.
 *
 * Single source of truth for time-sensitive parameters across GST, Income Tax,
 * and MSMED Act regulations. Sourced directly from official CBIC notifications,
 * RBI Monetary Policy statements, and statutory provisions.
 */

export interface RegulatoryRateSource {
  value: number;
  effectiveDate: string;
  checkedAt: string;
  sourceLabel: string;
  sourceUrl: string;
}

export const regulatoryRates = {
  // RBI Policy Rates
  rbiBankRate: {
    value: 5.50,
    effectiveDate: '2026-06-06',
    checkedAt: '2026-09-16',
    sourceLabel: 'Reserve Bank of India (Current Policy Rates)',
    sourceUrl: 'https://www.rbi.org.in/',
  } as RegulatoryRateSource,

  // Section 16, MSME Development Act, 2006
  // Mandatory 3x RBI Bank Rate compounded monthly
  msmeDelayedPayment: {
    multiplier: 3,
    get effectiveAnnualRate() {
      return this.multiplier * regulatoryRates.rbiBankRate.value; // 16.50%
    },
    compounding: 'monthly',
    maximumPaymentPeriodAgreedDays: 45,
    maximumPaymentPeriodDeemedDays: 15,
    governingAct: 'Micro, Small and Medium Enterprises Development Act, 2006',
    governingSection: 'Section 16',
    disallowanceSection: 'Section 43B(h), Income Tax Act, 1961',
    portalLabel: 'MSME Samadhaan Portal',
    portalUrl: 'https://samadhaan.msme.gov.in/',
  },

  // E-Way Bill Rules under CGST Rule 138
  ewayBill: {
    consignmentValueThreshold: 50000,
    // Intra-state conveyance detail (Part B) exemption distance (3rd proviso to Rule 138(3) & 138(5))
    partBExemptionDistanceKm: 50,
    // Validity: Rule 138(10)
    normalCargoKmPerDay: 200,
    odcMultimodalKmPerDay: 20,
    // NIC portal allowable distance variation tolerance
    portalTolerancePercent: 10,
    extensionWindowHoursBeforeExpiry: 8,
    extensionWindowHoursAfterExpiry: 8,
    governingRule: 'Rule 138 of CGST Rules, 2017',
    officialPortalUrl: 'https://ewaybillgst.gov.in/',
  },

  // Composition Scheme under Section 10 of CGST Act & Rule 7
  compositionScheme: {
    turnoverLimitGeneral: 15000000, // ₹1.5 Crore
    turnoverLimitSpecialStates: 7500000, // ₹75 Lakhs
    turnoverLimitServices: 5000000, // ₹50 Lakhs (Section 10(2A))
    rateTradersAndManufacturers: 1.0, // 0.5% CGST + 0.5% SGST
    rateRestaurants: 5.0, // 2.5% CGST + 2.5% SGST
    rateServiceProviders: 6.0, // 3% CGST + 3% SGST
    quarterlyStatement: 'CMP-08',
    quarterlyDueDateDayOfMonth: 18,
    annualReturn: 'GSTR-4',
    annualDueDate: '30th April',
  },

  // GST Interest under Section 50 of CGST Act
  gstInterest: {
    delayedTaxPaymentRate: 18.0, // Section 50(1)
    undueExcessItcRate: 24.0, // Section 50(3)
    cashLiabilityProvisoEffective: '2017-07-01',
    governingSection: 'Section 50 of CGST Act, 2017',
    sourceLabel: 'CBIC / CGST Act Section 50',
    sourceUrl: 'https://cbic.gov.in',
  },

  // GST TDS under Section 51
  gstTds: {
    contractValueThreshold: 250000, // ₹2.5 Lakhs
    rateCgst: 1.0,
    rateSgst: 1.0,
    rateIgst: 2.0,
    depositDueDateDayOfMonth: 10,
    returnForm: 'GSTR-7',
    governingSection: 'Section 51 of CGST Act, 2017',
  },

  // GST TCS under Section 52 (E-Commerce Operators)
  gstTcs: {
    rateCgst: 0.25,
    rateSgst: 0.25,
    rateIgst: 0.50,
    depositDueDateDayOfMonth: 10,
    returnForm: 'GSTR-8',
    governingSection: 'Section 52 of CGST Act, 2017',
  },

  // Section 44AD Presumptive Taxation
  section44ad: {
    turnoverLimitGeneral: 20000000, // ₹2 Crore
    turnoverLimitCashUnder5Percent: 30000000, // ₹3 Crore
    rateDigitalReceipts: 6.0,
    rateOtherReceipts: 8.0,
    advanceTaxDueDayOfMonth: 15,
    advanceTaxDueMonth: 3, // 15th March
    governingSection: 'Section 44AD of Income-tax Act, 1961',
  },

  // Statutory Notices & Amnesty
  statutoryNotices: {
    section128A: {
      coveredFinancialYears: ['FY 2017-18', 'FY 2018-19', 'FY 2019-20'],
      applicableDemandSection: 'Section 73 (Non-fraud only)',
      statutoryPaymentDeadline: '2025-03-31',
      waiverBenefit: '100% Interest & Penalty waiver',
      forms: ['Form GST SPL-01', 'Form GST SPL-02'],
      governingSection: 'Section 128A of CGST Act, 2017 read with Rule 164',
    },
    section74A: {
      effectiveFromFinancialYear: 'FY 2024-25',
      scnLimitationMonths: 42,
      orderLimitationMonths: 12,
      orderExtensionMonths: 6,
      governingSection: 'Section 74A of CGST Act, 2017 (enacted via Finance (No. 2) Act, 2024)',
    },
  },
};

