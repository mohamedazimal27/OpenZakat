// ============================================================
// OpenZakat – Stock Calculation Engine
// PRD §4.1 – Stocks (Trading) + §4.4 Quick Stock Mode
// ============================================================

import { Decimal, safeDecimal, ZERO, ZAKAT_RATE } from '@/utils/decimal';
import type { StockHolding } from '@/types';

/**
 * AAOIFI simplified method: 30% of total market value is zakatable.
 * PRD §4.4 – "Quick: 2.5% on total value; Simplified: market_value × 0.30"
 * Test #35: Stock quick mode (total value → 30% zakatable)
 */
export const SIMPLIFIED_ZAKATABLE_RATIO = new Decimal('0.30');

/**
 * Calculate zakatable amount and Zakat due for a stock holding.
 *
 * Quick mode (PRD §4.4):
 *   zakatable = totalValue × 0.30 (AAOIFI estimation)
 *   zakatDue  = zakatable × 0.025
 *
 * Detailed mode (PRD §4.1 Stocks Trading):
 *   zakatable = marketValue (2.5% on full market value)
 *   zakatDue  = marketValue × 0.025
 */
export function calcStockZakat(holding: StockHolding): {
  zakatable: Decimal;
  zakatDue: Decimal;
} {
  if (holding.mode === 'quick') {
    const totalValue = safeDecimal(holding.totalValue ?? '0');
    // PRD §4.4: trading stocks → 100% zakatable; long-term → 30% (AAOIFI estimation)
    const ratio = holding.holdingType === 'trading' ? new Decimal('1') : SIMPLIFIED_ZAKATABLE_RATIO;
    const zakatable = totalValue.mul(ratio);
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
