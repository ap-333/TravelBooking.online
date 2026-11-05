// Fails if placeholder content is still present. Run before every production deploy.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = [...walk("tools"), ...walk("web/assets")].filter((f) => /\.(mjs|js|css)$/.test(f));
const hits = [];
for (const f of files) {
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    if (/(>|")\s*\[[A-Z][^\]\n"]{6,}\]/.test(line) && !/^\s*(\/\/|\*)/.test(line)) hits.push(`${f}:${i + 1}  ${line.trim().slice(0, 110)}`);
    if (/000-0000|\+10000000000/.test(line)) hits.push(`${f}:${i + 1}  placeholder phone`);
  });
}
if (hits.length) { console.error(`${hits.length} launch blocker(s):\n` + hits.join("\n")); process.exit(1); }
console.log("No placeholders found.");
