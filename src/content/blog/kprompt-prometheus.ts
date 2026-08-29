import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "kprompt-prometheus",
  title:
    "kprompt + Prometheus: why is my api slow — without inventing numbers",
  description:
    "Day-2 Prometheus with kprompt: bind an existing Prom URL, read-only performance explain (CPU, memory, p95, HPA), optimize idle/rightsizing, and fail clear when metrics are missing. Not a PromQL IDE and not auto-remediation.",
  publishedAt: "2026-08-11",
  author: MUHTALIP_DEDE,
  tags: [
    "kubernetes",
    "prometheus",
    "devops",
    "sre",
    "observability",
    "kprompt",
  ],
  keywords: [
    "kprompt prometheus",
    "why is my api slow kubernetes",
    "natural language prometheus",
    "promql kubernetes ai",
    "kubernetes performance explain",
    "bind existing prometheus",
    "kprompt optimize prometheus",
    "prometheus idle rightsizing",
    "kubernetes hpa prometheus",
    "ai sre prometheus",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "Prometheus is still the right store for cluster metrics. kprompt does not replace it, and it does not invent a latency number when the backend is missing. It binds the Prometheus you already scrape and compiles “why is my api slow?” into bounded PromQL — then narrates CPU, memory, p95, replicas, and HPA. Read-only. No silent patch.",
    },
    {
      type: "p",
      text: "Helm day-2 has its own deep dive. OpenTelemetry is the traces sibling. This post is metrics: detect, bind-over-install, the performance explain shape, how optimize uses the same URL, and what we refuse to claim.",
      links: [
        { label: "kprompt + Helm deep dive", href: "/blog/kprompt-helm-deep-dive" },
        { label: "kprompt + OpenTelemetry", href: "/blog/kprompt-opentelemetry" },
        { label: "Integrations", href: "/docs/integrations#prometheus" },
        { label: "Adopt (15 min)", href: "/docs/adopt" },
      ],
    },
    {
      type: "h2",
      text: "Prerequisite: a Prometheus URL, not a second stack",
    },
    {
      type: "p",
      text: "kprompt tools reports whether a Prometheus URL is configured. Brownfield instinct is bind the scraper you already run. kprompt setup can plan kube-prometheus-stack — dry-run by default, approve-gated — but that is the exception, not the adopt path.",
      links: [
        { label: "Setup", href: "/docs/setup" },
        { label: "Brownfield in 15 minutes", href: "/blog/brownfield-kprompt-in-15-minutes" },
      ],
    },
    {
      type: "code",
      caption: "Detect, then bind",
      code: `kprompt tools
# prometheus: configured URL — or MissingHint

kprompt config set tools.prometheus.url http://prometheus.monitoring:9090

# Only if you truly have no Prom and accept an install plan:
# kprompt setup --only prometheus --dry-run`,
    },
    {
      type: "h2",
      text: "why is my api slow — read-only explain",
    },
    {
      type: "p",
      text: "Performance explain is a read. It uses bounded instant and range queries for a named workload: CPU, memory, p95 latency when the metric exists, replica count, and HPA headroom. Missing Prom fails clear. Partial metrics degrade — they do not fabricate p95.",
    },
    {
      type: "code",
      caption: "Performance explain",
      code: `$ kprompt "why is my api slow?" -n production

# Needs tools.prometheus.url
# Narrates CPU / memory / p95 / replicas / HPA when the series exist
# Does not apply a scale or patch`,
    },
    {
      type: "p",
      text: "Same family: why is production slow, show CPU for payment-api pods last hour. The Top 100 hub lists the observability set; this post is the contract behind those rows.",
      links: [
        { label: "Top 100 Kubernetes prompts", href: "/blog/top-100-kubernetes-prompts" },
      ],
    },
    {
      type: "h2",
      text: "What the queries are allowed to do",
    },
    {
      type: "table",
      headers: ["Signal", "Role", "If missing"],
      rows: [
        ["CPU / memory", "Usage vs requests for the target", "Skip that finding — do not invent %"],
        ["p95 latency", "When the histogram/series exists", "Omit latency — do not guess ms"],
        ["Replicas", "Current desired/ready sketch", "Fall back to Kubernetes inventory"],
        ["HPA", "Present, maxed, or static-replica note", "Structural note only"],
      ],
    },
    {
      type: "p",
      text: "Timeouts and bounded windows are part of the adapter. kprompt is not a PromQL scratchpad and not a drop-in for Grafana Explore.",
    },
    {
      type: "h2",
      text: "optimize uses the same bind",
    },
    {
      type: "p",
      text: "optimize my cluster is a separate read-only report: inventory always, idle and rightsizing when Prometheus usage vs requests supports it, HPA hints from objects. --approve on the optimize prompt does not patch Deployments. Suggested scale/patch plans are follow-ups with their own approval.",
      links: [
        { label: "optimize my cluster", href: "/blog/optimize-my-cluster" },
      ],
    },
    {
      type: "code",
      caption: "Same URL, different intent",
      code: `kprompt "why is my api slow?" -n production
kprompt "optimize my cluster" -n production
kprompt "optimize my cluster" -o json   # CI / jq — still read-only`,
    },
    {
      type: "h2",
      text: "Multi-tool: explain, then a plan",
    },
    {
      type: "p",
      text: "You can chain a read into a mutate: why is api slow then scale api to 4. The scale step still produces one aggregate plan and one approval. Metrics narration is not permission to apply.",
      links: [{ label: "Safety", href: "/docs/safety" }],
    },
    {
      type: "code",
      caption: "One approval for the mutating tail",
      code: `kprompt "why is api slow then scale api to 4" -n production
# read evidence, then a scale PlanResult — y/N or --approve`,
    },
    {
      type: "h2",
      text: "What we are not claiming",
    },
    {
      type: "ul",
      items: [
        "Not a PromQL IDE or recording-rule compiler",
        "Not a replacement for Grafana dashboards (those are a separate bind)",
        "Not a second kube-prometheus-stack by default — bind first",
        "Not cloud invoice / FinOps — labeled cost notes only when Prom exists",
        "Not auto-remediation: slow ≠ silent HPA edit",
        "Not a promise that every cluster has RED metrics with the names we prefer",
      ],
    },
    {
      type: "h2",
      text: "Try it against the Prom you already have",
    },
    {
      type: "code",
      caption: "Bind → explain → deny a wipe",
      code: `kprompt tools
kprompt config set tools.prometheus.url http://prometheus.monitoring:9090
kprompt "why is my api slow?" -n staging
kprompt "optimize my cluster" -n staging
kprompt "delete everything in the cluster"
# expect hard deny — metrics never weaken the safety loop`,
    },
    {
      type: "p",
      text: "Experimental on purpose. Prefer a non-production namespace while you learn the narration. If tools says Prometheus is missing, point at the URL you already scrape — do not install a second stack so the demo looks green.",
      links: [
        { label: "Integrations", href: "/docs/integrations#prometheus" },
        { label: "Adopt", href: "/docs/adopt" },
        { label: "Providers", href: "/docs/providers" },
        { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
      ],
    },
  ],
};

export default post;
