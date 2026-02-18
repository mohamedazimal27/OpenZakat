// ============================================================
// OpenZakat – Top 50 Crypto Coins List
// PRD §4.1 – "Coin selector (top 50)"
// ============================================================

export interface CoinConfig {
  id: string;       // CoinGecko ID
  symbol: string;
  name: string;
}

export const TOP_50_COINS: CoinConfig[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'tether', symbol: 'USDT', name: 'Tether' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
  { id: 'monero', symbol: 'XMR', name: 'Monero' },
  { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos' },
  { id: 'near', symbol: 'NEAR', name: 'NEAR Protocol' },
  { id: 'ethereum-classic', symbol: 'ETC', name: 'Ethereum Classic' },
  { id: 'aave', symbol: 'AAVE', name: 'Aave' },
  { id: 'algorand', symbol: 'ALGO', name: 'Algorand' },
  { id: 'fantom', symbol: 'FTM', name: 'Fantom' },
  { id: 'hedera', symbol: 'HBAR', name: 'Hedera' },
  { id: 'tezos', symbol: 'XTZ', name: 'Tezos' },
  { id: 'elrond', symbol: 'EGLD', name: 'MultiversX' },
  { id: 'theta', symbol: 'THETA', name: 'Theta Network' },
  { id: 'filecoin', symbol: 'FIL', name: 'Filecoin' },
  { id: 'vechain', symbol: 'VET', name: 'VeChain' },
  { id: 'axie-infinity', symbol: 'AXS', name: 'Axie Infinity' },
  { id: 'the-sandbox', symbol: 'SAND', name: 'The Sandbox' },
  { id: 'decentraland', symbol: 'MANA', name: 'Decentraland' },
  { id: 'the-graph', symbol: 'GRT', name: 'The Graph' },
  { id: 'eos', symbol: 'EOS', name: 'EOS' },
  { id: 'neo', symbol: 'NEO', name: 'NEO' },
  { id: 'zcash', symbol: 'ZEC', name: 'Zcash' },
  { id: 'dash', symbol: 'DASH', name: 'Dash' },
  { id: 'iota', symbol: 'MIOTA', name: 'IOTA' },
  { id: 'basic-attention-token', symbol: 'BAT', name: 'Basic Attention Token' },
  { id: 'zilliqa', symbol: 'ZIL', name: 'Zilliqa' },
  { id: 'qtum', symbol: 'QTUM', name: 'Qtum' },
  { id: 'waves', symbol: 'WAVES', name: 'Waves' },
  { id: 'loopring', symbol: 'LRC', name: 'Loopring' },
  { id: 'ocean-protocol', symbol: 'OCEAN', name: 'Ocean Protocol' },
  { id: 'storj', symbol: 'STORJ', name: 'Storj' },
  { id: 'kyber-network', symbol: 'KNC', name: 'Kyber Network' },
  { id: 'golem', symbol: 'GLM', name: 'Golem' },
  { id: 'ren', symbol: 'REN', name: 'Ren' },
  { id: '0x', symbol: 'ZRX', name: '0x Protocol' },
];

export const COINGECKO_IDS = TOP_50_COINS.map((c) => c.id).join(',');
