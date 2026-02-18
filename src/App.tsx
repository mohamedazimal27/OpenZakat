// ============================================================
// OpenZakat – Main Application
// PRD §3.1 – React SPA entry point
// ============================================================

import { useEffect } from 'react';
import { useStore } from '@/store';
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

const SECTIONS = [
  { id: 'gold', label: '🥇 Gold', component: GoldInput },
  { id: 'silver', label: '🥈 Silver', component: SilverInput },
  { id: 'cash', label: '💰 Cash', component: CashInput },
  { id: 'crypto', label: '🪙 Crypto', component: CryptoInput },
  { id: 'stocks', label: '📈 Stocks', component: StockInput },
  { id: 'retirement', label: '🏦 Retirement', component: RetirementInput },
  { id: 'receivables', label: '💳 Receivables', component: ReceivablesInput },
  { id: 'liabilities', label: '💳 Liabilities', component: LiabilitiesInput },
];

export default function App() {
  const { fetchPrices, recalculate, activeSection, setActiveSection } = useStore();

  // Fetch prices on mount and trigger initial calculation
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

      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🕌</span>
            <div>
              <h1 className="text-lg font-bold text-gray-900">OpenZakat</h1>
              <p className="text-xs text-gray-400">Free Precision Zakat Calculator</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 font-medium">100% Free</span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700 font-medium">Privacy-First</span>
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-purple-700 font-medium">Open Source</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Left: Asset Input */}
          <div className="lg:col-span-2 space-y-4">
            {/* Section Nav */}
            <div className="flex flex-wrap gap-1.5">
              {SECTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                    activeSection === s.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Active Section */}
            <div className="rounded-2xl bg-white border border-gray-200 p-5">
              <ActiveComponent />
            </div>

            {/* Results Panel */}
            <ResultsPanel />
          </div>

          {/* Right: Live Summary (sticky) */}
          <div>
            <DualCurrencySummary />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 text-center text-xs text-gray-400">
        <p>
          OpenZakat v3.0 · MIT License ·{' '}
          <a href="https://github.com/mohamedazimal27/OpenZakat" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {' '} · All calculations performed client-side · Your data never leaves your browser
        </p>
        <p className="mt-1 text-gray-300">
          Methodology: FCNA, AAOIFI, International Islamic Fiqh Academy, NZF
        </p>
      </footer>
    </div>
  );
}
