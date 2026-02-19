// ============================================================
// OpenZakat – Dual-Currency Sticky Summary
// PRD §5.3 – Dual-Currency Sticky Summary
// Test #33 – Dual-currency display (base + home)
// ============================================================

import { RefreshCw, RotateCcw, BookOpen, Globe } from 'lucide-react';
import { useStore } from '@/store';
import { convertToBase } from '@/lib/calculation/currency';
import { formatCurrency, formatTimestamp } from '@/utils/formatters';
import { cn } from '@/components/common/cn';
import { SORTED_CURRENCIES } from '@/data/currencies';
import { LANGUAGE_OPTIONS, t } from '@/i18n';

export function DualCurrencySummary() {
  const { result, preferences, exchangeRates, metalPrices, fetchPrices, ratesLoading, resetSession, setShowMethodologyModal, setShowPresetModal, setPreferences } = useStore();

  const base = preferences.baseCurrency;
  const home = preferences.homeCurrency;
  const fmt = preferences.numberingFormat;
  const language = preferences.language;

  const toHome = (baseAmount: string) => {
    if (!home || home === base) return null;
    return convertToBase(baseAmount, base, home, exchangeRates.rates).converted.toNumber();
  };

  const Row = ({ label, base: bVal, negative = false }: { label: string; base: string; negative?: boolean }) => {
    const bNum = parseFloat(bVal);
    const hNum = toHome(bVal);
    return (
      <div className="flex items-start justify-between py-1.5">
        <span className="text-sm text-gray-600">{label}</span>
        <div className="text-right">
          <div className={cn('text-sm font-semibold', negative ? 'text-red-600' : 'text-gray-900')}>
            {negative && bNum > 0 ? '-' : ''}{formatCurrency(Math.abs(bNum), base, fmt)}
          </div>
          {hNum !== null && (
            <div className="text-xs text-gray-400">≈ {formatCurrency(Math.abs(hNum), home!, fmt)}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="sticky top-4 rounded-2xl border border-gray-200 bg-white shadow-lg">
      {/* Header with inline currency selectors */}
      <div className="border-b px-4 py-3 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{t('summary.live', language)}</p>
          <div className="flex gap-1.5">
            <button onClick={() => setShowPresetModal(true)} title="Quick presets (Indian in Singapore, etc.)" className="rounded-lg p-1.5 hover:bg-gray-100">
              <Globe className="h-4 w-4 text-gray-500" />
            </button>
            <button onClick={() => setShowMethodologyModal(true)} title="Methodology settings" className="rounded-lg p-1.5 hover:bg-gray-100">
              <BookOpen className="h-4 w-4 text-gray-500" />
            </button>
            <button onClick={fetchPrices} disabled={ratesLoading} title="Refresh prices" className="rounded-lg p-1.5 hover:bg-gray-100 disabled:opacity-50">
              <RefreshCw className={cn('h-4 w-4 text-gray-500', ratesLoading && 'animate-spin')} />
            </button>
            <button onClick={resetSession} title="Reset all data" className="rounded-lg p-1.5 hover:bg-gray-100">
              <RotateCcw className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
        {/* Inline base + home currency selectors */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-400 font-medium">{t('summary.baseCurrency', language)}</label>
            <select
              value={base}
              onChange={(e) => {
                setPreferences({ baseCurrency: e.target.value });
              }}
              className="mt-0.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs font-semibold text-gray-800 focus:border-emerald-400 focus:outline-none"
            >
              {SORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 font-medium">{t('summary.homeCurrency', language)} <span className="font-normal">{t('summary.optional', language)}</span></label>
            <select
              value={home ?? ''}
              onChange={(e) => {
                setPreferences({ homeCurrency: e.target.value || undefined });
              }}
              className="mt-0.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-700 focus:border-emerald-400 focus:outline-none"
            >
              <option value="">— {t('summary.none', language)} —</option>
              {SORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 font-medium">{t('summary.language', language)}</label>
          <select
            value={language}
            onChange={(e) => {
              setPreferences({ language: e.target.value as typeof language });
            }}
            className="mt-0.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-700 focus:border-emerald-400 focus:outline-none"
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.code} value={option.code}>
                {option.nativeLabel} ({option.label})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3 divide-y divide-gray-100">
        {result ? (
          <>
            <Row label={t('summary.totalAssets', language)} base={result.totalAssets} />
            <Row label={t('summary.liabilities', language)} base={result.totalLiabilities} negative />
            <div className="py-1.5">
              <div className="flex items-start justify-between">
                <span className="text-sm font-semibold text-gray-800">{t('summary.netWealth', language)}</span>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{formatCurrency(parseFloat(result.netWealth), base, fmt)}</div>
                  {toHome(result.netWealth) !== null && (
                    <div className="text-xs text-gray-400">≈ {formatCurrency(toHome(result.netWealth)!, home!, fmt)}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="py-1.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm text-gray-600">{t('summary.nisab', language)} ({result.methodology.nisabBasis})</span>
                  <div className="mt-0.5">
                    {result.nisabMet
                      ? <span className="text-xs text-emerald-600 font-medium">✅ {t('summary.met', language)}</span>
                      : <span className="text-xs text-red-500 font-medium">❌ {t('summary.notMet', language)}</span>
                    }
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-700">{formatCurrency(parseFloat(result.nisabValue), base, fmt)}</div>
                </div>
              </div>
            </div>

            {/* Zakat Due */}
            <div className="pt-2 pb-1">
              <div className="rounded-xl bg-emerald-600 px-4 py-3 text-white">
                <p className="text-xs font-medium opacity-80">{t('summary.zakatDue', language)}</p>
                <p className="mt-0.5 text-2xl font-bold">{formatCurrency(parseFloat(result.zakatDue), base, fmt)}</p>
                {toHome(result.zakatDue) !== null && (
                  <p className="text-xs opacity-75 mt-0.5">≈ {formatCurrency(toHome(result.zakatDue)!, home!, fmt)}</p>
                )}
                {!result.nisabMet && (
                  <p className="text-xs opacity-75 mt-1">{t('summary.nisabNotMet', language)}</p>
                )}
                {result.methodology.hawlCheck === 'no' && (
                  <p className="text-xs opacity-75 mt-1">{t('summary.hawlIncomplete', language)}</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center text-sm text-gray-400">
            {t('summary.addAssets', language)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-2 text-xs text-gray-400">
        Gold: {formatCurrency(parseFloat(metalPrices.gold) * (parseFloat(exchangeRates.rates[base] ?? '1') / 1), base, fmt, 2)}/g
        {' · '}{t('summary.updated', language)}: {formatTimestamp(metalPrices.timestamp).split(',')[0]}
      </div>
    </div>
  );
}
