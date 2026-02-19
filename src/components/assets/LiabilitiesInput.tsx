// PRD §4.1 – Liabilities: short-term + long-term (next 12 months only)
// PRD §4.5 – Debt Deduction: Majority (12-month only) / Hanafi (all debts)
import { Plus, Trash2, Info } from 'lucide-react';
import { useStore } from '@/store';
import { convertToBase } from '@/lib/calculation/currency';
import { formatCurrency } from '@/utils/formatters';
import { SORTED_CURRENCIES } from '@/data/currencies';
import { cn } from '@/components/common/cn';
import type { DebtTerm } from '@/types';
import { t } from '@/i18n';

// PRD §4.1 – "smart templates for common banks"
const BANK_TEMPLATES = [
  'DBS Credit Card', 'OCBC Credit Card', 'UOB Credit Card',
  'HDFC Credit Card', 'ICICI Credit Card', 'SBI Credit Card',
  'Emirates NBD', 'ADCB', 'Barclays', 'HSBC', 'Citibank',
];

export function LiabilitiesInput() {
  const { liabilities, addLiability, updateLiability, removeLiability, exchangeRates, preferences } = useStore();
  const deductionMethod = preferences.methodology.debtDeduction;
  const language = preferences.language;

  const handleAdd = () => {
    addLiability({
      description: '',
      amount: '',
      currency: preferences.baseCurrency,
      term: 'short-term',
      dueDate: '',
      convertedToBase: '0',
    });
  };

  const getConverted = (amount: string, currency: string) => {
    return convertToBase(amount || '0', currency, preferences.baseCurrency, exchangeRates.rates).converted.toNumber();
  };

  const total = liabilities.liabilities.reduce((sum, l) => {
    if (deductionMethod === 'majority' && l.term === 'long-term') return sum;
    return sum + getConverted(l.amount, l.currency);
  }, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">💳 {t('asset.liabilities.title', language)}</h3>
        <button onClick={handleAdd} className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600">
          <Plus className="h-3.5 w-3.5" /> {t('asset.liabilities.add', language)}
        </button>
      </div>

      {deductionMethod === 'majority' && (
        <div className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
          <Info className="h-3.5 w-3.5 shrink-0" />
          {t('asset.liabilities.majorityInfo', language)}
        </div>
      )}

      {liabilities.liabilities.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">{t('asset.liabilities.empty', language)}</div>
      )}

      {liabilities.liabilities.map((liability) => {
        const excluded = deductionMethod === 'majority' && liability.term === 'long-term';
        return (
          <div key={liability.id} className={cn('rounded-xl border bg-white p-4 space-y-3', excluded ? 'border-gray-200 opacity-60' : 'border-gray-200')}>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.common.description', language)}</label>
                <input type="text" list="bank-templates" value={liability.description}
                  onChange={(e) => updateLiability(liability.id, { description: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. DBS Credit Card" />
                <datalist id="bank-templates">
                  {BANK_TEMPLATES.map(t => <option key={t} value={t} />)}
                </datalist>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.common.amount', language)}</label>
                <input type="number" min="0" value={liability.amount}
                  onChange={(e) => { const c = getConverted(e.target.value, liability.currency); updateLiability(liability.id, { amount: e.target.value, convertedToBase: c.toFixed(2) }); }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="0" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.common.currency', language)}</label>
                <select value={liability.currency} onChange={(e) => updateLiability(liability.id, { currency: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                  {SORTED_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.common.term', language)}</label>
                <div className="flex gap-2">
                  {(['short-term', 'long-term'] as DebtTerm[]).map((term) => (
                    <button key={term} onClick={() => updateLiability(liability.id, { term })}
                      className={cn('flex-1 rounded-lg border py-1.5 text-xs font-medium', liability.term === term ? 'border-red-400 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600')}>
                      {term === 'short-term' ? t('asset.common.shortTerm', language) : t('asset.common.longTerm', language)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t('asset.common.dueDate', language)}</label>
                <input type="date" value={liability.dueDate} onChange={(e) => updateLiability(liability.id, { dueDate: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
            </div>
            {excluded && <div className="text-xs text-amber-600">⚠️ {t('asset.liabilities.excludedMajority', language)}</div>}
            <div className="flex justify-between items-center">
              <span className="text-xs text-red-600 font-semibold">
                {!excluded && parseFloat(liability.amount) > 0 && `-${formatCurrency(getConverted(liability.amount, liability.currency), preferences.baseCurrency, preferences.numberingFormat)}`}
              </span>
              <button onClick={() => removeLiability(liability.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        );
      })}

      {liabilities.liabilities.length > 0 && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm">
          <div className="flex justify-between font-semibold text-red-700">
            <span>{t('asset.liabilities.totalDeductible', language)}</span>
            <span>-{formatCurrency(total, preferences.baseCurrency, preferences.numberingFormat)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
