import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
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
  };

export default post;
