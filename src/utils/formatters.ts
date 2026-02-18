// ============================================================
// OpenZakat – Number & Currency Formatters
// PRD §4.3 – Indian numbering format (lakhs/crores)
// PRD §13 – Currency-specific formatting
// ============================================================

import type { NumberingFormat } from '@/types';
import { getCurrencySymbol } from '@/data/currencies';

/**
 * Format a number in Indian numbering system.
 * PRD §4.3 – "₹ 1,00,000 (lakhs/crores) vs 100,000"
 * Test #34: Indian numbering format (1,00,000 vs 100,000)
 */
export function formatIndian(value: number, decimals: number = 2): string {
  if (!isFinite(value)) return '0.00';

  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split('.');

  // Indian numbering: last 3 digits, then groups of 2
  if (intPart.length <= 3) {
    return decPart ? `${intPart}.${decPart}` : intPart;
  }

  const lastThree = intPart.slice(-3);
  const remaining = intPart.slice(0, -3);
  const formatted = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;

  return decPart ? `${formatted}.${decPart}` : formatted;
}

/**
 * Format number in international format (comma every 3 digits).
 */
export function formatInternational(value: number, decimals: number = 2): string {
  if (!isFinite(value)) return '0.00';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format a number based on the user's numbering format preference.
 */
export function formatNumber(
  value: number | string,
  format: NumberingFormat,
  decimals: number = 2
): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0.00';

  if (format === 'indian') {
    return formatIndian(num, decimals);
  }
  return formatInternational(num, decimals);
}

/**
 * Format a currency amount with symbol prefix.
 * PRD §13 – Currency-specific formatting
 */
export function formatCurrency(
  value: number | string,
  currencyCode: string,
  format: NumberingFormat = 'international',
  decimals: number = 2
): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return `${currencyCode} 0.00`;

  const symbol = getCurrencySymbol(currencyCode);
  const formatted = formatNumber(num, format, decimals);

  // currencies where symbol goes before with space
  const codeFirst = ['AED', 'SAR', 'QAR', 'KWD', 'OMR', 'BHD', 'MYR', 'CHF', 'HUF'];
  if (codeFirst.includes(currencyCode)) {
    return `${currencyCode} ${formatted}`;
  }

  return `${symbol} ${formatted}`;
}

/**
 * Format INR in Indian short form (lakhs/crores).
 * PRD §4.3 – "₹ 1.17 Cr or ₹ 117.46 L"
 */
export function formatINRShort(value: number): string {
  const absVal = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absVal >= 1_00_00_000) {
    // crores
    return `${sign}₹ ${(absVal / 1_00_00_000).toFixed(2)} Cr`;
  } else if (absVal >= 1_00_000) {
    // lakhs
    return `${sign}₹ ${(absVal / 1_00_000).toFixed(2)} L`;
  } else if (absVal >= 1_000) {
    // thousands
    return `${sign}₹ ${(absVal / 1_000).toFixed(2)} K`;
  }
  return `${sign}₹ ${absVal.toFixed(2)}`;
}

/**
 * Format a timestamp as a human-readable string.
 */
export function formatTimestamp(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  } catch {
    return isoString;
  }
}

/**
 * Check if a cached timestamp is stale (older than maxAgeHours).
 * PRD §4.3 – "24-hour rate caching with stale data warnings"
 */
export function isStale(timestamp: string, maxAgeHours: number = 24): boolean {
  try {
    const cached = new Date(timestamp).getTime();
    const now = Date.now();
    return now - cached > maxAgeHours * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

/**
 * Format hours ago string for UI display.
 */
export function hoursAgo(timestamp: string): string {
  try {
    const diff = Date.now() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours === 0) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  } catch {
    return 'unknown';
  }
}

/**
 * Generate a short UUID-like ID.
 */
export function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
