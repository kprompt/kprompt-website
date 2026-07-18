const LIVE_ORIGIN = "https://kprompt.ai";

export const SITE = {
  name: "kprompt",
  domain: "kprompt.ai",
  /** Canonical site URL used for metadata, OG, and install CTA. */
  url: LIVE_ORIGIN,
  tagline: "Talk to Your Cluster.",
  description:
    "Open-source Kubernetes CLI with reviewable plans, Helm and Argo orchestration, Prometheus and OpenTelemetry explains, Grafana dashboards, and approval-gated apply.",
  github: "https://github.com/kprompt/kprompt",
  docs: "/docs",
  getStarted: "/docs/quickstart",
  /** Short maturity line for hero / banners. */
  maturityLabel: "Experimental",
  maturityNotice:
    "Early software. Always review the plan before apply, prefer non-production clusters first, and treat --approve with care.",
  /** GA4 — public client id; override with NEXT_PUBLIC_GA_MEASUREMENT_ID if needed. */
  gaMeasurementId: "G-E4624KGSE9",
  installCommand: `curl -fsSL ${LIVE_ORIGIN}/install | bash`,
  /** Tag-pinned CDN fallback if the site is unreachable. */
  installCommandGitHub:
    "curl -fsSL https://cdn.jsdelivr.net/gh/kprompt/kprompt@v0.3.0/install/install.sh | bash",
} as const;

export const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/team", label: "Team" },
] as const;

/** Shipped integration surface plus the honest next horizon (M-005 / T-047). */
export const INTEGRATION_ROADMAP = [
  {
    id: "shipped-core",
    label: "Shipped · v0.3.0",
    title: "Kubernetes & Helm",
    items: [
      {
        name: "Generic Kubernetes read",
        status: "Shipped",
        description:
          "Discovery-backed get/list for built-ins and CRDs (Node, ConfigMap, Secret, …) with RBAC boundaries.",
        example: 'kprompt "how many nodes are in the cluster"',
      },
      {
        name: "Helm",
        status: "Shipped",
        description:
          "Chart install and upgrade via the real Helm CLI, with template and dry-run previews before execution.",
        example: 'kprompt "install redis"',
      },
      {
        name: "Kubernetes depth",
        status: "Shipped",
        description:
          "Chain Deployment → ReplicaSet → Pods → Events → Logs in one explain.",
        example: 'kprompt "why isn\'t my deployment ready?"',
      },
    ],
  },
  {
    id: "shipped-signals",
    label: "Shipped · v0.3.0",
    title: "Workflows & metrics",
    items: [
      {
        name: "Argo Workflows",
        status: "Shipped",
        description:
          "Generate, preview, submit, wait for, and read Workflow status through the installed CRD.",
        example: 'kprompt "train a yolov11 model"',
      },
      {
        name: "Prometheus",
        status: "Shipped",
        description:
          "Run bounded PromQL queries and explain workload CPU, memory, p95 latency, replicas, and HPA signals.",
        example: 'kprompt "why is my api slow?"',
      },
    ],
  },
  {
    id: "shipped-observability",
    label: "Shipped · v0.3.0",
    title: "Traces & dashboards",
    items: [
      {
        name: "Jaeger / Tempo",
        status: "Shipped",
        description:
          "Natural-language trace walk with span trees and bottleneck narration over Jaeger or Tempo.",
        example: 'kprompt "trace payment request"',
      },
      {
        name: "Grafana",
        status: "Shipped",
        description:
          "Search dashboards and summarize panels from the Grafana HTTP API.",
        example: 'kprompt "show dashboard"',
      },
      {
        name: "Multi-tool router",
        status: "Shipped",
        description:
          "Chain read steps across backends (e.g. performance then trace) in one prompt.",
        example: 'kprompt "why is api slow then trace payment"',
      },
    ],
  },
  {
    id: "v10",
    label: "Exploring",
    title: "Cloud-native ecosystem",
    items: [
      {
        name: "GitOps",
        status: "Exploring",
        description: "Flux CD / Argo CD sync status, promote, rollback.",
        example: 'kprompt "rollback yesterday\'s deployment"',
      },
      {
        name: "Tekton · KEDA · Istio",
        status: "Exploring",
        description:
          "CI pipelines, event-driven scale, traffic management — via real CRDs/APIs.",
        example: 'kprompt "create a CI pipeline"',
      },
      {
        name: "Crossplane",
        status: "Exploring",
        description: "Cloud resource claims with strong approval gates.",
        example: 'kprompt "provision a postgres database"',
      },
      {
        name: "Optimize & graphs",
        status: "Exploring",
        description:
          "Read-only optimize reports and service dependency graphs (north-star).",
        example: 'kprompt "optimize my cluster"',
      },
    ],
  },
] as const;

export const NORTH_STAR_PROMPTS = [
  'kprompt "deploy my app"',
  'kprompt "why is production slow"',
  'kprompt "optimize my cluster"',
  'kprompt "show service dependency graph"',
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
      "Deep explain, logs, describe, get/list",
      "Discovery-backed generic Kubernetes reads (built-ins + CRDs)",
      "Helm install/upgrade plans and dry-run previews",
      "Argo Workflow generate/submit/status/wait",
      "Prometheus performance diagnosis",
      "OpenTelemetry trace walk and bottleneck narration",
      "Grafana dashboard search and panel summaries",
      "Multi-tool route chaining",
      "Prompt history, CI JSON, and terminal themes",
      "Integration discovery with kprompt tools",
      "Your LLM keys (BYOK)",
      "Brand domain (kprompt.ai)",
    ],
  },
  {
    id: "next",
    label: "Next",
    title: "Building",
    items: [
      "Homebrew install",
      "Optimize-cluster read-only report (idle / rightsizing / HPA hints)",
      "Service dependency graph from Kubernetes (+ optional OTel)",
      "Unified single-approval multi-tool mutating routes",
    ],
  },
  {
    id: "later",
    label: "Later",
    title: "Exploring",
    items: [
      "GitOps (Flux / Argo CD) · Tekton · KEDA · Istio",
      "Crossplane",
      "Team: org policy sync · audit · shared identity",
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
    note: "You should see a version like 0.3.0.",
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
      "kprompt config set theme dracula",
    ],
    note: "Allowed keys include provider, model, base_url, context, namespace, theme, and tools.* integration endpoints. API keys stay in environment variables.",
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
    id: "theme",
    title: "Choose a terminal theme",
    description:
      "Colorize plans, risks, findings, and tables. Themes only render on a TTY and respect NO_COLOR.",
    commands: [
      'kprompt --theme dracula "list deployments"',
      "kprompt config set theme nord",
      'export KPROMPT_THEME="gruvbox"',
    ],
    note: "Built-ins: auto, dracula, nord, gruvbox, mono, none. Use KPROMPT_FORCE_COLOR=1 only when your output consumer supports ANSI.",
  },
  {
    id: "tools",
    title: "Discover integrations",
    description:
      "See which real backends are ready before using Helm, Argo, Prometheus, or trace features.",
    commands: [
      "kprompt tools",
      'kprompt "install redis"',
      'kprompt "train a yolov11 model" --approve --wait',
      'kprompt "why is my api slow?" -n production',
    ],
    note: "Helm needs its binary on PATH; Argo needs the Workflow CRD; Prometheus, Jaeger/Tempo, and Grafana use tools.* config or KPROMPT_* environment endpoints.",
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
