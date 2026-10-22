// Single source of truth for every fact and number on webplace.co.il.
// Source: Amir-Cabili-CV-2026.pdf. Do not add facts that are not in the CV.
//
// Text fields are { en, he }. In Hebrew strings, wrap left-to-right runs that
// contain arrows or mixed symbols in [[...]] so they render in the right order.
// Numbers like "500+" and ranges like "8–12" are isolated automatically.

/** @typedef {{ en: string, he: string }} Text */
/** @typedef {{ value: number, display: string }} Point */
/**
 * @typedef {Object} ImpactRow
 * @property {Text} label
 * @property {Text} unit        axis/unit description for the row
 * @property {Text} where       company the result comes from
 * @property {Point} before
 * @property {Point} after
 * @property {number} max       scale maximum for this row
 * @property {"higher"|"lower"} better
 */
/**
 * @typedef {Object} Role
 * @property {string} id
 * @property {Text} company
 * @property {Text} title
 * @property {Text} context
 * @property {string} start     ISO month, e.g. "2024-04"
 * @property {string|null} end  ISO month, or null for present
 * @property {Text} dates
 * @property {string} [url]
 * @property {Text[]} bullets
 */

const t = (en, he) => ({ en, he });

export const profile = {
  identity: {
    name: t("Amir Cabili", "אמיר קבילי"),
    headline: t(
      "Front-End Tech Lead · Senior Angular Engineer · AI / LLM Integration",
      "מפתח פרונט-אנד בכיר (Tech Lead) · Angular · אינטגרציית AI / LLM"
    ),
    location: t("Tel Aviv, Israel", "תל אביב, ישראל"),
    phone: "+972-54-690-2616",
    phoneHref: "tel:+972546902616",
    email: "amircabili@gmail.com",
    links: {
      linkedin: { url: "https://www.linkedin.com/in/amir-cabili-9275291b/", label: "linkedin.com/in/amir-cabili-9275291b" },
      github: { url: "https://github.com/amircabili", label: "github.com/amircabili" },
      frontuna: { url: "https://frontuna.com/", label: "frontuna.com" },
    },
    languages: t("Hebrew (native), English (full professional)", "עברית (שפת אם), אנגלית (רמה מקצועית מלאה)"),
    cvFile: "Amir-Cabili-CV-2026.pdf",
    siteUrl: "https://www.webplace.co.il/",
  },

  summary: t(
    "Front-end tech lead with 9+ years of production Angular, from AngularJS to Angular 22, across cybersecurity, fintech and banking (HUB Security, eToro, Discount Bank). Lead a 4-engineer team and shipped LLM-powered workflows that cut new-screen delivery time by ~30%. Founder of Frontuna.com, a solo-built AI UI generator for 4 frameworks with 500+ users and 5,000+ generations.",
    "מפתח פרונט-אנד בכיר (Tech Lead) עם 9+ שנות Angular בייצור, מ-AngularJS ועד Angular 22, בתחומי סייבר, פינטק ובנקאות (HUB Security, eToro, בנק דיסקונט). מנחה צוות של 4 מהנדסים, ומסרתי תהליכי עבודה מבוססי LLM שקיצרו את זמן המסירה של מסך חדש בכ-30%. מייסד Frontuna.com, מחולל ממשקים מבוסס AI ל-4 פריימוורקים שבניתי לבד, עם 500+ משתמשים ו-5,000+ יצירות."
  ),

  /** Headline KPI cards */
  kpis: [
    { value: "9+", unit: t("yrs", "שנים"), label: t("Production Angular (AngularJS 1.5 → Angular 22)", "Angular בייצור ([[AngularJS 1.5 → Angular 22]])") },
    { value: "30M+", unit: t("", ""), label: t("Users on the eToro platform I built for", "משתמשים בפלטפורמת eToro שעבורה פיתחתי") },
    { value: "60+", unit: t("", ""), label: t("Landing pages shipped in 20+ languages", "דפי נחיתה שנמסרו ב-20+ שפות") },
    { value: "~30%", unit: t("", ""), label: t("Faster new-screen delivery with AI workflows", "מסירה מהירה יותר של מסך חדש עם תהליכי AI") },
    { value: "70%", unit: t("", ""), label: t("Front-end test coverage (from ~20%)", "כיסוי בדיקות פרונט-אנד (מכ-20%)") },
    { value: "500+", unit: t("", ""), label: t("Frontuna users · 5,000+ generations", "משתמשי Frontuna · 5,000+ יצירות") },
  ],

  /** Chart 1: before → after. Each row has its own scale. */
  impact: /** @type {ImpactRow[]} */ ([
    {
      label: t("Lighthouse performance", "ביצועי Lighthouse"),
      unit: t("score, 0–100", "ציון, 0–100"),
      where: t("eToro", "eToro"),
      before: { value: 60, display: "~60" },
      after: { value: 90, display: "90+" },
      max: 100,
      better: "higher",
    },
    {
      label: t("Front-end test coverage", "כיסוי בדיקות פרונט-אנד"),
      unit: t("% of code", "% מהקוד"),
      where: t("HUB Security", "HUB Security"),
      before: { value: 20, display: "~20%" },
      after: { value: 70, display: "70%" },
      max: 100,
      better: "higher",
    },
    {
      label: t("Campaign page turnaround", "זמן הקמת דף קמפיין"),
      unit: t("days", "ימים"),
      where: t("eToro", "eToro"),
      before: { value: 5, display: t("~5 days", "כ-5 ימים") },
      after: { value: 1, display: t("1 day", "יום אחד") },
      max: 5,
      better: "lower",
    },
    {
      label: t("New-screen delivery time", "זמן מסירה של מסך חדש"),
      unit: t("index, before = 100%", "מדד, לפני = 100%"),
      where: t("HUB Security", "HUB Security"),
      before: { value: 100, display: "100%" },
      after: { value: 70, display: t("~70% (−30%)", "כ-70% (‎−30%)") },
      max: 100,
      better: "lower",
    },
    {
      label: t("Initial bundle size", "גודל החבילה הראשונית"),
      unit: t("index, before = 100%", "מדד, לפני = 100%"),
      where: t("HUB Security", "HUB Security"),
      before: { value: 100, display: "100%" },
      after: { value: 75, display: t("~75% (−25%)", "כ-75% (‎−25%)") },
      max: 100,
      better: "lower",
    },
  ]),

  /** Chart 2: Angular versions shipped, oldest first */
  angularJourney: [
    { version: "AngularJS 1.5", company: t("Aman · Discount Bank", "Aman · בנק דיסקונט") },
    { version: "Angular 8", company: t("Aman · Discount Bank", "Aman · בנק דיסקונט") },
    { version: "Angular 12", company: t("Aman · Discount Bank", "Aman · בנק דיסקונט") },
    { version: "Angular 14", company: t("eToro", "eToro") },
    { version: "Angular 20", company: t("HUB Security", "HUB Security") },
    { version: "Angular 22", company: t("HUB Security", "HUB Security") },
  ],

  /** Chart 3: years per domain, computed from role dates at build time */
  domains: [
    { label: t("Banking", "בנקאות"), detail: t("Aman Group · Discount Bank", "Aman Group · בנק דיסקונט"), roleId: "aman" },
    { label: t("Fintech", "פינטק"), detail: t("eToro", "eToro"), roleId: "etoro" },
    { label: t("Cybersecurity", "סייבר"), detail: t("HUB Security", "HUB Security"), roleId: "hub" },
    { label: t("AI SaaS", "AI SaaS"), detail: t("Frontuna", "Frontuna"), since: t("since 2025, alongside HUB", "מאז 2025, במקביל ל-HUB"), roleId: "frontuna", sinceOnly: true },
  ],

  experience: /** @type {Role[]} */ ([
    {
      id: "hub",
      company: t("HUB Cyber Security (Hub Security)", "HUB Cyber Security ‏(Hub Security)"),
      title: t("Senior Front-End Developer (Tech Lead)", "מפתח פרונט-אנד בכיר (Tech Lead)"),
      context: t("Cybersecurity, B2B enterprise · Tel Aviv", "סייבר, B2B ארגוני · תל אביב"),
      start: "2024-04",
      end: null,
      dates: t("Apr 2024 – Present", "אפריל 2024 – היום"),
      url: "https://hubsecurity.com/",
      bullets: [
        t(
          "Lead front-end architecture for 3 B2B security web applications (Angular 20 → 22, TypeScript, Signals, standalone components), guiding a team of 4 engineers through bi-weekly releases.",
          "מוביל את ארכיטקטורת הפרונט-אנד של 3 יישומי ווב לאבטחת מידע ב-B2B ‏([[Angular 20 → 22, TypeScript, Signals, standalone components]]), ומנחה צוות של 4 מהנדסים בשחרורים דו-שבועיים."
        ),
        t(
          "Designed and shipped a reusable AI-integration layer on the OpenAI API — streaming, prompt versioning, fallbacks and output validation — embedded in all 3 applications, automating analyst workflows and cutting manual review time by ~40%.",
          "תכננתי ומסרתי שכבת אינטגרציית AI לשימוש חוזר מעל OpenAI API — סטרימינג, ניהול גרסאות פרומפטים, נתיבי גיבוי ובדיקת פלט — המשולבת בכל 3 היישומים, מבצעת אוטומציה לתהליכי עבודה של אנליסטים וקיצרה את זמן הבדיקה הידנית בכ-40%."
        ),
        t(
          "Rolled out AI-assisted development (Cursor, Claude Code, shared prompt systems) across the team, reducing average delivery of a new screen by ~30% across 20+ features.",
          "הטמעתי פיתוח בסיוע AI ‏(Cursor, Claude Code, מערכות פרומפטים משותפות) בכל הצוות, וקיצרתי את זמן המסירה הממוצע של מסך חדש בכ-30% על פני 20+ פיצ׳רים."
        ),
        t(
          "Migrated 15+ modules to standalone components and Signals with OnPush change detection, shrinking the initial bundle by ~25% and improving page load by ~35%.",
          "העברתי 15+ מודולים לקומפוננטות standalone ול-Signals עם OnPush, הקטנתי את החבילה הראשונית בכ-25% ושיפרתי את זמן טעינת העמוד בכ-35%."
        ),
        t(
          "Introduced unit and E2E quality gates in CI, raising front-end test coverage from ~20% to 70% and reducing production UI defects by ~30%.",
          "הכנסתי שערי איכות של בדיקות יחידה ו-E2E ל-CI, העליתי את כיסוי הבדיקות בפרונט-אנד מכ-20% ל-70% והפחתתי תקלות ממשק בייצור בכ-30%."
        ),
        t(
          "Mentor 3 developers through 30+ code reviews a month and own front-end architecture decisions (state management, shared component library, LLM integration pattern), partnering with product, design, back-end and security teams on every release.",
          "מנטור ל-3 מפתחים דרך 30+ סקירות קוד בחודש, ואחראי על החלטות ארכיטקטורת הפרונט-אנד (ניהול מצב, ספריית קומפוננטות משותפת, תבנית אינטגרציית LLM), בשיתוף צוותי מוצר, עיצוב, בק-אנד ואבטחה בכל שחרור."
        ),
      ],
    },
    {
      id: "frontuna",
      company: t("Frontuna.com", "Frontuna.com"),
      title: t("Founder & Sole Engineer", "מייסד ומהנדס יחיד"),
      context: t("AI UI-component & landing-page generator · side venture, freemium SaaS", "מחולל קומפוננטות ודפי נחיתה מבוסס AI · מיזם צד, SaaS בשיטת freemium"),
      start: "2025-01",
      end: null,
      dates: t("2025 – Present", "2025 – היום"),
      url: "https://frontuna.com/",
      bullets: [
        t(
          "Built and run a SaaS that turns plain-English prompts into production components for 4 frameworks (React, Angular, Vue, Svelte) — 500+ registered users and 5,000+ generated components.",
          "בניתי ומפעיל SaaS שהופך הנחיות בשפה פשוטה לקומפוננטות מוכנות לייצור ב-4 פריימוורקים ‏(React, Angular, Vue, Svelte) — 500+ משתמשים רשומים ו-5,000+ קומפוננטות שנוצרו."
        ),
        t(
          "Architected the full stack solo across 6 managed services — Angular on Vercel, Node/Express/TypeScript on Google Cloud Run, Prisma + Neon PostgreSQL, Paddle billing, Resend, Vercel Blob — at 99.5%+ uptime.",
          "תכננתי לבד את כל הסטאק על פני 6 שירותים מנוהלים — [[Angular on Vercel, Node/Express/TypeScript on Google Cloud Run, Prisma + Neon PostgreSQL]], חיוב ב-Paddle, ‏Resend, ‏Vercel Blob — בזמינות של 99.5%+."
        ),
        t(
          "Designed a multi-step prompt pipeline with validation and framework-specific post-processing, plus live sandboxed preview and per-user design memory, raising compile-ready first output to ~90%.",
          "תכננתי צינור פרומפטים רב-שלבי עם ולידציה ועיבוד-המשך ייעודי לכל פריימוורק, לצד תצוגה מקדימה חיה בסביבה מבודדת וזיכרון עיצוב לכל משתמש, והעליתי את שיעור הפלט הראשון שמתקמפל לכ-90%."
        ),
        t(
          "Shipped an automated onboarding email sequence; repriced plans (10-generation free tier, annual billing by default) to lift free-to-paid conversion.",
          "השקתי רצף מיילי קליטה אוטומטי, ותמחרתי מחדש את התוכניות (שכבה חינמית של 10 יצירות, חיוב שנתי כברירת מחדל) כדי להעלות את ההמרה ממשתמש חינמי למשלם."
        ),
        t(
          "Ran go-to-market across 4 channels (Product Hunt, Reddit, Reddit Ads, X) with end-to-end affiliate tracking, using an agentic workflow (Claude Code subagents, hooks, MCP) to ship 100+ releases as a single engineer.",
          "הובלתי יציאה לשוק ב-4 ערוצים ‏(Product Hunt, Reddit, Reddit Ads, X) עם מעקב שותפים מקצה לקצה, ובעזרת תהליך עבודה אייג׳נטי ‏([[Claude Code subagents, hooks, MCP]]) מסרתי 100+ גרסאות כמהנדס יחיד."
        ),
      ],
    },
    {
      id: "etoro",
      company: t("eToro", "eToro"),
      title: t("Senior Front-End Developer — Marketing Technology", "מפתח פרונט-אנד בכיר — Marketing Technology"),
      context: t("Global multi-asset trading platform, 30M+ registered users · Tel Aviv", "פלטפורמת מסחר גלובלית במגוון נכסים, 30M+ משתמשים רשומים · תל אביב"),
      start: "2022-03",
      end: "2024-03",
      dates: t("Mar 2022 – Mar 2024", "מרץ 2022 – מרץ 2024"),
      url: "https://www.etoro.com/",
      bullets: [
        t(
          "Built and optimized 60+ high-traffic landing pages (Angular 14, TypeScript, SCSS) in 20+ languages, raising Lighthouse performance scores from ~60 to 90+ and lifting sign-up conversion by ~15%.",
          "בניתי ושיפרתי 60+ דפי נחיתה עתירי תנועה ‏(Angular 14, TypeScript, SCSS) ב-20+ שפות, העליתי את ציוני הביצועים ב-Lighthouse מכ-60 ל-90+ והגדלתי את ההמרה להרשמה בכ-15%."
        ),
        t(
          "Created a reusable landing-page and email-template component kit adopted by 10+ regional marketing teams, cutting campaign page turnaround from ~5 days to 1 day.",
          "יצרתי ערכת קומפוננטות לשימוש חוזר לדפי נחיתה ולתבניות מייל, שאומצה על ידי 10+ צוותי שיווק אזוריים וקיצרה את זמן הקמת דף קמפיין מכ-5 ימים ליום אחד."
        ),
        t(
          "Improved responsiveness and cross-browser support across the company's mobile web platforms, reducing browser-specific bugs by ~40%.",
          "שיפרתי את הרספונסיביות והתמיכה בדפדפנים שונים בפלטפורמות הווב לנייד של החברה, והפחתתי באגים ספציפיים לדפדפן בכ-40%."
        ),
      ],
    },
    {
      id: "aman",
      company: t("Aman Group", "Aman Group"),
      title: t("Senior Web Client Developer", "מפתח צד-לקוח בכיר"),
      context: t("IT services for Israeli banks, incl. Discount Bank · Tel Aviv", "שירותי IT לבנקים בישראל, כולל בנק דיסקונט · תל אביב"),
      start: "2017-07",
      end: "2022-03",
      dates: t("Jul 2017 – Mar 2022", "יולי 2017 – מרץ 2022"),
      url: "https://www.aman.co.il/",
      bullets: [
        t(
          "Developed Discount Bank's customer-facing web application, used by hundreds of thousands of customers, across 10+ major releases on AngularJS 1.5 → Angular 8 → Angular 12 and TypeScript.",
          "פיתחתי את יישום הווב של בנק דיסקונט ללקוחות, המשמש מאות אלפי לקוחות, לאורך 10+ שחרורים מרכזיים על [[AngularJS 1.5 → Angular 8 → Angular 12]] ו-TypeScript."
        ),
        t(
          "Led the AngularJS → Angular migration of 40+ screens with zero critical production incidents, reducing load time by ~30%.",
          "הובלתי את ההגירה [[AngularJS → Angular]] של 40+ מסכים ללא אף תקלה קריטית בייצור, וקיצרתי את זמן הטעינה בכ-30%."
        ),
        t(
          "Led front-end design and pre-planning of 5 greenfield enterprise web apps, delivering MVPs in 8–12 weeks.",
          "הובלתי את תכנון הפרונט-אנד והתכנון המקדים של 5 יישומי ווב ארגוניים חדשים, ומסרתי גרסאות MVP תוך 8–12 שבועות."
        ),
      ],
    },
    {
      id: "matrix",
      company: t("Matrix Digital (Matrix Israel)", "Matrix Digital ‏(Matrix Israel)"),
      title: t("Senior Web Client Developer", "מפתח צד-לקוח בכיר"),
      context: t("IT services · Tel Aviv", "שירותי IT · תל אביב"),
      start: "2016-08",
      end: "2017-07",
      dates: t("Aug 2016 – Jul 2017", "אוגוסט 2016 – יולי 2017"),
      url: "https://www.matrix.co.il/",
      bullets: [
        t(
          "Delivered 10+ client web projects (HTML/SCSS, JavaScript, Bootstrap, .NET/C# back ends) for enterprise clients.",
          "מסרתי 10+ פרויקטי ווב ללקוחות ארגוניים ‏([[HTML/SCSS, JavaScript, Bootstrap, .NET/C#]] בצד השרת)."
        ),
      ],
    },
  ]),

  earlierRoles: t(
    "Front-End Developer, Ness SES · Web Client Designer/Programmer, Kenes International · Web Developer, Zarmon Goldman DDB",
    "מפתח פרונט-אנד, Ness SES · מעצב ומתכנת צד-לקוח, Kenes International · מפתח ווב, Zarmon Goldman DDB"
  ),

  /** The one AI section: user-approved copy (Sep 25), aligned with the CV title. */
  ai: {
    paragraphs: [
      t(
        "At HUB Security I design AI capabilities as part of the product architecture rather than treating the model as a standalone feature. I integrate OpenAI APIs through secure backend services and design the surrounding system — prompt workflows, structured model interactions, copilots, AI-assisted UI generation, automation, validation, observability, and resilient user experiences.",
        "ב-HUB Security אני מעצב יכולות AI כחלק מארכיטקטורת המוצר ולא כמודל שעומד בפני עצמו. אני משלב ממשקי OpenAI דרך שירותי בק-אנד מאובטחים, ומעצב את המערכת סביבם — תהליכי פרומפטים, אינטראקציות מובנות עם המודל, קופיילוטים, יצירת ממשק בסיוע AI, אוטומציה, ולידציה, נצפות, וחוויות משתמש עמידות."
      ),
      t(
        "The architecture assumes that AI is non-deterministic and can be slow, unavailable, or return an unusable result. Model calls therefore sit behind controlled service boundaries with authentication, rate limits, validation, error handling, and explicit response contracts. The UI is designed around those realities, with loading, timeout, retry, review, fallback, and non-AI paths where the product requires them.",
        "הארכיטקטורה מניחה ש-AI אינו דטרמיניסטי, ושהוא יכול להיות איטי, לא זמין, או להחזיר תוצאה שאי אפשר להשתמש בה. לכן קריאות למודל יושבות מאחורי גבולות שירות מבוקרים, עם אימות, מגבלות קצב, ולידציה, טיפול בשגיאות, וחוזי תגובה מפורשים. הממשק מתוכנן סביב המציאות הזו: טעינה, פסק זמן, ניסיון חוזר, ביקורת, נתיב גיבוי, ונתיבים בלי AI כשהמוצר דורש זאת."
      ),
      t(
        "My focus is not simply connecting an LLM to an interface. It is designing AI-enabled systems that remain secure, maintainable, observable, and usable in production.",
        "המיקוד שלי אינו רק חיבור LLM לממשק. זה עיצוב מערכות מונעות AI שנשארות מאובטחות, ניתנות לתחזוקה, נצפות, ושמישות בייצור."
      ),
    ],
    points: [
      { title: t("Secure AI service architecture", "ארכיטקטורת שירות AI מאובטחת"), text: t("OpenAI APIs behind authenticated server-side boundaries; credentials and privileged operations never exposed to the browser.", "ממשקי OpenAI מאחורי גבולות שרת מאומתים; אישורים ופעולות מועדפות לעולם לא חשופים בדפדפן.") },
      { title: t("Prompt systems & orchestration", "מערכות פרומפטים ותזמור"), text: t("Structured prompts, reusable workflows, response contracts, validation, and application logic around model interactions.", "פרומפטים מובנים, תהליכים לשימוש חוזר, חוזי תגובה, ולידציה, ולוגיקת יישום סביב אינטראקציות עם המודל.") },
      { title: t("AI product & UI architecture", "ארכיטקטורת מוצר וממשק AI"), text: t("Copilots, AI-assisted UI generation, automation, human review, and clear interaction patterns for probabilistic output.", "קופיילוטים, יצירת ממשק בסיוע AI, אוטומציה, ביקורת אנושית, ודפוסי אינטראקציה ברורים לפלט הסתברותי.") },
      { title: t("Resilience & graceful degradation", "עמידות והתדרדרות מבוקרת"), text: t("Loading, streaming/waiting states, retries, timeouts, invalid or empty responses, service failures, and usable paths when the model is unavailable.", "טעינה, מצבי המתנה/סטרימינג, ניסיונות חוזרים, פסקי זמן, תגובות ריקות או לא תקפות, כשלי שירות, ונתיבים שמישים כשהמודל אינו זמין.") },
      { title: t("Security & trust boundaries", "גבולות אבטחה ואמון"), text: t("Model output treated as untrusted input, with controlled data flow, output handling, tenant-data protection, and prompt-injection awareness.", "פלט המודל מטופל כקלט לא מהימן, עם זרימת נתונים מבוקרת, טיפול בפלט, הגנה על נתוני דייר, ומודעות להזרקת פרומפטים.") },
      { title: t("Observability & operational control", "נצפות ובקרה תפעולית"), text: t("Model interactions designed so failures, latency, and unexpected responses can be understood and improved rather than becoming opaque production behavior.", "אינטראקציות עם המודל מתוכננות כך שכשלים, השהיה ותגובות לא צפויות אפשר להבין ולשפר, במקום שיהפכו להתנהגות ייצור אטומה.") },
      { title: t("AI-assisted engineering", "הנדסה בסיוע AI"), text: t("AI-supported development and UI generation integrated into the engineering workflow, with generated output reviewed, tested, and held to the same quality standards as manually written code.", "פיתוח ויצירת ממשק בסיוע AI משולבים בתהליך ההנדסי, והפלט שנוצר נבדק, נבחן, ועומד באותם תקני איכות כמו קוד שנכתב ידנית.") },
    ],
  },

  /** "By the numbers" panels per employer. Every value is from the CV bullets. */
  companyNumbers: [
    {
      id: "hub",
      h: t("HUB Cyber Security by the numbers", "HUB Cyber Security במספרים"),
      lede: t("Senior Front-End Developer (Tech Lead) · Apr 2024 – Present", "מפתח פרונט-אנד בכיר (Tech Lead) · אפריל 2024 – היום"),
      tiles: [
        { value: "3", label: t("B2B security web applications I lead front-end architecture for", "יישומי ווב לאבטחת מידע ב-B2B שאני מוביל בהם את ארכיטקטורת הפרונט-אנד") },
        { value: "~40%", label: t("less manual review time with the AI-integration layer", "פחות זמן בדיקה ידנית בזכות שכבת אינטגרציית ה-AI") },
        { value: "~35%", label: t("faster page load after migrating 15+ modules to Signals", "טעינת עמוד מהירה יותר אחרי העברת 15+ מודולים ל-Signals") },
        { value: "~30%", label: t("fewer production UI defects with CI quality gates", "פחות תקלות ממשק בייצור בזכות שערי איכות ב-CI") },
      ],
    },
    {
      id: "bank",
      h: t("Discount Bank by the numbers", "בנק דיסקונט במספרים"),
      lede: t("Senior Web Client Developer at Aman Group · Jul 2017 – Mar 2022 · customer-facing web app used by hundreds of thousands of customers", "מפתח צד-לקוח בכיר ב-Aman Group · יולי 2017 – מרץ 2022 · יישום ווב ללקוחות המשמש מאות אלפי לקוחות"),
      tiles: [
        { value: "10+", label: t("major releases, AngularJS 1.5 → Angular 12", "שחרורים מרכזיים, [[AngularJS 1.5 → Angular 12]]") },
        { value: "40+", label: t("screens migrated from AngularJS to Angular", "מסכים שהועברו מ-AngularJS ל-Angular") },
        { value: "0", label: t("critical production incidents during the migration", "תקלות קריטיות בייצור במהלך ההגירה") },
        { value: "~30%", label: t("faster load time after the migration", "זמן טעינה מהיר יותר אחרי ההגירה") },
      ],
    },
  ],

  frontuna: {
    tiles: [
      { value: "500+", label: t("registered users", "משתמשים רשומים") },
      { value: "5,000+", label: t("generated components", "קומפוננטות שנוצרו") },
      { value: "4", label: t("frameworks: React, Angular, Vue, Svelte", "פריימוורקים: React, Angular, Vue, Svelte") },
      { value: "99.5%+", label: t("uptime", "זמינות") },
    ],
    /** 6 managed services */
    architecture: {
      flow: [
        { name: "Vercel", role: t("Angular front end", "פרונט-אנד ב-Angular") },
        { name: "Google Cloud Run", role: t("Node / Express / TypeScript API", "API ב-Node / Express / TypeScript") },
        { name: "Neon PostgreSQL", role: t("data via Prisma", "נתונים דרך Prisma") },
      ],
      side: [
        { name: "Paddle", role: t("billing", "חיוב") },
        { name: "Resend", role: t("email", "מייל") },
        { name: "Vercel Blob", role: t("file storage", "אחסון קבצים") },
      ],
    },
  },

  projects: [
    {
      name: t("MammyZone", "MammyZone"),
      meta: t("mammyzone.co.il · 2026", "mammyzone.co.il · 2026"),
      url: "https://mammyzone.co.il/",
      text: t(
        "Built the full homepage and a Next.js 14 App Router scaffold with TypeScript, Tailwind and i18n for a consumer startup, using structured AI-assisted (Cursor) delivery.",
        "בניתי את דף הבית המלא ושלד Next.js 14 App Router עם TypeScript, ‏Tailwind ו-i18n עבור סטארטאפ צרכני, במסירה מובנית בסיוע AI ‏(Cursor)."
      ),
    },
    {
      name: t("Frontuna Developer Toolkit", "Frontuna Developer Toolkit"),
      meta: t("frontuna.com", "frontuna.com"),
      url: "https://frontuna.com/",
      text: t(
        "8 free developer tools (launch blueprint, competitor-gap and market-gap scanners, idea validator) built on the same LLM pipeline to drive product-led acquisition.",
        "8 כלים חינמיים למפתחים (תוכנית השקה, סורקי פערים מול מתחרים ופערי שוק, בודק רעיונות) שנבנו על אותו צינור LLM כדי להניע צמיחה מבוססת מוצר."
      ),
    },
  ],

  skills: [
    {
      group: t("Front-End", "פרונט-אנד"),
      items: ["Angular 8 → 22", "Signals", "Standalone components", "Control flow", "@defer", "OnPush", "TypeScript", "RxJS", "NgRx", "Angular Material", "React", "Next.js", "SCSS", "Tailwind", "Design systems", "WCAG 2.1", "Core Web Vitals"],
    },
    {
      group: t("AI / LLM", "AI / LLM"),
      items: ["OpenAI API", "Prompt engineering & prompt pipelines", "Streaming responses", "LLM-powered UI and code generation", "Agentic workflows", "Cursor", "Claude Code (subagents, hooks, MCP)"],
    },
    {
      group: t("Testing & Quality", "בדיקות ואיכות"),
      items: ["Jasmine/Karma", "Jest", "Cypress", "Playwright", "Code review", "CI quality gates"],
    },
    {
      group: t("Back-End & Cloud", "בק-אנד וענן"),
      items: ["Node.js", "Express", "REST APIs", "PostgreSQL (Prisma, Neon)", "MongoDB", "Google Cloud Run", "Vercel", "AWS", "Kubernetes", "CI/CD (GitHub Actions, Jenkins)"],
    },
    {
      group: t("Ways of Working", "דרכי עבודה"),
      items: ["Technical leadership", "Mentoring", "Architecture decisions", "Cross-functional delivery with product, design and security", "Agile/Scrum"],
    },
  ],

  certifications: [
    { title: t("Certified Software Architecture", "הסמכה בארכיטקטורת תוכנה"), school: t("DevOps Experts College", "מכללת DevOps Experts"), year: "2024" },
    { title: t("Certified Full-Stack Developer, MERN (React & Node.js)", "מפתח Full-Stack מוסמך, MERN ‏(React & Node.js)"), school: t("Yaniv Arad College", "מכללת יניב ארד"), year: "2023" },
    { title: t("Diploma in Software Development, C# & .NET", "דיפלומה בפיתוח תוכנה, [[C# & .NET]]"), school: t("John Bryce College", "מכללת ג׳ון ברייס"), year: null },
    { title: t("Management & Computer Science studies", "לימודי ניהול ומדעי המחשב"), school: t("Open University of Israel", "האוניברסיטה הפתוחה"), year: null },
  ],

  faq: [
    {
      q: t("Do you work in Angular, React, or both?", "אתה עובד ב-Angular, ב-React או בשניהם?"),
      a: t(
        "Angular is my core: 9+ years in production, from AngularJS 1.5 to Angular 22, at Aman Group (Discount Bank), eToro and HUB Security. React and Next.js are my second stack: I am a certified MERN full-stack developer (Yaniv Arad College, 2023), I built the MammyZone homepage on a Next.js 14 App Router scaffold, and Frontuna generates production React components alongside Angular, Vue and Svelte.",
        "Angular הוא הליבה שלי: 9+ שנים בייצור, מ-AngularJS 1.5 ועד Angular 22, ב-Aman Group ‏(בנק דיסקונט), ב-eToro וב-HUB Security. ‏React ו-Next.js הם הסטאק השני שלי: אני מפתח Full-Stack מוסמך ב-MERN ‏(מכללת יניב ארד, 2023), בניתי את דף הבית של MammyZone על שלד Next.js 14 App Router, ו-Frontuna מייצר קומפוננטות React לייצור לצד Angular, ‏Vue ו-Svelte."
      ),
    },
    {
      q: t("What does your modern Angular work include?", "מה כוללת עבודת ה-Angular המודרנית שלך?"),
      a: t(
        "Signals, standalone components, the new control flow, @defer and OnPush change detection. At HUB I migrated 15+ modules to standalone components and Signals, shrinking the initial bundle by ~25% and improving page load by ~35%. Migrations are incremental, not rewrites: at Aman Group I led the AngularJS → Angular migration of 40+ screens with zero critical production incidents.",
        "Signals, קומפוננטות standalone, ה-control flow החדש, ‏@defer ו-OnPush. ב-HUB העברתי 15+ מודולים לקומפוננטות standalone ול-Signals, הקטנתי את החבילה הראשונית בכ-25% ושיפרתי את זמן הטעינה בכ-35%. הגירות נעשות בהדרגה ולא בשכתוב: ב-Aman Group הובלתי את ההגירה [[AngularJS → Angular]] של 40+ מסכים ללא אף תקלה קריטית בייצור."
      ),
    },
    {
      q: t("What does AI integration mean in your work?", "מה המשמעות של אינטגרציית AI בעבודה שלך?"),
      a: t(
        "At HUB Security I designed and shipped a reusable AI-integration layer on the OpenAI API — streaming, prompt versioning, fallbacks and output validation — embedded in all 3 applications. It automates analyst workflows and cut manual review time by ~40%. I also rolled out AI-assisted development (Cursor, Claude Code, shared prompt systems) across the team, reducing new-screen delivery time by ~30%.",
        "ב-HUB Security תכננתי ומסרתי שכבת אינטגרציית AI לשימוש חוזר מעל OpenAI API — סטרימינג, ניהול גרסאות פרומפטים, נתיבי גיבוי ובדיקת פלט — המשולבת בכל 3 היישומים. היא מבצעת אוטומציה לתהליכי עבודה של אנליסטים וקיצרה את זמן הבדיקה הידנית בכ-40%. בנוסף הטמעתי פיתוח בסיוע AI ‏(Cursor, Claude Code, מערכות פרומפטים משותפות) בכל הצוות, וקיצרתי את זמן המסירה של מסך חדש בכ-30%."
      ),
    },
    {
      q: t("How do you keep LLM features secure?", "איך שומרים על יכולות LLM מאובטחות?"),
      a: t(
        "The browser never holds the API key. Model calls go through an authenticated server-side service with rate limits and an explicit response contract. Model output is treated as untrusted input: validated, encoded, never executed as code. Prompt injection is a known abuse case, and the interface has timeouts and a non-AI path for when the model fails.",
        "הדפדפן לעולם לא מחזיק את מפתח ה-API. הקריאות למודל עוברות דרך שירות שרת מאומת, עם מגבלות קצב וחוזה תגובה מפורש. פלט המודל מטופל כקלט לא מהימן: עובר ולידציה וקידוד, ולעולם לא מורץ כקוד. הזרקת פרומפטים היא תרחיש שימוש לרעה מוכר, ולממשק יש פסקי זמן ונתיב בלי AI למקרה שהמודל נכשל."
      ),
    },
    {
      q: t("What does tech-lead work include for you?", "מה כוללת עבודת ה-Tech Lead שלך?"),
      a: t(
        "I lead front-end architecture for 3 B2B applications and a team of 4 engineers on bi-weekly releases. I mentor 3 developers through 30+ code reviews a month and own the front-end decisions — state management, the shared component library and the LLM integration pattern — working with product, design, back-end and security on every release.",
        "אני מוביל את ארכיטקטורת הפרונט-אנד של 3 יישומי B2B ומנחה צוות של 4 מהנדסים בשחרורים דו-שבועיים. אני מנטור ל-3 מפתחים דרך 30+ סקירות קוד בחודש, ואחראי על החלטות הפרונט-אנד — ניהול מצב, ספריית הקומפוננטות המשותפת ותבנית אינטגרציית ה-LLM — בשיתוף מוצר, עיצוב, בק-אנד ואבטחה בכל שחרור."
      ),
    },
    {
      q: t("What testing and CI do you put in place?", "אילו בדיקות ו-CI אתה מטמיע?"),
      a: t(
        "Unit and E2E quality gates in CI. At HUB that raised front-end test coverage from ~20% to 70% and reduced production UI defects by ~30%. Tools: Jasmine/Karma, Jest, Cypress and Playwright, plus code review on every change.",
        "שערי איכות של בדיקות יחידה ו-E2E ב-CI. ב-HUB זה העלה את כיסוי הבדיקות בפרונט-אנד מכ-20% ל-70% והפחית תקלות ממשק בייצור בכ-30%. כלים: Jasmine/Karma, ‏Jest, ‏Cypress ו-Playwright, וסקירת קוד לכל שינוי."
      ),
    },
    {
      q: t("How do you approach front-end performance?", "איך אתה ניגש לביצועי פרונט-אנד?"),
      a: t(
        "Measure first, then fix what the metrics show. At eToro I raised Lighthouse performance on 60+ landing pages from ~60 to 90+, lifting sign-up conversion by ~15%. At HUB, standalone components, Signals and OnPush cut the initial bundle by ~25% and improved page load by ~35%. I track Core Web Vitals throughout.",
        "קודם מודדים, ואז מתקנים את מה שהמדדים מראים. ב-eToro העליתי את ביצועי Lighthouse ב-60+ דפי נחיתה מכ-60 ל-90+, והגדלתי את ההמרה להרשמה בכ-15%. ב-HUB, קומפוננטות standalone, ‏Signals ו-OnPush הקטינו את החבילה הראשונית בכ-25% ושיפרו את זמן הטעינה בכ-35%. אני עוקב אחרי Core Web Vitals לאורך כל הדרך."
      ),
    },
    {
      q: t("Do you work in Hebrew and English, including right-to-left layouts?", "אתה עובד בעברית ובאנגלית, כולל פריסה מימין לשמאל?"),
      a: t(
        "Yes. Hebrew is my native language and my English is full professional. At eToro I shipped landing pages in 20+ languages, so multilingual and right-to-left layouts are part of how I build, not an afterthought.",
        "כן. עברית היא שפת האם שלי והאנגלית שלי ברמה מקצועית מלאה. ב-eToro מסרתי דפי נחיתה ב-20+ שפות, כך שפריסות רב-לשוניות ומימין לשמאל הן חלק מהאופן שבו אני בונה, ולא תוספת מאוחרת."
      ),
    },
  ],
};

/** Interface labels (not facts). */
export const ui = {
  skip: t("Skip to content", "דלג לתוכן"),
  langSwitch: t("עברית", "English"),
  langAria: t("Read this page in Hebrew", "Read this page in English"),
  navAria: t("Page sections", "חלקי העמוד"),
  topAria: t("Back to top", "חזרה למעלה"),
  cvButton: t("Download CV (PDF)", "הורדת קורות חיים (PDF)"),
  cvShort: t("CV (PDF)", "קו״ח (PDF)"),
  emailButton: t("Email me", "שליחת מייל"),
  mailSubject: t("Hello from webplace.co.il", "פנייה מ-webplace.co.il"),
  present: t("Present", "היום"),
  nav: {
    cover: t("Introduction", "מבוא"),
    impact: t("Impact", "השפעה"),
    story: t("Experience", "ניסיון"),
    journey: t("Career data", "נתוני קריירה"),
    numbers: t("Results", "תוצאות"),
    ai: t("AI integration", "אינטגרציית AI"),
    frontuna: t("Frontuna", "Frontuna"),
    skills: t("Skills", "מיומנויות"),
    qa: t("Questions", "שאלות"),
    call: t("Contact", "יצירת קשר"),
  },
  kpiAria: t("Headline numbers", "מספרים מרכזיים"),
  impact: {
    h: t("Measured impact across roles", "השפעה מדודה לאורך התפקידים"),
    lede: t("Before and after, from my CV. Each row has its own scale.", "לפני ואחרי, מתוך קורות החיים. לכל שורה סקאלה משלה."),
    before: t("Before", "לפני"),
    after: t("After", "אחרי"),
    higher: t("higher is better", "גבוה יותר עדיף"),
    lower: t("lower is better", "נמוך יותר עדיף"),
    tableCaption: t("Measured impact, before and after", "השפעה מדודה, לפני ואחרי"),
    colMetric: t("Metric", "מדד"),
    colWhere: t("Where", "היכן"),
  },
  story: {
    h: t("Experience", "ניסיון מקצועי"),
    earlier: t("Earlier roles", "תפקידים קודמים"),
  },
  journey: {
    h: t("From AngularJS to Angular 22", "מ-AngularJS ועד Angular 22"),
    lede: t("Angular versions I shipped to production, and where.", "גרסאות Angular שמסרתי לייצור, והיכן."),
    domainH: t("9+ years across regulated industries", "9+ שנים בתעשיות מפוקחות"),
    domainLede: t("Years per domain, from role dates.", "שנים לפי תחום, לפי תאריכי התפקידים."),
    years: t("years", "שנים"),
    axis: t("Years", "שנים"),
    tableCaption: t("Years of experience by domain", "שנות ניסיון לפי תחום"),
    colDomain: t("Domain", "תחום"),
    colYears: t("Years", "שנים"),
  },
  ai: { h: t("AI integrated into product architecture", "AI משולב בארכיטקטורת המוצר") },
  frontuna: {
    h: t("Frontuna by the numbers", "Frontuna במספרים"),
    lede: t("An AI UI-component and landing-page generator I built and run on my own.", "מחולל קומפוננטות ודפי נחיתה מבוסס AI שבניתי ואני מפעיל לבד."),
    archH: t("Architecture: 6 managed services", "ארכיטקטורה: 6 שירותים מנוהלים"),
    archAria: t(
      "Architecture diagram: the Angular front end on Vercel calls a Node, Express and TypeScript API on Google Cloud Run, which stores data in Neon PostgreSQL through Prisma and uses Paddle for billing, Resend for email and Vercel Blob for file storage.",
      "תרשים ארכיטקטורה: פרונט-אנד ב-Angular על Vercel קורא ל-API ב-Node, ‏Express ו-TypeScript על Google Cloud Run, ששומר נתונים ב-Neon PostgreSQL דרך Prisma ומשתמש ב-Paddle לחיוב, ב-Resend למייל וב-Vercel Blob לאחסון קבצים."
    ),
    visit: t("Visit frontuna.com", "לאתר frontuna.com"),
  },
  projects: { h: t("Selected projects", "פרויקטים נבחרים") },
  skills: { h: t("Skills", "מיומנויות") },
  certs: { h: t("Certifications & education", "הסמכות והשכלה") },
  qa: { h: t("Frequently asked questions", "שאלות נפוצות") },
  call: {
    h: t("Get in touch", "יצירת קשר"),
    lede: t("Open to senior front-end, tech-lead and AI-integration roles. Tel Aviv, remote-friendly.", "פתוח לתפקידי פרונט-אנד בכיר, Tech Lead ואינטגרציית AI. תל אביב, גם מרחוק."),
    email: t("Email", "מייל"),
    phone: t("Phone", "טלפון"),
    location: t("Location", "מיקום"),
    languages: t("Languages", "שפות"),
  },
  meta: {
    title: t("Amir Cabili — Front-End Tech Lead · Angular 22 · AI Integration", "אמיר קבילי — מפתח פרונט-אנד בכיר (Tech Lead) · Angular 22 · אינטגרציית AI"),
    description: t(
      "Front-end tech lead, 9+ years of production Angular (AngularJS to Angular 22) for cybersecurity, fintech and banking. AI/LLM integration. Tel Aviv.",
      "מפתח פרונט-אנד בכיר (Tech Lead), 9+ שנות Angular בייצור (מ-AngularJS ועד Angular 22) בסייבר, פינטק ובנקאות. אינטגרציית AI/LLM. תל אביב."
    ),
    ogImageAlt: t("Amir Cabili — Front-End Tech Lead, Angular 22, AI integration", "אמיר קבילי — מפתח פרונט-אנד בכיר (Tech Lead), Angular 22, אינטגרציית AI"),
  },
};
