// Stock Quick Mode – Updated methodology (Test #35 revised)
// Correction: both trading AND long-term stocks default to 2.5% on full market value.
// The previous 30% proxy was a disputed heuristic, NOT a formal AAOIFI ruling.
// Conservative default (full market value) is the broadest scholarly consensus.
import { describe, it, expect } from 'vitest';
import { calcStockZakat } from '@/lib/calculation/stocks';

describe('Stock Quick Mode – Full Market Value Default', () => {
  // Previously Test #35 tested 30% of 45000 = 13500 (wrong)
  // Corrected: long-term also uses full market value
  it('Long-term quick mode: SGD 45000 → 100% zakatable = SGD 45000', () => {
    const holding = { id: '1', mode: 'quick' as const, totalValue: '45000', holdingType: 'long-term' as const };
    const { zakatable } = calcStockZakat(holding);
    expect(zakatable.toNumber()).toBeCloseTo(45000, 0);
  });

  it('Long-term quick mode: SGD 45000 zakatDue = SGD 1125 (2.5%)', () => {
    const holding = { id: '1', mode: 'quick' as const, totalValue: '45000', holdingType: 'long-term' as const };
    const { zakatDue } = calcStockZakat(holding);
    expect(zakatDue.toNumber()).toBeCloseTo(1125, 1);
  });

  it('Quick mode: zakatDue = zakatable × 2.5%', () => {
    const holding = { id: '1', mode: 'quick' as const, totalValue: '45000', holdingType: 'long-term' as const };
    const { zakatDue, zakatable } = calcStockZakat(holding);
    expect(zakatDue.toNumber()).toBeCloseTo(zakatable.toNumber() * 0.025, 2);
  });

  it('Trading stocks (quick): 2.5% on full market value', () => {
    const holding = { id: '1', mode: 'quick' as const, totalValue: '100000', holdingType: 'trading' as const };
    const { zakatable, zakatDue } = calcStockZakat(holding);
    expect(zakatable.toNumber()).toBeCloseTo(100000, 0);
    expect(zakatDue.toNumber()).toBeCloseTo(2500, 0);
  });

  it('Long-term and trading produce same result (both 2.5% on full value)', () => {
    const trading = { id: '1', mode: 'quick' as const, totalValue: '100000', holdingType: 'trading' as const };
    const longTerm = { id: '2', mode: 'quick' as const, totalValue: '100000', holdingType: 'long-term' as const };
    const { zakatDue: tradingDue } = calcStockZakat(trading);
    const { zakatDue: ltDue } = calcStockZakat(longTerm);
    expect(tradingDue.toNumber()).toBeCloseTo(ltDue.toNumber(), 2);
  });

  it('Detailed mode: 2.5% on market value', () => {
    const holding = { id: '1', mode: 'detailed' as const, marketValue: '50000' };
    const { zakatDue } = calcStockZakat(holding);
    expect(zakatDue.toNumber()).toBeCloseTo(1250, 0);
  });

  it('Zero value returns zero zakat', () => {
    const holding = { id: '1', mode: 'quick' as const, totalValue: '0', holdingType: 'long-term' as const };
    const { zakatDue } = calcStockZakat(holding);
    expect(zakatDue.toNumber()).toBe(0);
  });
});
