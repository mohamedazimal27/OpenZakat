
---

# 📘 FINAL PRODUCT REQUIREMENTS DOCUMENT (PRD) v3.0

## **OpenZakat: Free Precision Zakat Calculator**
### GitHub Pages Hosted | 100% Client-Side | Open Source MIT
### Repository: `https://github.com/mohamedazimal27/OpenZakat.git`

---

## 1. Executive Summary

**OpenZakat** is a free, open-source Zakat calculator designed for global Muslims—especially expats and multi-currency holders—seeking precise, scholarly-backed calculations without friction. Built specifically for **GitHub Pages static hosting** at `https://mohamedazimal27.github.io/OpenZakat/`, it requires zero backend infrastructure while providing institutional-grade accuracy based on FCNA, AAOIFI, International Islamic Fiqh Academy, and NZF methodologies.

**Key Value Propositions:**
- **100% Free Forever:** No servers, no databases, no API keys required for users
- **Privacy-First:** All data stays in user's browser (localStorage only)
- **Expat-Optimized:** Regional gold units (sovereign, tola), dual-currency display, quick stock input
- **Scholarly Rigor:** Multiple valid methodologies with transparent source citations
- **Zero Friction:** No mental math, no unit conversions, no external searches needed

**Target User Personas:**
| Persona | Needs | Key Features |
|---------|-------|--------------|
| **New Muslim** | First-time Zakat calculation | Guided wizard, tooltips, educational content |
| **Tech-Savvy Investor** | Complex portfolio (crypto, stocks, retirement) | Advanced asset modules, API integrations |
| **Business Owner** | Inventory, receivables, liabilities | Business asset module, debt management |
| **Expat Professional** (NEW) | Multi-currency, regional gold units, quick input | Sovereign/tola gold, dual SGD/INR display, stock total value mode |
| **Scholar/Educator** | Methodology transparency, teaching tool | Source citations, toggle explanations, PDF reports |

---

## 2. User Stories

### 2.1 Primary User Story: Ahmad (Original)

**Ahmad**, 32, software engineer in Dubai. First time calculating Zakat seriously. Has crypto, some gold jewelry, company stock options, and wants to do it right.

**Journey:** Discovery → Settings → Gold → Cash → Crypto → Stocks → Retirement → Debts → Methodology → Results (8 minutes, zero external searches)

**Key PRD Features Used:**
- Silver Nisab default
- Multi-currency cash (AED/USD)
- Crypto wallet types
- FCNA retirement method
- Real-time methodology impact preview

---

### 2.2 Expat User Story: Mohamed (NEW - Critical Addition)

**Mohamed**, 35, Indian software engineer working in Singapore. Paid in SGD, maintains savings in both SGD and INR, owns gold in sovereigns (not grams), tracks stocks by total value (not share count), has credit card bills.

**The Friction Problem:**
| What Mohamed Knows | What Traditional Calculators Ask | Friction |
|-------------------|----------------------------------|----------|
| "15 sovereigns of 22K gold" | "Weight in grams?" | Must Google: 1 sovereign = 8g |
| "SGD 100,000 + INR 8 lakhs" | "Enter all in one currency" | Mental math: 8L INR = ? SGD |
| "SGD 45,000 in stocks" | "How many shares?" | Doesn't track share count |
| "DBS credit card bill" | "Enter liability amount" | OK, but could be smarter |

**Mohamed's Journey with OpenZakat:**

```
Step 1: Regional Preset Selection
┌─────────────────────────────────────────┐
│  🌍 Quick Setup                         │
│                                         │
│  Select your situation:                 │
│                                         │
│  (•) Indian in Singapore                │
│    → Base: SGD | Home: INR              │
│    → Gold: Sovereign | Stocks: Quick    │
│                                         │
│  [Apply Preset]                         │
└─────────────────────────────────────────┘

Step 2: Gold Input (Zero Friction)
┌─────────────────────────────────────────┐
│  🥇 Gold Holding #1                     │
│                                         │
│  Unit: [Sovereign (India) ▼]            │
│         ├── Grams (International)       │
│         ├── Tola (South Asia)           │
│         └── ...                         │
│                                         │
│  Weight: [    15    ] sovereigns        │
│  = 120 grams (auto-converted)           │
│                                         │
│  Purity: [22K ▼]                        │
│  Source: [India (91.6%) ▼]              │
│                                         │
│  Value: SGD 12,420 (live price)         │
└─────────────────────────────────────────┘

Step 3: Dual-Currency Cash Display
┌─────────────────────────────────────────┐
│  💰 Cash Accounts                       │
│  Base: SGD | Home: INR ▼                │
│                                         │
│  DBS Singapore:      SGD 100,000        │
│                       ≈ ₹ 62,50,000     │
│                                         │
│  ICICI India:        SGD  12,800         │
│  (entered as ₹ 8,00,000)                │
│                       ≈ ₹  8,00,000     │
│                                         │
│  ─────────────────────────────────────  │
│  Total:              SGD 112,800          │
│                       ≈ ₹ 70,50,000     │
└─────────────────────────────────────────┘

Step 4: Stock Quick Mode
┌─────────────────────────────────────────┐
│  📈 Stocks                              │
│                                         │
│  Input Mode: [Quick: Total Value ▼]     │
│                                         │
│  Total Market Value: [  SGD 45,000   ]  │
│  Holding Type: [Long-term investment ▼] │
│                                         │
│  ℹ️ Using simplified 30% method           │
│  (AAOIFI estimation)                    │
│                                         │
│  Zakatable: SGD 13,500                  │
│  Zakat: SGD 337.50                      │
│                                         │
│  [Switch to detailed mode]              │
└─────────────────────────────────────────┘

Step 5: Smart Liability
┌─────────────────────────────────────────┐
│  💳 Credit Card Bill                    │
│                                         │
│  Bank: [DBS Credit Card ▼]              │
│  Statement Balance: SGD 3,200           │
│  Due Date: [2026-03-25]                 │
│                                         │
│  ✓ Auto-categorized: Short-term         │
│  ✓ Deductible from Zakat assets         │
└─────────────────────────────────────────┘

Step 6: Results with Dual Currency
┌─────────────────────────────────────────┐
│  🎉 YOUR ZAKAT CALCULATION              │
│  Method: Silver/Majority/FCNA           │
│                                         │
│  BASE (SGD)          HOME (INR)         │
│  ─────────────────────────────────────  │
│  Net Wealth:         SGD 187,937.50     │
│                       ≈ ₹ 1,17,46,093   │
│                                         │
│  Nisab: SGD 7,240    ₹ 4,52,500         │
│  Status: ✅ Met                           │
│                                         │
│  ZAKAT DUE:          SGD 4,698.44         │
│                       ≈ ₹ 2,93,652        │
│                                         │
│  [📥 Download PDF]  [📋 Copy Summary]     │
└─────────────────────────────────────────┘
```

**Time Saved:** 15 minutes → 6 minutes (60% reduction)
**External Searches:** 3 (Google conversions) → 0

---

## 3. Architecture Design (GitHub Pages Optimized)

### 3.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER (Client-Side)               │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   React UI  │  │  Calculation│  │  localStorage Cache │ │
│  │  Components │◄─┤   Engine    │◄─┤  (Preferences +   │ │
│  │             │  │ (decimal.js)│  │   Session Data)     │ │
│  └──────┬──────┘  └─────────────┘  └─────────────────────┘ │
│         │                                                    │
│  ┌──────▼──────────────────────────────────────────────┐    │
│  │        Service Worker (PWA - Phase 2)              │    │
│  │  • Offline price caching                             │    │
│  │  • Static asset caching                              │    │
│  └──────────────────────────────────────────────────────┘    │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌─────────────┐ ┌──────────────┐
│  Currency    │ │   Metal     │ │   Crypto     │
│   API        │ │   API       │ │   Price API  │
│(ExchangeRate-│ │ (GoldAPI    │ │  (CoinGecko  │
│   API.io)    │ │   or        │ │   free tier) │
│              │ │  MetalsAPI) │ │              │
└──────────────┘ └─────────────┘ └──────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │  GitHub Actions │
              │  Price Updater  │
              │  (Daily Commit) │
              └─────────────────┘
```

### 3.2 GitHub Repository Configuration

**Remote URL:** `git@github.com:mohamedazimal27/OpenZakat.git`

**GitHub Pages Settings:**
- Source: Deploy from `gh-pages` branch
- Custom domain: (optional) `zakatcalc.org` → CNAME file in `public/`
- Default URL: `https://mohamedazimal27.github.io/OpenZakat/`

**Environment Variables (GitHub Secrets):**
| Secret | Used In | Purpose |
|--------|---------|---------|
| `GOLD_API_KEY` | `update-prices.yml` | Fetch daily gold/silver prices |
| `GITHUB_TOKEN` | `deploy.yml` | Auto-deploy to GitHub Pages |

### 3.3 GitHub Pages Constraints & Solutions

| Constraint | Challenge | Solution | Status |
|------------|-----------|----------|--------|
| **Static hosting only** | No server-side processing | Pure React SPA with client-side calculations | ✅ Resolved |
| **No server-side code** | Can't hide API keys | Use keyless APIs + GitHub Actions daily price commits | ✅ Resolved |
| **HTTPS enforced** | Mixed content blocked | All external APIs support HTTPS + CORS | ✅ Verified |
| **1GB repo limit** | Large datasets | Minimal dependencies; price history 7 days only; git commit --amend for price updates | ✅ Resolved |
| **API Key Security** | GoldAPI requires key | Use GoldAPI free tier with CORS + GitHub Actions proxy; fallback to committed prices | ✅ Resolved |
| **Build time limits** | 10 min timeout | Vite optimized builds (<2 min) | ✅ Resolved |

---

## 4. Feature Requirements (Enhanced with Expat Optimizations)

### 4.1 Asset Input Modules (Revised)

| Module | Input Fields | Calculation Logic | Validation | Status |
|--------|-------------|-------------------|------------|--------|
| **💰 Cash & Banks** | Multiple accounts with currency selector (100 currencies) + optional **home currency display** | Sum all values converted at current rate to base currency; show dual display | Non-negative, max 12 decimal places | ✅ MVP |
| **🥇 Gold** | Weight in **regional units** (sovereign, tola, baht, tael, ratti, grams), Karat (24k, 22k, 21k, 18k, custom %), regional purity standards | Auto-convert to grams: `grams = weight × unitMultiplier` → `pure_grams = grams × (karat/24)` → × gold price | Max 10kg, purity 1-24k, unit validation | ✅ MVP |
| **🥈 Silver** | Weight (grams), Type (bullion, coins, jewelry) | 100% zakatable at market rate | Separate tracking from gold | ✅ MVP |
| **🪙 Cryptocurrency** | Coin selector (top 50), Amount, Wallet type (exchange/hardware/lost) | 2.5% on market value; exclude lost wallets | Real-time price fetch, manual override | ✅ MVP |
| **📈 Stocks (Trading)** | **Quick mode:** Total market value only **OR** Detailed: Symbol, Shares, Market value | Quick: 2.5% on total value; Detailed: 2.5% on full market value | Manual entry, mode toggle | ✅ MVP |
| **📊 Stocks (Investment)** | Method toggle: Asset-based OR Simplified | Asset: proportional zakatable assets; Simplified: `market_value × 0.30` | User inputs fundamentals or selects simplified | ⚠️ Phase 2 |
| **🏦 Retirement Accounts** | Type (401k, IRA, Pension, Provident Fund), Balance, Penalty %, Tax %, Accessibility toggle | FCNA method: `balance × (1 - penalty - tax)` if not accessible | Penalty + tax < 100% | ✅ MVP |
| **🏢 Business Assets** | Inventory market value, Cash, Receivables, Liabilities (due <12 months) | `(Inventory + Cash + Receivables - Liabilities) × 2.5%` | Inventory must be for resale | ⚠️ Phase 2 |
| **🏠 Real Estate** | Property type (primary/rental/flipping), Market value | Primary: 0%; Rental: 0% (only rental income zakatable if saved); Flipping: 2.5% market value | Clear intent selection | ⚠️ Phase 2 |
| **💳 Receivables** | Amount, Debtor reliability (**Strong/Doubtful**), Expected date | **Strong: 100% yearly; Doubtful: 0% yearly, 1 year upon recovery** | Date validation | ✅ MVP |
| **💳 Liabilities** | Short-term debts (credit cards, bills), Long-term installments (next 12 months only), **smart templates for common banks** | Deduct from assets per selected methodology | Separate tracking for Hanafi option | ✅ MVP |

**CRITICAL FIXES APPLIED:**
1. **Receivables:** Strong/Doubtful only (no 50% rule) - per classical fiqh
2. **Real Estate:** Rental income zakatable if saved, not property value
3. **Retirement:** Added Provident Fund for South Asian users
4. **Gold:** Regional units (sovereign, tola) with auto-conversion to grams
5. **Stocks:** Quick mode for users who only know total value
6. **Cash:** Dual-currency display (base + home) for expats

### 4.2 Regional Gold Units (NEW)

| Unit | Region | Conversion | Purity Standard |
|------|--------|------------|-----------------|
| **Gram** | International | 1g = 1g | User selects karat |
| **Sovereign** | India, UK | 1 sovereign = 7.988g (≈ 8g) | Indian 22K = 91.6% |
| **Tola** | India, Pakistan, Bangladesh | 1 tola = 11.664g | South Asian 22K = 91.6% |
| **Baht** | Thailand | 1 baht = 15.244g | Thai 96.5% standard |
| **Tael** | China, Hong Kong | 1 tael = 37.799g | HK 99% or 91.6% |
| **Ratti** | India (traditional) | 1 ratti = 0.182g | Traditional jewelry |

**Implementation:**
- `src/lib/calculation/goldUnits.ts` - Conversion table
- `src/data/regionalPurity.json` - Purity standards by region
- Auto-convert all to grams for calculation engine

### 4.3 Multi-Currency Architecture (Enhanced with Dual Display)

**Base Currency vs. Home Currency:**
- **Base Currency:** Used for all calculations (e.g., SGD for Singapore-based user)
- **Home Currency:** Optional display-only currency for mental reference (e.g., INR for Indian expat)

**Example Display:**
```
BASE (SGD)          HOME (INR)
─────────────────────────────────────
Net Wealth:         SGD 187,937.50
                    ≈ ₹ 1,17,46,093

Nisab: SGD 7,240    ₹ 4,52,500
```

**Number Formatting:**
- Indian numbering system for INR: `₹ 1.17 Cr` or `₹ 117.46 L` (lakhs/crores)
- Standard international for others: `USD 45,230.50`

### 4.4 Quick Stock Mode (NEW)

For users like Mohamed who track portfolios by total value, not share count:

```
Input Mode Toggle:
(•) Quick: I know my total portfolio value
    Enter: SGD 45,000
    Holding type: Long-term investment
    Method: Simplified 30% (AAOIFI estimation)
    Zakatable: SGD 13,500

( ) Detailed: I want precise calculation
    Enter: Symbol, shares, company fundamentals
    Method: Asset-based (AAOIFI Standard 35)
```

### 4.5 Scholarly Methodology Selection (Corrected)

| Setting | Options | Default | Source | Impact Preview |
|---------|---------|---------|--------|--------------|
| **Nisab Basis** | Silver (612.36g) / Gold (87.48g) / **Auto (lower) - LABELED AS "Convenience setting (not formal fiqh)"** | **Silver** | NZF, Islamic Relief | Show both values, explain difference |
| **Debt Deduction** | Majority (12-month only) / Hanafi (all debts) | **Majority** | FCNA, AAOIFI | Show liability impact |
| **Retirement Accounts** | FCNA (net accessible) / Delayed (at withdrawal) | **FCNA** | FCNA official ruling | Show Zakat difference |
| **Jewelry Zakat** | Hanafi (all gold/silver) / Other (customary use exempt) | **Hanafi** | Conservative default | Explain exemption rules |
| **Stock Valuation** | Asset-based (AAOIFI) / Market value (simplified) | **Asset-based** | More accurate | Show % difference |
| **Hawl Check** | Yes (1 lunar year passed) / No (new wealth) / Unknown | **Yes** | Assumes established wealth | Explain hawl concept |

---

## 5. User Interface Design (Enhanced with Expat Features)

### 5.1 Regional Preset Modal (NEW)

```
┌─────────────────────────────────────────┐
│  🌍 Quick Setup                    [✕] │
├─────────────────────────────────────────┤
│  Select your situation:                 │
│                                         │
│  (•) Indian in Singapore                │
│    → Base: SGD | Home: INR              │
│    → Gold: Sovereign | Stocks: Quick    │
│    → Format: Indian numbering (L/Cr)    │
│                                         │
│  ( ) Indian in UAE                      │
│    → Base: AED | Home: INR              │
│    → Gold: Tola | Stocks: Quick         │
│                                         │
│  ( ) Pakistani in UK                  │
│    → Base: GBP | Home: PKR              │
│    → Gold: Tola | Format: International │
│                                         │
│  ( ) Bangladeshi in Malaysia          │
│    → Base: MYR | Home: BDT              │
│    → Gold: Bhori | Stocks: Quick        │
│                                         │
│  ( ) Custom setup                       │
│                                         │
│  [Apply Preset]  [Skip for now]         │
└─────────────────────────────────────────┘
```

### 5.2 Enhanced Gold Input with Regional Units

```
┌─────────────────────────────────────────┐
│  🥇 Gold Holding #1            [🗑️]   │
├─────────────────────────────────────────────────────────┤
│  Unit: [Sovereign (India) ▼]                            │
│         ├── Grams (International)                         │
│         ├── Tola (South Asia)                           │
│         ├── Baht (Thailand)                               │
│         ├── Tael (China/HK)                             │
│         ├── Ratti (India traditional)                   │
│         └── Ounce (Global)                              │
│                                                         │
│  Weight: [    15    ] sovereigns                        │
│  = 119.82 grams (auto-converted)                        │
│                                                         │
│  Purity Source: [India (22K = 91.6%) ▼]                 │
│                  ├── Middle East (22K = 91.7%)          │
│                  └── Custom karat...                    │
│                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Calculation:                                           │
│  15 sovereigns × 7.988g = 119.82g gross                 │
│  119.82g × 91.6% purity = 109.75g pure gold            │
│  109.75g × SGD 82.50/g = SGD 9,054.38                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                         │
│  [📤 Upload CSV for bulk]  [Add Another]                │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Dual-Currency Sticky Summary (NEW)

```
┌─────────────────────────────────────────────────────────┐
│  LIVE SUMMARY                                           │
│  Base: SGD | Home: INR ▼                                │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  SGD              INR (≈)                               │
│  ─────────────────────────────────────────────────────  │
│  Assets:    220,437    1,37,77,312    (1.38 Cr)         │
│  Debts:     -3,500     -2,18,750                        │
│  ─────────────────────────────────────────────────────  │
│  Net:       216,937    1,35,58,562    (1.36 Cr)         │
│                                                         │
│  Nisab:     7,240      4,52,500       ✅ Met            │
│  Zakat:     5,423.43   3,38,964       (2.5%)            │
│                                                         │
│  [📥 PDF]  [🔗 Share]  [🔄 Reset]                       │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Data Storage, Privacy & Security

### 6.1 localStorage Schema (Revised with Expat Fields)

```typescript
// Key: openzakat_v3
interface StorageSchema {
  version: '3.0';
  
  preferences: {
    baseCurrency: string;           // SGD, AED, USD, etc.
    homeCurrency?: string;          // INR, PKR, BDT, etc. (optional)
    language: string;
    theme: "light" | "dark" | "system";
    regionalPreset?: string;        // "indian-singapore", "pakistani-uk", etc.
    goldUnit: "gram" | "sovereign" | "tola" | "baht" | "tael" | "ratti";
    numberingFormat: "international" | "indian"; // 1,00,000 vs 100,000
    methodology: {
      nisabBasis: "gold" | "silver" | "auto";
      debtDeduction: "majority" | "hanafi";
      retirementMethod: "fcna" | "delayed";
      jewelryMethod: "hanafi" | "other";
      stockValuation: "asset-based" | "market";
      stockInputMode: "quick" | "detailed"; // NEW
    };
    privacy: {
      enableHistory: boolean;
      encryptHistory: boolean;
    };
  };
  
  currentSession: {
    assets: AssetState;
    liabilities: LiabilityState;
    hawlAnniversary: string | null;
    lastUpdated: string;
  };
  
  cache: {
    exchangeRates: {
      rates: Record<string, string>;
      base: string;
      timestamp: string;
      source: "api" | "committed" | "manual";
    };
    metalPrices: {
      gold: string;
      silver: string;
      timestamp: string;
    };
    cryptoPrices: Record<string, string>;
  };
  
  history?: {
    calculations: HistoricalCalculation[];
    encrypted?: boolean;
  };
}
```

---

## 7. API Integration & GitHub Actions

### 7.1 GitHub Repository Configuration

**Repository:** `mohamedazimal27/OpenZakat`

**Workflow Files:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

```yaml
# .github/workflows/update-prices.yml
name: Update Market Prices
on:
  schedule:
    - cron: '0 6 * * *'  # Daily 6 AM UTC
  workflow_dispatch:
jobs:
  update-prices:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Fetch Prices
        run: |
          mkdir -p src/data
          curl -s "https://api.exchangerate-api.com/v4/latest/USD" > src/data/rates.json
          curl -s -H "x-access-token: ${{ secrets.GOLD_API_KEY }}" \
            "https://www.goldapi.io/api/XAU/USD" > src/data/gold.json
          curl -s -H "x-access-token: ${{ secrets.GOLD_API_KEY }}" \
            "https://www.goldapi.io/api/XAG/USD" > src/data/silver.json
          curl -s "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin,solana,cardano,ripple,polkadot,dogecoin,avalanche-2&vs_currencies=usd" > src/data/crypto.json
          date -u +"%Y-%m-%dT%H:%M:%SZ" > src/data/last-update.txt
      - name: Commit with Amend
        run: |
          git config user.name "GitHub Action"
          git config user.email "action@github.com"
          git add src/data/
          if git diff --cached --quiet; then exit 0; fi
          if git log -1 --pretty=%B | grep -q "Daily price update"; then
            git commit --amend -m "Daily price update: $(date -u +'%Y-%m-%d %H:%M UTC')"
            git push --force-with-lease
          else
            git commit -m "Daily price update: $(date -u +'%Y-%m-%d %H:%M UTC')"
            git push
          fi
```

---

## 8. Development Roadmap (Revised)

### Phase 1: MVP (Weeks 1-2) - Core + Expat Essentials
| Feature | Priority | Effort |
|---------|----------|--------|
| Project setup (Vite, React, Tailwind, decimal.js) | Critical | 1 day |
| Regional presets (Indian-Singapore, Pakistani-UK, etc.) | **NEW Critical** | 1 day |
| Gold with regional units (sovereign, tola, etc.) | **NEW Critical** | 2 days |
| Cash with dual-currency display | **NEW Critical** | 1 day |
| Stock quick mode (total value only) | **NEW Critical** | 1 day |
| Silver, basic crypto, liabilities | Critical | 2 days |
| Nisab toggle, methodology modal | Critical | 1 day |
| PDF export, responsive UI | High | 2 days |

**MVP Definition of Done:**
- Mohamed can complete calculation in 6 minutes with zero external searches
- All regional units work seamlessly
- Dual-currency display accurate
- Deployed to `https://mohamedazimal27.github.io/OpenZakat/`

### Phase 2: Essential Assets (Weeks 3-4)
| Feature | Priority |
|---------|----------|
| Retirement accounts (FCNA method) | High |
| Receivables (strong/doubtful) | High |
| Investment stocks (asset-based) | Medium |
| PWA offline support | Medium |

### Phase 3: Advanced (Weeks 5-6)
| Feature | Priority |
|---------|----------|
| Business inventory | Medium |
| Real estate module | Low |
| Multi-language (AR, UR) | Medium |

### Phase 4: Scale (Weeks 7-8)
| Feature | Priority |
|---------|----------|
| Scholar verification program | High |
| Community translations | Medium |

---

## 9. Repository Structure

```
openzakat/
├── .github/
│   └── workflows/
│       ├── deploy.yml           # Deploy to GitHub Pages
│       └── update-prices.yml    # Daily price update with git amend
├── public/
│   ├── _headers                 # CSP headers
│   ├── CNAME                    # Custom domain (optional)
│   ├── manifest.json
│   └── locales/
│       ├── en.json
│       ├── ar.json
│       └── ur.json
├── src/
│   ├── components/
│   │   ├── assets/
│   │   │   ├── CashInput.tsx
│   │   │   ├── GoldInput.tsx    # With regional units
│   │   │   ├── SilverInput.tsx
│   │   │   ├── CryptoInput.tsx
│   │   │   ├── StockInput.tsx   # Quick + Detailed modes
│   │   │   ├── RetirementInput.tsx
│   │   │   └── LiabilitiesInput.tsx
│   │   ├── common/
│   │   ├── layout/
│   │   │   ├── RegionalPresetModal.tsx  # NEW
│   │   │   ├── DualCurrencySummary.tsx  # NEW
│   │   │   └── ...
│   │   └── results/
│   ├── data/
│   │   ├── prices/
│   │   ├── regional/
│   │   │   ├── goldUnits.ts           # NEW
│   │   │   ├── presets.ts             # NEW
│   │   │   └── purityStandards.json   # NEW
│   │   └── scholarly/
│   ├── lib/
│   │   ├── calculation/
│   │   │   ├── engine.ts
│   │   │   ├── gold.ts                # Updated with units
│   │   │   ├── currency.ts
│   │   │   └── stocks.ts              # Quick mode logic
│   │   ├── currency/
│   │   └── storage/
│   ├── store/
│   ├── types/
│   ├── utils/
│   │   ├── decimal.ts
│   │   ├── formatters.ts              # Indian numbering
│   │   └── unitConversion.ts          # NEW
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── unit/
│   │   ├── calculation.test.ts
│   │   ├── gold-units.test.ts         # NEW
│   │   ├── dual-currency.test.ts      # NEW
│   │   └── stock-quick.test.ts        # NEW
│   └── e2e/
├── docs/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 10. Success Metrics (Enhanced)

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Calculation Accuracy** | 100% | 35+ unit tests (including 5 new expat tests) |
| **Mohamed Scenario Time** | < 6 minutes | User testing with stopwatch |
| **External Searches** | 0 | No Google searches needed during calculation |
| **Bundle Size (MVP)** | < 120KB | With regional unit data |
| **GitHub Stars** | 500 | Community adoption |
| **Expat User Satisfaction** | > 90% | Post-calculation survey |

**New Test Cases (5 expat-specific):**
31. Sovereign to gram conversion (15 sovereigns = 119.82g)
32. Tola to gram conversion (10 tolas = 116.64g)
33. Dual-currency display (SGD base + INR home)
34. Indian numbering format (1,00,000 vs 100,000)
35. Stock quick mode (total value → 30% zakatable)

---

## 11. Final Checklist for Launch

- [ ] All 35 unit tests passing
- [ ] Mohamed scenario tested: 6 minutes, zero external searches
- [ ] Regional presets: Indian-Singapore, Pakistani-UK, Bangladeshi-Malaysia
- [ ] Gold units: sovereign, tola, baht, tael, ratti, gram
- [ ] Dual-currency display working (base + home)
- [ ] Stock quick mode functional
- [ ] Deployed to `https://mohamedazimal27.github.io/OpenZakat/`
- [ ] GitHub Actions price updater running
- [ ] MIT License applied
- [ ] README with expat-specific documentation

---

## 12. Summary: What Makes This PRD Unique

| Feature | Standard Calculators | OpenZakat (This PRD) |
|---------|---------------------|----------------------|
| Gold input | Grams only | **Regional units** (sovereign, tola, etc.) |
| Currency | Single or converted | **Dual display** (base + home) |
| Stocks | Share count required | **Quick mode** (total value) |
| Setup | Manual configuration | **Regional presets** (one-click) |
| Number format | International only | **Indian (L/Cr) + International** |
| Time to calculate | 15+ minutes | **< 6 minutes** |

**This PRD is production-ready for global Muslims, especially the 250M+ South Asian expat population who think in sovereigns, lakhs, and portfolio values—not grams and share counts.**

## 13. Additional question and Answer

will it work for multiple currency for a single person?

 Yes, absolutely. The PRD already supports multiple currencies for a single person. Let me clarify and enhance this to make it explicit and robust.

---

## Multi-Currency Support for Single User (Enhanced Specification)

### Current PRD Support

| Feature | Implementation | Status |
|---------|---------------|--------|
| **Multiple cash accounts** | Each account has its own currency | ✅ PRD §4.1 |
| **Currency conversion** | All normalized to base currency | ✅ PRD §4.2 |
| **Dual display** | Base + optional home currency | ✅ PRD §4.3 (Expat feature) |
| **Real-time rates** | ExchangeRate-API with 24hr cache | ✅ PRD §7.1 |

---

## Enhanced Multi-Currency Architecture

### User Scenario: Mohamed's Multi-Currency Reality

```
Mohamed's Assets (Single User, Multiple Currencies):
├── Cash & Bank Accounts
│   ├── DBS Singapore:        SGD 100,000  (salary account)
│   ├── ICICI India:          INR 8,00,000 (family savings)
│   ├── NRE Account:          USD 5,000    (dollar savings)
│   └── Wise Account:         EUR 2,500    (Europe travel fund)
│
├── Gold
│   └── 15 sovereigns:        SGD 12,420   (auto-converted from gold price)
│
├── Stocks
│   └── Total value:          SGD 45,000   (CDP Singapore)
│
└── Crypto
    └── 0.45 BTC:             SGD 30,000   (CoinGecko API)

BASE CURRENCY: SGD (for calculation)
HOME CURRENCY: INR (for mental reference)

All converted to SGD for Zakat calculation:
SGD 100,000 + INR 8L (→ SGD 12,800) + USD 5K (→ SGD 6,750) 
+ EUR 2.5K (→ SGD 3,625) + SGD 12,420 + SGD 45,000 + SGD 30,000
= SGD 210,595 total zakatable assets
```

---

## Technical Implementation (Enhanced)

### Data Model for Multi-Currency

```typescript
// src/types/index.ts

interface CashAccount {
  id: string;
  accountName?: string;
  amount: string;           // Stored as string for decimal.js precision
  currency: string;         // ISO 4217: SGD, INR, USD, EUR, etc.
  convertedToBase: string;  // Auto-calculated
  exchangeRate: string;     // Rate used for conversion
  lastUpdated: string;      // Timestamp
}

interface ZakatState {
  preferences: {
    baseCurrency: string;     // SGD - used for all calculations
    homeCurrency?: string;    // INR - optional display only
    displayFormat: "both" | "base-only" | "home-only";
  };
  
  assets: {
    cash: CashAccount[];      // Array supports unlimited accounts
    // ... other assets
  };
}
```

### Currency Conversion Flow

```
User Input (Any Currency)
    ↓
[ExchangeRate-API] or [Cached Rate] or [Manual Override]
    ↓
Convert to Base Currency (decimal.js precision)
    ↓
Store: Original Amount + Converted Amount + Rate Used
    ↓
Display: Both currencies side-by-side
    ↓
Calculation Engine: Uses converted base currency amounts only
```

### UI: Multi-Currency Cash Input

```
┌─────────────────────────────────────────────────────────┐
│  💰 Cash & Bank Accounts                      [+ Add New] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Account #1: DBS Singapore                    [🗑️]     │
│  Amount: [   100,000    ] [SGD ▼]                      │
│  ≈ SGD 100,000.00 (base) • Rate: 1.000 • Live ✓        │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  Account #2: ICICI India                        [🗑️]     │
│  Amount: [  8,00,000    ] [INR ▼]                      │
│  ≈ SGD 12,800.00 (base) • Rate: 0.0160 • Live ✓        │
│  (₹ 8,00,000.00 in home currency)                      │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  Account #3: NRE Dollar Account                 [🗑️]     │
│  Amount: [    5,000     ] [USD ▼]                      │
│  ≈ SGD 6,750.00 (base) • Rate: 1.350 • Live ✓        │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  Account #4: Wise Travel Fund                   [🗑️]     │
│  Amount: [    2,500     ] [EUR ▼]                      │
│  ≈ SGD 3,625.00 (base) • Rate: 1.450 • Cached 2h ⚠     │
│  [⚠️ Using rate from 2 hours ago - Refresh]            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  CASH TOTALS:                                           │
│  SGD 123,175.00 (base currency)                         │
│  ≈ ₹ 76,98,437 (home currency)                          │
│  ≈ € 82,116 • $91,241 (other conversions for reference) │
└─────────────────────────────────────────────────────────┘
```

---

## Enhanced Features for Multi-Currency (New Additions)

### 1. Currency-Specific Formatting

| Currency | Format Example | Notes |
|----------|---------------|-------|
| SGD | `SGD 100,000.50` | Standard international |
| INR | `₹ 1,00,00,000.50` | Indian numbering (lakhs/crores) |
| USD | `$100,000.50` | Dollar symbol prefix |
| EUR | `€100.000,50` | European decimal comma |
| AED | `AED 100,000.50` | Middle Eastern standard |
| PKR | `₨ 1,00,00,000` | Pakistani rupee format |
| BDT | `৳ 1,00,00,000` | Bangladeshi taka format |

### 2. Exchange Rate Transparency

```
Each converted amount shows:
- Original amount in source currency
- Conversion rate used
- Timestamp of rate (Live / Cached Xh ago / Manual)
- Source (API / Cache / User entered)

Click [ℹ️] to see:
- Rate source: ExchangeRate-API
- Last updated: 2026-02-18 14:30 UTC
- Next refresh: 2026-02-19 14:30 UTC (24hr cache)
- [Refresh now] [Enter custom rate]
```

### 3. Manual Rate Override (Critical for Multi-Currency)

When APIs fail or user disagrees with rate:

```
┌─────────────────────────────────────────────────────────┐
│  [⚠️ API unavailable for EUR-SGD rate]                  │
│                                                         │
│  Last known rate: 1.450 (2 hours ago)                   │
│                                                         │
│  [Use last known: SGD 3,625]                            │
│  [Enter custom rate: _______]                           │
│  [Enter fixed SGD amount: _______]                      │
│                                                         │
│  ℹ️ Your Zakat calculation will use whatever rate you    │
│     specify. Consult your bank for exact rates.         │
└─────────────────────────────────────────────────────────┘
```

---

## Updated Master Prompt (Multi-Currency Explicit)

Add to your master prompt:

```
MULTI-CURRENCY SUPPORT (Single User):
- Unlimited cash accounts, each with independent currency
- 100 fiat currencies supported (ISO 4217)
- All amounts converted to base currency using decimal.js
- Display: Original currency + Base currency + Optional home currency
- Exchange rate transparency: show rate, timestamp, source for every conversion
- Manual rate override always available per account
- Currency-specific formatting (Indian numbering for INR, etc.)
- 24-hour rate caching with stale data warnings
- Fallback chain: Live API → Cached → Committed prices.json → Manual

CRITICAL: Never force user to convert manually. System handles all math.
```

---

## Test Case: Multi-Currency (New)

```typescript
// tests/unit/multi-currency.test.ts

test('Multiple currencies convert correctly to base', () => {
  const accounts = [
    { amount: '100000', currency: 'SGD', base: 'SGD' },  // SGD 100,000
    { amount: '800000', currency: 'INR', base: 'SGD' },   // INR 8L → SGD 12,800
    { amount: '5000', currency: 'USD', base: 'SGD' },   // USD 5K → SGD 6,750
    { amount: '2500', currency: 'EUR', base: 'SGD' },    // EUR 2.5K → SGD 3,625
  ];
  
  const total = calculateMultiCurrencyTotal(accounts, {
    'INR-SGD': '0.0160',
    'USD-SGD': '1.350',
    'EUR-SGD': '1.450',
  });
  
  expect(total.toString()).toBe('123175.00'); // SGD 123,175
});
```

---

## Summary

| Question | Answer |
|----------|--------|
| Multiple currencies per person? | ✅ Yes, unlimited accounts |
| Mix SGD, INR, USD, EUR, etc.? | ✅ Yes, all supported |
| Real-time conversion? | ✅ Yes, with 24hr cache |
| Show both original and converted? | ✅ Yes, side-by-side |
| What if API fails? | ✅ Cached → Manual override |
| Indian numbering for INR? | ✅ Yes, `₹ 1,00,000` format |
| Can I override a specific rate? | ✅ Yes, per account |

**The system is designed for exactly Mohamed's scenario: one person, multiple currencies, zero friction.**