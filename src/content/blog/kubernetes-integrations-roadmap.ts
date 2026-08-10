import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
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
        text: "kprompt is an open-source, Apache-2.0-licensed Kubernetes CLI that adds a natural-language layer on top of that ecosystem — with a non-negotiable rule: every mutation produces a reviewable plan before apply. v0.3.0 ships core workload operations, Helm, Argo Workflows, Prometheus performance diagnosis, and Jaeger/Tempo query adapters. The rest of the stack follows the same rule: real CLI calls and APIs, not hallucinated YAML from chat.",
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
  };

export default post;
