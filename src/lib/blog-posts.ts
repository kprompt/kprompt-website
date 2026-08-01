import type { DocsBlock } from "@/lib/docs-content";
import { EMIRE_BARIS, MUHTALIP_DEDE, type BlogAuthor } from "@/lib/team";

export type { BlogAuthor };
export { EMIRE_BARIS, MUHTALIP_DEDE };

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
    slug: "ai-runtime-for-kubernetes",
    title: "The AI Runtime for Kubernetes — not another AI wrapper",
    description:
      "Why kprompt’s category is an AI Runtime for Kubernetes: observe, reason, plan, approve, execute, learn — not a ChatGPT wrapper, chatbot, or silent auto-healer. Honest shipped vs building.",
    publishedAt: "2026-07-29",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "architecture",
      "platform engineering",
      "devops",
      "agent",
    ],
    keywords: [
      "ai runtime for kubernetes",
      "kubernetes ai runtime",
      "not another ai wrapper",
      "kubernetes reasoning layer",
      "observe plan approve kubernetes",
      "kprompt ai runtime",
      "ai sre runtime",
      "namespace agent kubernetes",
      "plan before apply",
      "kubernetes ai category",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "Kubernetes already has Pods, Deployments, Controllers, Operators, and Schedulers. Those pieces place containers, reconcile desired state, and encode domain logic. What the control plane still lacks is reasoning: continuous understanding of what is happening across events, logs, metrics, and topology — then a safe plan before anything mutates.",
      },
      {
        type: "p",
        text: "That is the category we are building toward: The AI Runtime for Kubernetes. Not a prompt toy. Not an LLM wrapper with kubectl glue. Not another workflow engine. Not a chatbot bolted onto the cluster. A reasoning layer that observes, plans, executes with approval, and learns from previous incidents.",
        links: [
          { label: "Roadmap & vision", href: "/docs/roadmap" },
          { label: "Architecture", href: "/docs/architecture" },
        ],
      },
      {
        type: "h2",
        text: "What we are not",
      },
      {
        type: "ul",
        items: [
          "Not a ChatGPT wrapper — we never compete on chat fluency against generic AI products",
          "Not a free-form Kubernetes chatbot that mutates from scrollback",
          "Not a silent auto-healer that “just fixes production”",
          "Not a fleet scanner that only explains what a report already found",
          "Not a hosted Lens clone or a multi-tenant control plane that uploads your kubeconfig by default",
        ],
      },
      {
        type: "p",
        text: "Those products can be useful. They are a different job. Our job is infrastructure that reasons under the same discipline platform engineers already trust: diffs, risk, and an explicit approve step.",
      },
      {
        type: "h2",
        text: "Category, in one sentence each",
      },
      {
        type: "ul",
        items: [
          "Kubernetes schedules containers.",
          "Argo schedules workflows.",
          "Operators reconcile state.",
          "KPrompt reasons about infrastructure.",
        ],
      },
      {
        type: "p",
        text: "Reasoning here is not vibes. It is evidence → structured plan → policy → human gate → apply → observe again. The laptop path compiles natural language into a reviewable PlanResult. The in-cluster path starts with Observe: watch a namespace, correlate an Incident, notify Slack or a webhook — without silent mutate.",
        links: [
          {
            label: "Intent compiler, not chat",
            href: "/blog/intent-compiler-not-chat",
          },
          {
            label: "Beyond AI kubectl → AI SRE",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
          { label: "Observe agent", href: "/docs/agent" },
        ],
      },
      {
        type: "h2",
        text: "Runtime, not dashboard",
      },
      {
        type: "p",
        text: "Call it a runtime because the loop is the product:",
      },
      {
        type: "code",
        caption: "Trust loop",
        code: `Observe → Reason → Plan → Validate → Approve → Execute → Learn`,
      },
      {
        type: "p",
        text: "You describe intent — you do not author a new workflow language. Sensitive operations still need TTY y/N or --approve. Wipe-class prompts hard-deny. Autopilot stays propose-only until gated policy says otherwise. Safety is a feature. Trust is the product.",
        links: [
          { label: "Safety model", href: "/docs/safety" },
          { label: "PlanResult / CI", href: "/docs/ci" },
        ],
      },
      {
        type: "code",
        caption: "What a mutate looks like today",
        code: `$ kprompt "scale api to 10" -n payments

Intent: scale
Action: patch deployment/api replicas …
Risk: medium — requires approval
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "Distributed agents — honest shipping",
      },
      {
        type: "p",
        text: "A runtime that only lives on a laptop sleeps when your laptop sleeps. The Observe agent is the first in-cluster surface: namespace-scoped Role RBAC, watch → Incident → gated notify. Namespace Agents add continuous intelligence and propose-first remediations. The Coordinator ships as a thin fan-in: cross-namespace handoff, optional read-only kube probe, InvestigationReport merge, Shared Knowledge (durable handoff edges), and blast-radius MVP hops via /v1/blast-radius — mutate still off. Continuous mesh/OTel blast-radius remains building.",
        links: [
          {
            label: "Observe agent kind demo",
            href: "/blog/observe-agent-kind-demo",
          },
          { label: "v0.5 Observe announcement", href: "/blog/kprompt-v0-5-observe-agent" },
        ],
      },
      {
        type: "table",
        headers: ["Surface", "Status"],
        rows: [
          ["Plan → approve → apply CLI", "Shipped"],
          ["investigate / why / timeline packs", "Shipped"],
          ["Observe agent (notify-only)", "Shipped"],
          ["Autopilot propose-only", "Shipped"],
          ["Namespace Agent fleet inventory (`agent list`)", "Shipped"],
          ["Namespace Agent intelligence brief (`agent status` + quota/HPA detectors)", "Shipped"],
          ["Deeper continuous multi-agent reasoning", "Building"],
          ["Incident Memory (facts + patterns + durable incidents)", "Shipped"],
          ["Knowledge Graph MVP (service + Ingress/PVC + Secret/CM name refs + impact)", "Shipped"],
          ["GitHub Integration MVP (CLI --gitops PR + Flux/Argo status)", "Shipped"],
          ["Cost Intelligence MVP (optimize idle/rightsizing + cost notes)", "Shipped"],
          ["Simulation MVP (plan preview + blastRadius + impact + Helm dry-run)", "Shipped"],
          ["Coordinator handoff + kube probe", "Shipped"],
          ["Coordinator Shared Knowledge (durable handoff ring)", "Shipped"],
          ["Coordinator blast-radius MVP (handoff hops /v1/blast-radius)", "Shipped"],
          ["Continuous mesh/OTel Coordinator blast-radius graph", "Building"],
          ["Team GitHub App install metadata (A-061 · /integrations)", "Shipped"],
          ["Team connected repos bind UI (A-062 · A-063)", "Shipped"],
          ["Team pipeline bindings metadata (A-064)", "Shipped"],
          ["Team CI webhook / PlanResult ingest (A-065)", "Shipped"],
          ["Team CI PlanResult viewer /ci (A-066 · subsumes A-033)", "Shipped"],
          ["GitHub Setup URL auto-bind (A-067)", "Shipped"],
          ["GitHub App JWT + installation token (A-068)", "Shipped"],
          ["GitHub Checks annotate write-back (A-069)", "Partial"],
          ["Sandbox / chaos / capacity what-if Simulation", "Building"],
          ["Full topology Knowledge Graph (Secret values / external APIs / UI)", "Building"],
        ],
      },
      {
        type: "p",
        text: "Marketing a category without claiming vaporware is deliberate. Platform engineers smell hype. We would rather say “building” than pretend Autopilot already heals the fleet.",
      },
      {
        type: "h2",
        text: "Why this is how Kubernetes should evolve",
      },
      {
        type: "p",
        text: "Controllers reconcile. That is necessary and not enough. Recovery without understanding repeats the same outage. Execution without a reviewable plan is just faster risk. The next infrastructure layer should reason before it acts — and improve from the last incident — while humans keep the keys for sensitive changes.",
      },
      {
        type: "ul",
        items: [
          "Instead of dozens of YAML files for routine day-2 — describe intent",
          "Instead of manually correlating logs and events — ask one question (or let Observe surface it)",
          "Instead of waiting for the next page — reason continuously under approval",
        ],
      },
      {
        type: "p",
        text: "If you leave this page thinking “another AI wrapper,” we failed. If you leave thinking “a new infrastructure layer with a refuse-able plan,” we are pointed the right way. If you are comparing agent platforms that host workloads on Kubernetes, read the dedicated comparisons — kagent (CNCF) and ARK (McKinsey) share the “agents on K8s” lane; we share some SRE demos, not the PlanResult contract.",
        links: [
          {
            label: "kprompt vs kagent",
            href: "/blog/kprompt-vs-kagent",
          },
          {
            label: "kprompt vs ARK",
            href: "/blog/kprompt-vs-ark",
          },
        ],
      },
      {
        type: "h2",
        text: "Try it",
      },
      {
        type: "code",
        caption: "Install + plan before apply",
        code: `curl -fsSL https://kprompt.ai/install | bash
# or: brew install kprompt/tap/kprompt

kprompt "scale api to 3" -n staging
# review the plan, then y or --approve

# optional: Observe on kind, zero LLM spend
git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples && make walkthrough`,
      },
      {
        type: "p",
        text: "Experimental on purpose. Prefer non-production first. Read every plan. Star the repo if the contract matches how you want Kubernetes AI to behave.",
        links: [
          { label: "Quickstart", href: "/docs/quickstart" },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          {
            label: "Context engineering",
            href: "/blog/context-engineering-not-prompt-engineering",
          },
        ],
      },
    ],
  },
  {
    slug: "kprompt-vs-ark",
    title:
      "kprompt vs ARK: AI Runtime that operates the cluster vs Agentic Runtime that hosts agents",
    description:
      "McKinsey’s ARK is an Agentic Runtime for Kubernetes — CRDs to run agent apps on the cluster. kprompt is an AI Runtime that reasons about the cluster under plan → approve. Same word “runtime,” different jobs. Decision guide.",
    publishedAt: "2026-07-29",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "architecture",
      "platform engineering",
      "devops",
      "agent",
    ],
    keywords: [
      "kprompt vs ark",
      "ark agents at scale",
      "agentic runtime for kubernetes",
      "ai runtime for kubernetes",
      "mckinsey ark kubernetes",
      "kubernetes agent platform vs ai sre",
      "ark vs kprompt",
      "agents on kubernetes vs operate kubernetes",
      "plan before apply vs agent crds",
      "kubernetes ai runtime comparison",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "Both products use the word runtime next to Kubernetes. That is enough to confuse a search result. McKinsey’s open-source ARK calls itself an Agentic Runtime for Kubernetes. kprompt calls itself The AI Runtime for Kubernetes. The shared noun hides two different jobs.",
        links: [
          {
            label: "ARK docs",
            href: "https://mckinsey.github.io/agents-at-scale-ark/",
          },
          {
            label: "ARK on GitHub",
            href: "https://github.com/mckinsey/agents-at-scale-ark",
          },
          {
            label: "kprompt AI Runtime essay",
            href: "/blog/ai-runtime-for-kubernetes",
          },
        ],
      },
      {
        type: "p",
        text: "Short answer: ARK extends Kubernetes so you can declaratively run agentic applications — Agents, Teams, Models, Tools, Memory, Queries as CRDs, similar to how Argo extends Kubernetes for workflows. kprompt is a reasoning layer for operating the cluster: observe signals, compile intent into a reviewable PlanResult, approve, then apply. ARK hosts agents on Kubernetes. kprompt reasons about Kubernetes.",
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
            "Building / hosting multi-agent apps as K8s workloads",
            "ARK",
            "Agent, Team, Model, Tool, Memory CRDs + controller + dashboard",
          ],
          [
            "Day-2 cluster ops with plan before apply",
            "kprompt",
            "NL → PlanResult → safety → y/N; wipe-class hard denies",
          ],
          [
            "MCP / A2A / agent marketplace patterns",
            "ARK",
            "First-class agent platform surface (tools, A2A, teams)",
          ],
          [
            "Investigate why production is broken under approval",
            "kprompt",
            "investigate / why / timeline + optional Observe notify path",
          ],
          [
            "Gate mutates in CI with stable JSON",
            "kprompt",
            "PlanResult on stdout for jq / pipeline gates",
          ],
          [
            "Declarative agent specs portable across clouds",
            "ARK",
            "Agent behavior as Kubernetes resources, not a laptop-only CLI",
          ],
        ],
      },
      {
        type: "h2",
        text: "Same metaphor, different Argo analogy",
      },
      {
        type: "p",
        text: "ARK’s own framing is the clearest differentiator. Docs describe Ark as extending Kubernetes with CRDs and services for agentic workloads — “in a similar way to how Argo extends Kubernetes to run workflows.” That is an application platform story: put agent systems onto the cluster as first-class citizens.",
        links: [
          {
            label: "ARK introduction",
            href: "https://mckinsey.github.io/agents-at-scale-ark/",
          },
        ],
      },
      {
        type: "p",
        text: "kprompt’s analogy is closer to a reasoning control loop for the existing control plane: Kubernetes schedules containers; Operators reconcile state; kprompt reasons about what is happening and proposes gated changes. We are not trying to be the Argo of agents. We are trying to be the approve-gated brain for day-2 cluster work — laptop CLI today, optional in-cluster Observe agent for always-on signals.",
        links: [
          { label: "Architecture", href: "/docs/architecture" },
          { label: "Observe agent", href: "/docs/agent" },
        ],
      },
      {
        type: "h2",
        text: "Side-by-side",
      },
      {
        type: "table",
        headers: ["Dimension", "ARK", "kprompt"],
        rows: [
          [
            "Category claim",
            "Agentic Runtime for Kubernetes",
            "AI Runtime for Kubernetes (cluster ops / AI SRE)",
          ],
          [
            "Primary job",
            "Build & run agent applications on K8s",
            "Observe / reason / plan / approve cluster changes",
          ],
          [
            "Primary artifacts",
            "Agent, Team, Model, Query, Tool, Memory CRDs",
            "PlanResult (+ Incident for Observe)",
          ],
          [
            "Install shape",
            "Helm + controller + API + dashboard into a cluster",
            "Local Go CLI; optional Helm Observe agent",
          ],
          [
            "Mutate contract for the cluster",
            "Whatever tools / agents you wire (app-defined)",
            "Plan → safety → human approve; Autopilot propose-only by default",
          ],
          [
            "Multi-agent",
            "Teams with sequential / graph / selector / round-robin",
            "Namespace Observe + thin Coordinator handoff/probe + durable Shared Knowledge; full blast-radius product graph building",
          ],
          [
            "Memory",
            "Pluggable conversation / agent memory backends",
            "Local history + building incident memory / knowledge graph",
          ],
          [
            "Interop",
            "MCP, A2A, HTTP tools, marketplace",
            "kubectl-shaped ops + Helm / Prom / GitOps under one plan gate",
          ],
          [
            "Who it is for",
            "Teams shipping agentic products on Kubernetes",
            "SREs / platform engineers operating clusters",
          ],
        ],
      },
      {
        type: "h2",
        text: "What ARK is good at",
      },
      {
        type: "ul",
        items: [
          "Declarative agents as Kubernetes resources — prompts, tools, model refs",
          "Provider-agnostic model configs (swap OpenAI / Anthropic / Azure / Ollama without rewriting app code)",
          "Multi-agent team strategies and dashboard-driven authoring",
          "MCP servers, A2A interoperability, and a marketplace-shaped extension story",
          "Running the agent stack where you already run distributed systems — including local kind/minikube and multi-cloud",
        ],
      },
      {
        type: "p",
        text: "If your product is an agentic application and Kubernetes is the host, ARK is solving your problem. That is a real, valuable category — just not the category kprompt is in.",
      },
      {
        type: "h2",
        text: "What kprompt is good at",
      },
      {
        type: "ul",
        items: [
          "Natural language → typed plan with diffs, risk, and hard denies before apply",
          "CI-stable PlanResult JSON so pipelines can refuse a mutate",
          "Day-2 backends (Helm, metrics, GitOps, …) under the same approval loop",
          "Investigation-shaped prompts (explain / investigate / why / timeline) without silent apply",
          "Optional Observe agent: namespace watch → Incident → gated Slack/webhook — notify, not self-heal",
        ],
      },
      {
        type: "code",
        caption: "kprompt’s contract in one session",
        code: `$ kprompt "scale api to 10" -n payments
# shows Intent / Plan / Risk / Blast radius
Apply? [y/N]

$ kprompt agent run -n payments --health --heuristic
# Observe path: correlate + score; Autopilot stays propose-only`,
      },
      {
        type: "h2",
        text: "Naming collision — how to read “runtime”",
      },
      {
        type: "p",
        text: "When you see “runtime for Kubernetes,” ask one question: runtime for what?",
      },
      {
        type: "ul",
        items: [
          "ARK — runtime for agentic workloads (your agents run on the cluster)",
          "kprompt — runtime-shaped loop for cluster intelligence (reasoning about the cluster’s workloads)",
        ],
      },
      {
        type: "p",
        text: "We are not claiming ARK is wrong or that the names must be unique forever. We are claiming the jobs should not be collapsed in a buyer’s head. Hosting agents ≠ operating the cluster under an approve gate.",
        links: [
          {
            label: "AI Runtime positioning",
            href: "/blog/ai-runtime-for-kubernetes",
          },
          {
            label: "Intent compiler, not chat",
            href: "/blog/intent-compiler-not-chat",
          },
        ],
      },
      {
        type: "h2",
        text: "Can they coexist?",
      },
      {
        type: "p",
        text: "Yes. A platform team can run ARK to host internal agent products while operators use kprompt (or kubectl + K9s) to change Deployments safely. An ARK agent could even call out to operational tools — but kprompt’s differentiator remains the PlanResult approval boundary for cluster mutates, not a general agent framework.",
      },
      {
        type: "p",
        text: "We do not ship a Kagent/ARK-class multi-agent application platform. Our optional in-cluster path is Observe-first and propose-first for Autopilot. If you need Agents as CRDs, MCP/A2A, and a mesh-native agent control plane, that is kagent’s lane (or ARK’s).",
        links: [
          { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
          {
            label: "Kubernetes AI tools map",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
      {
        type: "h2",
        text: "Honest limits (both sides)",
      },
      {
        type: "ul",
        items: [
          "kprompt is experimental — read every plan; prefer non-prod; never treat Autopilot as silent heal",
          "kprompt is not a declarative multi-agent app framework",
          "ARK is not a plan-before-apply cluster ops CLI; cluster safety is whatever you build into agent tools and RBAC",
          "Neither replaces kubectl for precise API scripting or K9s for live terminal navigation",
        ],
      },
      {
        type: "h2",
        text: "Try kprompt",
      },
      {
        type: "code",
        caption: "Install + first gated plan",
        code: `curl -fsSL https://kprompt.ai/install | bash
# or: brew install kprompt/tap/kprompt

kprompt "list deployments" -n staging
kprompt "scale api to 3" -n staging   # review → y/N`,
      },
      {
        type: "p",
        text: "For ARK’s own quickstart (cluster + ark install + dashboard), start at their docs. For how we think about category without hype, read the AI Runtime essay next.",
        links: [
          {
            label: "ARK quickstart",
            href: "https://mckinsey.github.io/agents-at-scale-ark/",
          },
          {
            label: "AI Runtime for Kubernetes",
            href: "/blog/ai-runtime-for-kubernetes",
          },
          { label: "kprompt quickstart", href: "/docs/quickstart" },
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
          {
            label: "kprompt vs kagent",
            href: "/blog/kprompt-vs-kagent",
          },
        ],
      },
    ],
  },
  {
    slug: "kprompt-vs-kagent",
    title:
      "kprompt vs kagent: PlanResult ops CLI vs Kubernetes-native agent platform",
    description:
      "kagent (CNCF Sandbox) is a Kubernetes-native agent runtime — Agents as CRDs, MCP, A2A, mesh. kprompt is an AI Runtime for cluster ops: PlanResult → approve, plus Observe notify. Overlapping SRE demos, different products. Decision guide.",
    publishedAt: "2026-07-29",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "architecture",
      "platform engineering",
      "devops",
      "agent",
    ],
    keywords: [
      "kprompt vs kagent",
      "kagent vs kprompt",
      "kagent kubernetes",
      "kagent cncf",
      "kubernetes native agent runtime",
      "kagent solo.io",
      "plan before apply vs agent crds",
      "ai sre vs agent platform",
      "observe agent vs kagent",
      "kubernetes ai agent comparison",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "kagent markets itself as a Kubernetes-native agent runtime: bring AI agents to every cluster, deploy them as CRDs, wire MCP tools, govern traffic with the mesh, observe every prompt with OpenTelemetry. kprompt markets itself as The AI Runtime for Kubernetes: observe the cluster, reason, emit a reviewable PlanResult, approve, then apply. Both say “runtime.” Both talk about incidents and platform engineering. They are still different products.",
        links: [
          { label: "kagent", href: "https://kagent.dev/" },
          {
            label: "kagent on GitHub",
            href: "https://github.com/kagent-dev/kagent",
          },
          {
            label: "AI Runtime essay",
            href: "/blog/ai-runtime-for-kubernetes",
          },
        ],
      },
      {
        type: "p",
        text: "Short answer: choose kagent when you need an in-cluster agent platform — Agents, tools, sessions, A2A, GitOps rollouts, BYO LangGraph/CrewAI/ADK. Choose kprompt when you need a plan-before-apply ops contract on a laptop CLI (and an optional Observe agent that notifies without silent mutate). kagent hosts and governs agents on Kubernetes. kprompt compiles cluster intent into a refuse-able plan.",
        links: [
          {
            label: "broader AI tools map",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          { label: "kprompt vs ARK", href: "/blog/kprompt-vs-ark" },
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
            "Agents as CRDs + GitOps + mesh policy",
            "kagent",
            "CNCF Sandbox agent platform; kubectl apply -f agent.yaml",
          ],
          [
            "Reviewable PlanResult before every mutate",
            "kprompt",
            "Plan → safety → y/N; wipe-class hard denies; CI JSON",
          ],
          [
            "MCP tool servers / A2A multi-agent composition",
            "kagent",
            "First-class MCP + A2A + BYO frameworks",
          ],
          [
            "Laptop NL CLI for day-2 (Helm, explain, scale)",
            "kprompt",
            "One binary, BYOK, kubeconfig-local; no required control plane",
          ],
          [
            "Always-on namespace alerts → Slack (notify-only)",
            "kprompt Observe",
            "Watch → Incident → gated webhook; Autopilot propose-only",
          ],
          [
            "Build custom SRE agents with Istio mTLS + OTel spans per tool call",
            "kagent",
            "Agent substrate + mesh + full prompt/tool observability",
          ],
        ],
      },
      {
        type: "h2",
        text: "Why the overlap feels real",
      },
      {
        type: "p",
        text: "Unlike a pure “host any chatbot on K8s” pitch, kagent’s public use cases lean into platform ops: incident response agents, observability copilots, self-service that opens GitOps PRs, multi-agent triage → investigate → remediate. It also ships MCP servers for kubectl, Prometheus, Argo, Istio, and friends. That is exactly the demo vocabulary AI SRE products use.",
      },
      {
        type: "p",
        text: "So a buyer can honestly ask: “Isn’t that what kprompt does?” Only if you collapse “agent that can call kubectl tools” with “product whose primary artifact is a gated PlanResult.” They share a problem space. They do not share a product contract.",
      },
      {
        type: "h2",
        text: "Side-by-side",
      },
      {
        type: "table",
        headers: ["Dimension", "kagent", "kprompt"],
        rows: [
          [
            "Category claim",
            "Kubernetes-native agent runtime / framework",
            "AI Runtime for Kubernetes (cluster ops / AI SRE)",
          ],
          [
            "Maturity signal",
            "CNCF Sandbox; Solo.io heritage",
            "Experimental Apache-2.0 CLI + optional Observe",
          ],
          [
            "Primary artifacts",
            "Agent / Session / ToolServer CRDs + traces",
            "PlanResult (+ Incident / AgentAlert for Observe)",
          ],
          [
            "Default surface",
            "In-cluster control plane + UI/CLI",
            "Laptop Go binary; Observe via Helm when you opt in",
          ],
          [
            "How agents run",
            "Controller provisions runtimes (ADK / substrate)",
            "No general agent CRD platform — Observe is a fixed pipeline",
          ],
          [
            "Mutate contract",
            "Tool calls + HITL gates you configure on agents",
            "Always plan → safety → human approve for CLI mutates",
          ],
          [
            "CI gate",
            "Bring your own around agent outputs / PRs",
            "Stable PlanResult JSON on stdout",
          ],
          [
            "Interop",
            "MCP, A2A, LangGraph, CrewAI, Google ADK, mesh",
            "kubectl-shaped ops + Helm / Prom / GitOps under one plan loop",
          ],
          [
            "Who owns blast radius",
            "Platform team (SA, mesh egress, agent RBAC)",
            "Operator at the keyboard (+ Role-scoped Observe SA)",
          ],
        ],
      },
      {
        type: "h2",
        text: "What kagent is good at",
      },
      {
        type: "ul",
        items: [
          "Treating agents like any other Kubernetes workload — GitOps, RBAC, admission, rollouts",
          "Standards stack: MCP tools, A2A delegation, OpenTelemetry on every prompt/tool/token",
          "BYO frameworks and multi-LLM providers without rewriting the control plane",
          "Mesh-native security story (Istio / Ambient) for agent egress and identity",
          "Building bespoke ops agents (k8s-agent, istio-agent, observability) as composable CRDs",
        ],
      },
      {
        type: "p",
        text: "If your platform team’s job is “agents are a product we run next to apps,” kagent is in the right category. Human-in-the-loop is a platform feature of those agents — not the same thing as kprompt’s PlanResult-first CLI contract.",
        links: [{ label: "kagent.dev", href: "https://kagent.dev/" }],
      },
      {
        type: "h2",
        text: "What kprompt is good at",
      },
      {
        type: "ul",
        items: [
          "Natural language → typed plan with diffs, risk, and hard denies before apply",
          "CI-stable PlanResult so pipelines can refuse a mutate without scraping chat",
          "Day-2 backends under one approval loop (Helm, metrics, GitOps, …)",
          "Investigation-shaped prompts without requiring an agent control plane",
          "Optional Observe: namespace watch → correlate → gated Slack/webhook — never silent Autopilot apply by default",
        ],
      },
      {
        type: "code",
        caption: "kprompt’s default mutate path",
        code: `$ kprompt "rollback payment-api" -n payments

Intent: rollback
Plan: rollout undo Deployment/payment-api
Risk: medium
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "Observe agent vs “install an SRE agent CRD”",
      },
      {
        type: "p",
        text: "This is the sharpest confusion point. kagent can run a declarative agent with Kubernetes MCP tools that watches and acts (within HITL). kprompt’s Observe agent is a narrower, kprompt-native pipeline: Events/Pods → Incident → optional LLM → Slack/webhook. It reuses investigation DNA. It does not expose a general Agent CRD API, Teams graph, or A2A marketplace.",
        links: [
          { label: "Observe agent docs", href: "/docs/agent" },
          {
            label: "Observe kind demo",
            href: "/blog/observe-agent-kind-demo",
          },
        ],
      },
      {
        type: "p",
        text: "Choose kagent when you want to author many agents and tools as cluster resources. Choose kprompt Observe when you want threaded, gated alerts with Incident artifacts — and keep the laptop CLI for plan → approve → apply.",
      },
      {
        type: "h2",
        text: "kagent vs ARK vs kprompt (one glance)",
      },
      {
        type: "table",
        headers: ["Product", "Job in one line"],
        rows: [
          [
            "kagent",
            "Cloud-native agent platform on Kubernetes (CNCF; MCP/A2A/mesh)",
          ],
          [
            "ARK",
            "Declarative agentic app host on Kubernetes (McKinsey agents-at-scale)",
          ],
          [
            "kprompt",
            "Plan-gated cluster ops + optional Observe notify (AI Runtime for ops)",
          ],
        ],
      },
      {
        type: "p",
        text: "kagent and ARK share the “agents as workloads” lane with different ecosystem bets. kprompt shares some SRE demos with kagent but not the platform. For the ARK-specific naming collision (“Agentic Runtime”), see the ARK comparison.",
        links: [{ label: "kprompt vs ARK", href: "/blog/kprompt-vs-ark" }],
      },
      {
        type: "h2",
        text: "Can they coexist?",
      },
      {
        type: "p",
        text: "Yes. A platform team can run kagent to host internal agents (docs RAG, ticket triage, mesh-aware helpers) while operators use kprompt for gated day-2 mutates and Observe for namespace paging. An ambitious setup could even have a kagent agent propose changes that a human still applies via kprompt’s PlanResult — but that composition is yours to build; we do not claim it ships today.",
      },
      {
        type: "h2",
        text: "Honest limits",
      },
      {
        type: "ul",
        items: [
          "kprompt is experimental — read every plan; prefer non-prod first",
          "kprompt is not a CNCF agent framework, not A2A/MCP control plane, not Istio-native agent mesh",
          "kagent is not a PlanResult-first laptop CLI; cluster safety depends on how you configure agent tools, HITL, and RBAC",
          "Neither replaces kubectl precision or K9s live navigation",
          "Marketing overlap on “incident agent” does not erase the artifact difference",
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
        text: "For kagent’s own quickstart (kind + Helm + Agent CRD), start at kagent.dev. For category without hype, read the AI Runtime essay. For the other “runtime” naming cousin, read vs ARK.",
        links: [
          { label: "kagent get started", href: "https://kagent.dev/" },
          {
            label: "AI Runtime for Kubernetes",
            href: "/blog/ai-runtime-for-kubernetes",
          },
          { label: "kprompt vs ARK", href: "/blog/kprompt-vs-ark" },
          { label: "kprompt vs kubectl-ai", href: "/blog/kprompt-vs-kubectl-ai" },
          { label: "kprompt quickstart", href: "/docs/quickstart" },
        ],
      },
    ],
  },
  {
    slug: "context-engineering-not-prompt-engineering",
    title:
      "Prompt engineering is dead. Context engineering begins",
    description:
      "For Kubernetes AI, clever prompts lose to curated context: live cluster facts, tool detection, local history, and a typed PlanResult. Why the next leap is what you feed the model — not how you word the sentence.",
    publishedAt: "2026-07-28",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "architecture",
      "platform engineering",
      "devops",
    ],
    keywords: [
      "context engineering",
      "prompt engineering is dead",
      "context engineering vs prompt engineering",
      "llm context kubernetes",
      "ai kubernetes context",
      "planresult context",
      "kubernetes llm context window",
      "tools detect llm",
      "prompt history kubernetes",
      "ai sre context engineering",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "For a few years, “prompt engineering” meant the craft of wording: system instructions, few-shot examples, magic phrases that coaxed better answers. That craft still matters at the margins. It is no longer the main lever for production AI on Kubernetes.",
      },
      {
        type: "p",
        text: "When the model is supposed to help operate a cluster, the bottleneck is almost never the English. It is whether the model sees the right facts — namespace, Deployment status, recent events, whether Helm and Prometheus exist, what you asked last Tuesday — before it proposes a change. That discipline is context engineering: designing what enters the model, what stays out, and what becomes a reviewable artifact after.",
        links: [
          {
            label: "intent compiler",
            href: "/blog/intent-compiler-not-chat",
          },
          {
            label: "PlanResult deep dive",
            href: "/blog/planresult-json-deep-dive",
          },
        ],
      },
      {
        type: "h2",
        text: "Prompt engineering optimized sentences. Ops needs state.",
      },
      {
        type: "p",
        text: "A beautiful prompt that says “you are a careful SRE” does not know that payment-api is CrashLooping in staging, that the last rollout was three hours ago, or that Prometheus is installed but the ServiceMonitor is missing. Without that state, the model invents a plausible story — or asks you to paste kubectl output by hand.",
      },
      {
        type: "table",
        headers: ["Prompt engineering instinct", "Context engineering instinct"],
        rows: [
          [
            "Better wording → better answer",
            "Better evidence → better plan",
          ],
          [
            "System prompt is the product",
            "Retrieved / gathered facts are the product",
          ],
          [
            "Optimize for chat quality",
            "Optimize for a refuse-able change",
          ],
          [
            "Hide tool mess from the user",
            "Surface tools, risk, and diffs before apply",
          ],
        ],
      },
      {
        type: "p",
        text: "Operators already practice a crude form of context engineering: they open three terminals, scrape events, copy logs into a ticket, and only then ask a colleague “what do you think?” An AI CLI that skips that step and jumps straight to mutate is not clever — it is ungrounded.",
      },
      {
        type: "h2",
        text: "What “context” means for a Kubernetes CLI",
      },
      {
        type: "p",
        text: "In kprompt, context is not a vague vibe. It is a stack of concrete inputs the planner and LLM can use — always under the same plan → safety → approve contract:",
      },
      {
        type: "ul",
        items: [
          "Live cluster reads — status, events, logs, selectors — gathered for the intent, not pasted from memory",
          "Tool detection — which day-2 backends exist (Helm, Prometheus, GitOps, mesh, …) so plans do not invent CLIs you do not have",
          "Local history — ~/.kprompt/history.jsonl for replay and “what did I ask?” without shipping secrets to a SaaS memory store",
          "Explicit scopes — namespace, context alias, multi-context fan-out rules so the model does not silently widen blast radius",
          "Typed PlanResult — the output context humans and CI actually gate on",
        ],
      },
      {
        type: "p",
        text: "doctor and integrations detection are part of that stack: they tell you (and the tool) what is available before a fancy prompt pretends every CNCF project is installed. Multi-context makes the same point at cluster scope — read fan-out is allowed; one --approve must not mutate everywhere.",
        links: [
          { label: "doctor / install", href: "/docs/install" },
          { label: "Integrations", href: "/docs/integrations" },
          {
            label: "Multi-context (series ep.5)",
            href: "/blog/building-ai-sre-05-multi-context",
          },
        ],
      },
      {
        type: "code",
        caption: "Same sentence, different context → different honesty",
        code: `# No cluster facts: the model guesses.
kprompt "why is api slow?"

# Scoped + tools present: plan can cite real reads / Prom paths.
kprompt "why is my api slow?" -n production
kprompt doctor   # which keys, which integrations, which context`,
      },
      {
        type: "h2",
        text: "Four layers of context (and what not to dump)",
      },
      {
        type: "p",
        text: "Context engineering fails in two opposite ways: starving the model, or stuffing the entire cluster into the window. A useful mental model:",
      },
      {
        type: "table",
        headers: ["Layer", "Examples", "Rule"],
        rows: [
          [
            "Session",
            "Current prompt, -n / --context, flags",
            "Always explicit; never imply production from habit",
          ],
          [
            "Live evidence",
            "get/describe/logs/events for the named objects",
            "Fetch for the intent; truncate; no secret values",
          ],
          [
            "Environment profile",
            "tools detect, doctor, kubeconfig context name",
            "Shape which backends the planner may propose",
          ],
          [
            "Memory",
            "Local history, future ADRs / cluster profile",
            "Local-first; opt-in; never silent mutate from memory",
          ],
        ],
      },
      {
        type: "p",
        text: "What stays out of the prompt by design: kubeconfig files, API keys (beyond the BYOK call to your provider), full manifests in history, and “remember this forever in our cloud.” If memory ships, it should be local or org-governed — not a free-form chat log that becomes the control plane.",
        links: [
          {
            label: "BYOK providers",
            href: "/blog/kubernetes-llm-providers-byok",
          },
          { label: "Safety docs", href: "/docs/safety" },
        ],
      },
      {
        type: "h2",
        text: "The artifact is context too",
      },
      {
        type: "p",
        text: "People treat “context” as only model input. For ops, the output is equally part of the contract. A PlanResult — intent, ordered actions, risk, denied, applied — is context for the next human, the next CI job, and the next history rerun. Chat narration that evaporates after the session is not.",
      },
      {
        type: "code",
        caption: "Output context CI can gate",
        code: `kprompt "scale api to 3" -n staging -o json | \\
  jq '{intent:.plan.intent, risk:.risk, denied:.risk.denied}'

kprompt history
kprompt history rerun 2   # replay with the same gate`,
      },
      {
        type: "p",
        text: "That is why an intent compiler and context engineering are the same bet: you engineer what the model sees so the plan is grounded, and you engineer what the tool emits so a human can refuse it. Prompt magic without either side is theater.",
        links: [
          {
            label: "CI plan gates",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
          { label: "CI docs", href: "/docs/ci" },
        ],
      },
      {
        type: "h2",
        text: "Observe agents raise the stakes",
      },
      {
        type: "p",
        text: "Always-on agents make context engineering mandatory. An Observe loop that correlates CrashLoops and fires Slack must ground alerts in live evidence — not in a system prompt that says “be accurate.” Autopilot that proposes remediations still has to attach a gated plan; silent apply from a fat context window is still silent apply.",
        links: [
          {
            label: "Observe agent release notes",
            href: "/blog/kprompt-v0-5-observe-agent",
          },
          { label: "Agent docs", href: "/docs/agent" },
          {
            label: "Building AI SRE in Public",
            href: "/blog/building-ai-sre-in-public",
          },
        ],
      },
      {
        type: "p",
        text: "The series path — Intent Compiler → PlanResult → Safety → Multi-context — is really a context architecture: compile intent, attach evidence, score risk, respect cluster boundaries. Investigation graphs and timelines are the next context layers (building / exploring), not a reason to skip the gate.",
      },
      {
        type: "h2",
        text: "What still is prompt craft",
      },
      {
        type: "p",
        text: "Context engineering does not delete good prompts. Operators still benefit from clear intents: name the object, name the namespace, say the goal (“explain why,” “scale to 3,” “install redis”). Ambiguous wipe jokes and unscoped deletes are bad prompts and bad context — safety hard-denies help, but precise asks make better plans.",
        links: [
          {
            label: "Error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          {
            label: "Edge-case prompts",
            href: "/blog/kubernetes-edge-case-prompts",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Do: “explain why payment-api is CrashLooping in staging”",
          "Don’t: “fix prod” and hope the model hesitates",
          "Do: rerun from history when the plan shape is known",
          "Don’t: treat --approve as a substitute for reading the plan",
        ],
      },
      {
        type: "h2",
        text: "Try the context loop, not a magic phrase",
      },
      {
        type: "code",
        caption: "Install → doctor → grounded explain",
        code: `brew install kprompt/tap/kprompt
# or: curl -fsSL https://kprompt.ai/install | bash

export KPROMPT_GEMINI_API_KEY="..."
kprompt doctor
kprompt "list deployments" -n default
kprompt "explain why api is crashing" -n staging`,
      },
      {
        type: "p",
        text: "Score the tool on whether the plan cites real cluster state and whether you can refuse it — not on whether a clever system prompt made the chat feel smart. Prompt engineering is not evil; for Kubernetes AI it is no longer the product. Context is.",
        links: [
          { label: "Quickstart", href: "/docs/quickstart" },
          {
            label: "AI SRE positioning",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  },
  {
    slug: "what-is-kubernetes-ai",
    title:
      "What is Kubernetes AI? Tools, jobs, and what “AI for K8s” actually means",
    description:
      "A plain-language map of Kubernetes AI: analyzers like K8sGPT, intent CLIs like kubectl-ai and kprompt, in-cluster agents, and what belongs in CI vs on your laptop — for searches like kubernetes ai, k8s ai, and k8s ai tools.",
    publishedAt: "2026-07-26",
    author: MUHTALIP_DEDE,
    tags: ["kubernetes", "ai", "devops", "sre", "kubernetes cli"],
    keywords: [
      "what is kubernetes ai",
      "kubernetes ai",
      "k8s ai",
      "k8s ai tools",
      "ai for kubernetes",
      "ai kubernetes tools",
      "kubernetes artificial intelligence",
      "aiops kubernetes",
      "kubectl ai",
      "k8sgpt",
    ],
    blocks: [
      {
        type: "p",
        text: "“Kubernetes AI” is not one product. It is a messy label for anything that uses a model near a cluster: scanning for misconfigs, chatting about Pods, drafting manifests, watching namespaces, or compiling natural language into kubectl-shaped plans. If you searched for kubernetes ai, k8s ai, or k8s ai tools, this page is the map — jobs first, logos second.",
      },
      {
        type: "p",
        text: "The useful question is not “which AI is best?” It is “which job am I buying?” An analyzer, an intent CLI, an in-cluster agent, and a hosted console solve different problems. Mixing them up is how teams buy a chatbot when they needed a scan — or enable silent apply when they needed a plan gate.",
      },
      {
        type: "h2",
        text: "The short definition",
      },
      {
        type: "p",
        text: "Kubernetes AI means software that uses an LLM (or similar model) to help humans operate, diagnose, or change Kubernetes workloads — while still living inside real cluster constraints: RBAC, admission, GitOps, and the fact that apply is irreversible.",
      },
      {
        type: "ul",
        items: [
          "It is not a replacement for kubectl literacy or RBAC design",
          "It is not automatically safe because the UI says “AI”",
          "It is useful when it shortens evidence gathering or intent → change under a human gate",
        ],
      },
      {
        type: "h2",
        text: "Four jobs people mean by “Kubernetes AI”",
      },
      {
        type: "table",
        headers: ["Job", "What you want", "Typical tools"],
        rows: [
          [
            "Find what’s wrong",
            "Fleet or namespace scan → ranked findings",
            "K8sGPT (and similar analyzers)",
          ],
          [
            "Say what you want",
            "Natural language → concrete cluster actions",
            "kubectl-ai, kprompt, other intent CLIs",
          ],
          [
            "Watch continuously",
            "Always-on signals → correlated incidents / alerts",
            "Observe-style agents, AIOps add-ons",
          ],
          [
            "Draft manifests / runbooks",
            "Editor or chat help; apply still yours",
            "IDE copilots, chat UIs",
          ],
        ],
      },
      {
        type: "p",
        text: "Strong teams often use more than one job. An analyzer for “what’s broken in staging,” an intent CLI for “scale api to three,” GitOps for steady state, and a terminal UI like K9s for live watching. AI does not collapse those into a single app.",
        links: [
          {
            label: "Kubernetes AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          { label: "kubectl vs K9s", href: "/blog/kubectl-vs-k9s" },
        ],
      },
      {
        type: "h2",
        text: "Analyzers vs intent CLIs",
      },
      {
        type: "p",
        text: "K8sGPT-class tools walk resources and emit findings (CrashLoopBackOff, bad Services, and similar). Intent CLIs start from a sentence you already know the outcome of — explain why payment-api is crashing, scale api to 10 — and must decide how mutations reach the apiserver.",
      },
      {
        type: "ul",
        items: [
          "Analyzer first when you do not know which object is sick",
          "Intent CLI first when you already named the workload and the outcome",
          "Inside the intent-CLI lane, compare mutate contracts: free-form shell vs plan → approve",
        ],
      },
      {
        type: "p",
        text: "kprompt sits in the intent-CLI lane with a stricter default: natural language compiles into a reviewable PlanResult, safety checks run, and nothing applies until you confirm. Same peer class as kubectl-ai; different gate.",
        links: [
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
          { label: "safety model", href: "/docs/safety" },
        ],
      },
      {
        type: "h2",
        text: "What “AI SRE” is (and is not)",
      },
      {
        type: "p",
        text: "Marketing will say AI SRE for anything with a chatbot. Operationally it should mean investigate / why / timeline style workflows that still respect approval — not an unsupervised healer that patches production at 03:00. Autopilot that proposes is different from Autopilot that applies.",
        links: [
          {
            label: "AI SRE direction",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
          { label: "Observe agent", href: "/docs/agent" },
        ],
      },
      {
        type: "h2",
        text: "Where credentials should live",
      },
      {
        type: "p",
        text: "A serious Kubernetes AI path keeps kubeconfig on your side of the trust boundary and uses bring-your-own LLM keys (or a local model). Uploading cluster credentials to a hosted “AI ops” console is a different product category — evaluate residency and blast radius explicitly.",
        links: [
          { label: "Providers / BYOK", href: "/docs/providers" },
          {
            label: "LLM providers guide",
            href: "/blog/kubernetes-llm-providers-byok",
          },
        ],
      },
      {
        type: "h2",
        text: "A realistic starter stack",
      },
      {
        type: "ul",
        items: [
          "kubectl for scripts, CI, and copy-pasteable truth",
          "K9s or a dashboard for live navigation",
          "One analyzer (e.g. K8sGPT) when you need a scan",
          "One intent CLI with a mutate contract you accept",
          "GitOps (Argo CD / Flux) for desired state",
          "Optional Observe agent for gated always-on alerts — not a chat loop on prod",
        ],
      },
      {
        type: "h2",
        text: "Try the contract, not the buzzword",
      },
      {
        type: "code",
        caption: "Read first, mutate only after a plan",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "list deployments" -n staging
kprompt "explain why api is not ready" -n staging
kprompt "scale api to 2" -n staging   # review plan → y or n`,
      },
      {
        type: "p",
        text: "For day-2 failure ladders that AI explains should still follow, see CrashLoopBackOff, ImagePullBackOff, and OOMKilled. For the peer map of tools, see the full comparison.",
        links: [
          {
            label: "CrashLoopBackOff",
            href: "/blog/kubernetes-crashloopbackoff",
          },
          {
            label: "ImagePullBackOff",
            href: "/blog/kubernetes-imagepullbackoff",
          },
          { label: "OOMKilled", href: "/blog/kubernetes-oomkilled" },
          {
            label: "full comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          { label: "Quickstart", href: "/docs/quickstart" },
        ],
      },
    ],
  },
  {
    slug: "kubernetes-imagepullbackoff",
    title:
      "Kubernetes ImagePullBackOff: how to read ErrImagePull and fix the image reference",
    description:
      "ImagePullBackOff means the container never started. How ErrImagePull differs from CrashLoopBackOff, what Events tell you, common causes (bad tag, private registry, rate limit), and how to fix it without guessing.",
    publishedAt: "2026-07-26",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "troubleshooting",
      "devops",
      "sre",
      "kubectl",
    ],
    keywords: [
      "kubernetes imagepullbackoff",
      "errimagepull",
      "imagepullbackoff fix",
      "pod imagepullbackoff",
      "kubernetes failed to pull image",
      "imagepullsecrets",
      "errimagepull private registry",
      "docker hub rate limit kubernetes",
      "back-off pulling image",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "ImagePullBackOff is the failure that looks like a crash loop until you read one field carefully: the container never started. There are no application logs. There is no exit code from your process. The kubelet tried to pull an image, failed, and is now waiting longer between attempts.",
      },
      {
        type: "p",
        text: "This guide is the operator ladder for pull failures: how ErrImagePull and ImagePullBackOff differ, what Events actually say, the five causes that cover most incidents, and how to fix the image reference — by hand or with a reviewable plan.",
        links: [
          {
            label: "Images",
            href: "https://kubernetes.io/docs/concepts/containers/images/",
          },
        ],
      },
      {
        type: "h2",
        text: "ErrImagePull vs ImagePullBackOff",
      },
      {
        type: "table",
        headers: ["Reason", "What it means", "What you do"],
        rows: [
          [
            "ErrImagePull",
            "The latest pull attempt failed",
            "Read the Event message — tag, auth, or network",
          ],
          [
            "ImagePullBackOff",
            "Pulls keep failing; kubelet is backing off",
            "Same root cause — do not wait for it to “heal”",
          ],
          [
            "CrashLoopBackOff",
            "Container started, then exited",
            "Different ladder — logs and exit codes matter",
          ],
        ],
      },
      {
        type: "p",
        text: "If you run kubectl logs and see nothing useful, that is expected here. The container was never created. Look at Events and the Waiting reason instead of --previous.",
        links: [
          {
            label: "CrashLoopBackOff",
            href: "/blog/kubernetes-crashloopbackoff",
          },
        ],
      },
      {
        type: "h2",
        text: "Confirm it in 30 seconds",
      },
      {
        type: "code",
        caption: "Status, then Events",
        code: `kubectl get pods -n payments
# NAME                      READY   STATUS             RESTARTS
# worker-7d9f4c8b9-xk2m1    0/1     ImagePullBackOff   0

kubectl describe pod -l app=worker -n payments
# Events:
#   Failed   Failed to pull image "ghcr.io/...:9.9.9": ...
#   Failed   Error: ErrImagePull
#   BackOff  Back-off pulling image "ghcr.io/...:9.9.9"`,
      },
      {
        type: "ul",
        items: [
          "READY 0/1 and RESTARTS 0 — the process never ran",
          "Waiting reason ImagePullBackOff or ErrImagePull on the container",
          "Event message names the image reference and often the registry error",
          "kubectl logs will be empty or “container not found” — that is a clue, not a dead end",
        ],
      },
      {
        type: "h2",
        text: "The five causes that cover most pull failures",
      },
      {
        type: "h3",
        text: "1. Wrong image name or tag",
      },
      {
        type: "p",
        text: "Typo in the repository, a tag that was never pushed, or :latest pointing somewhere unexpected. The Event usually says “not found” or “manifest unknown.” Fix the Deployment image field — do not delete the Pod and hope.",
      },
      {
        type: "h3",
        text: "2. Private registry without credentials",
      },
      {
        type: "p",
        text: "The image exists, but the node cannot authenticate. You need an imagePullSecret on the Pod (or a service account that references one), and the Secret must match the registry host. ErrImagePull messages often mention unauthorized or denied.",
      },
      {
        type: "code",
        caption: "Check pull secrets on the Pod",
        code: `kubectl get pod -l app=worker -n payments \\
  -o jsonpath='{.items[0].spec.imagePullSecrets[*].name}{"\\n"}'

kubectl get deploy worker -n payments \\
  -o jsonpath='{.spec.template.spec.containers[*].image}{"\\n"}'`,
      },
      {
        type: "h3",
        text: "3. Registry rate limit",
      },
      {
        type: "p",
        text: "Anonymous Docker Hub pulls still surprise teams on busy CI days. Events mention rate limit or toomanyrequests. Authenticated pulls or a mirror/cache fix the symptom; pinning digests and using your own registry fixes the habit.",
      },
      {
        type: "h3",
        text: "4. Network / DNS / firewall to the registry",
      },
      {
        type: "p",
        text: "The cluster cannot reach the registry host — corporate proxy, missing egress, broken CoreDNS, or a wrong mirror. Nodes that pull fine from one registry and fail on another are a network story, not an image story.",
      },
      {
        type: "h3",
        text: "5. Architecture mismatch",
      },
      {
        type: "p",
        text: "An arm64-only image on an amd64 node (or the reverse) fails at pull or create time depending on the runtime. Multi-arch manifests or matching node pools fix it. The Event may mention no matching manifest for the platform.",
      },
      {
        type: "h2",
        text: "Reproduce it on purpose",
      },
      {
        type: "p",
        text: "kprompt-examples ships an ImagePullBackOff fixture: the worker Deployment points at a tag that does not exist. The container never runs — a good analysis must not invent log lines.",
        links: [
          {
            label: "kprompt-examples",
            href: "https://github.com/kprompt/kprompt-examples",
          },
        ],
      },
      {
        type: "code",
        caption: "kind cluster, missing image tag",
        code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make up && make break SCENARIO=02-image-pull && make verify

kubectl describe pod -l app=worker -n payments
make fix SCENARIO=02-image-pull`,
      },
      {
        type: "h2",
        text: "Natural-language explain",
      },
      {
        type: "p",
        text: "kprompt's explain path walks Deployments → Pods → Events. For ImagePullBackOff it should name the bad image reference and stop short of claiming it read application logs — because there are none.",
        links: [{ label: "commands", href: "/docs/commands" }],
      },
      {
        type: "code",
        caption: "Explain is read-only",
        code: `kprompt "explain why worker is not ready" -n payments
kprompt "why is worker ImagePullBackOff" -n payments
kprompt "describe worker" -n payments`,
      },
      {
        type: "p",
        text: "Fixing the image is a mutation: patch the Deployment image or imagePullSecrets, show a plan, then approve. That boundary matters — models guess tags; you still verify the registry.",
        links: [{ label: "safety model", href: "/docs/safety" }],
      },
      {
        type: "code",
        caption: "A corrected image you review first",
        code: `$ kprompt "set worker image to ghcr.io/example/worker:1.2.3" -n payments

Plan
  1. patch Deployment/worker container image → ghcr.io/example/worker:1.2.3

Risk: medium
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "What not to do",
      },
      {
        type: "ul",
        items: [
          "Do not delete the Pod on a loop — the Deployment recreates the same bad image",
          "Do not treat empty logs as “the app is silent” — the app never started",
          "Do not raise memory or CPU for a pull failure",
          "Do not confuse this with CrashLoopBackOff — different evidence, different fix",
          "Do not approve an AI-suggested image tag you have not verified in the registry",
        ],
      },
      {
        type: "h2",
        text: "Related reading",
      },
      {
        type: "p",
        text: "For containers that start and then die, see the CrashLoopBackOff guide. For memory kills, see OOMKilled. For a prompt catalogue across failure modes, see the error prompt playbook.",
        links: [
          {
            label: "CrashLoopBackOff guide",
            href: "/blog/kubernetes-crashloopbackoff",
          },
          { label: "OOMKilled", href: "/blog/kubernetes-oomkilled" },
          {
            label: "error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          { label: "Install kprompt", href: "/docs/install" },
        ],
      },
    ],
  },
  {
    slug: "kubectl-vs-k9s",
    title:
      "kubectl vs K9s: when to use each (and why you keep both)",
    description:
      "A head-to-head for operators: kubectl is the precise API client and scripting language, K9s is a live terminal UI over the same API. Which one to reach for during an incident, in CI, and while learning Kubernetes.",
    publishedAt: "2026-07-26",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "kubectl",
      "kubernetes cli",
      "devops",
      "sre",
    ],
    keywords: [
      "kubectl vs k9s",
      "k9s vs kubectl",
      "k9s alternative",
      "is k9s better than kubectl",
      "k9s tutorial",
      "kubernetes terminal ui",
      "kubectl alternatives",
      "k9s read only mode",
      "kubernetes cli comparison",
    ],
    blocks: [
      {
        type: "p",
        text: "“kubectl vs K9s” is one of the most searched Kubernetes tooling questions, and the framing is slightly wrong. These are not two implementations of the same tool competing for a slot in your shell profile. kubectl is the official API client — a precise, scriptable vocabulary for the Kubernetes API. K9s is a terminal UI that continuously watches that same API using the same kubeconfig and the same RBAC.",
        links: [
          {
            label: "official API client",
            href: "https://kubernetes.io/docs/reference/kubectl/",
          },
          { label: "K9s", href: "https://github.com/derailed/k9s" },
        ],
      },
      {
        type: "p",
        text: "So the honest answer is: keep both, and know which one the current task belongs to. This post is the decision rule, not a winner announcement.",
      },
      {
        type: "h2",
        text: "The one-line answer",
      },
      {
        type: "ul",
        items: [
          "Reach for kubectl when the output must be exact, reproducible, scriptable, or pasted into a ticket",
          "Reach for K9s when you are watching live state and need to navigate fast without retyping commands",
          "Neither removes the need to understand Kubernetes objects — they are both thin layers over the same API",
        ],
      },
      {
        type: "h2",
        text: "Job-by-job comparison",
      },
      {
        type: "table",
        headers: ["Job", "kubectl", "K9s"],
        rows: [
          [
            "Scripts, CI, runbooks",
            "Built for it — stable flags, JSON/YAML output",
            "Interactive TUI is not automatable",
          ],
          [
            "Watch a rollout live",
            "Works with --watch or repeated get",
            "Better — continuous views, no retyping",
          ],
          [
            "Hop between Pods and tail logs",
            "kubectl logs with selectors and --previous",
            "Faster — keyboard navigation between resources",
          ],
          [
            "Full API surface and uncommon resources",
            "Complete — every verb and CRD",
            "Common day-2 actions, not every verb",
          ],
          [
            "Precise output shaping",
            "jsonpath, custom-columns, -o yaml",
            "Views are for reading, not for piping",
          ],
          [
            "Sharing what you did",
            "Copy-pasteable command",
            "Hard to reproduce a keystroke sequence",
          ],
          [
            "Exploring an unfamiliar cluster",
            "Verbose but explicit",
            "Better — you see relationships as you browse",
          ],
        ],
      },
      {
        type: "h2",
        text: "What kubectl is actually good at",
      },
      {
        type: "p",
        text: "kubectl is the common language of Kubernetes operations. Every runbook, incident note, Stack Overflow answer, and CI job speaks it. That matters more than ergonomics: a kubectl command is an artifact you can review, diff, and hand to someone else.",
      },
      {
        type: "code",
        caption: "Output shaping you cannot get from a TUI",
        code: `# Which containers were last terminated, and why?
kubectl get pods -n payments -o jsonpath='{range .items[*]}{.metadata.name}{"\\t"}{range .status.containerStatuses[*]}{.lastState.terminated.reason}{" "}{end}{"\\n"}{end}'

# Custom columns for a quick capacity read
kubectl get pods -n payments \\
  -o custom-columns='POD:.metadata.name,CPU_REQ:.spec.containers[*].resources.requests.cpu'`,
      },
      {
        type: "ul",
        items: [
          "Deterministic — the same command produces the same result in CI and on your laptop",
          "Composable — pipe into jq, grep, or a policy check",
          "Extensible — krew plugins add subcommands without leaving the CLI",
          "Teachable — kubectl explain documents the API from the terminal",
        ],
      },
      {
        type: "h2",
        text: "What K9s is actually good at",
      },
      {
        type: "p",
        text: "K9s removes the retype-and-rerun loop. Instead of running kubectl get pods, reading, then running kubectl describe on one of them, you stay in a live view and move around with the keyboard. During an incident that difference is real: you are navigating evidence, not composing commands.",
      },
      {
        type: "ul",
        items: [
          "Continuously refreshed resource views instead of point-in-time snapshots",
          "Keyboard-driven navigation between Deployments, Pods, logs, and describe output",
          "Fast context and namespace switching when the incident spans more than one",
          "Read-only mode when you want to browse a sensitive cluster without fat-fingering an edit",
          "Skins, aliases, hotkeys, and plugins for teams that live in the terminal",
        ],
      },
      {
        type: "p",
        text: "Flags, config paths, and available views shift between K9s releases — check the upstream repository for the version you installed rather than trusting a blog snapshot.",
        links: [
          {
            label: "upstream repository",
            href: "https://github.com/derailed/k9s",
          },
        ],
      },
      {
        type: "h2",
        text: "Is K9s a kubectl replacement?",
      },
      {
        type: "p",
        text: "No, and treating it as one causes two specific problems. First, you cannot put a K9s session in a pipeline, so anything you want automated still has to be expressed as kubectl. Second, a keystroke sequence is not an audit trail — when someone asks what you changed at 03:00, a command history answers and a TUI session does not.",
      },
      {
        type: "ul",
        items: [
          "K9s is a better reader; kubectl is the better writer of record",
          "Mutations made from a TUI are easy to make and hard to review afterwards",
          "If your team needs every change to be reviewable, the interface matters less than the approval step around it",
        ],
      },
      {
        type: "h2",
        text: "Where an AI Kubernetes CLI fits",
      },
      {
        type: "p",
        text: "There is a third bottleneck that neither tool addresses: translating intent into the right change. K9s helps you look, kubectl helps you execute precisely, but if you already know the outcome — scale api to three, roll back the bad release, explain why redis is not ready — you still have to reconstruct the command chain under pressure.",
      },
      {
        type: "p",
        text: "That is the gap kprompt targets, and deliberately not by piping model output into a shell. A mutating prompt compiles into a plan with actions, a diff, and a risk verdict, which you approve before anything runs. It uses your kubeconfig and your own LLM key, and it does not replace RBAC or admission policy.",
        links: [
          { label: "safety model", href: "/docs/safety" },
          { label: "BYOK providers", href: "/docs/providers" },
        ],
      },
      {
        type: "code",
        caption: "Intent, then a reviewable plan",
        code: `$ kprompt "scale api to 3" -n payments

Plan
  1. scale Deployment/api replicas → 3

Risk: medium
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "A realistic three-tool workflow",
      },
      {
        type: "p",
        text: "Most strong platform teams do not standardize on one interface. They match the interface to the phase of the work.",
      },
      {
        type: "table",
        headers: ["Incident phase", "Tool", "Why"],
        rows: [
          [
            "Notice something is wrong",
            "K9s (or an alert)",
            "Live view surfaces restarts and Pending Pods",
          ],
          [
            "Understand the cause",
            "kubectl describe / logs, or an explain prompt",
            "Evidence you can quote in the incident channel",
          ],
          [
            "Make a bounded change",
            "Reviewed plan or a hand-typed kubectl",
            "Both leave a reviewable artifact",
          ],
          [
            "Steady state",
            "GitOps (Argo CD / Flux)",
            "Desired state belongs in Git, not in a TUI",
          ],
        ],
      },
      {
        type: "h2",
        text: "Try all three on a deliberately broken cluster",
      },
      {
        type: "p",
        text: "The fastest way to form your own opinion is to break something on purpose and navigate it three ways. kprompt-examples spins up kind, breaks seven workloads, and runs offline in heuristic mode with no API key and no spend.",
        links: [
          {
            label: "kprompt-examples",
            href: "https://github.com/kprompt/kprompt-examples",
          },
        ],
      },
      {
        type: "code",
        caption: "kind cluster, one broken namespace",
        code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make up && make break SCENARIO=01-crashloop && make verify

# now look at the same failure three ways
kubectl describe pod -l app=api -n payments
k9s -n payments
kprompt "explain why api is crashing" -n payments`,
      },
      {
        type: "p",
        text: "For the wider interface survey (Headlamp, Lens, dashboards), see our kubectl alternatives post. For the AI peer map (K8sGPT, kubectl-ai, Kagent), see the Kubernetes AI tools comparison. For the specific failure above, see the CrashLoopBackOff guide.",
        links: [
          {
            label: "kubectl alternatives post",
            href: "/blog/kubectl-alternatives",
          },
          {
            label: "Kubernetes AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          {
            label: "CrashLoopBackOff guide",
            href: "/blog/kubernetes-crashloopbackoff",
          },
          { label: "Install kprompt", href: "/docs/install" },
        ],
      },
    ],
  },
  {
    slug: "kubernetes-crashloopbackoff",
    title:
      "Kubernetes CrashLoopBackOff: how to read it, find the cause, and fix it",
    description:
      "CrashLoopBackOff is a symptom, not a cause. How the restart backoff works, what exit codes tell you, the kubectl ladder for finding the real failure, and how to apply a bounded fix you actually reviewed.",
    publishedAt: "2026-07-26",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "troubleshooting",
      "devops",
      "sre",
      "kubectl",
    ],
    keywords: [
      "kubernetes crashloopbackoff",
      "crashloopbackoff fix",
      "pod crashloopbackoff",
      "what is crashloopbackoff",
      "kubectl logs previous",
      "container exit code 1",
      "crashloopbackoff exit code 137",
      "kubernetes pod restarting",
      "back-off restarting failed container",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "CrashLoopBackOff is the most recognisable failure state in Kubernetes and one of the most misread. It is not an error code from your application. It is Kubernetes telling you that a container keeps exiting and that the kubelet is now waiting longer between restart attempts. The cause is somewhere else entirely — usually in the logs of the instance that already died.",
      },
      {
        type: "p",
        text: "This guide is the operator ladder: what the state actually means, how to read the exit code, how to get the logs of the crashed container rather than the starting one, and how to make a bounded change you reviewed first.",
        links: [
          {
            label: "Pod lifecycle",
            href: "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/",
          },
        ],
      },
      {
        type: "h2",
        text: "What CrashLoopBackOff actually means",
      },
      {
        type: "p",
        text: "With the default restartPolicy of Always, the kubelet restarts a container that exits — for any reason, including a clean exit 0. If it keeps exiting, the kubelet applies an exponential backoff between attempts instead of hammering the node. The Pod reports CrashLoopBackOff while it waits.",
      },
      {
        type: "ul",
        items: [
          "The container started — this is not a scheduling or image problem (that would be Pending or ImagePullBackOff)",
          "The restart count climbs and the gap between restarts grows",
          "Kubernetes is behaving correctly; your container is the thing that is unhappy",
          "A container that exits 0 immediately still loops, because Always means always",
        ],
      },
      {
        type: "h2",
        text: "Read the exit code first",
      },
      {
        type: "p",
        text: "The exit code narrows the search dramatically before you read a single log line. It lives under the container's Last State in describe output.",
      },
      {
        type: "table",
        headers: ["Exit code", "Usually means", "Where to look next"],
        rows: [
          [
            "1",
            "Application error — unhandled exception, failed startup check",
            "Logs of the previous container",
          ],
          [
            "137",
            "SIGKILL — most often OOMKilled at the memory limit",
            "Last State reason and memory limits",
          ],
          [
            "143",
            "SIGTERM — terminated, often during shutdown handling",
            "Probe config and graceful shutdown code",
          ],
          [
            "126 / 127",
            "Command not executable or not found",
            "Image entrypoint, command, and PATH",
          ],
          [
            "0",
            "Clean exit, but restartPolicy keeps restarting it",
            "Whether this should be a Job instead of a Deployment",
          ],
        ],
      },
      {
        type: "p",
        text: "If you see 137, you are probably not debugging a crash loop at all — you are debugging a memory kill that presents as one. That has its own ladder.",
        links: [
          {
            label: "own ladder",
            href: "/blog/kubernetes-oomkilled",
          },
        ],
      },
      {
        type: "h2",
        text: "The kubectl ladder",
      },
      {
        type: "p",
        text: "The single most common mistake is running kubectl logs and seeing nothing useful, because that returns the currently starting container — not the one that crashed. You almost always want --previous.",
      },
      {
        type: "code",
        caption: "Confirm the state, then read the right logs",
        code: `kubectl get pods -n payments

kubectl describe pod -l app=api -n payments
# Containers → Last State:
#   Reason: Error
#   Exit Code: 1

# logs of the instance that actually died
kubectl logs -l app=api -n payments --previous --tail=100`,
      },
      {
        type: "ul",
        items: [
          "Scope — which Deployment, namespace, and kubeconfig context",
          "Status — restart count, Ready, Last State reason and exit code",
          "Logs — always with --previous for a looping container",
          "Events — Back-off restarting failed container, probe failures, image errors",
          "Config — env vars, mounted Secrets and ConfigMaps, entrypoint",
          "Dependencies — is it dying because something it connects to is unreachable?",
        ],
      },
      {
        type: "code",
        caption: "Events tell you what the kubelet is doing",
        code: `kubectl get events -n payments --sort-by='.lastTimestamp' | tail -20
# Warning  BackOff  Back-off restarting failed container api`,
      },
      {
        type: "h2",
        text: "The five causes that cover most crash loops",
      },
      {
        type: "h3",
        text: "1. A dependency is not reachable",
      },
      {
        type: "p",
        text: "The container starts, tries to connect to a database or cache, fails, and exits. The log line is usually explicit — connection refused, no such host, timeout. Check that the Service name resolves and that the dependency is actually Ready before you touch the crashing workload.",
      },
      {
        type: "h3",
        text: "2. Missing or wrong configuration",
      },
      {
        type: "p",
        text: "A required environment variable is unset, a Secret key was renamed, or a mounted ConfigMap does not have the file the app expects. These fail fast on startup, which is why the logs are short and the restart count is high.",
      },
      {
        type: "h3",
        text: "3. Memory limit too low",
      },
      {
        type: "p",
        text: "Exit code 137 with reason OOMKilled. Raising the limit may be correct, or it may be hiding a leak. Compare observed usage to the limit before doubling anything.",
      },
      {
        type: "h3",
        text: "4. A bad probe configuration",
      },
      {
        type: "p",
        text: "A liveness probe that starts checking before the app can answer will kill a healthy-but-slow container forever. If the app works when you exec into it but the kubelet keeps restarting it, suspect initialDelaySeconds, the probe path, or the port.",
      },
      {
        type: "h3",
        text: "5. A bad release",
      },
      {
        type: "p",
        text: "It worked an hour ago. Nothing about the cluster changed. In that case the fastest safe action is usually to roll back, then debug the image on your own time rather than during the incident.",
      },
      {
        type: "h2",
        text: "Reproduce it on purpose before you need to",
      },
      {
        type: "p",
        text: "The best time to practise this ladder is when nothing is actually on fire. kprompt-examples ships a CrashLoopBackOff fixture: the api container logs a connection attempt, reports connection refused to its database, then exits 1 — exactly the shape you meet in production.",
        links: [
          {
            label: "kprompt-examples",
            href: "https://github.com/kprompt/kprompt-examples",
          },
        ],
      },
      {
        type: "code",
        caption: "A real crash loop in a kind cluster",
        code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make up && make break SCENARIO=01-crashloop && make verify

kubectl describe pod -l app=api -n payments
kubectl logs -l app=api -n payments --previous
make fix SCENARIO=01-crashloop`,
      },
      {
        type: "h2",
        text: "Asking in natural language instead",
      },
      {
        type: "p",
        text: "The ladder above is mechanical, which is exactly why it is worth compiling. kprompt's explain path walks Deployment → ReplicaSet → Pods → Events → Logs and reports what it found, including the previous container's output. Reads run immediately — there is nothing to approve when nothing changes.",
        links: [
          { label: "commands", href: "/docs/commands" },
        ],
      },
      {
        type: "code",
        caption: "Explain is read-only",
        code: `kprompt "explain why api is crashing" -n payments
kprompt "logs api" -n payments
kprompt "why is api not ready" -n payments`,
      },
      {
        type: "p",
        text: "When the right fix is a mutation — roll back, raise a limit, correct replicas — it becomes a plan with a diff and a risk verdict that you approve. That boundary is the point: the model can be wrong about the cause, and you still see exactly what would change before it changes.",
        links: [{ label: "safety model", href: "/docs/safety" }],
      },
      {
        type: "code",
        caption: "A rollback you review first",
        code: `$ kprompt "rollback api" -n payments

Plan
  1. rollout undo Deployment/api

Risk: medium
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "What not to do",
      },
      {
        type: "ul",
        items: [
          "Do not delete the Pod and hope — the Deployment recreates it and the loop returns",
          "Do not remove the liveness probe to stop the restarts; you are deleting the alarm, not the fire",
          "Do not raise memory limits reflexively unless the exit code and reason actually say OOMKilled",
          "Do not read kubectl logs without --previous and conclude there are no logs",
          "Do not approve an AI-suggested plan you have not sanity-checked against the evidence",
        ],
      },
      {
        type: "h2",
        text: "Related reading",
      },
      {
        type: "p",
        text: "For memory kills specifically, see the OOMKilled guide. For a wider prompt catalogue across failure modes, see the error prompt playbook. For always-on namespace watching that groups restarts into one Incident instead of paging per restart, see the Observe agent docs.",
        links: [
          { label: "OOMKilled guide", href: "/blog/kubernetes-oomkilled" },
          {
            label: "error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          { label: "Observe agent docs", href: "/docs/agent" },
          { label: "Install kprompt", href: "/docs/install" },
        ],
      },
    ],
  },
  {
    slug: "observe-agent-kind-demo",
    title: "Break a kind cluster on purpose, then watch the Observe agent",
    description:
      "One command from kprompt-examples: kind up, seven failure scenarios, verify they actually broke, then run the Observe agent offline in heuristic mode.",
    publishedAt: "2026-07-26",
    author: MUHTALIP_DEDE,
    tags: ["observe", "demo", "kind", "tutorial"],
    keywords: [
      "kprompt examples",
      "kubernetes observe agent demo",
      "kind crashloop demo",
      "make walkthrough",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "v0.5 shipped the optional Observe agent. The missing piece for a live walkthrough was a payments namespace that actually misbehaves — not a slide claiming CrashLoopBackOff. kprompt-examples is that fixture set.",
        links: [
          {
            label: "kprompt-examples",
            href: "https://github.com/kprompt/kprompt-examples",
          },
          { label: "Observe agent docs", href: "/docs/agent" },
        ],
      },
      {
        type: "h2",
        text: "One command",
      },
      {
        type: "code",
        caption: "up → break-all → verify → agent-full (~45s)",
        code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make walkthrough`,
      },
      {
        type: "p",
        text: "Needs Docker, kind, kubectl, and kprompt v0.5+ (the agent subcommand). Heuristic mode — no LLM API key, no spend. DEMO_SECONDS=60 stretches the agent window for recordings.",
      },
      {
        type: "h2",
        text: "What you should see",
      },
      {
        type: "ul",
        items: [
          "CrashLoop, ImagePull, OOM, stalled rollout, unbound PVC, failing CronJob, missing Redis hostname",
          "Health score move while baseline web stays Ready (so the score has something healthy to weigh against)",
          "Correlated incidents and gated alerts — not one Slack message per kubelet Event",
          "With --autopilot-propose: a propose-only rollback suggestion on the stalled checkout rollout (Applied stays false)",
        ],
      },
      {
        type: "h2",
        text: "Honest limits",
      },
      {
        type: "p",
        text: "Heuristic analysis is deterministic and offline — useful for demos and CI, not a substitute for a real LLM run. Autopilot remains propose-only. Redis/Postgres in the dependency scenario are busybox stubs for Service-name discovery, not databases. Full caveats live in the examples README.",
        links: [
          {
            label: "Examples README",
            href: "https://github.com/kprompt/kprompt-examples#readme",
          },
          { label: "v0.5 release notes", href: "/blog/kprompt-v0-5-observe-agent" },
        ],
      },
    ],
  },
  {
    slug: "kprompt-v0-5-observe-agent",
    title: "kprompt v0.5: optional Observe agent, still no silent Autopilot",
    description:
      "v0.5 ships the namespace-scoped Observe agent — watch → Incident → gated Slack/webhook — plus Operator, memory, patterns, and Autopilot propose-only under ADR-0015. The laptop CLI stays plan → approve → apply.",
    publishedAt: "2026-07-25",
    updatedAt: "2026-07-25",
    author: MUHTALIP_DEDE,
    tags: ["announcement", "release", "observe", "agent"],
    keywords: [
      "kprompt v0.5",
      "kubernetes observe agent",
      "in-cluster AI SRE",
      "slack kubernetes alerts",
      "autopilot propose-only",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "kprompt v0.5 is out. The headline is an optional in-cluster Observe agent: continuously watch one namespace, correlate Incidents, optionally analyze with your BYOK LLM, and notify Slack or a webhook — without turning into a silent auto-healer.",
        links: [
          { label: "GitHub release", href: "https://github.com/kprompt/kprompt/releases/tag/v0.5.0" },
          { label: "Observe agent docs", href: "/docs/agent" },
        ],
      },
      {
        type: "h2",
        text: "What shipped",
      },
      {
        type: "ul",
        items: [
          "kprompt agent run — Pods/Events (and optional workloads) → Incidents → gated AgentAlert",
          "Helm chart charts/kprompt-agent + Operator charts/kprompt-operator for KpromptAgent CRs",
          "Namespace memory (--memory) and pattern learning (--patterns / “seen before”)",
          "Autopilot propose-only (--autopilot-propose) under ADR-0015 — Applied stays false",
          "Same laptop CLI as v0.4: plan → safety → approve → apply, day-2 integrations, multi-context",
        ],
      },
      {
        type: "h2",
        text: "Honest positioning",
      },
      {
        type: "table",
        headers: ["Peer", "Their job", "Ours in v0.5"],
        rows: [
          [
            "K8sGPT",
            "On-demand analyzer / scan → explain",
            "Always-on watch → correlated Incident → confidence-gated alert",
          ],
          [
            "Kagent",
            "In-cluster multi-agent framework",
            "One kprompt-native Observe pipeline — not a general agent platform",
          ],
          [
            "kubectl-ai",
            "NL CLI / agentic kubectl fluency",
            "Same NL-CLI lane; mutate stays PlanResult → approve",
          ],
        ],
      },
      {
        type: "p",
        text: "Default install is still Observe (read Role). Autopilot is opt-in and propose-only: allowlisted rollbackFailedRollout proposals plus a local audit log. No silent apply. Details: ADR-0013 (Observe) and ADR-0015 (Autopilot).",
        links: [
          {
            label: "ADR-0013",
            href: "https://github.com/kprompt/kprompt-architecture/blob/main/decisions/ADR-0013-in-cluster-agent.md",
          },
          {
            label: "ADR-0015",
            href: "https://github.com/kprompt/kprompt-architecture/blob/main/decisions/ADR-0015-autopilot-mode.md",
          },
        ],
      },
      {
        type: "h2",
        text: "Try it",
      },
      {
        type: "code",
        caption: "Install v0.5 + laptop smoke",
        code: `curl -fsSL https://kprompt.ai/install | bash
# or pin: brew install kprompt/tap/kprompt

kprompt agent run -n payments --analyze --fetch-logs --health --heuristic
kprompt agent run -n payments --analyze --heuristic --memory --patterns --autopilot-propose`,
      },
      {
        type: "code",
        caption: "Broken demo cluster (kind)",
        code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make up && make break SCENARIO=01-crashloop && make verify
kprompt agent run -n payments --analyze --health --heuristic`,
      },
      {
        type: "code",
        caption: "Helm Observe agent",
        code: `kubectl -n payments create secret generic kprompt-agent \\
  --from-literal=OPENAI_API_KEY="$OPENAI_API_KEY"
helm upgrade --install kprompt-agent ./charts/kprompt-agent \\
  -n payments --create-namespace \\
  --set image.tag=0.5.0`,
      },
      {
        type: "p",
        text: "Full flags, RBAC, LLM cost notes, and CRD status sync live on the Observe agent docs page. For a reproducible broken namespace, use kprompt-examples. The CLI remains experimental — review every mutating plan before apply.",
        links: [
          { label: "Observe agent docs", href: "/docs/agent" },
          {
            label: "kprompt-examples",
            href: "https://github.com/kprompt/kprompt-examples",
          },
          { label: "Install", href: "/docs/install" },
          { label: "Roadmap", href: "/docs/roadmap" },
        ],
      },
    ],
  },
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
        text: "kprompt is an experimental, Apache-2.0-licensed CLI. You type what you want in natural language. The tool turns that into a structured plan against your existing kubeconfig, runs safety checks, asks you to approve on a TTY (unless you pass --approve), and only then executes. No hosted agent in your cluster. No vendor lock-in on the model — bring your own API keys.",
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
        text: "CrashLoopBackOff means the container starts, exits non-zero, and kubelet backs off retries. It's a symptom — not a root cause. The exit might be a missing env var, bad command, OOMKill, or dependency unreachable on startup. For the full exit-code table and ladder, see the dedicated CrashLoopBackOff guide; when Last State shows OOMKilled, follow the OOMKilled guide instead.",
        links: [
          {
            label: "CrashLoopBackOff guide",
            href: "/blog/kubernetes-crashloopbackoff",
          },
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
        text: "Image pull errors are operational, not mystical: wrong tag, deleted image, registry auth (imagePullSecrets), rate limits, or private registry DNS from the node. Events on the Pod usually state the exact reason. For the full ErrImagePull vs ImagePullBackOff ladder, see the dedicated ImagePullBackOff guide. Fix forward is correcting the Deployment image or secret — again, a planned mutation you should read before apply.",
        links: [
          {
            label: "ImagePullBackOff guide",
            href: "/blog/kubernetes-imagepullbackoff",
          },
        ],
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
        text: "Install kprompt in a branch pipeline, emit JSON for a harmless list or describe prompt, then progress to scale on staging with two-stage gate + environment approval. Full schema and jq helpers: kprompt.ai/docs/ci. Field-level walkthrough: PlanResult JSON deep dive.",
        links: [
          { label: "kprompt.ai/docs/ci", href: "/docs/ci" },
          {
            label: "PlanResult JSON deep dive",
            href: "/blog/planresult-json-deep-dive",
          },
        ],
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
          ["xAI (Grok)", "xai", "KPROMPT_XAI_API_KEY", "grok-4.5"],
          ["Mistral", "mistral", "KPROMPT_MISTRAL_API_KEY", "mistral-small-latest"],
          ["DeepSeek", "deepseek", "KPROMPT_DEEPSEEK_API_KEY", "deepseek-chat"],
          ["Moonshot (Kimi K3)", "moonshot", "KPROMPT_MOONSHOT_API_KEY", "kimi-k3"],
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
        text: "Moonshot / Kimi K3 — long-context reasoning",
      },
      {
        type: "p",
        text: "Kimi K3 is Moonshot's flagship model with a 1M-token context window — useful for dense incident explains that pull many events, logs, and manifests into one prompt. Use --provider moonshot (default model kimi-k3) when you need more reasoning headroom than Flash/Mini tiers.",
      },
      {
        type: "code",
        caption: "Moonshot / Kimi K3 setup",
        code: `export KPROMPT_MOONSHOT_API_KEY="..."
kprompt --provider moonshot "explain why api is crashlooping" -n prod`,
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
        text: "kprompt is early-stage Apache-2.0 CLI. Safety rules reduce risk; they do not certify production readiness. Plans can be wrong within allowed operations — wrong deployment name, wrong replica count, wrong namespace if flags are ambiguous. Hard denies don't catch every mistake. Start on kind or non-production; keep --approve off until plans feel familiar.",
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
      "Compare kubectl alternatives: K9s terminal UI, Headlamp and Lens dashboards, and natural-language Kubernetes CLIs. Which interface fits navigation, visual management, troubleshooting, and plan-before-apply operations.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-26",
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
      "kubectl vs k9s",
      "k9s vs kubectl",
      "k9s alternative",
      "best kubernetes cli",
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
        type: "p",
        text: "If K9s is the only alternative you are weighing, we wrote a dedicated head-to-head: kubectl vs K9s. The short version is that they are not rivals — kubectl is the precise API client and scripting language, K9s is a live terminal UI over the same API and credentials.",
        links: [
          { label: "kubectl vs K9s", href: "/blog/kubectl-vs-k9s" },
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
        text: "The dangerous implementation is model output piped directly to a shell. kprompt instead turns the prompt into a structured plan, runs risk checks and hard denies, and asks for approval before mutations. It uses your kubeconfig and your LLM provider keys (BYOK); it does not replace RBAC or admission policy.",
        links: [
          { label: "safety", href: "/docs/safety" },
          { label: "BYOK providers", href: "/docs/providers" },
        ],
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
        text: "Use K9s for watching rollouts, jumping between Pods, tailing logs, and navigating resources during an interactive terminal session. If you arrived here from a “kubectl vs K9s” search, this is usually the answer: K9s for the live session, kubectl for the exact command you need to keep.",
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
        text: "Read the quickstart and safety guide before approving mutations. For AI peers (K8sGPT, kubectl-ai, Kagent), see the Kubernetes AI tools comparison. For optional always-on alerts, see the Observe agent docs. kprompt is one interface in the Kubernetes toolbelt — not a reason to stop understanding the cluster beneath it.",
        links: [
          { label: "quickstart", href: "/docs/quickstart" },
          { label: "safety guide", href: "/docs/safety" },
          {
            label: "Kubernetes AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          { label: "Observe agent docs", href: "/docs/agent" },
          { label: "providers", href: "/docs/providers" },
        ],
      },
    ],
  },
  {
    slug: "kubernetes-ai-tools-comparison",
    title:
      "Kubernetes AI tools: K8sGPT, kubectl-ai, Kagent, and plan-before-apply CLIs",
    description:
      "Map of Kubernetes AI / k8s AI tools by job: K8sGPT (and Kubegpt-style searches) for diagnosis, kubectl-ai and kprompt for NL CLIs, Kagent for in-cluster agents — honest mutation contracts included.",
    publishedAt: "2026-07-18",
    updatedAt: "2026-07-26",
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
      "kubegpt",
      "k8sgpt alternatives",
      "k8sgpt vs kubectl-ai",
      "kubernetes ai tools",
      "k8s ai tools",
      "k8s ai",
      "kubernetes ai",
      "best ai tools for kubernetes troubleshooting",
      "kubectl-ai",
      "kagent vs kubectl-ai",
      "kagent kubernetes",
      "ai kubernetes troubleshooting",
      "chat with kubernetes cluster",
      "natural language kubernetes",
      "kubernetes ai cli",
      "ai kubernetes cli",
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
        text: "K8sGPT is the CNCF-adjacent tool most teams mean when they say “AI that understands my cluster” (including misspelled searches like Kubegpt). It runs analyzers over live resources, surfaces problems (CrashLoopBackOff, misconfigured Services, and similar), and can enrich findings with an LLM via --explain. Multiple backends are supported — including local models — and sensitive fields can be anonymized before they leave your environment.",
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
        text: "Compared with kprompt: Kagent is a general in-cluster agent platform. kprompt’s optional Observe agent is a single, kprompt-native pipeline (watch → Incident → gated Slack/webhook) with Role-scoped RBAC and no Autopilot mutate in V1. Choose Kagent when you need multi-agent CRDs and shared tool runtimes. Choose kprompt Observe when you want threaded alerts with Incident/AgentAlert DNA — and keep the laptop CLI for plan → approve → apply.",
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
        text: "K8sGPT alternatives — and when they are the wrong category",
      },
      {
        type: "p",
        text: "Teams searching for “K8sGPT alternatives” often mean one of two things: another analyzer that explains unhealthy objects, or a natural-language CLI that can propose fixes. Those are different jobs. A true K8sGPT peer stays diagnosis-first. An intent CLI like kubectl-ai or kprompt starts from what you want to do, not from a scan catalog.",
      },
      {
        type: "ul",
        items: [
          "Stay with K8sGPT (or similar analyzers) when the bottleneck is finding what is broken",
          "Evaluate kubectl-ai or kprompt when you already know the outcome and need a mutate path",
          "Evaluate Kagent when you need an in-cluster agent platform, not a laptop scan CLI",
          "Do not expect a plan-before-apply CLI to replace analyzer coverage — pair them",
        ],
      },
      {
        type: "h2",
        text: "Best AI tools for Kubernetes troubleshooting",
      },
      {
        type: "p",
        text: "“Best AI tools for Kubernetes troubleshooting” depends on the failure mode. For CrashLoopBackOff and misconfigured Services across a fleet, start with K8sGPT analyze --explain. For a single workload you already named (“why is payment-api crashing?”), an intent CLI explain path is often faster. For always-on namespace watching with gated Slack alerts, use an Observe-style agent — not a chat REPL left open on production.",
        links: [
          { label: "error prompt playbook", href: "/blog/kubernetes-error-prompt-playbook" },
          { label: "Observe agent docs", href: "/docs/agent" },
        ],
      },
      {
        type: "table",
        headers: ["Troubleshooting need", "First tool", "Why"],
        rows: [
          [
            "Fleet scan / unknown unhealthy objects",
            "K8sGPT",
            "Analyzer catalog + explain",
          ],
          [
            "Named workload root-cause",
            "Intent CLI (kubectl-ai or kprompt)",
            "Explain from the resource you already care about",
          ],
          [
            "Awkward kubectl / jsonpath under pressure",
            "kubectl-ai",
            "Fluency specialist in the NL-CLI lane",
          ],
          [
            "Bounded fix with a reviewable plan",
            "kprompt",
            "Plan → safety → approve before apply",
          ],
          [
            "Always-on namespace alerts",
            "kprompt Observe agent",
            "Watch → Incident → gated notify; no silent Autopilot",
          ],
        ],
      },
      {
        type: "h2",
        text: "What is an AI Kubernetes CLI?",
      },
      {
        type: "p",
        text: "An AI Kubernetes CLI turns natural language into cluster operations from your laptop using your kubeconfig. The useful split inside that category is the mutate contract: some tools optimize for generating and running kubectl quickly; others compile intent into a typed plan you review first. kprompt is the second shape — BYOK providers, PlanResult JSON for CI, and hard denies for wipe-class prompts.",
        links: [
          { label: "BYOK providers", href: "/docs/providers" },
          { label: "safety model", href: "/docs/safety" },
          { label: "CI / PlanResult JSON", href: "/docs/ci" },
        ],
      },
      {
        type: "h2",
        text: "Kagent vs kubectl-ai",
      },
      {
        type: "p",
        text: "Kagent and kubectl-ai are easy to confuse in a “Kubernetes AI” listicle, but they sit in different jobs. kubectl-ai is a local natural-language CLI for operators. Kagent is an in-cluster framework for building and running agents as Kubernetes resources. Choose kubectl-ai (or kprompt) when a human is at the keyboard. Choose Kagent when a platform team owns agent CRDs, tool runtimes, and ServiceAccount blast radius.",
      },
      {
        type: "h2",
        text: "Where kprompt fits — and what we are not claiming",
      },
      {
        type: "p",
        text: "kprompt is an experimental Apache-2.0 CLI in the intent-CLI lane: natural language in, structured plan out, safety checks, then apply only after approval (unless you explicitly pass --approve). Reads (list, explain, logs, describe) run immediately. Mutations always show the plan — with risk labels and hard denies for wipe-class prompts. Integrations extend the same loop toward Helm, Argo Workflows, and Prometheus-backed performance explains.",
        links: [
          { label: "safety checks", href: "/docs/safety" },
          { label: "Integrations", href: "/docs/integrations" },
        ],
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
          "Not a Kagent replacement — we ship an optional Observe-only agent (Helm), not a multi-agent framework",
          "Not Autopilot — Observe never applies/patches/deletes; Autopilot needs a future ADR",
          "Not “unique NL kubectl” — kubectl-ai shares that job; we share the lane",
          "Our bet — gated plan/apply on your laptop (BYOK) + optional always-on Observe alerts",
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
            "Always-on namespace alerts (Observe-only)",
            "kprompt Observe agent (Helm)",
            "Watch → Incident → gated Slack/webhook; no Autopilot mutate",
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
        text: "If your shortlist already includes K8sGPT and kubectl-ai, keep both jobs clear: use K8sGPT when you need analyzer findings; use an intent CLI when you already know the outcome. Then run the same mutate prompts through kubectl-ai and kprompt and compare only what matters — what prints before apply, what gets denied, and what you can gate in CI. For a job-first primer (what “Kubernetes AI” even means), start with What is Kubernetes AI?",
        links: [
          {
            label: "What is Kubernetes AI?",
            href: "/blog/what-is-kubernetes-ai",
          },
        ],
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
        text: "Read the safety guide before approving mutations on shared clusters. For a dedicated head-to-head, see kprompt vs kubectl-ai. For how kprompt sits next to kubectl and K9s (non-AI peers), see our kubectl alternatives post. For model and BYOK choices, see Providers. For optional always-on alerts, see the Observe agent docs.",
        links: [
          { label: "safety guide", href: "/docs/safety" },
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
          {
            label: "kubectl alternatives post",
            href: "/blog/kubectl-alternatives",
          },
          { label: "Providers", href: "/docs/providers" },
          { label: "Observe agent docs", href: "/docs/agent" },
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
        text: "Spin a tiny limit on kind or staging, force an OOM, then run explain and decide whether to approve the suggested patch. Pair with the ImagePullBackOff guide when the Pod never starts, and with the CrashLoopBackOff guide when the memory kill is what keeps the container looping.",
        links: [
          {
            label: "ImagePullBackOff guide",
            href: "/blog/kubernetes-imagepullbackoff",
          },
          {
            label: "CrashLoopBackOff guide",
            href: "/blog/kubernetes-crashloopbackoff",
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
        text: "What you should get: explain findings such as CrashLoopBackOff, last exit reason, and a suggestion to inspect logs. If the underlying kill was OOMKilled, you may also see a suggested memory patch that still requires approval. For the exit-code table and the full manual ladder behind these prompts, see the CrashLoopBackOff guide.",
        links: [
          {
            label: "CrashLoopBackOff guide",
            href: "/blog/kubernetes-crashloopbackoff",
          },
        ],
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
        text: "What you should get: image-pull finding and a suggestion to verify the image reference / pull secrets. The fix is usually correcting the Deployment image or imagePullSecrets — a separate planned mutation or GitOps PR, not an auto-remediation guess. For the Event-first ladder and the five common causes, see the ImagePullBackOff guide.",
        links: [
          {
            label: "ImagePullBackOff guide",
            href: "/blog/kubernetes-imagepullbackoff",
          },
        ],
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
          "Kagent — in-cluster agent framework. We ship an optional Observe-only agent, not a multi-agent platform.",
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
        text: "Honesty is part of the positioning. The Apache-2.0 CLI is free, local, and BYOK. Org policy sync, shared audit, and Team enrollment are explored for later — there is nothing to buy on the site today, and this post is not a pricing page. When governance ships, it should attach to the same PlanResult artifact, not invent a parallel chatbot product.",
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
        text: "For the peer map, read the AI tools comparison. For a direct head-to-head, see kprompt vs kubectl-ai. For the safety loop, read plan → approve. For CI schema, read PlanResult JSON deep dive and PlanResult gates. Talk to your cluster — but make the cluster change look like something you would sign.",
        links: [
          {
            label: "AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
          {
            label: "plan → approve",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          {
            label: "PlanResult JSON deep dive",
            href: "/blog/planresult-json-deep-dive",
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
  {
    slug: "ai-sre-not-ai-kubectl",
    title: "Beyond AI kubectl: why kprompt is aiming at AI SRE",
    description:
      "Natural language → plan → approve is the wedge. The differentiator is thinking about the cluster — investigate, why, timeline, blast radius, verify — still under the same approval contract. Honest shipped vs building vs exploring.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "platform engineering",
      "devops",
      "kubernetes cli",
    ],
    keywords: [
      "ai sre kubernetes",
      "kubernetes root cause analysis ai",
      "kprompt investigate",
      "ai kubectl alternative",
      "kubernetes blast radius",
      "proactive kubernetes operations",
      "k8sgpt vs kprompt",
      "intent compiler kubernetes sre",
      "natural language kubernetes troubleshooting",
      "kprompt roadmap",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "Most Kubernetes AI tools are reactive. kubectl runs a command. K9s and Lens show state. K8sGPT explains what a scanner already found. None of them reliably say: “Error rate on payment rose in the last 24 hours — yesterday’s rollout is the likely cause. Want a rollback plan?” That sentence is the product category we care about: AI SRE, not AI kubectl.",
      },
      {
        type: "p",
        text: "kprompt’s wedge is still the intent compiler: plain English becomes a reviewable PlanResult, then you approve before apply. That contract does not go away. What changes over time is how much the tool can think about the cluster before and after the mutate — investigation chains, causal why trees, timelines, blast radius, post-apply verify — without turning into a silent agent or a chat REPL.",
        links: [
          {
            label: "intent compiler",
            href: "/blog/intent-compiler-not-chat",
          },
          {
            label: "AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
        ],
      },
      {
        type: "h2",
        text: "What ships today (the foundation)",
      },
      {
        type: "p",
        text: "You can already run day-2 ops under plan → safety → approve → apply: deploy, scale, rollback, named delete, deep explain chains, logs, Helm through GitOps integrations, Prometheus performance explain, optimize reports, and service dependency graphs. Context aliases and doctor help you stay on the right cluster. That is the wedge — not a wishlist.",
        links: [
          { label: "Integrations", href: "/docs/integrations" },
          { label: "Quickstart", href: "/docs/quickstart" },
        ],
      },
      {
        type: "code",
        caption: "Shipped north-star prompts",
        code: `kprompt "why isn't my deployment ready?"
kprompt "why is my api slow?" -n production
kprompt "optimize my cluster"
kprompt "show service dependency graph"`,
      },
      {
        type: "h2",
        text: "Building next — think about the cluster",
      },
      {
        type: "p",
        text: "The next layer is investigation and trust, not more one-shot commands. These are in progress on our public Roadmap & vision — no ship dates, no fake demos.",
        links: [{ label: "Roadmap & vision", href: "/docs/roadmap" }],
      },
      {
        type: "ul",
        items: [
          "Blast-radius preview on mutating plans — who/what is affected before you type y",
          "Post-apply verify — confirm the goal after --wait, not only “applied”",
          "investigate — multi-hop RCA across ingress, Service, Endpoints, Pods, events, logs, NetworkPolicy, mesh/DNS",
          "why — structured cause trees (Pending → affinity → no matching GPU nodes)",
          "timeline — incident chronology from events, rollouts, HPA (+ optional metrics)",
          "audit / cleanup / drift — hygiene and GitOps drift with optional approved remediations",
          "Team GitHub org binding + CI Checks (beyond CLI --gitops PR mode)",
        ],
      },
      {
        type: "p",
        text: "The shape we want for RCA is still PlanResult-shaped: evidence refs, a root-cause summary, and an optional suggested fix that still needs approval. Never auto-apply because the model sounded confident.",
      },
      {
        type: "code",
        caption: "Target investigate shape (illustrative — building)",
        code: `$ kprompt "why are my APIs returning 503?"

Root cause
  Deployment healthy
  Service selector does not match pods
  No endpoints found

Suggested fix
  Plan: patch Service selector …  → Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "Exploring later — proactive, not unsupervised",
      },
      {
        type: "ul",
        items: [
          "Opt-in local watch: surface a signal (“latency up”) and offer investigate — never mutate without approve",
          "Local remember / session digests — facts stay on your machine by default",
          "Multi-cluster: contexts inventory and read fan-out; no kubeconfig upload to a control plane",
          "Workflow recipe packs (harden production, Ingress → Gateway API) as curated plan chains",
        ],
      },
      {
        type: "p",
        text: "Proactive ops is the category jump. Reactive tools wait for you to ask. An AI SRE should notice and propose — still under your kubeconfig, still behind approval. That requires a careful ADR before any daemon: v1 is one binary; watch must stay opt-in and fail closed on mutate.",
      },
      {
        type: "h2",
        text: "Honest boundaries",
      },
      {
        type: "ul",
        items: [
          "We are not racing kubectl-ai on free-form chat REPL features",
          "We are not a K8sGPT-style fleet scanner as the core identity",
          "We will not upload cluster credentials to run prompts in the cloud",
          "We will not silent-apply across contexts from one --approve",
          "Everything here is experimental — prefer non-production while you learn the plans",
        ],
      },
      {
        type: "h2",
        text: "Try the wedge, shape the SRE layer",
      },
      {
        type: "code",
        caption: "Install and run a safe read",
        code: `brew install kprompt/tap/kprompt
# or: curl -fsSL https://kprompt.ai/install | bash

export KPROMPT_GEMINI_API_KEY="..."
kprompt "list deployments"
kprompt "optimize my cluster"`,
      },
      {
        type: "p",
        text: "Star the repo, open issues, and read the roadmap when you want the full shipped / building / exploring split. The CLI stays Apache-2.0 and free. The long game is an assistant that understands impact — not another way to type kubectl. For the long-form build journal, see Building AI SRE in Public; for a head-to-head with Google’s NL CLI, see kprompt vs kubectl-ai.",
        links: [
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
          {
            label: "Building AI SRE in Public",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
        ],
      },
    ],
  },
  {
    slug: "kprompt-vs-kubectl-ai",
    title: "kprompt vs kubectl-ai: same NL CLI lane, different mutate contract",
    description:
      "Both turn English into Kubernetes actions on your laptop. kubectl-ai optimizes for kubectl fluency and agentic chat; kprompt compiles intent into a gated PlanResult — plan, safety, approve — then apply. Decision guide for operators choosing an AI Kubernetes CLI.",
    publishedAt: "2026-07-23",
    updatedAt: "2026-07-26",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "kubernetes cli",
      "kubectl",
      "platform engineering",
      "devops",
    ],
    keywords: [
      "kprompt vs kubectl-ai",
      "kubectl-ai alternative",
      "kubectl ai vs kprompt",
      "kubernetes ai cli comparison",
      "natural language kubectl",
      "plan before apply kubernetes",
      "ai kubernetes cli",
      "google kubectl-ai",
      "byok kubernetes cli",
      "intent compiler kubernetes",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "If you searched for a kubectl-ai alternative or “AI Kubernetes CLI,” you will land on Google’s kubectl-ai and a handful of peers. kprompt sits in the same lane: local binary, your kubeconfig, natural language in. The useful question is not who has the slicker chat — it is what happens before anything mutates the cluster.",
        links: [
          {
            label: "kubectl-ai",
            href: "https://github.com/GoogleCloudPlatform/kubectl-ai",
          },
        ],
      },
      {
        type: "p",
        text: "Short answer: use kubectl-ai when you want an agentic REPL that is excellent at generating and running kubectl. Use kprompt when you want an intent compiler — a typed, reviewable plan with risk and hard denies, optional CI JSON, and day-2 backends (Helm, metrics, GitOps) under one approval loop. Same problem space; different contract.",
        links: [
          {
            label: "intent compiler",
            href: "/blog/intent-compiler-not-chat",
          },
          {
            label: "broader AI tools map",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          { label: "safety model", href: "/docs/safety" },
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
            "Fast kubectl fluency / interactive chat with tool calls",
            "kubectl-ai",
            "REPL-first; strong model + tool-calling surface from Google’s project",
          ],
          [
            "Reviewable plan before every mutate",
            "kprompt",
            "Plan → safety → y/N (or --approve); wipe-class hard denies",
          ],
          [
            "Gate plans in CI with stable JSON",
            "kprompt",
            "PlanResult on stdout; human UI on stderr",
          ],
          [
            "One NL layer across Helm / Prom / GitOps",
            "kprompt",
            "Multi-tool routes with aggregate plan + single approval",
          ],
          [
            "MCP server / IDE agent integration today",
            "kubectl-ai",
            "MCP mode is a first-class kubectl-ai path",
          ],
          [
            "BYOK + Apache-2.0 laptop-local CLI",
            "Either",
            "Both keep kubeconfig local; pick by mutate contract",
          ],
        ],
      },
      {
        type: "h2",
        text: "Side-by-side",
      },
      {
        type: "table",
        headers: ["Dimension", "kubectl-ai", "kprompt"],
        rows: [
          [
            "Primary artifact",
            "Conversation + generated kubectl / tool calls",
            "PlanResult (actions, risk, denies)",
          ],
          [
            "Default mutate UX",
            "Agent executes kubectl (modes vary)",
            "Show plan → approve on TTY",
          ],
          [
            "Safety model",
            "Tool / mode dependent",
            "Risk scoring + hard denies (wipe-class)",
          ],
          [
            "CI / policy gate",
            "Bring your own wrappers",
            "First-class --output json PlanResult",
          ],
          [
            "Day-2 stack",
            "kubectl (+ extensible tools / MCP)",
            "Helm, Argo, Prom, OTel, Grafana, GitOps… via tools detect",
          ],
          [
            "Positioning",
            "AI-powered kubectl assistant",
            "Intent compiler → AI SRE direction",
          ],
        ],
      },
      {
        type: "h2",
        text: "What a scale looks like in each",
      },
      {
        type: "p",
        text: "Illustrative shapes — versions and flags change; read current docs for each project.",
      },
      {
        type: "code",
        caption: "kubectl-ai — NL → kubectl fluency",
        code: `kubectl-ai "scale deployment api to 3 in staging"
# Typically proposes / runs the matching kubectl`,
      },
      {
        type: "code",
        caption: "kprompt — compile → review → apply",
        code: `kprompt "scale api to 3" -n staging

Plan
  1. scale Deployment/api replicas → 3

Risk: low
Apply? [y/N]`,
      },
      {
        type: "p",
        text: "If your team’s fear is “the model applied something I did not see,” kprompt’s default path is built around that fear. If your team’s fear is “I am slow at remembering kubectl under pressure,” kubectl-ai’s REPL is built around that fear. Both are legitimate.",
      },
      {
        type: "h2",
        text: "When kprompt is the better fit",
      },
      {
        type: "ul",
        items: [
          "Shared clusters where every mutate needs a visible plan",
          "CI pipelines that must jq on risk.denied / plan.actions",
          "Prompts that span Helm install, Prom explain, then an approved scale",
          "Hard deny for wipe jokes and unscoped deletes as product behavior",
          "You want the long-term AI SRE path (investigate / blast-radius) without giving up approval",
        ],
      },
      {
        type: "h2",
        text: "When kubectl-ai is the better fit",
      },
      {
        type: "ul",
        items: [
          "You want a chat REPL that stays close to raw kubectl",
          "MCP / IDE agent workflows are the primary integration",
          "You already standardize on Google’s kubectl-ai releases and models",
          "You prefer maximum conversational flexibility over a fixed PlanResult schema",
        ],
      },
      {
        type: "h2",
        text: "Honest limits (both sides)",
      },
      {
        type: "ul",
        items: [
          "Neither replaces RBAC, admission controllers, or GitOps as source of truth",
          "Neither is production-hardened by slogan — try on kind / staging first",
          "kprompt is experimental OSS; plans can be wrong — always read the plan",
          "kubectl-ai is a fast-moving Google project — features and UX shift; check upstream README",
          "We are not claiming to out-chat kubectl-ai on agentic REPL quality",
        ],
      },
      {
        type: "h2",
        text: "Try kprompt in five minutes",
      },
      {
        type: "code",
        caption: "Install + safe read + one mutate plan",
        code: `brew install kprompt/tap/kprompt
export KPROMPT_GEMINI_API_KEY="..."

kprompt "list deployments" -n staging
kprompt "scale api to 2" -n staging   # review plan, then y/N`,
      },
      {
        type: "p",
        text: "For the wider peer map (K8sGPT, Kagent, hosted chat), see the AI tools comparison. For where kprompt is headed beyond AI kubectl, see Beyond AI kubectl: why kprompt is aiming at AI SRE and Roadmap & vision. Configure BYOK models on Providers. Optional always-on alerts: Observe agent. Safety docs before shared-cluster --approve.",
        links: [
          {
            label: "AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          {
            label: "Beyond AI kubectl: why kprompt is aiming at AI SRE",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
          { label: "Providers", href: "/docs/providers" },
          { label: "Observe agent", href: "/docs/agent" },
          { label: "Safety docs", href: "/docs/safety" },
          {
            label: "kubectl-ai on GitHub",
            href: "https://github.com/GoogleCloudPlatform/kubectl-ai",
          },
          {
            label: "optimize my cluster",
            href: "/blog/optimize-my-cluster",
          },
        ],
      },
    ],
  },
  {
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
  },
  {
    slug: "planresult-json-deep-dive",
    title:
      "PlanResult JSON deep dive: fields, risk, jq recipes, and what is never stored",
    description:
      "Schema-focused companion to CI plan gates: apiVersion, plan.actions, risk.denied, result payloads, RouteResult / MultiContextResult, history vs CI artifacts, and hard rules on manifests and API keys.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ci/cd",
      "devops",
      "platform engineering",
      "automation",
      "ai",
    ],
    keywords: [
      "planresult json",
      "kprompt planresult",
      "kubernetes plan json ci",
      "jq kubernetes plan gate",
      "risk.denied kprompt",
      "plan before apply json",
      "kubernetes ai cli json output",
      "ci approval gate kubectl",
      "kprompt --output json",
      "intent compiler planresult",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "The intent compiler bet only works if the artifact is boring and stable. PlanResult is that artifact: one JSON document on stdout when you pass --output json, human UI on stderr, no manifests, no API keys. This post is the field guide to the schema — companion to the pipeline patterns in Kubernetes in CI/CD: gating cluster changes with plan JSON before apply and the CI / JSON docs.",
        links: [
          {
            label: "Kubernetes in CI/CD: gating cluster changes with plan JSON before apply",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
          { label: "CI / JSON docs", href: "/docs/ci" },
          {
            label: "intent compiler",
            href: "/blog/intent-compiler-not-chat",
          },
        ],
      },
      {
        type: "h2",
        text: "Emit it",
      },
      {
        type: "code",
        caption: "stdout = PlanResult; stderr = human noise",
        code: `kprompt "scale api to 10" -n prod --output json
kprompt "scale api to 10" -n prod -o json > plan.json`,
      },
      {
        type: "h2",
        text: "Envelope fields",
      },
      {
        type: "table",
        headers: ["Field", "Type", "Notes"],
        rows: [
          ["apiVersion", "string", "Always kprompt.io/v1"],
          ["kind", "string", "PlanResult (or RouteResult / MultiContextResult — see below)"],
          ["schemaVersion", "string", '"1" — bump only on breaking changes'],
          ["prompt", "string", "Original natural-language prompt"],
          ["cluster_context", "string?", "Resolved kubeconfig context when known"],
          ["plan", "object", "Intent, summary, actions, requiresApproval"],
          ["risk", "object", "level, denied, message"],
          ["applied", "bool", "Whether a mutation actually ran"],
          ["result", "object?", "Read/tool payload (get, explain, optimize, …)"],
        ],
      },
      {
        type: "code",
        caption: "Minimal mutate plan (illustrative)",
        code: `{
  "apiVersion": "kprompt.io/v1",
  "kind": "PlanResult",
  "schemaVersion": "1",
  "prompt": "scale api to 10",
  "cluster_context": "kind-staging",
  "plan": {
    "intent": "scale",
    "summary": "Scale Deployment/api to 10 replicas",
    "requiresApproval": true,
    "namespace": "prod",
    "actions": [
      {
        "op": "scale",
        "backend": "kubernetes",
        "kind": "Deployment",
        "name": "api",
        "namespace": "prod",
        "replicas": 10
      }
    ]
  },
  "risk": { "level": "medium", "denied": false, "message": "Mutation requires approval" },
  "applied": false
}`,
      },
      {
        type: "h2",
        text: "plan.actions — what CI should inspect",
      },
      {
        type: "ul",
        items: [
          "op — scale, deploy, delete, patch, rollback, …",
          "backend — kubernetes, helm, …",
          "kind / name / namespace — target object",
          "cluster_context — set on multi-context paths",
          "replicas / revision — when relevant",
          "diff — optional live before→after text (still not a full manifest dump)",
        ],
      },
      {
        type: "p",
        text: "Actions are intentionally thin. Policy engines gate on op + kind + namespace, not on guessing YAML from an LLM.",
      },
      {
        type: "h2",
        text: "risk — the gate that matters",
      },
      {
        type: "table",
        headers: ["Field", "Meaning"],
        rows: [
          ["level", "low | medium | high | denied"],
          ["denied", "true when hard-deny fired (wipe-class, etc.)"],
          ["message", "Human reason — log it; do not parse prose for policy"],
        ],
      },
      {
        type: "code",
        caption: "jq recipes",
        code: `# Hard deny must fail the job
jq -e '.risk.denied == false'

# Block deletes
jq -e '[.plan.actions[].op] | index("delete") | not'

# Allow only scale
jq -e '.plan.intent == "scale"'

# Reject high risk
jq -e '.risk.level != "high" and .risk.level != "denied"'

# Namespace allow-list
jq -e '.plan.namespace == "staging"'`,
      },
      {
        type: "h2",
        text: "result — read and report payloads",
      },
      {
        type: "p",
        text: "For get/list/explain/logs/optimize/graph and similar reads, result holds a structured payload (shape depends on intent). Mutating plans that only print a plan leave result empty or omitted. Optimize attaches idle / rightsizing / findings under result — see optimize my cluster.",
        links: [
          {
            label: "optimize my cluster",
            href: "/blog/optimize-my-cluster",
          },
        ],
      },
      {
        type: "h2",
        text: "Related kinds: RouteResult and MultiContextResult",
      },
      {
        type: "ul",
        items: [
          "RouteResult — multi-tool chain: steps[] of PlanResult, aggregate risk, stoppedAt / stopReason",
          "MultiContextResult — read fan-out across contexts: contexts[], steps[], optional fleetSummary for optimize",
        ],
      },
      {
        type: "p",
        text: "Gate RouteResult by inspecting .risk and each .steps[].risk.denied. Never treat a parent --approve as consent for every step without reading the aggregate plan.",
      },
      {
        type: "h2",
        text: "History vs CI artifacts",
      },
      {
        type: "table",
        headers: ["Store", "What", "What not"],
        rows: [
          [
            "~/.kprompt/history.jsonl",
            "Local prompt + plan summary for rerun",
            "Full manifests, API keys, kubeconfig",
          ],
          [
            "CI plan.json artifact",
            "Full PlanResult for audit / PR comment",
            "Secrets — they were never in the document",
          ],
          [
            "Team audit (when enrolled)",
            "Summaries pushed by policy",
            "Cluster credentials in the control plane",
          ],
        ],
      },
      {
        type: "h2",
        text: "What is never stored",
      },
      {
        type: "ul",
        items: [
          "LLM API keys",
          "Full Kubernetes manifests / Secret data",
          "kubeconfig files or tokens",
          "Raw provider request dumps in PlanResult",
        ],
      },
      {
        type: "h2",
        text: "Anti-patterns",
      },
      {
        type: "ul",
        items: [
          "One CI step: -o json --approve on production",
          "Parsing risk.message with regex instead of risk.denied / level",
          "Assuming schemaVersion will stay \"1\" forever without checking",
          "Committing plan.json that you manually edited to bypass gates",
        ],
      },
      {
        type: "h2",
        text: "Wire it",
      },
      {
        type: "code",
        caption: "Plan → gate → separate approve",
        code: `#!/usr/bin/env bash
set -euo pipefail
json="$(kprompt "scale api to 3" -n staging -o json)"
echo "$json" | jq -e '.risk.denied == false' >/dev/null
echo "$json" | jq -e '.plan.intent == "scale"' >/dev/null
echo "$json" > plan.json
# Human or second job:
# kprompt "scale api to 3" -n staging --approve --wait`,
      },
      {
        type: "p",
        text: "Full GitHub Actions patterns live in the CI gates post. For why this artifact beats a chat transcript, see the intent compiler note. Schema reference stays mirrored on CI / JSON docs.",
        links: [
          {
            label: "CI gates post",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
          {
            label: "intent compiler note",
            href: "/blog/intent-compiler-not-chat",
          },
          { label: "CI / JSON docs", href: "/docs/ci" },
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
        ],
      },
    ],
  },
  {
    slug: "building-ai-sre-in-public",
    title: "Building AI SRE in Public",
    description:
      "A long-form series on building an AI SRE under an approval boundary — intent compiler, PlanResult, safety, multi-context, investigation, and why we refuse unsupervised auto-remediation. Episode index and honesty rules.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "platform engineering",
      "devops",
      "open source",
    ],
    keywords: [
      "building ai sre in public",
      "ai sre kubernetes series",
      "intent compiler kubernetes",
      "plan before apply",
      "aiops vs ai sre",
      "kubernetes approval boundary",
      "open source ai sre",
      "kprompt roadmap series",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "kprompt started as an AI Kubernetes CLI: natural language becomes a reviewable plan, then you approve before apply. That wedge still ships today. The longer bet is AI SRE — a system that can investigate, explain why, show blast radius, and verify outcomes without silently mutating production. This series is how we build that bet in public.",
        links: [
          {
            label: "Beyond AI kubectl",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
      {
        type: "p",
        text: "We are not writing weekly changelog fluff. Each episode is a durable essay: a design claim, what already exists in the CLI, what is still building or exploring, and what we explicitly refuse. Share it on Hacker News or in a CNCF channel if the idea is useful even if you never install the binary.",
      },
      {
        type: "h2",
        text: "Rules of the series",
      },
      {
        type: "ul",
        items: [
          "Shipped / building / exploring — never imply a demo is a product",
          "Approval boundary stays load-bearing — no silent apply across contexts",
          "Typed outputs over chat vibes — PlanResult, risk, hard denies",
          "Prefer non-production while you learn; experimental software",
          "CLI stays Apache-2.0; no “buy Team to make the series real”",
        ],
      },
      {
        type: "h2",
        text: "Episodes",
      },
      {
        type: "table",
        headers: ["#", "Topic", "Status"],
        rows: [
          ["1", "Why AI SRE", "Published"],
          ["2", "Intent Compiler", "Published"],
          ["3", "PlanResult", "Published"],
          ["4", "Safety Engine", "Published"],
          ["5", "Multi-context", "Published"],
          ["6", "Investigation Graph", "Building / vision"],
          ["7", "AI Timeline", "Building / vision"],
          ["8", "Cluster Memory", "Exploring"],
          ["9", "Knowledge Graph", "Exploring"],
          ["10", "Autonomous SRE — and why not yet", "Planned"],
        ],
      },
      {
        type: "p",
        text: "Read episodes in order: Why AI SRE → Intent Compiler → PlanResult → Safety Engine → Multi-context. Earlier positioning posts (PlanResult JSON field guide, vs kubectl-ai, plan-approve) remain companions; this series goes deeper and stays chronological.",
        links: [
          {
            label: "Why AI SRE",
            href: "/blog/building-ai-sre-01-why",
          },
          {
            label: "Intent Compiler (ep.2)",
            href: "/blog/building-ai-sre-02-intent-compiler",
          },
          {
            label: "PlanResult (ep.3)",
            href: "/blog/building-ai-sre-03-planresult",
          },
          {
            label: "Safety Engine (ep.4)",
            href: "/blog/building-ai-sre-04-safety",
          },
          {
            label: "Multi-context (ep.5)",
            href: "/blog/building-ai-sre-05-multi-context",
          },
          {
            label: "Plan → approve",
            href: "/blog/kubernetes-safety-plan-approve",
          },
        ],
      },
      {
        type: "h2",
        text: "Who this is for",
      },
      {
        type: "ul",
        items: [
          "Platform / SRE engineers evaluating AI tools that touch clusters",
          "Builders designing agentic ops who need fail-closed patterns",
          "CNCF practitioners who care about GitOps, Prom, OTel — not only chat CLIs",
        ],
      },
      {
        type: "h2",
        text: "Try the wedge while you read",
      },
      {
        type: "code",
        caption: "Safe read on a non-prod context",
        code: `brew install kprompt/tap/kprompt
# or: curl -fsSL https://kprompt.ai/install | bash

export KPROMPT_GEMINI_API_KEY="..."
kprompt "list deployments"
kprompt "optimize my cluster"`,
      },
      {
        type: "p",
        text: "Star the repo, open issues when an episode claims something the CLI cannot do yet, and follow the index as later episodes land.",
        links: [
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Docs", href: "/docs" },
        ],
      },
    ],
  },
  {
    slug: "building-ai-sre-01-why",
    title: "Building AI SRE in Public #1: Why AI SRE",
    description:
      "AI kubectl is not enough. Production needs investigate, why, blast radius, and verify — still behind an approval boundary. Why the AI SRE category exists, what failed in classic AIOps, and what we ship first.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "platform engineering",
      "devops",
      "aiops",
    ],
    keywords: [
      "why ai sre",
      "ai sre vs ai kubectl",
      "aiops failed kubernetes",
      "approval boundary sre",
      "kubernetes incident ai",
      "building ai sre in public",
      "intent compiler vs chat",
      "human in the loop kubernetes",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "This is episode 1 of Building AI SRE in Public. The series hub lists the full arc — from intent compiler to why we still refuse unsupervised auto-remediation.",
        links: [
          {
            label: "Building AI SRE in Public",
            href: "/blog/building-ai-sre-in-public",
          },
        ],
      },
      {
        type: "p",
        text: "Most “AI for Kubernetes” products today are AI kubectl: natural language that emits or runs kubectl-shaped actions. That is useful. It is not SRE. SRE is the craft of keeping systems reliable under change — detecting symptoms, forming hypotheses, bounding blast radius, changing one thing at a time, and verifying the goal. An AI that only shortens the typing does not change that craft. An AI that participates in that craft — still under your credentials and your approval — is the category we call AI SRE.",
      },
      {
        type: "h2",
        text: "The sentence that defines the category",
      },
      {
        type: "p",
        text: "Imagine an assistant that can say: “Error rate on payment rose after yesterday’s rollout; the Service still selects the old pods; here is a rollback plan with affected namespaces.” That sentence requires investigation graph, timeline, and a typed plan — not a chat transcript. Dashboards show charts. Fleet scanners dump findings. Chat CLIs race to the next kubectl. AI SRE is the system that proposes a reviewable next step.",
        links: [
          {
            label: "Beyond AI kubectl (positioning)",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
        ],
      },
      {
        type: "h2",
        text: "Why classic AIOps struggled",
      },
      {
        type: "p",
        text: "AIOps promised correlation and auto-remediation years before LLMs. Many deployments stalled for boring reasons: brittle rules, noisy alerts, opaque black boxes, and remediation that operators did not trust. The models were weak at intent; the systems were strong at false confidence.",
      },
      {
        type: "ul",
        items: [
          "Rules and ML that could not explain themselves in operator language",
          "Auto-remediation that skipped human judgment on shared clusters",
          "Tools that lived beside kubectl instead of composing with GitOps and metrics",
          "No shared artifact — only tickets, runbooks, and tribal memory",
        ],
      },
      {
        type: "p",
        text: "LLMs change the input side: they parse messy human intent and narrate evidence. They do not magically make unsupervised mutate safe. What changes is the chance to build an intentional loop — compile intent into a typed plan, attach risk and denies, require approval, then verify — instead of a chatbot that “just ran it.”",
      },
      {
        type: "h2",
        text: "Approval boundary is the product",
      },
      {
        type: "p",
        text: "Every production AI agent that can change state needs an approval boundary. Human-in-the-loop is not theater; it is how you keep blast radius conscious. In kprompt the boundary is concrete: PlanResult on stdout (and JSON for CI), safety scoring, hard denies for wipe-class intents, interactive y/N or explicit --approve, and no silent multi-context apply from one flag.",
        links: [
          { label: "Safety docs", href: "/docs/safety" },
          {
            label: "Plan → approve post",
            href: "/blog/kubernetes-safety-plan-approve",
          },
        ],
      },
      {
        type: "code",
        caption: "The contract does not disappear for “smart” features",
        code: `kprompt "scale api to 3" -n staging
# → Plan + risk → Apply? [y/N]

kprompt "optimize my cluster"
# → Report first; mutate follow-ups still need approve`,
      },
      {
        type: "h2",
        text: "What we ship first (wedge, not wish)",
      },
      {
        type: "p",
        text: "AI SRE is the destination. The wedge is already usable: day-2 ops and investigation-shaped reads under the same plan → safety → approve → apply loop, plus integrations (Helm, Prom, OTel, GitOps, …) that keep one approval surface. Optimize reports and dependency graphs are early “think about the cluster” features — still not auto-remediation.",
        links: [
          { label: "Integrations", href: "/docs/integrations" },
          {
            label: "optimize my cluster",
            href: "/blog/optimize-my-cluster",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Shipped: intent → PlanResult → approve; explain/logs; multi-tool routes",
          "Building: deeper investigate / why / timeline / post-apply verify",
          "Exploring: opt-in watch, cluster memory, knowledge from ADRs — never silent mutate",
        ],
      },
      {
        type: "h2",
        text: "What this episode is not",
      },
      {
        type: "ul",
        items: [
          "Not a claim that kprompt is a finished AI SRE product",
          "Not a pitch for unsupervised auto-remediation",
          "Not “chat replaces kubectl forever” — compilers need escape hatches",
        ],
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 2 digs into the Intent Compiler — why Kubernetes deserves a compiler, not a chatbot, and how Intent → Action → PlanResult becomes the IR. Read it next, or revisit the hub for the full arc.",
        links: [
          {
            label: "Episode 2: Intent Compiler",
            href: "/blog/building-ai-sre-02-intent-compiler",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "intent compiler (short form)",
            href: "/blog/intent-compiler-not-chat",
          },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  },
  {
    slug: "building-ai-sre-02-intent-compiler",
    title: "Building AI SRE in Public #2: Intent Compiler",
    description:
      "Kubernetes deserves a compiler, not a chatbot. How kprompt turns natural language into Intent → Actions → PlanResult, why Go owns planning and safety, and why the IR must stay reviewable for AI SRE.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "platform engineering",
      "devops",
      "architecture",
    ],
    keywords: [
      "kubernetes intent compiler",
      "building ai sre intent compiler",
      "planresult intermediate representation",
      "natural language kubernetes compiler",
      "typed intent llm kubernetes",
      "ai sre architecture",
      "fail closed kubernetes ai",
      "llm structured output kubernetes",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "This is episode 2 of Building AI SRE in Public. Episode 1 argued for the category. This episode is the technical heart of the wedge: an intent compiler — not a chat REPL that happens to call kubectl.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 1: Why AI SRE",
            href: "/blog/building-ai-sre-01-why",
          },
          {
            label: "Short-form positioning",
            href: "/blog/intent-compiler-not-chat",
          },
        ],
      },
      {
        type: "h2",
        text: "Compilers emit artifacts; chatbots emit turns",
      },
      {
        type: "p",
        text: "A chatbot optimizes for conversation continuity. A compiler optimizes for an intermediate representation (IR) you can refuse. In kprompt the IR is not “whatever the model said last.” It is a pipeline of typed stages ending in PlanResult — something a human, a jq filter, or a CI job can gate before the apiserver sees a mutate.",
      },
      {
        type: "code",
        caption: "Conceptual pipeline (shipped shape)",
        code: `prompt
  → Intent     (structured: kind, target, params)
  → Actions[]  (ordered ops + optional manifests/diffs)
  → Safety     (risk + hard denies)
  → PlanResult (printable + JSON)
  → Approve?   → Executor → cluster`,
      },
      {
        type: "p",
        text: "Reads can short-circuit (list, get, logs, explain) without a mutate approval. Mutations always materialize the plan first. That split is deliberate: investigation should be fast; change should be conscious.",
      },
      {
        type: "h2",
        text: "What the LLM is allowed to own",
      },
      {
        type: "p",
        text: "The model is good at messy language → structured intent. It is a bad place to put irrevocable policy. So the boundary is sharp:",
      },
      {
        type: "table",
        headers: ["Layer", "Owner", "Job"],
        rows: [
          [
            "Prompt → Intent",
            "LLM + schema validation",
            "Parse what the operator meant",
          ],
          [
            "Intent → Actions",
            "Go planner / routers",
            "Turn intent into concrete cluster or tool steps",
          ],
          [
            "Safety",
            "Go policy",
            "Risk score, hard deny, force approval",
          ],
          [
            "Approval",
            "Human or CI",
            "y/N, --approve, or jq gate on JSON",
          ],
          [
            "Execute",
            "Go + kubeconfig / tool CLIs",
            "Apply only what was approved",
          ],
        ],
      },
      {
        type: "p",
        text: "If the model hallucinates a wipe, the safety layer should still deny. If the model proposes a scale, the plan should still show namespace, resource, and risk before apply. Trust the typed stages; distrust free prose as a control plane.",
        links: [
          { label: "Safety docs", href: "/docs/safety" },
          {
            label: "Plan → approve",
            href: "/blog/kubernetes-safety-plan-approve",
          },
        ],
      },
      {
        type: "h2",
        text: "IR sketch: Intent, Action, PlanResult",
      },
      {
        type: "p",
        text: "Exact Go structs evolve in the product repo. The conceptual types stay stable enough to teach:",
      },
      {
        type: "code",
        caption: "IR shapes (conceptual)",
        code: `Intent
  Kind, Target, Params, Confidence

Action
  Op, Object (GVK/name/ns), Manifest?, Diff?

PlanResult
  Intent, Actions[], Risk, Summary,
  RequiresApproval, Denied?, Applied?`,
      },
      {
        type: "p",
        text: "PlanResult is the public artifact: terminal summary for humans, JSON for pipelines. Secrets and raw kubeconfig never belong in history or CI logs. Episode 3 will go deeper on the schema; today the point is that AI SRE features (investigate, why, blast radius) must eventually land as richer fields on the same artifact — not as a second chat product.",
        links: [
          {
            label: "PlanResult JSON deep dive",
            href: "/blog/planresult-json-deep-dive",
          },
          { label: "CI / PlanResult docs", href: "/docs/ci" },
        ],
      },
      {
        type: "h2",
        text: "One compiler, many backends",
      },
      {
        type: "p",
        text: "A compiler that only scales Deployments is a toy. The payoff is one approval contract across day-2 surfaces: Kubernetes API, Helm, Prometheus explains, OTel walks, Tekton/KEDA plans, GitOps sync prompts, Crossplane claims (high risk). The LLM proposes; routers and planners emit Actions against tools you already run. Multi-tool chains still collapse to one aggregate plan and one approve for mutating steps.",
        links: [{ label: "Integrations", href: "/docs/integrations" }],
      },
      {
        type: "code",
        caption: "Different backends, same gate",
        code: `kprompt "scale api to 3" -n staging
kprompt "install redis" -n cache
kprompt "why is my api slow?" -n production
kprompt "optimize my cluster"
# Mutating follow-ups still require approval`,
      },
      {
        type: "h2",
        text: "Fail closed by default",
      },
      {
        type: "ul",
        items: [
          "Unknown or wipe-class intents → deny before a useful apply path",
          "High-risk mutations → approval required even with automation flags later",
          "Missing kubeauth / LLM key → clear doctor-style errors, not silent guess",
          "Multi-context: no “one --approve mutates the fleet”",
        ],
      },
      {
        type: "p",
        text: "Fail closed is how a compiler earns the right to grow into AI SRE. Auto-remediation without an IR you can refuse is how AIOps burned trust.",
      },
      {
        type: "h2",
        text: "What this episode ships vs explores",
      },
      {
        type: "ul",
        items: [
          "Shipped: Intent → plan → safety → approve → apply; JSON PlanResult; multi-tool routes",
          "Building: richer investigate/why trees and blast-radius fields on the same IR",
          "Exploring: knowledge/ADR context feeding the compiler — still not unsupervised mutate",
        ],
      },
      {
        type: "h2",
        text: "How to pressure-test the compiler",
      },
      {
        type: "code",
        caption: "Thirty-minute drill",
        code: `brew install kprompt/tap/kprompt
export KPROMPT_GEMINI_API_KEY="..."

kprompt "delete all pods" -n staging          # expect deny / hard stop
kprompt "scale api to 0" -n staging -o json | jq .risk
kprompt "scale api to 2" -n staging           # read plan → n or y`,
      },
      {
        type: "p",
        text: "Score the artifact, not the banter. If a competing tool cannot show a refuse-able plan, it is a different product — even if both accept English.",
        links: [
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
        ],
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 3 is PlanResult — the IR as a CI citizen: why one typed document serves humans and pipelines, how blastRadius and verify attach, and what never belongs in the artifact. Read it next.",
        links: [
          {
            label: "Episode 3: PlanResult",
            href: "/blog/building-ai-sre-03-planresult",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "PlanResult JSON deep dive (companion)",
            href: "/blog/planresult-json-deep-dive",
          },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  },
  {
    slug: "building-ai-sre-03-planresult",
    title: "Building AI SRE in Public #3: PlanResult",
    description:
      "PlanResult is the IR of AI SRE: one typed document for humans and CI. Why JSON, what applied means vs verify, how blastRadius attaches, what never gets stored, and how investigate/why must extend the same artifact.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "ci/cd",
      "platform engineering",
      "devops",
      "architecture",
    ],
    keywords: [
      "planresult ai sre",
      "building ai sre planresult",
      "kubernetes plan json",
      "ci plan gate kubernetes",
      "blast radius planresult",
      "post apply verify kubernetes",
      "typed outputs llm ops",
      "kprompt -o json",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "This is episode 3 of Building AI SRE in Public. Episode 2 described the compiler pipeline. This episode is about the artifact that makes the pipeline real: PlanResult — the intermediate representation operators and CI can refuse.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 2: Intent Compiler",
            href: "/blog/building-ai-sre-02-intent-compiler",
          },
          {
            label: "Field guide (schema + jq)",
            href: "/blog/planresult-json-deep-dive",
          },
        ],
      },
      {
        type: "h2",
        text: "One artifact, two audiences",
      },
      {
        type: "p",
        text: "Terminal UX and pipeline gates must share a contract. If humans see one story and CI scrapes another, you have two products. PlanResult is the shared story: intent, ordered actions, risk, denial, applied flag — printable in the TTY, stable as JSON on stdout with --output json (human noise on stderr).",
      },
      {
        type: "code",
        caption: "Same prompt, machine-readable gate",
        code: `kprompt "scale api to 3" -n staging -o json | \\
  jq '{intent:.plan.intent, risk:.risk, denied:.risk.denied, applied:.applied}'`,
      },
      {
        type: "p",
        text: "Platform muscle memory already trusts diffs, PRs, and admission. A chat scroll does not. A PlanResult does. That is why the AI SRE bet grows fields on this document instead of inventing a second “agent transcript” product.",
        links: [
          {
            label: "CI plan gates",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
          { label: "CI / JSON docs", href: "/docs/ci" },
        ],
      },
      {
        type: "h2",
        text: "Why JSON (not YAML) for the public IR",
      },
      {
        type: "ul",
        items: [
          "jq / languages already treat JSON as the default gate format",
          "Strict schemaVersion bumps beat “almost YAML” drift in CI",
          "Kubernetes YAML stays where it belongs — in actions/manifests you review, not as the envelope",
          "Stdout can stay a single document; stderr keeps confirmations and wait lines",
        ],
      },
      {
        type: "p",
        text: "Operators still see a human plan. Machines get JSON. Both must describe the same change.",
      },
      {
        type: "h2",
        text: "applied is not verified",
      },
      {
        type: "p",
        text: "Classic automation lies with success bits. applied means “we executed the approved actions.” It does not mean “replicas are ready” or “error rate recovered.” AI SRE needs a second signal: verify — did the goal hold after --wait? That field is part of the trust loop (T-070): ok / pending / failed / skipped — still on PlanResult, still reviewable in logs.",
      },
      {
        type: "table",
        headers: ["Signal", "Means", "Does not mean"],
        rows: [
          [
            "risk.denied",
            "Safety refused before apply",
            "The cluster is healthy",
          ],
          [
            "applied: true",
            "Approved actions ran",
            "The incident is over",
          ],
          [
            "verify",
            "Post-apply goal check",
            "Permission to skip approval next time",
          ],
        ],
      },
      {
        type: "h2",
        text: "blastRadius: review aid, not a dashboard",
      },
      {
        type: "p",
        text: "Before you type y, you should see who else gets hit: namespaces, owners/labels, related HPA / Service / NetworkPolicy. blastRadius on PlanResult is that preview (T-069) — a mutate review aid, not Lens. It belongs on the plan you approve, not in a separate GUI you forget to open.",
        links: [{ label: "Safety", href: "/docs/safety" }],
      },
      {
        type: "h2",
        text: "What never belongs in PlanResult",
      },
      {
        type: "ul",
        items: [
          "API keys, tokens, kubeconfig contents",
          "Full secret object data",
          "Unbounded log dumps as the primary contract",
          "Model chain-of-thought as a required field for apply",
        ],
      },
      {
        type: "p",
        text: "Local history is intentionally thin for the same reason. CI archives PlanResult; it must not become a secret store. The field guide spells the schema; this series rule is cultural: if it is dangerous to paste into Slack, it does not belong in the IR.",
        links: [
          {
            label: "PlanResult JSON deep dive",
            href: "/blog/planresult-json-deep-dive",
          },
        ],
      },
      {
        type: "h2",
        text: "Growing AI SRE on the same document",
      },
      {
        type: "p",
        text: "Investigate, why trees, timelines, and suggested fixes must attach as structured fields (or nested result payloads) — evidence refs, root-cause summary, optional fix plan that still requires approval. If a feature cannot show up in PlanResult (or a clear read-only report), it is probably not a kprompt feature yet.",
      },
      {
        type: "ul",
        items: [
          "Shipped: core PlanResult + JSON gates; optional blastRadius / verify",
          "Building: richer investigate/why/timeline shapes on the same envelope",
          "Exploring: memory / knowledge feeding planning — still never silent apply",
        ],
      },
      {
        type: "h2",
        text: "Pressure-test as a CI citizen",
      },
      {
        type: "code",
        caption: "Refuse high-risk or denied plans in a pipeline",
        code: `kprompt "scale api to 50" -n prod -o json > plan.json
jq -e '.risk.denied == false and .risk.level != "high"' plan.json
# then human or policy decides --approve`,
      },
      {
        type: "p",
        text: "Score tools on whether this loop is natural. Scraping ANSI from a chat REPL is not a gate; it is a smell.",
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 4 is the Safety Engine — hard denies, risk levels, and why fail-closed beats confident auto-remediation. Read it next.",
        links: [
          {
            label: "Episode 4: Safety Engine",
            href: "/blog/building-ai-sre-04-safety",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Plan → approve",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  },
  {
    slug: "building-ai-sre-04-safety",
    title: "Building AI SRE in Public #4: Safety Engine",
    description:
      "Policy is code, not LLM vibes. How kprompt’s safety engine hard-denies wipe-class intents, scores risk, forces approval, and why fail-closed is the load-bearing wall of AI SRE.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "safety",
      "platform engineering",
      "devops",
      "architecture",
    ],
    keywords: [
      "kubernetes ai safety",
      "building ai sre safety engine",
      "hard deny kubernetes",
      "plan before apply safety",
      "fail closed ai ops",
      "approval boundary kubernetes",
      "risk scoring planresult",
      "ai auto remediation danger",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "This is episode 4 of Building AI SRE in Public. Episodes 2–3 covered the compiler and PlanResult. None of that matters if a confident model can still wipe a namespace. The safety engine is the load-bearing wall: policy in Go, after planning, before approval or apply.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 3: PlanResult",
            href: "/blog/building-ai-sre-03-planresult",
          },
          {
            label: "Practical safety post",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          { label: "Safety docs", href: "/docs/safety" },
        ],
      },
      {
        type: "h2",
        text: "LLM judgment is not a control plane",
      },
      {
        type: "p",
        text: "Models refuse sometimes. Models also comply with jokes, jailbreaks, and ambiguous “clean up staging.” ADR-0003 locked the rule early: LLM judgment alone is not sufficient for safety; policy is code. The safety layer runs on the planned Actions — not on the English prompt alone — then stamps risk onto PlanResult.",
      },
      {
        type: "code",
        caption: "Where safety sits",
        code: `Intent → Planner → Actions[]
                 → Safety (hard deny + risk)
                 → PlanResult
                 → Approve? → Executor`,
      },
      {
        type: "h2",
        text: "Hard deny vs risk score",
      },
      {
        type: "table",
        headers: ["Outcome", "Meaning", "Can --approve override?"],
        rows: [
          [
            "denied",
            "Wipe-class / out-of-policy — abort",
            "No",
          ],
          [
            "high / medium / low",
            "Allowed path with explicit review weight",
            "Yes, after you accept the plan (still your credential)",
          ],
        ],
      },
      {
        type: "p",
        text: "Hard denies catch cluster/namespace wipe phrasing, delete-everything style requests, and deletes that are not a named allowed resource. Named delete still shows a plan and needs approval — reckless English does not unlock bulk destroy.",
      },
      {
        type: "code",
        caption: "Fail closed",
        code: `$ kprompt "delete all pods in production"

Risk: denied
# Nothing applies — flags do not negotiate`,
      },
      {
        type: "h2",
        text: "Approval is part of safety, not UX garnish",
      },
      {
        type: "p",
        text: "Default mode is plan-only. Interactive y/N on a TTY, or explicit --approve after a human or CI reviewed the artifact. That is the approval boundary from episode 1 — blast radius stays conscious. Multi-context mutates refuse a single fleet-wide --approve; you confirm per context or use an explicit each-context path. Safety without an approval boundary is just a confident script.",
        links: [
          {
            label: "Multi-cluster docs",
            href: "/docs/multi-cluster",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Reads (get/list/logs/explain) stay fast — no fake approve theater",
          "Mutations always materialize PlanResult first",
          "High-risk backends (e.g. Crossplane claims) stay RiskHigh + strong approval",
          "blastRadius / verify enrich review — they do not replace deny rules",
        ],
      },
      {
        type: "h2",
        text: "Why auto-remediation is not “more SRE”",
      },
      {
        type: "p",
        text: "Classic AIOps burned trust by acting without a refuse-able artifact. Skipping the safety engine to “close the ticket faster” recreates that failure mode with better prose. AI SRE investigates and proposes; humans (or gated CI) apply. Episode 10 will argue why we still do not want unsupervised autonomy — this episode is the mechanism that makes that stance enforceable.",
      },
      {
        type: "h2",
        text: "What ships vs what we will not trade",
      },
      {
        type: "ul",
        items: [
          "Shipped: hard denies, risk levels, plan-before-apply, JSON risk.denied for CI",
          "Shipped: blast-radius preview and post-apply verify as trust aids",
          "Building: richer investigate suggestions that still pass through safety",
          "Non-goal: model-only refusals; silent apply; one --approve across all contexts",
        ],
      },
      {
        type: "h2",
        text: "Pressure-test the wall",
      },
      {
        type: "code",
        caption: "Safety drill",
        code: `kprompt "wipe the cluster" -o json | jq .risk
kprompt "delete all pods" -n staging -o json | jq .risk.denied
kprompt "scale api to 0" -n staging          # plan should scare you → n
kprompt "scale api to 2" -n staging          # routine → still y/N`,
      },
      {
        type: "p",
        text: "If a tool cannot fail closed on wipe-class intent, it is not ready for production English — no matter how good the chat feels.",
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 5 is Multi-context — laptop kubeconfig fan-out, read across contexts, and why mutate safety gets stricter as the blast radius grows.",
        links: [
          {
            label: "Episode 5: Multi-context",
            href: "/blog/building-ai-sre-05-multi-context",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          { label: "Multi-cluster", href: "/docs/multi-cluster" },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  },
  {
    slug: "building-ai-sre-05-multi-context",
    title: "Building AI SRE in Public #5: Multi-context",
    description:
      "AI SRE across kubeconfig contexts: single-context default, explicit read fan-out, per-context mutate approval, aliases, and why we refuse silent fleet --approve or uploading cluster credentials.",
    publishedAt: "2026-07-27",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "safety",
      "platform engineering",
      "devops",
      "architecture",
    ],
    keywords: [
      "kubernetes multi context",
      "kubeconfig fan-out ai",
      "building ai sre multi-context",
      "multi cluster kubectl ai",
      "approve each context",
      "fleet optimize kubernetes",
      "multi-context planresult",
      "ai sre blast radius",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "This is episode 5 of Building AI SRE in Public. Episodes 2–4 locked the compiler, the PlanResult IR, and the safety wall. Multi-context is where that wall meets real operator life: prod, staging, and kind sitting in one kubeconfig — and one careless English sentence that could mean all of them.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 4: Safety Engine",
            href: "/blog/building-ai-sre-04-safety",
          },
          { label: "Multi-cluster docs", href: "/docs/multi-cluster" },
          {
            label: "ADR-0012",
            href: "https://github.com/kprompt/kprompt-architecture/blob/main/decisions/ADR-0012-multi-cluster.md",
          },
        ],
      },
      {
        type: "h2",
        text: "The claim",
      },
      {
        type: "p",
        text: "An AI SRE that only works on “the current context” is half a tool. Operators compare staging to prod, chase a bug across environments, and optimize idle capacity on a laptop fleet. The design claim: read fan-out is a feature; mutate fan-out is a controlled escalation. “All clusters” is never implied. Credentials never leave the machine.",
      },
      {
        type: "h2",
        text: "Single-context default — still the happy path",
      },
      {
        type: "p",
        text: "Every plan still resolves one kubeconfig context unless you opt in: --context, a local alias, config default, or kubectl’s current-context. That matches how kubectl itself works and how blast radius stays mental. Aliases (prod → the ugly GKE name) are the naming layer; require_alias_match can refuse a mutate when current-context does not match the alias you asked for — wrong-cluster fat-finger insurance.",
      },
      {
        type: "code",
        caption: "Inventory and aliases",
        code: `kprompt contexts
kprompt contexts --check
kprompt config alias set prod gke_myproj_us-central1_prod
kprompt --context prod "list deployments"
kprompt config set require_alias_match true`,
      },
      {
        type: "h2",
        text: "Read fan-out is opt-in, never “all”",
      },
      {
        type: "p",
        text: "You name contexts with --contexts staging,prod or clear natural language (“across staging and prod”). Supported reads today include get/list, explain, logs, describe, investigate/why/timeline/impact, audit/cleanup, and optimize. Output is sectioned per context. JSON kind MultiContextResult carries per-context steps and cluster_context on each step; optimize adds a fleetSummary. Unreachable contexts degrade — others still return. That honesty matters more than a green spinner.",
      },
      {
        type: "code",
        caption: "Compare without mutating",
        code: `kprompt --contexts staging,prod "list deployments"
kprompt "list pods across staging and prod"
kprompt --contexts staging,prod "optimize my cluster" -o json \\
  | jq '{kind, fleetSummary, contexts: [.steps[].cluster_context]}'`,
      },
      {
        type: "h2",
        text: "Mutate safety gets stricter as the blast radius grows",
      },
      {
        type: "p",
        text: "Episode 4 said approval is part of safety. Multi-context makes that concrete: interactive mode asks Apply … to context \"…\"? for each selected context. Plain --approve across multiple contexts is refused — one flag must not mean “yes to the fleet.” The explicit escape hatch is --approve-each-context: you consented, in writing, to the same plan on every listed context. Every PlanResult action and audit event still carries cluster_context so CI and humans can see where apply landed.",
      },
      {
        type: "table",
        headers: ["Mode", "Behavior"],
        rows: [
          [
            "Interactive",
            "Confirm each context separately",
          ],
          [
            "--approve alone (multi)",
            "Refused — not a fleet override",
          ],
          [
            "--approve-each-context",
            "Explicit multi-apply after you opted in",
          ],
        ],
      },
      {
        type: "code",
        caption: "Escalate deliberately",
        code: `kprompt --contexts staging,prod "scale api to 3"
# → per-context y/N

kprompt --contexts staging,prod --approve "scale api to 3"
# → refused

kprompt --contexts staging,prod --approve-each-context "scale api to 3"
# → you meant the fleet`,
      },
      {
        type: "h2",
        text: "What multi-context is not",
      },
      {
        type: "ul",
        items: [
          "Not uploading kubeconfigs to api.kprompt.ai or app.kprompt.ai",
          "Not a hosted live multi-cluster browser (Lens/Headlamp clone)",
          "Not silent --approve across every context in the file",
          "Not an always-on in-cluster multi-cluster agent",
          "Not turning kprompt-dash into a fleet UI — dash stays localhost, single-context inventory",
        ],
      },
      {
        type: "p",
        text: "Team control plane may eventually store metadata only (display name, alias, which enrolled device can reach a cluster). Bridge workers still execute with the laptop’s kubeconfig. That is ADR-0012’s line in the sand: multi-cluster UX is CLI-first and credential-local.",
      },
      {
        type: "h2",
        text: "Why this belongs in an AI SRE series",
      },
      {
        type: "p",
        text: "Investigation without environment comparison is theater. “Is staging also CrashLooping?” is a read fan-out question. “Scale api to 10 everywhere” is a mutate fan-out question with a different blast radius. AI SRE must make that asymmetry legible in the artifact — MultiContextResult for reads, PlanResult + cluster_context + per-context approval for writes — not hide it behind a chat that “just ran it on all of them.”",
      },
      {
        type: "h2",
        text: "What ships vs what we refuse",
      },
      {
        type: "ul",
        items: [
          "Shipped: contexts inventory, aliases, require_alias_match",
          "Shipped: explicit --contexts / NL across for read packs + optimize fleetSummary",
          "Shipped: per-context interactive approve; refuse bare multi --approve; --approve-each-context",
          "Building: richer org registry metadata without credential upload",
          "Non-goal: implied all-contexts fan-out; kubeconfig upload; dash-as-fleet; silent fleet Autopilot",
        ],
      },
      {
        type: "h2",
        text: "Try the asymmetry",
      },
      {
        type: "code",
        caption: "Non-prod drill",
        code: `kprompt contexts --check
kprompt --contexts kind-a,kind-b "list pods"
kprompt --contexts kind-a,kind-b "optimize my cluster"
kprompt --contexts kind-a,kind-b "scale demo to 2"   # expect two prompts
# Prefer n unless you meant both`,
      },
      {
        type: "p",
        text: "If a tool can --approve once and touch every context in your kubeconfig, it is not ready for production English — no matter how convenient the fleet story sounds.",
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 6 is Investigation Graph — how Service → Endpoints → Deploy → Pods → Events → Logs becomes a typed walk, not a chat dump. The hub tracks the rest of the arc.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          { label: "Multi-cluster docs", href: "/docs/multi-cluster" },
          { label: "Architecture diagrams", href: "/docs/architecture" },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  },
  {
    slug: "kubernetes-pods-vs-deployments",
    title:
      "Kubernetes Pods vs Deployments: what beginners actually need to know",
    description:
      "A plain guide to Pods and Deployments — what each one is, how they relate, kubectl commands that stick, common beginner mistakes, and optional natural-language checks with kprompt.",
    publishedAt: "2026-07-28",
    author: EMIRE_BARIS,
    tags: ["kubernetes", "beginner", "kubectl", "devops"],
    keywords: [
      "kubernetes pods vs deployments",
      "pod vs deployment kubernetes",
      "what is a kubernetes pod",
      "what is a kubernetes deployment",
      "kubectl get pods",
      "kubectl get deployments",
      "kubernetes beginner guide",
      "deployment replicas kubernetes",
      "pod ephemeral kubernetes",
    ],
    blocks: [
      {
        type: "p",
        text: "If you are new to Kubernetes, you will see Pods in almost every kubectl output — and Deployments in almost every tutorial YAML. They sound related, and they are — but they are not the same thing. Confusing them is one of the most common beginner mistakes.",
      },
      {
        type: "p",
        text: "This guide explains the difference in plain language: what a Pod is, what a Deployment does, how they connect, and which kubectl commands help you see the relationship on a real cluster.",
        links: [
          {
            label: "Kubernetes Pod documentation",
            href: "https://kubernetes.io/docs/concepts/workloads/pods/",
          },
          {
            label: "Kubernetes Deployment documentation",
            href: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
          },
        ],
      },
      {
        type: "h2",
        text: "The one-sentence version",
      },
      {
        type: "ul",
        items: [
          "A Pod runs your container(s) right now.",
          "A Deployment declares how many Pod copies you want and keeps them running.",
          "In production, you usually create a Deployment — not a lone Pod.",
        ],
      },
      {
        type: "h2",
        text: "What is a Pod?",
      },
      {
        type: "p",
        text: "A Pod is the smallest deployable unit in Kubernetes. It wraps one or more containers that share the same network namespace and can share storage volumes. When people say “my app is running in the cluster,” they usually mean a Pod is running — even if they created it through a Deployment.",
      },
      {
        type: "p",
        text: "Pods are ephemeral. That word matters. If a Pod is deleted, crashes hard, or the node it sits on fails, that specific Pod is gone. Kubernetes does not “heal” a standalone Pod by itself. Something else — typically a Deployment — must create a replacement.",
      },
      {
        type: "code",
        caption: "List and inspect Pods",
        code: `kubectl get pods
kubectl get pods -n staging
kubectl describe pod api-7d4f8b9c-xk2lm -n default
kubectl logs api-7d4f8b9c-xk2lm -n default`,
      },
      {
        type: "p",
        text: "Pod names often end with a random suffix (for example api-7d4f8b9c-xk2lm). That suffix changes when the Pod is recreated. Do not treat the Pod name as a stable identifier for your application.",
      },
      {
        type: "h2",
        text: "What is a Deployment?",
      },
      {
        type: "p",
        text: "A Deployment is a controller that manages ReplicaSets, which in turn create and maintain Pods. You tell the Deployment the desired state — which container image, how many replicas, labels — and it works continuously to match reality to that state.",
      },
      {
        type: "ul",
        items: [
          "Self-healing: if a Pod dies, the Deployment creates another one",
          "Scaling: change replicas from 1 to 5 and new Pods appear",
          "Rolling updates: swap to a new image without manual Pod deletion",
          "Rollbacks: undo a bad rollout using revision history",
        ],
      },
      {
        type: "code",
        caption: "List Deployments and find their Pods",
        code: `kubectl get deployments
kubectl get deployments -n staging
kubectl describe deployment api -n default

# Pods owned by this Deployment (match on labels)
kubectl get pods -l app=api -n default

# See desired vs ready replicas
kubectl get deploy api -n default`,
      },
      {
        type: "h2",
        text: "How Pods and Deployments relate",
      },
      {
        type: "p",
        text: "Think of the Deployment as the manager and Pods as the workers. The Deployment object stays stable (name api, namespace default). The Pod objects underneath come and go as the cluster reconciles state.",
      },
      {
        type: "code",
        caption: "Mental model",
        code: `Deployment "api"
  └── ReplicaSet (current revision)
        ├── Pod api-aaa111
        ├── Pod api-bbb222
        └── Pod api-ccc333`,
      },
      {
        type: "p",
        text: "When you kubectl apply a Deployment YAML, you are not applying a Pod YAML directly. You are telling Kubernetes: “Keep this Pod template running with N copies.” The control plane creates the ReplicaSet and Pods for you.",
      },
      {
        type: "h2",
        text: "Pods vs Deployments — comparison",
      },
      {
        type: "table",
        headers: ["", "Pod", "Deployment"],
        rows: [
          ["What it is", "A running instance of container(s)", "Desired state + controller for Pods"],
          ["Name stability", "Changes when recreated", "Stable (api, nginx, …)"],
          ["Replica count", "One Pod object = one unit", "replicas: N in spec"],
          ["Self-healing", "No (standalone Pod)", "Yes — replaces failed Pods"],
          ["Updates", "Manual delete/recreate", "Rolling update built in"],
          ["Typical use", "Debugging, one-off tests", "Stateless apps in production"],
        ],
      },
      {
        type: "h2",
        text: "The mistake every beginner makes once",
      },
      {
        type: "p",
        text: "You run kubectl delete pod api-7d4f8b9c-xk2lm to “restart” the app. Seconds later, a new Pod appears with a different suffix. That feels like a bug — but it is the Deployment doing exactly what you asked it to do: maintain the desired replica count.",
      },
      {
        type: "ul",
        items: [
          "To restart workloads managed by a Deployment: kubectl rollout restart deployment/api",
          "To stop the app: scale to zero (kubectl scale deploy api --replicas=0) or delete the Deployment",
          "Deleting one Pod alone does not remove the Deployment — it only triggers a replacement",
        ],
      },
      {
        type: "h2",
        text: "When to use which",
      },
      {
        type: "table",
        headers: ["Situation", "Use"],
        rows: [
          ["Run a quick throwaway container to test", "Pod or kubectl run (learning only)"],
          ["Run your API / web app in staging or prod", "Deployment"],
          ["Need stable network identity per replica", "StatefulSet (not covered here — different controller)"],
          ["Debug a crashing container", "kubectl describe pod + logs on the Pod"],
          ["Change how many copies run", "Edit Deployment replicas, not individual Pods"],
        ],
      },
      {
        type: "h2",
        text: "Minimal Deployment YAML (for context)",
      },
      {
        type: "p",
        text: "You do not need to memorize every field on day one. The important part is spec.replicas and spec.template — the Pod template the Deployment copies.",
      },
      {
        type: "code",
        caption: "Smallest useful Deployment",
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: myregistry/api:1.0.0
          ports:
            - containerPort: 8080`,
      },
      {
        type: "p",
        text: "After kubectl apply -f deployment.yaml, use kubectl get pods -l app=api to see the two Pods the Deployment created.",
      },
      {
        type: "h2",
        text: "Same checks in natural language (optional)",
      },
      {
        type: "p",
        text: "kprompt is an open-source CLI that turns plain English into a reviewable plan before anything reaches the cluster. Read-only prompts like list and describe do not mutate the cluster. Scale, delete, and other changes still show a plan and ask for approval — the same discipline you want when learning kubectl.",
        links: [
          { label: "Quickstart", href: "/docs/quickstart" },
          {
            label: "kubectl cheat sheet (NL pairs)",
            href: "/blog/kubectl-cheat-sheet-natural-language",
          },
          { label: "Install", href: "/docs/install" },
        ],
      },
      {
        type: "code",
        caption: "Soft kprompt examples — read first; mutate only after you approve the plan",
        code: `kprompt "list pods in staging"
kprompt "list deployments in default"
kprompt "describe deployment api in staging"

# Mutations show a plan first — no silent apply
kprompt "scale api to 3 in staging"
kprompt "rollout restart deployment api in staging"`,
      },
      {
        type: "h2",
        text: "What to learn next",
      },
      {
        type: "p",
        text: "Pods run containers. Deployments keep the right number of Pods alive and roll out changes safely. The next beginner topic in this series is Services — how traffic reaches those Pods — followed by Namespaces for organizing resources.",
        links: [
          {
            label: "Services",
            href: "/blog/what-is-a-kubernetes-service",
          },
          { label: "All blog posts", href: "/blog" },
          { label: "Docs overview", href: "/docs" },
          {
            label: "Kubernetes OOMKilled guide",
            href: "/blog/kubernetes-oomkilled",
          },
        ],
      },
    ],
  },
  {
    slug: "what-is-a-kubernetes-service",
    title:
      "What is a Kubernetes Service? A beginner guide to stable networking",
    description:
      "Why Pod IPs are not enough, what a Service does, ClusterIP vs NodePort vs LoadBalancer, selectors and Endpoints, kubectl commands, and optional natural-language checks with kprompt.",
    publishedAt: "2026-08-01",
    author: EMIRE_BARIS,
    tags: ["kubernetes", "beginner", "kubectl", "devops", "networking"],
    keywords: [
      "what is a kubernetes service",
      "kubernetes service explained",
      "clusterip nodeport loadbalancer",
      "kubernetes service selector",
      "kubectl get services",
      "pod ip vs service",
      "kubernetes networking beginner",
      "kubernetes endpoints",
    ],
    blocks: [
      {
        type: "p",
        text: "You learned that Pods run your containers and Deployments keep them running — see Pods vs Deployments if you need a refresher. The next question every beginner hits: how does traffic reach those Pods? Pod IP addresses change. A Service is Kubernetes’ answer — a stable way to send traffic to the right Pods.",
        links: [
          {
            label: "Pods vs Deployments",
            href: "/blog/kubernetes-pods-vs-deployments",
          },
        ],
      },
      {
        type: "p",
        text: "This guide explains what a Service is, why you need one, how selectors connect Services to Pods, the main Service types, and the kubectl commands that make the relationship visible on a real cluster.",
        links: [
          {
            label: "Kubernetes Service documentation",
            href: "https://kubernetes.io/docs/concepts/services-networking/service/",
          },
        ],
      },
      {
        type: "h2",
        text: "The one-sentence version",
      },
      {
        type: "ul",
        items: [
          "Pods get ephemeral IP addresses — they change when Pods restart.",
          "A Service provides a stable name and IP (or external access) in front of a set of Pods.",
          "You match Services to Pods using labels and selectors — not by hard-coding Pod names.",
        ],
      },
      {
        type: "h2",
        text: "Why Pod IP alone is not enough",
      },
      {
        type: "p",
        text: "Each Pod has its own IP on the cluster network. That sounds fine until a Pod is recreated: new Pod, new IP. If your frontend hard-coded pod-api-7d4f8b9c-xk2lm:8080, the next restart breaks the connection.",
      },
      {
        type: "ul",
        items: [
          "Deployments replace Pods — IP addresses are not stable identifiers",
          "Multiple replicas mean multiple Pod IPs — clients need one entry point",
          "Services abstract away which specific Pod answers a request",
        ],
      },
      {
        type: "h2",
        text: "What is a Service?",
      },
      {
        type: "p",
        text: "A Service is a Kubernetes API object that defines a logical set of Pods and a policy to access them. Inside the cluster, other workloads usually reach your app at a DNS name like api.default.svc.cluster.local — backed by the Service, not a single Pod.",
      },
      {
        type: "code",
        caption: "Mental model",
        code: `Client / another Pod
        │
        ▼
   Service "api"  (stable ClusterIP + DNS)
        │
        ├── Pod api-aaa111
        ├── Pod api-bbb222
        └── Pod api-ccc333`,
      },
      {
        type: "h2",
        text: "Selectors: how the Service finds Pods",
      },
      {
        type: "p",
        text: "A Service does not list Pod names. It uses a label selector. Your Deployment labels Pods with app: api; the Service selects app: api. When replicas scale up or Pods restart, the Service automatically includes matching Pods.",
      },
      {
        type: "code",
        caption: "Minimal Service YAML",
        code: `apiVersion: v1
kind: Service
metadata:
  name: api
  namespace: default
spec:
  selector:
    app: api          # must match Pod template labels
  ports:
    - port: 80        # Service port
      targetPort: 8080 # container port
  type: ClusterIP`,
      },
      {
        type: "p",
        text: "If selector labels do not match any Pod, the Service exists but nothing receives traffic — a very common beginner bug.",
      },
      {
        type: "h2",
        text: "Service types (beginner view)",
      },
      {
        type: "table",
        headers: ["Type", "Who can reach it", "Typical use"],
        rows: [
          [
            "ClusterIP (default)",
            "Other Pods inside the cluster",
            "Internal microservice-to-microservice traffic",
          ],
          [
            "NodePort",
            "External clients via node IP + high port",
            "Dev/demo, quick external access (not ideal for prod alone)",
          ],
          [
            "LoadBalancer",
            "External clients via cloud load balancer",
            "Public HTTP APIs on AWS/GCP/Azure",
          ],
        ],
      },
      {
        type: "p",
        text: "Most in-cluster traffic uses ClusterIP. You expose to the internet with LoadBalancer (or Ingress on top — a later topic).",
      },
      {
        type: "h2",
        text: "Endpoints: proof the Service has backends",
      },
      {
        type: "p",
        text: "Kubernetes maintains an Endpoints (or EndpointSlice) object listing the Pod IPs that match the Service selector. If Endpoints is empty, your Service has no backends — check labels on the Deployment template and the Service selector.",
      },
      {
        type: "code",
        caption: "Inspect Services and backends",
        code: `kubectl get services
kubectl get svc -n staging
kubectl describe service api -n default

kubectl get endpoints api -n default
kubectl get pods -l app=api -n default --show-labels`,
      },
      {
        type: "h2",
        text: "Common beginner mistakes",
      },
      {
        type: "ul",
        items: [
          "Service selector does not match Pod labels → Endpoints empty, connection refused",
          "targetPort wrong → Service forwards to a port nothing listens on",
          "Calling a Pod IP directly in config instead of the Service name",
          "Expecting ClusterIP to be reachable from your laptop without port-forward or LoadBalancer",
        ],
      },
      {
        type: "h2",
        text: "Same checks in natural language (optional)",
      },
      {
        type: "p",
        text: "kprompt turns plain English into a reviewable plan before anything reaches the cluster. Listing and describing Services is read-only. Mutations still require approval.",
        links: [
          { label: "Quickstart", href: "/docs/quickstart" },
          {
            label: "kubectl cheat sheet",
            href: "/blog/kubectl-cheat-sheet-natural-language",
          },
        ],
      },
      {
        type: "code",
        caption: "Soft kprompt examples",
        code: `kprompt "list services in staging"
kprompt "describe service api in default"
kprompt "get endpoints for api in staging"`,
      },
      {
        type: "h2",
        text: "What to learn next",
      },
      {
        type: "p",
        text: "Pods run workloads. Deployments keep Pod counts stable. Services give those Pods a stable address inside (and sometimes outside) the cluster. Next in this beginner series: Namespaces — how to organize resources across teams and environments.",
        links: [
          {
            label: "Pods vs Deployments",
            href: "/blog/kubernetes-pods-vs-deployments",
          },
          { label: "All blog posts", href: "/blog" },
          { label: "Docs overview", href: "/docs" },
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
