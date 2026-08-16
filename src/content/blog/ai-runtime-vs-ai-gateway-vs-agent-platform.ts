import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "ai-runtime-vs-ai-gateway-vs-agent-platform",
  title:
    "AI Runtime vs AI Gateway vs Agent Platform — kprompt, agentgateway, and kagent",
  description:
    "Three Kubernetes AI layers that share vocabulary and confuse buyers: AI Runtime (kprompt PlanResult ops), AI Gateway (agentgateway LLM/MCP/A2A data plane), Agent Platform (kagent Agents-as-CRDs). One hub, honest jobs, deep links.",
  publishedAt: "2026-08-16",
  author: MUHTALIP_DEDE,
  tags: [
    "kubernetes",
    "ai",
    "sre",
    "architecture",
    "platform engineering",
    "devops",
    "agent",
    "mcp",
    "kagent",
  ],
  keywords: [
    "ai runtime vs ai gateway",
    "ai gateway vs agent platform",
    "ai runtime vs agent platform",
    "kprompt vs kagent vs agentgateway",
    "kubernetes ai runtime",
    "kubernetes ai gateway",
    "kubernetes agent platform",
    "kagent agentgateway kprompt",
    "mcp gateway vs agent platform",
    "plan before apply vs ai gateway",
    "solo.io kagent agentgateway",
    "cncf kagent vs linux foundation agentgateway",
    "ai agents on kubernetes layers",
    "what is an ai runtime for kubernetes",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "Open a Kubernetes AI shortlist and three phrases collide: AI Runtime, AI Gateway, Agent Platform. Marketing uses “agent,” “MCP,” and “runtime” freely. Buyers type kagent, agentgateway, or “AI for Kubernetes” and land on demos that look similar in a screenshot. The jobs are not the same.",
    },
    {
      type: "p",
      text: "This hub separates the triangle used on this site: kprompt as an AI Runtime for cluster ops (PlanResult → approve), agentgateway as an AI/MCP/A2A gateway data plane, and kagent as a Kubernetes-native agent platform (Agents-as-CRDs). Hire by job. Deep dives live one click away.",
      links: [
        {
          label: "AI Runtime essay",
          href: "/blog/ai-runtime-for-kubernetes",
        },
        { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
        {
          label: "kprompt vs agentgateway",
          href: "/blog/kprompt-vs-agentgateway",
        },
        {
          label: "Kubernetes AI tools map",
          href: "/blog/kubernetes-ai-tools-comparison",
        },
      ],
    },
    {
      type: "h2",
      text: "One table — three layers",
    },
    {
      type: "table",
      headers: ["Layer", "Primary artifact", "Example", "Owner"],
      rows: [
        [
          "AI Runtime (ops)",
          "PlanResult → safety → approve → apply",
          "kprompt (+ optional Observe notify)",
          "SRE / platform ops at the keyboard",
        ],
        [
          "AI Gateway",
          "Governed LLM / MCP / A2A / HTTP traffic",
          "agentgateway (Gateway API)",
          "Platform / networking / AI platform",
        ],
        [
          "Agent Platform",
          "Agents, tools, sessions as CRDs",
          "kagent (CNCF Sandbox)",
          "Platform team shipping agents as product",
        ],
      ],
    },
    {
      type: "p",
      text: "Same cluster can run all three. Confusing them buys the wrong control plane — or skips the only gate that prints a refuse-able plan before mutate.",
    },
    {
      type: "h2",
      text: "AI Runtime — reason about the cluster, then ask before apply",
    },
    {
      type: "p",
      text: "An AI Runtime for Kubernetes (as we mean it) sits between human intent and the API server: gather context, reason, emit a typed plan with risk and blast radius, hard-deny wipe-class language, then apply only after approval. The laptop path is a CLI. The in-cluster path can Observe a namespace and page Slack — still without silent auto-heal.",
      links: [
        {
          label: "The AI Runtime for Kubernetes",
          href: "/blog/ai-runtime-for-kubernetes",
        },
        { label: "Safety", href: "/docs/safety" },
        { label: "Observe agent", href: "/docs/agent" },
      ],
    },
    {
      type: "code",
      caption: "Runtime contract in one prompt",
      code: `$ kprompt "scale api to 3" -n staging

Plan
  1. scale Deployment/api replicas → 3

Risk: medium · blast radius: staging/api
Apply? [y/N]`,
    },
    {
      type: "ul",
      items: [
        "Best when: day-2 mutate, investigate/why/timeline, CI PlanResult gates",
        "Not when: you need Agents-as-CRDs or an LLM/MCP traffic proxy",
        "MCP role: kprompt mcp serve = IDE tool provider (read/plan-only), not a gateway",
      ],
    },
    {
      type: "h2",
      text: "AI Gateway — front agent traffic, not the kubectl plan",
    },
    {
      type: "p",
      text: "An AI Gateway is a data plane for agentic protocols and LLM calls: route, authenticate, observe, budget, and audit hops between agents, tools, and model providers. agentgateway unifies ordinary HTTP/gRPC with LLM, MCP, and A2A on a Gateway API–shaped path. It does not compile “scale my Deployment” into a PlanResult.",
      links: [
        { label: "agentgateway.dev", href: "https://agentgateway.dev/" },
        {
          label: "kprompt vs agentgateway",
          href: "/blog/kprompt-vs-agentgateway",
        },
        {
          label: "agentgateway alternatives",
          href: "/blog/agentgateway-alternatives",
        },
      ],
    },
    {
      type: "ul",
      items: [
        "Best when: every LLM/MCP/A2A hop needs policy at the edge",
        "Not when: you only need a laptop NL ops CLI",
        "Confusion: “MCP” here means federating tool servers on the wire — not Cursor calling kprompt.plan",
      ],
    },
    {
      type: "h2",
      text: "Agent Platform — agents as workloads next to apps",
    },
    {
      type: "p",
      text: "An Agent Platform treats agents as first-class Kubernetes resources: Agent CRDs, MCP tool catalogs, A2A composition, GitOps rollouts, mesh-aware governance. kagent (CNCF Sandbox, Solo.io origins) is that product. Platform teams own agent lifecycle the way they own Deployments. Human-in-the-loop is a feature of those agents — not the same artifact as kprompt’s PlanResult.",
      links: [
        { label: "kagent.dev", href: "https://kagent.dev/" },
        { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
        { label: "kagent alternatives", href: "/blog/kagent-alternatives" },
        {
          label: "CNCF kagent",
          href: "https://www.cncf.io/projects/kagent/",
        },
      ],
    },
    {
      type: "ul",
      items: [
        "Best when: “agents are a product we run on the cluster”",
        "Not when: you want a single gated day-2 CLI without agent control-plane ops",
        "Neighborhood: often evaluated next to agentgateway — platform vs gateway, still not ops-compiler",
      ],
    },
    {
      type: "h2",
      text: "Why “runtime” collides",
    },
    {
      type: "p",
      text: "kprompt says AI Runtime. kagent says Kubernetes-native agent runtime. McKinsey ARK says Agentic Runtime. agentgateway is a gateway runtime for traffic. Same English word; four install shapes. We keep “AI Runtime for Kubernetes” for the ops/reasoning loop under plan → approve — and we link out honestly when the buyer’s job is gateway or Agents-as-CRDs.",
      links: [
        { label: "kprompt vs ARK", href: "/blog/kprompt-vs-ark" },
        {
          label: "Intent compiler, not chat",
          href: "/blog/intent-compiler-not-chat",
        },
      ],
    },
    {
      type: "h2",
      text: "Decision checklist",
    },
    {
      type: "ul",
      items: [
        "Need a refuse-able plan before mutate / CI JSON gates? → AI Runtime (kprompt)",
        "Need LLM/MCP/A2A traffic policy on Gateway API? → AI Gateway (agentgateway)",
        "Need Agents as CRDs + MCP/A2A agent product? → Agent Platform (kagent)",
        "Need IDE assistants to call read/plan tools? → kprompt mcp serve (not a gateway)",
        "Need NL → kubectl chat fluency? → kubectl-ai (or kprompt for gated plans)",
        "Need analyzer-first “what is broken?”? → K8sGPT",
      ],
    },
    {
      type: "h2",
      text: "Healthy coexistence",
    },
    {
      type: "p",
      text: "A realistic stack: agentgateway fronts LLM/MCP hops; kagent hosts internal agents behind that edge; operators use kprompt for gated day-2 and Observe for namespace paging. A kagent agent may propose a change that a human still applies via PlanResult. We do not ship that composition as one product — we claim the layers are complementary.",
    },
    {
      type: "code",
      caption: "Mental model",
      code: `Agent Platform (kagent)     → author & run agents as CRDs
AI Gateway (agentgateway)  → govern LLM / MCP / A2A traffic
AI Runtime (kprompt)       → PlanResult → approve → apply (+ Observe)`,
    },
    {
      type: "h2",
      text: "Deep links by query",
    },
    {
      type: "table",
      headers: ["You searched…", "Start here"],
      rows: [
        ["kagent alternative / vs kprompt", "/blog/kagent-alternatives · /blog/kprompt-vs-kagent"],
        [
          "agentgateway alternative / vs kprompt",
          "/blog/agentgateway-alternatives · /blog/kprompt-vs-agentgateway",
        ],
        ["AI Runtime for Kubernetes", "/blog/ai-runtime-for-kubernetes"],
        ["Kubernetes AI tools comparison", "/blog/kubernetes-ai-tools-comparison"],
        ["MCP in the editor", "/blog/kprompt-mcp-tool-provider · /docs/mcp"],
      ],
    },
    {
      type: "h2",
      text: "Honest limits",
    },
    {
      type: "ul",
      items: [
        "kprompt is experimental — read every plan; prefer non-prod first",
        "kprompt is not an AI gateway, not Gateway API, not Agents-as-CRDs",
        "agentgateway is not a PlanResult ops CLI",
        "kagent is not a laptop plan-before-apply contract by default",
        "Shared MCP/A2A vocabulary does not collapse the three layers",
      ],
    },
    {
      type: "p",
      text: "If you leave this page with one sentence: gateways move agent traffic, platforms host agents, runtimes refuse bad plans before apply. Pick the layer that matches the ticket on your board — then open the deep dive for that corner of the triangle.",
      links: [
        { label: "Install kprompt", href: "/docs/install" },
        { label: "Quickstart", href: "/docs/quickstart" },
        { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
        {
          label: "kprompt vs agentgateway",
          href: "/blog/kprompt-vs-agentgateway",
        },
        { label: "kagent.dev", href: "https://kagent.dev/" },
        { label: "agentgateway.dev", href: "https://agentgateway.dev/" },
      ],
    },
  ],
};

export default post;
