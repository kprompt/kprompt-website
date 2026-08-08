type GtagWindow = Window & {
  gtag?: (
    command: "event",
    action: string,
    params?: Record<string, unknown>
  ) => void;
};

/**
 * Send a GA4 custom event. No-ops on the server or before GA has loaded, so
 * callers never need to guard for availability.
 */
export function track(action: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", action, params);
}
