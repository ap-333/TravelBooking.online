// Crawls every URL in sitemap.xml on a running server and checks core on-page SEO signals.
// Usage: node scripts/seo-audit.mjs http://localhost:3200
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const get = async (p) => { const r = await fetch(base + p); return { r, t: await r.text() }; };
const pick = (h, re) => (h.match(re) || [])[1];

const { t: sm } = await get("/sitemap.xml");
const paths = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const rob = await get("/robots.txt");
const problems = [];
const rows = [];
const titles = new Map(), descs = new Map(), links = new Set();

for (const p of paths) {
  const { r, t } = await get(p);
  const title = pick(t, /<title>(.*?)<\/title>/);
  const desc = pick(t, /<meta name="description" content="(.*?)"/);
  const canon = pick(t, /<link rel="canonical" href="(.*?)"/);
  const h1 = (t.match(/<h1[\s>]/g) || []).length;
  const og = /property="og:image"/.test(t), tw = /name="twitter:image"/.test(t);
  const lang = /<html lang="en/.test(t), vp = /name="viewport"/.test(t);
  const ld = [...t.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)];
  let ldOk = ld.length > 0;
  for (const m of ld) { try { JSON.parse(m[1]); } catch { ldOk = false; } }
  const noindex = /name="robots" content="[^"]*noindex/.test(t);
  const imgsNoAlt = (t.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length;
  const f = [];
  if (r.status !== 200) f.push(`status ${r.status}`);
  if (!title) f.push("no title"); else if (title.length > 60) f.push(`title ${title.length}>60`);
  if (!desc) f.push("no description"); else if (desc.length < 70 || desc.length > 160) f.push(`desc ${desc.length}`);
  if (!canon || new URL(canon).pathname !== p) f.push("canonical");
  if (h1 !== 1) f.push(`h1 x${h1}`);
  if (!og || !tw) f.push("social image");
  if (!lang || !vp) f.push("lang/viewport");
  if (!ldOk) f.push("json-ld");
  if (noindex) f.push("noindex");
  if (imgsNoAlt) f.push("img alt");
  const cu = canon && new URL(canon);
  if (!/hreflang="en-US"/.test(t)) f.push("hreflang");
  if (!/rel="apple-touch-icon"/.test(t) || !/rel="icon"/.test(t)) f.push("icons");
  if (!/property="og:title"/.test(t) || !/property="og:description"/.test(t) || og && pick(t, /property="og:url" content="(.*?)"/) !== canon) f.push("og tags");
  if (!/name="twitter:card"/.test(t)) f.push("twitter card");
  if (title && !/TravelBooking\.online/i.test(title)) f.push("brand missing in title");
  const hs = [...t.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  if (hs.some((h, i) => i && h > hs[i - 1] + 1)) f.push("heading level skipped");
  if (/(src|href)="http:\/\//.test(t)) f.push("http:// resource");
  const types = ld.flatMap((m) => { try { const j = JSON.parse(m[1]); return (j["@graph"] || [j]).map((x) => x["@type"]); } catch { return []; } });
  if (p === "/" && !(types.includes("Organization") && types.includes("WebSite"))) f.push("home schema");
  if (p !== "/" && !types.includes("BreadcrumbList")) f.push("breadcrumb schema");
  for (const m of t.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) links.add(m[1]);
  if (t.length > 120000) f.push("html >120KB");
  if (title) titles.set(title, [...(titles.get(title) || []), p]);
  if (desc) descs.set(desc, [...(descs.get(desc) || []), p]);
  rows.push([p, r.status, title?.length, desc?.length, h1, ld.length, f.length ? "FAIL: " + f.join(", ") : "ok"]);
  if (f.length) problems.push(p + ": " + f.join(", "));
}
for (const v of titles.values()) if (v.length > 1) problems.push(`duplicate title on ${v.join(", ")}`);
for (const v of descs.values()) if (v.length > 1) problems.push(`duplicate description on ${v.join(", ")}`);
if (!/Sitemap:/i.test(rob.t)) problems.push("robots.txt missing Sitemap");
const nf = await fetch(base + "/this-page-does-not-exist");
if (nf.status !== 404) problems.push(`404 route returns ${nf.status}`);
const manifest = await fetch(base + "/manifest.webmanifest"); if (manifest.status !== 200) problems.push("manifest missing");
const hdr = (await fetch(base + "/")).headers;
for (const h of ["strict-transport-security", "x-content-type-options", "referrer-policy"]) if (!hdr.get(h)) problems.push(`missing header ${h}`);


// Site-wide files and signals
const ok = async (p, type) => { const r = await fetch(base + p); if (r.status !== 200) problems.push(`${p} returns ${r.status}`); else if (type && !(r.headers.get("content-type") || "").includes(type)) problems.push(`${p} content-type ${r.headers.get("content-type")}`); return r; };
for (const [p, t] of [["/favicon.ico", "icon"], ["/icon.svg", "svg"], ["/apple-touch-icon.png", "png"], ["/icon-192.png", "png"], ["/icon-512.png", "png"], ["/icon-maskable-512.png", "png"], ["/og.png", "png"], ["/llms.txt", "text/plain"], ["/humans.txt", "text/plain"], ["/.well-known/security.txt", "text/plain"]]) await ok(p, t);
const og = Buffer.from(await (await fetch(base + "/og.png")).arrayBuffer());
if (og.readUInt32BE(16) !== 1200 || og.readUInt32BE(20) !== 630) problems.push("og.png is not 1200x630");
const mf = await (await fetch(base + "/manifest.webmanifest")).json();
for (const k of ["name", "short_name", "start_url", "icons", "theme_color"]) if (!mf[k]) problems.push(`manifest missing ${k}`);
for (const i of mf.icons || []) await ok(i.src);
if (!(mf.icons || []).some((i) => i.sizes === "192x192") || !(mf.icons || []).some((i) => i.sizes === "512x512")) problems.push("manifest needs 192 and 512 icons");
if (/^\s*Disallow:\s*\/\s*$/m.test(rob.t)) problems.push("robots.txt blocks the whole site");
const rs = rob.t.match(/Sitemap:\s*(\S+)/i)?.[1];
if (rs && new URL(rs).pathname !== "/sitemap.xml") problems.push("robots sitemap path");
if (/<lastmod>(?!\d{4}-\d{2}-\d{2})/.test(sm)) problems.push("sitemap lastmod format");
if (new Set(paths).size !== paths.length) problems.push("duplicate sitemap URLs");
const nfPage = await (await fetch(base + "/this-page-does-not-exist")).text();
if (!/name="robots" content="noindex/.test(nfPage)) problems.push("404 page is indexable");
if (paths.some((p) => /404/.test(p))) problems.push("404 in sitemap");
// internal links all resolve (redirects count as broken links worth fixing)
for (const l of links) { const r = await fetch(base + l, { redirect: "manual" }); if (r.status !== 200) problems.push(`broken/redirected internal link ${l} -> ${r.status}`); }
// URL hygiene and performance
for (const [from, to] of [["/flight-booking/", "/flight-booking"], ["/flight-booking.html", "/flight-booking"], ["/index.html", "/"]]) { const r = await fetch(base + from, { redirect: "manual" }); if (![301, 308].includes(r.status) || new URL(r.headers.get("location"), base).pathname !== to) problems.push(`${from} should 301 to ${to}`); }
const home = await fetch(base + "/", { headers: { "accept-encoding": "gzip" } });
if (home.headers.get("content-encoding") !== "gzip") problems.push("home not gzip-compressed");
const css = await fetch(base + (pick(await (await fetch(base + "/")).text(), /href="(\/assets\/style\.css[^"]*)"/) || "/assets/style.css"));
if (!/immutable|max-age=\d{6,}/.test(css.headers.get("cache-control") || "")) problems.push("css not long-cached");
if (!hdr.get("x-frame-options") && !hdr.get("content-security-policy")) problems.push("clickjacking header");

console.table(rows.map(([path, status, title, desc, h1, ld, result]) => ({ path, status, title, desc, h1, ld, result })));
console.log(problems.length ? "\nPROBLEMS:\n" + problems.join("\n") : "\nAll checks passed.");
process.exit(problems.length ? 1 : 0);
