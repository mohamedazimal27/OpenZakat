// ============================================================
// OpenZakat – decimal.js Helpers
// PRD NFR-07 – "Use decimal.js for all monetary calculations"
// ============================================================

import Decimal from 'decimal.js';

// Global precision config
Decimal.set({ precision: 28, rounding: Decimal.ROUND_HALF_UP });

export { Decimal };

export const ZERO = new Decimal(0);
export const ZAKAT_RATE = new Decimal('0.025'); // 2.5%

/** Safe parse: returns 0 for empty/invalid strings */
export function safeDecimal(value: string | number | undefined | null): Decimal {
  if (value === null || value === undefined || value === '') return ZERO;
  try {
    const d = new Decimal(value);
    return d.isNaN() || !d.isFinite() ? ZERO : d;
  } catch {
    return ZERO;
  }
}

/** Multiply two decimal strings, return result as string */
export function multiply(a: string | number, b: string | number): string {
  return new Decimal(a).mul(new Decimal(b)).toFixed(12);
}

/** Add two decimal strings, return result as string */
export function add(a: string | number, b: string | number): string {
  return new Decimal(a).plus(new Decimal(b)).toFixed(12);
}

/** Subtract b from a */
export function subtract(a: string | number, b: string | number): string {
  return new Decimal(a).minus(new Decimal(b)).toFixed(12);
}

/** Sum an array of decimal strings */
export function sumDecimals(values: (string | number)[]): Decimal {
  return values.reduce((acc, v) => acc.plus(safeDecimal(String(v))), ZERO);
}

/** Convert a value from one currency to another using rate (base/target) */
export function convertCurrency(
  amount: string,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, string>,
  base: string = 'USD'
): Decimal {
  if (fromCurrency === toCurrency) return safeDecimal(amount);

  // rates are in base currency (USD by default)
  const fromRate = safeDecimal(rates[fromCurrency] ?? (fromCurrency === base ? '1' : '0'));
  const toRate = safeDecimal(rates[toCurrency] ?? (toCurrency === base ? '1' : '0'));

  if (fromRate.isZero() || toRate.isZero()) return ZERO;

  // amount / fromRate = amount in USD; * toRate = amount in target currency
  return safeDecimal(amount).div(fromRate).mul(toRate);
}

/** Format a Decimal to 2 decimal places string */
export function toFixed2(d: Decimal): string {
  return d.toFixed(2);
}

/** Format a Decimal to 4 decimal places string */
export function toFixed4(d: Decimal): string {
  return d.toFixed(4);
}
