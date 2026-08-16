import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "kagent-alternatives",
  title:
    "kagent alternatives in 2026: when you want PlanResult ops instead of an agent platform",
  description:
    "Looking for a kagent alternative? Map by job: kprompt for plan-before-apply day-2 + Observe notify, kubectl-ai for NL kubectl REPL, K8sGPT for diagnosis, ARK for agent apps as CRDs — plus when to keep CNCF kagent.",
  publishedAt: "2026-08-16",
  author: MUHTALIP_DEDE,
  tags: [
    "kubernetes",
    "ai",
    "kagent",
    "sre",
    "platform engineering",
    "devops",
    "agent",
  ],
  keywords: [
    "kagent alternatives",
    "kagent alternative",
    "alternative to kagent",
    "alternatives to kagent",
    "kagent vs kprompt",
    "kagent cncf alternative",
    "kubernetes agent platform alternative",
    "kubernetes native agent runtime alternative",
    "solo.io kagent alternative",
    "ai agents on kubernetes alternative",
    "kagent vs observe agent",
    "cncf kagent vs plan before apply",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "Searching for kagent alternatives usually means one of three jobs: you want a gated day-2 ops CLI (plan → approve) instead of Agents-as-CRDs, you need analyzer-first diagnosis rather than a multi-agent platform, or you are comparing “agent runtime” naming cousins (kagent, ARK, Observe). kagent (CNCF Sandbox, Solo.io origins) remains the right hire when your platform product is agents on Kubernetes. Alternatives should be hired by job — not by who also says “runtime.”",
      links: [
        { label: "kagent", href: "https://kagent.dev/" },
        {
          label: "kagent on GitHub",
          href: "https://github.com/kagent-dev/kagent",
        },
        {
          label: "CNCF project page",
          href: "https://www.cncf.io/projects/kagent/",
        },
      ],
    },
    {
      type: "p",
      text: "This is the kagent-centered sibling of our head-to-head with kprompt, the broader Kubernetes AI tools map, and the Runtime vs Gateway vs Platform hub. Start here if your query was literally “kagent alternative.”",
      links: [
        { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
        {
          label: "Runtime vs Gateway vs Platform",
          href: "/blog/ai-runtime-vs-ai-gateway-vs-agent-platform",
        },
        {
          label: "Kubernetes AI tools map",
          href: "/blog/kubernetes-ai-tools-comparison",
        },
        { label: "kprompt vs ARK", href: "/blog/kprompt-vs-ark" },
      ],
    },
    {
      type: "h2",
      text: "What is kagent (quick)",
    },
    {
      type: "p",
      text: "kagent is a Kubernetes-native agent platform: Agents, tools, and sessions as CRDs; MCP tool servers; A2A composition; GitOps rollouts; mesh-friendly governance; BYO frameworks (LangGraph, CrewAI, ADK, …). Platform teams own agent lifecycle the way they own Deployments. It is not a laptop “type English → PlanResult” CLI, and it is not K8sGPT.",
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
          "Keep kagent",
          "You need Agents as CRDs + MCP/A2A + GitOps agent product",
          "You own platform ops for agent workloads, HITL, and tool RBAC",
        ],
        [
          "kprompt",
          "You want PlanResult → safety → approve for day-2 + optional Observe notify",
          "Not a multi-agent CRD platform; experimental CLI",
        ],
        [
          "kubectl-ai",
          "You want a fast NL → kubectl REPL / agentic chat on a laptop",
          "Mutation contract is tool-call oriented — review what executes",
        ],
        [
          "K8sGPT",
          "The bottleneck is finding what is broken (analyzer)",
          "Diagnosis-first; not an agent platform or mutate CLI",
        ],
        [
          "McKinsey ARK",
          "You host multi-agent apps as Kubernetes workloads",
          "Different ecosystem bet than kagent; still not PlanResult-first ops",
        ],
        [
          "kubectl + K9s (no AI)",
          "Exact scripts or live watching without an LLM",
          "You still compose the commands yourself",
        ],
      ],
    },
    {
      type: "h2",
      text: "When to keep kagent",
    },
    {
      type: "p",
      text: "Keep it if your team’s product is “we run agents next to apps”: Agent CRDs in Git, MCP tool catalogs, A2A graphs, mesh mTLS for tool egress, OTel on every prompt. kagent is infrastructure for that. The alternatives conversation starts when you do not want to operate an agent control plane — you want a reviewable plan for scale/rollback/Helm, or a single Observe pipeline that pages Slack without silent mutate.",
    },
    {
      type: "h2",
      text: "kprompt: adjacent job, different contract",
    },
    {
      type: "p",
      text: "kprompt is The AI Runtime for Kubernetes in the ops sense: natural language → typed PlanResult → safety → approve → apply on your laptop kubeconfig (BYOK). Optional Observe agent watches one namespace and gates alerts — not a general Agent CRD API. Choose kprompt when the artifact you must refuse is the plan, not when you need to author dozens of custom agents as cluster resources.",
      links: [
        { label: "kprompt vs kagent (deep dive)", href: "/blog/kprompt-vs-kagent" },
        { label: "Safety", href: "/docs/safety" },
        { label: "Observe agent", href: "/docs/agent" },
        {
          label: "AI Runtime essay",
          href: "/blog/ai-runtime-for-kubernetes",
        },
      ],
    },
    {
      type: "code",
      caption: "Ops contract — not an Agent CRD",
      code: `$ kprompt "scale api to 3" -n staging

Plan
  1. scale Deployment/api replicas → 3

Risk: medium
Apply? [y/N]

# Always-on notify (optional) — still no silent mutate
kprompt agent run -n payments --analyze --health --heuristic`,
    },
    {
      type: "h2",
      text: "Is kprompt a “kagent alternative”?",
    },
    {
      type: "p",
      text: "Yes — when the search intent is “I need AI for Kubernetes day-2 / SRE without standing up an agent platform.” No — when the search intent is “I need CNCF Agents-as-CRDs, MCP marketplace, and A2A.” Collapsing those intents is how buyers get disappointed. Honest positioning: overlapping incident demos, different products. Many teams run both.",
    },
    {
      type: "h2",
      text: "kubectl-ai, K8sGPT, and agentgateway are not kagent clones either",
    },
    {
      type: "p",
      text: "kubectl-ai sits in the laptop NL CLI lane with kprompt (different mutate contract). K8sGPT owns analyzer-first diagnosis. agentgateway is an AI/MCP/A2A data plane (Gateway API) — often in the same Solo.io neighborhood as kagent, but a different layer. Neither replaces kagent’s Agent CRD substrate — and kprompt does not either.",
      links: [
        {
          label: "kubectl-ai alternatives",
          href: "/blog/kubectl-ai-alternatives",
        },
        { label: "kprompt vs kubectl-ai", href: "/blog/kprompt-vs-kubectl-ai" },
        { label: "Kubegpt vs K8sGPT", href: "/blog/kubegpt-vs-k8sgpt" },
        {
          label: "agentgateway alternatives",
          href: "/blog/agentgateway-alternatives",
        },
        {
          label: "kprompt vs agentgateway",
          href: "/blog/kprompt-vs-agentgateway",
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
        "Need Agents as CRDs + MCP/A2A + GitOps agent product? → keep kagent",
        "Need LLM/MCP/A2A gateway policy on Gateway API? → agentgateway",
        "Need plan / risk / approve / CI JSON for day-2 mutates? → kprompt",
        "Need always-on namespace alerts without a multi-agent framework? → kprompt Observe",
        "Need NL → kubectl chat fluency? → kubectl-ai (or kprompt for gated plans)",
        "Need “what is broken?” fleet scans? → K8sGPT",
        "Need to host multi-agent apps as workloads? → ARK or kagent (different bets)",
      ],
    },
    {
      type: "p",
      text: "Deep comparison tables and coexistence notes: kprompt vs kagent. Gateway layer cousin: vs agentgateway. Category without hype: AI Runtime for Kubernetes. Install when you want a gated plan on staging before you touch prod.",
      links: [
        { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
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
        { label: "kagent.dev", href: "https://kagent.dev/" },
      ],
    },
  ],
};

export default post;
