import type { LanguageCode } from '@/types';

type TranslationKey =
  | 'app.tagline'
  | 'app.clientSide'
  | 'section.gold'
  | 'section.silver'
  | 'section.cash'
  | 'section.crypto'
  | 'section.stocks'
  | 'section.retirement'
  | 'section.receivables'
  | 'section.liabilities'
  | 'summary.live'
  | 'summary.baseCurrency'
  | 'summary.homeCurrency'
  | 'summary.optional'
  | 'summary.none'
  | 'summary.totalAssets'
  | 'summary.liabilities'
  | 'summary.netWealth'
  | 'summary.nisab'
  | 'summary.met'
  | 'summary.notMet'
  | 'summary.zakatDue'
  | 'summary.nisabNotMet'
  | 'summary.hawlIncomplete'
  | 'summary.addAssets'
  | 'summary.updated'
  | 'summary.language'
  | 'preset.quickSetup'
  | 'preset.oneClick'
  | 'preset.setsBase'
  | 'preset.setsHome'
  | 'preset.setsGold'
  | 'preset.setsFormat'
  | 'preset.setsLanguage'
  | 'preset.canChange'
  | 'preset.selectSituation'
  | 'preset.apply'
  | 'preset.skip'
  | 'methodology.title'
  | 'methodology.done'
  | 'footer.free'
  | 'footer.privacy'
  | 'footer.opensource'
  | 'mobile.netWealth'
  | 'mobile.nisabMet'
  | 'mobile.notMet'
  | 'mobile.zakatDue'
  | 'asset.common.amount'
  | 'asset.common.currency'
  | 'asset.common.description'
  | 'asset.common.type'
  | 'asset.common.term'
  | 'asset.common.dueDate'
  | 'asset.common.shortTerm'
  | 'asset.common.longTerm'
  | 'asset.common.value'
  | 'asset.common.accountName'
  | 'asset.gold.title'
  | 'asset.gold.add'
  | 'asset.gold.empty'
  | 'asset.gold.holding'
  | 'asset.gold.purityStandard'
  | 'asset.gold.customPurity'
  | 'asset.gold.unit'
  | 'asset.gold.weight'
  | 'asset.gold.breakdownGross'
  | 'asset.gold.breakdownPure'
  | 'asset.silver.title'
  | 'asset.silver.add'
  | 'asset.silver.empty'
  | 'asset.silver.weightGrams'
  | 'asset.cash.title'
  | 'asset.cash.add'
  | 'asset.cash.empty'
  | 'asset.cash.base'
  | 'asset.cash.home'
  | 'asset.cash.rate'
  | 'asset.cash.live'
  | 'asset.cash.refreshRate'
  | 'asset.cash.total'
  | 'asset.crypto.title'
  | 'asset.crypto.add'
  | 'asset.crypto.empty'
  | 'asset.crypto.coin'
  | 'asset.crypto.walletType'
  | 'asset.crypto.wallet.exchange'
  | 'asset.crypto.wallet.hardware'
  | 'asset.crypto.wallet.lost'
  | 'asset.crypto.excludedLost'
  | 'asset.stocks.title'
  | 'asset.stocks.add'
  | 'asset.stocks.empty'
  | 'asset.stocks.quick'
  | 'asset.stocks.detailed'
  | 'asset.stocks.totalMarketValue'
  | 'asset.stocks.holdingType'
  | 'asset.stocks.trading'
  | 'asset.stocks.longTerm'
  | 'asset.stocks.quickInfo'
  | 'asset.stocks.quickInfoLongTerm'
  | 'asset.stocks.zakatable'
  | 'asset.stocks.zakatDue'
  | 'asset.stocks.symbol'
  | 'asset.stocks.marketValue'
  | 'asset.retirement.title'
  | 'asset.retirement.add'
  | 'asset.retirement.empty'
  | 'asset.retirement.accountType'
  | 'asset.retirement.balance'
  | 'asset.retirement.penalty'
  | 'asset.retirement.tax'
  | 'asset.retirement.accessible'
  | 'asset.retirement.invalid'
  | 'asset.retirement.formula'
  | 'asset.retirement.netZakatable'
  | 'asset.receivables.title'
  | 'asset.receivables.add'
  | 'asset.receivables.empty'
  | 'asset.receivables.reliability'
  | 'asset.receivables.strong'
  | 'asset.receivables.doubtful'
  | 'asset.receivables.excludedDoubtful'
  | 'asset.liabilities.title'
  | 'asset.liabilities.add'
  | 'asset.liabilities.empty'
  | 'asset.liabilities.majorityInfo'
  | 'asset.liabilities.excludedMajority'
  | 'asset.liabilities.totalDeductible'
  | 'results.title'
  | 'results.method'
  | 'results.copy'
  | 'results.nisabThreshold'
  | 'results.item'
  | 'results.zakatDueUpper'
  | 'results.notObligatory'
  | 'results.assetBreakdown'
  | 'results.calculated';

type TranslationTable = Record<TranslationKey, string>;

export const LANGUAGE_OPTIONS: { code: LanguageCode; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'ur', label: 'Urdu', nativeLabel: 'اردو' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية' },
];

export const RTL_LANGUAGES: ReadonlySet<LanguageCode> = new Set<LanguageCode>(['ar', 'ur']);

const en: TranslationTable = {
  'app.tagline': 'Free Precision Zakat Calculator',
  'app.clientSide': '100% Client-Side',
  'section.gold': 'Gold',
  'section.silver': 'Silver',
  'section.cash': 'Cash',
  'section.crypto': 'Crypto',
  'section.stocks': 'Stocks',
  'section.retirement': 'Retirement',
  'section.receivables': 'Receivables',
  'section.liabilities': 'Liabilities',
  'summary.live': 'Live Summary',
  'summary.baseCurrency': 'Base Currency',
  'summary.homeCurrency': 'Home Currency',
  'summary.optional': '(optional)',
  'summary.none': 'None',
  'summary.totalAssets': 'Total Assets',
  'summary.liabilities': 'Liabilities',
  'summary.netWealth': 'Net Wealth',
  'summary.nisab': 'Nisab',
  'summary.met': 'Met',
  'summary.notMet': 'Not Met',
  'summary.zakatDue': 'Zakat Due (2.5%)',
  'summary.nisabNotMet': 'Nisab not met — no Zakat due',
  'summary.hawlIncomplete': 'Hawl incomplete — no Zakat due yet',
  'summary.addAssets': 'Add assets to see your Zakat calculation',
  'summary.updated': 'Updated',
  'summary.language': 'Language',
  'preset.quickSetup': 'Quick Setup',
  'preset.oneClick': 'One-click configuration — sets all at once:',
  'preset.setsBase': 'Base currency',
  'preset.setsHome': 'Home currency',
  'preset.setsGold': 'Gold unit',
  'preset.setsFormat': 'Number format',
  'preset.setsLanguage': 'Language',
  'preset.canChange': 'You can always change these individually using the dropdowns in the summary panel.',
  'preset.selectSituation': 'Select your situation:',
  'preset.apply': 'Apply Preset',
  'preset.skip': 'Skip for now',
  'methodology.title': 'Scholarly Methodology',
  'methodology.done': 'Done',
  'footer.free': '100% Free',
  'footer.privacy': 'Privacy-First',
  'footer.opensource': 'Open Source',
  'mobile.netWealth': 'Net Wealth',
  'mobile.nisabMet': 'Nisab Met',
  'mobile.notMet': 'Not Met',
  'mobile.zakatDue': 'Zakat Due',
  'asset.common.amount': 'Amount',
  'asset.common.currency': 'Currency',
  'asset.common.description': 'Description',
  'asset.common.type': 'Type',
  'asset.common.term': 'Term',
  'asset.common.dueDate': 'Due Date',
  'asset.common.shortTerm': 'Short-term',
  'asset.common.longTerm': 'Long-term',
  'asset.common.value': 'Value',
  'asset.common.accountName': 'Account Name',
  'asset.gold.title': 'Gold',
  'asset.gold.add': 'Add Gold',
  'asset.gold.empty': 'No gold holdings added yet',
  'asset.gold.holding': 'Gold Holding',
  'asset.gold.purityStandard': 'Purity Standard',
  'asset.gold.customPurity': 'Custom Purity Ratio (e.g. 0.916)',
  'asset.gold.unit': 'Unit',
  'asset.gold.weight': 'Weight',
  'asset.gold.breakdownGross': 'gross',
  'asset.gold.breakdownPure': 'pure gold',
  'asset.silver.title': 'Silver',
  'asset.silver.add': 'Add Silver',
  'asset.silver.empty': 'No silver holdings added yet',
  'asset.silver.weightGrams': 'Weight (grams)',
  'asset.cash.title': 'Cash & Banks',
  'asset.cash.add': 'Add Account',
  'asset.cash.empty': 'No cash accounts added yet',
  'asset.cash.base': 'base',
  'asset.cash.home': 'home',
  'asset.cash.rate': 'Rate',
  'asset.cash.live': 'Live',
  'asset.cash.refreshRate': 'Refresh rate',
  'asset.cash.total': 'Total Cash',
  'asset.crypto.title': 'Cryptocurrency',
  'asset.crypto.add': 'Add Crypto',
  'asset.crypto.empty': 'No crypto holdings added yet',
  'asset.crypto.coin': 'Coin',
  'asset.crypto.walletType': 'Wallet Type',
  'asset.crypto.wallet.exchange': 'Exchange',
  'asset.crypto.wallet.hardware': 'Hardware Wallet',
  'asset.crypto.wallet.lost': 'Lost / Inaccessible',
  'asset.crypto.excludedLost': 'Excluded from Zakat (lost wallet)',
  'asset.stocks.title': 'Stocks',
  'asset.stocks.add': 'Add Stocks',
  'asset.stocks.empty': 'No stock holdings added yet',
  'asset.stocks.quick': 'Quick: Total Value',
  'asset.stocks.detailed': 'Detailed',
  'asset.stocks.totalMarketValue': 'Total Market Value',
  'asset.stocks.holdingType': 'Holding Type',
  'asset.stocks.trading': 'Trading',
  'asset.stocks.longTerm': 'Long-term Investment',
  'asset.stocks.quickInfo': '2.5% applied to full market value - the widely accepted default across scholars.',
  'asset.stocks.quickInfoLongTerm': 'Scholars differ on long-term investments; full market value is the safest (most conservative) approach.',
  'asset.stocks.zakatable': 'Zakatable',
  'asset.stocks.zakatDue': 'Zakat Due',
  'asset.stocks.symbol': 'Symbol',
  'asset.stocks.marketValue': 'Market Value',
  'asset.retirement.title': 'Retirement Accounts',
  'asset.retirement.add': 'Add Account',
  'asset.retirement.empty': 'No retirement accounts added yet',
  'asset.retirement.accountType': 'Account Type',
  'asset.retirement.balance': 'Balance',
  'asset.retirement.penalty': 'Early Withdrawal Penalty (%)',
  'asset.retirement.tax': 'Tax Rate (%)',
  'asset.retirement.accessible': 'Accessible (FCNA method applies)',
  'asset.retirement.invalid': 'Penalty + Tax cannot be >= 100%',
  'asset.retirement.formula': 'FCNA: balance × (1 - penalty - tax)',
  'asset.retirement.netZakatable': 'Net Zakatable',
  'asset.receivables.title': 'Receivables',
  'asset.receivables.add': 'Add Receivable',
  'asset.receivables.empty': 'No receivables added yet',
  'asset.receivables.reliability': 'Debtor Reliability',
  'asset.receivables.strong': 'Strong (100% zakatable)',
  'asset.receivables.doubtful': 'Doubtful (excluded)',
  'asset.receivables.excludedDoubtful': 'Excluded from Zakat (doubtful debt)',
  'asset.liabilities.title': 'Liabilities & Debts',
  'asset.liabilities.add': 'Add Liability',
  'asset.liabilities.empty': 'No liabilities added yet',
  'asset.liabilities.majorityInfo': 'Majority method: only short-term debts are deductible. Long-term entries will be excluded.',
  'asset.liabilities.excludedMajority': 'Excluded under Majority method (long-term debt)',
  'asset.liabilities.totalDeductible': 'Total Deductible Liabilities',
  'results.title': 'Your Zakat Calculation',
  'results.method': 'Method',
  'results.copy': 'Copy',
  'results.nisabThreshold': 'Nisab threshold',
  'results.item': 'Item',
  'results.zakatDueUpper': 'ZAKAT DUE (2.5%)',
  'results.notObligatory': 'Nisab not met - Zakat is not obligatory',
  'results.assetBreakdown': 'Asset Breakdown',
  'results.calculated': 'Calculated',
};

const ta: TranslationTable = {
  ...en,
  'app.tagline': 'இலவச துல்லிய ஜகாத் கணிப்பான்',
  'app.clientSide': '100% உலாவியில்',
  'section.gold': 'தங்கம்',
  'section.silver': 'வெள்ளி',
  'section.cash': 'பணம்',
  'section.crypto': 'கிரிப்டோ',
  'section.stocks': 'பங்குகள்',
  'section.retirement': 'ஓய்வூதியம்',
  'section.receivables': 'பெறவேண்டியது',
  'section.liabilities': 'பொறுப்புகள்',
  'summary.live': 'நேரடி சுருக்கம்',
  'summary.baseCurrency': 'அடிப்படை நாணயம்',
  'summary.homeCurrency': 'தாய்நாட்டு நாணயம்',
  'summary.optional': '(விருப்பம்)',
  'summary.none': 'இல்லை',
  'summary.totalAssets': 'மொத்த சொத்துகள்',
  'summary.netWealth': 'நிகர செல்வம்',
  'summary.met': 'எட்டப்பட்டது',
  'summary.notMet': 'எட்டப்படவில்லை',
  'summary.addAssets': 'ஜகாத் கணக்கை பார்க்க சொத்துகளை சேர்க்கவும்',
  'summary.language': 'மொழி',
  'preset.quickSetup': 'வேகமான அமைப்பு',
  'preset.selectSituation': 'உங்கள் நிலையை தேர்வுசெய்க:',
  'preset.apply': 'முன்னமைப்பைப் பயன்படுத்து',
  'preset.skip': 'இப்போது தவிர்க்கவும்',
  'methodology.title': 'மத்ஹப் முறைமை',
  'methodology.done': 'முடிந்தது',
  'mobile.netWealth': 'நிகர செல்வம்',
  'mobile.nisabMet': 'நிஸாப் எட்டப்பட்டது',
  'mobile.notMet': 'எட்டப்படவில்லை',
  'mobile.zakatDue': 'ஜகாத் தொகை',
  'asset.gold.add': 'தங்கம் சேர்க்க',
  'asset.gold.empty': 'தங்க பதிவுகள் இல்லை',
  'asset.silver.add': 'வெள்ளி சேர்க்க',
  'asset.silver.empty': 'வெள்ளி பதிவுகள் இல்லை',
  'asset.cash.add': 'கணக்கு சேர்க்க',
  'asset.cash.empty': 'பண கணக்குகள் இல்லை',
  'asset.cash.total': 'மொத்த பணம்',
  'asset.crypto.add': 'கிரிப்டோ சேர்க்க',
  'asset.crypto.empty': 'கிரிப்டோ பதிவுகள் இல்லை',
  'asset.stocks.add': 'பங்குகள் சேர்க்க',
  'asset.stocks.empty': 'பங்கு பதிவுகள் இல்லை',
  'asset.retirement.add': 'கணக்கு சேர்க்க',
  'asset.retirement.empty': 'ஓய்வூதிய கணக்குகள் இல்லை',
  'asset.receivables.add': 'பெறவேண்டியது சேர்க்க',
  'asset.receivables.empty': 'பெறவேண்டிய பதிவுகள் இல்லை',
  'asset.liabilities.add': 'கடன் சேர்க்க',
  'asset.liabilities.empty': 'கடன் பதிவுகள் இல்லை',
  'results.title': 'உங்கள் ஜகாத் கணக்கு',
  'results.copy': 'நகலெடு',
  'results.assetBreakdown': 'சொத்து பிரிவு',
};

const ur: TranslationTable = {
  ...en,
  'app.tagline': 'مفت درست زکوٰۃ کیلکولیٹر',
  'app.clientSide': '100% کلائنٹ سائیڈ',
  'section.gold': 'سونا',
  'section.silver': 'چاندی',
  'section.cash': 'نقد',
  'section.crypto': 'کرپٹو',
  'section.stocks': 'شیئرز',
  'section.retirement': 'ریٹائرمنٹ',
  'section.receivables': 'وصولیاں',
  'section.liabilities': 'واجبات',
  'summary.live': 'لائیو خلاصہ',
  'summary.baseCurrency': 'بنیادی کرنسی',
  'summary.homeCurrency': 'ہوم کرنسی',
  'summary.optional': '(اختیاری)',
  'summary.none': 'کوئی نہیں',
  'summary.totalAssets': 'کل اثاثے',
  'summary.netWealth': 'خالص دولت',
  'summary.met': 'پورا',
  'summary.notMet': 'پورا نہیں',
  'summary.addAssets': 'زکوٰۃ حساب دیکھنے کے لیے اثاثے شامل کریں',
  'summary.language': 'زبان',
  'preset.quickSetup': 'فوری سیٹ اپ',
  'preset.selectSituation': 'اپنی صورتِ حال منتخب کریں:',
  'preset.apply': 'پری سیٹ لاگو کریں',
  'preset.skip': 'ابھی چھوڑیں',
  'methodology.title': 'فقہی طریقہ',
  'methodology.done': 'مکمل',
  'mobile.netWealth': 'خالص دولت',
  'mobile.nisabMet': 'نصاب پورا',
  'mobile.notMet': 'پورا نہیں',
  'mobile.zakatDue': 'زکوٰۃ واجب',
  'asset.gold.add': 'سونا شامل کریں',
  'asset.gold.empty': 'سونے کا کوئی اندراج نہیں',
  'asset.silver.add': 'چاندی شامل کریں',
  'asset.silver.empty': 'چاندی کا کوئی اندراج نہیں',
  'asset.cash.add': 'اکاؤنٹ شامل کریں',
  'asset.cash.empty': 'نقد اکاؤنٹس شامل نہیں',
  'asset.cash.total': 'کل نقد',
  'asset.crypto.add': 'کرپٹو شامل کریں',
  'asset.crypto.empty': 'کرپٹو کا کوئی اندراج نہیں',
  'asset.stocks.add': 'شیئرز شامل کریں',
  'asset.stocks.empty': 'شیئرز کا کوئی اندراج نہیں',
  'asset.retirement.add': 'اکاؤنٹ شامل کریں',
  'asset.retirement.empty': 'ریٹائرمنٹ اکاؤنٹس شامل نہیں',
  'asset.receivables.add': 'وصولی شامل کریں',
  'asset.receivables.empty': 'وصولیاں شامل نہیں',
  'asset.liabilities.add': 'واجب شامل کریں',
  'asset.liabilities.empty': 'واجبات شامل نہیں',
  'results.title': 'آپ کا زکوٰۃ حساب',
  'results.copy': 'کاپی',
  'results.assetBreakdown': 'اثاثہ جات کی تقسیم',
};

const ar: TranslationTable = {
  ...en,
  'app.tagline': 'حاسبة زكاة دقيقة ومجانية',
  'app.clientSide': '100% على المتصفح',
  'section.gold': 'الذهب',
  'section.silver': 'الفضة',
  'section.cash': 'النقد',
  'section.crypto': 'العملات الرقمية',
  'section.stocks': 'الأسهم',
  'section.retirement': 'التقاعد',
  'section.receivables': 'المستحقات',
  'section.liabilities': 'الالتزامات',
  'summary.live': 'ملخص مباشر',
  'summary.baseCurrency': 'العملة الأساسية',
  'summary.homeCurrency': 'عملة البلد',
  'summary.optional': '(اختياري)',
  'summary.none': 'لا يوجد',
  'summary.totalAssets': 'إجمالي الأصول',
  'summary.netWealth': 'صافي الثروة',
  'summary.met': 'متحقق',
  'summary.notMet': 'غير متحقق',
  'summary.addAssets': 'أضف الأصول لرؤية حساب الزكاة',
  'summary.language': 'اللغة',
  'preset.quickSetup': 'إعداد سريع',
  'preset.selectSituation': 'اختر حالتك:',
  'preset.apply': 'تطبيق الإعداد',
  'preset.skip': 'تخطي الآن',
  'methodology.title': 'المنهجية الفقهية',
  'methodology.done': 'تم',
  'mobile.netWealth': 'صافي الثروة',
  'mobile.nisabMet': 'تم بلوغ النصاب',
  'mobile.notMet': 'لم يبلغ النصاب',
  'mobile.zakatDue': 'الزكاة الواجبة',
  'asset.gold.add': 'إضافة ذهب',
  'asset.gold.empty': 'لا توجد ممتلكات ذهب',
  'asset.silver.add': 'إضافة فضة',
  'asset.silver.empty': 'لا توجد ممتلكات فضة',
  'asset.cash.add': 'إضافة حساب',
  'asset.cash.empty': 'لا توجد حسابات نقدية',
  'asset.cash.total': 'إجمالي النقد',
  'asset.crypto.add': 'إضافة عملة رقمية',
  'asset.crypto.empty': 'لا توجد ممتلكات عملات رقمية',
  'asset.stocks.add': 'إضافة أسهم',
  'asset.stocks.empty': 'لا توجد ممتلكات أسهم',
  'asset.retirement.add': 'إضافة حساب',
  'asset.retirement.empty': 'لا توجد حسابات تقاعد',
  'asset.receivables.add': 'إضافة مستحق',
  'asset.receivables.empty': 'لا توجد مستحقات',
  'asset.liabilities.add': 'إضافة التزام',
  'asset.liabilities.empty': 'لا توجد التزامات',
  'results.title': 'حساب الزكاة الخاص بك',
  'results.copy': 'نسخ',
  'results.assetBreakdown': 'تفصيل الأصول',
};

const translations: Record<LanguageCode, TranslationTable> = {
  en,
  ta,
  ur,
  ar,
};

export function t(key: TranslationKey, language: LanguageCode): string {
  return translations[language]?.[key] ?? translations.en[key];
}
