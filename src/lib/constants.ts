const LIVE_ORIGIN = "https://kprompt.ai";

/** Single source of truth for the released CLI version referenced across metadata. */
const CLI_VERSION = "0.7.0";

export const SITE = {
  name: "kprompt",
  domain: "kprompt.ai",
  /** Latest released CLI version — keep in sync with GitHub Releases. */
  version: CLI_VERSION,
  license: "Apache-2.0",
  licenseUrl: "https://github.com/kprompt/kprompt/blob/main/LICENSE",
  releases: "https://github.com/kprompt/kprompt/releases",
  /** Canonical site URL used for metadata, OG, and install CTA. */
  url: LIVE_ORIGIN,
  tagline: "The AI Runtime for Kubernetes",
  description:
    "The AI Runtime for Kubernetes — observe your cluster, reason about what's happening, plan safe actions, execute with approval, and continuously improve. Open-source CLI + optional Observe agent. Experimental.",
  github: "https://github.com/kprompt/kprompt",
  /** Product account on X. */
  twitter: "https://x.com/kpromptai",
  twitterHandle: "@kpromptai",
  /** Official LinkedIn company page. */
  linkedin: "https://www.linkedin.com/company/kprompt",
  /** Product account on Bluesky. */
  bluesky: "https://bsky.app/profile/kprompt.bsky.social",
  blueskyHandle: "@kprompt.bsky.social",
  /** Public contact inbox — forwarded, so it is safe to publish. */
  email: "hello@kprompt.ai",
  /** Runnable kind demos for the Observe agent. */
  examples: "https://github.com/kprompt/kprompt-examples",
  /** Team web surface (authenticated). */
  app: "https://app.kprompt.ai",
  docs: "/docs",
  /**
   * Primary get-started CTA — zero-LLM kind walkthrough first.
   * LLM BYOK path is a “level up” section on the same page.
   */
  getStarted: "/docs/quickstart",
  /** Secondary CTA — configure a provider key and run NL prompts. */
  levelUp: "/docs/quickstart#with-llm",
  roadmap: "/docs/roadmap",
  /** Short maturity line for hero / banners. */
  maturityLabel: "Experimental",
  maturityNotice:
    "Early software. Always review the plan before apply, prefer non-production clusters first, and treat --approve with care.",
  /** Primary CTA label — avoid “Start Free” (implies Team signup). */
  ctaPrimary: "Try walkthrough",
  ctaSecondary: "Add your LLM",
  /** GA4 — public client id; override with NEXT_PUBLIC_GA_MEASUREMENT_ID if needed. */
  gaMeasurementId: "G-E4624KGSE9",
  installCommand: `curl -fsSL ${LIVE_ORIGIN}/install | bash`,
  /** Homebrew tap (official release binaries). */
  installCommandBrew: "brew install kprompt/tap/kprompt",
  /** Tag-pinned CDN fallback if the site is unreachable. */
  installCommandGitHub: `curl -fsSL https://cdn.jsdelivr.net/gh/kprompt/kprompt@v${CLI_VERSION}/install/install.sh | bash`,
  /** One-liner shown under hero CTAs. */
  walkthroughHint: "No API key · kind cluster · ~60 seconds",
  /** Observe agent kind walkthrough — video preferred; GIF kept as legacy fallback. */
  observeDemoGif: "/kprompt-observe-demo.gif",
  observeDemoWebm: "/kprompt-observe-demo.webm",
  observeDemoMp4: "/kprompt-observe-demo.mp4",
  observeDemoPoster: "/kprompt-observe-demo-poster.jpg",
} as const;

export const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/team", label: "Team" },
  { href: SITE.app, label: "App", external: true },
] as const;

export const NORTH_STAR_PROMPTS = [
  "kprompt run",
  'kprompt "why is production slow"',
  'kprompt "optimize my cluster"',
  "kprompt agent run -n payments --health --heuristic",
] as const;

/** Homepage teaser only — full detail on /docs/roadmap. */
export const ROADMAP_TEASER = {
  lead: "AI Runtime for Kubernetes: plan-gated CLI today, optional Observe agent in-cluster, Namespace Agents and Coordinator next — still Reason → Plan → Validate → Approve → Execute. Never a silent healer by default.",
  pillars: [
    {
      label: "Now",
      title: "Shipped",
      blurb:
        "Plan/approve CLI, investigate/why/timeline, incident suggest packs (approve-gated), and the Observe agent (Helm/Operator). Autopilot is propose-only.",
    },
    {
      label: "Next",
      title: "Trust & agents",
      blurb:
        "Richer Namespace Agents, Coordinator correlation, knowledge graph / incident memory, Autopilot proposal → human apply bridge.",
    },
    {
      label: "Later",
      title: "Slack, PolicyAuto & fleet",
      blurb:
        "Bidirectional Slack ask on Observe, Autopilot apply behind ADR-0015 gates, multi-cluster fan-out without uploading kubeconfig, Team Insights polish.",
    },
  ],
} as const;

export const INSTALL_STEPS = [
  "Install the CLI",
  "Clone kprompt-examples",
  "make walkthrough (no API key)",
  "Level up — add your LLM (optional)",
] as const;
