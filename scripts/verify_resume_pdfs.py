"""Verify the single generated resume PDF against pinned project evidence."""

import argparse
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_NAME = "Pooja_Kiran_Security_Engineer_Resume"
DOWNLOAD_NAME = "Pooja_Kiran_Software_Engineer_Resume"
HEADLINE = "Software Engineer | AI Agents & Application Security"


def text(path: Path) -> str:
    extracted = subprocess.check_output(
        ["pdftotext", "-layout", str(path), "-"], text=True
    )
    return " ".join(extracted.split())


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--generated-directory", type=Path)
    args = parser.parse_args()
    pins = json.loads((ROOT / "docs/project_evidence.json").read_text())["projects"]
    published = ROOT / "public" / (DOWNLOAD_NAME + ".pdf")
    if not published.is_file():
        raise SystemExit("Missing canonical resume PDF: " + str(published))
    info = subprocess.check_output(["pdfinfo", str(published)], text=True)
    if not re.search(r"^Pages:\s+2$", info, re.MULTILINE):
        raise SystemExit("Expected two pages in canonical resume")
    body = text(published)
    if HEADLINE not in body:
        raise SystemExit("Incorrect resume headline")
    if "M.S., Information Technology" not in body or re.search(
        r"Information Technology\s*\(Security\)", body, re.IGNORECASE
    ):
        raise SystemExit("Incorrect master's degree")
    if re.search(r"\bMAX\b|Justin Shewell", body):
        raise SystemExit("Removed experience entry is still present")
    for pin in pins:
        for value in (str(pin["passed"]), f"{pin['coverage_percent']:.2f}%"):
            if value not in body:
                raise SystemExit("Missing pinned project result: " + value)
    for phrase in (
        "legacy rules-module skips",
        "independent security closure blocked",
        "hosted CI remains unverified",
        "PARTIAL",
        "Cloud Architecting",
        "Cloud Security Foundations",
        "Education",
        "Jayahar Sivasubramanian",
    ):
        if phrase not in body:
            raise SystemExit("Missing factual context: " + phrase)
    if args.generated_directory:
        generated = args.generated_directory / (SOURCE_NAME + ".pdf")
        if text(generated) != body:
            raise SystemExit("Published PDF text differs from rebuilt source")
    for old in (
        "Pooja_Kiran_Software_Developer_Resume.pdf",
        "Pooja_Kiran_Software_Developer_Experience_Resume.pdf",
        "Pooja_Kiran_Security_Engineer_Resume.pdf",
        "Pooja_Kiran_Engineering_Manager_Resume.pdf",
    ):
        if (ROOT / "public" / old).exists():
            raise SystemExit("Extra resume PDF still published: " + old)
    print("One canonical two-page Software Engineer resume verified")


if __name__ == "__main__":
    main()
