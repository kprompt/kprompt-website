import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "observe-vs-investigate",
  title: "Observe vs investigate: always-on agent vs on-demand CLI",
  description:
    "Same Investigation Graph DNA — different trigger. Laptop investigate is reactive; the optional Observe agent is continuous watch → Incident → gated notify.",
  publishedAt: "2026-08-16",
  author: MUHTALIP_DEDE,
  tags: ["observe", "investigate", "cli", "kubernetes"],
  keywords: [
    "kprompt observe vs investigate",
    "kubernetes always-on agent",
    "on-demand RCA CLI",
    "namespace observe agent",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "Operators ask the same question two ways: “why is checkout broken right now?” and “tell me when payments starts misbehaving without me watching.” kprompt answers both — but with different surfaces. Confusing them is how you end up expecting a laptop REPL to page Slack, or an in-cluster watcher to silently apply fixes.",
      links: [
        { label: "Observe agent", href: "/docs/agent" },
        {
          label: "investigate",
          href: "https://github.com/kprompt/kprompt/blob/main/docs/investigate.md",
        },
      ],
    },
    {
      type: "h2",
      text: "At a glance",
    },
    {
      type: "table",
      headers: ["Surface", "Trigger", "Scope", "Mutate?", "Artifact"],
      rows: [
        [
          "CLI investigate / why / timeline",
          "You type a prompt",
          "kubeconfig context(s)",
          "Only after PlanResult approval",
          "Investigation → optional PlanResult",
        ],
        [
          "Observe agent",
          "Always-on watch",
          "One namespace (Role)",
          "Never by default",
          "Incident / AgentAlert",
        ],
        [
          "Autopilot (opt-in)",
          "Open Incident + allowlist",
          "Same ns agent",
          "Propose-only; apply gated",
          "PlanResult (Applied false)",
        ],
      ],
    },
    {
      type: "h2",
      text: "Same graph, different entry",
    },
    {
      type: "p",
      text: "Always-on intelligence is the same gated Investigation Graph as CLI investigate — signal hops → findings → optional PlanResult → approve → apply → verify. It is not a free-form multi-agent fleet. Observe / Namespace Agent runs the continuous edge of that graph; investigate is the on-demand hop you steer from a laptop.",
      links: [
        {
          label: "Investigation Graph",
          href: "https://github.com/kprompt/kprompt/blob/main/docs/investigation-graph.md",
        },
        {
          label: "Modes table",
          href: "https://github.com/kprompt/kprompt/blob/main/docs/namespace-agent.md",
        },
      ],
    },
    {
      type: "code",
      caption: "On-demand RCA (reactive)",
      code: `kprompt "investigate checkout" -n payments
kprompt "why is api crashing" -n payments
kprompt "timeline for checkout" -n payments`,
    },
    {
      type: "code",
      caption: "Always-on Observe (continuous)",
      code: `kprompt agent run -n payments \\
  --analyze --fetch-logs --health --heuristic

# in-cluster: Helm charts/kprompt-agent (namespace Role)`,
    },
    {
      type: "h2",
      text: "When to install neither, one, or both",
    },
    {
      type: "ul",
      items: [
        "Neither — you only need occasional explain/investigate from CI or a laptop; no pager path yet",
        "CLI only — brownfield day-2 mutate + RCA under plan → approve; no daemon required",
        "Observe only — you want Slack/Discord when a namespace degrades, still refuse silent heal",
        "Both — continuous alerts plus human-driven investigate/why when you dig in; Autopilot propose optional",
      ],
    },
    {
      type: "h2",
      text: "Honest non-claims",
    },
    {
      type: "ul",
      items: [
        "Observe is not K8sGPT — analyzer-on-demand vs watch → Incident → gated alert",
        "Observe is not Kagent — one kprompt-native pipeline, not a general multi-agent platform",
        "Default RBAC is a namespace Role (get/list/watch), not ClusterRole god-mode",
        "Memory / patterns bias confidence; they do not prove root cause alone",
        "Coordinator is for cross-ns verification handoff — mutate still default off",
      ],
    },
    {
      type: "h2",
      text: "Try both paths on kind",
    },
    {
      type: "code",
      caption: "Break fixtures, then Observe; later investigate a target",
      code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make walkthrough

# afterward, on-demand:
kprompt "investigate checkout" -n payments`,
    },
    {
      type: "p",
      text: "Heuristic Observe needs no LLM key. Investigate with a provider when you want richer narration — still read-first; mutations stay behind approval. Experimental — prefer kind / non-prod first.",
      links: [
        { label: "Observe on kind", href: "/blog/observe-agent-kind-demo" },
        { label: "Alert fatigue gates", href: "/blog/observe-agent-alert-fatigue" },
        { label: "v0.5 Observe", href: "/blog/kprompt-v0-5-observe-agent" },
      ],
    },
  ],
};

export default post;
