// ============================================================
// OpenZakat – Zustand Global Store
// PRD §3.1 – React UI ↔ Calculation Engine ↔ localStorage
// ============================================================

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  Preferences,
  AssetState,
  LiabilityState,
  GoldHolding,
  SilverHolding,
  CashAccount,
  CryptoHolding,
  StockHolding,
  RetirementAccount,
  Receivable,
  Liability,
  ExchangeRateCache,
  MetalPriceCache,
  ZakatResult,
  RegionalPresetId,
  LanguageCode,
} from '@/types';
import { DEFAULT_ASSETS, DEFAULT_LIABILITIES } from './defaults';
import { getOrCreateStorage, saveStorage } from '@/lib/storage';
import { getPreset } from '@/data/regional/presets';
import { generateId } from '@/utils/formatters';
import {
  getRates,
  getMetalPrices,
  getCryptoPrices,
  getCommittedRates,
  getCommittedMetalPrices,
  getCommittedCryptoPrices,
} from '@/lib/currency/rateService';
import { calculateZakat } from '@/lib/calculation/engine';

interface AppState {
  // ── Preferences ──────────────────────────────────────────
  preferences: Preferences;
  setPreferences: (prefs: Partial<Preferences>) => void;
  applyPreset: (presetId: RegionalPresetId, languageOverride?: LanguageCode) => void;

  // ── Assets ───────────────────────────────────────────────
  assets: AssetState;
  liabilities: LiabilityState;

  // Gold actions
  addGold: (holding: Omit<GoldHolding, 'id'>) => void;
  updateGold: (id: string, updates: Partial<GoldHolding>) => void;
  removeGold: (id: string) => void;

  // Silver actions
  addSilver: (holding: Omit<SilverHolding, 'id'>) => void;
  updateSilver: (id: string, updates: Partial<SilverHolding>) => void;
  removeSilver: (id: string) => void;

  // Cash actions
  addCash: (account: Omit<CashAccount, 'id'>) => void;
  updateCash: (id: string, updates: Partial<CashAccount>) => void;
  removeCash: (id: string) => void;

  // Crypto actions
  addCrypto: (holding: Omit<CryptoHolding, 'id'>) => void;
  updateCrypto: (id: string, updates: Partial<CryptoHolding>) => void;
  removeCrypto: (id: string) => void;

  // Stock actions
  addStock: (holding: Omit<StockHolding, 'id'>) => void;
  updateStock: (id: string, updates: Partial<StockHolding>) => void;
  removeStock: (id: string) => void;

  // Retirement actions
  addRetirement: (account: Omit<RetirementAccount, 'id'>) => void;
  updateRetirement: (id: string, updates: Partial<RetirementAccount>) => void;
  removeRetirement: (id: string) => void;

  // Receivables actions
  addReceivable: (item: Omit<Receivable, 'id'>) => void;
  updateReceivable: (id: string, updates: Partial<Receivable>) => void;
  removeReceivable: (id: string) => void;

  // Liability actions
  addLiability: (item: Omit<Liability, 'id'>) => void;
  updateLiability: (id: string, updates: Partial<Liability>) => void;
  removeLiability: (id: string) => void;

  // ── Prices & Rates ──────────────────────────────────────
  exchangeRates: ExchangeRateCache;
  metalPrices: MetalPriceCache;
  cryptoPrices: Record<string, string>;
  cryptoPricesTimestamp: string;
  ratesLoading: boolean;
  fetchPrices: () => Promise<void>;
  setManualRate: (currency: string, rate: string) => void;

  // ── Results ──────────────────────────────────────────────
  result: ZakatResult | null;
  recalculate: () => void;

  // ── UI State ─────────────────────────────────────────────
  showPresetModal: boolean;
  setShowPresetModal: (show: boolean) => void;
  showMethodologyModal: boolean;
  setShowMethodologyModal: (show: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;

  // ── Session ──────────────────────────────────────────────
  resetSession: () => void;
  persistAll: () => void;
}

const initStorage = getOrCreateStorage();

export const useStore = create<AppState>()(
  subscribeWithSelector((set, get) => ({
    // ── Init ────────────────────────────────────────────────
    preferences: initStorage.preferences,
    assets: initStorage.currentSession.assets,
    liabilities: initStorage.currentSession.liabilities,
    exchangeRates: initStorage.cache.exchangeRates.rates && Object.keys(initStorage.cache.exchangeRates.rates).length > 0
      ? initStorage.cache.exchangeRates
      : getCommittedRates(),
    metalPrices: initStorage.cache.metalPrices.gold !== '0'
      ? initStorage.cache.metalPrices
      : getCommittedMetalPrices(),
    cryptoPrices: Object.keys(initStorage.cache.cryptoPrices).length > 0
      ? initStorage.cache.cryptoPrices
      : getCommittedCryptoPrices(),
    cryptoPricesTimestamp: new Date(0).toISOString(),
    ratesLoading: false,
    result: null,
    showPresetModal: !initStorage.preferences.regionalPreset,
    showMethodologyModal: false,
    activeSection: 'gold',

    // ── Preferences ─────────────────────────────────────────
    setPreferences: (prefs) => {
      set((state) => ({
        preferences: { ...state.preferences, ...prefs },
      }));
      get().persistAll();
      get().recalculate();
    },

    applyPreset: (presetId, languageOverride) => {
      const preset = getPreset(presetId);
      if (!preset) return;
      set((state) => ({
        preferences: {
          ...state.preferences,
          baseCurrency: preset.baseCurrency,
          homeCurrency: preset.homeCurrency,
          language: languageOverride ?? preset.language,
          goldUnit: preset.goldUnit,
          numberingFormat: preset.numberingFormat,
          regionalPreset: presetId,
          methodology: {
            ...state.preferences.methodology,
            stockInputMode: preset.stockInputMode,
          },
        },
        showPresetModal: false,
      }));
      get().persistAll();
    },

    // ── Gold ─────────────────────────────────────────────────
    addGold: (holding) => {
      set((state) => ({
        assets: {
          ...state.assets,
          gold: [...state.assets.gold, { ...holding, id: generateId() }],
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    updateGold: (id, updates) => {
      set((state) => ({
        assets: {
          ...state.assets,
          gold: state.assets.gold.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    removeGold: (id) => {
      set((state) => ({
        assets: { ...state.assets, gold: state.assets.gold.filter((g) => g.id !== id) },
      }));
      get().persistAll();
      get().recalculate();
    },

    // ── Silver ───────────────────────────────────────────────
    addSilver: (holding) => {
      set((state) => ({
        assets: {
          ...state.assets,
          silver: [...state.assets.silver, { ...holding, id: generateId() }],
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    updateSilver: (id, updates) => {
      set((state) => ({
        assets: {
          ...state.assets,
          silver: state.assets.silver.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    removeSilver: (id) => {
      set((state) => ({
        assets: { ...state.assets, silver: state.assets.silver.filter((s) => s.id !== id) },
      }));
      get().persistAll();
      get().recalculate();
    },

    // ── Cash ─────────────────────────────────────────────────
    addCash: (account) => {
      set((state) => ({
        assets: {
          ...state.assets,
          cash: [...state.assets.cash, { ...account, id: generateId() }],
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    updateCash: (id, updates) => {
      set((state) => ({
        assets: {
          ...state.assets,
          cash: state.assets.cash.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    removeCash: (id) => {
      set((state) => ({
        assets: { ...state.assets, cash: state.assets.cash.filter((c) => c.id !== id) },
      }));
      get().persistAll();
      get().recalculate();
    },

    // ── Crypto ───────────────────────────────────────────────
    addCrypto: (holding) => {
      set((state) => ({
        assets: {
          ...state.assets,
          crypto: [...state.assets.crypto, { ...holding, id: generateId() }],
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    updateCrypto: (id, updates) => {
      set((state) => ({
        assets: {
          ...state.assets,
          crypto: state.assets.crypto.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    removeCrypto: (id) => {
      set((state) => ({
        assets: { ...state.assets, crypto: state.assets.crypto.filter((c) => c.id !== id) },
      }));
      get().persistAll();
      get().recalculate();
    },

    // ── Stocks ───────────────────────────────────────────────
    addStock: (holding) => {
      set((state) => ({
        assets: {
          ...state.assets,
          stocks: [...state.assets.stocks, { ...holding, id: generateId() }],
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    updateStock: (id, updates) => {
      set((state) => ({
        assets: {
          ...state.assets,
          stocks: state.assets.stocks.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    removeStock: (id) => {
      set((state) => ({
        assets: { ...state.assets, stocks: state.assets.stocks.filter((s) => s.id !== id) },
      }));
      get().persistAll();
      get().recalculate();
    },

    // ── Retirement ───────────────────────────────────────────
    addRetirement: (account) => {
      set((state) => ({
        assets: {
          ...state.assets,
          retirement: [...state.assets.retirement, { ...account, id: generateId() }],
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    updateRetirement: (id, updates) => {
      set((state) => ({
        assets: {
          ...state.assets,
          retirement: state.assets.retirement.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    removeRetirement: (id) => {
      set((state) => ({
        assets: {
          ...state.assets,
          retirement: state.assets.retirement.filter((r) => r.id !== id),
        },
      }));
      get().persistAll();
      get().recalculate();
    },

    // ── Receivables ──────────────────────────────────────────
    addReceivable: (item) => {
      set((state) => ({
        assets: {
          ...state.assets,
          receivables: [...state.assets.receivables, { ...item, id: generateId() }],
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    updateReceivable: (id, updates) => {
      set((state) => ({
        assets: {
          ...state.assets,
          receivables: state.assets.receivables.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    removeReceivable: (id) => {
      set((state) => ({
        assets: {
          ...state.assets,
          receivables: state.assets.receivables.filter((r) => r.id !== id),
        },
      }));
      get().persistAll();
      get().recalculate();
    },

    // ── Liabilities ──────────────────────────────────────────
    addLiability: (item) => {
      set((state) => ({
        liabilities: {
          liabilities: [...state.liabilities.liabilities, { ...item, id: generateId() }],
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    updateLiability: (id, updates) => {
      set((state) => ({
        liabilities: {
          liabilities: state.liabilities.liabilities.map((l) =>
            l.id === id ? { ...l, ...updates } : l
          ),
        },
      }));
      get().persistAll();
      get().recalculate();
    },
    removeLiability: (id) => {
      set((state) => ({
        liabilities: {
          liabilities: state.liabilities.liabilities.filter((l) => l.id !== id),
        },
      }));
      get().persistAll();
      get().recalculate();
    },

    // ── Prices ───────────────────────────────────────────────
    fetchPrices: async () => {
      set({ ratesLoading: true });
      const state = get();
      try {
        const [rates, metals, cryptos] = await Promise.all([
          getRates(state.exchangeRates),
          getMetalPrices(state.metalPrices),
          getCryptoPrices(state.cryptoPrices, state.cryptoPricesTimestamp),
        ]);
        set({
          exchangeRates: rates,
          metalPrices: metals,
          cryptoPrices: cryptos,
          cryptoPricesTimestamp: new Date().toISOString(),
          ratesLoading: false,
        });
        get().persistAll();
        get().recalculate();
      } catch {
        set({ ratesLoading: false });
      }
    },

    setManualRate: (currency, rate) => {
      set((state) => ({
        exchangeRates: {
          ...state.exchangeRates,
          rates: { ...state.exchangeRates.rates, [currency]: rate },
          source: 'manual',
        },
      }));
      get().persistAll();
      get().recalculate();
    },

    // ── Recalculate ──────────────────────────────────────────
    recalculate: () => {
      const state = get();
      const result = calculateZakat({
        assets: state.assets,
        liabilities: state.liabilities,
        methodology: state.preferences.methodology,
        metalPrices: state.metalPrices,
        exchangeRates: state.exchangeRates,
        cryptoPrices: state.cryptoPrices,
        baseCurrency: state.preferences.baseCurrency,
      });
      set({ result });
    },

    // ── UI ───────────────────────────────────────────────────
    setShowPresetModal: (show) => set({ showPresetModal: show }),
    setShowMethodologyModal: (show) => set({ showMethodologyModal: show }),
    setActiveSection: (section) => set({ activeSection: section }),

    // ── Session ──────────────────────────────────────────────
    resetSession: () => {
      set({
        assets: DEFAULT_ASSETS,
        liabilities: DEFAULT_LIABILITIES,
        result: null,
      });
      get().persistAll();
    },

    persistAll: () => {
      const state = get();
      const schema = getOrCreateStorage();
      schema.preferences = state.preferences;
      schema.currentSession.assets = state.assets;
      schema.currentSession.liabilities = state.liabilities;
      schema.currentSession.lastUpdated = new Date().toISOString();
      schema.cache.exchangeRates = state.exchangeRates;
      schema.cache.metalPrices = state.metalPrices;
      schema.cache.cryptoPrices = state.cryptoPrices;
      saveStorage(schema);
    },
  }))
);
