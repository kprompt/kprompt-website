import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
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
          "kprompt reasons about infrastructure.",
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
        text: "A runtime that only lives on a laptop sleeps when your laptop sleeps. The Observe agent is the first in-cluster surface: namespace-scoped Role RBAC, watch → Incident → gated notify. Namespace Agents add continuous intelligence and propose-first remediations. The Coordinator ships as thin fan-in plus the v0.10 continuous path: proactive correlation tick, Shared Knowledge, blast-radius hops, and optional mesh/OTel edges — mutate still off. Deeper multi-agent reasoning and sandbox/chaos Simulation stay building.",
        links: [
          {
            label: "Observe agent kind demo",
            href: "/blog/observe-agent-kind-demo",
          },
          { label: "v0.5 Observe announcement", href: "/blog/kprompt-v0-5-observe-agent" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
      {
        type: "table",
        headers: ["Surface", "Status"],
        rows: [
          ["Plan → approve → apply CLI", "Shipped"],
          ["investigate / why / timeline / impact packs", "Shipped"],
          ["Blast-radius preview + post-apply --wait verify", "Shipped"],
          ["Observe agent (notify-only)", "Shipped"],
          ["Autopilot propose-only", "Shipped"],
          ["Autopilot policyAuto apply (gated code path)", "Shipped"],
          [
            "Autopilot apply product path (Helm + durable proposal + non-laptop approve)",
            "Shipped (v0.10 · default still propose-only)",
          ],
          ["Closed Learn loop (outcome → next PlanResult)", "Shipped (v0.10)"],
          ["Incident → PlanResult bridge (durable in-cluster)", "Shipped (v0.10)"],
          ["Namespace Agent fleet inventory (`agent list`)", "Shipped"],
          [
            "Namespace Agent intelligence brief (`agent status` + quota/HPA detectors)",
            "Shipped",
          ],
          ["Deeper continuous multi-agent reasoning", "Building"],
          ["Incident Memory (facts + patterns + durable incidents)", "Shipped"],
          ["Durable cluster / fleet outcome memory", "Shipped (v0.10)"],
          [
            "Knowledge Graph MVP (service + Ingress/PVC + Secret/CM name refs + impact)",
            "Shipped",
          ],
          [
            "Topology Knowledge Graph (ExternalName / env-host / EndpointSlice / NetworkPolicy)",
            "Shipped (v0.10)",
          ],
          ["GitHub Integration MVP (CLI --gitops PR + Flux/Argo status)", "Shipped"],
          ["Cost Intelligence MVP (optimize idle/rightsizing + cost notes)", "Shipped"],
          ["Simulation MVP (plan preview + blastRadius + impact + Helm dry-run)", "Shipped"],
          ["Coordinator handoff + kube probe", "Shipped"],
          ["Coordinator Shared Knowledge (durable handoff ring)", "Shipped"],
          ["Coordinator blast-radius MVP (handoff hops /v1/blast-radius)", "Shipped"],
          [
            "Continuous Coordinator (proactive tick + optional mesh/OTel edges)",
            "Shipped (v0.10)",
          ],
          ["Team GitHub App install metadata (A-061 · /integrations)", "Shipped"],
          ["Team connected repos bind UI (A-062 · A-063)", "Shipped"],
          ["Team pipeline bindings metadata (A-064)", "Shipped"],
          ["Team CI webhook / PlanResult ingest (A-065)", "Shipped"],
          ["Team CI PlanResult viewer /ci (A-066 · subsumes A-033)", "Shipped"],
          ["GitHub Setup URL auto-bind (A-067)", "Shipped"],
          ["GitHub App JWT + installation token (A-068)", "Shipped"],
          ["GitHub Checks annotate write-back (A-069)", "Shipped"],
          ["Sandbox / chaos / capacity what-if Simulation", "Building"],
          ["Secret-value / credential Knowledge Graph CMDB", "Out of scope"],
        ],
      },
      {
        type: "p",
        text: "Marketing a category without claiming vaporware is deliberate. Platform engineers smell hype. We would rather label “building” for sandbox Simulation and deeper multi-agent reasoning than pretend Autopilot already heals the fleet unsupervised.",
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
        text: "If you leave this page thinking “another AI wrapper,” we failed. If you leave thinking “a new infrastructure layer with a refuse-able plan,” we are pointed the right way. If you are comparing agent platforms and AI gateways that share “runtime” vocabulary, read the triangle hub — then the dedicated comparisons for kagent, agentgateway, and ARK.",
        links: [
          {
            label: "Runtime vs Gateway vs Platform",
            href: "/blog/ai-runtime-vs-ai-gateway-vs-agent-platform",
          },
          {
            label: "kprompt vs kagent",
            href: "/blog/kprompt-vs-kagent",
          },
          {
            label: "kprompt vs agentgateway",
            href: "/blog/kprompt-vs-agentgateway",
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
  };

export default post;
