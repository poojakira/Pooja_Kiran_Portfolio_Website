import fs from "node:fs";
import crypto from "node:crypto";

const files = [
  "src/data/portfolio.ts",
  "src/data/content.ts",
  "src/app/page.tsx",
];

const text = files
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

const required = [
  "629 passing tests",
  "78.47% statement coverage",
  "230 passing tests",
  "25 IAM rule IDs",
  "199 passing tests",
  "12/12 core",
  "18/18 extended",
  "1,058",
];

for (const token of required) {
  if (!text.includes(token)) {
    throw new Error(`Missing verified portfolio evidence token: ${token}`);
  }
}

const forbidden = [
  "1,047",
  "622 passing tests",
  "195 passing tests",
  "51% detection",
  "0.87",
  "23% robust",
  "F1=0.93",
  "0.70 on transfer",
];

for (const token of forbidden) {
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
const expectedResumeSha256 = "408cbe449622aeed864758a382ba781845fd26cf32911edeebb95ad278b8918c";
if (!fs.existsSync(resumePath)) {
  throw new Error("Canonical résumé PDF is missing");
}
const resumeSha256 = crypto.createHash("sha256").update(fs.readFileSync(resumePath)).digest("hex");
if (resumeSha256 !== expectedResumeSha256) {
  throw new Error(`Canonical résumé hash mismatch: ${resumeSha256}`);
}
if (fs.existsSync("Pooja_KIRAN_Security_Engineer.pdf")) {
  throw new Error("Legacy root-level résumé must not exist");
}
console.log(`canonical résumé SHA-256 verified: ${resumeSha256}`);
