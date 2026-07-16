import type { DocsBlock } from "@/lib/docs-content";
import { MUHTALIP_DEDE, type BlogAuthor } from "@/lib/team";

export type { BlogAuthor };
export { MUHTALIP_DEDE };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: BlogAuthor;
  tags: string[];
  /** Extra SEO keywords beyond display tags. */
  keywords?: string[];
  blocks: DocsBlock[];
  /** Shown prominently on the blog index. */
  featured?: boolean;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "introducing-kprompt",
    title: "Introducing kprompt: talk to your cluster",
    description:
      "We built an open-source CLI that turns plain English into a reviewable Kubernetes plan — then applies with your approval. Here's why, what shipped, and how to try it.",
    publishedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: ["announcement", "open source", "kubernetes"],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "If you operate Kubernetes, you already know the drill: kubectl for reads, manifests or Helm for changes, dashboards when something breaks, and a mental map of which namespace, context, and deployment name you actually mean. kprompt is our bet that a single sentence should be enough to start — as long as what happens next is visible, reviewable, and under your control.",
      },
      {
        type: "p",
        text: "kprompt is an experimental, MIT-licensed CLI. You type what you want in natural language. The tool turns that into a structured plan against your existing kubeconfig, runs safety checks, asks you to approve on a TTY (unless you pass --approve), and only then executes. No hosted agent in your cluster. No vendor lock-in on the model — bring your own API keys.",
      },
      {
        type: "h2",
        text: "The problem we're solving",
      },
      {
        type: "p",
        text: "LLMs are good at intent: “scale payment-api to three replicas”, “roll back redis”, “why is this pod crash-looping?”. They're not good enough to trust with blind apply. Operators need speed without giving up accountability — especially on shared clusters where a wrong command has blast radius.",
      },
      {
        type: "ul",
        items: [
          "You shouldn't need to memorize kubectl flag order for routine day-2 work",
          "You shouldn't auto-apply model output without seeing the plan first",
          "You shouldn't send cluster credentials to a SaaS control plane just to run a prompt",
        ],
      },
      {
        type: "h2",
        text: "How it works",
      },
      {
        type: "p",
        text: "Every interaction follows the same loop: Prompt → Plan → Safety → Apply. Reads (list, get, logs, describe, explain) run immediately. Mutations always produce a plan first — with live diffs when the API allows — then risk scoring and hard denies before anything touches the cluster.",
      },
      {
        type: "code",
        caption: "Typical flow",
        code: `$ kprompt "scale redis to 2" -n staging

Plan
  1. kubectl scale deployment/redis --replicas=2 -n staging

Risk: low
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "What's in v0.2 today",
      },
      {
        type: "ul",
        items: [
          "Deploy, scale, rollback, and named delete",
          "Read path: get/list, explain, logs, describe",
          "Plan → safety → approve → apply with optional --wait on rollouts",
          "Local prompt history (~/.kprompt/history.jsonl) — no manifests or keys stored",
          "CI-stable JSON PlanResult output for pipeline gates",
          "Multiple LLM providers (Gemini, OpenAI, Anthropic, Groq, Ollama, and others) via BYOK",
        ],
      },
      {
        type: "h2",
        text: "What we're not claiming",
      },
      {
        type: "p",
        text: "kprompt is early software. Plans can be incomplete or wrong. Hard-deny rules catch known-dangerous patterns, but they don't replace your judgment. We don't ship Helm orchestration, GitOps, or in-cluster agents yet — those are on the public roadmap, not hidden behind a paywall.",
      },
      {
        type: "ul",
        items: [
          "Not production-hardened — start on kind or a non-production cluster",
          "Not a replacement for code review of manifests you care about",
          "Not a hosted team product today — org policy and audit are explored for later",
        ],
      },
      {
        type: "h2",
        text: "Try it in five minutes",
      },
      {
        type: "code",
        caption: "Install",
        code: "curl -fsSL https://kprompt.ai/install | bash",
      },
      {
        type: "code",
        caption: "Configure provider and run a read",
        code: `export KPROMPT_GEMINI_API_KEY="..."
kprompt config set provider gemini
kprompt config set namespace default
kprompt "list deployments"`,
      },
      {
        type: "p",
        text: "Full install, provider, safety, and CI docs live at kprompt.ai/docs. Source and issues are on GitHub — contributions and feedback welcome. We'll publish more here as we ship Helm depth, Homebrew, and the next integration layers.",
      },
    ],
  },
  {
    slug: "kubernetes-and-ai",
    title: "Kubernetes meets AI: what works, what breaks, and what's next",
    description:
      "Large language models change how operators talk to clusters — but they don't replace kube-apiserver truth. A practical map of AI + Kubernetes: use cases, failure modes, and why plan-before-apply matters.",
    publishedAt: "2026-07-20",
    author: MUHTALIP_DEDE,
    tags: ["kubernetes", "ai", "llm", "platform engineering", "devops"],
    blocks: [
      {
        type: "p",
        text: "Every platform team has felt the same tension: Kubernetes is the right abstraction for running software at scale, but day-2 work still feels like archaeology. Which Deployment owns this Service? Why is the HPA not scaling? Did someone apply a bad ConfigMap in staging or production? You reach for kubectl, the metrics stack, ticket history, and sometimes a colleague who remembers the incident from last quarter.",
      },
      {
        type: "p",
        text: "Large language models (LLMs) promise a different input layer: describe intent in English, get back commands, manifests, or explanations. That promise is real for certain tasks — and dangerously oversold for others. This post is our field guide to AI on Kubernetes: where models help operators, where they hallucinate cluster state, and how to design tools (like kprompt) that use AI without handing it the keys.",
      },
      {
        type: "h2",
        text: "Why Kubernetes and AI show up together",
      },
      {
        type: "p",
        text: "Kubernetes is declarative, API-driven, and verbose. The control plane exposes rich objects — Pods, Deployments, ReplicaSets, Events, CRDs — connected by labels, owners references, and controllers. Humans think in stories (“payment-api is slow”); the cluster stores graphs of objects and status conditions. LLMs are good at translating between those worlds when you give them structure and guardrails.",
      },
      {
        type: "ul",
        items: [
          "Natural language maps well to operator intent: scale, roll back, explain, compare",
          "Kubernetes APIs and kubectl output are text — easy to feed into models as context",
          "Incident response is often sequential reasoning: Pod → Event → Log → node — similar to chain-of-thought",
          "Platform teams already use AI for docs, runbooks, and internal chat — the cluster is the next surface",
        ],
      },
      {
        type: "h2",
        text: "What AI is genuinely good at in K8s",
      },
      {
        type: "h3",
        text: "Intent parsing and command synthesis",
      },
      {
        type: "p",
        text: "Models excel at turning messy sentences into structured actions: extracting namespace hints (“in staging”), resource names, replica counts, and verb choice (get vs scale vs rollback). That reduces friction for engineers who know what they want but don't want to reconstruct exact kubectl flag order at 2 a.m.",
      },
      {
        type: "code",
        caption: "Intent → plan (simplified)",
        code: `Prompt:  "scale payment-api to 3 in prod"
Plan:    kubectl scale deployment/payment-api --replicas=3 -n prod

Prompt:  "show me crashlooping pods in kube-system"
Plan:    kubectl get pods -n kube-system --field-selector=status.phase=Failed`,
      },
      {
        type: "h3",
        text: "Explanation and investigation chains",
      },
      {
        type: "p",
        text: "When something is wrong, operators walk a chain: Deployment status → ReplicaSet → Pod → Events → Logs. LLMs can orchestrate that narrative if the tool gathers real API data first — summarizing CrashLoopBackOff, image pull errors, or probe failures instead of guessing from training data.",
      },
      {
        type: "code",
        caption: "Explain-style prompts",
        code: `kprompt "why isn't redis ready?"
kprompt "explain why payment-api pods are restarting"
kprompt "describe the redis deployment"`,
      },
      {
        type: "h3",
        text: "Runbook acceleration — not runbook replacement",
      },
      {
        type: "p",
        text: "AI can draft the steps for “rollback canary” or “drain a bad node” faster than searching Confluence. The value is speed to a draft plan you still review. Mature teams treat model output like a junior SRE's suggestion: useful, never auto-executed on production without a human checkpoint.",
      },
      {
        type: "h2",
        text: "Where AI breaks on Kubernetes",
      },
      {
        type: "p",
        text: "Models don't live inside your cluster. Unless a tool fetches live state, an LLM will confabulate resource names, namespaces, and current replica counts. Even with retrieval, context windows limit how much of a large fleet you can inject. These failure modes are predictable — and they're why “chat with your cluster” products need engineering discipline, not just a slick UI.",
      },
      {
        type: "ul",
        items: [
          "Hallucinated resources — deploying redis when you meant redash",
          "Stale context — summarizing yesterday's Pod list after a rollout finished",
          "Wrong blast radius — delete commands without namespace scoping",
          "Policy blind spots — models don't know your org's change windows or PCI rules",
          "Non-determinism — the same prompt can yield different plans across providers or temperature settings",
        ],
      },
      {
        type: "h3",
        text: "Authorization is not a language problem",
      },
      {
        type: "p",
        text: "RBAC, admission webhooks, and human change management exist because production clusters need accountability. An LLM has no inherent model of who you are, what you're allowed to break, or whether this Tuesday is freeze week. Any AI layer must separate suggestion from execution — the same way CI separates build from deploy.",
      },
      {
        type: "h2",
        text: "Three architectures for AI on clusters",
      },
      {
        type: "h3",
        text: "1. In-cluster agents",
      },
      {
        type: "p",
        text: "An agent runs inside the cluster with ServiceAccount credentials, watches APIs, and answers questions. Pros: low latency to apiserver, can hold cluster-specific memory. Cons: another component to secure, upgrade, and audit; operators must trust what's running in prod; credential scope is sensitive.",
      },
      {
        type: "h3",
        text: "2. SaaS control planes",
      },
      {
        type: "p",
        text: "Send prompts and often kubeconfig or tokens to a hosted service. Pros: fast to try, managed models. Cons: data residency, credential handling, vendor lock-in, and a bigger blast radius if the service is compromised or misconfigured.",
      },
      {
        type: "h3",
        text: "3. Local CLI with BYOK (kprompt's bet)",
      },
      {
        type: "p",
        text: "Run on the operator's machine: your kubeconfig, your LLM API keys, plans printed locally before apply. The model sees what the tool gathers from kubectl/kubernetes clients — not a black-box remote agent. Mutations go through plan → safety → approve → apply. Reads can run immediately. Nothing requires installing an AI pod next to your workloads.",
      },
      {
        type: "ul",
        items: [
          "Credentials stay where they already are (kubeconfig + env vars)",
          "Every mutation is reviewable — diffs when available, risk scoring, hard denies",
          "Provider-agnostic — Gemini, OpenAI, Anthropic, Groq, Ollama locally, etc.",
          "CI can consume JSON PlanResult without auto-applying to prod",
        ],
      },
      {
        type: "h2",
        text: "A sane loop: Prompt → Plan → Safety → Apply",
      },
      {
        type: "p",
        text: "Whether you build in-house or use kprompt, the loop we recommend is boring on purpose. AI proposes; your toolchain and humans dispose. Safety rules run on structured plans, not on raw chat text. That lets you add AI speed without giving up the muscle memory of reading a plan before it hits the apiserver.",
      },
      {
        type: "code",
        caption: "Mutation with approval",
        code: `$ kprompt "rollback payment-api" -n production

Plan
  1. kubectl rollout undo deployment/payment-api -n production

Risk: medium — production namespace, deployment rollback
Apply? [y/N] n
Aborted.`,
      },
      {
        type: "p",
        text: "Hard denies catch patterns you never want silently applied — wide deletes, namespace wipes, and similar. Risk labels surface blast radius. On a TTY you confirm; in CI you emit JSON and gate with jq or policy engines — but the default is not silent apply.",
      },
      {
        type: "h2",
        text: "Kubernetes objects AI should understand next",
      },
      {
        type: "p",
        text: "v0.2 focuses on core workload operations. The interesting AI + K8s frontier is deeper integration with the ecosystem — always via real APIs, always with plans operators can read.",
      },
      {
        type: "ul",
        items: [
          "Helm — chart install/upgrade as first-class plans, not YAML pasted from chat",
          "HorizontalPodAutoscaler + metrics — “why didn't it scale?” needs Prometheus or metrics-server context",
          "Argo CD / Flux — sync status, drift, promote/rollback as GitOps-aware prompts",
          "CustomResourceDefinitions — Tekton, KEDA, Istio: models must call real CRD APIs, not invent fields",
          "OpenTelemetry traces — “why is checkout slow?” spans across Services, not single Pod logs",
        ],
      },
      {
        type: "p",
        text: "Each integration increases context quality — and increases the cost of wrong automation. That's why we're shipping breadth with approval gates, not autopilot.",
      },
      {
        type: "h2",
        text: "Choosing models for cluster work",
      },
      {
        type: "p",
        text: "Not every provider behaves the same on structured operational tasks. Fast models (Gemini Flash, Groq, small OpenAI tiers) are often enough for get/list and simple plans. Larger models help on multi-step explains and ambiguous prompts — at higher latency and cost. Local Ollama matters for air-gapped or privacy-sensitive environments; you trade model quality for data never leaving your network except to your apiserver.",
      },
      {
        type: "ul",
        items: [
          "Use fast models for read-heavy sessions and iteration",
          "Use stronger models when explains chain multiple resources",
          "Keep temperature low for plan generation — you want consistency, not creativity",
          "Log prompts locally (kprompt history) for replay and debugging — never log secrets",
        ],
      },
      {
        type: "h2",
        text: "What we tell every team evaluating AI + Kubernetes",
      },
      {
        type: "ul",
        items: [
          "Start on non-production — kind, minikube, or a sandbox namespace",
          "Never skip the plan — especially for delete, scale-to-zero, and cross-namespace ops",
          "Treat the LLM as a planner, not an authorizer",
          "Wire JSON plan output into CI before you wire auto-apply",
          "Measure wrong plans and near-misses — they're training data for better prompts and safety rules",
        ],
      },
      {
        type: "h2",
        text: "Try the loop on your cluster",
      },
      {
        type: "p",
        text: "If this map matches how you think about AI on Kubernetes — pragmatic, approval-first, API-grounded — kprompt is built for that workflow. Install, point at a sandbox context, and run read prompts before you approve any mutation.",
      },
      {
        type: "code",
        caption: "Quick start",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."
kprompt "list deployments"
kprompt "explain why api pods are not ready" -n staging
kprompt "scale api to 2" -n staging   # review plan before y`,
      },
      {
        type: "p",
        text: "We'll keep writing here about Helm depth, provider tuning, and safety patterns as we ship them. If you're experimenting with AI on your fleet, open an issue or PR — real operator feedback beats roadmap fiction.",
      },
    ],
  },
  {
    slug: "kubernetes-integrations-roadmap",
    title:
      "Kubernetes CLI integrations: Helm, GitOps, Prometheus, and the cloud-native stack",
    description:
      "An open-source Kubernetes CLI should speak to Helm, Argo CD, Prometheus, and more — not just kubectl. Here's why kprompt is building natural-language integrations across the cloud-native ecosystem, what's shipping now, and what's on the horizon.",
    publishedAt: "2026-07-24",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "kubernetes cli",
      "helm",
      "gitops",
      "prometheus",
      "platform engineering",
    ],
    keywords: [
      "kubernetes cli",
      "kubectl natural language",
      "kubernetes troubleshooting",
      "helm kubernetes",
      "argo cd kubernetes",
      "prometheus kubernetes",
      "gitops cli",
      "open source kubernetes tools",
      "kubernetes AI",
      "platform engineering tools",
      "cloud native operations",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "If you search for a Kubernetes CLI, kubectl is the default answer — and for good reason. It's the official client for the kube-apiserver: get Pods, apply manifests, debug Services, manage RBAC. But real platform work rarely stops at kubectl. You install charts with Helm, sync releases with Argo CD or Flux, ask Prometheus why latency spiked, trace requests with OpenTelemetry, and scale event-driven workloads with KEDA. Each tool has its own flags, CRDs, and failure modes.",
      },
      {
        type: "p",
        text: "kprompt is an open-source, MIT-licensed Kubernetes CLI that adds a natural-language layer on top of that ecosystem — with a non-negotiable rule: every mutation produces a reviewable plan before apply. Today we ship core workload operations (deploy, scale, rollback, explain, logs). Tomorrow we're wiring the rest of the stack the same way: real CLI calls and APIs, not hallucinated YAML from chat. This post is our public integration roadmap — what we're building, why it matters for Kubernetes operators, and how to try what's already live.",
      },
      {
        type: "h2",
        text: "Why a Kubernetes CLI needs more than kubectl",
      },
      {
        type: "p",
        text: "Kubernetes won because it standardized how workloads run. It did not standardize how you operate them day to day. A production cluster is a graph of controllers, metrics, Git repos, and policy engines. When payment-api is slow, the answer might live in Deployment events, HPA metrics, Istio routes, or yesterday's GitOps sync — not in a single kubectl get pods.",
      },
      {
        type: "ul",
        items: [
          "Helm owns packaged releases — install, upgrade, rollback charts without hand-writing every manifest",
          "GitOps controllers (Argo CD, Flux) own desired state in Git — drift and sync status matter as much as Pod status",
          "Prometheus and Grafana own SLOs — CPU, memory, latency, and error rates explain “slow” better than describe pod",
          "Workflow engines (Argo Workflows, Tekton) own batch and ML pipelines — different objects, same approval problem",
          "Service mesh and autoscaling (Istio, KEDA) change traffic and scale — operators need cross-tool context",
        ],
      },
      {
        type: "p",
        text: "A useful Kubernetes CLI in 2026 connects those surfaces with guardrails. kprompt's approach: parse operator intent in plain English, assemble a structured plan against live cluster state, run safety checks, then apply only after approval — whether the underlying step is kubectl, helm, or a PromQL query wrapper.",
      },
      {
        type: "h2",
        text: "What's live today in kprompt",
      },
      {
        type: "p",
        text: "Before the horizon, here's what you can run on a real kubeconfig right now — experimental software, always review plans before apply on production.",
      },
      {
        type: "ul",
        items: [
          "Natural-language deploy, scale, rollback, and named delete",
          "Kubernetes read path: get, list, describe, logs, explain",
          "Plan → safety → approve → apply with optional --wait on rollouts",
          "Bring your own LLM keys (Gemini, OpenAI, Anthropic, Groq, Ollama, and more)",
          "CI-stable JSON PlanResult for pipeline gates",
          "Local prompt history — no manifests or secrets stored server-side",
        ],
      },
      {
        type: "code",
        caption: "Kubernetes CLI examples (shipped)",
        code: `kprompt "list deployments" -n production
kprompt "why isn't redis ready?" -n staging
kprompt "scale api to 5" -n staging        # plan + approve
kprompt "rollback payment-api" -n prod`,
      },
      {
        type: "h2",
        text: "Next: Helm and deeper Kubernetes investigation",
      },
      {
        type: "h3",
        text: "Helm — chart install and upgrade in the plan",
      },
      {
        type: "p",
        text: "Most teams don't raw-apply every YAML. Helm packages Kubernetes apps as charts with values, release history, and rollback. A Kubernetes CLI that ignores Helm ignores how Redis, Postgres, and ingress controllers actually land on clusters. kprompt is adding Helm orchestration so prompts like install redis map to helm upgrade --install steps you read before exec — version, namespace, values diff when available.",
      },
      {
        type: "code",
        caption: "Helm integration (building)",
        code: `kprompt "install redis" -n cache
kprompt "upgrade prometheus chart" -n monitoring`,
      },
      {
        type: "h3",
        text: "Deeper Kubernetes troubleshooting chains",
      },
      {
        type: "p",
        text: "“Why isn't my deployment ready?” should not return a generic LLM essay. It should walk Deployment → ReplicaSet → Pod → Events → Logs in one explain flow, grounded in your apiserver. That's the difference between a Kubernetes AI toy and a troubleshooting CLI operators trust — especially during incidents when tab count is already too high.",
      },
      {
        type: "h2",
        text: "Metrics and workflows: Prometheus, Argo Workflows",
      },
      {
        type: "h3",
        text: "Prometheus — Kubernetes performance questions need numbers",
      },
      {
        type: "p",
        text: "Pods running is not the same as pods healthy. HorizontalPodAutoscaler decisions, CPU throttling, and p99 latency live in metrics — usually Prometheus or a compatible backend. Integrating PromQL (or metrics-server reads) lets kprompt answer why is my api slow with data, not guesses: replica count vs CPU vs request rate, surfaced in the plan or explain output before you change anything.",
      },
      {
        type: "code",
        caption: "Prometheus-aware prompts (planned)",
        code: `kprompt "why is my api slow?" -n production
kprompt "show CPU for payment-api pods last hour"`,
      },
      {
        type: "h3",
        text: "Argo Workflows — batch and ML on Kubernetes",
      },
      {
        type: "p",
        text: "Training jobs, ETL, and CI-adjacent batch work increasingly run as Argo Workflows CRDs. Operators shouldn't memorize workflow YAML to submit a run. Natural language should generate a Workflow manifest or argo submit plan — still reviewable, still approvable — for prompts like train a model or rerun last night's pipeline.",
      },
      {
        type: "h2",
        text: "Observability stack: OpenTelemetry and Grafana",
      },
      {
        type: "p",
        text: "Logs tell you what broke; traces tell you where time went. OpenTelemetry is the lingua franca for distributed tracing on Kubernetes — sidecars and collectors feeding Jaeger, Tempo, or vendor backends. kprompt's Grafana and OpenTelemetry integrations aim to connect terminal prompts to dashboards and trace IDs: show the checkout dashboard, find slow spans on payment-service, link back to the Deployment and revision.",
      },
      {
        type: "ul",
        items: [
          "OpenTelemetry — walk trace trees, highlight slow spans, tie to Services and Pods",
          "Grafana — open or summarize dashboards without leaving the shell",
          "Cross-signal explains — metrics + traces + events in one operator narrative",
        ],
      },
      {
        type: "h2",
        text: "GitOps: Argo CD, Flux, and safe rollbacks",
      },
      {
        type: "p",
        text: "GitOps shifts the source of truth to Git — but operators still ask operational questions: Is staging synced? Why did prod drift? Roll back to yesterday's commit. A Kubernetes CLI that only speaks kubectl misses the controller that actually applied the change. GitOps integrations mean kprompt plans against argocd app get, flux reconcile, or equivalent — promote, diff, rollback with the same approval gate as kubectl scale.",
      },
      {
        type: "code",
        caption: "GitOps prompts (exploring)",
        code: `kprompt "is payment-api synced in prod?"
kprompt "rollback yesterday's deployment" -n production`,
      },
      {
        type: "h2",
        text: "Cloud-native ecosystem: Tekton, KEDA, Istio, Crossplane",
      },
      {
        type: "p",
        text: "Mature Kubernetes platforms mix CRDs from across the CNCF landscape. Each adds power and operational surface area.",
      },
      {
        type: "ul",
        items: [
          "Tekton — CI/CD pipelines as Kubernetes resources; create and debug pipeline runs from prompts",
          "KEDA — event-driven autoscaling; explain why replicas hit zero or scale on queue depth",
          "Istio / service mesh — traffic policies, mTLS, and routing; debug 503s across VirtualServices",
          "Crossplane — cloud resources as claims; provision databases and buckets with strict approval gates",
        ],
      },
      {
        type: "p",
        text: "We're exploring these via real CRD APIs — not invented schema in model weights. If a tool isn't installed on your cluster, kprompt should say so clearly instead of fabricating a apply.",
      },
      {
        type: "h2",
        text: "One loop for every integration: plan before apply",
      },
      {
        type: "p",
        text: "The integration list is long because Kubernetes operations are long. The safety model stays short: Prompt → Plan → Safety → Apply. Helm upgrade, GitOps rollback, or Crossplane claim — you see steps, risk level, and hard-deny checks first. That's how an open-source Kubernetes CLI scales to the full cloud-native stack without becoming an autopilot you can't audit.",
      },
      {
        type: "ul",
        items: [
          "Structured plans — not raw chat text sent to a shell",
          "Risk scoring for destructive or production-scoped operations",
          "Hard denies on known-dangerous patterns",
          "JSON output for CI — gate plans without silent prod apply",
          "BYOK LLMs — no vendor lock-in on the model provider",
        ],
      },
      {
        type: "h2",
        text: "How this compares to other Kubernetes tools",
      },
      {
        type: "p",
        text: "kubectl remains essential — kprompt doesn't replace it; it orchestrates intent above it. Hosted “chat with your cluster” products optimize for demo speed; kprompt optimizes for operator control on your laptop with your kubeconfig. IDE copilots help write YAML; kprompt helps execute and investigate against live state. The goal is not the flashiest Kubernetes AI demo — it's a CLI you can use in staging on Tuesday and trust enough to review plans for prod on Wednesday.",
      },
      {
        type: "h2",
        text: "Try kprompt on your cluster today",
      },
      {
        type: "p",
        text: "Integrations roll out in public — issues and PRs welcome. Start with what's shipped: deploy, scale, explain, logs. Point at a non-production context, set an LLM key, and get familiar with the plan loop before Helm and Prometheus land.",
      },
      {
        type: "code",
        caption: "Install the open-source Kubernetes CLI",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."
kprompt config set namespace default
kprompt "list nodes"
kprompt "explain why nginx is crashlooping"`,
      },
      {
        type: "p",
        text: "Docs cover install, providers, safety, and CI JSON at kprompt.ai/docs. To influence priority — Helm vs GitOps vs metrics — comment on GitHub issues or join the contributor guide at kprompt.ai/team. The best Kubernetes CLI roadmap is the one shaped by operators running real clusters.",
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
