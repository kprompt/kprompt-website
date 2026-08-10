import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
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
  };

export default post;
