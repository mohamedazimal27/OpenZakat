// ============================================================
// OpenZakat – Master Zakat Calculation Engine
// PRD §4.1 – All asset modules
// PRD §4.5 – Scholarly Methodology Selection
// ============================================================

import { Decimal, safeDecimal, ZERO, ZAKAT_RATE } from '@/utils/decimal';
import { SILVER_NISAB_GRAMS, GOLD_NISAB_GRAMS } from '@/utils/unitConversion';
import { calcTotalGoldValue } from './gold';
import { calcCashTotal, convertToBase } from './currency';
import { calcTotalStockZakatable } from './stocks';
import type {
  AssetState,
  LiabilityState,
  Methodology,
  ZakatResult,
  ZakatBreakdown,
  MetalPriceCache,
  ExchangeRateCache,
} from '@/types';

export interface EngineInput {
  assets: AssetState;
  liabilities: LiabilityState;
  methodology: Methodology;
  metalPrices: MetalPriceCache;
  exchangeRates: ExchangeRateCache;
  cryptoPrices: Record<string, string>;
  baseCurrency: string;
}

/**
 * Calculate silver value in base currency (for Nisab).
 * PRD §4.5 – "Silver (612.36g)"
 */
function calcSilverValue(
  silverPricePerGramUSD: string,
  usdToBase: Decimal,
  grams: number
): Decimal {
  return safeDecimal(silverPricePerGramUSD).mul(usdToBase).mul(new Decimal(grams));
}

/**
 * Calculate Nisab threshold in base currency.
 * PRD §4.5 – Nisab Basis options:
 *   Silver: 612.36g × silver price
 *   Gold:   87.48g  × gold price
 *   Auto:   lower of the two (labeled "Convenience setting – not formal fiqh")
 */
export function calcNisab(
  methodology: Methodology,
  metalPrices: MetalPriceCache,
  usdToBase: Decimal
): { nisabValue: Decimal; basis: 'silver' | 'gold' } {
  const silverNisab = calcSilverValue(metalPrices.silver, usdToBase, SILVER_NISAB_GRAMS);
  const goldNisab = safeDecimal(metalPrices.gold)
    .mul(usdToBase)
    .mul(new Decimal(GOLD_NISAB_GRAMS));

  if (methodology.nisabBasis === 'silver') {
    return { nisabValue: silverNisab, basis: 'silver' };
  }
  if (methodology.nisabBasis === 'gold') {
    return { nisabValue: goldNisab, basis: 'gold' };
  }
  // Auto = lower value (PRD: label as "Convenience setting – not formal fiqh")
  if (silverNisab.lte(goldNisab)) {
    return { nisabValue: silverNisab, basis: 'silver' };
  }
  return { nisabValue: goldNisab, basis: 'gold' };
}

/**
 * Calculate total retirement zakatable value.
 * PRD §4.1 – "FCNA method: balance × (1 - penalty - tax)"
 * PRD §4.5 – "Retirement: FCNA (net accessible) / Delayed (at withdrawal)"
 */
function calcRetirementValue(
  assets: AssetState,
  methodology: Methodology
): Decimal {
  if (methodology.retirementMethod === 'delayed') {
    return ZERO; // Only pay at withdrawal
  }

  return assets.retirement.reduce((sum, account) => {
    if (!account.accessible) return sum; // Skip if not accessible
    const balance = safeDecimal(account.balance);
    const penalty = safeDecimal(account.penaltyPercent).div(100);
    const tax = safeDecimal(account.taxPercent).div(100);
    const combined = penalty.plus(tax);

    // Validation: penalty + tax must be < 100%
    if (combined.gte(1)) return sum;

    const netValue = balance.mul(new Decimal(1).minus(combined));
    return sum.plus(netValue);
  }, ZERO);
}

/**
 * Calculate total receivables zakatable value.
 * PRD §4.1 – "Strong: 100% yearly; Doubtful: 0% yearly, 1 year upon recovery"
 * PRD §4.1 – "CRITICAL FIX: Strong/Doubtful only (no 50% rule)"
 */
function calcReceivablesValue(
  assets: AssetState,
  rates: Record<string, string>,
  baseCurrency: string
): Decimal {
  return assets.receivables.reduce((sum, receivable) => {
    if (receivable.reliability === 'doubtful') return sum; // 0% per year

    const { converted } = convertToBase(
      receivable.amount,
      receivable.currency,
      baseCurrency,
      rates
    );
    return sum.plus(converted); // Strong: 100%
  }, ZERO);
}

/**
 * Calculate total liabilities to deduct.
 * PRD §4.1 – "Short-term debts (credit cards, bills), Long-term installments (next 12 months only)"
 * PRD §4.5 – "Debt Deduction: Majority (12-month only) / Hanafi (all debts)"
 */
function calcLiabilitiesValue(
  liabilities: LiabilityState,
  methodology: Methodology,
  rates: Record<string, string>,
  baseCurrency: string
): Decimal {
  return liabilities.liabilities.reduce((sum, liability) => {
    // Under Majority method: only short-term debts are deductible
    // Under Hanafi: all debts deductible
    if (methodology.debtDeduction === 'majority' && liability.term === 'long-term') {
      return sum; // Skip long-term in Majority method
    }

    const { converted } = convertToBase(
      liability.amount,
      liability.currency,
      baseCurrency,
      rates
    );
    return sum.plus(converted);
  }, ZERO);
}

/**
 * Calculate crypto total zakatable value.
 * PRD §4.1 – "2.5% on market value; exclude lost wallets"
 */
function calcCryptoValue(
  cryptoHoldings: AssetState['crypto'],
  cryptoPricesUSD: Record<string, string>,
  usdToBase: Decimal
): Decimal {
  return cryptoHoldings.reduce((sum, holding) => {
    if (holding.walletType === 'lost') return sum; // PRD: exclude lost wallets

    const priceUSD = safeDecimal(
      cryptoPricesUSD[holding.coinId] ?? holding.priceUsd ?? '0'
    );
    const amount = safeDecimal(holding.amount);
    const valueBase = amount.mul(priceUSD).mul(usdToBase);
    return sum.plus(valueBase);
  }, ZERO);
}

/**
 * Calculate silver total zakatable value.
 * PRD §4.1 – "100% zakatable at market rate"
 */
function calcSilverValue2(
  silverHoldings: AssetState['silver'],
  silverPricePerGramUSD: string,
  usdToBase: Decimal
): Decimal {
  return silverHoldings.reduce((sum, holding) => {
    const grams = safeDecimal(holding.weightGrams);
    const price = safeDecimal(silverPricePerGramUSD);
    return sum.plus(grams.mul(price).mul(usdToBase));
  }, ZERO);
}

/**
 * MASTER ZAKAT CALCULATION ENGINE
 * PRD §3.1 – "Calculation Engine (decimal.js)"
 */
export function calculateZakat(input: EngineInput): ZakatResult {
  const { assets, liabilities, methodology, metalPrices, exchangeRates, cryptoPrices, baseCurrency } = input;

  // Get USD→base exchange rate
  const usdToBase = convertToBase('1', 'USD', baseCurrency, exchangeRates.rates).converted;

  // ── Asset Calculations ──────────────────────────────────
  const goldValue = calcTotalGoldValue(
    assets.gold,
    metalPrices.gold,
    usdToBase.toString(),
    methodology.jewelryMethod
  );

  const silverValue = calcSilverValue2(assets.silver, metalPrices.silver, usdToBase);

  const cashValue = calcCashTotal(assets.cash, exchangeRates.rates, baseCurrency);

  const cryptoValue = calcCryptoValue(assets.crypto, cryptoPrices, usdToBase);

  const { totalZakatable: stocksZakatable } = calcTotalStockZakatable(assets.stocks);

  const retirementValue = calcRetirementValue(assets, methodology);

  const receivablesValue = calcReceivablesValue(
    assets,
    exchangeRates.rates,
    baseCurrency
  );

  // ── Total Assets ──────────────────────────────────────
  const totalAssets = goldValue
    .plus(silverValue)
    .plus(cashValue)
    .plus(cryptoValue)
    .plus(stocksZakatable)
    .plus(retirementValue)
    .plus(receivablesValue);

  // ── Liabilities ───────────────────────────────────────
  const totalLiabilities = calcLiabilitiesValue(
    liabilities,
    methodology,
    exchangeRates.rates,
    baseCurrency
  );

  // ── Net Wealth ─────────────────────────────────────────
  const netWealth = Decimal.max(ZERO, totalAssets.minus(totalLiabilities));

  // ── Nisab Check ────────────────────────────────────────
  const { nisabValue } = calcNisab(methodology, metalPrices, usdToBase);
  const nisabMet = netWealth.gte(nisabValue);

  // ── Hawl Check ─────────────────────────────────────────
  // PRD §4.5 – "Hawl: Yes / No / Unknown"
  // If hawl is 'no', Zakat is not yet due
  const zakatDue =
    nisabMet && methodology.hawlCheck !== 'no'
      ? netWealth.mul(ZAKAT_RATE)
      : ZERO;

  // ── Breakdown ─────────────────────────────────────────
  const breakdown: ZakatBreakdown = {
    gold: goldValue.toFixed(2),
    silver: silverValue.toFixed(2),
    cash: cashValue.toFixed(2),
    crypto: cryptoValue.toFixed(2),
    stocks: stocksZakatable.toFixed(2),
    retirement: retirementValue.toFixed(2),
    receivables: receivablesValue.toFixed(2),
    liabilities: totalLiabilities.toFixed(2),
  };

  return {
    totalAssets: totalAssets.toFixed(2),
    totalLiabilities: totalLiabilities.toFixed(2),
    netWealth: netWealth.toFixed(2),
    nisabValue: nisabValue.toFixed(2),
    nisabMet,
    zakatDue: zakatDue.toFixed(2),
    zakatRate: ZAKAT_RATE.toString(),
    methodology,
    breakdown,
    timestamp: new Date().toISOString(),
  };
}

