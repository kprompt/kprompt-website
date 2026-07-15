export const SITE = {
  name: "kprompt",
  domain: "kprompt.ai",
  url: "https://kprompt.ai",
  tagline: "Talk to Your Cluster.",
  description:
    "Open-source AI platform to control Kubernetes with natural language. Deploy, debug, scale, and automate — like GitHub Copilot for Kubernetes.",
  github: "https://github.com/kprompt/kprompt",
  docs: "https://github.com/kprompt/kprompt",
  getStarted: "#get-started",
  installCommand: "curl -fsSL https://kprompt.ai/install | bash",
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
