export const THEME_STORAGE_KEY = "kprompt-theme";

export type ThemePreference = "light" | "dark" | "system";

export function resolveTheme(preference: ThemePreference): "light" | "dark" {
  if (preference === "light" || preference === "dark") return preference;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyThemeClass(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

/** Inline bootstrap — run before paint to avoid FOUC. */
export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;
