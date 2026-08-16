import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "kprompt-vs-agentgateway",
  title:
    "kprompt vs agentgateway: PlanResult ops CLI vs AI/MCP agent gateway",
  description:
    "agentgateway (Linux Foundation) is an AI-native proxy for LLM, MCP, and A2A traffic on Gateway API. kprompt is an AI Runtime for cluster ops: PlanResult → approve, plus Observe notify. Is kprompt an agentgateway alternative? Only for the ops job — decision guide.",
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
  ],
  keywords: [
    "kprompt vs agentgateway",
    "agentgateway vs kprompt",
    "agentgateway alternative",
    "what is agentgateway",
    "agentgateway kubernetes",
    "agentgateway linux foundation",
    "agentgateway solo.io",
    "mcp gateway vs kprompt",
    "ai gateway kubernetes",
    "llm gateway vs plan before apply",
    "a2a gateway vs observe agent",
    "agentgateway mcp a2a",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "agentgateway markets itself as agent connectivity solved: one high-performance gateway for service, LLM, MCP, and A2A traffic — route, secure, observe, govern. kprompt markets itself as The AI Runtime for Kubernetes: observe the cluster, reason, emit a reviewable PlanResult, approve, then apply. Both show up in “AI on Kubernetes” shortlists. They are still different layers of the stack.",
      links: [
        { label: "agentgateway", href: "https://agentgateway.dev/" },
        {
          label: "agentgateway on GitHub",
          href: "https://github.com/agentgateway/agentgateway",
        },
        {
          label: "AI Runtime essay",
          href: "/blog/ai-runtime-for-kubernetes",
        },
      ],
    },
    {
      type: "p",
      text: "Short answer: choose agentgateway when you need a data plane for LLM inference, MCP tool calls, and agent-to-agent traffic under Gateway API policy. Choose kprompt when you need a plan-before-apply ops contract on a laptop CLI (and an optional Observe agent that notifies without silent mutate). agentgateway fronts agent traffic. kprompt compiles cluster intent into a refuse-able plan. Searching “agentgateway alternative”? Start with the alternatives hub, then come back here for the deep table.",
      links: [
        {
          label: "agentgateway alternatives hub",
          href: "/blog/agentgateway-alternatives",
        },
        {
          label: "Runtime vs Gateway vs Platform",
          href: "/blog/ai-runtime-vs-ai-gateway-vs-agent-platform",
        },
        {
          label: "broader AI tools map",
          href: "/blog/kubernetes-ai-tools-comparison",
        },
        { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
      ],
    },
    {
      type: "h2",
      text: "What is agentgateway?",
    },
    {
      type: "p",
      text: "agentgateway is an open-source, AI-native HTTP/gRPC proxy and control plane (Linux Foundation / Solo.io ecosystem). It unifies ordinary service traffic with LLM provider routing, MCP tool federation, and A2A hops — with auth, observability, and cost controls a platform team can trust. On Kubernetes it aligns with Gateway API. It is not a day-2 “scale my Deployment” CLI, and it is not K8sGPT.",
      links: [
        { label: "agentgateway.dev", href: "https://agentgateway.dev/" },
        {
          label: "Kubernetes docs",
          href: "https://agentgateway.dev/docs/kubernetes/latest",
        },
      ],
    },
    {
      type: "h2",
      text: "Is kprompt an agentgateway alternative?",
    },
    {
      type: "p",
      text: "For the job “AI that helps operate my cluster with a reviewable plan” — yes, that is the honest alternatives intent when buyers type agentgateway in the same breath as Kubernetes AI tools. For the job “MCP/LLM/A2A gateway data plane on Gateway API” — no; keep agentgateway (or another AI gateway). Collapsing those intents disappoints. Honest positioning: both touch agentic AI on Kubernetes; only one is a PlanResult ops product.",
      links: [
        {
          label: "agentgateway alternatives",
          href: "/blog/agentgateway-alternatives",
        },
      ],
    },
    {
      type: "h2",
      text: "Quick decision",
    },
    {
      type: "table",
      headers: ["You care about…", "Prefer", "Why"],
      rows: [
        [
          "LLM / MCP / A2A traffic policy + Gateway API",
          "agentgateway",
          "AI-native proxy data plane; unify service + agent protocols",
        ],
        [
          "Reviewable PlanResult before every mutate",
          "kprompt",
          "Plan → safety → y/N; wipe-class hard denies; CI JSON",
        ],
        [
          "MCP tool servers for IDE assistants (Cursor, Claude)",
          "kprompt mcp serve",
          "Read/plan-only IDE interop — not a cluster MCP gateway",
        ],
        [
          "Laptop NL CLI for day-2 (Helm, explain, scale)",
          "kprompt",
          "One binary, BYOK, kubeconfig-local",
        ],
        [
          "Always-on namespace alerts → Slack (notify-only)",
          "kprompt Observe",
          "Watch → Incident → gated webhook; Autopilot propose-only",
        ],
        [
          "Cost / auth / audit on every LLM or MCP hop",
          "agentgateway",
          "Gateway is the enforcement point for agent traffic",
        ],
      ],
    },
    {
      type: "h2",
      text: "Why the overlap feels real",
    },
    {
      type: "p",
      text: "Buyers researching “Kubernetes AI” hit Solo.io / CNCF-adjacent names: kagent (agent platform), agentgateway (agent gateway), and ops CLIs. MCP shows up in all three stories. kprompt’s mcp serve exposes PlanResult-shaped tools to editors. agentgateway federates and governs MCP servers as network traffic. Same acronym, different product surface.",
      links: [
        { label: "kprompt MCP docs", href: "/docs/mcp" },
        {
          label: "kprompt as MCP tool provider",
          href: "/blog/kprompt-mcp-tool-provider",
        },
        { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
      ],
    },
    {
      type: "h2",
      text: "Side-by-side",
    },
    {
      type: "table",
      headers: ["Dimension", "agentgateway", "kprompt"],
      rows: [
        [
          "Primary artifact",
          "Routed / governed traffic (LLM, MCP, A2A, HTTP)",
          "PlanResult → approve → apply",
        ],
        [
          "Install shape",
          "Gateway API + controller / proxy (or standalone binary)",
          "Laptop CLI (+ optional Helm Observe agent)",
        ],
        [
          "MCP role",
          "MCP gateway — discover, auth, audit tool calls",
          "MCP tool provider for IDEs — never auto-apply",
        ],
        [
          "Mutate contract",
          "N/A (data plane); agents behind it have their own tools",
          "Hard denies + interactive / --approve",
        ],
        [
          "Credentials",
          "Gateway policy, OIDC/mTLS, provider keys at the edge",
          "Local kubeconfig + BYOK env keys",
        ],
        [
          "Best owner",
          "Platform / networking / AI platform team",
          "SRE / platform ops at the keyboard",
        ],
      ],
    },
    {
      type: "h2",
      text: "What agentgateway is good at",
    },
    {
      type: "ul",
      items: [
        "One data plane for microservice APIs and agentic protocols",
        "LLM routing, failover, spend controls across providers",
        "MCP tool federation with signed, scoped, audited calls",
        "A2A bridging with identity and tracing on hops",
        "Gateway API–shaped ops on Kubernetes",
      ],
    },
    {
      type: "p",
      text: "If your platform team’s job is “every agent LLM/MCP hop must pass a governed gateway,” agentgateway is in the right category. That is not the same job as “show me a refuse-able plan before I scale payments.”",
      links: [{ label: "agentgateway.dev", href: "https://agentgateway.dev/" }],
    },
    {
      type: "h2",
      text: "What kprompt is good at",
    },
    {
      type: "ul",
      items: [
        "Natural-language day-2 under plan → safety → approve",
        "investigate / why / timeline / impact with typed evidence",
        "Optional Observe agent: namespace watch → Incident → gated notify",
        "CI JSON PlanResult gates; wipe-class hard denies",
        "IDE MCP as read/plan-only tools — human still approves apply",
      ],
    },
    {
      type: "h2",
      text: "kprompt mcp serve is not an MCP gateway",
    },
    {
      type: "p",
      text: "This is the sharpest confusion point. agentgateway sits in the network path and governs MCP servers. kprompt mcp serve speaks MCP to Cursor / Claude Desktop so the assistant can compile plans — mutations return PlanResult JSON and stop. No shared claim of “we are the MCP control plane.”",
      links: [
        { label: "MCP docs", href: "/docs/mcp" },
        {
          label: "MCP tool provider post",
          href: "/blog/kprompt-mcp-tool-provider",
        },
      ],
    },
    {
      type: "h2",
      text: "Can they coexist?",
    },
    {
      type: "p",
      text: "Yes — and that is the healthy architecture. Platform teams can put LLM/MCP/A2A traffic through agentgateway while operators use kprompt for gated day-2 mutates and Observe for namespace paging. A kagent agent behind agentgateway might still propose a change that a human applies via kprompt’s PlanResult. We do not claim that composition ships as a product; we claim the layers are complementary.",
      links: [
        { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
        { label: "kagent alternatives", href: "/blog/kagent-alternatives" },
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
        "kprompt is not an AI gateway, not Gateway API, not an LLM router, not an MCP federation proxy",
        "agentgateway is not a PlanResult-first laptop CLI; cluster mutate safety lives with the agents and tools behind it",
        "Neither replaces kubectl precision or K9s live navigation",
        "Shared “agent” vocabulary does not erase gateway vs ops-compiler",
      ],
    },
    {
      type: "h2",
      text: "Try kprompt",
    },
    {
      type: "code",
      caption: "Install + gated plan",
      code: `curl -fsSL https://kprompt.ai/install | bash
# or: brew install kprompt/tap/kprompt

kprompt "explain why api is crashing" -n payments
kprompt "scale api to 3" -n staging   # review → y/N`,
    },
    {
      type: "p",
      text: "For agentgateway’s own quickstart, start at agentgateway.dev. For “agentgateway alternative” queries by job, see the alternatives hub. For the agent-platform cousin, see vs kagent.",
      links: [
        { label: "agentgateway get started", href: "https://agentgateway.dev/" },
        {
          label: "agentgateway alternatives",
          href: "/blog/agentgateway-alternatives",
        },
        { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
        {
          label: "AI Runtime for Kubernetes",
          href: "/blog/ai-runtime-for-kubernetes",
        },
        { label: "kprompt quickstart", href: "/docs/quickstart" },
      ],
    },
  ],
};

export default post;
