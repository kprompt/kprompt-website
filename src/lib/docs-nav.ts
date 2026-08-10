export type DocsNavItem = {
  href: string;
  label: string;
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

/** Grouped docs sidebar — keep sections short and scan-friendly. */
export const DOCS_NAV_SECTIONS: DocsNavSection[] = [
  {
    title: "Start",
    items: [
      { href: "/docs", label: "Overview" },
      { href: "/docs/install", label: "Install" },
      { href: "/docs/quickstart", label: "Quickstart" },
      { href: "/docs/init", label: "Init" },
      { href: "/docs/demo", label: "Demo" },
    ],
  },
  {
    title: "CLI",
    items: [
      { href: "/docs/commands", label: "Commands" },
      { href: "/docs/safety", label: "Safety" },
      { href: "/docs/providers", label: "Providers" },
      { href: "/docs/themes", label: "Themes" },
      { href: "/docs/ci", label: "CI / JSON" },
      { href: "/docs/mcp", label: "MCP" },
    ],
  },
  {
    title: "Cluster",
    items: [
      { href: "/docs/integrations", label: "Integrations" },
      { href: "/docs/setup", label: "Setup" },
      { href: "/docs/multi-cluster", label: "Multi-cluster" },
      { href: "/docs/dash", label: "Local dash" },
    ],
  },
  {
    title: "Platform",
    items: [
      { href: "/docs/architecture", label: "Architecture" },
      { href: "/docs/agent", label: "Observe agent" },
      { href: "/docs/team", label: "Team" },
      { href: "/docs/runs", label: "App runs" },
      { href: "/docs/roadmap", label: "Roadmap" },
    ],
  },
];

/** Flat list in sidebar order — sitemap, breadcrumbs, etc. */
export const DOCS_NAV: DocsNavItem[] = DOCS_NAV_SECTIONS.flatMap(
  (section) => section.items
);
