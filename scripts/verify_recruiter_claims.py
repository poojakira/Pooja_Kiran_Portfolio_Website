"""Verify the active portfolio against the owner-supplied TPM resume."""

import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
pdf = ROOT / "public" / "Pooja_Kiran_TPM_Resume.pdf"
expected = "ee074a9c3173ac99c03887ffa6249ea633e3d1c40446a170e88ad26bbf6bc466"
assert hashlib.sha256(pdf.read_bytes()).hexdigest() == expected
legacy = {
    "Pooja_Kiran_Software_Engineer_Resume.pdf": "5d8c930181f0e7eb654d4181d9c19b9062153b85",
    "Pooja_Kiran_Security_Engineer_Resume.pdf": "45f4cffc2817569b300b62abb187eee821c33908",
}
for filename, git_sha in legacy.items():
    raw = (ROOT / "public" / filename).read_bytes()
    blob = f"blob {len(raw)}\0".encode() + raw
    assert hashlib.sha1(blob, usedforsecurity=False).hexdigest() == git_sha
assert {p.name for p in (ROOT / "public").glob("*Resume.pdf")} == {
    pdf.name,
    *legacy,
}
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
for filename in (pdf.name, *legacy):
    assert filename in data, filename
for old in ("Software Developer", "AEROSEC"):
    assert old not in ui, old
print("TPM profile and all three unchanged resume PDFs verified")
