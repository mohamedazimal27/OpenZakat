// ============================================================
// OpenZakat – Gold Calculation Engine
// PRD §4.1 – Gold module with regional units
// PRD §4.2 – Unit conversion table
// ============================================================

import { Decimal, safeDecimal, ZERO } from '@/utils/decimal';
import { calcPureGoldGrams } from '@/utils/unitConversion';
import type { GoldHolding, JewelryMethod } from '@/types';

/**
 * Calculate the zakatable value of a gold holding.
 *
 * Formula (PRD §4.2):
 * grossGrams = weight × unitMultiplier
 * pureGrams  = grossGrams × purityRatio
 * value      = pureGrams × goldPricePerGram (in base currency)
 *
 * Jewelry method (PRD §4.5):
 * - Hanafi (default): all gold zakatable
 * - Other: customary-use gold exempt (jewelry for personal use)
 */
export function calcGoldValue(
  holding: GoldHolding,
  goldPricePerGramUSD: string,
  usdToBase: string,          // exchange rate: 1 USD = X base currency
  jewelryMethod: JewelryMethod = 'hanafi'
): {
  grossGrams: number;
  pureGrams: number;
  valueInBase: Decimal;
  isZakatable: boolean;
} {
  const weight = parseFloat(holding.weight);
  if (isNaN(weight) || weight <= 0) {
    return { grossGrams: 0, pureGrams: 0, valueInBase: ZERO, isZakatable: false };
  }

  const customKaratRatio =
    holding.puritySource === 'custom' && holding.customKarat
      ? parseFloat(holding.customKarat)
      : undefined;

  const { grossGrams, pureGrams } = calcPureGoldGrams(
    weight,
    holding.unit,
    holding.puritySource,
    22, // default karat; customKaratRatio overrides purity
    customKaratRatio
  );

  const pricePerGram = safeDecimal(goldPricePerGramUSD);
  const rate = safeDecimal(usdToBase);

  // value in base currency = pureGrams × priceUSD × usdToBase
  const valueInBase = new Decimal(pureGrams).mul(pricePerGram).mul(rate);

  // PRD §4.5 – Jewelry method: "Hanafi (all gold/silver) / Other (customary use exempt)"
  // For MVP, all gold is marked zakatable under Hanafi (default)
  // Under 'other', jewelry-type gold in personal use is exempt
  const isZakatable = jewelryMethod === 'hanafi';

  return { grossGrams, pureGrams, valueInBase, isZakatable };
}

/**
 * Sum all gold holdings and return total zakatable value.
 */
export function calcTotalGoldValue(
  holdings: GoldHolding[],
  goldPricePerGramUSD: string,
  usdToBase: string,
  jewelryMethod: JewelryMethod = 'hanafi'
): Decimal {
  return holdings.reduce((sum, holding) => {
    const { valueInBase, isZakatable } = calcGoldValue(
      holding,
      goldPricePerGramUSD,
      usdToBase,
      jewelryMethod
    );
    return isZakatable ? sum.plus(valueInBase) : sum;
  }, ZERO);
}
