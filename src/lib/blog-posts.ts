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
        links: [
          { label: "kprompt.ai/docs", href: "/docs" },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
        ],
      },
    ],
  },
  {
    slug: "kubernetes-and-ai",
    title: "Kubernetes meets AI: what works, what breaks, and what's next",
    description:
      "Large language models change how operators talk to clusters — but they don't replace kube-apiserver truth. A practical map of AI + Kubernetes: use cases, failure modes, and why plan-before-apply matters.",
    publishedAt: "2026-07-16",
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
    publishedAt: "2026-07-16",
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
        links: [
          { label: "kprompt.ai/docs", href: "/docs" },
          {
            label: "GitHub issues",
            href: "https://github.com/kprompt/kprompt/issues",
          },
          { label: "kprompt.ai/team", href: "/team" },
        ],
      },
    ],
  },
  {
    slug: "kubernetes-troubleshooting-guide",
    title:
      "How to troubleshoot Kubernetes: deployments, pods, and crash loops from the terminal",
    description:
      "A practical guide to Kubernetes troubleshooting — CrashLoopBackOff, deployments not ready, image pull errors, and rollbacks — using kubectl workflows and natural-language explains with kprompt.",
    publishedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "troubleshooting",
      "devops",
      "sre",
      "kubectl",
    ],
    keywords: [
      "kubernetes troubleshooting",
      "kubernetes deployment not ready",
      "crashloopbackoff kubernetes",
      "kubectl debug pods",
      "kubernetes logs",
      "kubernetes events",
      "deployment rollout failed",
      "kubernetes rollback",
      "debug kubernetes cluster",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "Most Kubernetes incidents start the same way: a alert fires, a deploy pipeline goes red, or someone asks in Slack why staging is broken. You know the namespace, maybe the app name — and then the archaeology begins. kubectl get pods shows CrashLoopBackOff. describe surfaces a failed probe. logs show a stack trace from three revisions ago. Events scroll off the buffer. You're not missing skill; you're missing time.",
      },
      {
        type: "p",
        text: "This guide walks through the troubleshooting patterns every operator uses on real clusters — and how to run them faster with plain English when kprompt is in your toolkit. Nothing here replaces understanding Kubernetes; it compresses the repetitive glue work so you can focus on the fix.",
      },
      {
        type: "h2",
        text: "The standard Kubernetes troubleshooting ladder",
      },
      {
        type: "p",
        text: "Whether you type kubectl yourself or describe intent in natural language, the investigation order is similar. Start wide, narrow to the broken object, then read signals.",
      },
      {
        type: "ul",
        items: [
          "Scope — confirm context, namespace, and which workload is affected",
          "Status — Deployment / StatefulSet / DaemonSet conditions and replica counts",
          "Pods — phase, restarts, ready containers, node placement",
          "Events — Warning events often beat logs for the first clue",
          "Logs — application output after you know which Pod revision matters",
          "Change — what deployed, scaled, or config-mapped recently",
        ],
      },
      {
        type: "code",
        caption: "Classic kubectl sequence",
        code: `kubectl config current-context
kubectl get deploy,po -n staging
kubectl describe deploy api -n staging
kubectl get events -n staging --sort-by='.lastTimestamp'
kubectl logs deploy/api -n staging --tail=100`,
      },
      {
        type: "p",
        text: "kprompt maps the same ladder to prompts — especially on the read path, which runs immediately without an apply gate:",
      },
      {
        type: "code",
        caption: "Natural-language equivalents",
        code: `kprompt "list deployments" -n staging
kprompt "why isn't api ready?" -n staging
kprompt "describe api" -n staging
kprompt "logs api" -n staging --tail 100`,
      },
      {
        type: "h2",
        text: "Deployment not ready",
      },
      {
        type: "p",
        text: "Deployment not ready usually means availableReplicas < desiredReplicas. Common causes: image pull failures, failed readiness probes, insufficient cluster resources, PodDisruptionBudget blocks, or a bad rollout stuck on maxUnavailable.",
      },
      {
        type: "h3",
        text: "What to look for",
      },
      {
        type: "ul",
        items: [
          "kubectl describe deployment — Conditions and Events at the bottom",
          "ReplicaSet generations — old RS still scaling down?",
          "Pod template changes — env, image tag, resource limits",
          "Probes — readiness failing while app still booting?",
        ],
      },
      {
        type: "code",
        caption: "Example prompts",
        code: `kprompt "explain why deployment api is not ready" -n staging
kprompt "show replica sets for api" -n staging`,
      },
      {
        type: "p",
        text: "Fix paths are often rollout undo, scale temporarily, or patch config — all mutating. With kprompt, you'll see the plan (kubectl rollout undo, kubectl scale, etc.) and approve only after it matches your intent.",
      },
      {
        type: "h2",
        text: "CrashLoopBackOff",
      },
      {
        type: "p",
        text: "CrashLoopBackOff means the container starts, exits non-zero, and kubelet backs off retries. It's a symptom — not a root cause. The exit might be a missing env var, bad command, OOMKill, or dependency unreachable on startup.",
      },
      {
        type: "ul",
        items: [
          "kubectl logs pod/... --previous — logs from the last crashed instance",
          "describe pod — Last State, Exit Code, OOMKilled, probe failures",
          "Check ConfigMap/Secret mounts and file paths the entrypoint expects",
          "Compare working vs broken revision — what changed in the image or values?",
        ],
      },
      {
        type: "code",
        caption: "Crash loop investigation",
        code: `kprompt "explain why redis is crashlooping" -n cache
kprompt "logs redis" -n cache
kprompt "describe pod for redis" -n cache`,
      },
      {
        type: "h2",
        text: "ImagePullBackOff and registry issues",
      },
      {
        type: "p",
        text: "Image pull errors are operational, not mystical: wrong tag, deleted image, registry auth (imagePullSecrets), rate limits, or private registry DNS from the node. Events on the Pod usually state the exact reason. Fix forward is correcting the Deployment image or secret — again, a planned mutation you should read before apply.",
      },
      {
        type: "h2",
        text: "Service has no endpoints",
      },
      {
        type: "p",
        text: "Traffic blackholes when Service selectors don't match Pod labels, Pods aren't Ready, or you're hitting the wrong port name. Trace Service → Endpoints → backing Pods. Ingress and mesh layers add another hop — but start at Endpoints empty.",
      },
      {
        type: "code",
        caption: "Connectivity checks",
        code: `kprompt "get service api" -n staging
kprompt "list pods for api with labels" -n staging
kprompt "explain why service api has no endpoints" -n staging`,
      },
      {
        type: "h2",
        text: "When the fix is rollback or scale",
      },
      {
        type: "p",
        text: "During incidents, the fastest safe move is often rollback to last good revision or scale out to absorb load — not debugging for forty minutes while users wait. kprompt treats these as medium-risk mutations: you see exact kubectl commands, namespace, and rollout target before confirming.",
      },
      {
        type: "code",
        caption: "Recovery actions (plan + approve)",
        code: `$ kprompt "rollback api" -n production

Plan
  1. kubectl rollout undo deployment/api -n production

Risk: medium
Apply? [y/N] y

$ kprompt "scale api to 5" -n production --wait

Plan
  1. kubectl scale deployment/api --replicas=5 -n production
  2. kubectl rollout status deployment/api -n production --timeout=5m

Risk: low
Apply? [y/N] y`,
      },
      {
        type: "h2",
        text: "Production discipline while troubleshooting",
      },
      {
        type: "p",
        text: "Speed and safety pull in opposite directions during outages. A few rules we follow and recommend:",
      },
      {
        type: "ul",
        items: [
          "Read first — explain, logs, describe before any mutate in prod",
          "Never --approve a prompt you haven't run in staging when the blast radius is unclear",
          "Prefer named operations — kprompt hard-denies wipe-everything language and whole-namespace deletes",
          "Use --wait after rollbacks and scales so you know the Deployment actually recovered",
          "Capture the plan — kprompt history or --output json for post-incident review",
        ],
      },
      {
        type: "h2",
        text: "Staging vs production contexts",
      },
      {
        type: "p",
        text: "Reproduce in staging with the same prompt before prod apply. kprompt respects kubeconfig context and -n namespace — set defaults in ~/.kprompt/config.yaml or pass flags explicitly so prod accidents don't come from ambiguous pronouns in the prompt.",
      },
      {
        type: "code",
        caption: "Context and namespace",
        code: `kprompt config set context staging-cluster
kprompt config set namespace staging
kprompt "explain why api is down"

# Production — explicit flags
kprompt "rollback api" -n production --context prod-cluster`,
      },
      {
        type: "h2",
        text: "After the incident",
      },
      {
        type: "p",
        text: "Replay from kprompt history to compare what you asked vs what ran. Wire JSON plan output into CI so the same prompts get gated in pipelines before anyone touches shared clusters. Troubleshooting skill compounds when your tooling leaves an audit trail — not just shell scrollback.",
      },
      {
        type: "code",
        caption: "History and CI",
        code: `kprompt history
kprompt history rerun 2

kprompt "scale api to 10" -n prod -o json | jq -e '.risk.denied == false'`,
      },
      {
        type: "h2",
        text: "Get started",
      },
      {
        type: "p",
        text: "Install kprompt, point at a non-production cluster, and practice explain and logs prompts on a broken test deployment before you need them at 3 a.m. Full safety and command reference: kprompt.ai/docs.",
        links: [{ label: "kprompt.ai/docs", href: "/docs" }],
      },
      {
        type: "code",
        caption: "Install",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."
kprompt "list pods" -n staging
kprompt "why isn't my deployment ready?" -n staging`,
      },
    ],
  },
  {
    slug: "kubernetes-ci-cd-plan-gates",
    title:
      "Kubernetes in CI/CD: gating cluster changes with plan JSON before apply",
    description:
      "How to use kprompt PlanResult JSON in CI/CD pipelines to review Kubernetes scale, deploy, and rollback plans before apply — with jq gates, GitHub Actions patterns, and production safety rules.",
    publishedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ci/cd",
      "devops",
      "platform engineering",
      "automation",
    ],
    keywords: [
      "kubernetes ci cd",
      "kubernetes pipeline",
      "gitops ci",
      "kubernetes deployment automation",
      "kubectl ci cd",
      "kubernetes change management",
      "platform engineering ci",
      "kubernetes approval gate",
      "devops automation kubernetes",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "CI/CD pipelines love deterministic steps: build, test, scan, deploy. Kubernetes breaks the fantasy the moment someone runs kubectl apply -f or helm upgrade from a GitHub Action without a human reading the diff. The pipeline goes green; the cluster goes red. Platform teams respond with policy engines, admission webhooks, and mandatory reviews — all necessary, all heavy.",
      },
      {
        type: "p",
        text: "kprompt adds a lighter pattern for natural-language or ticket-driven changes: emit a structured PlanResult as JSON, gate it in CI with jq or policy checks, then apply in a separate step only if the plan passes. This post shows how to wire that loop for Kubernetes scale, deploy, and rollback — without treating the LLM as an autorun root user.",
      },
      {
        type: "h2",
        text: "Why plan-before-apply belongs in CI",
      },
      {
        type: "p",
        text: "Continuous delivery to Kubernetes should separate intent from execution. Intent might come from a PR label, a Slack slash command translated to a prompt, or an operator-maintained runbook string. Execution should be kubectl-compatible commands you can diff, log, and reject.",
      },
      {
        type: "ul",
        items: [
          "Plans are inspectable — actions, namespace, risk level, denied flag",
          "JSON is machine-readable — jq, OPA, or custom gates without parsing shell text",
          "Apply is optional and distinct — same prompt, second invocation with --approve",
          "Secrets stay out of stdout — manifests and API keys are never in PlanResult",
          "Human UI goes to stderr in JSON mode — logs stay clean for artifacts",
        ],
      },
      {
        type: "h2",
        text: "PlanResult JSON in one minute",
      },
      {
        type: "p",
        text: "Run kprompt with --output json or -o json. stdout is a single PlanResult document (apiVersion kprompt.io/v1, kind PlanResult). Key fields for pipelines:",
      },
      {
        type: "ul",
        items: [
          "plan.intent — scale, deploy, rollback, get, explain, …",
          "plan.actions — ordered ops (no raw YAML blobs)",
          "risk.level — low / medium / high / denied",
          "risk.denied — hard deny; pipeline should fail fast",
          "applied — whether a mutation actually ran (false on plan-only runs)",
        ],
      },
      {
        type: "code",
        caption: "Emit a plan",
        code: `kprompt "scale api to 10" -n prod -o json > plan.json
cat plan.json | jq '.plan.actions, .risk'`,
      },
      {
        type: "h2",
        text: "Two-stage pipeline: gate, then apply",
      },
      {
        type: "p",
        text: "The safest default is two jobs or steps: (1) generate and validate JSON; (2) apply only on main branch or after manual approval, reusing the same prompt with --approve --wait. Never combine loose jq gates with --approve on production in the same unreviewed script.",
      },
      {
        type: "code",
        caption: "Bash gate script",
        code: `#!/usr/bin/env bash
set -euo pipefail

PROMPT='scale api to 10'
NS=prod

json="$(kprompt "$PROMPT" -n "$NS" -o json)"

# Hard deny — stop immediately
echo "$json" | jq -e '.risk.denied == false' >/dev/null

# Intent must match expectation
echo "$json" | jq -e '.plan.intent == "scale"' >/dev/null

# Reject high-risk in automated staging gates
echo "$json" | jq -e '.risk.level != "high"' >/dev/null

# Reject delete ops in this pipeline
echo "$json" | jq -e '[.plan.actions[].op] | index("delete") | not' >/dev/null

echo "$json" > "plan-$(date +%s).json"
echo "Plan passed gates."`,
      },
      {
        type: "code",
        caption: "Apply step (after gate + human approval)",
        code: `# Same prompt — explicit approve + wait for rollout
kprompt "scale api to 10" -n prod --approve --wait --timeout 10m`,
      },
      {
        type: "h2",
        text: "GitHub Actions pattern",
      },
      {
        type: "p",
        text: "Store kubeconfig and LLM keys in GitHub Secrets. Use environment protection rules so the apply job requires reviewer approval. Plan job runs on every PR; apply job only on workflow_dispatch or merge to main.",
      },
      {
        type: "code",
        caption: "Sketch workflow",
        code: `# .github/workflows/kprompt-plan.yml
jobs:
  plan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install kprompt
        run: curl -fsSL https://kprompt.ai/install | bash
      - name: Plan scale
        env:
          KPROMPT_GEMINI_API_KEY: \${{ secrets.KPROMPT_GEMINI_API_KEY }}
          KUBECONFIG: \${{ secrets.KUBECONFIG_STAGING }}
        run: |
          json=$(kprompt "scale api to 3" -n staging -o json)
          echo "$json" | jq -e '.risk.denied == false'
          echo "$json" | jq -e '.plan.intent == "scale"'
          echo "$json" > plan.json
      - uses: actions/upload-artifact@v4
        with:
          name: kprompt-plan
          path: plan.json

  apply:
    needs: plan
    if: github.ref == 'refs/heads/main'
    environment: staging-k8s   # required reviewers
    runs-on: ubuntu-latest
    steps:
      - name: Apply (approved)
        env:
          KPROMPT_GEMINI_API_KEY: \${{ secrets.KPROMPT_GEMINI_API_KEY }}
          KUBECONFIG: \${{ secrets.KUBECONFIG_STAGING }}
        run: |
          kprompt "scale api to 3" -n staging --approve --wait`,
      },
      {
        type: "h2",
        text: "Common jq gates for Kubernetes pipelines",
      },
      {
        type: "ul",
        items: [
          ".risk.denied == false — mandatory baseline",
          ".plan.intent == \"scale\" — ticket says scale, plan must say scale",
          ".risk.level != \"high\" — block auto-path for high blast radius",
          "No delete op in plan.actions — read-only or scale-only pipelines",
          "Namespace label in metadata — reject cross-namespace surprises (when exposed in schema)",
        ],
      },
      {
        type: "code",
        caption: "Extra jq examples",
        code: `# Fail if plan includes rollback (use dedicated workflow instead)
echo "$json" | jq -e '.plan.intent != "rollback"'

# Pretty-print for human review in CI logs
echo "$json" | jq '{ intent: .plan.intent, risk: .risk, actions: .plan.actions }'`,
      },
      {
        type: "h2",
        text: "Where this fits in GitOps",
      },
      {
        type: "p",
        text: "GitOps (Argo CD, Flux) keeps desired state in Git — CI builds images and updates manifests. kprompt is not a replacement for GitOps; it's complementary for operational prompts that don't belong in a repo: scale for a drill, rollback during an incident, explain why staging is red before you merge. Use PlanResult JSON to gate those operational paths the same way you gate manifest diffs.",
      },
      {
        type: "ul",
        items: [
          "GitOps — declarative desired state, PR review on YAML",
          "kprompt CI — imperative day-2 ops with structured plan artifacts",
          "Together — Git for steady state, gated prompts for break-glass and capacity",
        ],
      },
      {
        type: "h2",
        text: "Anti-patterns to avoid",
      },
      {
        type: "ul",
        items: [
          "Single step with -o json --approve on production — skips human review entirely",
          "Loose jq (only checking .applied) — doesn't validate intent or risk",
          "Shared kubeconfig with cluster-admin in CI — scope ServiceAccounts per pipeline",
          "Storing LLM or kube secrets in plan artifacts — PlanResult excludes them; keep artifacts clean",
          "Assuming experimental CLI is production-hardened — start on staging, tune gates over time",
        ],
      },
      {
        type: "h2",
        text: "Read-only checks in CI (no apply)",
      },
      {
        type: "p",
        text: "Not every pipeline step mutates. Use get, list, and explain in JSON mode for smoke tests after deploy — verify workloads exist, pods ready, no denied risk because reads don't mutate.",
      },
      {
        type: "code",
        caption: "Post-deploy smoke",
        code: `json=$(kprompt "list deployments" -n staging -o json)
echo "$json" | jq -e '.plan.intent == "get" or .plan.intent == "list"'
echo "$json" | jq '.result'`,
      },
      {
        type: "h2",
        text: "History and audit",
      },
      {
        type: "p",
        text: "Locally, kprompt history stores recent prompts and plan summaries in ~/.kprompt/history.jsonl — useful for correlating CI prompts with incident timelines. In CI, upload plan.json artifacts and retain them with your build logs. schemaVersion in PlanResult is stable at 1; bump-aware parsers keep pipelines working across CLI upgrades.",
      },
      {
        type: "h2",
        text: "Try it on staging first",
      },
      {
        type: "p",
        text: "Install kprompt in a branch pipeline, emit JSON for a harmless list or describe prompt, then progress to scale on staging with two-stage gate + environment approval. Full schema and jq helpers: kprompt.ai/docs/ci.",
        links: [{ label: "kprompt.ai/docs/ci", href: "/docs/ci" }],
      },
      {
        type: "code",
        caption: "Quick start",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."
kprompt "scale api to 2" -n staging -o json | jq .
kprompt "scale api to 2" -n staging --approve --wait`,
      },
    ],
  },
  {
    slug: "kubernetes-llm-providers-byok",
    title:
      "Choosing an LLM for Kubernetes: BYOK providers, privacy, and what to run in prod",
    description:
      "Compare Gemini, OpenAI, Anthropic, Groq, and Ollama for Kubernetes CLI workflows with kprompt — BYOK keys, air-gapped setups, model speed vs explain quality, and security rules for operators.",
    publishedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "llm",
      "ai",
      "devops",
      "security",
    ],
    keywords: [
      "kubernetes llm",
      "ollama kubernetes",
      "openai kubernetes",
      "gemini devops",
      "byok llm",
      "local llm kubernetes",
      "anthropic cli",
      "kubernetes ai tools",
      "private llm deployment",
      "kprompt providers",
    ],
    blocks: [
      {
        type: "p",
        text: "Natural-language Kubernetes tools need a model somewhere. The question platform teams ask first is not which prompt template wins — it's where your data goes, which API key gets billed, and whether an air-gapped cluster forces local inference. kprompt is bring-your-own-key (BYOK) by design: your kubeconfig stays local, your provider keys stay in environment variables, and ~/.kprompt/config.yaml never stores secrets.",
      },
      {
        type: "p",
        text: "This guide compares the LLM providers kprompt supports today — when to pick Gemini Flash for speed, Claude or GPT for hard explains, Groq for low-latency iteration, Ollama for offline — and the security habits that matter when kubectl output flows to a model.",
      },
      {
        type: "h2",
        text: "What actually gets sent to the LLM",
      },
      {
        type: "p",
        text: "Transparency matters for security reviews. kprompt sends your prompt plus context the tool gathers to plan or explain — intent parsing, kubectl get/describe/log snippets, cluster metadata needed for the operation. It does not upload your kubeconfig file. API keys travel only to the provider you choose (or to localhost for Ollama). PlanResult JSON and history store plan summaries locally — not full manifests, not env secrets.",
      },
      {
        type: "ul",
        items: [
          "Sent — user prompt, selected provider/model, operational context for the plan",
          "Not stored in config — API keys (env vars only)",
          "Not in PlanResult stdout — manifests, kubeconfig, raw secrets",
          "Your choice — cloud API vs local Ollama on the same laptop as kubectl",
        ],
      },
      {
        type: "h2",
        text: "Supported providers at a glance",
      },
      {
        type: "p",
        text: "Set provider in ~/.kprompt/config.yaml or pass --provider on each run. Default models ship sensible for CLI work; override with --model when you need more capacity.",
      },
      {
        type: "table",
        headers: ["Provider", "Flag", "Env key", "Default model"],
        rows: [
          ["OpenAI", "openai", "KPROMPT_OPENAI_API_KEY", "gpt-4o-mini"],
          ["Anthropic", "anthropic", "KPROMPT_ANTHROPIC_API_KEY", "claude-sonnet-4-20250514"],
          ["Gemini", "gemini", "KPROMPT_GEMINI_API_KEY", "gemini-2.0-flash"],
          ["Groq", "groq", "KPROMPT_GROQ_API_KEY", "llama-3.3-70b-versatile"],
          ["Mistral", "mistral", "KPROMPT_MISTRAL_API_KEY", "mistral-small-latest"],
          ["DeepSeek", "deepseek", "KPROMPT_DEEPSEEK_API_KEY", "deepseek-chat"],
          ["OpenRouter", "openrouter", "KPROMPT_OPENROUTER_API_KEY", "openai/gpt-4o-mini"],
          ["Together", "together", "KPROMPT_TOGETHER_API_KEY", "Llama 3.1 8B Turbo"],
          ["Ollama", "ollama", "(none required)", "llama3.2"],
          ["OpenAI-compatible", "openai-compatible", "KPROMPT_OPENAI_API_KEY", "set base_url"],
        ],
      },
      {
        type: "h2",
        text: "When to use each provider",
      },
      {
        type: "h3",
        text: "Gemini — fast default for daily ops",
      },
      {
        type: "p",
        text: "Gemini 2.0 Flash is a strong default for list/get/scale plans and short explains: low latency, low cost, good structured output. Most kprompt docs and examples use Gemini for that reason. Platform engineers running dozens of prompts per shift often standardize here first.",
      },
      {
        type: "code",
        caption: "Gemini setup",
        code: `export KPROMPT_GEMINI_API_KEY="..."
kprompt config set provider gemini
kprompt config set model gemini-2.0-flash
kprompt "list deployments" -n staging`,
      },
      {
        type: "h3",
        text: "OpenAI and Anthropic — harder explains",
      },
      {
        type: "p",
        text: "Multi-step troubleshooting — chain Deployment → Pod → Events → Logs with nuance — benefits from larger models. GPT-4o class and Claude Sonnet tend to hold context across ambiguous prompts better than the smallest tiers. Use them for incident explains; use Flash/Mini for routine mutations you already review in the plan anyway.",
      },
      {
        type: "code",
        caption: "Switch provider per command",
        code: `export KPROMPT_ANTHROPIC_API_KEY="..."
kprompt --provider anthropic "explain why api is crashlooping" -n prod

export KPROMPT_OPENAI_API_KEY="..."
kprompt --provider openai --model gpt-4o "explain HPA behavior" -n prod`,
      },
      {
        type: "h3",
        text: "Groq — low-latency iteration",
      },
      {
        type: "p",
        text: "Groq excels when you're iterating on prompts in a tight loop — tuning safety gates, testing intent phrasing, running history reruns. Pair with staging clusters while you learn how plans look before touching production.",
      },
      {
        type: "h3",
        text: "OpenRouter and Together — model shopping",
      },
      {
        type: "p",
        text: "OpenRouter and Together let you route to many underlying models with one key — useful for teams that already centralize LLM spend or want A/B tests on plan quality without changing kprompt config structure.",
      },
      {
        type: "h3",
        text: "Ollama — local and air-gapped Kubernetes ops",
      },
      {
        type: "p",
        text: "Run Ollama on the same machine as kprompt; no cloud API call leaves your network except to your Kubernetes apiserver. Quality varies by local model — llama3.2 works for simple get/list; heavier explains may need larger quantized models. Ideal for regulated environments, offline labs, and kind clusters on laptops.",
      },
      {
        type: "code",
        caption: "Local Ollama",
        code: `ollama serve &
ollama pull llama3.2

kprompt config set provider ollama
kprompt config set model llama3.2
kprompt "list pods" -n default`,
      },
      {
        type: "h2",
        text: "Configuration without leaking secrets",
      },
      {
        type: "p",
        text: "kprompt config persists provider, model, namespace, context, and base_url — never API keys. config view shows api_key: set or unset. That split makes it safe to commit example config snippets in runbooks while keys live in shell profile, 1Password, or CI secrets.",
      },
      {
        type: "code",
        caption: "Config vs secrets",
        code: `kprompt config set provider gemini
kprompt config set namespace staging
kprompt config   # api_key: unset until you export KPROMPT_GEMINI_API_KEY

# Never put this in config.yaml — env only
export KPROMPT_GEMINI_API_KEY="..."`,
      },
      {
        type: "h2",
        text: "Model choice by Kubernetes task",
      },
      {
        type: "ul",
        items: [
          "get / list / describe — fast models (Gemini Flash, gpt-4o-mini, Groq Llama)",
          "scale / deploy / rollback plans — fast models OK; you approve the kubectl line anyway",
          "explain / why-is-it-broken — stronger models when chains get long",
          "CI JSON gates — pick one provider per pipeline for deterministic-ish plans; pin model version",
          "Air-gap — Ollama only; accept lower quality or run bigger local models",
        ],
      },
      {
        type: "h2",
        text: "Security checklist for platform teams",
      },
      {
        type: "ul",
        items: [
          "Use dedicated API keys per team or pipeline — rotate independently of personal keys",
          "Scope kubeconfig in CI to the namespace ServiceAccount you intend — not cluster-admin",
          "Review provider data policies if log snippets may contain PII from application output",
          "Disable history on shared jump hosts if prompts are sensitive (KPROMPT_DISABLE_HISTORY=1)",
          "Treat cloud LLM calls like any third-party SaaS — network egress allowlists if required",
          "Prefer Ollama when policy forbids operational data leaving the VPC",
        ],
      },
      {
        type: "h2",
        text: "OpenAI-compatible endpoints",
      },
      {
        type: "p",
        text: "Enterprise gateways, Azure OpenAI, and internal proxies often speak OpenAI-compatible APIs. Set provider to openai-compatible, configure base_url in config, and use KPROMPT_OPENAI_API_KEY for the gateway token. Same plan → approve loop; different upstream.",
      },
      {
        type: "code",
        caption: "Custom base URL",
        code: `kprompt config set provider openai-compatible
kprompt config set base_url https://llm-gateway.internal/v1
export KPROMPT_OPENAI_API_KEY="gateway-token"
kprompt "list nodes"`,
      },
      {
        type: "h2",
        text: "Cost and rate limits",
      },
      {
        type: "p",
        text: "Read-heavy days (incident explains, log summaries) burn more tokens than a single scale plan. Fast models reduce cost; caching comes from kprompt history replay (rerun prior prompts without rephrasing). For org-wide rollouts, standardize on one cheap provider for mutations and one quality provider for explains — both BYOK, billed to your accounts.",
      },
      {
        type: "h2",
        text: "Try multiple providers on staging",
      },
      {
        type: "p",
        text: "Run the same prompt across Gemini, OpenAI, and Ollama on a kind cluster. Compare plan clarity, not just speed. kprompt makes switching a one-flag experiment — your kubeconfig and safety rules stay constant.",
      },
      {
        type: "code",
        caption: "Same prompt, three providers",
        code: `PROMPT='explain why nginx is not ready'
kprompt --provider gemini "$PROMPT" -n default
kprompt --provider openai "$PROMPT" -n default
kprompt --provider ollama --model llama3.2 "$PROMPT" -n default`,
      },
      {
        type: "p",
        text: "Full provider table and env var reference: kprompt.ai/docs/providers. Install once, swap models as your security and quality bar evolves — no hosted kprompt account required.",
        links: [
          {
            label: "kprompt.ai/docs/providers",
            href: "/docs/providers",
          },
        ],
      },
    ],
  },
  {
    slug: "kubernetes-safety-plan-approve",
    title:
      "Kubernetes safety with AI: plan, approve, hard denies, and production discipline",
    description:
      "Why natural-language Kubernetes tools need plan-before-apply, risk scoring, and hard denies — with real kprompt examples for scale, rollback, and blocked wipe prompts.",
    publishedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "safety",
      "devops",
      "sre",
      "platform engineering",
    ],
    keywords: [
      "kubernetes safety",
      "kubernetes production best practices",
      "kubernetes change management",
      "ai kubernetes safety",
      "kubectl production",
      "kubernetes rollback",
      "kubernetes approval workflow",
      "platform engineering safety",
      "kubernetes hardening",
      "kprompt safety",
    ],
    blocks: [
      {
        type: "p",
        text: "The fastest way to hurt a Kubernetes cluster with AI is also the simplest: pipe model output straight to bash. One wrong namespace, one hallucinated resource name, one delete verb you didn't read — and your incident becomes a postmortem about automation, not about the original bug. Safety is not a feature checkbox for AI ops tools. It's the architecture.",
      },
      {
        type: "p",
        text: "kprompt treats every mutating prompt as untrusted until a human or an explicitly configured pipeline approves a structured plan. Read-only work (get, list, explain, logs, describe) runs immediately. Everything else hits Plan → Safety → Apply. This post explains that loop, what hard denies block, and the production habits that still matter when the CLI does the right thing.",
      },
      {
        type: "h2",
        text: "Plan → Safety → Apply (the whole model)",
      },
      {
        type: "p",
        text: "Prompt in plain English. kprompt maps intent to concrete operations — usually kubectl commands with namespace and context resolved. Before exec, the tool evaluates risk: low, medium, high, or denied. On a TTY you confirm y/N unless you pass --approve. Denied plans never run, regardless of flags.",
      },
      {
        type: "code",
        caption: "Scale with review",
        code: `$ kprompt "scale api to 3" -n staging

Plan
  1. kubectl scale deployment/api --replicas=3 -n staging

Risk: low
Apply? [y/N]`,
      },
      {
        type: "p",
        text: "That pause is the product. The LLM suggested intent; the plan shows exactly what touches the apiserver. You're not approving English — you're approving commands.",
      },
      {
        type: "h2",
        text: "Hard denies: what never applies",
      },
      {
        type: "p",
        text: "Some prompts fail closed. Hard denies catch wipe-class language and operations outside named-resource delete rules. Models can be manipulated or confused; hard denies don't negotiate.",
      },
      {
        type: "ul",
        items: [
          "Cluster or namespace wipe phrasing",
          "Delete-everything style requests",
          "Deleting an entire namespace",
          "Deletes that aren't a named Pod, Deployment, or Service",
        ],
      },
      {
        type: "code",
        caption: "Always blocked",
        code: `$ kprompt "delete all pods in production"

Risk: denied
# Plan does not apply — named resources only`,
      },
      {
        type: "p",
        text: "Named delete still requires approval and shows up in the plan — you delete deployment redis, not everything in a namespace. That matches how careful operators already work; the CLI enforces it even when the prompt is reckless.",
      },
      {
        type: "h2",
        text: "Risk levels and what they mean",
      },
      {
        type: "ul",
        items: [
          "low — routine scale or rollout on scoped resources; still needs approval on a TTY",
          "medium — production namespaces, rollbacks, or wider blast radius",
          "high — operations that deserve extra scrutiny and slower approval",
          "denied — hard stop; fix the prompt or use supported delete patterns",
        ],
      },
      {
        type: "p",
        text: "Risk labels are signals, not substitutes for reading the plan. Medium in staging might be acceptable during a drill; medium in production might need a second pair of eyes — process kprompt doesn't replace.",
      },
      {
        type: "h2",
        text: "Live diffs: review the change, not just the sentence",
      },
      {
        type: "p",
        text: "When the target object exists, plans can include before→after diffs — replica count changes, image tag updates, resource limit patches. That's critical for AI-assisted ops: the model's summary might sound right while the diff shows a wrong tag or limit. Train teams to look at diffs first on mutations that change spec.",
      },
      {
        type: "h2",
        text: "When --approve is appropriate",
      },
      {
        type: "p",
        text: "--approve skips the interactive y/N prompt. Use it in CI after JSON gates, in scripts you've tested on staging, or in replay from kprompt history when the plan is unchanged. Do not use it as default on production laptops because it's convenient.",
      },
      {
        type: "ul",
        items: [
          "OK — staging automation with jq gates on PlanResult JSON",
          "OK — history rerun of a plan you already reviewed interactively",
          "OK — local kind clusters while learning the tool",
          "Risky — first time running an unfamiliar prompt in prod",
          "Risky — combining --approve with loose CI checks",
        ],
      },
      {
        type: "code",
        caption: "Approve with wait on rollout",
        code: `kprompt "rollback api" -n staging --approve --wait --timeout 10m`,
      },
      {
        type: "h2",
        text: "Safety vs RBAC vs admission control",
      },
      {
        type: "p",
        text: "kprompt safety is not a replacement for Kubernetes RBAC, OPA/Gatekeeper, or Kyverno. It's a pre-execution layer on the operator's machine. RBAC limits what credentials can do; admission hooks enforce org policy at the apiserver; kprompt limits what gets suggested and executed from natural language before it reaches either. Stack all three for production.",
      },
      {
        type: "table",
        headers: ["Layer", "Where it runs", "What it blocks"],
        rows: [
          ["kprompt plan/safety", "Operator laptop / CI", "Bad prompts, wipe language, unreviewed apply"],
          ["RBAC", "apiserver", "Unauthorized API calls for the identity"],
          ["Admission policy", "apiserver", "Non-compliant manifests and forbidden fields"],
        ],
      },
      {
        type: "h2",
        text: "Three demo scenarios that show the model",
      },
      {
        type: "h3",
        text: "1. Plan + approve scale",
      },
      {
        type: "p",
        text: "The bread-and-butter demo: scale a Deployment, read the kubectl line, accept or reject. For recordings without apply, use JSON output and jq to show intent and risk without touching the cluster.",
      },
      {
        type: "code",
        caption: "JSON without apply",
        code: `kprompt --output json "scale api to 3" -n staging | \\
  jq '{intent:.plan.intent, risk:.risk.level, denied:.risk.denied}'`,
      },
      {
        type: "h3",
        text: "2. Explain before mutate",
      },
      {
        type: "p",
        text: "Incident flow: explain why a workload is crashing (read path, no approval), understand OOM or probe failure, then consider a bounded fix — memory patch or rollback — with a fresh plan and approval. AI accelerates diagnosis; humans still own the fix.",
      },
      {
        type: "code",
        caption: "Read then act",
        code: `kprompt "explain why api is crashing" -n staging
# ... read output ...
kprompt "rollback api" -n staging   # separate plan + approve`,
      },
      {
        type: "h3",
        text: "3. Safety denial",
      },
      {
        type: "p",
        text: "Show that wipe language fails closed. Stakeholders need to see denial as success — the tool refused an unsafe class of operation, not a model error.",
      },
      {
        type: "h2",
        text: "Experimental software — stay honest",
      },
      {
        type: "p",
        text: "kprompt is early-stage MIT CLI. Safety rules reduce risk; they do not certify production readiness. Plans can be wrong within allowed operations — wrong deployment name, wrong replica count, wrong namespace if flags are ambiguous. Hard denies don't catch every mistake. Start on kind or non-production; keep --approve off until plans feel familiar.",
      },
      {
        type: "h2",
        text: "Production checklist",
      },
      {
        type: "ul",
        items: [
          "Set default namespace and context in config — reduce ambiguous prompts",
          "Read the plan and diff on every mutation in shared clusters",
          "Use -n and --context explicitly for production commands",
          "Prefer JSON plan artifacts in CI before any automated apply",
          "Rotate LLM keys separately from kube credentials; neither belongs in config.yaml",
          "Disable local history on shared jump hosts if prompts are sensitive",
        ],
      },
      {
        type: "h2",
        text: "Try the safety loop",
      },
      {
        type: "code",
        caption: "Install and practice denies + scale",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "delete all pods" -n staging    # expect deny
kprompt "scale api to 2" -n staging    # review plan → y or n`,
      },
      {
        type: "p",
        text: "Full safety reference: kprompt.ai/docs/safety. For CI gating, see our post on PlanResult JSON. The goal is simple: AI speed with operator control — not autopilot with a Kubernetes sticker.",
        links: [
          { label: "kprompt.ai/docs/safety", href: "/docs/safety" },
          {
            label: "our post on PlanResult JSON",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
        ],
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
