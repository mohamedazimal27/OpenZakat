// ============================================================
// OpenZakat – Regional Preset Modal
// PRD §5.1 – Regional Preset Modal
// ============================================================

import { useState } from 'react';
import { Globe, X, CheckCircle2 } from 'lucide-react';
import { REGIONAL_PRESETS } from '@/data/regional/presets';
import { useStore } from '@/store';
import { cn } from '@/components/common/cn';
import type { RegionalPresetId } from '@/types';

export function RegionalPresetModal() {
  const { showPresetModal, setShowPresetModal, applyPreset } = useStore();
  const [selected, setSelected] = useState<RegionalPresetId>('indian-singapore');

  if (!showPresetModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-gray-900">Quick Setup</h2>
          </div>
          <button
            onClick={() => setShowPresetModal(false)}
            className="rounded-lg p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Body — scrollable so header/footer always visible */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          {/* What does a preset do? */}
          <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
            <p className="text-xs font-semibold text-emerald-800 mb-1">⚡ One-click configuration — sets all at once:</p>
            <ul className="text-xs text-emerald-700 space-y-0.5 list-none">
              <li>✦ <strong>Base currency</strong> — all totals shown in your work country's currency</li>
              <li>✦ <strong>Home currency</strong> — optional second display (e.g. INR for mental reference)</li>
              <li>✦ <strong>Gold unit</strong> — Sovereign, Tola, etc. (no grams to convert manually)</li>
              <li>✦ <strong>Number format</strong> — Indian (1,00,000) or International (100,000)</li>
            </ul>
            <p className="text-xs text-emerald-600 mt-2 italic">You can always change these individually using the dropdowns in the summary panel.</p>
          </div>
          <p className="mb-3 text-sm font-medium text-gray-700">
            Select your situation:
          </p>
          <div className="space-y-2">
            {REGIONAL_PRESETS.map((preset) => (
              <label
                key={preset.id}
                className={cn(
                  'flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3 transition-all',
                  selected === preset.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <input
                  type="radio"
                  name="preset"
                  value={preset.id}
                  checked={selected === preset.id}
                  onChange={() => setSelected(preset.id as RegionalPresetId)}
                  className="mt-0.5 accent-emerald-600"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{preset.label}</p>
                  <p className="text-xs text-gray-500">{preset.description}</p>
                </div>
                {selected === preset.id && (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t px-6 py-4">
          <button
            onClick={() => {
              applyPreset(selected);
            }}
            className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Apply Preset
          </button>
          <button
            onClick={() => setShowPresetModal(false)}
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
