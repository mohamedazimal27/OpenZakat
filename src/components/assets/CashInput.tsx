// ============================================================
// OpenZakat – Cash & Banks Input
// PRD §4.1 – Cash with dual-currency display
// PRD §13 – Multi-Currency Support
// ============================================================

import { Plus, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';
import { useStore } from '@/store';
import { convertToBase } from '@/lib/calculation/currency';
import { formatCurrency, hoursAgo, isStale } from '@/utils/formatters';
import { SORTED_CURRENCIES } from '@/data/currencies';
import { cn } from '@/components/common/cn';
import type { CashAccount } from '@/types';
import { t } from '@/i18n';

export function CashInput() {
  const { assets, addCash, updateCash, removeCash, exchangeRates, preferences, fetchPrices } = useStore();
  const language = preferences.language;

  const handleAdd = () => {
    const { converted, rate } = convertToBase('0', preferences.baseCurrency, preferences.baseCurrency, exchangeRates.rates);
    addCash({
      accountName: '',
      amount: '',
      currency: preferences.baseCurrency,
      convertedToBase: converted.toFixed(2),
      exchangeRate: rate.toFixed(6),
      rateSource: 'committed',
      rateTimestamp: new Date().toISOString(),
    });
  };

  const handleAmountChange = (account: CashAccount, newAmount: string) => {
    const { converted, rate } = convertToBase(newAmount || '0', account.currency, preferences.baseCurrency, exchangeRates.rates);
    updateCash(account.id, {
      amount: newAmount,
      convertedToBase: converted.toFixed(2),
      exchangeRate: rate.toFixed(6),
      rateTimestamp: exchangeRates.timestamp,
      rateSource: exchangeRates.source,
    });
  };

  const handleCurrencyChange = (account: CashAccount, newCurrency: string) => {
    const { converted, rate } = convertToBase(account.amount || '0', newCurrency, preferences.baseCurrency, exchangeRates.rates);
    updateCash(account.id, {
      currency: newCurrency,
      convertedToBase: converted.toFixed(2),
      exchangeRate: rate.toFixed(6),
    });
  };

  const totalBase = assets.cash.reduce((sum, acc) => sum + parseFloat(acc.convertedToBase || '0'), 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">💰 {t('asset.cash.title', language)}</h3>
        <button onClick={handleAdd} className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">
          <Plus className="h-3.5 w-3.5" /> {t('asset.cash.add', language)}
        </button>
      </div>

      {assets.cash.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
          {t('asset.cash.empty', language)}
        </div>
      )}

      {assets.cash.map((account) => {
        const stale = isStale(account.rateTimestamp);
        return (
          <div key={account.id} className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.common.accountName', language)}</label>
                <input
                  type="text"
                  value={account.accountName}
                  onChange={(e) => updateCash(account.id, { accountName: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="e.g. DBS Singapore"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.common.currency', language)}</label>
                <select
                  value={account.currency}
                  onChange={(e) => handleCurrencyChange(account, e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  {SORTED_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.common.amount', language)} ({account.currency})</label>
              <input
                type="number" min="0" step="0.01"
                value={account.amount}
                onChange={(e) => handleAmountChange(account, e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="0"
              />
            </div>

            {/* Conversion display */}
            {account.currency !== preferences.baseCurrency && parseFloat(account.amount) > 0 && (
              <div className={cn(
                'rounded-lg px-3 py-2 text-xs space-y-0.5',
                stale ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'
              )}>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    ≈ {formatCurrency(parseFloat(account.convertedToBase), preferences.baseCurrency, preferences.numberingFormat)} ({t('asset.cash.base', language)})
                  </span>
                  {stale ? (
                    <span className="flex items-center gap-1 text-amber-600">
                      <AlertTriangle className="h-3 w-3" />
                      {hoursAgo(account.rateTimestamp)}
                    </span>
                  ) : (
                    <span className="text-gray-400">{t('asset.cash.rate', language)}: {parseFloat(account.exchangeRate).toFixed(4)} • {t('asset.cash.live', language)} ✓</span>
                  )}
                </div>
                {stale && (
                  <button onClick={fetchPrices} className="flex items-center gap-1 text-amber-700 underline">
                    <RefreshCw className="h-3 w-3" /> {t('asset.cash.refreshRate', language)}
                  </button>
                )}
              </div>
            )}

            {/* Home currency display */}
            {preferences.homeCurrency && preferences.homeCurrency !== account.currency && parseFloat(account.convertedToBase) > 0 && (
              <div className="text-xs text-gray-400">
                ≈ {formatCurrency(
                  parseFloat(convertToBase(account.convertedToBase, preferences.baseCurrency, preferences.homeCurrency, exchangeRates.rates).converted.toFixed(2)),
                  preferences.homeCurrency,
                  preferences.numberingFormat
                )} ({t('asset.cash.home', language)})
              </div>
            )}

            <div className="flex justify-end">
              <button onClick={() => removeCash(account.id)} className="text-red-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}

      {assets.cash.length > 0 && (
        <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm">
          <div className="flex justify-between font-semibold">
            <span>{t('asset.cash.total', language)}</span>
            <span className="text-blue-700">{formatCurrency(totalBase, preferences.baseCurrency, preferences.numberingFormat)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
