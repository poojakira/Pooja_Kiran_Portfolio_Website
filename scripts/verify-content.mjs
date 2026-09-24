import fs from "node:fs";
import crypto from "node:crypto";

const files = [
  "src/data/portfolio.ts",
  "src/data/content.ts",
  "src/data/projects.ts",
  "src/data/trustUniverse.ts",
  "src/app/page.tsx",
  "src/components/fresh/FreshCinematicPortfolio.tsx",
  "src/components/aura/AuraPortfolioHome.tsx",
  "src/components/world/WorldPortfolio.tsx",
  "src/components/sections/InteractivePortfolioHero.tsx",
  "src/components/trust-universe/TrustUniverseExperience.tsx",
  "docs/trust-universe/TECHNICAL_EVIDENCE_MAP.md",
  "README.md",
];

const text = files
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

const required = [
  "641 passing tests",
  "79.54% statement coverage",
  "231 passing tests",
  "25 IAM rule IDs",
  "214 passing tests",
  "12/12 core",
  "18/18 extended",
  "1,086",
];

for (const token of required) {
  if (!text.includes(token)) {
    throw new Error(`Missing current repository evidence token: ${token}`);
  }
}

const stale = [
  "230 passing tests", // superseded AWS IAM evidence
  "199 passing tests", // superseded HF scanner evidence
  "1,070", // superseded flagship aggregate
  "1,047 documented passing tests",
  "1,058 documented passing tests",
  "622 passing tests",
  "629 passing tests",
  "78% statement coverage",
  "78.47% statement coverage",
  "195 passing tests",
];

for (const token of stale) {
  if (text.includes(token)) {
    throw new Error(`Stale portfolio metric found: ${token}`);
  }
}

const repositoryNames = [
  "mcp-agent-security-gateway",
  "aws-agent-identity-guard",
  "hf-model-provenance-scanner",
];

for (const repo of repositoryNames) {
  if (!text.includes(repo)) {
    throw new Error(`Missing flagship repository reference: ${repo}`);
  }
}

console.log("portfolio evidence consistency checks passed");

const resumePath = "public/Pooja_Kiran_Security_Engineer_Resume.pdf";
const portraitPath = "public/pooja-kiran.png";
const expectedResumeSha256 = "408cbe449622aeed864758a382ba781845fd26cf32911edeebb95ad278b8918c";

if (!fs.existsSync(resumePath)) throw new Error("Canonical résumé PDF is missing");
if (!fs.existsSync(portraitPath)) throw new Error("Canonical portrait is missing");

const resumeSha256 = crypto.createHash("sha256").update(fs.readFileSync(resumePath)).digest("hex");
if (resumeSha256 !== expectedResumeSha256) {
  throw new Error(`Canonical résumé hash mismatch: ${resumeSha256}`);
}
if (fs.existsSync("Pooja_KIRAN_Security_Engineer.pdf")) {
  throw new Error("Legacy root-level résumé must not exist");
}

console.log(`canonical résumé SHA-256 verified: ${resumeSha256}`);
console.log("canonical portrait verified");
