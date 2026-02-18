// ============================================================
// OpenZakat – Main Application
// PRD §3.1 – React SPA entry point
// Mobile-optimised: sticky header, horizontal nav, bottom bar
// ============================================================

import { useEffect } from 'react';
import { Github } from 'lucide-react';
import { useStore } from '@/store';
import { formatCurrency } from '@/utils/formatters';
import { RegionalPresetModal } from '@/components/layout/RegionalPresetModal';
import { MethodologyModal } from '@/components/layout/MethodologyModal';
import { DualCurrencySummary } from '@/components/layout/DualCurrencySummary';
import { GoldInput } from '@/components/assets/GoldInput';
import { SilverInput } from '@/components/assets/SilverInput';
import { CashInput } from '@/components/assets/CashInput';
import { CryptoInput } from '@/components/assets/CryptoInput';
import { StockInput } from '@/components/assets/StockInput';
import { RetirementInput } from '@/components/assets/RetirementInput';
import { ReceivablesInput } from '@/components/assets/ReceivablesInput';
import { LiabilitiesInput } from '@/components/assets/LiabilitiesInput';
import { ResultsPanel } from '@/components/results/ResultsPanel';
import { cn } from '@/components/common/cn';

const SECTIONS = [
  { id: 'gold',        label: '🥇 Gold',        component: GoldInput },
  { id: 'silver',      label: '🥈 Silver',      component: SilverInput },
  { id: 'cash',        label: '💰 Cash',        component: CashInput },
  { id: 'crypto',      label: '🪙 Crypto',      component: CryptoInput },
  { id: 'stocks',      label: '📈 Stocks',      component: StockInput },
  { id: 'retirement',  label: '🏦 Retirement',  component: RetirementInput },
  { id: 'receivables', label: '💳 Receivables', component: ReceivablesInput },
  { id: 'liabilities', label: '⚠️ Liabilities', component: LiabilitiesInput },
];

// ── Mobile Sticky Bottom Bar ──────────────────────────────
function MobileBottomBar() {
  const { result, preferences } = useStore();
  const base = preferences.baseCurrency;
  const fmt  = preferences.numberingFormat;

  const zakatDue  = result ? parseFloat(result.zakatDue)  : 0;
  const netWealth = result ? parseFloat(result.netWealth) : 0;
  const nisabMet  = result?.nisabMet ?? false;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden border-t border-gray-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Net Wealth */}
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">Net Wealth</p>
          <p className="text-sm font-bold text-gray-800 truncate">{formatCurrency(netWealth, base, fmt)}</p>
        </div>

        {/* Nisab status */}
        <div className="text-center px-3">
          {nisabMet
            ? <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">✅ Nisab Met</span>
            : <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-600">❌ Not Met</span>
          }
        </div>

        {/* Zakat Due — most prominent */}
        <div className="text-right min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-600">Zakat Due</p>
          <p className="text-base font-extrabold text-emerald-700 truncate">{formatCurrency(zakatDue, base, fmt)}</p>
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────
export default function App() {
  const { fetchPrices, recalculate, activeSection, setActiveSection } = useStore();

  useEffect(() => {
    fetchPrices().then(() => recalculate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ActiveComponent = SECTIONS.find(s => s.id === activeSection)?.component ?? GoldInput;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modals */}
      <RegionalPresetModal />
      <MethodologyModal />

      {/* ── Header ──────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-xl shadow-sm select-none">
              🕌
            </div>
            <div className="leading-tight">
              <h1 className="text-base font-bold text-gray-900">OpenZakat</h1>
              <p className="hidden sm:block text-[10px] text-gray-400">Free Precision Zakat Calculator</p>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <span className="hidden md:inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              100% Client-Side
            </span>
            <a
              href="https://github.com/mohamedazimal27/OpenZakat"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
              title="View on GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────── */}
      {/* pb-20 on mobile to clear the sticky bottom bar */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6 pb-20 lg:pb-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">

          {/* ── Left: Asset Inputs ──────────────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Section Nav — horizontal scroll on mobile */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 pb-0.5">
              {SECTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={cn(
                    'flex-shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition-all whitespace-nowrap',
                    activeSection === s.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700'
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Active Section */}
            <div className="rounded-2xl bg-white border border-gray-200 p-4 sm:p-5">
              <ActiveComponent />
            </div>

            {/* Results Panel */}
            <ResultsPanel />
          </div>

          {/* ── Right: Live Summary (desktop only) ──────── */}
          <div className="hidden lg:block">
            <DualCurrencySummary />
          </div>

        </div>

        {/* ── Mobile: Full Summary below inputs ─────────── */}
        {/* Users can scroll here for full currency/methodology settings on mobile */}
        <div className="mt-4 lg:hidden">
          <DualCurrencySummary />
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t mt-6 py-5 text-center text-xs text-gray-400">
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 font-medium">100% Free</span>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700 font-medium">Privacy-First</span>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-purple-700 font-medium">Open Source</span>
        </div>
        <p className="mt-2">
          OpenZakat v3.0 · MIT License ·{' '}
          <a href="https://github.com/mohamedazimal27/OpenZakat" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {' '}· All calculations performed client-side · Your data never leaves your browser
        </p>
        <p className="mt-1 text-gray-300">
          Methodology: FCNA, AAOIFI, International Islamic Fiqh Academy, NZF
        </p>
      </footer>

      {/* ── Mobile Sticky Bottom Bar ─────────────────────── */}
      <MobileBottomBar />
    </div>
  );
}
