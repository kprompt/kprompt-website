export const THEME_STORAGE_KEY = "kprompt-theme";

export type ThemePreference = "light" | "dark" | "system";

export function resolveTheme(preference: ThemePreference): "light" | "dark" {
  if (preference === "light" || preference === "dark") return preference;
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyThemeClass(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

/**
 * Inline bootstrap — run before paint to avoid FOUC.
 * Dark-first: unset preference defaults to dark; `system` follows OS; `light` stays light.
 */
export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var dark;if(t==='light')dark=false;else if(t==='dark')dark=true;else if(t==='system')dark=window.matchMedia('(prefers-color-scheme: dark)').matches;else dark=true;if(dark)document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`;
