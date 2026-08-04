#!/usr/bin/env python3
"""Rasterize youtube-banner.svg → PNG (2048×1152, under 6 MB for YouTube).

  cd kprompt-website/public/social
  python -m venv .venv
  .venv\\Scripts\\pip install playwright pillow
  .venv\\Scripts\\playwright install chromium
  .venv\\Scripts\\python render_youtube_banner.py
"""

from __future__ import annotations

import asyncio
from pathlib import Path

from playwright.async_api import async_playwright

HERE = Path(__file__).resolve().parent
SVG = HERE / "youtube-banner.svg"
OUT = HERE / "youtube-banner.png"
WIDTH = 2048
HEIGHT = 1152
MAX_BYTES = 6 * 1024 * 1024


async def rasterize() -> None:
    svg = SVG.read_text(encoding="utf-8")
    if svg.startswith("<?xml"):
        svg = svg.split("?>", 1)[1].strip()
    html = f"""<!doctype html><html><head><style>
      html,body{{margin:0;padding:0;background:#0b1220;width:{WIDTH}px;height:{HEIGHT}px;overflow:hidden}}
      svg{{display:block;width:{WIDTH}px;height:{HEIGHT}px}}
    </style></head><body>{svg}</body></html>"""
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=["--disable-dev-shm-usage"])
        page = await browser.new_page(
            viewport={"width": WIDTH, "height": HEIGHT},
            device_scale_factor=1,
        )
        await page.set_content(html, wait_until="load")
        await page.wait_for_timeout(200)
        await page.screenshot(path=str(OUT), type="png")
        await browser.close()

    size = OUT.stat().st_size
    print(f"Wrote {OUT} ({size // 1024} KB, {WIDTH}x{HEIGHT})")
    if size > MAX_BYTES:
        raise SystemExit(f"File exceeds 6 MB ({size / (1024*1024):.2f} MB)")


if __name__ == "__main__":
    asyncio.run(rasterize())
