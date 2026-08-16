import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "kprompt-on-aws-eks",
  title: "kprompt on AWS: EKS day-2 with BYOK, without a new control plane",
  description:
    "Use kprompt against Amazon EKS the same way you use kubectl — update-kubeconfig, aliases, plan-before-apply — plus Ollama or cloud BYOK. Optional Observe agent on the cluster; no Marketplace SaaS, no kubeconfig upload. Native Bedrock preset still deferred.",
  publishedAt: "2026-08-16",
  author: MUHTALIP_DEDE,
  tags: [
    "kubernetes",
    "eks",
    "aws",
    "ai",
    "sre",
    "devops",
    "platform engineering",
    "kprompt",
  ],
  keywords: [
    "kprompt EKS",
    "kprompt AWS",
    "EKS natural language kubectl",
    "aws eks update-kubeconfig kprompt",
    "EKS AI SRE",
    "kprompt Bedrock",
    "Observe agent EKS",
    "kubectl-ai EKS alternative",
    "plan approve EKS",
    "Amazon EKS day-2 AI",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "Teams on AWS often ask: “How do we run kprompt on Amazon?” Same honest answer as for Google Cloud: not a Marketplace listing, not a managed fleet SaaS. kprompt is a laptop CLI (and an optional in-cluster Observe agent) that speaks Kubernetes. On AWS that means EKS in your kubeconfig, your bring-your-own-key model — and the same plan → safety → approve contract you get on kind or GKE.",
      links: [
        { label: "Providers", href: "/docs/providers" },
        { label: "Multi-cluster", href: "/docs/multi-cluster" },
        { label: "Adopt (15 min)", href: "/docs/adopt" },
        {
          label: "kprompt on Google Cloud / GKE",
          href: "/blog/kprompt-on-google-cloud-gke",
        },
        { label: "kprompt on Azure / AKS", href: "/blog/kprompt-on-azure-aks" },
      ],
    },
    {
      type: "p",
      text: "If you already operate EKS with aws CLI and kubectl, you already have the hard parts. This post is the AWS-shaped path: credentials, aliases, LLM choices (including Bedrock honesty), useful day-2 prompts, and when (not) to install the Observe agent.",
    },
    {
      type: "h2",
      text: "What “on AWS” actually means",
    },
    {
      type: "table",
      headers: ["Layer", "What you use", "What kprompt does"],
      rows: [
        [
          "Cluster",
          "Amazon EKS (EC2 or Fargate)",
          "Read / plan / apply via your kubeconfig — never uploads credentials",
        ],
        [
          "LLM",
          "Ollama, Anthropic / OpenAI / Gemini BYOK, or openai-compatible gateway",
          "Intent → PlanResult; keys stay in env vars",
        ],
        [
          "Optional agent",
          "Helm chart in a namespace",
          "Watch → Incident → gated notify; propose-only by default",
        ],
        [
          "Not in scope",
          "eksctl / Terraform / CloudFormation / CDK",
          "Does not provision EKS clusters or AWS accounts",
        ],
      ],
    },
    {
      type: "p",
      text: "That last row matters. “Create me an EKS cluster in us-east-1” is still aws / eksctl / your IaC. kprompt’s lane is day-2: investigate CrashLoop, scale a Deployment, open a reviewable plan — after the cluster exists.",
      links: [
        {
          label: "kprompt vs kubectl-ai",
          href: "/blog/kprompt-vs-kubectl-ai",
        },
      ],
    },
    {
      type: "h2",
      text: "1. Point kubeconfig at EKS",
    },
    {
      type: "p",
      text: "Same muscle memory as kubectl. Authenticate the AWS CLI (SSO or IAM), then write the cluster into kubeconfig. Prefer a non-production cluster for the first session. Private API endpoints still need your VPN / bastion / SSM path — kprompt will not invent a tunnel.",
    },
    {
      type: "code",
      caption: "EKS credentials into kubeconfig",
      code: `aws sso login --profile my-sso
# or: export AWS_PROFILE=… / AWS_REGION=…

aws eks update-kubeconfig \\
  --name CLUSTER_NAME \\
  --region REGION \\
  --profile my-sso

kubectl config current-context
# → arn:aws:eks:REGION:ACCOUNT:cluster/CLUSTER_NAME (typical shape)

kprompt doctor`,
    },
    {
      type: "p",
      text: "doctor checks kube reachability and LLM readiness. If the API server is unreachable, fix aws auth, security groups, or private-endpoint access first.",
      links: [{ label: "Install", href: "/docs/install" }],
    },
    {
      type: "h2",
      text: "2. Alias the long EKS ARN context",
    },
    {
      type: "p",
      text: "EKS context names are ARNs on purpose. Aliases keep blast radius mental: prod means one string, staging means another. require_alias_match refuses a mutate when kubectl’s current-context does not match the alias you asked for — fat-finger insurance when three EKS contexts sit in one file.",
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
      caption: "Short names → EKS contexts",
      code: `kprompt contexts
kprompt contexts --check

kprompt config alias set prod arn:aws:eks:us-east-1:123456789012:cluster/prod
kprompt config alias set staging arn:aws:eks:us-east-1:123456789012:cluster/staging
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
      text: "3. Wire an LLM — Ollama, BYOK, or Bedrock via gateway",
    },
    {
      type: "p",
      text: "Natural-language plans need a model. On an AWS-heavy stack you usually pick one of three paths. Prefer Ollama when you want $0 inference and no cloud quota. Use Anthropic / OpenAI / Gemini BYOK when you already pay those APIs. For Bedrock: there is no named bedrock preset yet (P-008 deferred — SigV4 / IAM auth does not fit the simple Bearer BYOK model). If you already terminate Bedrock behind an OpenAI-compatible gateway, point openai-compatible + base_url at it.",
      links: [
        { label: "LLM providers guide", href: "/blog/kubernetes-llm-providers-byok" },
        { label: "Providers docs", href: "/docs/providers" },
      ],
    },
    {
      type: "code",
      caption: "Common AWS-friendly setups",
      code: `# A) Local Ollama — $0
#    ollama serve && ollama pull llama3.2
kprompt init --ollama

# B) Anthropic BYOK (common when Claude is already org-standard)
export KPROMPT_ANTHROPIC_API_KEY=...
kprompt init --provider anthropic

# C) Bedrock (or other) behind an OpenAI-compatible gateway
export KPROMPT_OPENAI_API_KEY=...          # gateway token
export KPROMPT_OPENAI_BASE_URL=https://YOUR_GATEWAY/v1
kprompt config set provider openai-compatible
kprompt config set model YOUR_MODEL_ID

kprompt --context staging "list pods"`,
    },
    {
      type: "p",
      text: "Honesty: native aws-sdk Bedrock Converse is out of scope until a stable Chat Completions path fits env-key BYOK. Do not expect kprompt to pick up ~/.aws/credentials for LLM calls today — only for whatever aws CLI / kubeconfig exec plugin you already use to reach the API server.",
    },
    {
      type: "h2",
      text: "4. Day-2 on EKS — read first, then plan",
    },
    {
      type: "p",
      text: "Brownfield rule still applies: first value is a read. Managed node groups vs Fargate do not change the contract — PlanResult before apply, wipe-class intents hard-denied. IRSA, NetworkPolicy, and AWS Load Balancer Controller CRDs still obey your RBAC.",
      links: [
        { label: "Safety", href: "/docs/safety" },
        { label: "Brownfield in 15 minutes", href: "/blog/brownfield-kprompt-in-15-minutes" },
      ],
    },
    {
      type: "code",
      caption: "Useful EKS session shape",
      code: `# Read / investigate (risk = 0)
kprompt --context staging "explain why checkout is failing" -n payments
kprompt --context staging "investigate CrashLoopBackoff" -n payments
kprompt --context staging "optimize my cluster"

# Mutate — plan only by default; TTY y/N or --approve
kprompt --context staging "scale api to 3" -n payments
kprompt --context staging "scale api to 3" -n payments --approve

# Optional: bind existing Prometheus / Grafana / AMP URLs — do not install a second stack
kprompt tools
kprompt config set tools.prometheus.url http://prometheus.monitoring:9090`,
    },
    {
      type: "p",
      text: "If the IAM identity behind your kubeconfig cannot list Pods in payments, neither can kprompt. That is a feature. Pod Identity / IRSA for the Observe agent ServiceAccount is your cluster’s job — put LLM and Slack secrets in Kubernetes Secrets, not in ConfigMaps.",
    },
    {
      type: "h2",
      text: "5. Optional: Observe agent inside EKS",
    },
    {
      type: "p",
      text: "The CLI is reactive. The Observe agent is always-on watch in one namespace: correlate Pods/Events into an Incident, optionally analyze, then gate Discord/Slack/webhook. Default mode never patches or deletes. Same Helm chart as on GKE or kind.",
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
      text: "AWS checklist",
    },
    {
      type: "table",
      headers: ["Step", "Command / move"],
      rows: [
        ["0", "aws eks update-kubeconfig --name … --region …"],
        ["1", "kprompt config alias set prod <eks_arn_context>"],
        ["2", "kprompt init --ollama  (or BYOK / openai-compatible gateway)"],
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
        "Not an AWS Marketplace app or managed “kprompt on AWS” control plane",
        "Not an EKS / ECS / Fargate provisioner",
        "Not uploading kubeconfigs to api.kprompt.ai",
        "Not a native Bedrock SDK preset (openai-compatible gateway only, until P-008)",
        "Not reading AWS Secrets Manager for LLM keys by default — env / K8s Secret",
        "Not silent remediations from the in-cluster agent",
      ],
    },
    {
      type: "p",
      text: "Experimental software. Prefer staging. Read every plan. On AWS the win is the same as everywhere else: intentional day-2 ops on the EKS you already run — with your keys, your IAM/RBAC, and approval still on the human side of the boundary.",
      links: [
        { label: "Quickstart", href: "/docs/quickstart" },
        { label: "Providers", href: "/docs/providers" },
        { label: "Multi-cluster", href: "/docs/multi-cluster" },
        {
          label: "kprompt on Google Cloud / GKE",
          href: "/blog/kprompt-on-google-cloud-gke",
        },
        { label: "kprompt on Azure / AKS", href: "/blog/kprompt-on-azure-aks" },
        { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
      ],
    },
  ],
};

export default post;
