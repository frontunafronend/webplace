// Builds the static site from data/profile.mjs.
// Usage (from the app folder):  node build/build.mjs
// Output: index.html (English), he/index.html (Hebrew, RTL), sitemap.xml, build/og.html (source for the share image).

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { profile as P, ui as U } from "../data/profile.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = P.identity.siteUrl.replace(/\/$/, "");
const BUILD_DATE = new Date();
const ASSET_V = "1"; // bump to bust caches for css/js

// ---------- text helpers ----------

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const NUM = /~?\d[\d,.]*(?:M|%)?(?:\+|[–-]\d[\d,.]*%?)/g;

/** Rich text for the page body. Hebrew gets LTR isolation for numbers and [[...]] runs. */
function html(text, lang) {
  const s = typeof text === "string" ? text : text[lang];
  if (lang !== "he") return esc(s.replace(/\[\[|\]\]/g, ""));
  return s
    .split(/(\[\[.*?\]\])/g)
    .map((part) =>
      part.startsWith("[[")
        ? `<bdi dir="ltr">${esc(part.slice(2, -2))}</bdi>`
        : esc(part).replace(NUM, (m) => `<bdi dir="ltr">${m}</bdi>`)
    )
    .join("");
}

/** Plain text for attributes and meta tags. Hebrew uses Unicode isolates instead of tags. */
function plain(text, lang) {
  const s = typeof text === "string" ? text : text[lang];
  if (lang !== "he") return s.replace(/\[\[|\]\]/g, "");
  return s
    .replace(/\[\[(.*?)\]\]/g, "⁦$1⁩")
    .replace(NUM, (m) => `⁦${m}⁩`);
}

const attr = (text, lang) => esc(plain(text, lang));

// ---------- data helpers ----------

function monthsBetween(start, end) {
  const [sy, sm] = start.split("-").map(Number);
  const e = end ? end.split("-").map(Number) : [BUILD_DATE.getFullYear(), BUILD_DATE.getMonth() + 1];
  return (e[0] - sy) * 12 + (e[1] - sm);
}
const roleYears = (id) => {
  const r = P.experience.find((x) => x.id === id);
  return Math.round((monthsBetween(r.start, r.end) / 12) * 10) / 10;
};
const fmtYears = (n, lang) => n.toLocaleString(lang === "he" ? "he-IL" : "en-US", { maximumFractionDigits: 1 });
const pct = (v, max) => `${Math.max(2, Math.round((v / max) * 1000) / 10)}%`;

// ---------- sections ----------

const SECTIONS = ["cover", "impact", "story", "journey", "ai", "frontuna", "skills", "qa", "call"];

function head(lang) {
  const he = lang === "he";
  const url = he ? `${SITE}/he/` : `${SITE}/`;
  const knows = [...new Set(P.skills.slice(0, 4).flatMap((g) => g.items))];
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: P.identity.name.en,
    alternateName: P.identity.name.he,
    jobTitle: "Front-End Tech Lead",
    description: P.summary.en,
    url: `${SITE}/`,
    email: `mailto:${P.identity.email}`,
    telephone: P.identity.phone,
    address: { "@type": "PostalAddress", addressLocality: "Tel Aviv", addressCountry: "IL" },
    sameAs: [P.identity.links.linkedin.url, P.identity.links.github.url, P.identity.links.frontuna.url],
    knowsLanguage: ["he", "en"],
    knowsAbout: knows,
  };
  return `<!doctype html>
<html lang="${lang}" dir="${he ? "rtl" : "ltr"}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${attr(U.meta.title, lang)}</title>
  <meta name="description" content="${attr(U.meta.description, lang)}"/>
  <meta name="theme-color" content="#0a1018"/>
  <link rel="canonical" href="${url}"/>
  <link rel="alternate" hreflang="en" href="${SITE}/"/>
  <link rel="alternate" hreflang="he" href="${SITE}/he/"/>
  <link rel="alternate" hreflang="x-default" href="${SITE}/"/>
  <link rel="icon" href="/images/favicon.svg?v=3" type="image/svg+xml"/>
  <link rel="icon" href="/favicon.ico?v=3" sizes="32x32"/>
  <link rel="apple-touch-icon" href="/images/apple-touch-icon.png"/>
  <meta property="og:type" content="profile"/>
  <meta property="og:url" content="${url}"/>
  <meta property="og:locale" content="${he ? "he_IL" : "en_US"}"/>
  <meta property="og:title" content="${attr(U.meta.title, lang)}"/>
  <meta property="og:description" content="${attr(U.meta.description, lang)}"/>
  <meta property="og:image" content="${SITE}/images/og-image.png"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:image:alt" content="${attr(U.meta.ogImageAlt, lang)}"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${attr(U.meta.title, lang)}"/>
  <meta name="twitter:description" content="${attr(U.meta.description, lang)}"/>
  <meta name="twitter:image" content="${SITE}/images/og-image.png"/>
  <meta name="twitter:image:alt" content="${attr(U.meta.ogImageAlt, lang)}"/>
  ${he
    ? `<link rel="preload" href="/fonts/heebo-hebrew.woff2" as="font" type="font/woff2" crossorigin/>
  <link rel="preload" href="/fonts/heebo-latin.woff2" as="font" type="font/woff2" crossorigin/>`
    : `<link rel="preload" href="/fonts/atkinson-700.woff2" as="font" type="font/woff2" crossorigin/>
  <link rel="preload" href="/fonts/atkinson-400.woff2" as="font" type="font/woff2" crossorigin/>`}
  <link rel="stylesheet" href="/css/site.css?v=${ASSET_V}"/>
  <script>document.documentElement.classList.add("js")</script>
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>`;
}

function header(lang) {
  const he = lang === "he";
  const other = he ? "/" : "/he/";
  const id = P.identity;
  return `
  <a class="skip" href="#main">${html(U.skip, lang)}</a>
  <header class="bar">
    <a class="mark" href="#cover">${html(id.name, lang)}</a>
    <p class="counter" id="counter" aria-hidden="true">${html(U.nav.cover, lang)}</p>
    <div class="bar-actions">
      <a class="pill pill-lang" href="${other}" hreflang="${he ? "en" : "he"}" lang="${he ? "en" : "he"}" title="${attr(U.langAria, lang)}">${html(U.langSwitch, lang)}</a>
      <a class="pill pill-wide" href="${id.phoneHref}" dir="ltr">${esc(id.phone)}</a>
      <a class="pill pill-wide" href="mailto:${id.email}" dir="ltr">${esc(id.email)}</a>
      <a class="pill pill-xwide" href="${id.links.github.url}" target="_blank" rel="noopener">GitHub</a>
      <a class="pill pill-xwide" href="${id.links.linkedin.url}" target="_blank" rel="noopener">LinkedIn</a>
      <a class="pill pill-cv" href="/${id.cvFile}" download>${html(U.cvShort, lang)}</a>
    </div>
  </header>
  <nav class="rail" aria-label="${attr(U.navAria, lang)}">
    ${SECTIONS.map((s, i) => `<a href="#${s}"${i === 0 ? ' aria-current="true"' : ""}>${html(U.nav[s], lang)}</a>`).join("\n    ")}
  </nav>`;
}

function hero(lang) {
  const id = P.identity;
  const subject = encodeURIComponent(plain(U.mailSubject, lang));
  return `
    <section class="sec sec-cover" id="cover" data-title="${attr(U.nav.cover, lang)}">
      <div class="hero">
        <div class="hero-copy">
          <p class="place">${html(id.location, lang)} · ${html(id.languages, lang)}</p>
          <h1>${html(id.name, lang)}</h1>
          <p class="headline">${html(id.headline, lang)}</p>
          <p class="summary">${html(P.summary, lang)}</p>
          <div class="actions">
            <a class="btn btn-primary" href="/${id.cvFile}" download>${html(U.cvButton, lang)}</a>
            <a class="btn btn-line" href="mailto:${id.email}?subject=${subject}">${html(U.emailButton, lang)}</a>
          </div>
          <ul class="links">
            <li><a href="mailto:${id.email}" dir="ltr">${esc(id.email)}</a></li>
            <li><a href="${id.links.linkedin.url}" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="${id.links.github.url}" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="${id.links.frontuna.url}" target="_blank" rel="noopener">frontuna.com</a></li>
          </ul>
        </div>
        <ul class="kpis" aria-label="${attr(U.kpiAria, lang)}">
          ${P.kpis
            .map(
              (k) => `<li class="kpi"><p class="kpi-value"><bdi>${esc(k.value)}</bdi>${k.unit[lang] ? ` <span class="kpi-unit">${html(k.unit, lang)}</span>` : ""}</p><p class="kpi-label">${html(k.label, lang)}</p></li>`
            )
            .join("\n          ")}
        </ul>
      </div>
    </section>`;
}

function impact(lang) {
  const L = U.impact;
  const rows = P.impact
    .map((r) => {
      const b = html(r.before.display, lang);
      const a = html(r.after.display, lang);
      return `
        <div class="imp-row">
          <div class="imp-head">
            <p class="imp-label">${html(r.label, lang)}</p>
            <p class="imp-meta">${html(r.where, lang)} · ${html(r.unit, lang)} · ${html(r.better === "higher" ? L.higher : L.lower, lang)}</p>
          </div>
          <div class="imp-bars">
            <div class="imp-line"><span class="imp-tag">${html(L.before, lang)}</span><span class="track"><span class="fill fill-before" style="--w:${pct(r.before.value, r.max)}"></span></span><span class="imp-val"><bdi>${b}</bdi></span></div>
            <div class="imp-line"><span class="imp-tag">${html(L.after, lang)}</span><span class="track"><span class="fill fill-after" style="--w:${pct(r.after.value, r.max)}"></span></span><span class="imp-val imp-val-after"><bdi>${a}</bdi></span></div>
          </div>
        </div>`;
    })
    .join("");
  const table = P.impact
    .map(
      (r) =>
        `<tr><th scope="row">${html(r.label, lang)} (${html(r.unit, lang)})</th><td>${html(r.where, lang)}</td><td>${html(r.before.display, lang)}</td><td>${html(r.after.display, lang)}</td></tr>`
    )
    .join("");
  return `
    <section class="sec" id="impact" data-title="${attr(U.nav.impact, lang)}">
      <h2>${html(L.h, lang)}</h2>
      <p class="lede">${html(L.lede, lang)}</p>
      <figure class="chart chart-impact" data-reveal>
        <div class="legend" aria-hidden="true"><span class="key key-before">${html(L.before, lang)}</span><span class="key key-after">${html(L.after, lang)}</span></div>
        <div class="imp" aria-hidden="true">${rows}
        </div>
        <table class="sr-only">
          <caption>${html(L.tableCaption, lang)}</caption>
          <thead><tr><th scope="col">${html(L.colMetric, lang)}</th><th scope="col">${html(L.colWhere, lang)}</th><th scope="col">${html(L.before, lang)}</th><th scope="col">${html(L.after, lang)}</th></tr></thead>
          <tbody>${table}</tbody>
        </table>
      </figure>
    </section>`;
}

function experience(lang) {
  const roles = P.experience
    .map(
      (r, i) => `
        <li class="role${i === 0 ? " is-now" : ""}">
          <div class="role-when"><p>${html(r.dates, lang)}</p></div>
          <div class="role-body">
            <h3>${html(r.company, lang)}</h3>
            <p class="role-title">${html(r.title, lang)}</p>
            <p class="role-context">${html(r.context, lang)}${r.url ? ` · <a href="${r.url}" target="_blank" rel="noopener">${esc(r.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))}</a>` : ""}</p>
            <ul class="bullets">
              ${r.bullets.map((b) => `<li>${html(b, lang)}</li>`).join("\n              ")}
            </ul>
          </div>
        </li>`
    )
    .join("");
  return `
    <section class="sec" id="story" data-title="${attr(U.nav.story, lang)}">
      <h2>${html(U.story.h, lang)}</h2>
      <ol class="roles">${roles}
      </ol>
      <p class="earlier"><strong>${html(U.story.earlier, lang)}:</strong> ${html(P.earlierRoles, lang)}</p>
    </section>`;
}

function journey(lang) {
  const J = U.journey;
  const max = 5;
  const domains = P.domains.map((d) => ({ ...d, years: d.sinceOnly ? null : roleYears(d.roleId) }));
  const bars = domains
    .map((d) =>
      d.years == null
        ? `<div class="dom-row"><p class="dom-label">${html(d.label, lang)}<span>${html(d.detail, lang)}</span></p><span class="track track-since"><span class="since">${html(d.since, lang)}</span></span><span class="dom-val">—</span></div>`
        : `<div class="dom-row"><p class="dom-label">${html(d.label, lang)}<span>${html(d.detail, lang)}</span></p><span class="track"><span class="fill fill-after" style="--w:${pct(d.years, max)}"></span></span><span class="dom-val"><bdi>${fmtYears(d.years, lang)}</bdi> ${html(J.years, lang)}</span></div>`
    )
    .join("\n          ");
  const ticks = Array.from({ length: max + 1 }, (_, i) => `<span style="--x:${(i / max) * 100}%">${i}</span>`).join("");
  const table = domains
    .map((d) => `<tr><th scope="row">${html(d.label, lang)} — ${html(d.detail, lang)}</th><td>${d.years == null ? html(d.since, lang) : fmtYears(d.years, lang)}</td></tr>`)
    .join("");
  return `
    <section class="sec" id="journey" data-title="${attr(U.nav.journey, lang)}">
      <div class="duo">
        <figure class="chart" data-reveal>
          <h2>${html(J.h, lang)}</h2>
          <p class="lede">${html(J.lede, lang)}</p>
          <ol class="journey">
            ${P.angularJourney.map((p) => `<li><span class="dot" aria-hidden="true"></span><p class="j-ver"><bdi dir="ltr">${esc(p.version)}</bdi></p><p class="j-co">${html(p.company, lang)}</p></li>`).join("\n            ")}
          </ol>
        </figure>
        <figure class="chart" data-reveal>
          <h2>${html(J.domainH, lang)}</h2>
          <p class="lede">${html(J.domainLede, lang)}</p>
          <div class="dom" aria-hidden="true">
          ${bars}
            <div class="dom-axis"><span class="dom-axis-label">${html(J.axis, lang)}</span><span class="ticks">${ticks}</span><span></span></div>
          </div>
          <table class="sr-only">
            <caption>${html(J.tableCaption, lang)}</caption>
            <thead><tr><th scope="col">${html(J.colDomain, lang)}</th><th scope="col">${html(J.colYears, lang)}</th></tr></thead>
            <tbody>${table}</tbody>
          </table>
        </figure>
      </div>
    </section>`;
}

function ai(lang) {
  return `
    <section class="sec" id="ai" data-title="${attr(U.nav.ai, lang)}">
      <h2>${html(U.ai.h, lang)}</h2>
      <div class="ai">
        <div class="ai-copy">
          ${P.ai.paragraphs.map((p) => `<p>${html(p, lang)}</p>`).join("\n          ")}
        </div>
        <ul class="ai-points">
          ${P.ai.points.map((p) => `<li><strong>${html(p.title, lang)}</strong> ${html(p.text, lang)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>`;
}

function frontuna(lang) {
  const F = P.frontuna;
  const A = F.architecture;
  const node = (n) => `<div class="node"><p class="node-name" dir="ltr">${esc(n.name)}</p><p class="node-role">${html(n.role, lang)}</p></div>`;
  return `
    <section class="sec" id="frontuna" data-title="${attr(U.nav.frontuna, lang)}">
      <h2>${html(U.frontuna.h, lang)}</h2>
      <p class="lede">${html(U.frontuna.lede, lang)} <a href="${P.identity.links.frontuna.url}" target="_blank" rel="noopener">${html(U.frontuna.visit, lang)}</a></p>
      <ul class="tiles">
        ${F.tiles.map((x) => `<li><p class="kpi-value"><bdi>${esc(x.value)}</bdi></p><p class="kpi-label">${html(x.label, lang)}</p></li>`).join("\n        ")}
      </ul>
      <figure class="chart arch-wrap">
        <h3>${html(U.frontuna.archH, lang)}</h3>
        <div class="arch" role="img" aria-label="${attr(U.frontuna.archAria, lang)}">
          <div class="arch-flow">${A.flow.map(node).join('<span class="arrow" aria-hidden="true"></span>')}</div>
          <div class="arch-side">${A.side.map(node).join("")}</div>
        </div>
      </figure>
    </section>`;
}

function projects(lang) {
  return `
    <section class="sec" id="projects" data-title="${attr(U.nav.frontuna, lang)}">
      <h2>${html(U.projects.h, lang)}</h2>
      <div class="cards">
        ${P.projects
          .map(
            (p) => `<article class="card"><h3><a href="${p.url}" target="_blank" rel="noopener">${html(p.name, lang)}</a></h3><p class="card-meta">${html(p.meta, lang)}</p><p>${html(p.text, lang)}</p></article>`
          )
          .join("\n        ")}
      </div>
    </section>`;
}

function skills(lang) {
  return `
    <section class="sec" id="skills" data-title="${attr(U.nav.skills, lang)}">
      <h2>${html(U.skills.h, lang)}</h2>
      <div class="skill-grid">
        ${P.skills
          .map(
            (g) => `<div class="skill-group"><h3>${html(g.group, lang)}</h3><ul class="chips">${g.items.map((s) => `<li dir="ltr">${esc(s)}</li>`).join("")}</ul></div>`
          )
          .join("\n        ")}
      </div>
    </section>
    <section class="sec" id="certs" data-title="${attr(U.nav.skills, lang)}">
      <h2>${html(U.certs.h, lang)}</h2>
      <ul class="certs">
        ${P.certifications
          .map((c) => `<li><strong>${html(c.title, lang)}</strong><span>${html(c.school, lang)}${c.year ? ` · ${esc(c.year)}` : ""}</span></li>`)
          .join("\n        ")}
      </ul>
    </section>`;
}

function faq(lang) {
  return `
    <section class="sec" id="qa" data-title="${attr(U.nav.qa, lang)}">
      <h2>${html(U.qa.h, lang)}</h2>
      <div class="qa">
        ${P.faq
          .map(
            (f, i) => `<details${i === 0 ? " open" : ""}>
          <summary><span class="q-no" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><span>${html(f.q, lang)}</span><span class="q-mark" aria-hidden="true"></span></summary>
          <div class="answer"><p>${html(f.a, lang)}</p></div>
        </details>`
          )
          .join("\n        ")}
      </div>
    </section>`;
}

function contact(lang) {
  const id = P.identity;
  const C = U.call;
  const subject = encodeURIComponent(plain(U.mailSubject, lang));
  return `
    <section class="sec sec-call" id="call" data-title="${attr(U.nav.call, lang)}">
      <h2>${html(C.h, lang)}</h2>
      <p class="lede">${html(C.lede, lang)}</p>
      <div class="call">
        <dl class="call-list">
          <div><dt>${html(C.email, lang)}</dt><dd><a href="mailto:${id.email}" dir="ltr">${esc(id.email)}</a></dd></div>
          <div><dt>${html(C.phone, lang)}</dt><dd><a href="${id.phoneHref}" dir="ltr">${esc(id.phone)}</a></dd></div>
          <div><dt>LinkedIn</dt><dd><a href="${id.links.linkedin.url}" target="_blank" rel="noopener" dir="ltr">${esc(id.links.linkedin.label)}</a></dd></div>
          <div><dt>GitHub</dt><dd><a href="${id.links.github.url}" target="_blank" rel="noopener" dir="ltr">${esc(id.links.github.label)}</a></dd></div>
          <div><dt>Frontuna</dt><dd><a href="${id.links.frontuna.url}" target="_blank" rel="noopener" dir="ltr">${esc(id.links.frontuna.label)}</a></dd></div>
          <div><dt>${html(C.location, lang)}</dt><dd>${html(id.location, lang)}</dd></div>
          <div><dt>${html(C.languages, lang)}</dt><dd>${html(id.languages, lang)}</dd></div>
        </dl>
        <div class="actions">
          <a class="btn btn-primary" href="mailto:${id.email}?subject=${subject}">${html(U.emailButton, lang)}</a>
          <a class="btn btn-line" href="/${id.cvFile}" download>${html(U.cvButton, lang)}</a>
        </div>
      </div>
    </section>`;
}

function page(lang) {
  return `${head(lang)}
<body>${header(lang)}
  <main class="sheet" id="main">${hero(lang)}${impact(lang)}${experience(lang)}${journey(lang)}${ai(lang)}${frontuna(lang)}${projects(lang)}${skills(lang)}${faq(lang)}${contact(lang)}
  </main>
  <footer class="foot">
    <p>© ${BUILD_DATE.getFullYear()} ${html(P.identity.name, lang)} · webplace.co.il</p>
  </footer>
  <button type="button" class="to-top" id="to-top" aria-label="${attr(U.topAria, lang)}"><span aria-hidden="true">↑</span></button>
  <script src="/js/site.js?v=${ASSET_V}" defer></script>
</body>
</html>
`;
}

function og() {
  const k = P.kpis.slice(0, 4);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<style>
@font-face{font-family:A;src:url(../fonts/atkinson-400.woff2) format("woff2");font-weight:400}
@font-face{font-family:A;src:url(../fonts/atkinson-700.woff2) format("woff2");font-weight:700}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:radial-gradient(900px 520px at 10% 0%,rgba(47,72,98,.55),transparent 60%),#0a1018;color:#e6edf4;font-family:A,sans-serif;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.bar{width:6px;height:150px;background:#6f93b3;border-radius:9px;position:absolute;left:52px;top:80px}
h1{font-size:84px;line-height:1;letter-spacing:-.02em;color:#f2f6fa}
p.h{font-size:32px;color:#b7c6d6;margin-top:22px;font-weight:700}
ul{display:flex;gap:18px;list-style:none;padding:0}
li{flex:1;border:1px solid #2c3848;background:#16202e;border-radius:14px;padding:20px 22px}
b{display:block;font-size:44px;color:#c4a35a}
span{display:block;font-size:19px;color:#8b97a8;margin-top:6px;line-height:1.3}
.u{font-size:24px;color:#8b97a8;text-align:right}
</style></head><body><div class="bar"></div>
<div><h1>${esc(P.identity.name.en)}</h1><p class="h">${esc(P.identity.headline.en)}</p></div>
<ul>${k.map((x) => `<li><b>${esc(x.value)}${x.unit.en ? " " + esc(x.unit.en) : ""}</b><span>${esc(x.label.en)}</span></li>`).join("")}</ul>
<p class="u">webplace.co.il</p></body></html>`;
}

// ---------- write ----------

const out = (rel, content) => {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log("wrote", rel, `${Buffer.byteLength(content)} bytes`);
};

out("index.html", page("en"));
out("he/index.html", page("he"));
out("build/og.html", og());
out(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${SITE}/</loc><xhtml:link rel="alternate" hreflang="he" href="${SITE}/he/"/><xhtml:link rel="alternate" hreflang="en" href="${SITE}/"/></url>
  <url><loc>${SITE}/he/</loc><xhtml:link rel="alternate" hreflang="he" href="${SITE}/he/"/><xhtml:link rel="alternate" hreflang="en" href="${SITE}/"/></url>
</urlset>
`
);
