// PRD §10 – Tests #31, #32 (gold unit expat-specific)
import { describe, it, expect } from 'vitest';
import { calcPureGoldGrams } from '@/utils/unitConversion';
import { GOLD_UNIT_CONVERSIONS } from '@/data/regional/goldUnits';

describe('Gold Unit Conversions', () => {
  it('Test #31 – 15 sovereigns = 119.82g gross', () => {
    const { grossGrams } = calcPureGoldGrams(15, 'sovereign', 'india', 22);
    expect(grossGrams).toBeCloseTo(119.82, 1);
  });

  it('Test #32 – 10 tolas = 116.64g gross', () => {
    const { grossGrams } = calcPureGoldGrams(10, 'tola', 'india', 22);
    expect(grossGrams).toBeCloseTo(116.64, 1);
  });

  it('1 sovereign = 7.988g', () => {
    expect(GOLD_UNIT_CONVERSIONS['sovereign']).toBeCloseTo(7.988, 3);
  });

  it('1 tola = 11.664g', () => {
    expect(GOLD_UNIT_CONVERSIONS['tola']).toBeCloseTo(11.664, 3);
  });

  it('1 baht = 15.244g', () => {
    expect(GOLD_UNIT_CONVERSIONS['baht']).toBeCloseTo(15.244, 3);
  });

  it('1 tael = 37.799g', () => {
    expect(GOLD_UNIT_CONVERSIONS['tael']).toBeCloseTo(37.799, 3);
  });

  it('1 ratti = 0.182g', () => {
    expect(GOLD_UNIT_CONVERSIONS['ratti']).toBeCloseTo(0.182, 3);
  });

  it('India 22K purity = 91.6%', () => {
    const { pureGrams, grossGrams } = calcPureGoldGrams(1, 'sovereign', 'india', 22);
    expect(pureGrams / grossGrams).toBeCloseTo(0.916, 2);
  });

  it('pure grams = grossGrams × purity', () => {
    const { grossGrams, pureGrams } = calcPureGoldGrams(15, 'sovereign', 'india', 22);
    expect(pureGrams).toBeCloseTo(grossGrams * 0.916, 2);
  });

  it('gram unit: 100g gross stays 100g', () => {
    const { grossGrams } = calcPureGoldGrams(100, 'gram', 'india', 22);
    expect(grossGrams).toBe(100);
  });

  it('custom purity ratio applies correctly', () => {
    const { pureGrams, grossGrams } = calcPureGoldGrams(10, 'gram', 'custom', 22, 0.999);
    expect(pureGrams / grossGrams).toBeCloseTo(0.999, 3);
  });
});
