import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "agentgateway-alternatives",
  title:
    "agentgateway alternatives in 2026: when you want PlanResult ops instead of an AI gateway",
  description:
    "Looking for an agentgateway alternative? Map by job: kprompt for plan-before-apply day-2 + Observe notify, other AI/MCP gateways for LLM traffic policy, kagent for Agents-as-CRDs — plus when to keep Linux Foundation agentgateway.",
  publishedAt: "2026-08-16",
  author: MUHTALIP_DEDE,
  tags: [
    "kubernetes",
    "ai",
    "sre",
    "platform engineering",
    "devops",
    "agent",
    "mcp",
  ],
  keywords: [
    "agentgateway alternatives",
    "agentgateway alternative",
    "alternative to agentgateway",
    "alternatives to agentgateway",
    "agentgateway vs kprompt",
    "mcp gateway alternative",
    "ai gateway kubernetes alternative",
    "llm gateway alternative kubernetes",
    "agentgateway solo.io alternative",
    "linux foundation agentgateway",
    "a2a gateway alternative",
    "mcp a2a gateway vs plan before apply",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "Searching for agentgateway alternatives usually means one of three jobs: you want a gated day-2 ops CLI (plan → approve) instead of an AI/MCP data plane, you need an agent platform (Agents-as-CRDs) rather than a gateway, or you are comparing AI gateway vendors for LLM/MCP/A2A traffic. agentgateway (Linux Foundation, Solo.io ecosystem) remains the right hire when your platform product is governed agent connectivity. Alternatives should be hired by job — not by who also says “agent.”",
      links: [
        { label: "agentgateway", href: "https://agentgateway.dev/" },
        {
          label: "agentgateway on GitHub",
          href: "https://github.com/agentgateway/agentgateway",
        },
      ],
    },
    {
      type: "p",
      text: "This is the agentgateway-centered sibling of our head-to-head with kprompt, the kagent alternatives hub, and the Runtime vs Gateway vs Platform triangle. Start here if your query was literally “agentgateway alternative.”",
      links: [
        {
          label: "kprompt vs agentgateway",
          href: "/blog/kprompt-vs-agentgateway",
        },
        {
          label: "Runtime vs Gateway vs Platform",
          href: "/blog/ai-runtime-vs-ai-gateway-vs-agent-platform",
        },
        { label: "kagent alternatives", href: "/blog/kagent-alternatives" },
        {
          label: "Kubernetes AI tools map",
          href: "/blog/kubernetes-ai-tools-comparison",
        },
      ],
    },
    {
      type: "h2",
      text: "What is agentgateway (quick)",
    },
    {
      type: "p",
      text: "agentgateway is an open-source AI-native proxy: one data plane for ordinary HTTP/gRPC services plus LLM inference, MCP tool servers, and A2A agent traffic — with policy, observability, and cost controls. On Kubernetes it fits Gateway API. It is not a laptop “type English → PlanResult” CLI.",
    },
    {
      type: "h2",
      text: "Quick map",
    },
    {
      type: "table",
      headers: ["Alternative", "Best when", "Trade-off"],
      rows: [
        [
          "Keep agentgateway",
          "You need LLM/MCP/A2A traffic governance on Gateway API",
          "You own gateway ops, auth, and provider routing",
        ],
        [
          "kprompt",
          "You want PlanResult → safety → approve for day-2 + optional Observe notify",
          "Not an AI gateway; experimental CLI",
        ],
        [
          "Other AI / MCP gateways",
          "You need a different vendor’s LLM router or MCP federation",
          "Still a data-plane job — not PlanResult ops",
        ],
        [
          "kagent",
          "You need Agents as CRDs + MCP tools + A2A as a platform product",
          "Agent control plane, not a gateway proxy",
        ],
        [
          "kubectl-ai",
          "You want a fast NL → kubectl REPL on a laptop",
          "Mutation contract is tool-call oriented",
        ],
        [
          "K8sGPT",
          "The bottleneck is finding what is broken (analyzer)",
          "Diagnosis-first; not a gateway or mutate CLI",
        ],
      ],
    },
    {
      type: "h2",
      text: "When to keep agentgateway",
    },
    {
      type: "p",
      text: "Keep it if every agent LLM call, MCP tool invocation, and A2A hop must pass a governed edge: auth, audit, spend caps, failover. That is classic platform networking for agentic traffic. The alternatives conversation starts when you do not need a new gateway — you need a reviewable plan for scale/rollback/Helm, or a single Observe pipeline that pages Slack.",
    },
    {
      type: "h2",
      text: "kprompt: adjacent job, different layer",
    },
    {
      type: "p",
      text: "kprompt is The AI Runtime for Kubernetes in the ops sense: natural language → typed PlanResult → safety → approve → apply on your laptop kubeconfig (BYOK). Optional Observe agent watches one namespace and gates alerts. kprompt mcp serve is IDE interop (read/plan-only), not a cluster MCP gateway. Choose kprompt when the artifact you must refuse is the plan.",
      links: [
        {
          label: "kprompt vs agentgateway (deep dive)",
          href: "/blog/kprompt-vs-agentgateway",
        },
        { label: "Safety", href: "/docs/safety" },
        { label: "MCP docs", href: "/docs/mcp" },
        { label: "Observe agent", href: "/docs/agent" },
      ],
    },
    {
      type: "code",
      caption: "Ops contract — not a gateway CRD",
      code: `$ kprompt "scale api to 3" -n staging

Plan
  1. scale Deployment/api replicas → 3

Risk: medium
Apply? [y/N]

# IDE MCP (optional) — plans only, never auto-apply
kprompt mcp serve`,
    },
    {
      type: "h2",
      text: "Is kprompt an “agentgateway alternative”?",
    },
    {
      type: "p",
      text: "Yes — when the search intent is “I need AI for Kubernetes day-2 / SRE without standing up an AI gateway.” No — when the search intent is “I need MCP/LLM/A2A Gateway API data plane.” Many teams run both: agentgateway in the network path, kprompt at the operator keyboard.",
    },
    {
      type: "h2",
      text: "kagent is not an agentgateway clone either",
    },
    {
      type: "p",
      text: "kagent hosts Agents as CRDs. agentgateway fronts their traffic. kprompt compiles ops intent. Solo.io / LF neighborhood overlap is real; product layers stay distinct. Use the kagent hubs when your query was about agent platforms.",
      links: [
        { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
        { label: "kagent alternatives", href: "/blog/kagent-alternatives" },
      ],
    },
    {
      type: "h2",
      text: "Decision checklist",
    },
    {
      type: "ul",
      items: [
        "Need LLM/MCP/A2A gateway policy on Gateway API? → keep agentgateway",
        "Need plan / risk / approve / CI JSON for day-2 mutates? → kprompt",
        "Need IDE assistants to call read/plan tools? → kprompt mcp serve",
        "Need Agents as CRDs + agent product? → kagent",
        "Need NL → kubectl chat fluency? → kubectl-ai (or kprompt for gated plans)",
        "Need “what is broken?” fleet scans? → K8sGPT",
      ],
    },
    {
      type: "p",
      text: "Deep comparison: kprompt vs agentgateway. Category without hype: AI Runtime for Kubernetes. Install when you want a gated plan on staging before you touch prod.",
      links: [
        {
          label: "kprompt vs agentgateway",
          href: "/blog/kprompt-vs-agentgateway",
        },
        {
          label: "AI Runtime for Kubernetes",
          href: "/blog/ai-runtime-for-kubernetes",
        },
        { label: "Install kprompt", href: "/docs/install" },
        { label: "Quickstart", href: "/docs/quickstart" },
        { label: "agentgateway.dev", href: "https://agentgateway.dev/" },
      ],
    },
  ],
};

export default post;
