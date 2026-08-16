import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
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
        text: "You can already run day-2 ops under plan → safety → approve → apply: deploy, scale, rollback, named delete, deep explain chains, logs, Helm through GitOps integrations, Prometheus performance explain, optimize reports, and service dependency graphs. Investigation packs ship too: investigate / why / timeline / impact, blast-radius on mutating plans, and post-apply verify with --wait. Optional Observe agent watches a namespace; Autopilot stays propose-only by default. Context aliases and doctor help you stay on the right cluster.",
        links: [
          { label: "Integrations", href: "/docs/integrations" },
          { label: "Observe agent", href: "/docs/agent" },
          { label: "Quickstart", href: "/docs/quickstart" },
        ],
      },
      {
        type: "code",
        caption: "Shipped north-star prompts",
        code: `kprompt "why isn't my deployment ready?"
kprompt "why is my api slow?" -n production
kprompt investigate checkout-api -n payments
kprompt "optimize my cluster"
kprompt "show service dependency graph"`,
      },
      {
        type: "h2",
        text: "Building next — deepen trust, not drop the gate",
      },
      {
        type: "p",
        text: "The Runtime closure pack (v0.10 / ADR-0023) already closed Learn, Incident→PlanResult, continuous Coordinator, topology Knowledge Graph edges, and durable cluster memory under the same approval DNA. What remains in progress is depth — richer recipes, safer harden defaults, GitOps drift reports — not a new unsupervised auto-heal story. Full split: Roadmap & vision.",
        links: [{ label: "Roadmap & vision", href: "/docs/roadmap" }],
      },
      {
        type: "ul",
        items: [
          "Deeper CrashLoop / exit-code recipes beyond today’s suggest packs",
          "audit non-privilege harden fixes (runAsNonRoot, resource requests) with safe defaults",
          "drift — live vs Git desired-state reports",
          "Deeper continuous multi-agent reasoning (beyond Namespace Agent + Coordinator today)",
          "Sandbox / chaos / capacity what-if Simulation lab (today’s Simulation MVP stays change preview)",
        ],
      },
      {
        type: "p",
        text: "The shape for RCA stays PlanResult-shaped: evidence refs, a root-cause summary, and an optional suggested fix that still needs approval. Never auto-apply because the model sounded confident.",
      },
      {
        type: "code",
        caption: "Shipped investigate shape (approve still required for mutate)",
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
          "Richer multi-cluster org registry metadata without uploading kubeconfig",
          "Workflow recipe packs (harden production, Ingress → Gateway API) as curated plan chains",
          "Interactive Team topology / timeline viewers beyond today’s CLI artifacts",
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
  };

export default post;
