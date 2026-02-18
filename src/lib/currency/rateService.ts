// ============================================================
// OpenZakat – Exchange Rate & Price Service
// PRD §7.1 – API Integration
// PRD §3.3 – Fallback chain: Live API → Cached → Committed → Manual
// ============================================================

import committedRates from '@/data/prices/rates.json';
import committedGold from '@/data/prices/gold.json';
import committedSilver from '@/data/prices/silver.json';
import committedCrypto from '@/data/prices/crypto.json';
import type { ExchangeRateCache, MetalPriceCache } from '@/types';
import { isStale } from '@/utils/formatters';
import { COINGECKO_IDS } from '@/data/coins';

const CACHE_KEY = 'openzakat_v3';
const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest/USD';
const COINGECKO_API = `https://api.coingecko.com/api/v3/simple/price?ids=${COINGECKO_IDS}&vs_currencies=usd`;

// ── Exchange Rates ───────────────────────────────────────────

/**
 * Fetch live exchange rates from ExchangeRate-API (keyless free tier).
 * PRD §7.1 – "ExchangeRate-API.io"
 */
export async function fetchLiveRates(): Promise<ExchangeRateCache> {
  const response = await fetch(EXCHANGE_RATE_API);
  if (!response.ok) throw new Error(`Rate API error: ${response.status}`);

  const data = await response.json();
  const rates: Record<string, string> = {};

  for (const [key, value] of Object.entries(data.rates as Record<string, number>)) {
    rates[key] = String(value);
  }

  return {
    rates,
    base: 'USD',
    timestamp: new Date().toISOString(),
    source: 'api',
  };
}

/**
 * Get committed fallback rates.
 * PRD §3.3 – "Committed prices.json → Manual"
 */
export function getCommittedRates(): ExchangeRateCache {
  const rates: Record<string, string> = {};
  for (const [key, value] of Object.entries(committedRates.rates)) {
    rates[key] = String(value);
  }
  return {
    rates,
    base: 'USD',
    timestamp: committedRates.timestamp,
    source: 'committed',
  };
}

/**
 * Main rate fetcher with fallback chain.
 * PRD §3.3 – "Live API → Cached localStorage → Committed prices.json → Manual"
 */
export async function getRates(
  cachedRates?: ExchangeRateCache
): Promise<ExchangeRateCache> {
  // 1. Check if cached rates are fresh (<24h)
  if (cachedRates && !isStale(cachedRates.timestamp)) {
    return { ...cachedRates, source: 'api' }; // treat fresh cache as live
  }

  // 2. Try live API
  try {
    return await fetchLiveRates();
  } catch (_error) {
    console.warn('Live rate fetch failed, using cached/committed rates');
  }

  // 3. Use stale cache if available
  if (cachedRates) {
    return cachedRates;
  }

  // 4. Committed fallback
  return getCommittedRates();
}

// ── Metal Prices ─────────────────────────────────────────────

/**
 * Get committed gold/silver fallback prices.
 * PRD §7.1 – "GitHub Actions fetches daily; users read from committed JSON"
 */
export function getCommittedMetalPrices(): MetalPriceCache {
  return {
    gold: String(committedGold.price_gram_24k),
    silver: String(committedSilver.price_gram),
    timestamp: committedGold.timestamp,
  };
}

/**
 * Get metal prices with fallback.
 * GitHub Actions commits fresh prices daily; users always use committed prices.
 */
export async function getMetalPrices(
  cachedPrices?: MetalPriceCache
): Promise<MetalPriceCache> {
  // For users: read committed prices (updated daily by GitHub Actions)
  // Cache freshness check: if cached is newer than committed, use cache
  if (cachedPrices && !isStale(cachedPrices.timestamp, 25)) {
    return cachedPrices;
  }
  return getCommittedMetalPrices();
}

// ── Crypto Prices ─────────────────────────────────────────────

/**
 * Fetch live crypto prices from CoinGecko (free tier, keyless).
 * PRD §7.1 – "CoinGecko free tier"
 */
export async function fetchLiveCryptoPrices(): Promise<Record<string, string>> {
  const response = await fetch(COINGECKO_API);
  if (!response.ok) throw new Error(`CoinGecko API error: ${response.status}`);

  const data = await response.json() as Record<string, { usd: number }>;
  const prices: Record<string, string> = {};
  for (const [coinId, priceData] of Object.entries(data)) {
    prices[coinId] = String(priceData.usd);
  }
  return prices;
}

/**
 * Get committed fallback crypto prices.
 */
export function getCommittedCryptoPrices(): Record<string, string> {
  const prices: Record<string, string> = {};
  for (const [key, value] of Object.entries(committedCrypto.prices)) {
    prices[key] = String(value);
  }
  return prices;
}

/**
 * Get crypto prices with fallback chain.
 */
export async function getCryptoPrices(
  cachedPrices?: Record<string, string>,
  cacheTimestamp?: string
): Promise<Record<string, string>> {
  // Check if cache is fresh
  if (cachedPrices && cacheTimestamp && !isStale(cacheTimestamp)) {
    return cachedPrices;
  }

  try {
    return await fetchLiveCryptoPrices();
  } catch (_error) {
    console.warn('CoinGecko fetch failed, using committed prices');
    return cachedPrices ?? getCommittedCryptoPrices();
  }
}

// ── Storage Key ──────────────────────────────────────────────
export { CACHE_KEY };
