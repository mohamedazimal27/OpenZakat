// PRD §10 – Test #33 (dual-currency display)
// PRD §10 – Test #34 (Indian numbering format)
import { describe, it, expect } from 'vitest';
import { convertToBase, calculateMultiCurrencyTotal } from '@/lib/calculation/currency';
import { formatCurrency, formatIndian as formatIndianNumber } from '@/utils/formatters';

// Rates: "1 USD = X currency" — standard API format
const MOCK_RATES: Record<string, string> = {
  'USD': '1',        // base
  'SGD': '1.35',    // 1 USD = 1.35 SGD
  'INR': '83.33',   // 1 USD = 83.33 INR  →  1 INR = 1.35/83.33 SGD = 0.01620 SGD
  'EUR': '0.92',    // 1 USD = 0.92 EUR   →  1 EUR = 1.35/0.92 SGD  = 1.4674 SGD
  'AED': '3.67',    // 1 USD = 3.67 AED
};

describe('Dual-Currency Display (Test #33)', () => {
  it('converts INR to SGD correctly', () => {
    // 800000 INR × (1.35 / 83.33) ≈ 12960.5 SGD
    const { converted } = convertToBase('800000', 'INR', 'SGD', MOCK_RATES);
    expect(converted.toNumber()).toBeGreaterThan(12900);
    expect(converted.toNumber()).toBeLessThan(13100);
  });

  it('base currency conversion is 1:1', () => {
    const { converted } = convertToBase('100000', 'SGD', 'SGD', MOCK_RATES);
    expect(converted.toNumber()).toBe(100000);
  });

  it('USD to SGD with known rate', () => {
    const { converted } = convertToBase('5000', 'USD', 'SGD', MOCK_RATES);
    expect(converted.toNumber()).toBeCloseTo(6750, 0);
  });

  it('EUR to SGD with known rate', () => {
    // 2500 EUR × (1.35/0.92) ≈ 3668 SGD
    const { converted } = convertToBase('2500', 'EUR', 'SGD', MOCK_RATES);
    expect(converted.toNumber()).toBeCloseTo(3668, 0);
  });

  it('Test #33 – Multi-currency total (Mohamed scenario)', () => {
    const accounts = [
      { amount: '100000', currency: 'SGD' },
      { amount: '800000', currency: 'INR' },
      { amount: '5000', currency: 'USD' },
      { amount: '2500', currency: 'EUR' },
    ];
    const total = calculateMultiCurrencyTotal(accounts, 'SGD', MOCK_RATES);
    // SGD: 100000 + INR→SGD: 12960 + USD→SGD: 6750 + EUR→SGD: 3375
    // ~ 123085 (approximate)
    expect(total.toNumber()).toBeGreaterThan(120000);
    expect(total.toNumber()).toBeLessThan(130000);
  });
});

describe('Indian Numbering Format (Test #34)', () => {
  it('Test #34 – 100000 in Indian format = 1,00,000', () => {
    const result = formatIndianNumber(100000, 0);
    expect(result).toBe('1,00,000');
  });

  it('1000000 → 10,00,000', () => {
    expect(formatIndianNumber(1000000, 0)).toBe('10,00,000');
  });

  it('10000000 → 1,00,00,000', () => {
    expect(formatIndianNumber(10000000, 0)).toBe('1,00,00,000');
  });

  it('formatCurrency with INR uses Indian format', () => {
    const result = formatCurrency(100000, 'INR', 'indian');
    expect(result).toContain('1,00,000');
  });

  it('formatCurrency with SGD uses international format', () => {
    const result = formatCurrency(100000, 'SGD', 'international');
    expect(result).toContain('100,000');
  });
});
