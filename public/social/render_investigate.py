#!/usr/bin/env python3
"""Capture investigate.html via Playwright → MP4 / WebM / GIF / poster."""

from __future__ import annotations

import asyncio
import subprocess
import tempfile
from pathlib import Path

from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent
HTML = ROOT / "investigate.html"
OUT_DIR = ROOT.parent  # public/
FPS = 20
WIDTH = 1280
HEIGHT = 720
DURATION = 20.0


async def capture_frames(tmp: Path, duration: float) -> int:
    frames = int(duration * FPS)
    html_url = HTML.as_uri()
    print(f"Capturing {frames} frames ({WIDTH}x{HEIGHT})…", flush=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(args=["--disable-dev-shm-usage"])
        page = await browser.new_page(
            viewport={"width": WIDTH, "height": HEIGHT},
            device_scale_factor=1,
        )
        await page.goto(html_url, wait_until="domcontentloaded", timeout=30000)
        await page.wait_for_function("typeof window.__seek === 'function'")
        await page.wait_for_timeout(150)

        stage = page.locator("#stage")
        for i in range(frames):
            t = i / FPS
            await page.evaluate("t => window.__seek(t)", t)
            await stage.screenshot(path=str(tmp / f"frame_{i:05d}.png"), type="png")
            if i % 40 == 0:
                print(f"  {i}/{frames}", flush=True)
        await browser.close()
    return frames


def encode(tmp: Path, frames: int) -> None:
    pattern = str(tmp / "frame_%05d.png")
    mp4 = OUT_DIR / "kprompt-investigate-demo.mp4"
    webm = OUT_DIR / "kprompt-investigate-demo.webm"
    gif = OUT_DIR / "kprompt-investigate-demo.gif"
    poster = OUT_DIR / "kprompt-investigate-demo-poster.jpg"

    print("Encoding MP4…", flush=True)
    subprocess.run(
        [
            "ffmpeg", "-y",
            "-framerate", str(FPS),
            "-i", pattern,
            "-c:v", "libx264",
            "-pix_fmt", "yuv420p",
            "-crf", "18",
            "-movflags", "+faststart",
            str(mp4),
        ],
        check=True,
        capture_output=True,
    )

    print("Encoding WebM…", flush=True)
    subprocess.run(
        [
            "ffmpeg", "-y",
            "-framerate", str(FPS),
            "-i", pattern,
            "-c:v", "libvpx-vp9",
            "-b:v", "0",
            "-crf", "32",
            "-an",
            str(webm),
        ],
        check=True,
        capture_output=True,
    )

    mid = frames // 2
    print("Poster + GIF…", flush=True)
    subprocess.run(
        ["ffmpeg", "-y", "-i", str(tmp / f"frame_{mid:05d}.png"), "-q:v", "3", str(poster)],
        check=True,
        capture_output=True,
    )
    palette = tmp / "palette.png"
    subprocess.run(
        [
            "ffmpeg", "-y",
            "-framerate", str(FPS),
            "-i", pattern,
            "-vf", "fps=10,scale=960:-1:flags=lanczos,palettegen=stats_mode=diff",
            str(palette),
        ],
        check=True,
        capture_output=True,
    )
    subprocess.run(
        [
            "ffmpeg", "-y",
            "-framerate", str(FPS),
            "-i", pattern,
            "-i", str(palette),
            "-lavfi", "fps=10,scale=960:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5",
            "-loop", "0",
            str(gif),
        ],
        check=True,
        capture_output=True,
    )

    for p in (mp4, webm, gif, poster):
        print(f"Wrote {p.name} ({p.stat().st_size // 1024} KB)", flush=True)


async def main() -> None:
    with tempfile.TemporaryDirectory(prefix="kprompt-investigate-") as tmp:
        tmp_path = Path(tmp)
        frames = await capture_frames(tmp_path, DURATION)
        encode(tmp_path, frames)


if __name__ == "__main__":
    asyncio.run(main())
