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
    "Open-source CLI for Kubernetes: natural language in, a reviewable plan out — then apply with approval. Experimental — review every plan before apply.",
  github: "https://github.com/kprompt/kprompt",
  docs: "/docs",
  getStarted: "/#usage",
  /** Short maturity line for hero / banners. */
  maturityLabel: "Experimental",
  maturityNotice:
    "Early software. Always review the plan before apply, prefer non-production clusters first, and treat --approve with care.",
  /** GA4 — public client id; override with NEXT_PUBLIC_GA_MEASUREMENT_ID if needed. */
  gaMeasurementId: "G-E4624KGSE9",
  installCommand: `curl -fsSL ${LIVE_ORIGIN}/install | bash`,
  /** Tag-pinned CDN fallback if the site is unreachable. */
  installCommandGitHub:
    "curl -fsSL https://cdn.jsdelivr.net/gh/kprompt/kprompt@v0.2.0/install/install.sh | bash",
} as const;

export const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/#cli", label: "CLI" },
  { href: "/#live-demo", label: "Live demo" },
  { href: "/#usage", label: "Usage" },
  { href: "/docs", label: "Docs" },
  { href: "/#roadmap", label: "Roadmap" },
] as const;

/** Public horizon only — no pricing, no “buy Team”, no ship dates (M-005). */
export const ROADMAP_PHASES = [
  {
    id: "now",
    label: "Now",
    title: "Shipped",
    items: [
      "Open-source CLI (MIT)",
      "Plan → safety → approve → apply",
      "Deploy, scale, rollback, named delete",
      "Explain, logs, describe, get/list",
      "Prompt history and JSON plan output (CI)",
      "Your LLM keys (BYOK)",
    ],
  },
  {
    id: "next",
    label: "Next",
    title: "Building",
    items: [
      "Homebrew install",
      "Brand domain (kprompt.ai)",
    ],
  },
  {
    id: "later",
    label: "Later",
    title: "Exploring",
    items: [
      "Team: org policy sync",
      "Team: audit of prompts and applies",
      "Team: shared identity (no SSO promise)",
    ],
  },
] as const;

export const INSTALL_STEPS = [
  "Install the CLI",
  "Configure defaults",
  "Set an LLM API key",
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
    description: "Make the binary available in new terminal sessions.",
    commands: [
      'echo \'export PATH="$HOME/.local/bin:$PATH"\' >> ~/.zshrc',
      "source ~/.zshrc",
      "kprompt version",
    ],
    note: "You should see a version like 0.2.0.",
  },
  {
    id: "config",
    title: "Save defaults with kprompt config",
    description:
      "Persist provider, model, and namespace in ~/.kprompt/config.yaml. API keys are never written to that file — config only shows whether a key is set or unset.",
    commands: [
      "kprompt config",
      "kprompt config set provider gemini",
      "kprompt config set model gemini-2.0-flash",
      "kprompt config set namespace default",
    ],
    note: "Allowed keys: provider, model, base_url, context, namespace. Example view after set: provider gemini, api_key unset (until you export KPROMPT_GEMINI_API_KEY).",
  },
  {
    id: "api-key",
    title: "Set an LLM API key",
    description:
      "kprompt needs a model to turn your sentence into a plan. Without a key you get a missing API key error for your chosen provider.",
    commands: [
      'export KPROMPT_GEMINI_API_KEY="..."',
      'echo \'export KPROMPT_GEMINI_API_KEY="..."\' >> ~/.zshrc',
      "kprompt config   # api_key should now say: set",
    ],
    note: "Also: OPENAI, ANTHROPIC, GROQ, MISTRAL, DEEPSEEK, OPENROUTER, TOGETHER — or ollama with no key. Full table in Docs → Providers. Never put secrets in config.yaml.",
  },
  {
    id: "kube",
    title: "Connect your cluster",
    description: "Uses your existing kubeconfig (same as kubectl).",
    commands: ["kubectl config current-context", "kubectl get ns"],
    note: "Optional: kprompt config set context kind-kprompt-e2e — or pass --context / -n on each command. Namespace phrases like in staging are parsed from the prompt when flags are omitted.",
  },
  {
    id: "prompt",
    title: "Run your first prompts",
    description:
      "Reads run immediately. Mutations show a plan (with live diffs when available), then ask y/N on a TTY — or use --approve. Add --wait after apply to block until the Deployment is ready.",
    commands: [
      'kprompt "list deployments"',
      'kprompt "deploy redis"',
      'kprompt "rollback payment-api"',
      'kprompt "logs payment-api"',
      'kprompt "describe payment-api"',
      'kprompt "delete deployment redis" --approve',
      'kprompt "scale redis to 2" --approve --wait',
      'kprompt "explain why redis is crashing"',
    ],
    note: 'A greeting like kprompt "hello" is not a cluster op — use a real Kubernetes ask after the key is set.',
  },
  {
    id: "history",
    title: "Replay from history",
    description:
      "Recent prompts and plan summaries are stored locally (never manifests or API keys).",
    commands: [
      "kprompt history",
      "kprompt history rerun",
      "kprompt history rerun 3 --approve",
    ],
    note: "File: ~/.kprompt/history.jsonl. Disable with KPROMPT_DISABLE_HISTORY=1 if needed.",
  },
  {
    id: "ci",
    title: "Gate plans in CI",
    description:
      "Emit a stable PlanResult JSON document for pipelines. Human UI goes to stderr; stdout is one JSON object.",
    commands: [
      'kprompt "scale api to 10" -n prod --output json',
      'kprompt "scale api to 10" -n prod -o json | jq -e \'.risk.denied == false\'',
    ],
    note: "See Docs → CI for schema fields and jq helpers.",
  },
] as const;
