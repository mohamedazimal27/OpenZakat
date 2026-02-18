// PRD §4.1 – Retirement: FCNA method: balance × (1 - penalty - tax)
import { Plus, Trash2, Info } from 'lucide-react';
import { useStore } from '@/store';
import { formatCurrency } from '@/utils/formatters';
import { safeDecimal, Decimal } from '@/utils/decimal';
import type { RetirementAccountType } from '@/types';

const ACCOUNT_TYPES: { value: RetirementAccountType; label: string }[] = [
  { value: '401k', label: '401(k)' },
  { value: 'ira', label: 'IRA' },
  { value: 'pension', label: 'Pension' },
  { value: 'provident-fund', label: 'Provident Fund (EPF/CPF)' },
  { value: 'other', label: 'Other' },
];

export function RetirementInput() {
  const { assets, addRetirement, updateRetirement, removeRetirement, preferences } = useStore();

  const handleAdd = () => {
    addRetirement({ accountType: 'provident-fund', balance: '', penaltyPercent: '0', taxPercent: '0', accessible: true });
  };

  const calcNet = (balance: string, penaltyPct: string, taxPct: string) => {
    const b = safeDecimal(balance);
    const p = safeDecimal(penaltyPct).div(100);
    const t = safeDecimal(taxPct).div(100);
    if (p.plus(t).gte(1)) return 0;
    return b.mul(new Decimal(1).minus(p).minus(t)).toNumber();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">🏦 Retirement Accounts</h3>
        <button onClick={handleAdd} className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple-700">
          <Plus className="h-3.5 w-3.5" /> Add Account
        </button>
      </div>

      {assets.retirement.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">No retirement accounts added yet</div>
      )}

      {assets.retirement.map((account) => {
        const netValue = calcNet(account.balance, account.penaltyPercent, account.taxPercent);
        const isInvalid = safeDecimal(account.penaltyPercent).plus(safeDecimal(account.taxPercent)).gte(100);
        return (
          <div key={account.id} className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Account Type</label>
                <select value={account.accountType} onChange={(e) => updateRetirement(account.id, { accountType: e.target.value as RetirementAccountType })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                  {ACCOUNT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Balance ({preferences.baseCurrency})</label>
                <input type="number" min="0" value={account.balance} onChange={(e) => updateRetirement(account.id, { balance: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="0" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Early Withdrawal Penalty (%)</label>
                <input type="number" min="0" max="100" value={account.penaltyPercent} onChange={(e) => updateRetirement(account.id, { penaltyPercent: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="0" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tax Rate (%)</label>
                <input type="number" min="0" max="100" value={account.taxPercent} onChange={(e) => updateRetirement(account.id, { taxPercent: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="0" />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={account.accessible} onChange={(e) => updateRetirement(account.id, { accessible: e.target.checked })}
                className="accent-emerald-600" />
              <span className="text-gray-700">Accessible (FCNA method applies)</span>
            </label>

            {isInvalid && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                <Info className="h-3.5 w-3.5" /> Penalty + Tax cannot be ≥ 100%
              </div>
            )}

            {!isInvalid && parseFloat(account.balance) > 0 && (
              <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs">
                <div className="flex items-center gap-1.5 text-gray-600 mb-0.5">
                  <Info className="h-3 w-3" /> FCNA: balance × (1 - penalty - tax)
                </div>
                <div className="font-semibold text-emerald-700">
                  Net Zakatable: {formatCurrency(netValue, preferences.baseCurrency, preferences.numberingFormat)}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button onClick={() => removeRetirement(account.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
