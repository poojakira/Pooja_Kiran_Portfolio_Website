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
        published = ROOT / "public" / (name + ".pdf")
        info = subprocess.check_output(["pdfinfo", str(published)], text=True)
        if not re.search(r"^Pages:\s+2$", info, re.MULTILINE):
            raise SystemExit(f"Expected two pages: {name}")
        body = text(published)
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
