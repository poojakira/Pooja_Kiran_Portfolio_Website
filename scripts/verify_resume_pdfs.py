"""Check both published resume PDFs against the pinned project evidence."""

import argparse
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NAMES = (
    "Pooja_Kiran_Security_Engineer_Resume",
    "Pooja_Kiran_Engineering_Manager_Resume",
)
DOWNLOAD_NAMES = {
    NAMES[0]: "Pooja_Kiran_Software_Developer_Resume",
    NAMES[1]: "Pooja_Kiran_Technical_Project_Coordination_Resume",
}
HEADLINES = {
    NAMES[0]: "Software Developer | Python, AI & Security Projects",
    NAMES[1]: "Technical Project Coordination | Software & AI Projects",
}


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
    for name in NAMES:
        published = ROOT / "public" / (DOWNLOAD_NAMES[name] + ".pdf")
        legacy_url = ROOT / "public" / (name + ".pdf")
        if legacy_url.read_bytes() != published.read_bytes():
            raise SystemExit(
                f"Existing download URL differs from corrected resume: {name}"
            )
        info = subprocess.check_output(["pdfinfo", str(published)], text=True)
        if not re.search(r"^Pages:\s+2$", info, re.MULTILINE):
            raise SystemExit(f"Expected two pages: {name}")
        body = text(published)
        if "M.S., Information Technology" not in body or re.search(
            r"Information Technology\s*\(Security\)", body, re.IGNORECASE
        ):
            raise SystemExit(f"Incorrect master's degree: {name}")
        if HEADLINES[name] not in body:
            raise SystemExit(f"Incorrect career positioning: {name}")
        if re.search(r"\bMAX\b|Justin Shewell", body):
            raise SystemExit(f"Removed experience entry is still present: {name}")
        for pin in pins:
            for value in (str(pin["passed"]), f"{pin['coverage_percent']:.2f}%"):
                if value not in body:
                    raise SystemExit(f"Missing project result {value}: {name}")
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
                raise SystemExit(f"Missing factual context {phrase}: {name}")
        if args.generated_directory:
            generated = args.generated_directory / (name + ".pdf")
            if text(generated) != body:
                raise SystemExit(
                    f"Tracked download text differs from rebuilt source: {name}"
                )
        print(f"{name}: two pages, pinned results and required context verified")


if __name__ == "__main__":
    main()
