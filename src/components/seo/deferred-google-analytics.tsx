"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

/** Load GA after idle so it does not compete with LCP / hydration. */
export function DeferredGoogleAnalytics({ gaId }: { gaId: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(enable, 2500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
