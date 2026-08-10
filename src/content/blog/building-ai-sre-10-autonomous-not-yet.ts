import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "building-ai-sre-10-autonomous-not-yet",
    title: "Building AI SRE in Public #10: Autonomous SRE — and why not yet",
    description:
      "Why unsupervised auto-remediation is not the destination. Observe by default, Autopilot propose-only, reality anchors, and investigate → plan → approve → verify as the load-bearing loop — not a fleet of agents that apply because the model sounded sure.",
    publishedAt: "2026-08-02",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "architecture",
      "devops",
      "platform engineering",
      "safety",
    ],
    keywords: [
      "autonomous sre kubernetes",
      "why not auto remediation",
      "building ai sre autonomous",
      "ai sre approval boundary",
      "autopilot propose only",
      "kubernetes silent apply",
      "aiops auto heal failure",
      "kprompt autopilot",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "This is episode 10 — the closer — of Building AI SRE in Public. Episodes 1–9 built the machinery: intent → typed plan → safety → multi-context → gated investigation → chronology → local memory → topology. The marketing temptation is to call that stack “autonomous.” We refuse. Autonomy without an approval boundary is how AIOps burned trust the first time.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 9: Knowledge Graph",
            href: "/blog/building-ai-sre-09-knowledge-graph",
          },
          {
            label: "Episode 4: Safety Engine",
            href: "/blog/building-ai-sre-04-safety",
          },
          {
            label: "Beyond AI kubectl",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
          {
            label: "Reality anchors",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/reality-anchors.md",
          },
        ],
      },
      {
        type: "h2",
        text: "The claim",
      },
      {
        type: "p",
        text: "AI SRE means investigate with evidence, propose a reviewable PlanResult, fail closed on hard denies, and verify after apply. It does not mean a thousand agents patching prod because a chat session soft-agreed. “Autonomous” is allowed only where policy + explicit gates say so — and even then the default remains proposeOnly. Silent apply is not shipped as the product story.",
      },
      {
        type: "h2",
        text: "What people hear when you say autonomous",
      },
      {
        type: "table",
        headers: ["Pitch", "What operators hear", "What we ship instead"],
        rows: [
          ["Self-healing cluster", "Something mutated while I slept", "Observe alerts; human or policy gate before mutate"],
          ["Agent fleet", "Who owns the blast radius?", "Namespace-scoped Roles; Coordinator probes, not god-mode"],
          ["LLM decided", "No audit trail I trust", "PlanResult + audit + Reality anchors the model cannot waive"],
          ["Auto-remediate from graph", "Edges became root cause", "Graph/memory bias Explain — never sole proof / never sole apply"],
        ],
      },
      {
        type: "h2",
        text: "AIOps already tried unsupervised heal",
      },
      {
        type: "p",
        text: "Correlation engines promised auto-remediation before LLMs. Many failed for boring reasons: brittle rules, noisy alerts, opaque black boxes, and remediations operators would not stake a pager on. Better language models do not erase that history. They make confident wrong plans cheaper to generate. The fix is not a louder model — it is a compiler temperament: typed artifacts, anchors, and humans (or explicit policyAuto) on the mutate path.",
        links: [
          {
            label: "Episode 1: Why AI SRE",
            href: "/blog/building-ai-sre-01-why",
          },
        ],
      },
      {
        type: "h2",
        text: "The loop we will defend",
      },
      {
        type: "code",
        caption: "Load-bearing path",
        code: `investigate / why / timeline / impact
        → Investigation (EvidenceRef, Unknowns, degraded[])
        → optional PlanResult (actions, risk, blastRadius)
        → Safety hard-deny / risk
        → human approve  (or policyAuto + allowlist + apply=true)
        → apply
        → post-apply verify`,
      },
      {
        type: "p",
        text: "Skip any step and you are back to folklore with kubectl privileges. Soft-agree in the same session is not verify. Memory is not proof. A Knowledge Graph edge is not a rollback.",
      },
      {
        type: "h2",
        text: "Autopilot without autonomy theater (ADR-0015)",
      },
      {
        type: "ul",
        items: [
          "Observe remains the default install — read Role, notify, no in-cluster apply implied",
          "Autopilot is opt-in and allowlist-only (rollback / restart / scale / evict — named targets)",
          "proposeOnly is the MVP default: emit PlanResult / proposal; human applies with --approve",
          "policyAuto still requires allowlist + apply=true + explicit gate — never LLM-said-so → apply",
          "Deny pack: wipe / ns delete / Secret values / fabricated evidence — never allowlistable",
        ],
      },
      {
        type: "code",
        caption: "Propose, don’t surprise",
        code: `kprompt agent run -n payments --analyze --heuristic --autopilot-propose
# Apply only with policyAuto + explicit approve — never the silent default
kprompt agent autopilot apply-proposal --file proposal.json --approve --policy ./policy-auto.json`,
      },
      {
        type: "h2",
        text: "Reality anchors beat second opinions",
      },
      {
        type: "p",
        text: "If an improvement loop can rewrite both the solution and the evaluator, Goodhart wins. Hard deny, PlanResult schema, EvidenceRef kinds, pre-trust caps, post-apply verify, AG-034 memory caps, and Coordinator probe Evidence live in code — not in a prompt that says “be careful.” A second LLM in the same session is not an anchor.",
        links: [
          {
            label: "Reality anchors registry",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/reality-anchors.md",
          },
          {
            label: "Investigation Graph (ep.6)",
            href: "/blog/building-ai-sre-06-investigation-graph",
          },
        ],
      },
      {
        type: "h2",
        text: "What “not yet” allows later",
      },
      {
        type: "p",
        text: "Narrow policyAuto for boring, reversible actions under RemediationsPolicy can grow. GitOps remains the steady-state source of truth for desired state; Autopilot is incident remediation, not continuous reconcile of everything. Full unsupervised SRE — free-form mutate, cluster-wide god agents, Secret-value CMDB, silent heal from chat — stays an explicit non-goal until a new ADR says otherwise in public.",
      },
      {
        type: "h2",
        text: "What ships vs building vs refuse",
      },
      {
        type: "ul",
        items: [
          "Shipped: plan → safety → approve → apply; Observe; Autopilot propose + gated apply; Investigation / timeline / impact / graph MVP",
          "Shipped: reality anchors docs; memory evidence-not-proof; soft-agree confidence caps",
          "Building: richer verify, topology UI, deeper Prom/OTel/mesh hops",
          "Refuse: silent apply as default; “1000 agents” fleets; memory/graph as sole proof; model-waived hard denies",
        ],
      },
      {
        type: "h2",
        text: "Series close",
      },
      {
        type: "p",
        text: "If you only remember one sentence from ten episodes: AI SRE is a compiler and an approval boundary, not a chatbot with cluster-admin. The wedge ships today. The destination stays honest. Star the repo, open issues when an episode overclaims, and keep the human (or an explicit policy gate) on the mutate path.",
        links: [
          { label: "Series hub", href: "/blog/building-ai-sre-in-public" },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
          {
            label: "Plan → approve",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          {
            label: "Agent / Autopilot docs",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/agent.md",
          },
        ],
      },
    ],
  };

export default post;
