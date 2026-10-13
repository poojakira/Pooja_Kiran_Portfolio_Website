"""Read-only verification of exactly three owner-scoped, pinned poster copies."""

import hashlib
import json
import re
import sys
import urllib.request
from pathlib import Path

EXPECTED = {
    "mcp-agent-security-gateway": "public/mcp-poster.png",
    "aws-agent-identity-guard": "public/iam-poster.png",
    "hf-model-provenance-scanner": "public/provenance-poster.png",
}


def verify(root: Path, records, *, local_only: bool = False):
    if not isinstance(records, list) or len(records) != len(EXPECTED):
        raise ValueError("exactly three source records required")
    seen = set()
    for entry in records:
        if not isinstance(entry, dict):
            raise ValueError("invalid source record")
        repo = entry.get("repository")
        if repo not in EXPECTED or repo in seen:
            raise ValueError("unknown or duplicate repository")
        seen.add(repo)
        if entry.get("portfolio_path") != EXPECTED[repo]:
            raise ValueError("repository-to-portfolio path mismatch")
        if entry.get("path") != "poster/poster.png":
            raise ValueError("unexpected source path")
        if not re.fullmatch(r"[0-9a-f]{40}", str(entry.get("commit", ""))):
            raise ValueError("full immutable commit required")
        if not re.fullmatch(r"[0-9a-f]{64}", str(entry.get("sha256", ""))):
            raise ValueError("SHA-256 digest required")
        content = (root / EXPECTED[repo]).read_bytes()
        if hashlib.sha256(content).hexdigest() != entry["sha256"]:
            raise ValueError("local poster hash mismatch")
        if not local_only:
            url = ("https://raw.githubusercontent.com/poojakira/" + repo
                   + "/" + entry["commit"] + "/poster/poster.png")
            with urllib.request.urlopen(url, timeout=30) as response:
                remote = response.read(8 * 1024 * 1024 + 1)
            if len(remote) > 8 * 1024 * 1024 or remote != content:
                raise ValueError("pinned source poster differs from portfolio copy")
    return True


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    records = json.loads((root / "docs/POSTER_SOURCE_PINS.json").read_text())
    local_only = "--local-only" in sys.argv
    verify(root, records, local_only=local_only)
    print("Three local pinned hashes match; remote sources not checked" if local_only
          else "Three portfolio posters match their immutable source copies")
