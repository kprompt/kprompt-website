const LIVE_ORIGIN = "https://kprompt.ai";

export const SITE = {
  name: "kprompt",
  domain: "kprompt.ai",
  /** Canonical site URL used for metadata, OG, and install CTA. */
  url: LIVE_ORIGIN,
  tagline: "Talk to Your Cluster.",
  description:
    "Open-source Kubernetes CLI: natural language → reviewable plans → approve before apply. Day-2 ops, integrations, optimize/graph — building toward AI SRE investigation.",
  github: "https://github.com/kprompt/kprompt",
  /** Team web surface (authenticated). */
  app: "https://app.kprompt.ai",
  docs: "/docs",
  getStarted: "/docs/quickstart",
  roadmap: "/docs/roadmap",
  /** Short maturity line for hero / banners. */
  maturityLabel: "Experimental",
  maturityNotice:
    "Early software. Always review the plan before apply, prefer non-production clusters first, and treat --approve with care.",
  /** GA4 — public client id; override with NEXT_PUBLIC_GA_MEASUREMENT_ID if needed. */
  gaMeasurementId: "G-E4624KGSE9",
  installCommand: `curl -fsSL ${LIVE_ORIGIN}/install | bash`,
  /** Homebrew tap (official release binaries). */
  installCommandBrew: "brew install kprompt/tap/kprompt",
  /** Tag-pinned CDN fallback if the site is unreachable. */
  installCommandGitHub:
    "curl -fsSL https://cdn.jsdelivr.net/gh/kprompt/kprompt@v0.4.0/install/install.sh | bash",
} as const;

export const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/team", label: "Team" },
  { href: SITE.app, label: "App", external: true },
] as const;

export const NORTH_STAR_PROMPTS = [
  'kprompt "deploy my app"',
  'kprompt "why is production slow"',
  'kprompt "optimize my cluster"',
  'kprompt "show service dependency graph"',
] as const;

/** Homepage teaser only — full detail on /docs/roadmap. */
export const ROADMAP_TEASER = {
  lead: "Intent compiler today. AI SRE next — still plan → approve → apply, never a silent controller.",
  pillars: [
    {
      label: "Now",
      title: "Shipped",
      blurb:
        "Plan/approve loop, deep explain, Helm through GitOps, optimize & graphs, aliases, optional Team enrollment.",
    },
    {
      label: "Next",
      title: "Trust & investigate",
      blurb:
        "Blast-radius, post-apply verify, multi-hop investigate / why / timeline, audit and GitOps PR mode.",
    },
    {
      label: "Later",
      title: "Proactive & fleet",
      blurb:
        "Opt-in local watch, multi-cluster fan-out without uploading kubeconfig, Team app Insights polish.",
    },
  ],
} as const;

export const INSTALL_STEPS = [
  "Install the CLI",
  "Configure defaults",
  "Set an LLM API key",
  "Prompt your cluster",
] as const;
