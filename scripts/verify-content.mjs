import fs from "node:fs";

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
