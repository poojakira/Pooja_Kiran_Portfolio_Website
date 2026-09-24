import fs from "node:fs";

const reportPath = "audit-report.json";
const configPath = "next.config.mjs";
const severityRank = { info: 0, low: 1, moderate: 2, high: 3, critical: 4 };
const minimumRank = severityRank.high;

const allowed = {
  next: "Static-export portfolio: next.config.mjs sets output:'export'; no Next server, middleware, image optimizer server, server actions, or RSC endpoint is deployed from this repo.",
  postcss: "Build-time dependency under the static-export Next toolchain. No CSS source maps are accepted from untrusted users at runtime.",
  glob: "Build/lint dependency path. Repository does not expose glob CLI or shell command execution to users.",
  "js-yaml": "Build/development dependency path. Repository does not parse untrusted YAML at runtime.",
  "lodash.pick": "Transitive @react-three/drei dependency used for static portfolio rendering; no untrusted object merge/pick API is exposed to users.",
};

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

if (!fs.existsSync(reportPath)) {
  fail(`Missing ${reportPath}; run npm audit --json first.`);
  process.exit();
}

const config = fs.readFileSync(configPath, "utf8");
if (!config.includes("output: 'export'")) {
  fail("Audit exception review requires Next static export mode in next.config.mjs.");
}
if (!config.includes("unoptimized: true")) {
  fail("Audit exception review requires unoptimized static images in next.config.mjs.");
}

const audit = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const vulnerabilities = audit.vulnerabilities ?? {};
const unexpected = [];
const reviewed = [];

for (const [name, vulnerability] of Object.entries(vulnerabilities)) {
  const severity = vulnerability.severity ?? "unknown";
  if ((severityRank[severity] ?? 99) < minimumRank) continue;

  if (Object.prototype.hasOwnProperty.call(allowed, name)) {
    reviewed.push({ name, severity, reason: allowed[name] });
  } else {
    unexpected.push({ name, severity, title: vulnerability.title ?? "unreviewed vulnerability" });
  }
}

if (unexpected.length > 0) {
  console.error("Unexpected high/critical npm audit findings:");
  for (const item of unexpected) {
    console.error(`- ${item.name} (${item.severity}): ${item.title}`);
  }
  process.exit(1);
}

console.log("Reviewed npm audit exceptions for this static-export portfolio:");
for (const item of reviewed) {
  console.log(`- ${item.name} (${item.severity}): ${item.reason}`);
}
console.log("No unreviewed high/critical npm audit findings remain.");
