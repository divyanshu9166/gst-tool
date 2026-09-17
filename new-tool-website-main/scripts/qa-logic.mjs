import { regulatoryRates } from '../src/data/regulatory-rates.ts';

console.log(`\n🧮 Running Taxzentic Business Logic & Regulatory QA Gate...\n`);

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ [FAIL] ${testName} ${details}`);
  }
}

// 1. Regulatory Rates Constant Integrity
console.log('1. Testing Regulatory Rates Data Layer...');
assert(regulatoryRates.msmeDelayedPayment.multiplier === 3, 'MSME interest multiplier is 3x');
assert(regulatoryRates.rbiBankRate.value === 5.50, 'RBI bank rate is 5.50%');
assert(regulatoryRates.gstInterest.delayedTaxPaymentRate === 18, 'Section 50(1) cash delay interest is 18% p.a.');
assert(regulatoryRates.gstInterest.undueExcessItcRate === 24, 'Section 50(3) excess ITC interest is 24% p.a.');
assert(regulatoryRates.gstTds.rateIgst === 2.0, 'Section 51 GST TDS rate is 2.0%');
assert(regulatoryRates.gstTcs.rateIgst === 0.5, 'Section 52 GST TCS rate is 0.5%');
assert(regulatoryRates.section44ad.rateDigitalReceipts === 6, 'Section 44AD digital profit is 6%');
assert(regulatoryRates.section44ad.rateOtherReceipts === 8, 'Section 44AD cash profit is 8%');
assert(regulatoryRates.section44ad.turnoverLimitGeneral === 20000000, 'Section 44AD standard limit is ₹2 Cr');
assert(regulatoryRates.section44ad.turnoverLimitCashUnder5Percent === 30000000, 'Section 44AD enhanced limit is ₹3 Cr');

// 2. E-Way Bill Validity Calculation (Rule 138(10))
console.log('\n2. Testing E-Way Bill Validity Rules (Rule 138(10))...');
function calcEwbValidity(km, isOdc = false) {
  const slab = isOdc ? 20 : 200;
  if (km <= 0) return 1;
  return Math.ceil(km / slab);
}

assert(calcEwbValidity(50) === 1, 'Normal cargo 50 km = 1 day');
assert(calcEwbValidity(200) === 1, 'Normal cargo 200 km = 1 day');
assert(calcEwbValidity(201) === 2, 'Normal cargo 201 km = 2 days');
assert(calcEwbValidity(400) === 2, 'Normal cargo 400 km = 2 days');
assert(calcEwbValidity(401) === 3, 'Normal cargo 401 km = 3 days');
assert(calcEwbValidity(20, true) === 1, 'ODC cargo 20 km = 1 day');
assert(calcEwbValidity(21, true) === 2, 'ODC cargo 21 km = 2 days');
assert(calcEwbValidity(100, true) === 5, 'ODC cargo 100 km = 5 days');

// 3. MSME Delayed Payment Compound Interest (Section 16 MSMED Act)
console.log('\n3. Testing MSME Delayed Payment Mathematical Engine...');
function calcMsmeInterest(principal, days, annualRate) {
  // Monthly rests compounding formula: A = P * (1 + r/12)^m + residual
  const monthlyRate = annualRate / 100 / 12;
  const fullMonths = Math.floor(days / 30);
  const remainingDays = days % 30;

  let compounded = principal * Math.pow(1 + monthlyRate, fullMonths);
  if (remainingDays > 0) {
    compounded += compounded * (annualRate / 100 / 365) * remainingDays;
  }
  return compounded - principal;
}

const p = 100000;
const rate3x = regulatoryRates.rbiBankRate.value * regulatoryRates.msmeDelayedPayment.multiplier; // 16.5%
assert(rate3x === 16.5, 'MSME rate equals 16.5%');

const interest30Days = calcMsmeInterest(p, 30, rate3x);
assert(Math.round(interest30Days) === 1375, '100k principal @ 16.5% for 30 days = ₹1,375');

const interest60Days = calcMsmeInterest(p, 60, rate3x);
// Month 1: 101375, Month 2: 101375 * 1.01375 = 102768.9 -> Interest = ~2769
assert(Math.round(interest60Days) === 2769, 'Compounding on monthly rests produces ₹2,769 after 60 days');

// 4. GST Inclusive vs Exclusive Mathematics
console.log('\n4. Testing GST Inclusive vs Exclusive Math...');
function gstExclusive(base, rate) {
  const tax = (base * rate) / 100;
  return { base, tax, total: base + tax };
}

function gstInclusive(total, rate) {
  const base = total / (1 + rate / 100);
  const tax = total - base;
  return { base: Math.round(base), tax: Math.round(tax), total };
}

const ex = gstExclusive(1000, 18);
assert(ex.tax === 180 && ex.total === 1180, 'Exclusive: ₹1,000 + 18% = ₹1,180');

const inc = gstInclusive(1180, 18);
assert(inc.base === 1000 && inc.tax === 180, 'Inclusive: ₹1,180 @ 18% gives back base ₹1,000 and tax ₹180');

// 5. Section 44AD Presumptive Calculation
console.log('\n5. Testing Section 44AD Presumptive Calculations...');
function calc44AD(digital, cash) {
  const total = digital + cash;
  const cashPct = total > 0 ? (cash / total) * 100 : 0;
  const maxLimit = cashPct <= 5 ? 30000000 : 20000000;
  const isEligible = total <= maxLimit;
  const profit = (digital * 0.06) + (cash * 0.08);
  return { total, cashPct, maxLimit, isEligible, profit };
}

const c1 = calc44AD(25000000, 1000000); // 2.5 Cr digital, 10L cash (3.8% cash)
assert(c1.isEligible === true, 'Turnover ₹2.6 Cr with 3.8% cash is eligible under ₹3 Cr enhanced limit');
assert(c1.profit === 1580000, 'Deemed profit = 6% on 2.5 Cr (15L) + 8% on 10L (80k) = ₹15,80,000');

const c2 = calc44AD(20000000, 2000000); // 2 Cr digital, 20L cash (9.1% cash)
assert(c2.isEligible === false, 'Turnover ₹2.2 Cr with 9.1% cash exceeds ₹2 Cr standard limit');

console.log('\n------------------------------------------------------------');
if (failedTests === 0) {
  console.log(`🎉 ALL ${passedTests} BUSINESS LOGIC & REGULATORY TESTS PASSED!\n`);
  process.exit(0);
} else {
  console.error(`💥 ${failedTests} LOGIC TESTS FAILED! Total passed: ${passedTests}\n`);
  process.exit(1);
}
