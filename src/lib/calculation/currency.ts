// ============================================================
// OpenZakat – Currency Conversion Engine
// PRD §4.3 – Multi-Currency Architecture
// PRD §13 – Multi-Currency Support
// ============================================================

import { Decimal, safeDecimal, ZERO } from '@/utils/decimal';
import type { CashAccount } from '@/types';

/**
 * Convert an amount from any ISO 4217 currency to the base currency.
 * Rates are expressed as: 1 USD = X currency (standard forex format).
 *
 * PRD §13 – "All amounts converted to base currency using decimal.js"
 */
export function convertToBase(
  amount: string,
  fromCurrency: string,
  baseCurrency: string,
  rates: Record<string, string>
): { converted: Decimal; rate: Decimal } {
  if (fromCurrency === baseCurrency) {
    return { converted: safeDecimal(amount), rate: new Decimal(1) };
  }

  // rates are relative to USD; we need cross-rate:
  // amount_in_base = amount / rate[from] * rate[base]
  const fromRate = safeDecimal(rates[fromCurrency] ?? '0');
  const baseRate = safeDecimal(rates[baseCurrency] ?? '0');

  if (fromRate.isZero() || baseRate.isZero()) {
    return { converted: ZERO, rate: ZERO };
  }

  // Cross rate: 1 fromCurrency = (baseRate / fromRate) baseCurrency
  const crossRate = baseRate.div(fromRate);
  const converted = safeDecimal(amount).mul(crossRate);
  return { converted, rate: crossRate };
}

/**
 * Convert from base currency to home currency for display.
 * PRD §4.3 – "Home Currency: Optional display-only currency"
 * Test #33: Dual-currency display (SGD base + INR home)
 */
export function convertToHome(
  amountInBase: string,
  baseCurrency: string,
  homeCurrency: string,
  rates: Record<string, string>
): { converted: Decimal; rate: Decimal } {
  return convertToBase(amountInBase, baseCurrency, homeCurrency, rates);
}

/**
 * Calculate total cash in base currency from multiple accounts.
 * PRD §13 – "Unlimited cash accounts, each with independent currency"
 */
export function calcCashTotal(
  accounts: CashAccount[],
  rates: Record<string, string>,
  baseCurrency: string
): Decimal {
  return accounts.reduce((sum, account) => {
    const { converted } = convertToBase(
      account.amount,
      account.currency,
      baseCurrency,
      rates
    );
    return sum.plus(converted);
  }, ZERO);
}

/**
 * Calculate total of multiple multi-currency amounts in a base currency.
 * PRD §13 – Test #33 helper
 */
export function calculateMultiCurrencyTotal(
  accounts: Array<{ amount: string; currency: string }>,
  baseCurrency: string,
  rates: Record<string, string>
): Decimal {
  return accounts.reduce((sum, acc) => {
    const { converted } = convertToBase(acc.amount, acc.currency, baseCurrency, rates);
    return sum.plus(converted);
  }, ZERO);
}

/**
 * Update cash account with latest conversion.
 */
export function refreshCashAccount(
  account: CashAccount,
  rates: Record<string, string>,
  baseCurrency: string,
  source: CashAccount['rateSource']
): CashAccount {
  const { converted, rate } = convertToBase(
    account.amount,
    account.currency,
    baseCurrency,
    rates
  );
  return {
    ...account,
    convertedToBase: converted.toFixed(2),
    exchangeRate: rate.toFixed(6),
    rateSource: source,
    rateTimestamp: new Date().toISOString(),
  };
}
