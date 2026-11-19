"""Verify resume and website against bounded engineering evidence."""

import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
tex = root / "resume/Pooja_Kiran_Security_Engineer_Resume.tex"
data = root / "src/data/resume.ts"
sources = (tex.read_text(encoding="utf-8-sig"), data.read_text(encoding="utf-8-sig"))

for source in sources:
    lower = source.lower()
    for forbidden in ("96.15", "40% reduction", "60% detection", "100% secure"):
        if forbidden in lower:
            raise SystemExit("Unsupported impact claim: " + forbidden)

if "externship" not in sources[1].lower():
    raise SystemExit("Academic externship labeling missing in website data")
if "â†’" in sources[1] or "â·" in sources[1]:
    raise SystemExit("Corrupted Unicode in website data")

portfolio = root / "src/components/Portfolio.tsx"
ui = portfolio.read_text(encoding="utf-8-sig")
for phrase in (
    "Historical October 2026 poster",
    "834 passing tests",
    "272 passing tests",
    "317 passing tests",
    "332 passing tests",
    "hosted Colab execution remains unverified",
):
    if phrase not in ui:
        raise SystemExit("Missing current project context: " + phrase)

# Parse the JSON project array without executing TypeScript. Pins come from
# actual immutable out-of-tree verification manifests.
projects = json.JSONDecoder().raw_decode(sources[1].split("projects: ", 1)[1])[0]
evidence = json.loads((root / "docs/project_evidence.json").read_text())
if len(projects) != len(evidence["projects"]) or len(projects) != 4:
    raise SystemExit("Expected exactly four source-scoped project records")
for source in sources:
    if re.search(r"Information Technology\s*\(Security\)", source, re.IGNORECASE):
        raise SystemExit(
            "The master's degree is Information Technology, without a specialization"
        )
    if "M.S." not in source or "Information Technology" not in source:
        raise SystemExit("Missing corrected Information Technology master's degree")
if "Software Engineer | AI Agents \\& Application Security" not in sources[0]:
    raise SystemExit("Missing documented software-development positioning")
if 'id="about"' not in ui or "resume.about.paragraphs.map" not in ui:
    raise SystemExit("Missing dedicated About section")
layout = (root / "src/app/layout.tsx").read_text(encoding="utf-8-sig")
if 'jobTitle: "Security Engineer"' in layout or "Security Engineer" in ui:
    raise SystemExit("Obsolete personal role positioning is still published")
if "$120,000" in ui or "$120K" in ui:
    raise SystemExit(
        "Use documented coordination outcomes instead of unsupported budget figures"
    )
for project, pin in zip(projects, evidence["projects"], strict=True):
    if (
        project["sourceCommit"] != pin["source_commit"]
        or project["caseStudy"] != pin["assessment_url"]
    ):
        raise SystemExit("Project source/report drift: " + project["name"])
    if (
        project["releaseStatus"] != pin["release_decision"]
        or project["releaseStatus"] != "PARTIAL"
    ):
        raise SystemExit("Unverified release status: " + project["name"])
    passed = str(pin["passed"])
    coverage = f"{pin['coverage_percent']:.2f}"
    for source in sources:
        if passed not in source or coverage not in source:
            raise SystemExit(
                "Resume/site missing pinned results: " + project["name"]
            )
    if pin["archive_commit"] not in sources[1]:
        raise SystemExit(
            "Website missing evidence archive reference: " + project["name"]
        )
    if project["verificationDate"] != evidence["verification_date"]:
        raise SystemExit("Verification date drift")
if (
    "legacy rules-module" not in sources[0]
    or "absent legacy TestRulesModule" not in sources[1]
):
    raise SystemExit("IAM skip reasons must identify the missing legacy module")
if (
    "independent security closure blocked" not in sources[0]
    or "BLOCKED" not in projects[2]["limitations"]
):
    raise SystemExit("HF closing-review blocker must remain visible")
if "hosted CI remains unverified" not in sources[
    0
] or "hosted CI NOT VERIFIED" not in " ".join(projects[3]["metrics"]):
    raise SystemExit("Aegis hosted verification limitation must remain visible")
for stale in (
    "782",
    "81.93",
    "244",
    "260",
    "75.67",
    "296 local",
    "GitHub Actions remains disabled",
    "Current verified evidence poster",
):
    if stale in sources[0] or stale in ui:
        raise SystemExit("Stale current-result claim: " + stale)

for period in ("Oct 2025 -- Oct 2026", "Apr 2025 -- Oct 2026", "Nov 2024 -- Oct 2026"):
    if period not in sources[0]:
        raise SystemExit("Incorrect project period in LaTeX: " + period)
for period in ("Oct 2025 - Oct 2026", "Apr 2025 - Oct 2026", "Nov 2024 - Oct 2026"):
    if period not in sources[1]:
        raise SystemExit("Incorrect project period in website: " + period)
if "candidate-reported" in sources[0].lower() + sources[1].lower():
    raise SystemExit("Unwanted project-period disclaimer")

for source in sources:
    if "not realized funding or revenue" in source.lower():
        raise SystemExit("Unwanted AEROSEC funding wording")
    if "one test was skipped" in source.lower():
        raise SystemExit("Unwanted HF Scanner skipped-test wording")

for cert in ("Cloud Architecting", "Cloud Security Foundations"):
    if cert not in sources[0] or cert not in sources[1]:
        raise SystemExit("Missing AWS Academy certification: " + cert)

# Keep the retained experience details aligned with the supplied letters.
# The owner requested removal of the MAX role from both resumes and the website.
for source in sources:
    for removed in (
        "Project MAX",
        "Technical Project Assistant | MAX",
        "Justin Shewell",
    ):
        if removed in source:
            raise SystemExit("Removed experience entry is still present: " + removed)

for source in sources:
    for phrase in (
        "Dr. Jayahar Sivasubramanian",
        "Sep 2023",
        "Dec 2023",
        "Aug 2022",
        "Aug 2023",
        "Jan 2025",
        "May 2026",
        "Cerberus",
    ):
        if phrase not in source:
            raise SystemExit("Missing verified Experience detail: " + phrase)
    for unsupported in ("85 undergraduate", "52 graduate", "$120,000", "120,000"):
        # These figures are not documented in the supplied verification letters.
        exp = source.split("Experience", 1)[-1]
        exp = exp.split("Selected Security Engineering", 1)[0]
        if unsupported.lower() in exp.lower():
            raise SystemExit("Unsupported number in Experience: " + unsupported)

print("Resume evidence check passed")
