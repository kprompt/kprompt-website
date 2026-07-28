#!/usr/bin/env python3
"""Capture t-driven promo.html via Playwright → MP4 (cinematic pass)."""

from __future__ import annotations

import asyncio
import subprocess
import sys
import tempfile
from pathlib import Path

from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent
HTML = ROOT / "promo.html"
FPS = 20
DURATION = 26.0


async def render(path: Path, width: int, height: int, square: bool) -> None:
    frames = int(DURATION * FPS)
    html_url = HTML.as_uri()
    print(f"Capturing {frames} frames → {path.name} ({width}x{height})…", flush=True)

    with tempfile.TemporaryDirectory(prefix="kprompt-promo2-") as tmp:
        tmp_path = Path(tmp)

        async with async_playwright() as p:
            browser = await p.chromium.launch(args=["--disable-dev-shm-usage"])
            page = await browser.new_page(
                viewport={"width": width, "height": height},
                device_scale_factor=1,
            )
            await page.goto(html_url, wait_until="domcontentloaded", timeout=30000)
            await page.wait_for_function("typeof window.__seek === 'function'")
            await page.wait_for_timeout(200)

            stage = page.locator("#stage")
            for i in range(frames):
                t = i / FPS
                await page.evaluate(
                    """([t, square]) => window.__seek(t, square)""",
                    [t, square],
                )
                await stage.screenshot(path=str(tmp_path / f"frame_{i:05d}.png"), type="png")
                if i % 40 == 0:
                    print(f"  {i}/{frames}", flush=True)

            await browser.close()

        print("Encoding…", flush=True)
        cmd = [
            "ffmpeg", "-y",
            "-framerate", str(FPS),
            "-i", str(tmp_path / "frame_%05d.png"),
            "-c:v", "libx264",
            "-pix_fmt", "yuv420p",
            "-crf", "17",
            "-movflags", "+faststart",
            str(path),
        ]
        subprocess.run(cmd, check=True, capture_output=True)
        print(f"Wrote {path} ({path.stat().st_size // 1024} KB)", flush=True)


async def main() -> None:
    only = sys.argv[1] if len(sys.argv) > 1 else "both"
    if only in ("16x9", "both"):
        await render(ROOT / "kprompt-promo-16x9.mp4", 1920, 1080, False)
    if only in ("1x1", "both"):
        await render(ROOT / "kprompt-promo-1x1.mp4", 1080, 1080, True)


if __name__ == "__main__":
    asyncio.run(main())
