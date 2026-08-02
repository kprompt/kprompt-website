#!/usr/bin/env python3
"""Capture a seekable HTML clip via Playwright → MP4 / WebM / GIF / poster.

Usage:
  .venv/bin/python render_clip.py why.html kprompt-why-demo
  .venv/bin/python render_clip.py timeline.html kprompt-timeline-demo
"""

from __future__ import annotations

import argparse
import asyncio
import subprocess
import tempfile
from pathlib import Path

from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent
OUT_DIR = ROOT.parent  # public/
FPS = 20
WIDTH = 1280
HEIGHT = 720


async def capture_frames(html: Path, tmp: Path, duration: float) -> int:
    frames = int(duration * FPS)
    html_url = html.as_uri()
    print(f"Capturing {frames} frames from {html.name}…", flush=True)

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


def encode(tmp: Path, frames: int, prefix: str) -> None:
    pattern = str(tmp / "frame_%05d.png")
    mp4 = OUT_DIR / f"{prefix}.mp4"
    webm = OUT_DIR / f"{prefix}.webm"
    gif = OUT_DIR / f"{prefix}.gif"
    poster = OUT_DIR / f"{prefix}-poster.jpg"

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


async def render_one(html: Path, prefix: str, duration: float | None) -> None:
    with tempfile.TemporaryDirectory(prefix=f"kprompt-{prefix}-") as tmp:
        tmp_path = Path(tmp)
        # Probe duration from HTML if not provided
        dur = duration
        if dur is None:
            async with async_playwright() as p:
                browser = await p.chromium.launch(args=["--disable-dev-shm-usage"])
                page = await browser.new_page()
                await page.goto(html.as_uri(), wait_until="domcontentloaded")
                await page.wait_for_function("typeof window.__DURATION === 'number'")
                dur = float(await page.evaluate("window.__DURATION"))
                await browser.close()
        frames = await capture_frames(html, tmp_path, dur)
        encode(tmp_path, frames, prefix)


async def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("html", type=Path, help="HTML file under public/social/")
    parser.add_argument("prefix", help="Output basename under public/ (no extension)")
    parser.add_argument("--duration", type=float, default=None, help="Override window.__DURATION")
    args = parser.parse_args()

    html = args.html if args.html.is_absolute() else ROOT / args.html
    if not html.exists():
        raise SystemExit(f"Missing HTML: {html}")

    await render_one(html, args.prefix, args.duration)


if __name__ == "__main__":
    asyncio.run(main())
