import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
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
        text: "If you searched for a kubectl-ai alternative or “AI Kubernetes CLI,” you will land on Google’s kubectl-ai and a handful of peers. kprompt sits in the same lane: local binary, your kubeconfig, natural language in. The useful question is not who has the slicker chat — it is what happens before anything mutates the cluster. For a job-first alternatives map (keep kubectl-ai vs switch), see kubectl-ai alternatives.",
        links: [
          {
            label: "kubectl-ai",
            href: "https://github.com/GoogleCloudPlatform/kubectl-ai",
          },
          {
            label: "kubectl-ai alternatives",
            href: "/blog/kubectl-ai-alternatives",
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
            "Either",
            "kubectl-ai has broad MCP mode; kprompt mcp serve is read/plan-only — mutations return a PlanResult, never auto-apply",
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
  };

export default post;
