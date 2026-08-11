import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "brownfield-kprompt-in-15-minutes",
  title: "Brownfield kprompt in 15 minutes — adopt without rebuilding the stack",
  description:
    "Starting from zero with kind is easy. The real challenge is attaching kprompt to a cluster you already run: bind existing Prometheus, read-first insight, optional MCP — install last.",
  publishedAt: "2026-08-10",
  author: MUHTALIP_DEDE,
  tags: [
    "kubernetes",
    "ai",
    "sre",
    "devops",
    "platform engineering",
    "kprompt",
    "adoption",
  ],
  keywords: [
    "kprompt brownfield",
    "adopt kprompt existing cluster",
    "kprompt 15 minutes",
    "kubernetes ai adopt",
    "bind prometheus kprompt",
    "kprompt tools detect",
    "kprompt setup vs config",
    "mcp kubernetes brownfield",
    "plan approve existing cluster",
    "platform engineering nl ops",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "Greenfield demos sell themselves. Spin kind, run the Observe walkthrough, watch CrashLoop become a story. That path matters — it is not how most teams meet a new ops tool.",
      links: [{ label: "Quickstart", href: "/docs/quickstart" }],
    },
    {
      type: "p",
      text: "Most clusters already have Helm on someone's laptop, a Prometheus somewhere, GitOps controllers, and RBAC nobody wants to reopen for a vendor agent. The challenge is not “can we install kprompt?” It is: how fast can we get a useful insight without installing a second monitoring stack?",
    },
    {
      type: "p",
      text: "We wrote the durable steps as Adopt on an existing cluster. This post is the argument and the anti-patterns. The docs page is the checklist you keep open.",
      links: [{ label: "Adopt on an existing cluster", href: "/docs/adopt" }],
    },
    {
      type: "h2",
      text: "The thesis",
    },
    {
      type: "p",
      text: "kprompt is a natural-language interface over tools you already trust — not a replacement for Helm, Argo, Prometheus, or kubectl. Brownfield adoption should maximize bind and read, and treat install as an exception you approve on purpose.",
      links: [{ label: "Integrations", href: "/docs/integrations" }],
    },
    {
      type: "ul",
      items: [
        "Detect what is already there (kprompt tools / doctor)",
        "Configure URLs and PATH — do not silently provision operators",
        "First value is a read: explain, why slow, optimize report, dependency graph",
        "Mutations stay plan → safety → approve; MCP never applies",
      ],
    },
    {
      type: "h2",
      text: "Fifteen minutes, scored",
    },
    {
      type: "table",
      headers: ["Minute", "Move", "Why"],
      rows: [
        [
          "0–2",
          "Install CLI + confirm kubecontext",
          "No new cluster; staging/sandbox first",
        ],
        [
          "2–5",
          "kprompt init (Ollama or BYOK) + doctor",
          "NL needs a provider; keys stay out of config.yaml",
        ],
        [
          "5–8",
          "kprompt tools → config set Prom/Grafana/OTel URLs",
          "Bind beats install when backends exist",
        ],
        [
          "8–12",
          "Read prompts: explain / why slow / optimize / graph",
          "Risk = 0; RBAC is yours",
        ],
        [
          "12–15",
          "Optional MCP + one plan-only mutate",
          "IDE reach without apply authority",
        ],
      ],
    },
    {
      type: "code",
      caption: "Bind, don’t bootstrap",
      code: `kprompt tools
kprompt config set tools.prometheus.url http://prometheus.monitoring:9090
kprompt doctor

kprompt "explain why checkout is failing" -n payments
kprompt "why is my api slow?" -n payments
kprompt "optimize my cluster"`,
    },
    {
      type: "p",
      text: "When tools reports Prometheus missing, the brownfield instinct is “point at the URL we already scrape,” not “helm install kube-prometheus-stack so the demo looks green.” Setup exists for true gaps — dry-run by default, approve-gated apply — and it is the wrong default for a working platform.",
      links: [
        { label: "Setup", href: "/docs/setup" },
        { label: "optimize my cluster", href: "/blog/optimize-my-cluster" },
      ],
    },
    {
      type: "h2",
      text: "MCP is reach, not a second control plane",
    },
    {
      type: "p",
      text: "If your team lives in Cursor or Claude Desktop, kprompt mcp serve is the fastest way to put investigate / why / plan next to the chat. The assistant can compile a mutate into PlanResult JSON. It cannot approve. That split is the product: editor convenience without dissolving the human gate.",
      links: [
        { label: "MCP docs", href: "/docs/mcp" },
        {
          label: "kprompt as an MCP tool provider",
          href: "/blog/kprompt-mcp-tool-provider",
        },
      ],
    },
    {
      type: "h2",
      text: "Anti-patterns we keep seeing",
    },
    {
      type: "ul",
      items: [
        "Treating setup --profile platform as day-0 on a cluster that already has monitoring",
        "First session on production with --approve",
        "Expecting the IDE agent to apply because “MCP means tools can write”",
        "Skipping doctor when the inventory looks empty — often a missing URL, not a missing CRD",
        "Measuring success as “every integration green” instead of “one honest insight”",
      ],
    },
    {
      type: "h2",
      text: "What we are not claiming",
    },
    {
      type: "ul",
      items: [
        "Not that every cluster lights every tool in 15 minutes",
        "Not that kprompt replaces your GitOps or Helmfile installer",
        "Not silent Autopilot or auto-heal on brownfield day one",
        "Not a hosted multi-cluster SaaS — laptop kubeconfig + your RBAC",
      ],
    },
    {
      type: "p",
      text: "Experimental CLI, same as always. Prefer non-production contexts. Read every plan. The win condition for this challenge is simple: useful insight, zero unnecessary installs, safety contract intact.",
      links: [
        { label: "Adopt playbook", href: "/docs/adopt" },
        { label: "Safety", href: "/docs/safety" },
        { label: "Install", href: "/docs/install" },
        { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
      ],
    },
  ],
};

export default post;
