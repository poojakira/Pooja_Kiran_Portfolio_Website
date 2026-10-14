"""Synchronize flagship poster PNGs from immutable, hash-checked GitHub sources.

Only the exact repository/commit/image listed in docs/poster_sources.json is
trusted. Git blob SHA checks compare complete bytes, not appearance or OCR.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "docs" / "poster_sources.json"
PNG_MAGIC = b"\x89PNG\r\n\x1a\n"


def git_blob_sha(data: bytes) -> str:
    header = b"blob " + str(len(data)).encode("ascii") + b"\x00"
    return hashlib.sha1(header + data).hexdigest()  # noqa: S324 (Git object ID)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sync", action="store_true", help="Fetch verified source PNGs")
    args = parser.parse_args()

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if manifest["schema_version"] != 1:
        raise SystemExit("Unsupported poster source schema")

    for source in manifest["sources"]:
        name = source["file"]
        if Path(name).name != name or not name.endswith(".png"):
            raise SystemExit(f"Unsafe output filename: {name}")
        target = ROOT / "public" / name
        expected = source["git_blob_sha"]
        if args.sync:
            commit = source["commit"]
            repository = source["repository"]
            if len(commit) != 40 or len(expected) != 40:
                raise SystemExit(f"Expected full Git SHAs for {name}")
            if not all(c in "0123456789abcdef" for c in commit + expected):
                raise SystemExit(f"Invalid Git object ID for {name}")
            if not repository.replace("-", "").isalnum():
                raise SystemExit(f"Invalid source repository for {name}")
            url = (
                f"https://raw.githubusercontent.com/poojakira/"
                f"{repository}/{commit}/poster/poster.png"
            )
            req = Request(url, headers={"User-Agent": "poster-evidence-sync/1.0"})
            with urlopen(req, timeout=45) as response:
                image = response.read(15_000_001)
            if len(image) > 15_000_000 or not image.startswith(PNG_MAGIC):
                raise SystemExit(f"Invalid PNG or oversized image for {name}")
            if git_blob_sha(image) != expected:
                raise SystemExit(f"Source image hash mismatch for {name}")
            target.write_bytes(image)
        if not target.exists() or git_blob_sha(target.read_bytes()) != expected:
            raise SystemExit(f"Portfolio PNG does not match pinned source: {name}")
        print(f"{name}: pinned Git blob {expected} verified")


if __name__ == "__main__":
    main()
