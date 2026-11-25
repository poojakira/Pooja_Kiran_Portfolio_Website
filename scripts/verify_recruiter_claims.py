"""Verify the active portfolio against the owner-supplied TPM resume."""

import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
pdf = ROOT / "public" / "Pooja_Kiran_TPM_Resume.pdf"
expected = "ee074a9c3173ac99c03887ffa6249ea633e3d1c40446a170e88ad26bbf6bc466"
assert hashlib.sha256(pdf.read_bytes()).hexdigest() == expected
assert list((ROOT / "public").glob("*Resume.pdf")) == [pdf]
data = (ROOT / "src/data/resume.ts").read_text(encoding="utf-8-sig")
ui = (ROOT / "src/components/Portfolio.tsx").read_text(encoding="utf-8-sig")
for phrase in (
    "Technical Program Manager | Security & AI Systems",
    "Vanguard Sourcing",
    "Graduate Teaching Assistant / IT Grader",
    "782 passing tests",
    "81.93%",
    "212 passing tests",
    "volunteerExperience",
):
    assert phrase in data, phrase
for old in ("Software Developer", "AEROSEC", "View Resumes"):
    assert old not in ui, old
print("TPM profile and exact uploaded resume verified")
