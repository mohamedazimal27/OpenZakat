// PRD §10 – Test #35 (Stock quick mode: total value → 30% zakatable)
import { describe, it, expect } from 'vitest';
import { calcStockZakat } from '@/lib/calculation/stocks';

describe('Stock Quick Mode (Test #35)', () => {
  it('Test #35 – Quick mode: SGD 45000 → 30% zakatable = SGD 13500', () => {
    const holding = { id: '1', mode: 'quick' as const, totalValue: '45000', holdingType: 'long-term' as const };
    const { zakatable } = calcStockZakat(holding);
    expect(zakatable.toNumber()).toBeCloseTo(13500, 0);
  });

  it('Quick mode: zakatDue = zakatable × 2.5%', () => {
    const holding = { id: '1', mode: 'quick' as const, totalValue: '45000', holdingType: 'long-term' as const };
    const { zakatDue, zakatable } = calcStockZakat(holding);
    expect(zakatDue.toNumber()).toBeCloseTo(zakatable.toNumber() * 0.025, 2);
  });

  it('Quick mode SGD 45000 zakatDue = SGD 337.50', () => {
    const holding = { id: '1', mode: 'quick' as const, totalValue: '45000', holdingType: 'long-term' as const };
    const { zakatDue } = calcStockZakat(holding);
    expect(zakatDue.toNumber()).toBeCloseTo(337.5, 1);
  });

  it('Trading stocks (quick): 2.5% on full market value', () => {
    const holding = { id: '1', mode: 'quick' as const, totalValue: '100000', holdingType: 'trading' as const };
    const { zakatable, zakatDue } = calcStockZakat(holding);
    expect(zakatable.toNumber()).toBeCloseTo(100000, 0);
    expect(zakatDue.toNumber()).toBeCloseTo(2500, 0);
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
