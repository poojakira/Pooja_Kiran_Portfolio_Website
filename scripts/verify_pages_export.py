"""Verify and identify the artifact immediately before a Pages upload."""

from __future__ import annotations

import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
from subprocess import check_output
from urllib.parse import urljoin

BASE = "https://artifact.invalid/Pooja_Kiran_Portfolio_Website/"
RESUME = "Pooja_Kiran_Software_Engineer_Resume.pdf"
POSTERS = ("mcp-poster.png", "iam-poster.png", "provenance-poster.png")


class Homepage(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = set()
        self.images = set()
        self.main_is_focusable = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a" and attrs.get("href"):
            self.links.add(urljoin(BASE, attrs["href"]))
        if tag == "img" and attrs.get("src"):
            self.images.add(urljoin(BASE, attrs["src"]))
        if tag == "main" and attrs.get("id") == "main":
            self.main_is_focusable = attrs.get("tabindex") == "-1"


def verify_export(out: Path, public: Path, source_commit: str) -> dict:
    """Check published links and the exact copied PDF and poster assets."""
    page = Homepage()
    page.feed((out / "index.html").read_text(encoding="utf-8"))
    if not page.main_is_focusable or urljoin(BASE, "#main") not in page.links:
        raise ValueError("Export needs a skip link to a focusable main landmark")
    if urljoin(BASE, RESUME) not in page.links:
        raise ValueError("Export does not link the generated résumé")
    if any(urljoin(BASE, poster) not in page.images for poster in POSTERS):
        raise ValueError("Export does not reference all three local poster images")

    hashes = {}
    for name in (RESUME, *POSTERS):
        content = (out / name).read_bytes()
        signature = b"%PDF-" if name == RESUME else b"\x89PNG\r\n\x1a\n"
        if not content.startswith(signature) or content != (public / name).read_bytes():
            raise ValueError(
                f"Export asset does not match its generated or tracked source: {name}"
            )
        hashes[name] = hashlib.sha256(content).hexdigest()
    return {"source_commit": source_commit, "assets_sha256": hashes}


if __name__ == "__main__":
    source = check_output(["git", "rev-parse", "HEAD"], text=True).strip()
    out = Path("out")
    manifest = verify_export(out, Path("public"), source)
    (out / "build-provenance.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Verified Pages artifact from {manifest['source_commit']}")
