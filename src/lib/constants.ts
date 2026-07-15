/** Live public origin until kprompt.ai DNS is attached in Vercel. */
const LIVE_ORIGIN = "https://kprompt-website.vercel.app";

export const SITE = {
  name: "kprompt",
  /** Brand domain (not yet registered / DNS not attached). */
  domain: "kprompt.ai",
  /** Canonical site URL used for metadata, OG, and install CTA. */
  url: LIVE_ORIGIN,
  tagline: "Talk to Your Cluster.",
  description:
    "Open-source AI platform to control Kubernetes with natural language. Deploy, debug, scale, and automate — like GitHub Copilot for Kubernetes.",
  github: "https://github.com/kprompt/kprompt",
  docs: "https://github.com/kprompt/kprompt",
  getStarted: "#get-started",
  installCommand: `curl -fsSL ${LIVE_ORIGIN}/install | bash`,
  /** Stable fallback that does not depend on the website host. */
  installCommandGitHub:
    "curl -fsSL https://raw.githubusercontent.com/kprompt/kprompt/main/install/install.sh | bash",
} as const;

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it Works" },
  { href: "#cli", label: "CLI" },
  { href: "#why", label: "Why" },
] as const;

export const INSTALL_STEPS = [
  "Install the CLI",
  "Connect your kubeconfig",
  "Prompt your cluster",
] as const;
