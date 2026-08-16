import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "kprompt-on-google-cloud-gke",
  title: "kprompt on Google Cloud: GKE day-2 with Gemini, without a new control plane",
  description:
    "Use kprompt against GKE the same way you use kubectl — get-credentials, aliases, plan-before-apply — plus Gemini BYOK. Optional Observe agent on the cluster; no Marketplace SaaS, no kubeconfig upload.",
  publishedAt: "2026-08-16",
  author: MUHTALIP_DEDE,
  tags: [
    "kubernetes",
    "gke",
    "google cloud",
    "gemini",
    "ai",
    "sre",
    "devops",
    "platform engineering",
    "kprompt",
  ],
  keywords: [
    "kprompt GKE",
    "kprompt Google Cloud",
    "GKE natural language kubectl",
    "Gemini Kubernetes CLI",
    "gcloud get-credentials kprompt",
    "GKE AI SRE",
    "kprompt Gemini BYOK",
    "Observe agent GKE",
    "kubectl-ai GKE alternative",
    "plan approve GKE",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "Teams on Google Cloud often ask: “How do we run kprompt on GCP?” The honest answer is not a Marketplace listing or a managed fleet SaaS. kprompt is a laptop CLI (and an optional in-cluster Observe agent) that speaks Kubernetes. On GCP that means GKE in your kubeconfig, Gemini as your bring-your-own-key model if you want Google’s stack end-to-end — and the same plan → safety → approve contract you get on kind or EKS.",
      links: [
        { label: "Providers", href: "/docs/providers" },
        { label: "Multi-cluster", href: "/docs/multi-cluster" },
        { label: "Adopt (15 min)", href: "/docs/adopt" },
        { label: "kprompt on AWS / EKS", href: "/blog/kprompt-on-aws-eks" },
        { label: "kprompt on Azure / AKS", href: "/blog/kprompt-on-azure-aks" },
      ],
    },
    {
      type: "p",
      text: "If you already operate GKE with gcloud and kubectl, you already have the hard parts. This post is the GCP-shaped path: credentials, aliases, Gemini, useful day-2 prompts, and when (not) to install the Observe agent.",
    },
    {
      type: "h2",
      text: "What “on Google Cloud” actually means",
    },
    {
      type: "table",
      headers: ["Layer", "What you use", "What kprompt does"],
      rows: [
        [
          "Cluster",
          "GKE (Autopilot or Standard)",
          "Read / plan / apply via your kubeconfig — never uploads credentials",
        ],
        [
          "LLM",
          "Gemini (AI Studio key) or Ollama / other BYOK",
          "Intent → PlanResult; keys stay in env vars",
        ],
        [
          "Optional agent",
          "Helm chart in a namespace",
          "Watch → Incident → gated notify; propose-only by default",
        ],
        [
          "Not in scope",
          "gcloud / Terraform / Config Connector",
          "Does not provision GKE clusters or GCP projects",
        ],
      ],
    },
    {
      type: "p",
      text: "That last row matters. “Create me a GKE cluster in us-central1” is still gcloud or your IaC. kprompt’s lane is day-2: investigate CrashLoop, scale a Deployment, open a reviewable plan — after the cluster exists.",
      links: [
        {
          label: "kprompt vs kubectl-ai",
          href: "/blog/kprompt-vs-kubectl-ai",
        },
      ],
    },
    {
      type: "h2",
      text: "1. Point kubeconfig at GKE",
    },
    {
      type: "p",
      text: "Same muscle memory as kubectl. Authenticate the Google Cloud SDK, then fetch credentials for the cluster you care about. Prefer a non-production cluster for the first session.",
    },
    {
      type: "code",
      caption: "GKE credentials into kubeconfig",
      code: `gcloud auth login
gcloud config set project PROJECT_ID

gcloud container clusters get-credentials CLUSTER_NAME \\
  --region REGION \\
  # or: --zone ZONE
  --project PROJECT_ID

kubectl config current-context
# → gke_PROJECT_REGION_CLUSTER_NAME (typical shape)

kprompt doctor`,
    },
    {
      type: "p",
      text: "doctor checks kube reachability and LLM readiness. If the API server is unreachable, fix gcloud / network / VPC access first — kprompt will not invent a tunnel.",
      links: [{ label: "Install", href: "/docs/install" }],
    },
    {
      type: "h2",
      text: "2. Alias the ugly GKE context name",
    },
    {
      type: "p",
      text: "GKE context names are long on purpose. Aliases keep blast radius mental: prod means one string, staging means another. require_alias_match refuses a mutate when kubectl’s current-context does not match the alias you asked for — fat-finger insurance when three GKE contexts sit in one file.",
      links: [
        { label: "Multi-cluster docs", href: "/docs/multi-cluster" },
        {
          label: "Building AI SRE #5: Multi-context",
          href: "/blog/building-ai-sre-05-multi-context",
        },
      ],
    },
    {
      type: "code",
      caption: "Short names → GKE contexts",
      code: `kprompt contexts
kprompt contexts --check

kprompt config alias set prod gke_myproj_us-central1_prod
kprompt config alias set staging gke_myproj_us-central1_staging
kprompt config set require_alias_match true

kprompt --context staging "list deployments"
kprompt --contexts staging,prod "list pods"`,
    },
    {
      type: "p",
      text: "Read fan-out across staging and prod is explicit. Mutate fan-out never rides on a lone --approve — you need --approve-each-context if you truly meant every listed context. Credentials still never leave the laptop.",
    },
    {
      type: "h2",
      text: "3. Wire Gemini (or stay on Ollama)",
    },
    {
      type: "p",
      text: "Natural-language plans need a model. On a Google-heavy stack, Gemini is the natural BYOK choice: AI Studio key in the environment, provider set once, no secrets in ~/.kprompt/config.yaml. Prefer Ollama when you want $0 inference and no cloud quota.",
      links: [
        { label: "LLM providers guide", href: "/blog/kubernetes-llm-providers-byok" },
        { label: "Providers docs", href: "/docs/providers" },
      ],
    },
    {
      type: "code",
      caption: "Gemini BYOK",
      code: `# Key from https://aistudio.google.com/apikey
export KPROMPT_GEMINI_API_KEY=...

kprompt init --provider gemini
# or:
kprompt config set provider gemini
kprompt config set model gemini-3.6-flash

kprompt --context staging "list pods"`,
    },
    {
      type: "p",
      text: "Honesty on quotas: AI Studio free tier returns HTTP 429 when you burn daily or per-minute limits — that is Google’s meter, not a kprompt bug. Enable billing on the Google project, wait for reset, or switch to Ollama. Native Vertex AI SDK is not a shipped preset yet; if you already expose an OpenAI-compatible Vertex gateway, point openai-compatible + base_url at it.",
    },
    {
      type: "h2",
      text: "4. Day-2 on GKE — read first, then plan",
    },
    {
      type: "p",
      text: "Brownfield rule still applies: first value is a read. GKE Autopilot vs Standard does not change the contract — PlanResult before apply, wipe-class intents hard-denied.",
      links: [
        { label: "Safety", href: "/docs/safety" },
        { label: "Brownfield in 15 minutes", href: "/blog/brownfield-kprompt-in-15-minutes" },
      ],
    },
    {
      type: "code",
      caption: "Useful GKE session shape",
      code: `# Read / investigate (risk = 0)
kprompt --context staging "explain why checkout is failing" -n payments
kprompt --context staging "investigate CrashLoopBackoff" -n payments
kprompt --context staging "optimize my cluster"

# Mutate — plan only by default; TTY y/N or --approve
kprompt --context staging "scale api to 3" -n payments
kprompt --context staging "scale api to 3" -n payments --approve

# Optional: bind existing Prometheus / Grafana URLs instead of installing a second stack
kprompt tools
kprompt config set tools.prometheus.url http://prometheus.monitoring:9090`,
    },
    {
      type: "p",
      text: "Workload Identity, NetworkPolicy, and GKE-specific CRDs still obey your RBAC. If the ServiceAccount behind your kubeconfig cannot list Pods in payments, neither can kprompt. That is a feature.",
    },
    {
      type: "h2",
      text: "5. Optional: Observe agent inside GKE",
    },
    {
      type: "p",
      text: "The CLI is reactive. The Observe agent is always-on watch in one namespace: correlate Pods/Events into an Incident, optionally analyze, then gate Discord/Slack/webhook. Default mode never patches or deletes. Put LLM keys in a Secret (envFrom) — never plaintext in a ConfigMap or CR.",
      links: [
        { label: "Observe agent", href: "/docs/agent" },
        { label: "Observe on kind", href: "/blog/observe-agent-kind-demo" },
      ],
    },
    {
      type: "code",
      caption: "Namespace-scoped Helm install",
      code: `helm upgrade --install kprompt-agent ./charts/kprompt-agent -n payments \\
  --create-namespace \\
  # LLM / Slack / Discord via Secret + values — see chart README

# Laptop smoke before you Helm:
kprompt agent run -n payments --emit-initial --analyze --fetch-logs --heuristic`,
    },
    {
      type: "p",
      text: "Start heuristic for demos ($0). Turn on LLM analysis when you accept token spend and have tightened --min-severity / --min-confidence. Autopilot apply stays gated — propose is not silent heal.",
    },
    {
      type: "h2",
      text: "GCP checklist",
    },
    {
      type: "table",
      headers: ["Step", "Command / move"],
      rows: [
        ["0", "gcloud container clusters get-credentials …"],
        ["1", "kprompt config alias set prod <gke_context>"],
        ["2", "export KPROMPT_GEMINI_API_KEY=… + init --provider gemini"],
        ["3", "kprompt doctor && contexts --check"],
        ["4", "Read prompts on staging; one plan-only mutate"],
        ["5", "Optional: Helm Observe agent in one namespace"],
      ],
    },
    {
      type: "h2",
      text: "What we are not claiming",
    },
    {
      type: "ul",
      items: [
        "Not a Google Cloud Marketplace app or managed “kprompt on GCP” control plane",
        "Not a GKE / Anthos cluster provisioner",
        "Not uploading kubeconfigs to api.kprompt.ai",
        "Not native Vertex SDK parity (AI Studio Gemini or OpenAI-compat gateway today)",
        "Not silent remediations from the in-cluster agent",
      ],
    },
    {
      type: "p",
      text: "Experimental software. Prefer staging. Read every plan. On Google Cloud the win is the same as everywhere else: intentional day-2 ops on the GKE you already run — with your keys, your RBAC, and approval still on the human side of the boundary.",
      links: [
        { label: "Quickstart", href: "/docs/quickstart" },
        { label: "Providers", href: "/docs/providers" },
        { label: "Multi-cluster", href: "/docs/multi-cluster" },
        { label: "kprompt on AWS / EKS", href: "/blog/kprompt-on-aws-eks" },
        { label: "kprompt on Azure / AKS", href: "/blog/kprompt-on-azure-aks" },
        { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
      ],
    },
  ],
};

export default post;
