// ============================================================
// OpenZakat – TypeScript Types
// PRD §6.1 – localStorage Schema v3.0
// ============================================================

// ── Gold Units ──────────────────────────────────────────────
export type GoldUnit = 'gram' | 'sovereign' | 'tola' | 'baht' | 'tael' | 'ratti' | 'ounce';
export type GoldPuritySource = 'india' | 'middle-east' | 'thailand' | 'hongkong' | 'custom';
export type JewelryType = 'bullion' | 'coins' | 'jewelry';
export type WalletType = 'exchange' | 'hardware' | 'lost';
export type ReceivableReliability = 'strong' | 'doubtful';
export type RetirementAccountType = '401k' | 'ira' | 'pension' | 'provident-fund' | 'other';
export type StockInputMode = 'quick' | 'detailed';
export type StockHoldingType = 'trading' | 'long-term';
export type DebtTerm = 'short-term' | 'long-term';
export type PropertyType = 'primary' | 'rental' | 'flipping';
export type NumberingFormat = 'international' | 'indian';
export type Theme = 'light' | 'dark' | 'system';
export type NisabBasis = 'silver' | 'gold' | 'auto';
export type DebtDeductionMethod = 'majority' | 'hanafi';
export type RetirementMethod = 'fcna' | 'delayed';
export type JewelryMethod = 'hanafi' | 'other';
export type StockValuationMethod = 'asset-based' | 'market';
export type HawlCheck = 'yes' | 'no' | 'unknown';

// ── Regional Preset ─────────────────────────────────────────
export type RegionalPresetId =
  | 'indian-singapore'
  | 'indian-uae'
  | 'pakistani-uk'
  | 'bangladeshi-malaysia'
  | 'custom';

// ── Asset Types ─────────────────────────────────────────────
export interface GoldHolding {
  id: string;
  unit: GoldUnit;
  weight: string;           // decimal string
  puritySource: GoldPuritySource;
  customKarat?: string;     // only if puritySource === 'custom'
  valueInBase?: string;     // computed
}

export interface SilverHolding {
  id: string;
  type: JewelryType;
  weightGrams: string;
  valueInBase?: string;
}

export interface CashAccount {
  id: string;
  accountName: string;
  amount: string;
  currency: string;
  convertedToBase: string;
  exchangeRate: string;
  rateSource: 'api' | 'cached' | 'committed' | 'manual';
  rateTimestamp: string;
}

export interface CryptoHolding {
  id: string;
  coinId: string;         // CoinGecko ID
  coinSymbol: string;
  coinName: string;
  amount: string;
  walletType: WalletType;
  priceUsd?: string;
  valueInBase?: string;
}

export interface StockHolding {
  id: string;
  mode: StockInputMode;
  // Quick mode
  totalValue?: string;
  holdingType?: StockHoldingType;
  // Detailed mode
  symbol?: string;
  shares?: string;
  marketValue?: string;
  zakatable?: string;     // computed
  zakatDue?: string;      // computed
}

export interface RetirementAccount {
  id: string;
  accountType: RetirementAccountType;
  balance: string;
  penaltyPercent: string;
  taxPercent: string;
  accessible: boolean;
  netValue?: string;      // computed
}

export interface Receivable {
  id: string;
  description: string;
  amount: string;
  currency: string;
  reliability: ReceivableReliability;
  expectedDate: string;
  convertedToBase?: string;
}

export interface Liability {
  id: string;
  description: string;
  amount: string;
  currency: string;
  term: DebtTerm;
  dueDate: string;
  bankTemplate?: string;
  convertedToBase?: string;
}

// ── Asset State ─────────────────────────────────────────────
export interface AssetState {
  gold: GoldHolding[];
  silver: SilverHolding[];
  cash: CashAccount[];
  crypto: CryptoHolding[];
  stocks: StockHolding[];
  retirement: RetirementAccount[];
  receivables: Receivable[];
}

export interface LiabilityState {
  liabilities: Liability[];
}

// ── Methodology ─────────────────────────────────────────────
export interface Methodology {
  nisabBasis: NisabBasis;
  debtDeduction: DebtDeductionMethod;
  retirementMethod: RetirementMethod;
  jewelryMethod: JewelryMethod;
  stockValuation: StockValuationMethod;
  stockInputMode: StockInputMode;
  hawlCheck: HawlCheck;
}

// ── Preferences ─────────────────────────────────────────────
export interface Preferences {
  baseCurrency: string;
  homeCurrency?: string;
  language: string;
  theme: Theme;
  regionalPreset?: RegionalPresetId;
  goldUnit: GoldUnit;
  numberingFormat: NumberingFormat;
  methodology: Methodology;
  privacy: {
    enableHistory: boolean;
    encryptHistory: boolean;
  };
}

// ── Cache ────────────────────────────────────────────────────
export interface ExchangeRateCache {
  rates: Record<string, string>;
  base: string;
  timestamp: string;
  source: 'api' | 'committed' | 'manual';
}

export interface MetalPriceCache {
  gold: string;       // price per gram in USD
  silver: string;     // price per gram in USD
  timestamp: string;
}

export interface StorageSchema {
  version: '3.0';
  preferences: Preferences;
  currentSession: {
    assets: AssetState;
    liabilities: LiabilityState;
    hawlAnniversary: string | null;
    lastUpdated: string;
  };
  cache: {
    exchangeRates: ExchangeRateCache;
    metalPrices: MetalPriceCache;
    cryptoPrices: Record<string, string>;
  };
  history?: {
    calculations: HistoricalCalculation[];
    encrypted?: boolean;
  };
}

// ── Results ──────────────────────────────────────────────────
export interface ZakatResult {
  totalAssets: string;
  totalLiabilities: string;
  netWealth: string;
  nisabValue: string;
  nisabMet: boolean;
  zakatDue: string;
  zakatRate: string;          // '0.025'
  methodology: Methodology;
  breakdown: ZakatBreakdown;
  timestamp: string;
}

export interface ZakatBreakdown {
  gold: string;
  silver: string;
  cash: string;
  crypto: string;
  stocks: string;
  retirement: string;
  receivables: string;
  liabilities: string;
}

export interface HistoricalCalculation {
  id: string;
  date: string;
  result: ZakatResult;
  label?: string;
}

// ── Regional Preset Config ───────────────────────────────────
export interface RegionalPreset {
  id: RegionalPresetId;
  label: string;
  description: string;
  baseCurrency: string;
  homeCurrency?: string;
  goldUnit: GoldUnit;
  stockInputMode: StockInputMode;
  numberingFormat: NumberingFormat;
}
