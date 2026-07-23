export type DocsBlock =
  | {
      type: "p";
      text: string;
      links?: { label: string; href: string }[];
    }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; code: string; caption?: string }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    };

export type DocsPage = {
  title: string;
  description: string;
  blocks: DocsBlock[];
};

export const DOCS_PAGES: Record<string, DocsPage> = {
  overview: {
    title: "Overview",
    description:
      "kprompt is an experimental open-source CLI that turns natural language into a reviewable Kubernetes plan, then applies with approval.",
    blocks: [
      {
        type: "h2",
        text: "Experimental — use carefully",
      },
      {
        type: "p",
        text: "kprompt is early software. Plans can be wrong, incomplete, or unsafe outside the hard-deny rules. Always read the plan (and diffs) before apply. Prefer non-production or kind clusters while you learn the tool. Avoid --approve on unfamiliar prompts. You remain responsible for changes applied with your kubeconfig credentials.",
      },
      {
        type: "p",
        text: "Talk to your cluster from the terminal you already use. kprompt uses your kubeconfig and your LLM API keys (BYOK). Mutations always produce a plan; risk checks and hard denies run before apply.",
      },
      {
        type: "h2",
        text: "What it is",
      },
      {
        type: "ul",
        items: [
          "Apache-2.0 CLI for day-2 Kubernetes ops",
          "Plan → safety → approve → apply loop",
          "Deploy, scale, rollback, named delete",
          "Deep read path: get/list, explain, logs, describe",
          "Helm, Argo Workflows, Prometheus, OpenTelemetry, Grafana",
          "Tekton, KEDA, Istio (read-first), Crossplane, Flux/Argo CD GitOps",
          "Optimize reports, service dependency graphs, multi-tool routes",
          "Local history, CI JSON PlanResult, Homebrew install, optional Team login",
        ],
      },
      {
        type: "h2",
        text: "What it is not (yet)",
      },
      {
        type: "ul",
        items: [
          "Not production-hardened or stability-guaranteed",
          "Not a hosted agent that runs inside your cluster",
          "Not a replacement for Helm, Argo, Prometheus, kubectl, or operator review",
          "Not a Lens/Headlamp replacement — optional local read-only inventory is kprompt-dash (localhost only)",
          "Not a public Team signup product — CLI enrollment is opt-in for orgs that already have access",
          "Nothing to buy today; Free CLI stays free",
        ],
      },
      {
        type: "p",
        text: "Source of truth for the binary: github.com/kprompt/kprompt. This site mirrors install, safety, providers, and CI docs for operators who land here first.",
      },
    ],
  },
  install: {
    title: "Install",
    description: "Install the kprompt CLI from GitHub Releases, Homebrew, or source.",
    blocks: [
      {
        type: "p",
        text: "Installing is easy; applying is not automatically safe. After install, start on a sandbox cluster and leave --approve off until you know how plans look.",
      },
      {
        type: "h2",
        text: "Recommended",
      },
      {
        type: "code",
        code: "curl -fsSL https://kprompt.ai/install | bash",
      },
      {
        type: "p",
        text: "Installs the latest release binary into ~/.local/bin (no sudo on macOS).",
      },
      {
        type: "h2",
        text: "Homebrew",
      },
      {
        type: "code",
        code: "brew install kprompt/tap/kprompt",
      },
      {
        type: "p",
        text: "Installs the official GitHub Release binary via the kprompt/homebrew-tap formula (macOS and Linux).",
      },
      {
        type: "h2",
        text: "Fallback (jsDelivr, pinned tag)",
      },
      {
        type: "code",
        code: "curl -fsSL https://cdn.jsdelivr.net/gh/kprompt/kprompt@v0.4.0/install/install.sh | bash",
      },
      {
        type: "h2",
        text: "PATH",
      },
      {
        type: "code",
        code: `echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
kprompt version`,
      },
      {
        type: "h2",
        text: "From source",
      },
      {
        type: "code",
        code: `git clone https://github.com/kprompt/kprompt.git
cd kprompt
go install ./cmd/kprompt`,
      },
    ],
  },
  quickstart: {
    title: "Quickstart",
    description: "Kubeconfig, config file, API key, and your first prompts — carefully.",
    blocks: [
      {
        type: "p",
        text: "Start on a disposable cluster (kind, minikube, or a dedicated sandbox). Do not point an unreviewed --approve flow at production until you have practiced the plan → approve loop.",
      },
      {
        type: "h2",
        text: "1. Cluster access",
      },
      {
        type: "code",
        code: `kubectl config current-context
kubectl get ns`,
      },
      {
        type: "h2",
        text: "2. Save defaults (no secrets)",
      },
      {
        type: "code",
        code: `kprompt config set provider gemini
kprompt config set model gemini-2.0-flash
kprompt config set namespace default
kprompt config`,
      },
      {
        type: "p",
        text: "Config lives at ~/.kprompt/config.yaml. It never stores API keys — only whether a key is set or unset in the environment.",
      },
      {
        type: "h2",
        text: "3. Export an API key",
      },
      {
        type: "code",
        code: `export KPROMPT_GEMINI_API_KEY="..."
# or OPENAI / ANTHROPIC / GROQ / … — see Providers`,
      },
      {
        type: "h2",
        text: "4. Prompt",
      },
      {
        type: "code",
        code: `kprompt "list deployments"
kprompt "scale api to 3"          # plan + y/N on a TTY
kprompt "scale api to 3" --approve --wait
kprompt "explain why api is crashing"
kprompt tools`,
      },
      {
        type: "h2",
        text: "5. Pick a terminal theme",
      },
      {
        type: "code",
        code: `kprompt --theme dracula "list deployments"
kprompt config set theme nord
# auto | dracula | nord | gruvbox | mono | none`,
      },
      {
        type: "p",
        text: "Themes only color terminal output, respect NO_COLOR, and stay disabled when stdout is not a TTY. See Themes for environment overrides.",
        links: [{ label: "Themes", href: "/docs/themes" }],
      },
      {
        type: "h2",
        text: "6. Try an installed integration",
      },
      {
        type: "code",
        code: `kprompt tools
kprompt "install redis"                         # Helm
kprompt "train a yolov11 model" --approve --wait # Argo Workflows
kprompt "why is my api slow?" -n production      # Prometheus
kprompt "optimize my cluster"                    # read-only report
kprompt "show service dependency graph"
kprompt "show gitops sync status"`,
      },
      {
        type: "p",
        text: "Run kprompt tools first. Integrations use real CLIs/CRDs and configured endpoints; missing dependencies produce setup hints instead of fabricated output.",
        links: [{ label: "Integrations", href: "/docs/integrations" }],
      },
      {
        type: "h2",
        text: "7. Optional Team enrollment",
      },
      {
        type: "code",
        code: `kprompt login --open
kprompt whoami
kprompt policy pull
kprompt policy`,
      },
      {
        type: "p",
        text: "Free CLI behavior is unchanged until you enroll. Login is for orgs that already have Team access — not a public signup funnel.",
        links: [{ label: "Team enrollment", href: "/docs/team" }],
      },
      {
        type: "h2",
        text: "History",
      },
      {
        type: "code",
        code: `kprompt history
kprompt history rerun
kprompt history rerun 3 --approve`,
      },
    ],
  },
  commands: {
    title: "Commands",
    description: "Supported intents, prompt examples, and useful flags in the shipped CLI.",
    blocks: [
      {
        type: "h2",
        text: "Supported intents",
      },
      {
        type: "table",
        headers: ["Intent", "Examples", "Notes"],
        rows: [
          ["deploy", '"deploy redis"', "Deployment ± Service shortcuts"],
          ["scale", '"scale api to 10"', "Deployment replicas"],
          ["rollback", '"rollback payment-api"', "Rollout undo"],
          ["delete", '"delete deployment redis"', "Named Pod/Deployment/Service only"],
          ["get / list", '"list deployments"', "Read-only; built-ins + discoverable CRDs"],
          ["explain", '"explain why api is crashing"', "Deployment → ReplicaSet → Pods → Events → Logs; may suggest patch"],
          ["logs", '"logs payment-api"', "Tail"],
          ["describe", '"describe payment-api"', "Compact describe"],
          ["Helm install / upgrade", '"install redis"', "Template and dry-run preview before approval"],
          ["workflow", '"train a yolov11 model"', "Argo Workflow generate/submit/status/--wait"],
          ["performance", '"why is my api slow?"', "Read-only Prometheus-backed diagnosis"],
          ["trace", '"trace payment request"', "Jaeger/Tempo span tree + bottlenecks"],
          ["dashboard", '"show payments dashboard"', "Grafana search + panel summary"],
          ["optimize", '"optimize my cluster"', "Read-only idle / rightsizing / HPA hints"],
          ["graph", '"show service dependency graph"', "Service graph (+ optional OTel edges)"],
          ["GitOps", '"show gitops sync status"', "Flux/Argo CD health; approved sync"],
          ["Tekton", '"run the build pipeline"', "PipelineRun generate/submit/status"],
          ["KEDA", '"autoscale api with KEDA"', "ScaledObject generate/submit/status"],
          ["Istio", '"show traffic for checkout"', "VirtualService traffic summary (read-first)"],
          ["Crossplane", '"provision a postgres database"', "Cloud claims; RiskHigh + strong approval"],
          ["route", '"why is api slow then scale api to 4"', "Multi-tool chain; one aggregate approval"],
        ],
      },
      {
        type: "h2",
        text: "Prompt examples",
      },
      {
        type: "code",
        code: `# Kubernetes day-2
kprompt "list deployments"
kprompt "how many nodes are in the cluster"
kprompt "scale api to 3" -n staging
kprompt "rollback payment-api" --approve --wait
kprompt "explain why redis is crashing"

# Observability
kprompt "why is my api slow?" -n production
kprompt "trace payment request"
kprompt "show dashboard"

# North-star reports
kprompt "optimize my cluster"
kprompt "show service dependency graph"

# Ecosystem
kprompt "install redis" -n cache
kprompt "show gitops sync status"
kprompt "provision a postgres database"

# Multi-tool route (one plan, one approval for mutating chains)
kprompt "why is api slow then scale api to 4"`,
      },
      {
        type: "h2",
        text: "Flags",
      },
      {
        type: "table",
        headers: ["Flag", "Description"],
        rows: [
          ["--approve", "Apply without interactive confirmation"],
          ["--wait", "After apply, wait for Deployment rollout or Workflow/PipelineRun terminal phase"],
          ["--timeout", "Timeout for --wait (default 5m)"],
          ["--output / -o", "text (default) or json (PlanResult)"],
          ["--theme", "auto, dracula, nord, gruvbox, mono, or none"],
          ["--provider", "LLM provider id"],
          ["--model", "Model id"],
          ["--context", "kubeconfig context"],
          ["-n / --namespace", "Namespace (wins over prompt phrases)"],
          ["--open", "With login: open the browser for device approval"],
        ],
      },
      {
        type: "h2",
        text: "Subcommands",
      },
      {
        type: "ul",
        items: [
          "kprompt config / config set … / config alias set|unset",
          "kprompt contexts / contexts --check / contexts --json",
          "kprompt history / history rerun [n]",
          "kprompt tools",
          "kprompt doctor",
          "kprompt dash — local read-only cluster UI (requires kprompt-dash on PATH; not a Lens replacement)",
          "kprompt login / login --open / logout / whoami",
          "kprompt policy / policy pull",
          "kprompt secrets pull",
          "kprompt version",
        ],
      },
      {
        type: "h2",
        text: "Context aliases",
      },
      {
        type: "p",
        text: "Map short names to kubeconfig contexts. Optional require_alias_match refuses mutating apply when kubectl’s current-context does not match the resolved target (wrong-cluster guard). Inventory: kprompt contexts.",
      },
      {
        type: "code",
        code: `kprompt config alias set prod gke_myproj_us-central1_prod
kprompt config alias set staging kind-staging
kprompt contexts
kprompt --context prod "list deployments"
kprompt config set require_alias_match true`,
      },
      {
        type: "p",
        text: "For the local dash quickstart and security defaults, see the Local cluster dash docs.",
        links: [{ label: "Local cluster dash", href: "/docs/dash" }],
      },
    ],
  },
  dash: {
    title: "Local cluster dash",
    description:
      "kprompt-dash is a simple localhost, read-only cluster inventory — see the cluster, then hand off to kprompt for plan → approve → apply. Not a Lens or Headlamp replacement.",
    blocks: [
      {
        type: "p",
        text: "kprompt-dash is an optional OSS companion binary. It binds to 127.0.0.1 by default, uses your kubeconfig like kubectl, and stays read-only. Mutations remain in the CLI plan → approve loop.",
        links: [
          {
            label: "github.com/kprompt/kprompt-dash",
            href: "https://github.com/kprompt/kprompt-dash",
          },
        ],
      },
      {
        type: "h2",
        text: "Install & run",
      },
      {
        type: "code",
        code: `go install github.com/kprompt/kprompt-dash/cmd/kprompt-dash@latest
kprompt dash
# or: kprompt-dash -open`,
      },
      {
        type: "p",
        text: "Opens http://127.0.0.1:7474 with Cluster, Nodes, Deployments, ReplicaSets, and Pods — plus detail (events / short logs) and copyable kprompt prompt handoff.",
      },
      {
        type: "h2",
        text: "What it is not",
      },
      {
        type: "ul",
        items: [
          "Not a hosted multi-tenant dashboard on app.kprompt.ai",
          "Not in-browser mutate / apply",
          "Not a full CRD / RBAC / Helm explorer",
          "Not Lens or Headlamp parity",
        ],
      },
      {
        type: "h2",
        text: "Security",
      },
      {
        type: "ul",
        items: [
          "No HTTP authentication — anyone who can reach the port shares your kube privileges",
          "Default listen address is loopback only",
          "Non-loopback binds require an explicit -allow-remote flag",
        ],
      },
    ],
  },
  themes: {
    title: "Terminal themes",
    description: "Choose readable semantic colors for kprompt plans, risks, findings, and tables.",
    blocks: [
      {
        type: "p",
        text: "CLI themes style semantic output such as headings, success, warnings, denied risks, resource names, and muted details. They do not change planning or safety behavior.",
      },
      {
        type: "h2",
        text: "Built-in themes",
      },
      {
        type: "table",
        headers: ["Theme", "Use"],
        rows: [
          ["auto", "Compatible terminal colors; the default"],
          ["dracula", "Dracula true-color palette"],
          ["nord", "Nord true-color palette"],
          ["gruvbox", "Gruvbox true-color palette"],
          ["mono", "Bold and dim structure without color"],
          ["none", "Plain output with all ANSI styling disabled"],
        ],
      },
      {
        type: "h2",
        text: "Select a theme",
      },
      {
        type: "code",
        code: `# One command
kprompt --theme dracula "list deployments"

# Persist the default
kprompt config set theme nord

# Environment override when no flag/config value is set
export KPROMPT_THEME=gruvbox`,
      },
      {
        type: "h2",
        text: "TTY and color behavior",
      },
      {
        type: "ul",
        items: [
          "Color is enabled only for terminal output by default",
          "Any non-empty NO_COLOR disables ANSI styling",
          "KPROMPT_FORCE_COLOR=1 forces styling for ANSI-aware pipes or captures",
          "JSON output remains machine-readable; never force color into JSON consumers",
          "An unknown theme safely falls back to auto",
        ],
      },
    ],
  },
  integrations: {
    title: "Integrations",
    description:
      "Use Helm, Argo, Prometheus, OTel, Grafana, Tekton, KEDA, Istio, Crossplane, and GitOps through detected tools and real APIs.",
    blocks: [
      {
        type: "p",
        text: "kprompt orchestrates integrations; it does not replace them. Run kprompt tools to see what is installed or configured. Mutating operations still pass through plan, safety, and approval.",
      },
      {
        type: "code",
        code: "kprompt tools",
      },
      {
        type: "h2",
        text: "Generic Kubernetes reads",
      },
      {
        type: "p",
        text: "Get/list any discoverable built-in or CRD via discovery and the dynamic client. Cluster-scoped resources (Node) ignore namespace; Secrets use the same table path (type + key count). Authorization is your kubeconfig RBAC.",
      },
      {
        type: "code",
        code: `kprompt "how many nodes are in the cluster"
kprompt "list configmaps" -n default
kprompt "list widgets.example.com" -n demo`,
      },
      {
        type: "h2",
        text: "Helm",
      },
      {
        type: "p",
        text: "Install and upgrade plans call the Helm CLI and surface template/dry-run previews. Helm must be available on PATH. Uninstall remains wipe-class and receives stricter safety treatment.",
      },
      {
        type: "code",
        code: `kprompt "install redis" -n cache
kprompt "upgrade prometheus chart" -n monitoring`,
      },
      {
        type: "h2",
        text: "Argo Workflows",
      },
      {
        type: "p",
        text: "kprompt detects the Workflow CRD, generates a reviewable manifest, submits it with the Kubernetes dynamic client, and can report or wait for terminal status.",
      },
      {
        type: "code",
        code: `kprompt "train a yolov11 model"
kprompt "train a yolov11 model" --approve --wait
kprompt "get workflow train-yolov11"`,
      },
      {
        type: "h2",
        text: "Prometheus",
      },
      {
        type: "p",
        text: "Performance explain is read-only. It uses bounded instant/range queries to inspect CPU, memory, p95 latency, replica, and HPA signals for a workload.",
      },
      {
        type: "code",
        code: `kprompt config set tools.prometheus.url http://prometheus.monitoring:9090
kprompt "why is my api slow?" -n production`,
      },
      {
        type: "h2",
        text: "OpenTelemetry (Jaeger / Tempo)",
      },
      {
        type: "p",
        text: "Trace intents search the configured Jaeger or Tempo backend, print a span tree, and narrate bottleneck spans when present.",
      },
      {
        type: "code",
        code: `kprompt config set tools.otel.endpoint http://tempo.monitoring:3200
kprompt config set tools.otel.backend tempo
kprompt "trace payment request"`,
      },
      {
        type: "h2",
        text: "Grafana",
      },
      {
        type: "p",
        text: "Dashboard intents search Grafana and summarize panel metadata (read-only). Configure URL and API token via tools.grafana.* or environment variables.",
      },
      {
        type: "code",
        code: `kprompt config set tools.grafana.url https://grafana.example
kprompt "show payments dashboard"`,
      },
      {
        type: "h2",
        text: "Optimize & service graph",
      },
      {
        type: "p",
        text: "Optimize is a read-only cluster report (idle workloads, rightsizing, HPA hints). Optional follow-up scale/patch plans still require their own approval. Service graphs build from Kubernetes Services/Endpoints and can add OTel call edges when configured.",
      },
      {
        type: "code",
        code: `kprompt "optimize my cluster"
kprompt "show service dependency graph"
kprompt "show service dependency graph for payments"`,
      },
      {
        type: "h2",
        text: "Tekton · KEDA · Istio · Crossplane",
      },
      {
        type: "p",
        text: "Tekton PipelineRuns and KEDA ScaledObjects generate reviewable CRs before submit. Istio is read-first (VirtualService traffic/canary summary). Crossplane cloud claims are RiskHigh and need strong approval.",
      },
      {
        type: "code",
        code: `kprompt "run the build pipeline"
kprompt "autoscale api with KEDA to zero when idle"
kprompt "show traffic for checkout"
kprompt "provision a postgres database"`,
      },
      {
        type: "h2",
        text: "GitOps (Flux / Argo CD)",
      },
      {
        type: "p",
        text: "Status and health are read-only. Sync / promote / rollback paths require approval and apply through the real Flux Kustomization or Argo CD Application APIs.",
      },
      {
        type: "code",
        code: `kprompt "show gitops sync status"
kprompt "sync the payments application" --approve`,
      },
      {
        type: "h2",
        text: "Multi-tool routes",
      },
      {
        type: "p",
        text: "Chain steps across backends with then / and then. Mutating chains show one aggregate plan and ask for a single approval.",
      },
      {
        type: "code",
        code: `kprompt "why is api slow then scale api to 4"
kprompt "show gitops sync status then sync payments" --approve`,
      },
    ],
  },
  team: {
    title: "Team enrollment",
    description:
      "Optional CLI login for org policy sync and audit push. Free CLI stays free; enrollment does not change behavior until you enroll.",
    blocks: [
      {
        type: "p",
        text: "Team enrollment is opt-in. Until you run kprompt login, the CLI behaves as Free: local safety only, no control-plane calls. There is no public buy/signup CTA on this site — enrollment is for orgs that already have Team access.",
      },
      {
        type: "h2",
        text: "Login",
      },
      {
        type: "code",
        code: `kprompt login            # device code → approve at app.kprompt.ai/connect
kprompt login --open     # also open the browser
kprompt whoami           # org + member
kprompt logout           # revoke token + clear credentials/policy`,
      },
      {
        type: "p",
        text: "The kp_… token is stored only in ~/.kprompt/credentials.yaml (mode 0600), never in config.yaml. Override the API with KPROMPT_API_URL / KPROMPT_API_TOKEN when needed.",
      },
      {
        type: "h2",
        text: "Org policy",
      },
      {
        type: "p",
        text: "Pull caches org policy locally. Cached policy only tightens local hard-denies (namespace allow/deny, max risk, deny intents, require approve) — it never relaxes them.",
      },
      {
        type: "code",
        code: `kprompt policy pull      # fetch org policy → ~/.kprompt/policy.yaml
kprompt policy           # show cached policy`,
      },
      {
        type: "h2",
        text: "Audit push",
      },
      {
        type: "p",
        text: "When enrolled, each plan best-effort pushes an audit event (planned / denied / applied) to the control plane. Failures print a warning and never fail the local command. Disable with KPROMPT_DISABLE_AUDIT=1.",
      },
      {
        type: "h2",
        text: "What stays local",
      },
      {
        type: "ul",
        items: [
          "Kubeconfig, cluster traffic, and LLM keys stay on your machine",
          "Audit payloads omit manifests and secrets",
          "History remains local (~/.kprompt/history.jsonl)",
          "You can logout anytime and return to Free CLI behavior",
        ],
      },
    ],
  },
  safety: {
    title: "Safety",
    description: "Approval, risk levels, hard denies — and why you still must review plans.",
    blocks: [
      {
        type: "p",
        text: "Safety features reduce risk; they do not make kprompt safe for unattended production use. The product is experimental. Always review the plan. Skip --approve until you understand the proposed actions.",
      },
      {
        type: "p",
        text: "Every mutating plan is risk-evaluated before apply. On a TTY, kprompt asks y/N unless you pass --approve. Read-only intents (get, list, explain, logs, describe, performance, trace, dashboard, optimize, graph, Istio traffic, GitOps status) do not require approval.",
      },
      {
        type: "h2",
        text: "Hard denies",
      },
      {
        type: "ul",
        items: [
          "Cluster or namespace wipe language",
          "Delete-everything style prompts",
          "Deleting a whole namespace",
          "Anything that is not a named Pod, Deployment, or Service delete",
        ],
      },
      {
        type: "h2",
        text: "Risk levels",
      },
      {
        type: "p",
        text: "Plans surface low / medium / high / denied. Denied plans never apply. Medium/high mutations still need explicit approval. Crossplane claims are RiskHigh. Multi-tool mutating routes use one aggregate plan and a single approval.",
      },
      {
        type: "h2",
        text: "Org policy (when enrolled)",
      },
      {
        type: "p",
        text: "Pulled Team policy can only tighten local rules. See Team enrollment.",
        links: [{ label: "Team enrollment", href: "/docs/team" }],
      },
      {
        type: "h2",
        text: "Diffs",
      },
      {
        type: "p",
        text: "When a live object exists, plans include a before→after diff so you can review the change, not only the intent summary.",
      },
      {
        type: "code",
        caption: "Example deny",
        code: `kprompt "delete all pods in production"
# Risk: denied — named resources only`,
      },
    ],
  },
  providers: {
    title: "Providers",
    description: "BYOK LLM providers and environment variables.",
    blocks: [
      {
        type: "p",
        text: "Select with --provider or ~/.kprompt/config.yaml (provider, model, optional base_url). API keys are environment variables only — never stored in the config file.",
      },
      {
        type: "table",
        headers: ["Provider", "--provider", "Env key", "Default model"],
        rows: [
          ["OpenAI", "openai", "KPROMPT_OPENAI_API_KEY", "gpt-4o-mini"],
          ["Anthropic", "anthropic", "KPROMPT_ANTHROPIC_API_KEY", "claude-sonnet-4-20250514"],
          ["Gemini", "gemini", "KPROMPT_GEMINI_API_KEY", "gemini-2.0-flash"],
          ["Groq", "groq", "KPROMPT_GROQ_API_KEY", "llama-3.3-70b-versatile"],
          ["Mistral", "mistral", "KPROMPT_MISTRAL_API_KEY", "mistral-small-latest"],
          ["DeepSeek", "deepseek", "KPROMPT_DEEPSEEK_API_KEY", "deepseek-chat"],
          ["OpenRouter", "openrouter", "KPROMPT_OPENROUTER_API_KEY", "openai/gpt-4o-mini"],
          ["Together", "together", "KPROMPT_TOGETHER_API_KEY", "Llama 3.1 8B Turbo"],
          ["Ollama", "ollama", "(optional)", "llama3.2"],
          ["OpenAI-compat", "openai-compatible", "KPROMPT_OPENAI_API_KEY", "(requires base_url)"],
        ],
      },
      {
        type: "h2",
        text: "Examples",
      },
      {
        type: "code",
        code: `export KPROMPT_OPENAI_API_KEY=sk-...
kprompt "list deployments"

export KPROMPT_ANTHROPIC_API_KEY=sk-ant-...
kprompt --provider anthropic "explain why api is crashing"

kprompt --provider ollama --model llama3.2 "list pods"`,
      },
    ],
  },
  ci: {
    title: "CI / JSON",
    description: "Stable PlanResult output for pipeline gates.",
    blocks: [
      {
        type: "p",
        text: "JSON output helps you gate risky plans in CI. It does not remove the need for human judgment — kprompt remains experimental, and auto-approve in pipelines can still apply a bad plan if your checks are too loose.",
      },
      {
        type: "p",
        text: "Pass --output json or -o json to emit a single PlanResult document on stdout. Human confirmations and wait status go to stderr in JSON mode.",
      },
      {
        type: "code",
        code: 'kprompt "scale api to 10" -n prod --output json',
      },
      {
        type: "h2",
        text: "Schema",
      },
      {
        type: "table",
        headers: ["Field", "Notes"],
        rows: [
          ["apiVersion", "always kprompt.io/v1"],
          ["kind", "always PlanResult"],
          ["schemaVersion", '"1" — bump only on breaking changes'],
          ["plan.intent", "scale, deploy, workflow, performance, get, route, …"],
          ["plan.actions", "ops without YAML manifests"],
          ["risk.level", "low / medium / high / denied"],
          ["risk.denied", "hard deny"],
          ["applied", "whether a mutation ran"],
          ["requiresApproval", "true when a mutating plan needs approve"],
          ["result", "optional get/explain/logs/describe/workflow/performance payload"],
        ],
      },
      {
        type: "p",
        text: "Manifests and API keys are never included.",
      },
      {
        type: "h2",
        text: "Gate example",
      },
      {
        type: "code",
        code: `#!/usr/bin/env bash
set -euo pipefail
json="$(kprompt "scale api to 10" -n prod -o json)"
echo "$json" | jq -e '.risk.denied == false' >/dev/null
echo "$json" | jq -e '.plan.intent == "scale"' >/dev/null
kprompt "scale api to 10" -n prod --approve --wait`,
      },
      {
        type: "h2",
        text: "jq helpers",
      },
      {
        type: "code",
        code: `# Fail if any delete is planned
echo "$json" | jq -e '[.plan.actions[].op] | index("delete") | not'

# High-risk gate
echo "$json" | jq -e '.risk.level != "high"'`,
      },
    ],
  },
};
