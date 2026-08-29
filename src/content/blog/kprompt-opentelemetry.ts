import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "kprompt-opentelemetry",
  title:
    "kprompt + OpenTelemetry: trace payment request — without inventing spans",
  description:
    "Day-2 OpenTelemetry with kprompt: bind Jaeger or Tempo, walk a span tree, narrate bottleneck waits, enrich service graphs with call edges when traces exist, and degrade honestly when OTel is missing. Not a Jaeger UI and not auto-remediation.",
  publishedAt: "2026-08-29",
  author: MUHTALIP_DEDE,
  tags: [
    "kubernetes",
    "opentelemetry",
    "observability",
    "devops",
    "sre",
    "kprompt",
  ],
  keywords: [
    "kprompt opentelemetry",
    "trace payment request kubernetes",
    "natural language jaeger tempo",
    "kubernetes otel ai",
    "span tree bottleneck narration",
    "bind existing tempo",
    "kprompt service dependency graph otel",
    "jaeger tempo kubernetes cli",
    "ai sre open telemetry",
    "degraded otel evidence",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "OpenTelemetry is still the right wire for distributed traces. kprompt does not replace Jaeger or Tempo, and it does not invent a postgres wait when the backend is missing. It binds the query API you already run and compiles “trace payment request” into a span tree plus bottleneck narration. Read-only. No silent patch.",
    },
    {
      type: "p",
      text: "Prometheus day-2 has its own deep dive (metrics / why-slow). This post is the traces sibling: detect, bind-over-install, the trace walk shape, how service graphs optionally add OTel call edges, and what we refuse to claim.",
      links: [
        { label: "kprompt + Prometheus", href: "/blog/kprompt-prometheus" },
        { label: "kprompt + Helm deep dive", href: "/blog/kprompt-helm-deep-dive" },
        {
          label: "Integrations",
          href: "/docs/integrations#opentelemetry-jaeger-tempo",
        },
        { label: "Adopt (15 min)", href: "/docs/adopt" },
      ],
    },
    {
      type: "h2",
      text: "Prerequisite: a Jaeger or Tempo endpoint, not a second collector",
    },
    {
      type: "p",
      text: "kprompt tools reports whether an OpenTelemetry endpoint is configured. Brownfield instinct is bind the Tempo or Jaeger query URL you already expose. kprompt setup can print config-lane hints for OTel — it does not auto-write tools.otel.* and it does not stand up a new collector so the demo looks green.",
      links: [
        { label: "Setup", href: "/docs/setup" },
        { label: "Tools", href: "/docs/tools" },
        {
          label: "Brownfield in 15 minutes",
          href: "/blog/brownfield-kprompt-in-15-minutes",
        },
      ],
    },
    {
      type: "code",
      caption: "Detect, then bind",
      code: `kprompt tools
# opentelemetry: configured endpoint — or MissingHint

kprompt config set tools.otel.endpoint http://tempo.monitoring:3200
kprompt config set tools.otel.backend tempo
# or: jaeger / auto

# Env equivalents:
# export KPROMPT_OTEL_ENDPOINT=http://tempo.monitoring:3200
# export KPROMPT_OTEL_BACKEND=tempo`,
    },
    {
      type: "h2",
      text: "trace payment request — span tree + bottlenecks",
    },
    {
      type: "p",
      text: "Trace intents are reads. The adapter searches the configured Jaeger or Tempo HTTP API for recent traces matching a service (and optional operation), walks the span tree, and narrates dominant wait points — exclusive duration share, slow spans, error status when present. Missing OTel fails clear. Empty search results degrade — they do not fabricate a postgres span.",
    },
    {
      type: "code",
      caption: "Trace walk",
      code: `$ kprompt "trace payment request" -n production

# Needs tools.otel.endpoint (+ backend)
# Prints span tree + bottleneck narration when spans exist
# Does not apply a scale, patch, or mesh change`,
    },
    {
      type: "p",
      text: "Same family as the Top 100 observability rows. This post is the contract behind those prompts — not a second Jaeger UI.",
      links: [
        { label: "Top 100 Kubernetes prompts", href: "/blog/top-100-kubernetes-prompts" },
      ],
    },
    {
      type: "h2",
      text: "What the walk is allowed to claim",
    },
    {
      type: "table",
      headers: ["Signal", "Role", "If missing"],
      rows: [
        [
          "Span tree",
          "Ordered walk of fetched spans",
          "Fail clear / empty — do not invent services",
        ],
        [
          "Bottleneck spans",
          "Exclusive duration share + slow/error callouts",
          "Omit narration — do not guess wait ms",
        ],
        [
          "Backend (Jaeger / Tempo)",
          "HTTP query adapter; auto when unset",
          "MissingHint — bind the URL you already run",
        ],
        [
          "Timeouts / body caps",
          "Bounded requests (not Explore freestyle)",
          "Error as degraded — not a fake trace",
        ],
      ],
    },
    {
      type: "p",
      text: "kprompt is not a TraceQL scratchpad and not a drop-in for Grafana Explore or the Jaeger UI. It is a day-2 NL surface that returns a reviewable walk under the same tools contract as Prometheus explain.",
    },
    {
      type: "h2",
      text: "Service graph: Kubernetes first, OTel edges optional",
    },
    {
      type: "p",
      text: "show service dependency graph builds from Kubernetes Services, Endpoints, and related objects. When OTel is configured, enrichment may add service→service call edges from recent traces (capped window and service count). Missing or failing OTel never fails the report — notes record degradation. Static impact walks still list otel as degraded when runtime callers are unavailable — that honesty is the feature.",
      links: [
        { label: "Impact", href: "/docs/impact" },
        {
          label: "Building AI SRE #9: Knowledge Graph",
          href: "/blog/building-ai-sre-09-knowledge-graph",
        },
      ],
    },
    {
      type: "code",
      caption: "Graph with optional call edges",
      code: `kprompt "show service dependency graph" -n production
kprompt "show service dependency graph for payments" -n production
# Kubernetes edges always; OTel call edges when the backend answers`,
    },
    {
      type: "h2",
      text: "Observe and Investigate: evidence, not proof",
    },
    {
      type: "p",
      text: "Namespace Observe and CLI investigate/why may attach compact trace EvidenceRefs when KPROMPT_OTEL_* (or tools.otel.*) is set. Missing OTel → degraded: otel. Traces bias explanation — they never sole-prove root cause and never unlock silent apply. Same DNA as Prometheus: bind when present, degrade when absent.",
      links: [
        { label: "Observe vs Investigate", href: "/blog/observe-vs-investigate" },
        { label: "Reality anchors", href: "https://github.com/kprompt/kprompt/blob/main/docs/reality-anchors.md" },
      ],
    },
    {
      type: "h2",
      text: "Multi-tool: metrics, then traces, then a plan",
    },
    {
      type: "p",
      text: "You can chain reads across backends, then a mutate: why is api slow then trace payment then scale api to 4. The scale step still produces one aggregate plan and one approval. Trace narration is not permission to apply.",
      links: [
        { label: "kprompt + Prometheus", href: "/blog/kprompt-prometheus" },
        { label: "Safety", href: "/docs/safety" },
      ],
    },
    {
      type: "code",
      caption: "One approval for the mutating tail",
      code: `kprompt "why is api slow then trace payment then scale api to 4" -n production
# Prom explain + OTel walk (reads), then a scale PlanResult — y/N or --approve`,
    },
    {
      type: "h2",
      text: "What we are not claiming",
    },
    {
      type: "ul",
      items: [
        "Not a Jaeger / Tempo / Grafana Explore replacement",
        "Not an OTel Collector installer by default — bind first",
        "Not auto-writing tools.otel.* from setup (config-lane hints only)",
        "Not a continuous mesh/OTel product graph — opt-in enrichment + honesty flags",
        "Not inventing spans, services, or wait times when search is empty",
        "Not auto-remediation: slow span ≠ silent patch or VirtualService edit",
      ],
    },
    {
      type: "h2",
      text: "Try it against the Tempo you already have",
    },
    {
      type: "code",
      caption: "Bind → trace → graph → deny a wipe",
      code: `kprompt tools
kprompt config set tools.otel.endpoint http://tempo.monitoring:3200
kprompt config set tools.otel.backend tempo
kprompt "trace payment request" -n staging
kprompt "show service dependency graph" -n staging
kprompt "delete everything in the cluster"
# expect hard deny — traces never weaken the safety loop`,
    },
    {
      type: "p",
      text: "Experimental on purpose. Prefer a non-production namespace while you learn the walk. If tools says OpenTelemetry is missing, point at the query URL you already run — do not stand up a second collector so the screenshot looks green.",
      links: [
        {
          label: "Integrations",
          href: "/docs/integrations#opentelemetry-jaeger-tempo",
        },
        { label: "Adopt", href: "/docs/adopt" },
        { label: "Providers", href: "/docs/providers" },
        { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
      ],
    },
  ],
};

export default post;
