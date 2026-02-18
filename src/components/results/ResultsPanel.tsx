// ============================================================
// OpenZakat – Results Panel
// PRD §2.2 – Step 6: Results with Dual Currency
// ============================================================

import { Copy, CheckCircle2, XCircle } from 'lucide-react';
import { useStore } from '@/store';
import { convertToBase } from '@/lib/calculation/currency';
import { formatCurrency, formatTimestamp } from '@/utils/formatters';
import { cn } from '@/components/common/cn';

export function ResultsPanel() {
  const { result, preferences, exchangeRates } = useStore();

  if (!result) return null;

  const base = preferences.baseCurrency;
  const home = preferences.homeCurrency;
  const fmt = preferences.numberingFormat;

  const toHome = (val: string) => {
    if (!home || home === base) return null;
    return convertToBase(val, base, home, exchangeRates.rates).converted.toNumber();
  };

  const handleCopy = () => {
    const text = [
      `OpenZakat Calculation — ${new Date().toLocaleDateString()}`,
      `Method: ${result.methodology.nisabBasis} Nisab / ${result.methodology.debtDeduction} debt deduction`,
      '',
      `Total Assets: ${formatCurrency(parseFloat(result.totalAssets), base, fmt)}`,
      `Liabilities: ${formatCurrency(parseFloat(result.totalLiabilities), base, fmt)}`,
      `Net Wealth: ${formatCurrency(parseFloat(result.netWealth), base, fmt)}`,
      `Nisab: ${formatCurrency(parseFloat(result.nisabValue), base, fmt)} — ${result.nisabMet ? 'Met ✅' : 'Not Met ❌'}`,
      `ZAKAT DUE: ${formatCurrency(parseFloat(result.zakatDue), base, fmt)}`,
    ].join('\n');
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const breakdown = result.breakdown;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">🎉 Your Zakat Calculation</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Method: {result.methodology.nisabBasis} Nisab / {result.methodology.debtDeduction} debts / {result.methodology.retirementMethod} retirement
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50">
              <Copy className="h-3.5 w-3.5" /> Copy
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="px-6 py-4 space-y-4">
        {/* Nisab status */}
        <div className={cn('flex items-center gap-3 rounded-xl px-4 py-3',
          result.nisabMet ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200')}>
          {result.nisabMet
            ? <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            : <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
          <div>
            <p className={cn('text-sm font-semibold', result.nisabMet ? 'text-emerald-700' : 'text-red-700')}>
              Nisab {result.nisabMet ? 'Met ✅' : 'Not Met ❌'}
            </p>
            <p className="text-xs text-gray-500">
              Nisab threshold: {formatCurrency(parseFloat(result.nisabValue), base, fmt)}
              {toHome(result.nisabValue) && ` ≈ ${formatCurrency(toHome(result.nisabValue)!, home!, fmt)}`}
            </p>
          </div>
        </div>

        {/* Dual-currency table */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>Item</span>
            <span className="text-right">{base}</span>
            {home && home !== base && <span className="text-right">{home} (≈)</span>}
          </div>
          {[
            { label: 'Total Assets', val: result.totalAssets },
            { label: 'Liabilities', val: result.totalLiabilities, negative: true },
            { label: 'Net Wealth', val: result.netWealth, bold: true },
          ].map(({ label, val, negative, bold }) => (
            <div key={label} className={cn('grid px-4 py-2 border-t text-sm',
              home && home !== base ? 'grid-cols-3' : 'grid-cols-2',
              bold ? 'font-semibold bg-gray-50' : '')}>
              <span className="text-gray-700">{label}</span>
              <span className={cn('text-right', negative ? 'text-red-600' : 'text-gray-900')}>
                {negative && parseFloat(val) > 0 ? '-' : ''}{formatCurrency(Math.abs(parseFloat(val)), base, fmt)}
              </span>
              {home && home !== base && (
                <span className="text-right text-gray-400 text-xs">
                  {negative && parseFloat(val) > 0 ? '-' : ''}
                  {formatCurrency(Math.abs(toHome(val) ?? 0), home, fmt)}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Zakat Due */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 py-5 text-white">
          <p className="text-sm font-medium opacity-80">ZAKAT DUE (2.5%)</p>
          <p className="text-3xl font-bold mt-1">{formatCurrency(parseFloat(result.zakatDue), base, fmt)}</p>
          {toHome(result.zakatDue) !== null && (
            <p className="text-sm opacity-75 mt-0.5">≈ {formatCurrency(toHome(result.zakatDue)!, home!, fmt)}</p>
          )}
          {!result.nisabMet && <p className="text-xs opacity-70 mt-2">⚠️ Nisab not met — Zakat is not obligatory</p>}
        </div>

        {/* Asset Breakdown */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Asset Breakdown</h3>
          <div className="space-y-1">
            {[
              { label: '🥇 Gold', val: breakdown.gold },
              { label: '🥈 Silver', val: breakdown.silver },
              { label: '💰 Cash', val: breakdown.cash },
              { label: '🪙 Crypto', val: breakdown.crypto },
              { label: '📈 Stocks', val: breakdown.stocks },
              { label: '🏦 Retirement', val: breakdown.retirement },
              { label: '💳 Receivables', val: breakdown.receivables },
            ].filter(item => parseFloat(item.val) > 0).map(({ label, val }) => (
              <div key={label} className="flex justify-between text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <span className="text-gray-600">{label}</span>
                <span className="font-medium">{formatCurrency(parseFloat(val), base, fmt)}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center">
          Calculated: {formatTimestamp(result.timestamp)} · OpenZakat v3.0 · MIT License
        </p>
      </div>
    </div>
  );
}
