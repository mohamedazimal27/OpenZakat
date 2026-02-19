// ============================================================
// OpenZakat – Regional Preset Configurations
// PRD §5.1 – Regional Preset Modal
// ============================================================

import type { RegionalPreset } from '@/types';

// PRD §5.1 – exact presets defined
export const REGIONAL_PRESETS: RegionalPreset[] = [
  {
    id: 'indian-singapore',
    label: 'Indian in Singapore',
    description: '→ Base: SGD | Home: INR | Gold: Sovereign | Stocks: Quick | Format: Indian (L/Cr)',
    baseCurrency: 'SGD',
    homeCurrency: 'INR',
    language: 'en',
    goldUnit: 'sovereign',
    stockInputMode: 'quick',
    numberingFormat: 'indian',
  },
  {
    id: 'indian-uae',
    label: 'Indian in UAE',
    description: '→ Base: AED | Home: INR | Gold: Tola | Stocks: Quick',
    baseCurrency: 'AED',
    homeCurrency: 'INR',
    language: 'en',
    goldUnit: 'tola',
    stockInputMode: 'quick',
    numberingFormat: 'indian',
  },
  {
    id: 'pakistani-uk',
    label: 'Pakistani in UK',
    description: '→ Base: GBP | Home: PKR | Gold: Tola | Format: International',
    baseCurrency: 'GBP',
    homeCurrency: 'PKR',
    language: 'en',
    goldUnit: 'tola',
    stockInputMode: 'detailed',
    numberingFormat: 'international',
  },
  {
    id: 'bangladeshi-malaysia',
    label: 'Bangladeshi in Malaysia',
    description: '→ Base: MYR | Home: BDT | Gold: Tola | Stocks: Quick',
    baseCurrency: 'MYR',
    homeCurrency: 'BDT',
    language: 'en',
    goldUnit: 'tola',
    stockInputMode: 'quick',
    numberingFormat: 'international',
  },
  {
    id: 'custom',
    label: 'Custom Setup',
    description: 'Configure everything manually',
    baseCurrency: 'USD',
    homeCurrency: undefined,
    language: 'en',
    goldUnit: 'gram',
    stockInputMode: 'detailed',
    numberingFormat: 'international',
  },
];

export const getPreset = (id: string): RegionalPreset | undefined =>
  REGIONAL_PRESETS.find((p) => p.id === id);
