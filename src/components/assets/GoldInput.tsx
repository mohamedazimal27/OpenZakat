// ============================================================
// OpenZakat – Gold Input Component
// PRD §4.1 – Gold with regional units
// PRD §5.2 – Enhanced Gold Input with Regional Units
// ============================================================

import { useState } from 'react';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { useStore } from '@/store';
import { cn } from '@/components/common/cn';
import { GOLD_UNIT_OPTIONS } from '@/data/regional/goldUnits';
import purityData from '@/data/regional/purityStandards.json';
import { calcPureGoldGrams } from '@/utils/unitConversion';
import { formatCurrency } from '@/utils/formatters';
import { Decimal, safeDecimal } from '@/utils/decimal';
import type { GoldHolding, GoldUnit, GoldPuritySource } from '@/types';
import { t } from '@/i18n';

const PURITY_SOURCES = purityData.standards;

function GoldHoldingCard({ holding }: { holding: GoldHolding }) {
  const { updateGold, removeGold, metalPrices, exchangeRates, preferences } = useStore();
  const [expanded, setExpanded] = useState(true);
  const language = preferences.language;

  const weight = parseFloat(holding.weight) || 0;
  const customRatio = holding.puritySource === 'custom' && holding.customKarat
    ? parseFloat(holding.customKarat) : undefined;
  const { grossGrams, pureGrams, purityRatio } = calcPureGoldGrams(weight, holding.unit, holding.puritySource, 22, customRatio);

  // Value in base currency
  const usdToBase = safeDecimal(exchangeRates.rates[preferences.baseCurrency] ?? '1');
  const goldPriceUSD = safeDecimal(metalPrices.gold);
  const valueBase = new Decimal(pureGrams).mul(goldPriceUSD).mul(usdToBase);

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 py-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <span className="font-medium text-gray-800 text-sm">
          🥇 {t('asset.gold.holding', language)} — {holding.weight} {GOLD_UNIT_OPTIONS.find(u => u.unit === holding.unit)?.label.split(' ')[0]}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-600 font-semibold">
            {formatCurrency(valueBase.toNumber(), preferences.baseCurrency, preferences.numberingFormat)}
          </span>
          <button onClick={(e) => { e.stopPropagation(); removeGold(holding.id); }} className="text-red-400 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
          <ChevronDown className={cn('h-4 w-4 text-gray-400 transition-transform', expanded && 'rotate-180')} />
        </div>
      </div>

      {expanded && (
        <div className="border-t px-4 pb-4 pt-3 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Unit */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.gold.unit', language)}</label>
              <select
                value={holding.unit}
                onChange={(e) => updateGold(holding.id, { unit: e.target.value as GoldUnit })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                {GOLD_UNIT_OPTIONS.map((u) => (
                  <option key={u.unit} value={u.unit}>{u.label}</option>
                ))}
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.gold.weight', language)}</label>
              <input
                type="number"
                min="0"
                step="0.001"
                value={holding.weight}
                onChange={(e) => updateGold(holding.id, { weight: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="0"
              />
            </div>

            {/* Purity Source */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.gold.purityStandard', language)}</label>
              <select
                value={holding.puritySource}
                onChange={(e) => updateGold(holding.id, { puritySource: e.target.value as GoldPuritySource })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                {PURITY_SOURCES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Custom karat */}
            {holding.puritySource === 'custom' && (
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.gold.customPurity', language)}</label>
                <input
                  type="number"
                  min="0.001"
                  max="1"
                  step="0.001"
                  value={holding.customKarat ?? '0.916'}
                  onChange={(e) => updateGold(holding.id, { customKarat: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            )}
          </div>

          {/* Calculation breakdown */}
          {weight > 0 && (
            <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600 space-y-0.5">
              <div>{weight} {holding.unit} × {GOLD_UNIT_OPTIONS.find(u => u.unit === holding.unit)?.gramsPerUnit}g = {grossGrams.toFixed(3)}g {t('asset.gold.breakdownGross', language)}</div>
              <div>{grossGrams.toFixed(3)}g × {(purityRatio * 100).toFixed(1)}% = {pureGrams.toFixed(3)}g {t('asset.gold.breakdownPure', language)}</div>
              <div className="font-semibold text-emerald-700">
                {t('asset.common.value', language)}: {formatCurrency(valueBase.toNumber(), preferences.baseCurrency, preferences.numberingFormat)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function GoldInput() {
  const { assets, addGold, preferences } = useStore();
  const language = preferences.language;

  const handleAdd = () => {
    addGold({
      unit: preferences.goldUnit,
      weight: '',
      puritySource: 'india',
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">🥇 {t('asset.gold.title', language)}</h3>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 rounded-lg bg-yellow-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-yellow-600"
        >
          <Plus className="h-3.5 w-3.5" />
          {t('asset.gold.add', language)}
        </button>
      </div>

      {assets.gold.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
          {t('asset.gold.empty', language)}
        </div>
      )}

      {assets.gold.map((holding) => (
        <GoldHoldingCard key={holding.id} holding={holding} />
      ))}
    </div>
  );
}
