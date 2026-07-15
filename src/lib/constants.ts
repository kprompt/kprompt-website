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
  getStarted: "#usage",
  installCommand: `curl -fsSL ${LIVE_ORIGIN}/install | bash`,
  /** Commit-pinned CDN fallback if the site is unreachable. */
  installCommandGitHub:
    "curl -fsSL https://cdn.jsdelivr.net/gh/kprompt/kprompt@6ccb6a4/install/install.sh | bash",
} as const;

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it Works" },
  { href: "#cli", label: "CLI" },
  { href: "#usage", label: "Usage" },
  { href: "#why", label: "Why" },
] as const;

export const INSTALL_STEPS = [
  "Install the CLI",
  "Set an LLM API key",
  "Connect kubeconfig",
  "Prompt your cluster",
] as const;

export const SETUP_STEPS = [
  {
    id: "install",
    title: "Install the CLI",
    description:
      "Downloads the latest release binary into ~/.local/bin (no sudo on macOS).",
    commands: [`curl -fsSL ${LIVE_ORIGIN}/install | bash`],
    note: "If the installer says PATH is missing ~/.local/bin, run the export in the next step.",
  },
  {
    id: "path",
    title: "Put kprompt on your PATH",
    description:
      "Make the binary available in new terminal sessions.",
    commands: [
      'echo \'export PATH="$HOME/.local/bin:$PATH"\' >> ~/.zshrc',
      "source ~/.zshrc",
      "kprompt version",
    ],
    note: "You should see a version like 0.1.0. Then run kprompt config and kprompt config set provider openai.",
  },
  {
    id: "api-key",
    title: "Set an LLM API key",
    description:
      "kprompt needs a model to turn your sentence into a plan. Without a key you get: missing API key for openai.",
    commands: [
      'export KPROMPT_OPENAI_API_KEY="sk-..."',
      'echo \'export KPROMPT_OPENAI_API_KEY="sk-..."\' >> ~/.zshrc',
      'kprompt --provider gemini "list deployments"   # needs KPROMPT_GEMINI_API_KEY',
    ],
    note: "Also supported: anthropic, gemini, groq, mistral, deepseek, openrouter, together, ollama. Example: export KPROMPT_GEMINI_API_KEY=... then kprompt --provider gemini \"list pods\". Keys stay in your shell env — never in ~/.kprompt/config.yaml. Full table: github.com/kprompt/kprompt/blob/main/docs/providers.md",
  },
  {
    id: "kube",
    title: "Connect your cluster",
    description:
      "Uses your existing kubeconfig (same as kubectl).",
    commands: [
      "kubectl config current-context",
      "kubectl get ns",
    ],
    note: "Point KUBECONFIG at another file if needed. Override context with kprompt --context <name> ...",
  },
  {
    id: "prompt",
    title: "Run your first prompts",
    description:
      "Reads run immediately. Mutations show a plan, then ask y/N on a TTY (or use --approve).",
    commands: [
      'kprompt "list deployments" -n default',
      'kprompt "deploy redis" -n default',
      'kprompt "scale redis to 2" -n default --approve',
      'kprompt "explain why redis is crashing" -n default',
    ],
    note: 'A greeting like kprompt "hello" is not a cluster op — use a real Kubernetes ask after the key is set.',
  },
] as const;
