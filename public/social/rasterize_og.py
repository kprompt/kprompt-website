#!/usr/bin/env python3
"""Rasterize CLI social-preview.svg → OG / social-preview PNGs.

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
SVG = REPOS / "kprompt/.github/assets/social-preview.svg"

TARGETS = [
    (REPOS / "kprompt/.github/assets/social-preview.png", 1280, 640),
    (REPOS / "kprompt-website/public/og.png", 1200, 630),
    (REPOS / "kprompt-github/profile/assets/og.png", 1200, 630),
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
        await page.screenshot(path=str(out), type="png")
        await browser.close()
    print(f"Wrote {out} ({out.stat().st_size // 1024} KB)", flush=True)


async def main() -> None:
    svg = SVG.read_text()
    if svg.startswith("<?xml"):
        svg = svg.split("?>", 1)[1].strip()
    for out, w, h in TARGETS:
        await rasterize(svg, out, w, h)


if __name__ == "__main__":
    asyncio.run(main())
