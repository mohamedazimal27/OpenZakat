<!-- بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ -->

<div align="center">

# 🕌 OpenZakat

### Free Precision Zakat Calculator for Global Muslims

[![Live Demo](https://img.shields.io/badge/Live-mohamedazimal27.github.io%2FOpenZakat-green?style=for-the-badge&logo=github)](https://mohamedazimal27.github.io/OpenZakat/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/Tests-38%2F38%20passing-brightgreen?style=for-the-badge)](./src/tests)
[![PRD](https://img.shields.io/badge/PRD-v3.0-blue?style=for-the-badge)](./PRD.md)

**بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ**

*In the name of Allah, the Most Gracious, the Most Merciful*

> All praise and thanks are due to **Allah (سُبْحَانَهُ وَتَعَالَىٰ)** for the knowledge, ability, and blessings to build this tool.  
> May it be a means of ease for Muslims fulfilling their Zakat obligation — one of the Five Pillars of Islam.

</div>

---

## ✨ What is OpenZakat?

**OpenZakat** is a 100% free, open-source, privacy-first Zakat calculator built for the global Muslim community — especially expats, multi-currency holders, and South Asian diaspora who have always faced unnecessary friction in calculating Zakat.

**No accounts. No ads. No servers. No data collection. Your numbers never leave your browser.**

### Why OpenZakat Exists

Traditional Zakat calculators were built for a single country, a single currency, and a single unit of measurement. But today's Muslim professional:

- Earns in SGD, saves in INR, holds gold in **sovereigns** (not grams)
- Has stocks tracked by **total value** (not share count)
- Wants results shown in **both SGD and INR** without mental math
- Deserves a tool that respects their intelligence and privacy

**OpenZakat eliminates all that friction.**

---

## 🌐 Live Demo

**➡️ https://mohamedazimal27.github.io/OpenZakat/**

| Feature | Time with Traditional Tools | Time with OpenZakat |
|---------|--------------------------|---------------------|
| Gold in sovereigns → grams | Google search needed | **Zero — auto-converts** |
| SGD + INR dual display | Mental math required | **Zero — shown side-by-side** |
| Stock total value input | Share count required | **Zero — enter total value** |
| Full calculation | 15+ minutes | **< 6 minutes** |

---

## 📖 How to Use

### Step 1 — Quick Setup (Regional Preset)
On first visit, select your situation:
- **Indian in Singapore** → Base: SGD, Home: INR, Gold: Sovereign
- **Indian in UAE** → Base: AED, Home: INR, Gold: Tola
- **Pakistani in UK** → Base: GBP, Home: PKR, Gold: Tola
- **Bangladeshi in Malaysia** → Base: MYR, Home: BDT, Gold: Tola
- **Custom Setup** → Configure everything manually

### Step 2 — Enter Your Assets

Navigate the tabs across the top:

#### 🥇 Gold
- Select your unit: **Sovereign, Tola, Baht, Tael, Ratti, Gram, or Troy Oz**
- Enter weight — the app auto-converts to grams and calculates pure gold
- Select your purity standard (India 22K = 91.6%, Middle East 22K = 91.7%, etc.)
- Live SGD (and home currency) value shown instantly

#### 🥈 Silver
- Enter weight in grams, select type (bullion/coins/jewelry)
- 100% zakatable at current market price

#### 💰 Cash & Banks
- Add unlimited accounts — each with its own currency
- App converts everything to your base currency automatically
- Shows both base and home currency values

#### 🪙 Crypto
- Select from top 50 coins, enter amount
- Wallet type: Exchange (zakatable), Hardware (zakatable), Lost (excluded)

#### 📈 Stocks
- **Quick Mode**: Just enter total portfolio value → auto-applies 30% AAOIFI method
- **Detailed Mode**: Enter market value per holding for precise calculation

#### 🏦 Retirement
- 401k, IRA, Pension, Provident Fund
- FCNA method: `balance × (1 - early withdrawal penalty - tax rate)`

#### 💳 Receivables
- **Strong** (reliable debtor) → 100% zakatable
- **Doubtful** (uncertain) → 0% (recovered amount zakatable in year of recovery)

#### 🏧 Liabilities
- Short-term debts (credit cards, bills due within 12 months)
- Deducted per your selected methodology (Majority or Hanafi)

### Step 3 — Review Results
The results panel shows:
- Nisab status (Silver or Gold basis, your choice)
- Dual-currency breakdown (base + home)
- Exact Zakat due (2.5%)
- Asset breakdown by category
- Copy to clipboard for sharing

### Step 4 — Methodology Settings
Click the ⚙️ settings icon to adjust:
- **Nisab Basis**: Silver (default, NZF/Islamic Relief), Gold, or Auto
- **Debt Deduction**: Majority/FCNA (12-month only) or Hanafi (all debts)
- **Retirement Method**: FCNA (accessible net) or Delayed
- **Jewelry**: Hanafi (all gold/silver) or exemption-based
- **Stock Valuation**: Asset-based (AAOIFI) or Market value
- **Hawl**: Completed, New wealth, or Unknown

---

## 🔒 Privacy & Security

> **Your financial data NEVER leaves your device.**

| Aspect | Implementation |
|--------|---------------|
| **Data storage** | `localStorage` only — browser-local, never sent anywhere |
| **API keys** | None required by users — only GitHub Actions uses `GOLD_API_KEY` via GitHub Secrets |
| **Price data** | Fetched client-side from public APIs OR served from daily-committed `src/data/prices/` files |
| **No tracking** | Zero analytics, zero cookies, zero third-party scripts |
| **Open source** | All calculation logic is auditable — [view the code](./src/lib/calculation/) |
| **HTTPS** | Enforced by GitHub Pages |

### For Contributors — Security Guidelines

- **NEVER** hardcode API keys, tokens, or secrets in source files
- **NEVER** commit `.env` files (they are gitignored)
- The only secret in this project is `GOLD_API_KEY` — stored exclusively as a [GitHub Secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets), only accessible to GitHub Actions, never exposed in code
- If you accidentally commit a secret, immediately rotate it and use `git filter-branch` or BFG Repo Cleaner to remove it from history
- Run `git log --all --full-history -- "*.env"` periodically to check for accidental env commits

---

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ 
- npm 9+
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/mohamedazimal27/OpenZakat.git
cd OpenZakat

# Install dependencies
npm install

# Start development server
npm run dev
# → Opens at http://localhost:5173/OpenZakat/
```

### Available Scripts

```bash
npm run dev        # Start Vite dev server (hot reload)
npm run build      # Production build → ./dist/
npm run preview    # Preview production build locally
npm test           # Run all 38 unit tests (Vitest)
npm run lint       # ESLint check
```

### Project Structure

```
openzakat/
├── .github/workflows/
│   ├── deploy.yml           # Auto-deploy to GitHub Pages on push to main
│   └── update-prices.yml    # Daily price update (gold, silver, crypto, forex)
├── src/
│   ├── components/
│   │   ├── assets/          # Input forms (Gold, Silver, Cash, Crypto, Stocks...)
│   │   ├── layout/          # Preset modal, methodology modal, dual-currency summary
│   │   └── results/         # Results panel with dual-currency display
│   ├── data/
│   │   ├── prices/          # Fallback prices (updated daily by GitHub Actions)
│   │   └── regional/        # Gold units, presets, purity standards
│   ├── lib/
│   │   ├── calculation/     # Core engines: gold, silver, cash, crypto, stocks, nisab
│   │   └── currency/        # Exchange rate service with fallback chain
│   ├── store/               # Zustand global state + localStorage v3.0
│   ├── types/               # TypeScript interfaces
│   └── utils/               # decimal.js helpers, formatters, unit converters
└── tests/                   # Unit tests (38 tests, including 5 expat-specific)
```

### GitHub Actions — How Prices Stay Fresh

**`deploy.yml`** — Triggers on every push to `main`:
1. Checks out code
2. Runs `npm ci && npm run build`
3. Deploys `./dist/` to `gh-pages` branch via `peaceiris/actions-gh-pages`

**`update-prices.yml`** — Runs daily at 06:00 UTC:
1. Fetches gold/silver prices from GoldAPI
2. Fetches 100+ currency rates from ExchangeRate-API
3. Fetches top crypto prices from CoinGecko (free tier, no key)
4. Commits updated `src/data/prices/` files (with `git commit --amend` to keep history clean)
5. This triggers `deploy.yml` which rebuilds the site with fresh prices

**Fallback chain** when APIs are unavailable:
```
Live API → 24-hour cache (localStorage) → Committed prices → Manual override
```

### Adding the GOLD_API_KEY Secret (for your own fork)

1. Get a free API key at https://www.goldapi.io/
2. Go to your repo → Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `GOLD_API_KEY`, Value: your key
5. The `update-prices.yml` workflow will use it automatically

> Without `GOLD_API_KEY`, the action falls back to the last committed prices — the site still works, prices are just potentially stale.

---

## 🤝 Contributing

Contributions are warmly welcome! Here's how to get started:

### How to Contribute

1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feat/your-feature-name`
3. **Make your changes** — follow the existing code style (TypeScript strict mode)
4. **Add tests** for any new calculation logic in `src/tests/unit/`
5. **Run tests**: `npm test` — all 38 must pass, plus your new tests
6. **Run build**: `npm run build` — must complete with zero TypeScript errors
7. **Submit a Pull Request** with a clear description

### Areas We Welcome Contributions

| Area | Notes |
|------|-------|
| **New languages** | Arabic (ar), Urdu (ur), Malay (ms), Bengali (bn) |
| **Additional regional presets** | Egyptian in Gulf, Malaysian in Australia, etc. |
| **Phase 2 features** | Business inventory, real estate module |
| **PWA / offline support** | Service worker implementation |
| **Accessibility** | WCAG 2.1 AA compliance |
| **Scholar review** | Methodology accuracy improvements |
| **Bug fixes** | Always welcome |

### Code Standards

- TypeScript strict mode — no `any`, no `// @ts-ignore`
- All monetary math via `decimal.js` — never native JS floats for Zakat calculations
- New calculation functions must have corresponding unit tests
- Components use Tailwind CSS only — no inline styles
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)

### Reporting Issues

Found a bug or have a feature request? [Open an issue](https://github.com/mohamedazimal27/OpenZakat/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS (for UI bugs)

---

## 📚 Scholarly Basis

OpenZakat's calculations are based on rulings from:

| Methodology | Source |
|-------------|--------|
| **Nisab (Silver)** | FCNA, NZF, Islamic Relief — consensus default |
| **Nisab (Gold)** | Classic scholarly position |
| **Debt Deduction (12-month)** | FCNA, AAOIFI majority position |
| **Debt Deduction (All debts)** | Hanafi school |
| **Retirement Accounts** | FCNA official ruling (net accessible value) |
| **Stock Valuation** | AAOIFI Standard 35 |
| **Receivables** | Classical fiqh — Strong/Doubtful only |

> **Disclaimer:** OpenZakat is an educational tool to assist in Zakat calculations. For your specific situation, especially complex portfolios or unusual assets, please consult a qualified Islamic scholar or Zakat-certified organization.

---

## 🙏 Acknowledgements

### First and Foremost — الحمد لله

All praise belongs to **Allah (سُبْحَانَهُ وَتَعَالَىٰ)**. This project exists by His will and blessing. Every correct calculation that helps a Muslim fulfill their Zakat obligation is a gift from Him alone. Any error is from human shortcoming.

> *"And establish prayer and give Zakat, and whatever good you put forward for yourselves — you will find it with Allah."*  
> — Surah Al-Baqarah (2:110)

### Built With AI Assistance

This project was architected and implemented with the assistance of:

- **[Cline](https://github.com/cline/cline)** — AI software engineering assistant in VS Code. The AI handled the full-stack implementation: calculation engine, UI components, test suite, GitHub Actions workflows, and architecture decisions — all strictly aligned to the PRD specification.

- **[Claude (Anthropic)](https://www.anthropic.com/claude)** — The AI model powering Cline's reasoning, code generation, and PRD analysis.

- **[Visual Studio Code](https://code.visualstudio.com/)** — The IDE that made this possible with first-class AI integration.

> A human provided the vision, PRD, Islamic scholarly requirements, and product direction. AI provided the implementation speed and technical precision. Together, we built something we hope serves the Ummah.

### Open Source Libraries

| Library | Purpose |
|---------|---------|
| [React](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [decimal.js](https://mikemcl.github.io/decimal.js/) | Precision arithmetic for Zakat math |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [Lucide React](https://lucide.dev/) | Icons |
| [Vitest](https://vitest.dev/) | Test framework |
| [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) | GitHub Pages deployment |

---

## 📄 License

MIT License — © 2026 mohamedazimal27

Free to use, fork, modify, and distribute. If you build something beneficial with this, we ask only that you remember the Ummah in your du'a.

See [LICENSE](./LICENSE) for full text.

---

<div align="center">

**May Allah accept this effort as a means of ease for the Ummah.**

**جَزَاكَ اللهُ خَيْرًا** — *Jazak Allahu Khayran*

⭐ If OpenZakat helped you, consider starring the repo to help other Muslims find it.

[🌐 Live Calculator](https://mohamedazimal27.github.io/OpenZakat/) · [🐛 Report Bug](https://github.com/mohamedazimal27/OpenZakat/issues) · [💡 Request Feature](https://github.com/mohamedazimal27/OpenZakat/issues)

</div>
