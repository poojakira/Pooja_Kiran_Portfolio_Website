import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const base = "/Pooja_Kiran_Portfolio_Website";
const html = fs.readFileSync("out/index.html", "utf8");
const attributes = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(match => match[1].replaceAll("&amp;", "&"));
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
for (const target of attributes) {
  if (target.startsWith("#")) { assert(ids.has(target.slice(1)), `Missing anchor ${target}`); continue; }
  if (!target.startsWith(base)) continue;
  const relative = target.slice(base.length).split("?")[0];
  const [pathname, hash] = relative.split("#");
  if (hash) assert(ids.has(hash), `Missing anchor ${hash}`);
  if (pathname && pathname !== "/") assert(fs.existsSync(path.join("out", pathname)), `Missing exported asset ${pathname}`);
}
assert.equal((html.match(/<h1\b/g) || []).length, 1, "Expected one page h1");
const projectCards = [...html.matchAll(/<article\b[^>]*class="[^"]*\bfc-project\s+fc-project-\d+\b[^"]*"/g)];
assert.equal(projectCards.length, 3, "Expected three rendered flagship project cards");
for (const repository of ["mcp-agent-security-gateway", "aws-agent-identity-guard", "hf-model-provenance-scanner"]) {
  assert(html.includes(`https://github.com/poojakira/${repository}`), `Missing project repository link: ${repository}`);
}
assert(html.includes(`${base}/Pooja_Kiran_Security_Engineer_Resume.pdf`), "New résumé missing");
assert(!html.includes("Pooja_KIRAN_Security_Engineer.pdf"), "Legacy résumé link remains");
assert(!fs.existsSync("Pooja_KIRAN_Security_Engineer.pdf"), "Legacy root-level résumé remains in repository");
assert(!fs.existsSync("out/qa-responsive.html"), "Temporary QA page must not ship");
assert(fs.readFileSync("out/Pooja_Kiran_Security_Engineer_Resume.pdf").subarray(0,5).toString() === "%PDF-", "Résumé is not a PDF");
assert(fs.existsSync("out/pooja-kiran.png"), "Portrait missing");
console.log("Export checks passed: anchors, local assets, portrait, résumé, headings, and rendered project cards.");
