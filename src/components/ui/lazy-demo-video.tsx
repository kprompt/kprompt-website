"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type LazyDemoVideoProps = {
  webm: string;
  mp4: string;
  poster: string;
  "aria-label": string;
  /** Short caption used for the captions track (a11y). */
  transcript?: string;
  className?: string;
  /** Load and autoplay immediately (hero). Default: wait until near viewport. */
  eager?: boolean;
  width?: number;
  height?: number;
};

function captionsDataUri(text: string): string {
  const body = [
    "WEBVTT",
    "",
    "00:00:00.000 --> 00:00:59.000",
    text.replace(/\r?\n/g, " "),
    "",
  ].join("\n");
  return `data:text/vtt,${encodeURIComponent(body)}`;
}

/**
 * Demo clip that keeps the poster cheap until the element is near the viewport
 * (or eager). Sources are omitted until then so below-fold demos do not compete
 * with LCP.
 */
export function LazyDemoVideo({
  webm,
  mp4,
  poster,
  "aria-label": ariaLabel,
  transcript,
  className,
  eager = false,
  width = 1280,
  height = 720,
}: LazyDemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const captionsSrc = useMemo(
    () => captionsDataUri(transcript?.trim() || ariaLabel),
    [transcript, ariaLabel]
  );

  useEffect(() => {
    if (eager || shouldLoad) return;
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    const el = videoRef.current;
    if (!el) return;
    void el.play().catch(() => {
      /* autoplay can be blocked; poster remains */
    });
  }, [shouldLoad, webm, mp4]);

  return (
    <video
      ref={videoRef}
      className={cn("mx-auto h-auto w-full", className)}
      width={width}
      height={height}
      autoPlay={shouldLoad}
      muted
      loop
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
      poster={poster}
      aria-label={ariaLabel}
    >
      {shouldLoad ? (
        <>
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </>
      ) : null}
      <track
        kind="captions"
        srcLang="en"
        label="English"
        src={captionsSrc}
        default
      />
    </video>
  );
}
