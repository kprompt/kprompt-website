import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "kprompt-on-azure-aks",
  title: "kprompt on Azure: AKS day-2 with Azure OpenAI, without a new control plane",
  description:
    "Use kprompt against Azure Kubernetes Service the same way you use kubectl — az aks get-credentials, aliases, plan-before-apply — plus Azure OpenAI BYOK or Ollama. Optional Observe agent on the cluster; no Marketplace SaaS, no kubeconfig upload.",
  publishedAt: "2026-08-16",
  author: MUHTALIP_DEDE,
  tags: [
    "kubernetes",
    "aks",
    "azure",
    "ai",
    "sre",
    "devops",
    "platform engineering",
    "kprompt",
  ],
  keywords: [
    "kprompt AKS",
    "kprompt Azure",
    "AKS natural language kubectl",
    "az aks get-credentials kprompt",
    "AKS AI SRE",
    "kprompt Azure OpenAI",
    "Observe agent AKS",
    "kubectl-ai AKS alternative",
    "plan approve AKS",
    "Azure Kubernetes Service day-2 AI",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "Teams on Azure often ask: “How do we run kprompt on Microsoft cloud?” Same honest answer as for GKE and EKS: not a Marketplace listing, not a managed fleet SaaS. kprompt is a laptop CLI (and an optional in-cluster Observe agent) that speaks Kubernetes. On Azure that means AKS in your kubeconfig, Azure OpenAI (or Ollama) as bring-your-own-key — and the same plan → safety → approve contract you get on kind.",
      links: [
        { label: "Providers", href: "/docs/providers" },
        { label: "Multi-cluster", href: "/docs/multi-cluster" },
        { label: "Adopt (15 min)", href: "/docs/adopt" },
        {
          label: "kprompt on Google Cloud / GKE",
          href: "/blog/kprompt-on-google-cloud-gke",
        },
        { label: "kprompt on AWS / EKS", href: "/blog/kprompt-on-aws-eks" },
      ],
    },
    {
      type: "p",
      text: "If you already operate AKS with Azure CLI and kubectl, you already have the hard parts. This post is the Azure-shaped path: credentials, aliases, Azure OpenAI setup, useful day-2 prompts, and when (not) to install the Observe agent.",
    },
    {
      type: "h2",
      text: "What “on Azure” actually means",
    },
    {
      type: "table",
      headers: ["Layer", "What you use", "What kprompt does"],
      rows: [
        [
          "Cluster",
          "Azure Kubernetes Service (node pools or Autopilot-class patterns)",
          "Read / plan / apply via your kubeconfig — never uploads credentials",
        ],
        [
          "LLM",
          "Azure OpenAI (named azure preset) or Ollama / other BYOK",
          "Intent → PlanResult; keys stay in env vars; model = deployment name",
        ],
        [
          "Optional agent",
          "Helm chart in a namespace",
          "Watch → Incident → gated notify; propose-only by default",
        ],
        [
          "Not in scope",
          "az / Bicep / Terraform / AKS Automatic create",
          "Does not provision AKS clusters or Azure subscriptions",
        ],
      ],
    },
    {
      type: "p",
      text: "That last row matters. “Create me an AKS cluster in eastus” is still az / your IaC. kprompt’s lane is day-2: investigate CrashLoop, scale a Deployment, open a reviewable plan — after the cluster exists.",
      links: [
        {
          label: "kprompt vs kubectl-ai",
          href: "/blog/kprompt-vs-kubectl-ai",
        },
      ],
    },
    {
      type: "h2",
      text: "1. Point kubeconfig at AKS",
    },
    {
      type: "p",
      text: "Same muscle memory as kubectl. Sign in with Azure CLI, select the subscription, then pull credentials. Prefer a non-production cluster for the first session. Private clusters still need your VPN / Arc / bastion path — kprompt will not invent a tunnel.",
    },
    {
      type: "code",
      caption: "AKS credentials into kubeconfig",
      code: `az login
az account set --subscription SUBSCRIPTION_ID

az aks get-credentials \\
  --resource-group RESOURCE_GROUP \\
  --name CLUSTER_NAME \\
  --overwrite-existing

kubectl config current-context
# → CLUSTER_NAME (typical) or a longer admin context name

kprompt doctor`,
    },
    {
      type: "p",
      text: "doctor checks kube reachability and LLM readiness. If the API server is unreachable, fix Azure auth, network security groups, or private-endpoint access first.",
      links: [{ label: "Install", href: "/docs/install" }],
    },
    {
      type: "h2",
      text: "2. Alias contexts across staging and prod",
    },
    {
      type: "p",
      text: "AKS context names are shorter than GKE/EKS ARNs, but teams still juggle multiple clusters in one kubeconfig. Aliases keep blast radius mental. require_alias_match refuses a mutate when kubectl’s current-context does not match the alias you asked for.",
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
      caption: "Short names → AKS contexts",
      code: `kprompt contexts
kprompt contexts --check

kprompt config alias set prod aks-prod-eastus
kprompt config alias set staging aks-staging-eastus
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
      text: "3. Wire Azure OpenAI (or stay on Ollama)",
    },
    {
      type: "p",
      text: "Natural-language plans need a model. On an Azure-heavy stack, the named azure preset is the natural BYOK path: resource endpoint as base_url, API key in the environment, and --model set to your Azure OpenAI deployment name (not a raw OpenAI model id). Prefer Ollama when you want $0 inference and no cloud quota.",
      links: [
        { label: "LLM providers guide", href: "/blog/kubernetes-llm-providers-byok" },
        { label: "Providers docs", href: "/docs/providers" },
      ],
    },
    {
      type: "code",
      caption: "Azure OpenAI BYOK",
      code: `# Key + endpoint from Azure AI Foundry / Azure OpenAI resource
export KPROMPT_AZURE_API_KEY=...
export KPROMPT_OPENAI_BASE_URL=https://YOUR_RESOURCE.openai.azure.com/openai/v1

kprompt config set provider azure
kprompt config set model my-gpt4o-deploy   # portal deployment name
# optional: kprompt config set base_url https://YOUR_RESOURCE.openai.azure.com/openai/v1

kprompt --context staging "list pods"

# Or $0 local:
# kprompt init --ollama`,
    },
    {
      type: "p",
      text: "Honesty: if --model does not match a real deployment name in that resource, Azure returns deployment-not-found — that is configuration, not a kprompt bug. Entra ID / managed-identity auth for the LLM path is not the default BYOK story today; use an API key (or a gateway that presents one). Workload Identity still applies to how your kubeconfig / Observe agent ServiceAccount reaches the API server.",
    },
    {
      type: "h2",
      text: "4. Day-2 on AKS — read first, then plan",
    },
    {
      type: "p",
      text: "Brownfield rule still applies: first value is a read. Managed vs Virtual Machine Scale Set node pools do not change the contract — PlanResult before apply, wipe-class intents hard-denied. Azure CNI, NetworkPolicy, and AGIC / Gateway API CRDs still obey your RBAC.",
      links: [
        { label: "Safety", href: "/docs/safety" },
        { label: "Brownfield in 15 minutes", href: "/blog/brownfield-kprompt-in-15-minutes" },
      ],
    },
    {
      type: "code",
      caption: "Useful AKS session shape",
      code: `# Read / investigate (risk = 0)
kprompt --context staging "explain why checkout is failing" -n payments
kprompt --context staging "investigate CrashLoopBackoff" -n payments
kprompt --context staging "optimize my cluster"

# Mutate — plan only by default; TTY y/N or --approve
kprompt --context staging "scale api to 3" -n payments
kprompt --context staging "scale api to 3" -n payments --approve

# Optional: bind existing Prometheus / Grafana / Azure Monitor URLs
kprompt tools
kprompt config set tools.prometheus.url http://prometheus.monitoring:9090`,
    },
    {
      type: "p",
      text: "If the identity behind your kubeconfig cannot list Pods in payments, neither can kprompt. That is a feature. Put LLM and Slack secrets in Kubernetes Secrets for the Observe agent — never plaintext in ConfigMaps.",
    },
    {
      type: "h2",
      text: "5. Optional: Observe agent inside AKS",
    },
    {
      type: "p",
      text: "The CLI is reactive. The Observe agent is always-on watch in one namespace: correlate Pods/Events into an Incident, optionally analyze, then gate Discord/Slack/webhook. Default mode never patches or deletes. Same Helm chart as on GKE, EKS, or kind.",
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
      text: "Azure checklist",
    },
    {
      type: "table",
      headers: ["Step", "Command / move"],
      rows: [
        ["0", "az aks get-credentials -g … -n …"],
        ["1", "kprompt config alias set prod <aks_context>"],
        [
          "2",
          "export KPROMPT_AZURE_API_KEY + BASE_URL; config set provider azure + deployment model",
        ],
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
        "Not an Azure Marketplace app or managed “kprompt on Azure” control plane",
        "Not an AKS / ACA / Arc cluster provisioner",
        "Not uploading kubeconfigs to api.kprompt.ai",
        "Not Entra ID token exchange for LLM BYOK by default (API key / gateway today)",
        "Not reading Azure Key Vault for LLM keys by default — env / K8s Secret",
        "Not silent remediations from the in-cluster agent",
      ],
    },
    {
      type: "p",
      text: "Experimental software. Prefer staging. Read every plan. On Azure the win is the same as everywhere else: intentional day-2 ops on the AKS you already run — with your keys, your Entra/RBAC, and approval still on the human side of the boundary.",
      links: [
        { label: "Quickstart", href: "/docs/quickstart" },
        { label: "Providers", href: "/docs/providers" },
        { label: "Multi-cluster", href: "/docs/multi-cluster" },
        {
          label: "kprompt on Google Cloud / GKE",
          href: "/blog/kprompt-on-google-cloud-gke",
        },
        { label: "kprompt on AWS / EKS", href: "/blog/kprompt-on-aws-eks" },
        { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
      ],
    },
  ],
};

export default post;
