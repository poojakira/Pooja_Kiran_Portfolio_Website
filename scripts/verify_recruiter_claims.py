"""Verify resume and website against bounded engineering evidence."""

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
    required = ("782", "81.93", "25", "externship", "244", "260")
    for value in required:
        if value.lower() not in lower:
            raise SystemExit("Missing source-backed evidence: " + value)
    if not re.search(r"\b33\s*(?:/|of)\s*33\b", source):
        raise SystemExit("Missing bounded 33/33 model-scanner fixture result")

if "externship" not in sources[1].lower():
    raise SystemExit("Academic externship labeling missing in website data")
if "â†’" in sources[1] or "â·" in sources[1]:
    raise SystemExit("Corrupted Unicode in website data")

portfolio = root / "src/components/Portfolio.tsx"
ui = portfolio.read_text(encoding="utf-8-sig")
if "60-second demo script (text)" not in ui:
    raise SystemExit("Portfolio must label the Markdown demo as text")

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

# Keep the seven Experience entries aligned with the faculty and collaboration letters.
for source in sources:
    for phrase in (
        "Dr. Justin Shewell",
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
