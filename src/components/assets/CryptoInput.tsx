// PRD §4.1 – Crypto: top 50 coins, wallet types, exclude lost wallets
import { Plus, Trash2 } from 'lucide-react';
import { useStore } from '@/store';
import { TOP_50_COINS } from '@/data/coins';
import { formatCurrency } from '@/utils/formatters';
import { safeDecimal, Decimal } from '@/utils/decimal';
import type { WalletType } from '@/types';

const WALLET_TYPES: { value: WalletType; label: string; note: string }[] = [
  { value: 'exchange', label: 'Exchange', note: 'Zakatable' },
  { value: 'hardware', label: 'Hardware Wallet', note: 'Zakatable' },
  { value: 'lost', label: 'Lost / Inaccessible', note: 'Excluded from Zakat' },
];

export function CryptoInput() {
  const { assets, addCrypto, updateCrypto, removeCrypto, cryptoPrices, exchangeRates, preferences } = useStore();

  const handleAdd = () => {
    addCrypto({ coinId: 'bitcoin', coinSymbol: 'BTC', coinName: 'Bitcoin', amount: '', walletType: 'exchange' });
  };

  const calcValue = (coinId: string, amount: string, walletType: WalletType) => {
    if (walletType === 'lost') return 0;
    const priceUSD = safeDecimal(cryptoPrices[coinId] ?? '0');
    const usdToBase = safeDecimal(exchangeRates.rates[preferences.baseCurrency] ?? '1');
    return new Decimal(amount || '0').mul(priceUSD).mul(usdToBase).toNumber();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">🪙 Cryptocurrency</h3>
        <button onClick={handleAdd} className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600">
          <Plus className="h-3.5 w-3.5" /> Add Crypto
        </button>
      </div>

      {assets.crypto.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">No crypto holdings added yet</div>
      )}

      {assets.crypto.map((holding) => (
        <div key={holding.id} className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Coin</label>
              <select
                value={holding.coinId}
                onChange={(e) => {
                  const coin = TOP_50_COINS.find(c => c.id === e.target.value);
                  updateCrypto(holding.id, { coinId: e.target.value, coinSymbol: coin?.symbol ?? '', coinName: coin?.name ?? '' });
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                {TOP_50_COINS.map(c => <option key={c.id} value={c.id}>{c.symbol} — {c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Amount</label>
              <input type="number" min="0" step="0.00000001" value={holding.amount}
                onChange={(e) => updateCrypto(holding.id, { amount: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="0" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Wallet Type</label>
              <div className="flex gap-2">
                {WALLET_TYPES.map(w => (
                  <button key={w.value} onClick={() => updateCrypto(holding.id, { walletType: w.value })}
                    className={`flex-1 rounded-lg border py-1.5 text-xs font-medium transition-all ${holding.walletType === w.value ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-600'}`}>
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs">
              {holding.walletType === 'lost' ? (
                <span className="text-red-500">⚠️ Excluded from Zakat (lost wallet)</span>
              ) : (
                <span className="text-emerald-600 font-semibold">
                  {formatCurrency(calcValue(holding.coinId, holding.amount, holding.walletType), preferences.baseCurrency, preferences.numberingFormat)}
                </span>
              )}
            </div>
            <button onClick={() => removeCrypto(holding.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
          </div>
        </div>
      ))}
    </div>
  );
}
