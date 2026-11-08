import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "kprompt-magic-moment",
  title: "The $0 magic moment: failed rollout → proposal → approve → Learn",
  description:
    "Canonical kprompt try path on kind: one stalled Deployment, one PlanResult-shaped proposal, your explicit approve, verify, then Learn — no LLM key, no silent heal.",
  publishedAt: "2026-11-08",
  author: MUHTALIP_DEDE,
  tags: ["demo", "observe", "planresult", "tutorial", "sre"],
  keywords: [
    "kprompt magic moment",
    "make magic-moment",
    "kubernetes failed rollout demo",
    "plan before approve kubernetes",
    "observe agent kind demo",
    "AI Runtime for Kubernetes",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "kprompt is The AI Runtime for Kubernetes: it understands your cluster context and turns intent into operate / investigate / recommend — with a reviewable PlanResult before anything mutates. The fastest way to feel that contract is not a chat session. It is one failed rollout on kind.",
    },
    {
      type: "p",
      text: "This is the canonical try path (IC-001): Observe correlates a stalled checkout Deployment, stores a PlanResult-shaped proposal, you review it, you approve, verify runs, Learn writes an outcome. Heuristic analysis — $0, no LLM provider key. Mutation never happens without your y/N (or an explicit --approve you typed).",
      links: [
        { label: "kprompt demo docs", href: "/docs/demo" },
        { label: "Quickstart", href: "/docs/quickstart" },
      ],
    },
    {
      type: "h2",
      text: "One command",
    },
    {
      type: "code",
      caption: "Prereqs: Docker, kind, kubectl, make, git, kprompt on PATH",
      code: `kprompt demo                    # checklist + exact next commands
git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples && make magic-moment`,
    },
    {
      type: "p",
      text: "Install the CLI first if needed: curl -fsSL https://kprompt.ai/install | bash — or brew install kprompt/tap/kprompt. The script creates (or reuses) a kind cluster, breaks only scenario 04-failed-rollout in namespace payments, runs the Observe agent in heuristic mode, prints the durable proposal, then asks [y/N]. Non-interactive shells stop before apply and print the exact apply command.",
      links: [
        {
          label: "kprompt-examples",
          href: "https://github.com/kprompt/kprompt-examples",
        },
        { label: "Install", href: "/docs/install" },
      ],
    },
    {
      type: "h2",
      text: "What you should see",
    },
    {
      type: "ul",
      items: [
        "Revision 2 stalls on a bad image; revision 1 keeps serving (maxUnavailable: 0)",
        "A durable AutopilotProposal with action rollbackFailedRollout, risk, steps — Applied stays false until you approve",
        "Narrow policyAuto allowlist (demo/policy-auto.json) — still requires your explicit approve",
        "After apply: rollout status green + patterns list shows Learn writeback",
      ],
    },
    {
      type: "h2",
      text: "Why this is not auto-heal",
    },
    {
      type: "p",
      text: "Propose → approve → verify → Learn. Observe does not silently patch production. Learn may bias the next similar proposal’s actionConfidence (evidence-not-proof); it does not skip Safety or RemediationPolicy. Role-scoped agent; no Secret values; Coordinator never mutates.",
      links: [
        { label: "Safety", href: "/docs/safety" },
        { label: "Agent ops (RBAC one-pager)", href: "https://github.com/kprompt/kprompt/blob/main/docs/agent-ops.md" },
        { label: "Learn loop", href: "https://github.com/kprompt/kprompt/blob/main/docs/learn.md" },
      ],
    },
    {
      type: "h2",
      text: "After the magic moment",
    },
    {
      type: "ul",
      items: [
        "Second hit (same fingerprint, Learn bias): make learn-second-hit",
        "Natural-language plans ($0): kprompt init --ollama then kprompt \"how's my cluster\"",
        "Brownfield cluster: Adopt (15 min) — bind tools, read first",
        "Advanced noisy Observe fixture (not the stranger path): make walkthrough",
      ],
    },
    {
      type: "code",
      caption: "Day-0 NL after the demo",
      code: `kprompt init --ollama
kprompt "how's my cluster"
kprompt "scale api to 3"   # plan first — approve only when you trust it`,
    },
    {
      type: "h2",
      text: "Honest limits",
    },
    {
      type: "ul",
      items: [
        "Experimental — prefer kind / non-production first",
        "Heuristic demo is deterministic offline analysis, not a full BYOK LLM run",
        "Do not lead strangers at make walkthrough; that path is advanced / multi-break",
        "Free CLI forever; Team is optional org policy/audit when you enroll",
      ],
    },
    {
      type: "p",
      text: "Same story everywhere: install → kprompt demo → make magic-moment. Category stays AI Runtime — plan-gated, not chat-shaped kubectl.",
      links: [
        { label: "AI Runtime for Kubernetes", href: "/blog/ai-runtime-for-kubernetes" },
        { label: "PlanResult parity", href: "/docs/planresult-parity" },
      ],
    },
  ],
};

export default post;
