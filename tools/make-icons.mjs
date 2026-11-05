// Renders web/icon.svg into the PNG and ICO icons browsers, iOS and installers ask for.
// Usage: node tools/make-icons.mjs   (macOS: uses the built-in `sips`)
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const web = new URL("../web/", import.meta.url).pathname;
const tmp = mkdtempSync(join(tmpdir(), "tb-icons-"));
const png = (svgPath, size, out) => execFileSync("sips", ["-s", "format", "png", "-z", String(size), String(size), svgPath, "--out", out], { stdio: "ignore" });

// Full-bleed square (no rounded corners) for iOS and maskable icons, which add their own mask.
const rounded = readFileSync(web + "icon.svg", "utf8");
const inner = rounded.replace(/<rect[^>]*\/>/, "");
const square = rounded.replace(/<svg([^>]*)>[\s\S]*<\/svg>/, `<svg$1><rect width="32" height="32" fill="#101C2C"/><g transform="translate(16 16) scale(.8) translate(-16 -16)">${inner.replace(/<svg[^>]*>|<\/svg>/g, "")}</g></svg>`);
const sq = join(tmp, "square.svg"); writeFileSync(sq, square);

png(web + "icon.svg", 192, web + "icon-192.png");
png(web + "icon.svg", 512, web + "icon-512.png");
png(sq, 512, web + "icon-maskable-512.png");
png(sq, 180, web + "apple-touch-icon.png");

// favicon.ico with 32px and 48px PNG frames
const frames = [32, 48].map((n) => { const f = join(tmp, `f${n}.png`); png(web + "icon.svg", n, f); return [n, readFileSync(f)]; });
const head = Buffer.alloc(6); head.writeUInt16LE(1, 2); head.writeUInt16LE(frames.length, 4);
let off = 6 + 16 * frames.length;
const dir = frames.map(([n, b]) => { const e = Buffer.alloc(16); e[0] = n; e[1] = n; e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(b.length, 8); e.writeUInt32LE(off, 12); off += b.length; return e; });
writeFileSync(web + "favicon.ico", Buffer.concat([head, ...dir, ...frames.map(([, b]) => b)]));
console.log("icons written to web/");
