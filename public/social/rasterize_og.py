#!/usr/bin/env python3
"""Rasterize social-preview.svg + x-banner.svg → OG / social / org banner PNGs.

Run from this directory after `python3 -m venv .venv && .venv/bin/pip install playwright
&& .venv/bin/playwright install chromium`:

  .venv/bin/python rasterize_og.py
"""

from __future__ import annotations

import asyncio
from pathlib import Path

from playwright.async_api import async_playwright

HERE = Path(__file__).resolve().parent
REPOS = HERE.parents[2]  # …/github/kprompt
OG_SVG = REPOS / "kprompt/.github/assets/social-preview.svg"
BANNER_SVG = HERE / "x-banner.svg"

TARGETS = [
    (OG_SVG, REPOS / "kprompt/.github/assets/social-preview.png", 1280, 640),
    (OG_SVG, REPOS / "kprompt-website/public/og.png", 1200, 630),
    (OG_SVG, REPOS / "kprompt-github/profile/assets/og.png", 1200, 630),
    (BANNER_SVG, HERE / "x-banner.png", 1500, 500),
    (BANNER_SVG, REPOS / "kprompt-github/profile/assets/banner.png", 1500, 500),
]


async def rasterize(svg_text: str, out: Path, width: int, height: int) -> None:
    html = f"""<!doctype html><html><head><style>
      html,body{{margin:0;padding:0;background:#0b1220;width:{width}px;height:{height}px;overflow:hidden}}
      svg{{display:block;width:{width}px;height:{height}px}}
    </style></head><body>{svg_text}</body></html>"""
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=["--disable-dev-shm-usage"])
        page = await browser.new_page(
            viewport={"width": width, "height": height},
            device_scale_factor=1,
        )
        await page.set_content(html, wait_until="load")
        await page.wait_for_timeout(150)
        out.parent.mkdir(parents=True, exist_ok=True)
        await page.screenshot(path=str(out), type="png")
        await browser.close()
    print(f"Wrote {out} ({out.stat().st_size // 1024} KB)", flush=True)


async def main() -> None:
    cache: dict[Path, str] = {}
    for svg_path, out, w, h in TARGETS:
        if svg_path not in cache:
            svg = svg_path.read_text(encoding="utf-8")
            if svg.startswith("<?xml"):
                svg = svg.split("?>", 1)[1].strip()
            cache[svg_path] = svg
        await rasterize(cache[svg_path], out, w, h)


if __name__ == "__main__":
    asyncio.run(main())
