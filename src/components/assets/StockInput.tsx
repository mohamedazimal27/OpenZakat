// PRD §4.1 – Stocks: Quick mode (total value) + Detailed mode
// PRD §4.4 – Quick Stock Mode: 2.5% on full market value (default for all holding types)
// Methodology: full market value is the broadest scholarly consensus & most conservative default.
import { Plus, Trash2, Info } from 'lucide-react';
import { useStore } from '@/store';
import { formatCurrency } from '@/utils/formatters';
import { calcStockZakat } from '@/lib/calculation/stocks';
import { cn } from '@/components/common/cn';
import type { StockInputMode, StockHoldingType } from '@/types';
import { t } from '@/i18n';

const HOLDING_TYPES: { value: StockHoldingType; label: string }[] = [
  { value: 'trading', label: 'Trading' },
  { value: 'long-term', label: 'Long-term Investment' },
];

export function StockInput() {
  const { assets, addStock, updateStock, removeStock, preferences } = useStore();
  const defaultMode: StockInputMode = preferences.methodology.stockInputMode;
  const language = preferences.language;

  const handleAdd = () => {
    addStock({ mode: defaultMode, totalValue: '', holdingType: 'long-term' });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">📈 {t('asset.stocks.title', language)}</h3>
        <button onClick={handleAdd} className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700">
          <Plus className="h-3.5 w-3.5" /> {t('asset.stocks.add', language)}
        </button>
      </div>

      {assets.stocks.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">{t('asset.stocks.empty', language)}</div>
      )}

      {assets.stocks.map((holding) => {
        const { zakatable, zakatDue } = calcStockZakat(holding);
        return (
          <div key={holding.id} className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
            {/* Mode toggle */}
            <div className="flex gap-2">
              {(['quick', 'detailed'] as StockInputMode[]).map(mode => (
                <button key={mode} onClick={() => updateStock(holding.id, { mode })}
                  className={cn('flex-1 rounded-lg border py-1.5 text-xs font-medium', holding.mode === mode ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-600')}>
                  {mode === 'quick' ? `⚡ ${t('asset.stocks.quick', language)}` : `🔍 ${t('asset.stocks.detailed', language)}`}
                </button>
              ))}
            </div>

            {holding.mode === 'quick' ? (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.stocks.totalMarketValue', language)} ({preferences.baseCurrency})</label>
                  <input type="number" min="0" step="0.01" value={holding.totalValue ?? ''}
                    onChange={(e) => updateStock(holding.id, { totalValue: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.stocks.holdingType', language)}</label>
                  <select value={holding.holdingType ?? 'long-term'} onChange={(e) => updateStock(holding.id, { holdingType: e.target.value as StockHoldingType })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                    {HOLDING_TYPES.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.value === 'trading' ? t('asset.stocks.trading', language) : t('asset.stocks.longTerm', language)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-start gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
                  <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>
                    {t('asset.stocks.quickInfo', language)}
                    {holding.holdingType === 'long-term' && (
                      <> {t('asset.stocks.quickInfoLongTerm', language)}</>
                    )}
                  </span>
                </div>
                {parseFloat(holding.totalValue ?? '0') > 0 && (
                  <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs space-y-0.5">
                    <div>{t('asset.stocks.zakatable', language)}: {formatCurrency(zakatable.toNumber(), preferences.baseCurrency, preferences.numberingFormat)}</div>
                    <div className="font-semibold text-emerald-700">{t('asset.stocks.zakatDue', language)}: {formatCurrency(zakatDue.toNumber(), preferences.baseCurrency, preferences.numberingFormat)}</div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.stocks.symbol', language)}</label>
                    <input type="text" value={holding.symbol ?? ''} onChange={(e) => updateStock(holding.id, { symbol: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="AAPL" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.stocks.marketValue', language)} ({preferences.baseCurrency})</label>
                    <input type="number" min="0" value={holding.marketValue ?? ''} onChange={(e) => updateStock(holding.id, { marketValue: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="0" />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end">
              <button onClick={() => removeStock(holding.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
