import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "optimize-my-cluster",
    title:
      "optimize my cluster: idle workloads, rightsizing, and HPA hints — without auto-apply",
    description:
      "How kprompt’s shipped optimize report works: inventory, Prometheus-backed idle and rightsizing findings, HPA hints, JSON output, and optional follow-up scale/patch plans that still require their own approval. What it is not.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "devops",
      "platform engineering",
      "prometheus",
      "cost",
    ],
    keywords: [
      "optimize kubernetes cluster",
      "kubernetes rightsizing",
      "idle kubernetes workloads",
      "hpa recommendations",
      "kubernetes cost optimization ai",
      "prometheus rightsizing",
      "natural language optimize cluster",
      "kprompt optimize",
      "kubernetes overprovisioned cpu",
      "ai kubernetes capacity",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "“Optimize my cluster” is one of those prompts every platform team wants to type — and every vendor wants to auto-remediate. kprompt ships a different shape: a read-only report (inventory, idle signals, rightsizing deltas, HPA hints), then optional suggested fixes that still go through plan → approve. Passing --approve on the optimize prompt does not silently patch your Deployments.",
        links: [
          { label: "Integrations", href: "/docs/integrations" },
          { label: "Safety docs", href: "/docs/safety" },
          { label: "kprompt + Prometheus", href: "/blog/kprompt-prometheus" },
        ],
      },
      {
        type: "h2",
        text: "What the report covers (shipped)",
      },
      {
        type: "ul",
        items: [
          "Inventory — workloads with replicas and request/limit sketches",
          "Idle / underutilized — when Prometheus usage vs requests supports it",
          "Rightsizing — CPU/memory request/limit deltas from usage percentiles",
          "HPA hints — present, maxed, or static-replica narration",
          "Suggestions — human-readable follow-ups with action hints",
        ],
      },
      {
        type: "p",
        text: "Without Prometheus configured, inventory and structural HPA notes still help; idle and rightsizing degrade honestly instead of inventing savings numbers.",
      },
      {
        type: "h2",
        text: "Run it",
      },
      {
        type: "code",
        caption: "Read-only optimize",
        code: `brew install kprompt/tap/kprompt
export KPROMPT_GEMINI_API_KEY="..."

# Optional but recommended for idle / rightsizing
kprompt config set tools.prometheus.url http://prometheus.monitoring:9090

kprompt "optimize my cluster"
kprompt "optimize my cluster" -n production
kprompt "optimize my cluster" -o json   # CI / jq`,
      },
      {
        type: "code",
        caption: "Illustrative terminal shape",
        code: `Optimize: cluster (1h)
Summary: 42 workloads scanned; 3 idle; 5 rightsizing candidates

Findings:
  - [medium] Idle replicas: payment-worker under 5% CPU vs requests
  - [low] HPA maxed: checkout at maxReplicas

Idle:
  - Deployment/payment-worker: low CPU vs requests over window

Rightsizing:
  - Deployment/api: memory request 512Mi → suggest 384Mi

HPA:
  - Deployment/checkout: HPA present, currently at max

Suggestions:
  - Scale down idle worker: review replicas (optional approved scale)
  - Lower memory request on api: review patch (optional approved patch)`,
      },
      {
        type: "h2",
        text: "Optional fixes still need their own approval",
      },
      {
        type: "p",
        text: "Top findings can become a separate scale or patch plan. That plan is risk-evaluated and needs TTY y/N or an explicit --approve on that follow-up — not the parent optimize flag. This is intentional: optimize is a report, not a bot that rightsizes production while you get coffee.",
      },
      {
        type: "code",
        caption: "Report first, mutate second",
        code: `kprompt "optimize my cluster" --approve
# Still read-only report — does not auto-apply suggestions

# Later, if you agree with a suggestion:
kprompt "scale payment-worker to 1" -n jobs
# → Plan → Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "JSON for pipelines",
      },
      {
        type: "p",
        text: "With --output json, the PlanResult carries the optimize report (idle, rightsizing, HPA, findings). Use it to fail a nightly job when high-severity idle findings appear — or to open a ticket — without applying anything.",
        links: [
          { label: "CI / JSON docs", href: "/docs/ci" },
          {
            label: "CI plan gates post",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
        ],
      },
      {
        type: "h2",
        text: "What it is not",
      },
      {
        type: "ul",
        items: [
          "Not a FinOps bill exporter (dollar / carbon notes are a separate backlog item)",
          "Not a guarantee of “safe” rightsizing without your review",
          "Not a replacement for Kubecost, OpenCost, or capacity planning reviews",
          "Not multi-cluster fleet rollup yet (local report per context; fleet is later)",
          "Not advice to --approve optimize in production and walk away",
        ],
      },
      {
        type: "h2",
        text: "How it fits the AI SRE path",
      },
      {
        type: "p",
        text: "Optimize is cluster-level thinking under the intent-compiler contract: evidence in, structured report out, mutate only with a second gate. Pair it with the service dependency graph when you need consumers before you shrink a Deployment, and with the AI SRE roadmap when you want investigate / blast-radius next.",
        links: [
          {
            label: "Beyond AI kubectl: why kprompt is aiming at AI SRE",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
          {
            label: "intent compiler",
            href: "/blog/intent-compiler-not-chat",
          },
        ],
      },
      {
        type: "h2",
        text: "Try on staging first",
      },
      {
        type: "code",
        caption: "Safe starting point",
        code: `kprompt tools
kprompt "optimize my cluster" -n staging
kprompt "show service dependency graph" -n staging`,
      },
      {
        type: "p",
        text: "kprompt remains experimental. Prefer non-production while you learn how findings look for your charted workloads and Prom labels. Star issues if a rightsizing heuristic is wrong for your stack — the report should stay honest, not optimistic. For the JSON shape of reports and plans, see the PlanResult JSON deep dive.",
        links: [
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Quickstart", href: "/docs/quickstart" },
          {
            label: "PlanResult JSON deep dive",
            href: "/blog/planresult-json-deep-dive",
          },
        ],
      },
    ],
  };

export default post;
