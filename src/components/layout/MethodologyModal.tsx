// ============================================================
// OpenZakat – Methodology Modal
// PRD §4.5 – Scholarly Methodology Selection (6 toggles)
// ============================================================

import { X, BookOpen, Info } from 'lucide-react';
import { useStore } from '@/store';
import { cn } from '@/components/common/cn';
import type { Methodology } from '@/types';

interface ToggleGroupProps {
  label: string;
  tooltip: string;
  value: string;
  options: { value: string; label: string; note?: string }[];
  onChange: (v: string) => void;
}

function ToggleGroup({ label, tooltip, value, options, onChange }: ToggleGroupProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span title={tooltip} className="cursor-help text-gray-400">
          <Info className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-xs font-medium transition-all',
              value === opt.value
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MethodologyModal() {
  const { showMethodologyModal, setShowMethodologyModal, preferences, setPreferences } = useStore();

  if (!showMethodologyModal) return null;

  const m = preferences.methodology;

  const update = (key: keyof Methodology, value: string) => {
    setPreferences({
      methodology: { ...m, [key]: value },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-gray-900">Scholarly Methodology</h2>
          </div>
          <button onClick={() => setShowMethodologyModal(false)} className="rounded-lg p-1 hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Settings */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-4 space-y-5">

          {/* Nisab Basis */}
          <ToggleGroup
            label="Nisab Basis"
            tooltip="The minimum threshold of wealth for Zakat to be obligatory"
            value={m.nisabBasis}
            options={[
              { value: 'silver', label: 'Silver (612.36g)', note: 'NZF, Islamic Relief — recommended' },
              { value: 'gold', label: 'Gold (87.48g)' },
              { value: 'auto', label: 'Auto (lower) ⚠️', note: 'Convenience setting — not formal fiqh' },
            ]}
            onChange={(v) => update('nisabBasis', v)}
          />

          {/* Debt Deduction */}
          <ToggleGroup
            label="Debt Deduction"
            tooltip="How liabilities are deducted from zakatable wealth"
            value={m.debtDeduction}
            options={[
              { value: 'majority', label: 'Majority (12-month only)', note: 'FCNA, AAOIFI' },
              { value: 'hanafi', label: 'Hanafi (all debts)' },
            ]}
            onChange={(v) => update('debtDeduction', v)}
          />

          {/* Retirement */}
          <ToggleGroup
            label="Retirement Accounts"
            tooltip="When Zakat is due on retirement funds"
            value={m.retirementMethod}
            options={[
              { value: 'fcna', label: 'FCNA (net accessible)', note: 'FCNA official ruling' },
              { value: 'delayed', label: 'Delayed (at withdrawal)' },
            ]}
            onChange={(v) => update('retirementMethod', v)}
          />

          {/* Jewelry */}
          <ToggleGroup
            label="Jewelry Zakat"
            tooltip="Whether gold/silver jewelry for personal use is zakatable"
            value={m.jewelryMethod}
            options={[
              { value: 'hanafi', label: 'Hanafi (all gold/silver)', note: 'Conservative default' },
              { value: 'other', label: 'Customary use exempt', note: 'Shafi\'i, Maliki, Hanbali' },
            ]}
            onChange={(v) => update('jewelryMethod', v)}
          />

          {/* Stock Valuation */}
          <ToggleGroup
            label="Stock Valuation"
            tooltip="Method for calculating Zakat on stock holdings"
            value={m.stockValuation}
            options={[
              { value: 'asset-based', label: 'Asset-based (AAOIFI)', note: 'More accurate' },
              { value: 'market', label: 'Market value (simplified)' },
            ]}
            onChange={(v) => update('stockValuation', v)}
          />

          {/* Hawl Check */}
          <ToggleGroup
            label="Hawl (1 Lunar Year)"
            tooltip="Whether one full lunar year has passed since wealth met Nisab"
            value={m.hawlCheck}
            options={[
              { value: 'yes', label: 'Yes — hawl complete', note: 'Assumes established wealth' },
              { value: 'no', label: 'No — hawl incomplete', note: 'Zakat not yet due' },
              { value: 'unknown', label: 'Unknown' },
            ]}
            onChange={(v) => update('hawlCheck', v)}
          />

          {m.nisabBasis === 'auto' && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-700">
              ⚠️ <strong>Auto Nisab</strong> uses the lower of gold/silver thresholds. This is a convenience setting — it is not a formal scholarly position. For accuracy, use Silver (recommended by NZF, Islamic Relief).
            </div>
          )}
        </div>

        <div className="border-t px-6 py-4">
          <button
            onClick={() => setShowMethodologyModal(false)}
            className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
