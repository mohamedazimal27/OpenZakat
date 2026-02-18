// ============================================================
// OpenZakat – Default Values for Store
// PRD §6.1 – localStorage Schema v3.0 defaults
// ============================================================

import type { Preferences, AssetState, LiabilityState } from '@/types';

export const DEFAULT_METHODOLOGY: Preferences['methodology'] = {
  nisabBasis: 'silver',       // PRD §4.5 default: Silver
  debtDeduction: 'majority',  // PRD §4.5 default: Majority
  retirementMethod: 'fcna',   // PRD §4.5 default: FCNA
  jewelryMethod: 'hanafi',    // PRD §4.5 default: Hanafi (conservative)
  stockValuation: 'asset-based', // PRD §4.5 default: Asset-based
  stockInputMode: 'quick',    // Default for expats
  hawlCheck: 'yes',           // PRD §4.5 default: Yes
};

export const DEFAULT_PREFERENCES: Preferences = {
  baseCurrency: 'USD',
  homeCurrency: undefined,
  language: 'en',
  theme: 'system',
  regionalPreset: undefined,
  goldUnit: 'gram',
  numberingFormat: 'international',
  methodology: DEFAULT_METHODOLOGY,
  privacy: {
    enableHistory: true,
    encryptHistory: false,
  },
};

export const DEFAULT_ASSETS: AssetState = {
  gold: [],
  silver: [],
  cash: [],
  crypto: [],
  stocks: [],
  retirement: [],
  receivables: [],
};

export const DEFAULT_LIABILITIES: LiabilityState = {
  liabilities: [],
};
