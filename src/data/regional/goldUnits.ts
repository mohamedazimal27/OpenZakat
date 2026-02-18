// ============================================================
// OpenZakat – Gold Unit Conversion Table
// PRD §4.2 – Regional Gold Units
// ============================================================

import type { GoldUnit } from '@/types';

export interface GoldUnitConfig {
  unit: GoldUnit;
  label: string;
  region: string;
  gramsPerUnit: number;   // exact conversion factor
  description: string;
}

// PRD §4.2 – exact conversion values
export const GOLD_UNIT_CONFIGS: Record<GoldUnit, GoldUnitConfig> = {
  gram: {
    unit: 'gram',
    label: 'Grams (International)',
    region: 'International',
    gramsPerUnit: 1,
    description: '1g = 1g',
  },
  sovereign: {
    unit: 'sovereign',
    label: 'Sovereign (India/UK)',
    region: 'India, UK',
    gramsPerUnit: 7.988,  // PRD §4.2: "1 sovereign = 7.988g (≈ 8g)"
    description: '1 sovereign = 7.988g',
  },
  tola: {
    unit: 'tola',
    label: 'Tola (South Asia)',
    region: 'India, Pakistan, Bangladesh',
    gramsPerUnit: 11.664, // PRD §4.2
    description: '1 tola = 11.664g',
  },
  baht: {
    unit: 'baht',
    label: 'Baht (Thailand)',
    region: 'Thailand',
    gramsPerUnit: 15.244, // PRD §4.2
    description: '1 baht = 15.244g',
  },
  tael: {
    unit: 'tael',
    label: 'Tael (China/HK)',
    region: 'China, Hong Kong',
    gramsPerUnit: 37.799, // PRD §4.2
    description: '1 tael = 37.799g',
  },
  ratti: {
    unit: 'ratti',
    label: 'Ratti (India Traditional)',
    region: 'India',
    gramsPerUnit: 0.182,  // PRD §4.2
    description: '1 ratti = 0.182g',
  },
  ounce: {
    unit: 'ounce',
    label: 'Troy Ounce (Global)',
    region: 'Global',
    gramsPerUnit: 31.1035, // standard troy ounce
    description: '1 troy oz = 31.1035g',
  },
};

/**
 * Convert a given weight in a regional unit to grams.
 * PRD §4.2 – "Auto-convert all to grams for calculation engine"
 */
export function convertToGrams(weight: number, unit: GoldUnit): number {
  return weight * GOLD_UNIT_CONFIGS[unit].gramsPerUnit;
}

export const GOLD_UNIT_OPTIONS = Object.values(GOLD_UNIT_CONFIGS);

/** Convenience lookup: unit → gramsPerUnit (for tests #31, #32) */
export const GOLD_UNIT_CONVERSIONS: Record<GoldUnit, number> = Object.fromEntries(
  Object.entries(GOLD_UNIT_CONFIGS).map(([k, v]) => [k, v.gramsPerUnit])
) as Record<GoldUnit, number>;
