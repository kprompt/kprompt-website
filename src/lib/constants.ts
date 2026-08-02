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
    "AI SRE for Kubernetes — investigate, why, timeline, and impact on demand; optional Observe agent always on. Plan safe actions, apply only with approval. Open-source CLI. Experimental.",
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
  /** AI SRE investigate → finding → plan clip. */
  investigateDemoGif: "/kprompt-investigate-demo.gif",
  investigateDemoWebm: "/kprompt-investigate-demo.webm",
  investigateDemoMp4: "/kprompt-investigate-demo.mp4",
  investigateDemoPoster: "/kprompt-investigate-demo-poster.jpg",
  /** AI SRE why — named cause finding. */
  whyDemoGif: "/kprompt-why-demo.gif",
  whyDemoWebm: "/kprompt-why-demo.webm",
  whyDemoMp4: "/kprompt-why-demo.mp4",
  whyDemoPoster: "/kprompt-why-demo-poster.jpg",
  /** AI SRE timeline — ordered events. */
  timelineDemoGif: "/kprompt-timeline-demo.gif",
  timelineDemoWebm: "/kprompt-timeline-demo.webm",
  timelineDemoMp4: "/kprompt-timeline-demo.mp4",
  timelineDemoPoster: "/kprompt-timeline-demo-poster.jpg",
  /** AI SRE impact — blast radius. */
  impactDemoGif: "/kprompt-impact-demo.gif",
  impactDemoWebm: "/kprompt-impact-demo.webm",
  impactDemoMp4: "/kprompt-impact-demo.mp4",
  impactDemoPoster: "/kprompt-impact-demo-poster.jpg",
  /** AI SRE approve → verify post-apply. */
  verifyDemoGif: "/kprompt-verify-demo.gif",
  verifyDemoWebm: "/kprompt-verify-demo.webm",
  verifyDemoMp4: "/kprompt-verify-demo.mp4",
  verifyDemoPoster: "/kprompt-verify-demo-poster.jpg",
  /** VS Code PlanResult review → Approve via CLI. */
  ideDemoGif: "/kprompt-ide-demo.gif",
  ideDemoWebm: "/kprompt-ide-demo.webm",
  ideDemoMp4: "/kprompt-ide-demo.mp4",
  ideDemoPoster: "/kprompt-ide-demo-poster.jpg",
  /** GitOps drift scan → approve-gated sync. */
  driftDemoGif: "/kprompt-drift-demo.gif",
  driftDemoWebm: "/kprompt-drift-demo.webm",
  driftDemoMp4: "/kprompt-drift-demo.mp4",
  driftDemoPoster: "/kprompt-drift-demo-poster.jpg",
  /** Multi-context read fan-out + per-context approve gate. */
  multiClusterDemoGif: "/kprompt-multi-cluster-demo.gif",
  multiClusterDemoWebm: "/kprompt-multi-cluster-demo.webm",
  multiClusterDemoMp4: "/kprompt-multi-cluster-demo.mp4",
  multiClusterDemoPoster: "/kprompt-multi-cluster-demo-poster.jpg",
  /** Hero plan-deny aha clip — wipe hard-deny → scale PlanResult → y/N. */
  planDenyGif: "/kprompt-plan-deny.gif",
  planDenyWebm: "/kprompt-plan-deny.webm",
  planDenyMp4: "/kprompt-plan-deny.mp4",
  planDenyPoster: "/kprompt-plan-deny-poster.jpg",
} as const;

export const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/team", label: "Team" },
  { href: SITE.app, label: "App", external: true },
] as const;

export const INSTALL_STEPS = [
  "Install the CLI",
  "Clone kprompt-examples",
  "make walkthrough ($0)",
  "Ollama or BYOK for NL (optional)",
] as const;
