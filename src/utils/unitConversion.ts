// ============================================================
// OpenZakat – Unit Conversion Utilities
// PRD §4.2 – Regional Gold Units
// ============================================================

import type { GoldUnit, GoldPuritySource } from '@/types';
import { GOLD_UNIT_CONFIGS } from '@/data/regional/goldUnits';
import purityData from '@/data/regional/purityStandards.json';

interface PurityStandard {
  id: string;
  label: string;
  region: string;
  karat22Purity: number;
  karat24Purity: number;
  karat21Purity: number;
  karat18Purity: number;
  defaultKarat: number;
}

const PURITY_STANDARDS: Record<string, PurityStandard> = Object.fromEntries(
  purityData.standards.map((s) => [s.id, s as PurityStandard])
);

/**
 * Convert weight from a regional unit to grams.
 * PRD §4.2 – "Auto-convert to grams: grams = weight × unitMultiplier"
 * Test #31: Sovereign to gram (15 sovereigns = 119.82g)
 * Test #32: Tola to gram (10 tolas = 116.64g)
 */
export function toGrams(weight: number, unit: GoldUnit): number {
  return weight * GOLD_UNIT_CONFIGS[unit].gramsPerUnit;
}

/**
 * Get the purity ratio for a given source and karat.
 * PRD §4.2 – "pure_grams = grams × (karat/24)"
 */
export function getPurityRatio(
  puritySource: GoldPuritySource,
  karat: number,
  customRatio?: number
): number {
  if (puritySource === 'custom' && customRatio !== undefined) {
    return customRatio;
  }

  const standard = PURITY_STANDARDS[puritySource];
  if (!standard) return karat / 24;

  switch (karat) {
    case 24: return standard.karat24Purity;
    case 22: return standard.karat22Purity;
    case 21: return standard.karat21Purity;
    case 18: return standard.karat18Purity;
    default: return karat / 24; // fallback formula
  }
}

/**
 * Calculate pure gold grams from a holding.
 * PRD §4.2 – complete formula:
 * grams = weight × unitMultiplier
 * pure_grams = grams × (karat/24) [adjusted for regional purity]
 */
export function calcPureGoldGrams(
  weight: number,
  unit: GoldUnit,
  puritySource: GoldPuritySource,
  karat: number = 22,
  customKaratRatio?: number
): { grossGrams: number; pureGrams: number; purityRatio: number } {
  const grossGrams = toGrams(weight, unit);
  const purityRatio = getPurityRatio(puritySource, karat, customKaratRatio);
  const pureGrams = grossGrams * purityRatio;
  return { grossGrams, pureGrams, purityRatio };
}

/**
 * Get the default karat for a purity source.
 */
export function getDefaultKarat(puritySource: GoldPuritySource): number {
  return PURITY_STANDARDS[puritySource]?.defaultKarat ?? 22;
}

/**
 * Silver Nisab: 612.36 grams of silver.
 * PRD §4.5 – "Silver (612.36g)"
 */
export const SILVER_NISAB_GRAMS = 612.36;

/**
 * Gold Nisab: 87.48 grams of gold.
 * PRD §4.5 – "Gold (87.48g)"
 */
export const GOLD_NISAB_GRAMS = 87.48;
