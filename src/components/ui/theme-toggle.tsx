"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import {
  THEME_STORAGE_KEY,
  applyThemeClass,
  resolveTheme,
  type ThemePreference,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    /* ignore */
  }
  return "system";
}

export function ThemeToggle({ className }: { className?: string }) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const pref = readPreference();
    setPreference(pref);
    setResolved(resolveTheme(pref));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const next = resolveTheme(preference);
    setResolved(next);
    applyThemeClass(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, preference);
    } catch {
      /* ignore */
    }
  }, [preference, mounted]);

  useEffect(() => {
    if (preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const next = resolveTheme("system");
      setResolved(next);
      applyThemeClass(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [preference]);

  const toggle = () => {
    setPreference(resolved === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
      aria-label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={resolved === "dark" ? "Light mode" : "Dark mode"}
    >
      {mounted && resolved === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
}
