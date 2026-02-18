// ============================================================
// OpenZakat – localStorage Adapter
// PRD §6.1 – localStorage Schema v3.0
// ============================================================

import type { StorageSchema, Preferences, AssetState, LiabilityState } from '@/types';
import { DEFAULT_PREFERENCES, DEFAULT_ASSETS, DEFAULT_LIABILITIES } from '@/store/defaults';

const STORAGE_KEY = 'openzakat_v3';

export function loadStorage(): StorageSchema | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StorageSchema;
    if (parsed.version !== '3.0') return null; // version mismatch → reset
    return parsed;
  } catch {
    return null;
  }
}

export function saveStorage(schema: StorageSchema): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function buildInitialSchema(): StorageSchema {
  return {
    version: '3.0',
    preferences: DEFAULT_PREFERENCES,
    currentSession: {
      assets: DEFAULT_ASSETS,
      liabilities: DEFAULT_LIABILITIES,
      hawlAnniversary: null,
      lastUpdated: new Date().toISOString(),
    },
    cache: {
      exchangeRates: {
        rates: {},
        base: 'USD',
        timestamp: new Date(0).toISOString(), // force refresh
        source: 'committed',
      },
      metalPrices: {
        gold: '85.50',
        silver: '0.955',
        timestamp: new Date(0).toISOString(),
      },
      cryptoPrices: {},
    },
  };
}

export function getOrCreateStorage(): StorageSchema {
  return loadStorage() ?? buildInitialSchema();
}

export function savePreferences(prefs: Preferences): void {
  const schema = getOrCreateStorage();
  schema.preferences = prefs;
  schema.currentSession.lastUpdated = new Date().toISOString();
  saveStorage(schema);
}

export function saveSession(assets: AssetState, liabilities: LiabilityState): void {
  const schema = getOrCreateStorage();
  schema.currentSession.assets = assets;
  schema.currentSession.liabilities = liabilities;
  schema.currentSession.lastUpdated = new Date().toISOString();
  saveStorage(schema);
}
