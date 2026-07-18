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
    updatedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: ["announcement", "open source", "kubernetes"],
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
        text: "What's in v0.3.0 today",
      },
      {
        type: "ul",
        items: [
          "Deploy, scale, rollback, and named delete",
          "Read path: get/list, explain, logs, describe",
          "Plan → safety → approve → apply with optional --wait on rollouts",
          "Deep Deployment → ReplicaSet → Pods → Events → Logs investigation",
          "Helm install/upgrade plans with template and dry-run previews",
          "Argo Workflow generation, submission, status, and wait",
          "Prometheus-backed workload performance diagnosis",
          "Jaeger/Tempo trace query adapter foundations",
          "Local prompt history (~/.kprompt/history.jsonl) — no manifests or keys stored",
          "CI-stable JSON PlanResult output for pipeline gates",
          "Terminal themes: auto, Dracula, Nord, Gruvbox, mono, and none",
          "Multiple LLM providers (Gemini, OpenAI, Anthropic, Groq, Ollama, and others) via BYOK",
        ],
      },
      {
        type: "h2",
        text: "What we're not claiming",
      },
      {
        type: "p",
        text: "kprompt is early software. Plans can be incomplete or wrong. Hard-deny rules catch known-dangerous patterns, but they don't replace your judgment. Helm, Argo Workflows, and Prometheus support now ship, but GitOps, natural-language trace walking, Grafana, and in-cluster agents remain on the public roadmap.",
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
        text: "Full install, integration, theme, provider, safety, and CI docs live at kprompt.ai/docs. Source and issues are on GitHub — contributions and feedback welcome. We'll publish more here as we deepen observability, add Homebrew, and build the next integration layers.",
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
        text: "What shipped in v0.3 — and what comes next",
      },
      {
        type: "p",
        text: "v0.3 moves beyond core workload operations with deep Kubernetes investigation, Helm orchestration, Argo Workflows, Prometheus diagnosis, and Jaeger/Tempo query adapters. The frontier still expands through real APIs and reviewable plans.",
      },
      {
        type: "ul",
        items: [
          "Helm — chart install/upgrade is now a first-class plan with preview, not YAML pasted from chat",
          "HorizontalPodAutoscaler + metrics — Prometheus-backed performance explains now ground CPU, memory, latency, and replica findings",
          "Argo Workflows — generate, submit, inspect, and wait for batch or ML workflows",
          "Argo CD / Flux — sync status, drift, promote/rollback as GitOps-aware prompts",
          "CustomResourceDefinitions — Tekton, KEDA, Istio: models must call real CRD APIs, not invent fields",
          "OpenTelemetry traces — Jaeger/Tempo adapters ship; natural-language slow-span diagnosis comes next",
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
        text: "kprompt is an open-source, MIT-licensed Kubernetes CLI that adds a natural-language layer on top of that ecosystem — with a non-negotiable rule: every mutation produces a reviewable plan before apply. v0.3.0 ships core workload operations, Helm, Argo Workflows, Prometheus performance diagnosis, and Jaeger/Tempo query adapters. The rest of the stack follows the same rule: real CLI calls and APIs, not hallucinated YAML from chat.",
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
          "Helm install/upgrade plans with template and dry-run previews",
          "Argo Workflow generation, submission, status, and wait",
          "Prometheus-backed CPU, memory, latency, replica, and HPA findings",
          "Jaeger/Tempo trace search and trace-by-ID adapter foundations",
          "Selectable terminal themes and integration discovery with kprompt tools",
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
        text: "Shipped: Helm and deeper Kubernetes investigation",
      },
      {
        type: "h3",
        text: "Helm — chart install and upgrade in the plan",
      },
      {
        type: "p",
        text: "Most teams don't raw-apply every YAML. Helm packages Kubernetes apps as charts with values, release history, and rollback. kprompt now maps install and upgrade prompts to Helm steps you read before execution, including chart/version context plus template and dry-run previews.",
      },
      {
        type: "code",
        caption: "Helm integration (shipped)",
        code: `kprompt "install redis" -n cache
kprompt "upgrade prometheus chart" -n monitoring`,
      },
      {
        type: "h3",
        text: "Deeper Kubernetes troubleshooting chains",
      },
      {
        type: "p",
        text: "“Why isn't my deployment ready?” now walks Deployment → ReplicaSet → Pods → Events → Logs in one explain flow grounded in your apiserver. That's the difference between a generic LLM essay and an operator investigation — especially during incidents when tab count is already too high.",
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
        text: "Pods running is not the same as pods healthy. kprompt's bounded Prometheus queries now answer why is my api slow with CPU, memory, p95 latency, replica, and HPA signals instead of guesses, then return read-only findings and optional scaling suggestions.",
      },
      {
        type: "code",
        caption: "Prometheus-aware prompts (shipped)",
        code: `kprompt "why is my api slow?" -n production
kprompt "show CPU for payment-api pods last hour"`,
      },
      {
        type: "h3",
        text: "Argo Workflows — batch and ML on Kubernetes",
      },
      {
        type: "p",
        text: "Training jobs, ETL, and CI-adjacent batch work increasingly run as Argo Workflows CRDs. kprompt now detects that CRD, generates a reviewable Workflow manifest, submits it after approval, reports status, and supports --wait for a terminal phase.",
      },
      {
        type: "h2",
        text: "Observability stack: OpenTelemetry and Grafana",
      },
      {
        type: "p",
        text: "Logs tell you what broke; traces tell you where time went. The CLI ships Jaeger/Tempo trace walk with bottleneck narration, Grafana dashboard search and panel summaries, and Prometheus performance explains — still orchestrating real backends, not replacing them.",
      },
      {
        type: "ul",
        items: [
          "Jaeger / Tempo — natural-language trace walk and slow-span narration",
          "Grafana — search or summarize dashboards without leaving the shell",
          "Cross-signal explains and optimize-cluster reports remain on the roadmap",
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
        text: "kubectl remains essential — kprompt doesn't replace it; it orchestrates intent above it. We are not a unique AI category: K8sGPT owns diagnosis, kubectl-ai shares our natural-language CLI lane with a different mutate contract, and Kagent covers in-cluster agents. Hosted chat products optimize for demo speed; IDE copilots help write YAML. For that honest map, see our Kubernetes AI tools comparison. The goal is not the flashiest demo — it's a gated plan you can review in staging on Tuesday and trust enough for prod on Wednesday.",
        links: [
          {
            label: "Kubernetes AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
        ],
      },
      {
        type: "h2",
        text: "Try kprompt on your cluster today",
      },
      {
        type: "p",
        text: "Integrations roll out in public — issues and PRs welcome. Start with core reads, then run kprompt tools to inspect Helm, Argo Workflows, Prometheus, and observability readiness. Use a non-production context and get familiar with the plan loop before approving mutations.",
      },
      {
        type: "code",
        caption: "Install the open-source Kubernetes CLI",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."
kprompt config set namespace default
kprompt tools
kprompt "list nodes"
kprompt "explain why nginx is crashlooping"`,
      },
      {
        type: "p",
        text: "Docs cover install, integrations, themes, providers, safety, and CI JSON at kprompt.ai/docs. To influence priority — trace diagnosis, Grafana, GitOps, or the next CRD — comment on GitHub issues or join the contributor guide at kprompt.ai/team.",
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
        text: "Most Kubernetes incidents start the same way: a alert fires, a deploy pipeline goes red, or someone asks in Slack why staging is broken. You know the namespace, maybe the app name — and then the archaeology begins. kubectl get pods shows CrashLoopBackOff. describe surfaces a failed probe. logs show a stack trace from three revisions ago. Events scroll off the buffer. You're not missing skill; you're missing time. For copy-paste prompts per error type, see the error prompt playbook.",
        links: [
          {
            label: "error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
        ],
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
        text: "CrashLoopBackOff means the container starts, exits non-zero, and kubelet backs off retries. It's a symptom — not a root cause. The exit might be a missing env var, bad command, OOMKill, or dependency unreachable on startup. When Last State shows OOMKilled, follow the dedicated OOMKilled guide before you treat it as a generic crash loop.",
        links: [
          {
            label: "OOMKilled guide",
            href: "/blog/kubernetes-oomkilled",
          },
        ],
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
  {
    slug: "kubectl-alternatives",
    title:
      "Kubectl alternatives in 2026: K9s, Kubernetes dashboards, and AI CLIs compared",
    description:
      "Compare kubectl, K9s, Headlamp, Lens, and natural-language Kubernetes CLIs. Learn which tool fits terminal navigation, visual cluster management, troubleshooting, and plan-before-apply operations.",
    publishedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "kubectl",
      "kubernetes cli",
      "devops",
      "platform engineering",
    ],
    keywords: [
      "kubectl alternatives",
      "best kubernetes cli",
      "k9s vs kubectl",
      "kubernetes dashboard tools",
      "lens kubernetes alternative",
      "headlamp kubernetes",
      "kubernetes terminal ui",
      "kubernetes ai cli",
      "kubernetes management tools",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "kubectl is the primary command-line tool for Kubernetes, and every serious operator should understand it. But “primary” does not mean “best for every workflow.” Watching twenty Pods restart is easier in a terminal UI. Comparing several clusters is easier in a desktop or web interface. Turning an incident question into a reviewable command plan is where a natural-language CLI can help.",
        links: [
          {
            label: "primary command-line tool for Kubernetes",
            href: "https://kubernetes.io/docs/concepts/overview/kubectl/",
          },
        ],
      },
      {
        type: "p",
        text: "This is not a winner-takes-all ranking. K9s, Headlamp, Lens, and kprompt solve different problems and all ultimately depend on the Kubernetes API and your credentials. The useful question is: which interface should you reach for right now?",
      },
      {
        type: "h2",
        text: "Quick comparison",
      },
      {
        type: "table",
        headers: ["Tool", "Interface", "Best for", "Trade-off"],
        rows: [
          [
            "kubectl",
            "CLI",
            "Exact API operations, scripts, automation",
            "Flags and object relationships require practice",
          ],
          [
            "K9s",
            "Terminal UI",
            "Live navigation, logs, resource watching",
            "Interactive workflows are harder to automate",
          ],
          [
            "Headlamp",
            "Web / desktop UI",
            "Visual discovery and extensible cluster UI",
            "Another interface to deploy or manage",
          ],
          [
            "Lens",
            "Desktop IDE",
            "Multi-cluster visual workflows",
            "Desktop-oriented rather than shell-native",
          ],
          [
            "kprompt",
            "Natural-language CLI",
            "Intent → reviewable plan → approval",
            "Experimental; plans still require human review",
          ],
        ],
      },
      {
        type: "h2",
        text: "kubectl: the foundation, not the enemy",
      },
      {
        type: "p",
        text: "kubectl communicates with the Kubernetes control plane through the Kubernetes API. It creates, inspects, updates, and deletes objects, works well in scripts, and exposes the full vocabulary operators need. Every alternative in this article complements that foundation rather than making Kubernetes semantics disappear.",
        links: [
          {
            label: "communicates with the Kubernetes control plane",
            href: "https://kubernetes.io/docs/reference/kubectl/",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Choose kubectl when you need exact, reproducible commands",
          "Choose kubectl for shell scripts, CI/CD, JSONPath, and raw API coverage",
          "Learn kubectl output and object relationships even if you prefer another UI",
        ],
      },
      {
        type: "code",
        caption: "The explicit kubectl workflow",
        code: `kubectl get deployments -n staging
kubectl describe deployment/api -n staging
kubectl logs deployment/api -n staging --tail=100
kubectl rollout undo deployment/api -n staging`,
      },
      {
        type: "h2",
        text: "K9s: best when you want Kubernetes in a terminal UI",
      },
      {
        type: "p",
        text: "K9s is an open-source terminal UI that continuously watches Kubernetes resources and provides commands for logs, scaling, port-forwarding, restarts, and navigation. It is a strong fit for operators who stay in the terminal but want a live, keyboard-driven view instead of repeating kubectl get commands.",
        links: [
          {
            label: "K9s",
            href: "https://github.com/derailed/k9s",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Fast resource navigation without leaving the terminal",
          "Live status, logs, and context switching",
          "Read-only mode and customizable aliases, hotkeys, and plugins",
          "Best for interactive sessions; less suitable as a CI artifact",
        ],
      },
      {
        type: "h2",
        text: "Headlamp: visual and extensible Kubernetes UI",
      },
      {
        type: "p",
        text: "Headlamp is a web-based Kubernetes UI that can run as a desktop app or inside a cluster. It is useful when teams want approachable visual resource discovery and an extensible interface without forcing every user to memorize terminal navigation.",
        links: [{ label: "Headlamp", href: "https://headlamp.dev/" }],
      },
      {
        type: "p",
        text: "A visual UI helps explain owner references, conditions, and related resources to developers who operate Kubernetes occasionally. The trade-off is deployment and access management when it runs in-cluster, plus a workflow that is less composable than shell commands.",
      },
      {
        type: "h2",
        text: "Lens: desktop Kubernetes workflows across clusters",
      },
      {
        type: "p",
        text: "Lens Desktop is positioned as a Kubernetes IDE for visual cluster management, observability, and debugging. It can be convenient for engineers moving among several kubeconfig contexts who prefer a desktop application over terminal views.",
        links: [{ label: "Lens Desktop", href: "https://k8slens.dev/" }],
      },
      {
        type: "p",
        text: "The main decision is workflow preference: a desktop IDE gives you persistent visual context, while kubectl and K9s remain closer to the shell and remote jump-host workflows. Review current Lens editions and terms directly before standardizing across a company.",
      },
      {
        type: "h2",
        text: "AI Kubernetes CLIs: useful when intent is the bottleneck",
      },
      {
        type: "p",
        text: "Natural-language Kubernetes tools target a different problem. You already know the outcome — scale api to three, explain why redis is not ready, roll back payment-api — but do not want to reconstruct the exact command and investigation chain under pressure.",
      },
      {
        type: "p",
        text: "The dangerous implementation is model output piped directly to a shell. kprompt instead turns the prompt into a structured plan, runs risk checks and hard denies, and asks for approval before mutations. It uses your kubeconfig and your LLM provider keys; it does not replace RBAC or admission policy.",
      },
      {
        type: "code",
        caption: "Intent with a visible plan",
        code: `$ kprompt "scale api to 3" -n staging

Plan
  1. kubectl scale deployment/api --replicas=3 -n staging

Risk: low
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "Which Kubernetes tool should you choose?",
      },
      {
        type: "h3",
        text: "Choose kubectl when precision and automation matter",
      },
      {
        type: "p",
        text: "Scripts, CI jobs, uncommon resources, and exact API operations belong in kubectl. It remains the common language behind runbooks and incident notes.",
      },
      {
        type: "h3",
        text: "Choose K9s when you are exploring live cluster state",
      },
      {
        type: "p",
        text: "Use K9s for watching rollouts, jumping between Pods, tailing logs, and navigating resources during an interactive terminal session.",
      },
      {
        type: "h3",
        text: "Choose Headlamp or Lens when visual context matters",
      },
      {
        type: "p",
        text: "Dashboards and desktop tools help occasional Kubernetes users, multi-cluster operators, and teams that benefit from persistent visual resource relationships.",
      },
      {
        type: "h3",
        text: "Choose kprompt when translating intent takes too long",
      },
      {
        type: "p",
        text: "Use kprompt for day-2 questions and bounded changes where seeing the generated plan before execution is more valuable than remembering flags. Start on non-production because the project is experimental and model-generated plans can still be wrong.",
      },
      {
        type: "h2",
        text: "A practical combined toolbelt",
      },
      {
        type: "p",
        text: "Strong platform teams rarely standardize on one interface. A realistic workflow uses all of them: kprompt to draft a plan or investigation, kubectl as the exact underlying vocabulary, K9s for live observation, and a visual UI when relationships or multi-cluster context need more screen space.",
      },
      {
        type: "ul",
        items: [
          "Investigate: kprompt explain + K9s live resource view",
          "Confirm: kubectl describe, events, and logs",
          "Change: review kprompt plan or commit declarative YAML through GitOps",
          "Observe: K9s, Headlamp, Lens, Prometheus, or Grafana",
        ],
      },
      {
        type: "h2",
        text: "Try a plan-before-apply Kubernetes CLI",
      },
      {
        type: "code",
        caption: "Install and start with read-only prompts",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "list deployments" -n staging
kprompt "explain why api is not ready" -n staging`,
      },
      {
        type: "p",
        text: "Read the quickstart and safety guide before approving mutations. kprompt is one interface in the Kubernetes toolbelt — not a reason to stop understanding the cluster beneath it.",
        links: [
          { label: "quickstart", href: "/docs/quickstart" },
          { label: "safety guide", href: "/docs/safety" },
        ],
      },
    ],
  },
  {
    slug: "kubernetes-ai-tools-comparison",
    title:
      "Kubernetes AI tools compared: K8sGPT, kubectl-ai, Kagent, and plan-before-apply CLIs",
    description:
      "Honest map of Kubernetes AI peers: K8sGPT diagnoses, kubectl-ai and kprompt share the NL-CLI lane with different contracts, Kagent runs in-cluster agents, hosted chat and IDE copilots cover the rest.",
    publishedAt: "2026-07-18",
    updatedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "kubernetes cli",
      "devops",
      "platform engineering",
    ],
    keywords: [
      "k8sgpt",
      "k8sgpt vs kubectl-ai",
      "kubernetes ai tools",
      "kubectl-ai",
      "kagent kubernetes",
      "ai kubernetes troubleshooting",
      "chat with kubernetes cluster",
      "natural language kubernetes",
      "kubernetes ai cli",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "The Kubernetes AI category is crowded with demos that look similar in a screenshot: type English, get cluster help. Underneath, only some of the differences are category-level. K8sGPT is not competing with a mutate CLI. Kagent is not a laptop kubectl wrapper. kubectl-ai and kprompt, though, share a lane — natural language on a local CLI — and the honest question is whether the contract differs enough to matter.",
      },
      {
        type: "p",
        text: "This field guide maps the strongest peers without inventing a unique category for ourselves: K8sGPT (analyzer-first diagnosis), kubectl-ai (NL → kubectl), Kagent (Kubernetes-native agents), hosted “chat with your cluster” products, and IDE copilots. kprompt is a local BYOK CLI in the same intent lane as kubectl-ai, with a stricter bet: structured plan → safety → approve before apply, plus day-2 paths that reach Helm and observability tools. None of these replace kubectl, RBAC, or admission policy.",
        links: [
          { label: "K8sGPT", href: "https://k8sgpt.ai/" },
          {
            label: "kubectl-ai",
            href: "https://github.com/GoogleCloudPlatform/kubectl-ai",
          },
          { label: "Kagent", href: "https://github.com/kagent-dev/kagent" },
        ],
      },
      {
        type: "h2",
        text: "Quick comparison",
      },
      {
        type: "table",
        headers: ["Tool", "Primary job", "Where it runs", "Mutation model"],
        rows: [
          [
            "K8sGPT",
            "Scan cluster → explain issues",
            "CLI (+ optional operator / MCP)",
            "Optional remediation; diagnosis-first",
          ],
          [
            "kubectl-ai",
            "NL → kubectl commands",
            "Local CLI",
            "Often executes generated kubectl",
          ],
          [
            "Kagent",
            "Build/run AI agents on K8s",
            "In-cluster framework + CRDs",
            "Agent workflows you design",
          ],
          [
            "Hosted chat",
            "Managed cluster chat / SRE UI",
            "Vendor SaaS",
            "Varies; credentials often leave laptop",
          ],
          [
            "IDE copilots",
            "Write manifests / runbooks",
            "Editor",
            "Suggest YAML; apply is separate",
          ],
          [
            "kprompt",
            "Intent CLI + gated plan/apply",
            "Local CLI (BYOK)",
            "Same lane as kubectl-ai; stricter defaults",
          ],
        ],
      },
      {
        type: "h2",
        text: "Three jobs — and one crowded lane",
      },
      {
        type: "p",
        text: "Most “AI for Kubernetes” products optimize for one of three jobs. Mixing them up is how you end up with a scanner when you needed a mutate gate — or an agent framework when you needed a five-minute explain.",
      },
      {
        type: "ul",
        items: [
          "Diagnose — what is broken right now, and why (analyzers + LLM narration)",
          "Intent CLI — turn a sentence into cluster actions from the operator laptop",
          "Automate — long-running or multi-step agents that act without a human at the keyboard",
        ],
      },
      {
        type: "p",
        text: "K8sGPT owns diagnose. Kagent owns automate (as a platform). kubectl-ai and kprompt both sit in the intent-CLI lane. Inside that lane, kubectl-ai optimizes for kubectl fluency; kprompt optimizes for a gated ops contract (printable plan, risk, hard denies, CI JSON) and for pulling Helm / explain-style workflows into the same loop. That is a product bet — not a new category.",
      },
      {
        type: "h2",
        text: "K8sGPT: the strongest diagnosis peer",
      },
      {
        type: "p",
        text: "K8sGPT is the CNCF-adjacent tool most teams mean when they say “AI that understands my cluster.” It runs analyzers over live resources, surfaces problems (CrashLoopBackOff, misconfigured Services, and similar), and can enrich findings with an LLM via --explain. Multiple backends are supported — including local models — and sensitive fields can be anonymized before they leave your environment.",
        links: [
          { label: "K8sGPT", href: "https://k8sgpt.ai/" },
          {
            label: "GitHub repository",
            href: "https://github.com/k8sgpt-ai/k8sgpt",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Best when something is already wrong and you need triage in plain English",
          "Analyzer catalog encodes SRE-shaped checks — not just free-form chat",
          "MCP server mode plugs analysis into assistants like Claude Desktop",
          "Optional auto-remediation exists; the core value remains scan + explain",
        ],
      },
      {
        type: "code",
        caption: "Typical K8sGPT loop",
        code: `k8sgpt analyze
k8sgpt analyze --explain
# Optional: remediation paths when you enable them`,
      },
      {
        type: "p",
        text: "Where it differs from kprompt: K8sGPT starts from cluster findings. kprompt starts from operator intent (“scale api to 3”, “why isn't redis ready?”, “install redis”). If your pain is “walk me the unhealthy objects,” reach for K8sGPT first. If your pain is “turn this sentence into a reviewable change,” reach for a plan-before-apply CLI.",
      },
      {
        type: "h2",
        text: "kubectl-ai: same lane, different contract",
      },
      {
        type: "p",
        text: "kubectl-ai (Google Cloud open source) is the peer we take most seriously for day-2 natural language. Same shape: local CLI, describe the operation, get kubectl (and often run it). If your bottleneck is flag order, jsonpath, or custom columns, it is an excellent fit — and putting kprompt on a shortlist next to it is correct, not confused.",
        links: [
          {
            label: "kubectl-ai",
            href: "https://github.com/GoogleCloudPlatform/kubectl-ai",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Best for terminal natives who already think in kubectl verbs",
          "Strong for awkward queries and interactive sessions",
          "Multi-model backends including local options",
          "Less opinionated about plan artifacts, risk labels, and hard-deny policy",
        ],
      },
      {
        type: "p",
        text: "We do not claim a separate category here. The differentiation is the contract we enforce by default: structured PlanResult, risk scoring, hard denies for wipe-class language, interactive approval unless --approve, CI-friendly JSON before automated apply, and first-class plans that can reach Helm or performance explains — not only a generated kubectl line. If those gates do not matter to your team, kubectl-ai may be enough. If they do, evaluate both on the same prompts and keep the one whose mutation path you would trust on a shared cluster.",
      },
      {
        type: "h2",
        text: "Kagent: in-cluster agent framework",
      },
      {
        type: "p",
        text: "Kagent is a Kubernetes-native framework for building and running AI agents as cluster resources — controllers, tools, model configs, and a UI/CLI to manage them. It is not a drop-in “type English, fix CrashLoop” product. It is infrastructure for teams that want agents as first-class workloads next to the apps they operate.",
        links: [
          { label: "Kagent", href: "https://github.com/kagent-dev/kagent" },
        ],
      },
      {
        type: "ul",
        items: [
          "Best when you need multi-step, reusable agent workflows in-cluster",
          "Agents and tools managed as CRDs with familiar kubectl workflows",
          "Powerful for platform teams building internal AIOps — heavier to adopt",
          "Credential and blast-radius questions live with whatever ServiceAccount the agent uses",
        ],
      },
      {
        type: "p",
        text: "Compared with kprompt's laptop-local CLI: Kagent moves intelligence into the cluster; kprompt keeps kubeconfig and LLM keys where operators already run kubectl. Choose Kagent when autonomous or shared agent runtimes are the product. Choose a local CLI when you want zero new in-cluster AI surface for day-2 work.",
      },
      {
        type: "h2",
        text: "Hosted chat-with-cluster and IDE copilots",
      },
      {
        type: "h3",
        text: "Hosted / SaaS control planes",
      },
      {
        type: "p",
        text: "Vendored “chat with your cluster” products optimize for time-to-demo: connect a cluster, ask questions in a browser, sometimes remediate from the same UI. Pros: managed models, polished SRE narratives, less CLI setup. Cons: credential handling, data residency, another control plane to trust, and mutation policies that are vendor-specific rather than “the plan printed in your terminal.”",
      },
      {
        type: "p",
        text: "kprompt's bet is the opposite shape: no hosted agent required, BYOK providers, plans and approvals on the operator machine. Hosted products can still win for organizations that want a managed AIOps console — evaluate them on audit logs, RBAC mapping, and whether apply can be forced through human review.",
      },
      {
        type: "h3",
        text: "IDE copilots",
      },
      {
        type: "p",
        text: "GitHub Copilot, Cursor, and similar tools accelerate writing Deployment YAML, Helm values, and runbooks. They are not live-cluster operators unless you wire extra MCP or kubectl plugins. Pair them with kubectl, K8sGPT, or kprompt: generate manifests in the editor; diagnose and mutate against real state with a cluster-aware tool.",
      },
      {
        type: "h2",
        text: "Where kprompt fits — and what we are not claiming",
      },
      {
        type: "p",
        text: "kprompt is an experimental MIT CLI in the intent-CLI lane: natural language in, structured plan out, safety checks, then apply only after approval (unless you explicitly pass --approve). Reads (list, explain, logs, describe) run immediately. Mutations always show the plan — with risk labels and hard denies for wipe-class prompts. Integrations extend the same loop toward Helm, Argo Workflows, and Prometheus-backed performance explains.",
      },
      {
        type: "code",
        caption: "Plan-before-apply (mutations)",
        code: `$ kprompt "scale api to 3" -n staging

Plan
  1. kubectl scale deployment/api --replicas=3 -n staging

Risk: low
Apply? [y/N]`,
      },
      {
        type: "ul",
        items: [
          "Not a K8sGPT replacement — we are not an analyzer-first fleet scanner",
          "Not a Kagent replacement — we do not ship an in-cluster agent runtime",
          "Not “unique NL kubectl” — kubectl-ai shares that job; we share the lane",
          "Our bet — gated plan/apply + multi-tool day-2 plans on your laptop (BYOK)",
          "Experimental — wrong plans still happen; hard denies are not a production certificate",
        ],
      },
      {
        type: "h2",
        text: "Honest overlap matrix",
      },
      {
        type: "table",
        headers: ["If you need…", "Reach for", "Why"],
        rows: [
          [
            "Fleet health triage / analyzer findings",
            "K8sGPT",
            "Built for scan → explain; mature analyzer set",
          ],
          [
            "Awkward kubectl / jsonpath generation",
            "kubectl-ai (or kprompt)",
            "Same intent-CLI lane; kubectl-ai is the fluency specialist",
          ],
          [
            "In-cluster multi-step AI agents",
            "Kagent",
            "Framework + CRDs for agent platforms",
          ],
          [
            "Managed browser chat / AIOps console",
            "Hosted products",
            "Fast demo; evaluate trust and residency",
          ],
          [
            "Manifest / runbook drafting",
            "IDE copilots",
            "Editor-native; apply is still yours",
          ],
          [
            "Day-2 intent with gated plan/apply + CI JSON",
            "kprompt (evaluate vs kubectl-ai)",
            "Same lane; stricter default contract",
          ],
        ],
      },
      {
        type: "h2",
        text: "Can you use more than one?",
      },
      {
        type: "p",
        text: "Yes — and strong teams will. A realistic stack looks like: K8sGPT for scheduled or on-demand cluster scans, one intent CLI (kubectl-ai or kprompt — pick by mutation contract, not by logo), kubectl for exact scripts and CI, K9s or a dashboard for live watching, and GitOps for steady-state desired state. Agents belong when you have a platform team to own their lifecycle — not as the first AI experiment on production.",
      },
      {
        type: "ul",
        items: [
          "Incident open: K8sGPT analyze --explain or an intent-CLI explain",
          "Bounded fix: reviewable plan + approve (or kubectl you typed by hand)",
          "Steady state: Argo CD / Flux + PR review",
          "Watch: K9s, Headlamp, Grafana — not an LLM in a loop",
        ],
      },
      {
        type: "h2",
        text: "Decision checklist",
      },
      {
        type: "ul",
        items: [
          "Is the bottleneck finding issues or expressing intent? → K8sGPT vs intent CLI",
          "Inside the intent-CLI lane, do you need gated plans / CI JSON / hard denies by default? → That is the kprompt vs kubectl-ai axis",
          "Must credentials stay on the laptop? → Prefer local CLI / local models",
          "Do you want a new in-cluster AI runtime? → Only if you can own Kagent-class ops",
          "Is the team still learning kubectl? → AI is an accelerator, not a substitute for RBAC literacy",
        ],
      },
      {
        type: "h2",
        text: "Try the contract, not the category",
      },
      {
        type: "p",
        text: "If your shortlist already includes K8sGPT and kubectl-ai, keep both jobs clear: use K8sGPT when you need analyzer findings; use an intent CLI when you already know the outcome. Then run the same mutate prompts through kubectl-ai and kprompt and compare only what matters — what prints before apply, what gets denied, and what you can gate in CI.",
      },
      {
        type: "code",
        caption: "Install kprompt and start with reads",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "list deployments" -n staging
kprompt "explain why api is not ready" -n staging
kprompt "scale api to 2" -n staging   # review plan → y or n`,
      },
      {
        type: "p",
        text: "Read the safety guide before approving mutations on shared clusters. For how kprompt sits next to kubectl and K9s (non-AI peers), see our kubectl alternatives post. For model and BYOK choices, see the LLM providers guide.",
        links: [
          { label: "safety guide", href: "/docs/safety" },
          {
            label: "kubectl alternatives post",
            href: "/blog/kubectl-alternatives",
          },
          {
            label: "LLM providers guide",
            href: "/blog/kubernetes-llm-providers-byok",
          },
        ],
      },
    ],
  },
  {
    slug: "kubernetes-oomkilled",
    title:
      "Kubernetes OOMKilled: how to detect memory kills, raise limits, and avoid guesswork",
    description:
      "A practical guide to OOMKilled in Kubernetes — exit 137, Last State, memory requests vs limits, kubectl checks, and how kprompt explain can suggest a reviewable memory patch.",
    publishedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "troubleshooting",
      "devops",
      "sre",
      "kubectl",
    ],
    keywords: [
      "kubernetes oomkilled",
      "oomkilled exit 137",
      "kubernetes memory limit",
      "pod oomkilled",
      "raise memory kubernetes",
      "container killed memory",
      "kubectl describe oom",
      "kubernetes resource limits",
      "crashloopbackoff oom",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "OOMKilled is one of the most common “the app is broken” signals in Kubernetes — and one of the easiest to misread. The Pod may still show Running. Restarts climb. Logs look fine until they stop mid-request. Someone raises the memory limit “a bit,” the Deployment rolls, and two hours later it happens again. Or worse: they remove the limit entirely and the node starts evicting neighbors.",
      },
      {
        type: "p",
        text: "This guide is the operator ladder for memory kills: how to confirm OOMKilled, how requests and limits differ, what kubectl shows, and how to apply a bounded fix with a reviewable plan. kprompt's explain path detects OOM findings and can propose a memory patch — still behind approval, because raising limits is a real cluster change.",
        links: [
          {
            label: "Kubernetes resource management",
            href: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
          },
        ],
      },
      {
        type: "h2",
        text: "What OOMKilled actually means",
      },
      {
        type: "p",
        text: "When a container exceeds its memory limit, the Linux OOM killer (via cgroup enforcement) terminates the process. Kubernetes records the termination reason as OOMKilled. Exit code is often 137 (128 + SIGKILL). That is not an application “bug code” — it is the kernel saying the cgroup ran out of memory.",
      },
      {
        type: "ul",
        items: [
          "Limit hit → container killed → kubelet may restart it (CrashLoopBackOff if it keeps dying)",
          "No memory limit → the container can grow until the node is under pressure (evictions, not always a clean OOMKilled on that Pod)",
          "Requests affect scheduling; limits affect kill behavior — confusing them is the most common ops mistake",
        ],
      },
      {
        type: "h2",
        text: "Confirm it before you patch",
      },
      {
        type: "p",
        text: "Do not raise memory because “it feels like OOM.” Read the Pod status. The smoking gun is usually Last State / Last Termination State on the container: Reason OOMKilled, Exit Code 137.",
      },
      {
        type: "code",
        caption: "Classic kubectl confirmation",
        code: `kubectl get pods -n staging
kubectl describe pod -l app=api -n staging
# Look under Containers → Last State:
#   Reason: OOMKilled
#   Exit Code: 137

kubectl get pod -n staging -o jsonpath='{range .items[*]}{.metadata.name}{"\\t"}{range .status.containerStatuses[*]}{.name}{"="}{.lastState.terminated.reason}{" "}{end}{"\\n"}{end}'`,
      },
      {
        type: "p",
        text: "Also check current limits on the Deployment template — describe Pod shows what ran; the Deployment owns what will run next:",
      },
      {
        type: "code",
        caption: "See memory requests and limits",
        code: `kubectl get deploy api -n staging -o jsonpath='{range .spec.template.spec.containers[*]}{.name}{" limits="}{.resources.limits.memory}{" requests="}{.resources.requests.memory}{"\\n"}{end}'`,
      },
      {
        type: "h2",
        text: "Requests vs limits (the part people skip)",
      },
      {
        type: "table",
        headers: ["Field", "What it does", "OOM relevance"],
        rows: [
          [
            "requests.memory",
            "Scheduler places the Pod on a node with enough capacity",
            "Too low → noisy neighbor risk; does not by itself OOMKill",
          ],
          [
            "limits.memory",
            "Hard cgroup cap for the container",
            "Exceed this → OOMKilled",
          ],
          [
            "No limit",
            "Container can use free node memory",
            "May avoid OOMKilled on that Pod; can hurt the node",
          ],
        ],
      },
      {
        type: "p",
        text: "A healthy fix usually raises the limit (and often the request toward a sensible fraction of that limit) based on observed usage — not deleting limits to “make it stop.” If you have Prometheus, compare working set / RSS to the current limit before you double everything.",
      },
      {
        type: "h2",
        text: "kubectl explain ladder for memory kills",
      },
      {
        type: "ul",
        items: [
          "Scope — which Deployment / Pod, which namespace and context",
          "Status — restarts, Ready, Last State reason",
          "Resources — limits and requests on the crashing container",
          "Events — Failed / OOM / eviction messages on Pod or node",
          "Logs — --previous for the crashed instance (may be empty if killed hard)",
          "Change — bump memory or roll back a bad image / leaky release",
        ],
      },
      {
        type: "code",
        caption: "Investigation sequence",
        code: `kubectl describe deploy api -n staging
kubectl describe pod -l app=api -n staging
kubectl logs deploy/api -n staging --previous --tail=100
kubectl get events -n staging --field-selector reason=OOMKilling --sort-by='.lastTimestamp'`,
      },
      {
        type: "h2",
        text: "Natural-language explain → suggested patch",
      },
      {
        type: "p",
        text: "kprompt's explain path walks live Deployment → Pod → Events → Logs style signals. When it finds OOMKilled on a container, it can propose a follow-up: raise the Deployment memory limit (typically doubling a known limit in the suggested plan) and show the plan for approval. Reads run immediately; the patch does not apply until you confirm — or you pass --approve in a context you trust.",
      },
      {
        type: "code",
        caption: "Detect and review a memory fix",
        code: `$ kprompt "explain why api is crashing" -n staging

# … findings include OOMKilled on container app …

Suggested fix (requires approval):
Plan
  1. patch Deployment/api memory limit (e.g. 64Mi → 128Mi)

Risk: medium
Apply? [y/N]`,
      },
      {
        type: "p",
        text: "That is the intent-compiler shape: evidence from the apiserver, a concrete mutation plan, human gate. It is not “the model silently edited production.” If you reject the plan, nothing changes — dig into leaks, heap dumps, or a bad release instead.",
      },
      {
        type: "ul",
        items: [
          "Use explain first on non-production or a staging clone of the workload",
          "Read the before→after memory numbers in the plan — doubling forever is not a strategy",
          "Prefer fixing leaks for steady growth; raise limits for genuine under-provisioning",
          "After apply, use --wait on related rollouts or watch the Deployment until restarts stabilize",
        ],
      },
      {
        type: "h2",
        text: "Manual patch when you want exact numbers",
      },
      {
        type: "p",
        text: "Sometimes you already know the target (512Mi limit, 256Mi request). Use kubectl or a reviewed kprompt plan with an explicit change — do not approve a suggested bump you have not sanity-checked against metrics.",
      },
      {
        type: "code",
        caption: "Explicit memory patch",
        code: `kubectl set resources deploy/api -n staging \\
  --limits=memory=512Mi --requests=memory=256Mi

# or edit the template
kubectl edit deploy api -n staging`,
      },
      {
        type: "h2",
        text: "When raising memory is the wrong fix",
      },
      {
        type: "ul",
        items: [
          "Memory leak — usage climbs until any limit dies; fix the app or roll back the release",
          "Cache without bound — tune the process (JVM heap, Node heap, Go pacer) to fit the cgroup",
          "Wrong container — sidecar OOMs while you patch the app container",
          "Node pressure — Pod evicted or node NotReady; look at node allocatable and neighbors",
          "Burst then idle — a higher limit may be fine; also consider HPA/VPA later, not blind doubles",
        ],
      },
      {
        type: "h2",
        text: "Production habits",
      },
      {
        type: "ul",
        items: [
          "Confirm OOMKilled in Last State before changing resources",
          "Change one variable at a time — memory patch or image rollback, not both blind",
          "Keep limits; size them from data",
          "Record the plan (kprompt history or -o json) for the incident timeline",
          "Revisit after 24h of metrics — did working set settle under the new limit?",
        ],
      },
      {
        type: "h2",
        text: "Try it on a sandbox Deployment",
      },
      {
        type: "p",
        text: "Spin a tiny limit on kind or staging, force an OOM, then run explain and decide whether to approve the suggested patch. Pair with the broader troubleshooting guide for CrashLoop and ImagePull cases that often sit next to memory kills.",
        links: [
          {
            label: "broader troubleshooting guide",
            href: "/blog/kubernetes-troubleshooting-guide",
          },
          { label: "safety guide", href: "/docs/safety" },
        ],
      },
      {
        type: "code",
        caption: "Quick start",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "explain why api is crashing" -n staging
# review Suggested fix → y or n`,
      },
    ],
  },
  {
    slug: "kubernetes-error-prompt-playbook",
    title:
      "Real Kubernetes error prompts: crash loops, OOM, ImagePull, denies, and slow APIs",
    description:
      "A playbook of real incident prompts for Kubernetes — what to type when pods crash, images fail to pull, memory kills, wipe-class mistakes, RBAC denials, and latency spikes — with kprompt examples that stay plan-before-apply.",
    publishedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "troubleshooting",
      "devops",
      "sre",
      "prompt engineering",
    ],
    keywords: [
      "kubernetes error prompts",
      "kubernetes incident playbook",
      "crashloopbackoff prompt",
      "imagepullbackoff fix",
      "kubernetes natural language",
      "kubectl incident response",
      "oomkilled prompt",
      "kubernetes rbac denied",
      "why is my api slow kubernetes",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "Incidents do not arrive as clean runbooks. They arrive as Slack pings: “api is crashlooping,” “staging is slow,” “can you just delete everything in that namespace and start over?” The useful skill is turning that noise into a precise investigation or a bounded change — without improvising kubectl flags under adrenaline.",
      },
      {
        type: "p",
        text: "This playbook lists real error scenarios and the prompts we actually use with kprompt (and the kubectl equivalents you should still know). Every mutating path stays plan → safety → approve. Reads (explain, logs, describe, list, performance) run immediately. Software is experimental — practice on staging first.",
        links: [
          { label: "safety docs", href: "/docs/safety" },
          {
            label: "troubleshooting guide",
            href: "/blog/kubernetes-troubleshooting-guide",
          },
        ],
      },
      {
        type: "h2",
        text: "How to read each scenario",
      },
      {
        type: "ul",
        items: [
          "Symptom — what operators say or see",
          "Prompt — copy-pasteable kprompt line (swap names/namespaces)",
          "What you should get — findings, plan, or hard deny",
          "Do not — the shortcut that makes it worse",
        ],
      },
      {
        type: "h2",
        text: "1. CrashLoopBackOff — “it keeps restarting”",
      },
      {
        type: "p",
        text: "Symptom: Pod Ready is false, restarts climb, Waiting reason CrashLoopBackOff. You need the last exit reason and logs — not a blind rollout restart.",
      },
      {
        type: "code",
        caption: "Prompts",
        code: `kprompt "explain why api is crashing" -n staging
kprompt "logs api" -n staging
kprompt "describe api" -n staging`,
      },
      {
        type: "p",
        text: "What you should get: explain findings such as CrashLoopBackOff, last exit reason, and a suggestion to inspect logs. If the underlying kill was OOMKilled, you may also see a suggested memory patch that still requires approval.",
      },
      {
        type: "ul",
        items: [
          "Do — read Last State / findings before any mutate",
          "Do not — kubectl delete pod in a loop hoping the next one is healthier without reading why it died",
        ],
      },
      {
        type: "h2",
        text: "2. OOMKilled — exit 137 / memory limit",
      },
      {
        type: "p",
        text: "Symptom: Last State Reason OOMKilled, exit 137, or explain reports OOMKilled on a container. Full deep-dive: OOMKilled guide.",
        links: [
          { label: "OOMKilled guide", href: "/blog/kubernetes-oomkilled" },
        ],
      },
      {
        type: "code",
        caption: "Prompts",
        code: `kprompt "explain why payment-api is crashing" -n production
# If Suggested fix appears: read memory limit before→after → y or n

# Explicit follow-ups
kprompt "logs payment-api" -n production
kprompt "describe payment-api" -n production`,
      },
      {
        type: "p",
        text: "What you should get: OOMKilled finding and optionally a plan to raise the Deployment memory limit. Approving applies a real patch — treat it like any production resource change.",
      },
      {
        type: "ul",
        items: [
          "Do — confirm OOM in status; check metrics before doubling forever",
          "Do not — remove memory limits entirely to “make it stop”",
        ],
      },
      {
        type: "h2",
        text: "3. ImagePullBackOff / ErrImagePull",
      },
      {
        type: "p",
        text: "Symptom: Pod never starts; Waiting Reason ImagePullBackOff or ErrImagePull. Usually a bad tag, private registry auth, or rate limit — not something a memory bump fixes.",
      },
      {
        type: "code",
        caption: "Prompts",
        code: `kprompt "explain why api is not ready" -n staging
kprompt "describe api" -n staging
kprompt "logs api" -n staging   # often empty until the image pulls`,
      },
      {
        type: "p",
        text: "What you should get: image-pull finding and a suggestion to verify the image reference / pull secrets. The fix is usually correcting the Deployment image or imagePullSecrets — a separate planned mutation or GitOps PR, not an auto-remediation guess.",
      },
      {
        type: "ul",
        items: [
          "Do — read Events for the exact registry error",
          "Do not — scale up replicas of a Pod that cannot pull; you only multiply failures",
        ],
      },
      {
        type: "h2",
        text: "4. Deployment not ready — “replicas unavailable”",
      },
      {
        type: "p",
        text: "Symptom: availableReplicas < desired; rollout stuck. Causes vary: probes, image pull, resources, PDB, bad config.",
      },
      {
        type: "code",
        caption: "Prompts",
        code: `kprompt "explain why deployment api is not ready" -n staging
kprompt "list pods" -n staging
kprompt "describe api" -n staging`,
      },
      {
        type: "p",
        text: "What you should get: a grounded chain over Deployment → ReplicaSet → Pods → Events → Logs style signals. After you know the cause, a separate prompt for rollback or scale — never combine “fix everything” into one unsupervised approve.",
      },
      {
        type: "code",
        caption: "Recovery (separate plan + approve)",
        code: `kprompt "rollback api" -n staging
kprompt "scale api to 3" -n staging --wait`,
      },
      {
        type: "h2",
        text: "5. “API is slow” — latency without a red Pod",
      },
      {
        type: "p",
        text: "Symptom: Pods look Ready; users feel p95 pain. kubectl describe will not show latency. With Prometheus configured, use a performance prompt.",
      },
      {
        type: "code",
        caption: "Prompts",
        code: `kprompt "why is my api slow?" -n production
kprompt "show CPU for payment-api pods last hour" -n production

# Optional next: traces if Jaeger/Tempo is wired
kprompt "trace payment request" -n production`,
      },
      {
        type: "p",
        text: "What you should get: read-only findings (CPU, memory, latency, HPA/replica signals) and optional scaling suggestions — still a plan if you mutate. If Prometheus is missing, the tool should fail clearly rather than invent metrics.",
      },
      {
        type: "ul",
        items: [
          "Do — confirm Prom URL / access with kprompt tools first",
          "Do not — scale to 50 replicas because a chat model “felt” like load",
        ],
      },
      {
        type: "h2",
        text: "6. Panic prompt — wipe / delete everything",
      },
      {
        type: "p",
        text: "Symptom: stress language — “delete all pods,” “wipe the namespace,” “remove the cluster.” These are the prompts that should fail closed.",
      },
      {
        type: "code",
        caption: "Expect hard deny",
        code: `kprompt "delete all pods in production"
kprompt "wipe the staging namespace"
kprompt "delete everything"`,
      },
      {
        type: "p",
        text: "What you should get: risk denied — wipe-class and unscoped deletes never apply. Named delete of a single Pod, Deployment, or Service still shows a plan and needs approval.",
      },
      {
        type: "code",
        caption: "Named delete (planned)",
        code: `kprompt "delete deployment redis" -n cache
# Plan + risk → y/N`,
      },
      {
        type: "h2",
        text: "7. Bad deploy — roll back under pressure",
      },
      {
        type: "p",
        text: "Symptom: error rate spiked after a rollout; you want last known good Revision, not a debate in the PR thread.",
      },
      {
        type: "code",
        caption: "Prompts",
        code: `kprompt "explain why api is crashing" -n production
kprompt "rollback api" -n production
# Read plan: kubectl rollout undo … → approve
kprompt "rollback api" -n production --approve --wait --timeout 10m`,
      },
      {
        type: "p",
        text: "What you should get: a medium-risk rollback plan with namespace and Deployment named. Use --approve only when you already reviewed the same prompt or gated JSON in CI.",
        links: [
          {
            label: "CI plan gates",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
        ],
      },
      {
        type: "h2",
        text: "8. Auth and kubeconfig failures",
      },
      {
        type: "p",
        text: "Symptom: CLI errors before any plan — missing kubeconfig, bad context, expired credentials, RBAC forbid. These are not “prompt engineering” problems; fix identity first.",
      },
      {
        type: "code",
        caption: "Discipline prompts after fixing access",
        code: `# Fix credentials / context first, then:
kprompt config set context staging-cluster
kprompt "list deployments" -n staging

# Production — be explicit
kprompt "explain why api is down" -n production --context prod-cluster`,
      },
      {
        type: "p",
        text: "What you should get on RBAC failures: a short message naming the verb/resource/namespace and a kubectl auth can-i hint — not a hallucinated successful plan.",
      },
      {
        type: "h2",
        text: "Quick reference",
      },
      {
        type: "table",
        headers: ["Situation", "Start with", "Then"],
        rows: [
          [
            "CrashLoop / restarts",
            "explain why <app> is crashing",
            "logs / describe; patch or rollback if cause known",
          ],
          [
            "OOMKilled",
            "explain why <app> is crashing",
            "Review suggested memory plan or set exact resources",
          ],
          [
            "ImagePullBackOff",
            "explain / describe",
            "Fix image or pull secret — do not scale",
          ],
          [
            "Not ready",
            "explain why deployment <app> is not ready",
            "rollback or scale as a separate approve",
          ],
          [
            "Slow but Ready",
            "why is my api slow?",
            "metrics/traces; scale only from a plan",
          ],
          [
            "Wipe language",
            "(any delete-all prompt)",
            "Expect deny; use named delete only",
          ],
          [
            "Bad release",
            "rollback <app>",
            "Approve + --wait",
          ],
        ],
      },
      {
        type: "h2",
        text: "Prompt habits that survive real incidents",
      },
      {
        type: "ul",
        items: [
          "Name the workload and namespace — pronouns (“it”, “that thing”) burn time",
          "Read before mutate — explain/logs first on shared clusters",
          "One intent per approve — do not smuggle delete into a scale prompt",
          "Prefer staging rehearsal of the same prompt before prod --approve",
          "Keep PlanResult JSON when you need an audit trail (-o json)",
        ],
      },
      {
        type: "h2",
        text: "Practice the playbook on staging",
      },
      {
        type: "code",
        caption: "Install and dry-run the scary paths",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "delete all pods" -n staging          # expect deny
kprompt "explain why api is crashing" -n staging
kprompt "scale api to 2" -n staging           # review plan → n or y`,
      },
      {
        type: "p",
        text: "For the safety model behind denies and risk levels, see the safety post. For memory kills specifically, see the OOMKilled guide. For weird prompts that should fail closed or need extra care, see the edge-case prompt guide. The goal is simple: when the error is real, the prompt is boring — and the plan is visible.",
        links: [
          {
            label: "safety post",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          {
            label: "OOMKilled guide",
            href: "/blog/kubernetes-oomkilled",
          },
          {
            label: "edge-case prompt guide",
            href: "/blog/kubernetes-edge-case-prompts",
          },
        ],
      },
    ],
  },
  {
    slug: "kubernetes-edge-case-prompts",
    title:
      "Kubernetes edge-case prompts: what should fail closed, what needs a second look",
    description:
      "Edge-case prompt scenarios for Kubernetes AI CLIs — wipe jokes, unscoped deletes, ambiguous resource names, missing tools, secrets reads, scale-to-zero, and --approve traps — with what kprompt does today.",
    publishedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "safety",
      "troubleshooting",
      "devops",
      "sre",
    ],
    keywords: [
      "kubernetes edge cases",
      "kubernetes hard deny",
      "dangerous kubectl prompts",
      "delete all pods kubernetes",
      "ambiguous kubernetes resource",
      "kubernetes prompt safety",
      "scale to zero production",
      "helm uninstall all",
      "kubernetes ai edge cases",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "Happy-path demos lie. Real operators type tired prompts: wipe jokes, “delete that,” short names that match two CRDs, Helm uninstall --all, scale to zero “just for a minute,” and --approve because the TTY is annoying. Edge cases are where an AI Kubernetes CLI either earns trust or burns a cluster.",
      },
      {
        type: "p",
        text: "This guide is the awkward half of our error playbook: prompts that should hard-deny, plans that need a second look, and failure modes that are not “the model was dumb” — they are product contracts. kprompt is experimental; hard denies reduce blast radius, they do not certify production readiness.",
        links: [
          {
            label: "error playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          { label: "safety docs", href: "/docs/safety" },
        ],
      },
      {
        type: "h2",
        text: "Edge cases vs incidents",
      },
      {
        type: "table",
        headers: ["Kind", "Example", "What good tooling does"],
        rows: [
          [
            "Incident",
            "CrashLoop, OOM, slow API",
            "Investigate with live state; suggest bounded fixes",
          ],
          [
            "Edge case",
            "Wipe joke, ambiguous kind, missing Prom",
            "Fail closed or fail clear — never invent success",
          ],
          [
            "Human trap",
            "--approve on unfamiliar prod prompt",
            "Make the plan painful to skip; keep JSON gates",
          ],
        ],
      },
      {
        type: "h2",
        text: "1. Wipe jokes and “delete everything”",
      },
      {
        type: "p",
        text: "Edge: the prompt is socially casual and operationally catastrophic. Models will happily play along unless policy stops them before tokens are spent.",
      },
      {
        type: "code",
        caption: "Expect hard deny (before a useful plan)",
        code: `kprompt "delete the cluster"
kprompt "wipe everything"
kprompt "delete all namespaces"
kprompt "delete all pods in production"
kprompt "remove the namespace"`,
      },
      {
        type: "p",
        text: "What kprompt does: prompt-layer hard deny for wipe-class language — risk denied, no apply path. Named delete of a single Pod, Deployment, or Service still plans and asks for approval.",
      },
      {
        type: "ul",
        items: [
          "Do — treat deny as success in demos and training",
          "Do not — soften wipe language until it sneaks past (“clean up staging resources”) without reading the plan",
        ],
      },
      {
        type: "h2",
        text: "2. Unscoped delete: “all”, “*”, empty name",
      },
      {
        type: "p",
        text: "Edge: the model (or a bad extraction) produces a delete action without a concrete object name, or with all / * / everything.",
      },
      {
        type: "code",
        caption: "Safe vs refused",
        code: `kprompt "delete deployment redis" -n cache   # plan + high risk → approve
# Plans that delete without a real name, or name=all/* → refused`,
      },
      {
        type: "p",
        text: "What kprompt does: plan evaluation refuses unscoped deletes and Namespace deletes. Only Pod, Deployment, and Service named deletes are in scope today — deleting a StatefulSet or CronJob via NL delete is refused, not half-applied.",
      },
      {
        type: "h2",
        text: "3. Helm uninstall --all / purge all releases",
      },
      {
        type: "p",
        text: "Edge: day-2 Helm fluency turns into fleet destruction. “Uninstall all releases in staging” sounds like cleanup; it is a blast radius event.",
      },
      {
        type: "code",
        caption: "Expect Helm wipe deny",
        code: `kprompt "helm uninstall --all"
kprompt "uninstall all helm releases"
kprompt "purge all releases"`,
      },
      {
        type: "p",
        text: "What kprompt does: wipe-class Helm uninstall prompts and --all style commands are denied. Named install/upgrade still go through template/dry-run style plan review when that path is used.",
      },
      {
        type: "h2",
        text: "4. Ambiguous resource names",
      },
      {
        type: "p",
        text: "Edge: short names and Kind strings collide across API groups — especially once CRDs enter the cluster. “Get widgets” might match more than one resource.",
      },
      {
        type: "code",
        caption: "Be explicit when discovery is crowded",
        code: `kprompt "list deployments.apps" -n staging
kprompt "get pods" -n staging
# Prefer group-qualified names when short names collide`,
      },
      {
        type: "p",
        text: "What kprompt does on generic reads: discovery-backed resolution; ambiguous short names should error with candidates rather than silently picking the wrong API. Unknown types should say unknown — not invent a CRD schema from model weights.",
      },
      {
        type: "ul",
        items: [
          "Do — qualify with group (deployments.apps) when in doubt",
          "Do not — approve a mutate plan that names the wrong kind because the short name “looked right”",
        ],
      },
      {
        type: "h2",
        text: "5. Missing integrations (Prom, Helm, Argo, traces)",
      },
      {
        type: "p",
        text: "Edge: the prompt assumes a stack that is not installed. A bad tool invents PromQL answers or Helm output. A good tool fails clear.",
      },
      {
        type: "code",
        caption: "Discover before you diagnose",
        code: `kprompt tools
kprompt "why is my api slow?" -n production
kprompt "install redis" -n cache
kprompt "trace payment request"`,
      },
      {
        type: "p",
        text: "What you should get: kprompt tools reports what is detectable (Helm on PATH, Workflow CRD, Prom/Grafana/OTel URLs). Performance/trace/Helm paths should error or degrade honestly when backends are absent — not fabricate latency numbers.",
      },
      {
        type: "h2",
        text: "6. Secrets and ConfigMaps on the read path",
      },
      {
        type: "p",
        text: "Edge: “show secrets” is a legitimate ops read under RBAC, and also a leak risk in terminals, screen shares, and LLM context. Authorization is your kubeconfig — not the CLI pretending to be a DLP product.",
      },
      {
        type: "code",
        caption: "Reads are allowed; treat output as sensitive",
        code: `kprompt "list secrets" -n staging
# Table listings should not dump secret data values into columns
# Still: prompt + metadata may reach your LLM provider — use Ollama or careful keys if needed`,
      },
      {
        type: "p",
        text: "What kprompt does: Secret/ConfigMap gets are not hard-denied (RBAC decides). List tables avoid leaking secret data values into the grid. PlanResult and history are designed not to store manifests/keys — but the model still sees operational context you send. See the BYOK providers post for privacy trade-offs.",
        links: [
          {
            label: "BYOK providers post",
            href: "/blog/kubernetes-llm-providers-byok",
          },
        ],
      },
      {
        type: "h2",
        text: "7. Scale to zero / wrong namespace pronouns",
      },
      {
        type: "p",
        text: "Edge: the plan is “valid” and still wrong. Scale api to 0 in production, or a prompt that says “it” while your default namespace is prod.",
      },
      {
        type: "code",
        caption: "Make blast radius explicit",
        code: `kprompt "scale api to 0" -n production
# Read the plan: replicas=0 is easy to miss in a hurry

kprompt config set namespace staging
kprompt "scale api to 3" -n production --context prod-cluster`,
      },
      {
        type: "p",
        text: "What kprompt does: shows the plan and risk; it does not read your mind. Hard denies will not catch every bad-but-legal scale. Humans (or CI jq gates on intent/replicas) own this class.",
      },
      {
        type: "ul",
        items: [
          "Do — put -n and --context on production mutations",
          "Do not — rely on chat memory of “we were talking about staging”",
        ],
      },
      {
        type: "h2",
        text: "8. --approve as an edge case",
      },
      {
        type: "p",
        text: "Edge: the flag that skips the y/N prompt. Correct in CI after JSON gates; dangerous as a laptop default.",
      },
      {
        type: "code",
        caption: "When --approve is appropriate",
        code: `# OK after you already reviewed the same plan interactively
kprompt "scale api to 3" -n staging --approve --wait

# OK in CI after jq gates on PlanResult
kprompt "scale api to 3" -n staging -o json | jq -e '.risk.denied == false'

# Risky: first-time prod prompt with --approve because you are late`,
      },
      {
        type: "p",
        text: "Hard denies still block wipe-class prompts even with --approve. Everything else that is merely “medium risk” will apply if you ask it to. That is the edge.",
        links: [
          {
            label: "CI plan gates",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
        ],
      },
      {
        type: "h2",
        text: "9. Multi-step prompts that mix mutate and investigate",
      },
      {
        type: "p",
        text: "Edge: “scale api to 3 then investigate something weird” or chaining unsupported steps. Routers that auto-apply mid-chain are how incidents get compound interest.",
      },
      {
        type: "code",
        caption: "Prefer one intent per approval",
        code: `kprompt "explain why api is crashing" -n staging
kprompt "scale api to 3" -n staging
# Separate prompts → separate plans → separate decisions`,
      },
      {
        type: "p",
        text: "What to expect: multi-tool routing exists for investigation chains; mutating chains should still surface plans you can refuse. If a step is unsupported, the run should stop with a clear error rather than skipping to a partial apply.",
      },
      {
        type: "h2",
        text: "10. Deploy without enough identity",
      },
      {
        type: "p",
        text: "Edge: “deploy myapp” with no image, registry, or known recipe. A chatty CLI invents nginx:latest and calls it done.",
      },
      {
        type: "code",
        caption: "Fail clear > hallucinate an image",
        code: `kprompt "deploy redis" -n cache          # known recipe path
kprompt "deploy myapp" -n staging        # should demand image / clearer params`,
      },
      {
        type: "p",
        text: "What good behavior looks like: error asking for an image (or a documented recipe), not a silent wrong Deployment. Always read the plan’s image field before approve.",
      },
      {
        type: "h2",
        text: "Quick matrix",
      },
      {
        type: "table",
        headers: ["Edge prompt", "Expect", "Your job"],
        rows: [
          [
            "Wipe / delete all / wipe namespace",
            "Hard deny",
            "Celebrate the deny; use named ops",
          ],
          [
            "Helm uninstall --all",
            "Hard deny",
            "Name one release",
          ],
          [
            "Ambiguous short name",
            "Error + candidates",
            "Qualify group/kind",
          ],
          [
            "Missing Prom/Helm/Argo",
            "Clear failure",
            "kprompt tools; fix config",
          ],
          [
            "list secrets",
            "RBAC + careful output",
            "Mind LLM + screen share",
          ],
          [
            "scale to 0 in prod",
            "Legal plan, real risk",
            "Read replicas; maybe refuse",
          ],
          [
            "--approve first time",
            "Applies if not denied",
            "Interactive review first",
          ],
        ],
      },
      {
        type: "h2",
        text: "What hard denies do not catch",
      },
      {
        type: "p",
        text: "Be honest with your team: policy catches wipe-class and unscoped patterns. It does not catch “scale the wrong Deployment,” “raise memory on the sidecar,” or “rollback the healthy app.” Those need plan literacy — the same muscle as reading a kubectl command before Enter.",
      },
      {
        type: "ul",
        items: [
          "Wrong name, right verb — still a bad day",
          "Wrong context with a perfect prompt — still prod",
          "Correct plan, wrong time (change freeze) — process, not CLI",
        ],
      },
      {
        type: "h2",
        text: "Drill the edges on purpose",
      },
      {
        type: "code",
        caption: "Staging chaos curriculum",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "delete all pods" -n staging
kprompt "helm uninstall --all"
kprompt "scale api to 0" -n staging          # read plan → n
kprompt "delete deployment redis" -n staging # read plan → decide
kprompt tools`,
      },
      {
        type: "p",
        text: "Pair this with the incident playbook when something is actually broken, and the safety post when you teach the plan → approve loop. Edge cases are not corner decorations — they are how you decide whether an AI CLI belongs near production credentials. For a full kubectl ↔ natural-language cheat sheet, see the paired one-liners guide.",
        links: [
          {
            label: "incident playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          {
            label: "safety post",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          {
            label: "paired one-liners guide",
            href: "/blog/kubectl-cheat-sheet-natural-language",
          },
        ],
      },
    ],
  },
  {
    slug: "kubectl-cheat-sheet-natural-language",
    title:
      "kubectl cheat sheet with natural-language equivalents (kprompt)",
    description:
      "A practical kubectl cheat sheet paired with natural-language prompts — get, list, describe, logs, scale, rollback, delete, explain, Helm, and JSON CI — for operators who know the API and want faster day-2 typing.",
    publishedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "kubectl",
      "kubernetes cli",
      "devops",
      "cheat sheet",
    ],
    keywords: [
      "kubectl cheat sheet",
      "kubectl commands",
      "kubectl natural language",
      "kubernetes cheat sheet",
      "kubectl get pods",
      "kubectl scale deployment",
      "kubectl rollout undo",
      "kubectl logs",
      "kubectl describe",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "kubectl remains the primary command-line tool for Kubernetes. This cheat sheet does not replace it — it pairs common one-liners with natural-language prompts you can run through kprompt when flag order is the bottleneck, not understanding the API.",
        links: [
          {
            label: "primary command-line tool for Kubernetes",
            href: "https://kubernetes.io/docs/concepts/overview/kubectl/",
          },
        ],
      },
      {
        type: "p",
        text: "Reads (list, get, describe, logs, explain) run immediately. Mutations (scale, deploy, rollback, named delete, Helm install/upgrade) print a plan, run safety checks, and wait for approval unless you pass --approve. Prefer staging. Experimental software — wrong plans still happen; read before you apply.",
        links: [
          { label: "safety docs", href: "/docs/safety" },
          {
            label: "kubectl alternatives comparison",
            href: "/blog/kubectl-alternatives",
          },
        ],
      },
      {
        type: "h2",
        text: "How to use this sheet",
      },
      {
        type: "ul",
        items: [
          "Left: kubectl you already trust in scripts and runbooks",
          "Right: a kprompt prompt that aims at the same outcome",
          "Swap api / redis / staging for your names — always pass -n on shared clusters",
          "For wipe-class language and other traps, see the edge-case guide",
        ],
      },
      {
        type: "h2",
        text: "Context and namespace",
      },
      {
        type: "table",
        headers: ["kubectl", "kprompt"],
        rows: [
          [
            "kubectl config current-context",
            "kprompt config   # shows context/namespace defaults",
          ],
          [
            "kubectl config use-context staging",
            "kprompt config set context staging",
          ],
          [
            "kubectl config set-context --current --namespace=staging",
            "kprompt config set namespace staging",
          ],
          [
            "kubectl … -n production --context prod",
            "kprompt \"…\" -n production --context prod",
          ],
        ],
      },
      {
        type: "h2",
        text: "Get and list",
      },
      {
        type: "table",
        headers: ["kubectl", "kprompt"],
        rows: [
          [
            "kubectl get pods -n staging",
            "kprompt \"list pods\" -n staging",
          ],
          [
            "kubectl get deploy -n staging",
            "kprompt \"list deployments\" -n staging",
          ],
          [
            "kubectl get svc -n staging",
            "kprompt \"list services\" -n staging",
          ],
          [
            "kubectl get nodes",
            "kprompt \"list nodes\"   # or: how many nodes are in the cluster",
          ],
          [
            "kubectl get cm -n staging",
            "kprompt \"list configmaps\" -n staging",
          ],
          [
            "kubectl get secret db-creds -n prod",
            "kprompt \"get secret db-creds\" -n prod",
          ],
          [
            "kubectl get deploy,po -n staging",
            "kprompt \"list deployments\" -n staging   # then list pods",
          ],
        ],
      },
      {
        type: "p",
        text: "Generic get/list works for discoverable built-ins and CRDs when discovery can resolve the kind. Prefer group-qualified names (deployments.apps) when short names collide — see the edge-case guide.",
        links: [
          {
            label: "edge-case guide",
            href: "/blog/kubernetes-edge-case-prompts",
          },
        ],
      },
      {
        type: "h2",
        text: "Describe, logs, explain",
      },
      {
        type: "table",
        headers: ["kubectl", "kprompt"],
        rows: [
          [
            "kubectl describe deploy/api -n staging",
            "kprompt \"describe api\" -n staging",
          ],
          [
            "kubectl logs deploy/api -n staging --tail=100",
            "kprompt \"logs api\" -n staging",
          ],
          [
            "kubectl logs deploy/api -n staging --previous",
            "kprompt \"logs api\" -n staging   # then ask for previous in follow-up if needed",
          ],
          [
            "(manual chain: get → describe → events → logs)",
            "kprompt \"explain why api is crashing\" -n staging",
          ],
          [
            "(same ladder for readiness)",
            "kprompt \"explain why deployment api is not ready\" -n staging",
          ],
        ],
      },
      {
        type: "code",
        caption: "Incident start",
        code: `kprompt "explain why payment-api is crashing" -n production
kprompt "logs payment-api" -n production
kprompt "describe payment-api" -n production`,
      },
      {
        type: "h2",
        text: "Scale, deploy, rollback (plan + approve)",
      },
      {
        type: "table",
        headers: ["kubectl", "kprompt"],
        rows: [
          [
            "kubectl scale deploy/api --replicas=3 -n staging",
            "kprompt \"scale api to 3\" -n staging",
          ],
          [
            "kubectl rollout undo deploy/api -n staging",
            "kprompt \"rollback api\" -n staging",
          ],
          [
            "kubectl rollout status deploy/api -n staging",
            "kprompt \"rollback api\" -n staging --wait   # or scale --wait",
          ],
          [
            "kubectl create deploy redis --image=redis:7 -n cache",
            "kprompt \"deploy redis\" -n cache",
          ],
          [
            "kubectl delete deploy redis -n cache",
            "kprompt \"delete deployment redis\" -n cache",
          ],
        ],
      },
      {
        type: "code",
        caption: "Mutation loop",
        code: `$ kprompt "scale api to 3" -n staging

Plan
  1. kubectl scale deployment/api --replicas=3 -n staging

Risk: low
Apply? [y/N]`,
      },
      {
        type: "p",
        text: "Hard denies block wipe-class prompts (delete all pods, wipe namespace, …). Named delete is Pod, Deployment, or Service only today. Details: safety post and edge-case guide.",
        links: [
          {
            label: "safety post",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          {
            label: "edge-case guide",
            href: "/blog/kubernetes-edge-case-prompts",
          },
        ],
      },
      {
        type: "h2",
        text: "Helm (when charts own the release)",
      },
      {
        type: "table",
        headers: ["helm / kubectl world", "kprompt"],
        rows: [
          [
            "helm install redis bitnami/redis -n cache",
            "kprompt \"install redis\" -n cache",
          ],
          [
            "helm upgrade … --version 1.3",
            "kprompt \"upgrade nginx to 1.3\" -n staging",
          ],
          [
            "helm uninstall --all   # dangerous",
            "(hard deny — name a single release)",
          ],
        ],
      },
      {
        type: "p",
        text: "Requires helm on PATH. Plans can include template/dry-run style previews before approve. Deeper Helm vs raw kubectl decision guide is next on the content backlog.",
      },
      {
        type: "h2",
        text: "Performance and traces",
      },
      {
        type: "table",
        headers: ["Classic path", "kprompt"],
        rows: [
          [
            "Prom UI / kubectl top / custom PromQL",
            "kprompt \"why is my api slow?\" -n production",
          ],
          [
            "Jaeger/Tempo UI search",
            "kprompt \"trace payment request\" -n production",
          ],
          [
            "kubectl get hpa -n production",
            "(covered inside performance explain when Prom is configured)",
          ],
        ],
      },
      {
        type: "code",
        caption: "Check what is wired",
        code: `kprompt tools
kprompt "why is my api slow?" -n production`,
      },
      {
        type: "h2",
        text: "CI and JSON",
      },
      {
        type: "table",
        headers: ["Pattern", "Command"],
        rows: [
          [
            "Emit PlanResult",
            "kprompt \"scale api to 10\" -n prod -o json",
          ],
          [
            "Gate denied",
            "… | jq -e '.risk.denied == false'",
          ],
          [
            "Apply after gate",
            "kprompt \"scale api to 10\" -n prod --approve --wait",
          ],
        ],
      },
      {
        type: "p",
        text: "Full pipeline patterns: CI plan gates post and /docs/ci.",
        links: [
          {
            label: "CI plan gates post",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
          { label: "/docs/ci", href: "/docs/ci" },
        ],
      },
      {
        type: "h2",
        text: "History",
      },
      {
        type: "code",
        caption: "Replay without retyping",
        code: `kprompt history
kprompt history rerun 3
kprompt history rerun 3 --approve   # only if you already trust that plan`,
      },
      {
        type: "h2",
        text: "When to stay on raw kubectl",
      },
      {
        type: "ul",
        items: [
          "Exact scripts and GitOps PRs — commit kubectl/helm, not chat",
          "Obscure API fields and one-off CRD patches you already know by heart",
          "Air-gapped emergencies when the LLM provider is unreachable (unless Ollama is local)",
          "Anything your org forbids sending operational context to a model",
        ],
      },
      {
        type: "h2",
        text: "Quick install",
      },
      {
        type: "code",
        caption: "Try the pairs on staging",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "list deployments" -n staging
kprompt "explain why api is not ready" -n staging
kprompt "scale api to 2" -n staging    # review plan → y or n`,
      },
      {
        type: "p",
        text: "For incident phrasing by error type, use the error prompt playbook. For wipe jokes and --approve traps, use the edge-case guide. For why we compile to a plan instead of racing chat REPLs, see the intent compiler note. kubectl literacy stays the foundation — natural language is the accelerator.",
        links: [
          {
            label: "error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          {
            label: "edge-case guide",
            href: "/blog/kubernetes-edge-case-prompts",
          },
          {
            label: "intent compiler note",
            href: "/blog/intent-compiler-not-chat",
          },
          { label: "docs quickstart", href: "/docs/quickstart" },
        ],
      },
    ],
  },
  {
    slug: "intent-compiler-not-chat",
    title:
      "kprompt is an intent compiler, not a Kubernetes chat REPL",
    description:
      "Why we compile natural language into a gated PlanResult instead of racing kubectl-ai on agentic chat — same NL CLI lane, different contract: typed plans, hard denies, CI JSON, multi-tool day-2 under one approval loop.",
    publishedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "kubernetes cli",
      "platform engineering",
      "devops",
    ],
    keywords: [
      "kubernetes intent compiler",
      "plan before apply kubernetes",
      "kubectl-ai alternative",
      "kubernetes ai cli",
      "planresult",
      "natural language kubernetes safety",
      "ai ops approval gate",
      "byok kubernetes cli",
      "kprompt vs kubectl-ai",
      "kprompt",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "Most Kubernetes AI demos look the same in a screenshot: a prompt box, some English, something that resembles kubectl. Underneath, products diverge. Some scan the cluster. Some run agents inside it. Some host chat in a SaaS control plane. And in the local CLI lane — where kubectl-ai and kprompt both sit — the important question is not who has the slicker REPL. It is what the tool emits before anything hits the apiserver.",
      },
      {
        type: "p",
        text: "Our locked bet: kprompt is an intent compiler. Plain English compiles into a typed, reviewable PlanResult — actions, risk, hard denies — that a human or CI can gate, then apply. It is not a free-form agent chat optimized for “keep talking until the cluster moves.” That difference is the product.",
        links: [
          {
            label: "AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
        ],
      },
      {
        type: "h2",
        text: "Same lane, different contract",
      },
      {
        type: "p",
        text: "We do not claim a unique category against every Kubernetes AI tool. The map is simpler:",
      },
      {
        type: "ul",
        items: [
          "K8sGPT — analyzer-first diagnosis (scan → explain). We are not a fleet scanner.",
          "Kagent — in-cluster agent framework. The OSS CLI stays on your laptop with your kubeconfig.",
          "Hosted chat — managed control planes. We are BYOK and local by default.",
          "kubectl-ai — natural-language kubectl fluency. Same lane as us; different mutate contract.",
        ],
      },
      {
        type: "p",
        text: "Trying to out-chat kubectl-ai on agentic REPL features is a losing strategy. Google can ship conversation quality and tool-calling surface area faster than a small OSS project. Competing there means forever second place. Competing on a printable, policy-shaped plan artifact is a fight worth picking.",
        links: [
          {
            label: "kubectl-ai",
            href: "https://github.com/GoogleCloudPlatform/kubectl-ai",
          },
        ],
      },
      {
        type: "h2",
        text: "What “intent compiler” means in practice",
      },
      {
        type: "p",
        text: "A chat REPL optimizes for turn-taking: the model calls tools, narrates, maybe runs kubectl. An intent compiler optimizes for an artifact you can refuse:",
      },
      {
        type: "code",
        caption: "Compile → review → apply (or abort)",
        code: `$ kprompt "scale api to 3" -n staging

Plan
  1. kubectl scale deployment/api --replicas=3 -n staging

Risk: low
Apply? [y/N] n
Aborted.`,
      },
      {
        type: "ul",
        items: [
          "LLM proposes intent; Go packages own planning, safety, and execution",
          "Mutations default to plan-only until y/N or an explicit --approve",
          "Wipe-class prompts hard-deny before a useful apply path exists",
          "CI consumes the same PlanResult JSON humans see summarized in the terminal",
        ],
      },
      {
        type: "code",
        caption: "Same prompt, machine-readable gate",
        code: `kprompt "scale api to 3" -n staging -o json | \\
  jq '{intent:.plan.intent, risk:.risk, denied:.risk.denied}'`,
      },
      {
        type: "h2",
        text: "Why the artifact matters more than the chat",
      },
      {
        type: "p",
        text: "Platform teams already distrust “AI applied something.” They trust diffs, PRs, admission policy, and change tickets. A scrollback of model narration does not fit that muscle memory. A PlanResult does: intent, ordered actions, risk level, denied flag, applied boolean — something you can jq, archive, and teach juniors to read before they type y.",
      },
      {
        type: "table",
        headers: ["Chat REPL instinct", "Intent compiler instinct"],
        rows: [
          [
            "Keep the session going until it works",
            "Emit one plan; refuse or approve",
          ],
          [
            "Tool calls are the product",
            "The gated plan is the product",
          ],
          [
            "Speed to first kubectl",
            "Speed to a reviewable change",
          ],
          [
            "Hard to put in CI without scraping text",
            "JSON PlanResult is a first-class gate",
          ],
        ],
      },
      {
        type: "p",
        text: "Neither instinct is “wrong.” If you want kubectl fluency in an interactive session, a chat-shaped CLI is rational. If you want NL day-2 ops that behave like a change you would put in a pipeline, compile to a plan.",
      },
      {
        type: "h2",
        text: "One contract across tools",
      },
      {
        type: "p",
        text: "The compiler model only pays off if it stretches past kubectl scale. kprompt routes day-2 backends — Helm install/upgrade previews, Prometheus performance explains, trace adapters, Workflow generation — through the same plan → safety → approve loop. The LLM does not become a second control plane; it proposes steps against real CLIs and APIs you already run.",
      },
      {
        type: "code",
        caption: "Different backends, same gate",
        code: `kprompt "install redis" -n cache
kprompt "why is my api slow?" -n production
kprompt "explain why api is crashing" -n staging
# Mutating suggestions still show a plan before apply`,
      },
      {
        type: "p",
        text: "Post-v1 originality we are building toward — not shipping as vapor demos — is cluster-level NL ops on that same contract: optimize my cluster style reports with optional approved fixes, and service dependency graphs grounded in Kubernetes (and traces when available). Still plan-before-apply. Never a silent controller.",
      },
      {
        type: "h2",
        text: "What we are not selling today",
      },
      {
        type: "p",
        text: "Honesty is part of the positioning. The MIT CLI is free, local, and BYOK. Org policy sync, shared audit, and Team enrollment are explored for later — there is nothing to buy on the site today, and this post is not a pricing page. When governance ships, it should attach to the same PlanResult artifact, not invent a parallel chatbot product.",
      },
      {
        type: "ul",
        items: [
          "Not a hosted agent in your cluster (OSS path)",
          "Not “unique NL kubectl” — kubectl-ai shares that job",
          "Not a replacement for RBAC, admission, or GitOps",
          "Experimental — hard denies help; they are not a production certificate",
        ],
      },
      {
        type: "h2",
        text: "How to evaluate us in one afternoon",
      },
      {
        type: "p",
        text: "Do not score kprompt on who tells a better joke in a 40-turn chat. Score the contract:",
      },
      {
        type: "ul",
        items: [
          "Same mutate prompt in kubectl-ai and kprompt — what prints before apply?",
          "Wipe-class prompt — does it fail closed?",
          "JSON gate — can CI reject denied/high-risk without scraping ANSI?",
          "Wrong namespace / scale to zero — does the plan make the blast radius obvious?",
        ],
      },
      {
        type: "code",
        caption: "Thirty-minute drill",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "delete all pods" -n staging
kprompt "scale api to 0" -n staging -o json | jq .risk
kprompt "scale api to 2" -n staging
# read plan → n or y`,
      },
      {
        type: "h2",
        text: "Design principle we will not trade away",
      },
      {
        type: "p",
        text: "Compile to PlanResult, not chat scroll. The LLM proposes; the product artifact is a structured plan humans and policy can gate. Feature parity with agentic REPLs is explicitly out of scope as a north star. If a future feature cannot show up in a reviewable plan (or a clear read-only report), it probably is not a kprompt feature.",
      },
      {
        type: "p",
        text: "For the peer map, read the AI tools comparison. For the safety loop, read plan → approve. For CI, read PlanResult gates — a schema deep dive is next on our content queue. Talk to your cluster — but make the cluster change look like something you would sign.",
        links: [
          {
            label: "AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          {
            label: "plan → approve",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          {
            label: "PlanResult gates",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
        ],
      },
    ],
  },
  {
    slug: "helm-vs-kubectl-day-2",
    title:
      "Helm vs kubectl for day-2: when charts win, when raw apply wins",
    description:
      "A practical decision guide for Helm charts versus kubectl apply on day-2 Kubernetes ops — plus how kprompt maps install/upgrade prompts to reviewable Helm plans without replacing Helm or GitOps.",
    publishedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "helm",
      "kubectl",
      "devops",
      "platform engineering",
    ],
    keywords: [
      "helm vs kubectl",
      "helm day 2 operations",
      "kubernetes helm install",
      "kubectl apply vs helm",
      "helm upgrade kubernetes",
      "helm chart vs manifests",
      "kubernetes package management",
      "helm dry run",
      "natural language helm",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "Day-2 Kubernetes is rarely “write one Deployment YAML and forget it.” You install Redis, bump a chart version, tweak values, roll back a bad upgrade, or scale a workload that was never in Helm. Teams argue Helm vs kubectl as if one should win. Both should — for different jobs.",
      },
      {
        type: "p",
        text: "This guide is a decision sheet: when charts are the right abstraction, when raw kubectl (or GitOps manifests) is clearer, and how kprompt fits as a natural-language layer that calls the real Helm CLI for install/upgrade — with template/dry-run style previews and the same plan → approve gate as kubectl mutations. It does not replace Helm, and it does not replace Git as the source of truth for production desired state.",
        links: [
          { label: "Helm documentation", href: "https://helm.sh/docs/" },
          {
            label: "integrations docs",
            href: "/docs/integrations",
          },
        ],
      },
      {
        type: "h2",
        text: "Quick decision",
      },
      {
        type: "table",
        headers: ["Situation", "Prefer", "Why"],
        rows: [
          [
            "Third-party app with a maintained chart (Redis, ingress, monitoring)",
            "Helm",
            "Values, versioning, and release history beat hand-maintaining upstream YAML",
          ],
          [
            "One Deployment you own end-to-end",
            "kubectl / GitOps manifests",
            "No release object overhead; diffs stay obvious in Git",
          ],
          [
            "Bump chart version or values in staging",
            "Helm upgrade",
            "helm history / rollback semantics exist for a reason",
          ],
          [
            "Emergency scale / rollback of a Deployment",
            "kubectl (or NL scale/rollback)",
            "Fast, named, reversible — do not wait on a chart refactor",
          ],
          [
            "Steady-state production desired state",
            "GitOps (Argo CD / Flux) + Helm or Kustomize",
            "PR review beats laptop apply as the long-term control plane",
          ],
          [
            "Wipe every release in a namespace",
            "Neither — stop",
            "helm uninstall --all class ops are blast-radius events",
          ],
        ],
      },
      {
        type: "h2",
        text: "What Helm is actually for",
      },
      {
        type: "p",
        text: "Helm packages Kubernetes apps as charts: templates + values + a release record. You are not “avoiding YAML” — you are parameterizing someone else's (or your team's) templates and tracking upgrades as releases. That shines when the chart encodes probes, RBAC, Services, and sane defaults you would otherwise copy from READMEs.",
      },
      {
        type: "ul",
        items: [
          "Install — create a named release from a chart/repo",
          "Upgrade — change chart version or values with history",
          "Rollback — return a release to a prior revision (Helm's meaning, not only Deployment rollout undo)",
          "Values — the contract between you and the chart authors",
        ],
      },
      {
        type: "code",
        caption: "Classic Helm day-2",
        code: `helm repo add bitnami https://charts.bitnami.com/bitnami
helm install redis bitnami/redis -n cache --create-namespace
helm upgrade redis bitnami/redis -n cache --version 18.0.0
helm history redis -n cache
helm rollback redis 1 -n cache`,
      },
      {
        type: "h2",
        text: "What kubectl still owns",
      },
      {
        type: "p",
        text: "kubectl talks directly to the apiserver. It is the right tool when the unit of change is an object you understand cold — scale replicas, rollout undo, describe a Pod, patch a probe. It is also the lingua franca inside scripts, CI, and incident notes. Helm eventually applies objects; kubectl remains how you inspect and surgically mutate them.",
      },
      {
        type: "code",
        caption: "Classic kubectl day-2",
        code: `kubectl get deploy -n staging
kubectl scale deploy/api --replicas=3 -n staging
kubectl rollout undo deploy/api -n staging
kubectl describe pod -l app=api -n staging
kubectl logs deploy/api -n staging --tail=100`,
      },
      {
        type: "p",
        text: "If your “app” is a single Deployment your team wrote, wrapping it in Helm “because platforms use Helm” often adds ceremony without adding leverage. Prefer plain manifests (or Kustomize) in Git until you need values-driven reuse across environments.",
      },
      {
        type: "h2",
        text: "deploy vs install in kprompt (easy to confuse)",
      },
      {
        type: "p",
        text: "Natural language blurs the verbs. In kprompt they map to different backends:",
      },
      {
        type: "table",
        headers: ["Prompt shape", "Backend", "Use when"],
        rows: [
          [
            "deploy redis / deploy nginx",
            "Kubernetes recipes (client-go / manifests)",
            "Simple known workloads; no Helm required",
          ],
          [
            "install redis / install <chart>",
            "Helm CLI (helm on PATH)",
            "You want a real chart release with preview",
          ],
          [
            "upgrade nginx to 1.3",
            "Helm upgrade",
            "Chart/version bump with plan before apply",
          ],
          [
            "scale / rollback / delete deployment …",
            "Kubernetes",
            "Object-level day-2, chart or not",
          ],
        ],
      },
      {
        type: "code",
        caption: "Same word family, different plans",
        code: `kprompt "deploy redis" -n cache
# → Kubernetes Deployment (+ Service) style plan

kprompt "install redis" -n cache
# → helm repo / helm install plan + template/dry-run preview

kprompt tools   # confirm Helm is on PATH before install prompts`,
      },
      {
        type: "p",
        text: "If Helm is missing, kprompt should hint you toward install Helm or the Kubernetes deploy shortcut — not invent a successful chart install.",
      },
      {
        type: "h2",
        text: "The approval loop stays the same",
      },
      {
        type: "p",
        text: "Whether the plan's backend is kubernetes or helm, mutations are still reviewable. Helm paths surface template/dry-run style previews so you read rendered intent before approve. Wipe-class Helm language (uninstall --all, purge all releases) hard-denies. Named uninstall is not something to casually --approve in production either — treat release deletion like any high-blast-radius change.",
        links: [
          {
            label: "edge-case guide (Helm --all)",
            href: "/blog/kubernetes-edge-case-prompts",
          },
          { label: "safety docs", href: "/docs/safety" },
        ],
      },
      {
        type: "code",
        caption: "Install with eyes open",
        code: `$ kprompt "install redis" -n cache

# Plan includes helm steps + preview context
# Risk: medium — mutation requires approval
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "Day-2 patterns that mix both",
      },
      {
        type: "h3",
        text: "Chart for install, kubectl for incident",
      },
      {
        type: "p",
        text: "Production Redis came from Helm. Tonight it OOMs. You do not need a values PR to confirm OOMKilled — explain/logs first, then a bounded memory patch or Helm values bump as a follow-up. Incident speed and release hygiene are different tempos.",
        links: [
          {
            label: "OOMKilled guide",
            href: "/blog/kubernetes-oomkilled",
          },
        ],
      },
      {
        type: "code",
        caption: "Mixed tempo",
        code: `kprompt "explain why redis is crashing" -n cache
# … confirm OOM …

# Later, durable fix via chart values / upgrade — or a reviewed patch plan
kprompt "upgrade redis" -n cache`,
      },
      {
        type: "h3",
        text: "GitOps owns prod; laptop owns discovery",
      },
      {
        type: "p",
        text: "Use Helm (or Helm via Argo CD) in Git for environments that matter. Use kprompt/kubectl on the laptop for staging discovery, explain, and break-glass scale/rollback — with plan gates. CI can consume PlanResult JSON for operational prompts the same way it gates manifest diffs.",
        links: [
          {
            label: "CI plan gates",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
        ],
      },
      {
        type: "h2",
        text: "Anti-patterns",
      },
      {
        type: "ul",
        items: [
          "Helm wrapping a single Deployment you fully control — ceremony without reuse",
          "kubectl apply of chart output with no release record — you lose Helm history on purpose",
          "Editing live objects that GitOps will overwrite — fix Git, not only the cluster",
          "helm uninstall --all as cleanup — hard deny exists for a reason",
          "Assuming NL install invents a private chart you never configured — real Helm + real repos only",
        ],
      },
      {
        type: "h2",
        text: "Honest scope today",
      },
      {
        type: "p",
        text: "kprompt ships Helm install and upgrade planning with previews when helm is on PATH. It is experimental. It is not a full Helmfile replacement, not a values IDE, and not a promise that every chart flag is expressible in English. Read the plan. Prefer non-production while you learn how previews look for your charts.",
      },
      {
        type: "h2",
        text: "Try both paths on staging",
      },
      {
        type: "code",
        caption: "deploy shortcut vs Helm install",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt tools
kprompt "deploy redis" -n staging      # Kubernetes recipe path
kprompt "install redis" -n staging     # Helm path — review preview → y/N
kprompt "list deployments" -n staging`,
      },
      {
        type: "p",
        text: "For kubectl one-liners paired with prompts, see the cheat sheet. For why plans matter more than chat scroll, see the intent compiler note. Pick Helm when the chart is the product; pick kubectl when the object is.",
        links: [
          {
            label: "cheat sheet",
            href: "/blog/kubectl-cheat-sheet-natural-language",
          },
          {
            label: "intent compiler note",
            href: "/blog/intent-compiler-not-chat",
          },
          {
            label: "integrations roadmap post",
            href: "/blog/kubernetes-integrations-roadmap",
          },
        ],
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS.map((post, index) => ({ post, index }))
    .sort(
      (a, b) =>
        new Date(b.post.publishedAt).getTime() -
          new Date(a.post.publishedAt).getTime() ||
        b.index - a.index
    )
    .map(({ post }) => post);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

export function blogTagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAllBlogTags(): string[] {
  return [...new Set(BLOG_POSTS.flatMap((post) => post.tags))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getBlogTagBySlug(slug: string): string | undefined {
  return getAllBlogTags().find((tag) => blogTagSlug(tag) === slug);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.publishedAt).getTime() -
          new Date(a.post.publishedAt).getTime()
    )
    .slice(0, limit)
    .map(({ post: relatedPost }) => relatedPost);
}

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
