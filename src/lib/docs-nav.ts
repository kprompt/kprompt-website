export type DocsNavItem = {
  href: string;
  label: string;
};

export const DOCS_NAV: DocsNavItem[] = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/install", label: "Install" },
  { href: "/docs/quickstart", label: "Quickstart" },
  { href: "/docs/commands", label: "Commands" },
  { href: "/docs/safety", label: "Safety" },
  { href: "/docs/providers", label: "Providers" },
  { href: "/docs/ci", label: "CI / JSON" },
];
