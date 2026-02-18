// ============================================================
// OpenZakat – Silver Input Component
// PRD §4.1 – Silver: 100% zakatable at market rate
// ============================================================

import { Plus, Trash2 } from 'lucide-react';
import { useStore } from '@/store';
import { formatCurrency } from '@/utils/formatters';
import { safeDecimal } from '@/utils/decimal';
import type { SilverHolding, JewelryType } from '@/types';

const SILVER_TYPES: { value: JewelryType; label: string }[] = [
  { value: 'bullion', label: 'Bullion / Bars' },
  { value: 'coins', label: 'Coins' },
  { value: 'jewelry', label: 'Jewelry' },
];

export function SilverInput() {
  const { assets, addSilver, updateSilver, removeSilver, metalPrices, exchangeRates, preferences } = useStore();

  const handleAdd = () => {
    addSilver({ type: 'bullion', weightGrams: '' });
  };

  const calcValue = (holding: SilverHolding) => {
    const grams = safeDecimal(holding.weightGrams);
    const silverPrice = safeDecimal(metalPrices.silver);
    const usdToBase = safeDecimal(exchangeRates.rates[preferences.baseCurrency] ?? '1');
    return grams.mul(silverPrice).mul(usdToBase).toNumber();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">🥈 Silver</h3>
        <button onClick={handleAdd} className="flex items-center gap-1.5 rounded-lg bg-gray-400 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-500">
          <Plus className="h-3.5 w-3.5" /> Add Silver
        </button>
      </div>

      {assets.silver.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
          No silver holdings added yet
        </div>
      )}

      {assets.silver.map((holding) => (
        <div key={holding.id} className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
              <select
                value={holding.type}
                onChange={(e) => updateSilver(holding.id, { type: e.target.value as JewelryType })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                {SILVER_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Weight (grams)</label>
              <input
                type="number" min="0" step="0.1"
                value={holding.weightGrams}
                onChange={(e) => updateSilver(holding.id, { weightGrams: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="0"
              />
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-emerald-600 font-semibold">
              {formatCurrency(calcValue(holding), preferences.baseCurrency, preferences.numberingFormat)}
            </span>
            <button onClick={() => removeSilver(holding.id)} className="text-red-400 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
