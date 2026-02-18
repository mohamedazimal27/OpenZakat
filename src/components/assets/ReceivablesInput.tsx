// PRD §4.1 – Receivables: Strong (100%) / Doubtful (0%)
import { Plus, Trash2 } from 'lucide-react';
import { useStore } from '@/store';
import { convertToBase } from '@/lib/calculation/currency';
import { formatCurrency } from '@/utils/formatters';
import { CURRENCIES } from '@/data/currencies';
import { cn } from '@/components/common/cn';
import type { ReceivableReliability } from '@/types';

export function ReceivablesInput() {
  const { assets, addReceivable, updateReceivable, removeReceivable, exchangeRates, preferences } = useStore();

  const handleAdd = () => {
    addReceivable({ amount: '', currency: preferences.baseCurrency, reliability: 'strong', expectedDate: '', description: '' });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">💳 Receivables</h3>
        <button onClick={handleAdd} className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700">
          <Plus className="h-3.5 w-3.5" /> Add Receivable
        </button>
      </div>

      {assets.receivables.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">No receivables added yet</div>
      )}

      {assets.receivables.map((item) => {
        const converted = convertToBase(item.amount || '0', item.currency, preferences.baseCurrency, exchangeRates.rates).converted.toNumber();
        return (
          <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <input type="text" value={item.description} onChange={(e) => updateReceivable(item.id, { description: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. Loan to friend" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Amount</label>
                <input type="number" min="0" value={item.amount} onChange={(e) => updateReceivable(item.id, { amount: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="0" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Currency</label>
                <select value={item.currency} onChange={(e) => updateReceivable(item.id, { currency: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                  {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Debtor Reliability</label>
                <div className="flex gap-2">
                  {(['strong', 'doubtful'] as ReceivableReliability[]).map(r => (
                    <button key={r} onClick={() => updateReceivable(item.id, { reliability: r })}
                      className={cn('flex-1 rounded-lg border py-1.5 text-xs font-medium', item.reliability === r
                        ? r === 'strong' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-amber-400 bg-amber-50 text-amber-700'
                        : 'border-gray-200 text-gray-600')}>
                      {r === 'strong' ? '✅ Strong (100% zakatable)' : '⚠️ Doubtful (excluded)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">
                {item.reliability === 'doubtful'
                  ? <span className="text-amber-600">Excluded from Zakat (doubtful debt)</span>
                  : <span className="text-emerald-600 font-semibold">{formatCurrency(converted, preferences.baseCurrency, preferences.numberingFormat)}</span>
                }
              </span>
              <button onClick={() => removeReceivable(item.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
