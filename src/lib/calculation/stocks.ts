// ============================================================
// OpenZakat – Stock Calculation Engine
// PRD §4.1 – Stocks (Trading) + §4.4 Quick Stock Mode
// ============================================================

import { Decimal, safeDecimal, ZERO, ZAKAT_RATE } from '@/utils/decimal';
import type { StockHolding } from '@/types';

/**
 * Simplified asset-proxy ratio (30%).
 * This is a HEURISTIC used by some scholars as a proxy for the asset-based method
 * (estimating that ~30% of a company's market value represents zakatable liquid assets).
 * It is NOT a formal ruling from AAOIFI or any major Islamic body.
 * Kept here for future "advanced / detailed" mode only — NOT used as a default.
 *
 * Default (quick mode): 2.5% on full market value — widely accepted across scholars.
 */
export const ASSET_PROXY_RATIO = new Decimal('0.30');

/**
 * Calculate zakatable amount and Zakat due for a stock holding.
 *
 * Quick mode (corrected methodology):
 *   BOTH trading and long-term → 2.5% on full market value.
 *   Reason: 2.5% on market value is the broadest scholarly consensus and the
 *   most conservative (safest) approach. The 30% proxy is a disputed heuristic,
 *   not a formal standard — using it as a default would understate Zakat by 70%.
 *
 * Detailed mode:
 *   zakatable = marketValue (2.5% on full market value)
 *   zakatDue  = marketValue × 0.025
 */
export function calcStockZakat(holding: StockHolding): {
  zakatable: Decimal;
  zakatDue: Decimal;
} {
  if (holding.mode === 'quick') {
    const totalValue = safeDecimal(holding.totalValue ?? '0');
    // Both trading and long-term: 2.5% on full market value.
    // Scholars agree trading stocks → full value; for long-term the conservative
    // default (full market value) avoids any risk of underpaying.
    const zakatable = totalValue; // 100% zakatable
    const zakatDue = zakatable.mul(ZAKAT_RATE);
    return { zakatable, zakatDue };
  }

  // Detailed mode: use marketValue or shares × price
  const marketValue = safeDecimal(holding.marketValue ?? '0');
  const zakatDue = marketValue.mul(ZAKAT_RATE);
  return { zakatable: marketValue, zakatDue };
}

/**
 * Sum zakatable value across all stock holdings.
 */
export function calcTotalStockZakatable(holdings: StockHolding[]): {
  totalZakatable: Decimal;
  totalZakatDue: Decimal;
} {
  return holdings.reduce(
    (acc, holding) => {
      const { zakatable, zakatDue } = calcStockZakat(holding);
      return {
        totalZakatable: acc.totalZakatable.plus(zakatable),
        totalZakatDue: acc.totalZakatDue.plus(zakatDue),
      };
    },
    { totalZakatable: ZERO, totalZakatDue: ZERO }
  );
}

/**
 * Calculate total stock value in base currency (for display/summary).
 * PRD §4.1 – stocks enter in base currency already
 */
export function calcTotalStockValue(holdings: StockHolding[]): Decimal {
  return holdings.reduce((sum, h) => {
    if (h.mode === 'quick') {
      return sum.plus(safeDecimal(h.totalValue ?? '0'));
    }
    return sum.plus(safeDecimal(h.marketValue ?? '0'));
  }, ZERO);
}
