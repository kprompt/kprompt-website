import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "building-ai-sre-06-investigation-graph",
    title: "Building AI SRE in Public #6: Investigation Graph",
    description:
      "Chat is a line; ops is a gated graph. Fan-out where edges are real, independent verify (not same-session soft-agree), PlanResult → approve → verify — without becoming a free-form agent fleet.",
    publishedAt: "2026-08-02",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "architecture",
      "safety",
      "platform engineering",
      "devops",
    ],
    keywords: [
      "investigation graph kubernetes",
      "building ai sre investigation graph",
      "multi hop rca kubernetes ai",
      "independent verify ai agents",
      "planresult investigate approve",
      "coordinator namespace agent",
      "graph engineering kubernetes ops",
      "ai sre not chatbot",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "This is episode 6 of Building AI SRE in Public. Episodes 2–4 gave us a compiler, a typed PlanResult, and a safety wall. Episode 5 stretched that wall across kubeconfig contexts. Investigation Graph answers a quieter design question: when the work is wide — many signals, many namespaces — what shape should the AI take? A chat line that queues “and then” forever, or a gated graph that fans out, verifies independently, and merges into one refuse-able artifact?",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 5: Multi-context",
            href: "/blog/building-ai-sre-05-multi-context",
          },
          {
            label: "Episode 4: Safety Engine",
            href: "/blog/building-ai-sre-04-safety",
          },
          {
            label: "Compiler, not chatbot",
            href: "/blog/kubernetes-compiler-not-chatbot",
          },
        ],
      },
      {
        type: "h2",
        text: "The claim",
      },
      {
        type: "p",
        text: "Chat is a UI. Ops is a graph with gates. Natural language (or continuous Observe) is the source. Investigation / InvestigationReport / PlanResult are the IR. Approval is the link-edit. Apply is the binary. Verify closes on evidence — not on a second model call that inherited the analyzer’s session and politely agreed.",
      },
      {
        type: "h2",
        text: "Lines vs graphs",
      },
      {
        type: "p",
        text: "Most multi-step agents become a line: step one, step two, step three — each waiting whether or not it needed the previous output. Half those waits are fake edges. The habit that starts everything: for every “and then,” ask whether the next step actually reads the previous step’s output. If no data crosses between two boxes, they are independent — candidates for fan-out, not forced queues.",
      },
      {
        type: "table",
        headers: ["Prefer a loop", "Prefer a graph"],
        rows: [
          [
            "One object, one bug (`why` is this pod CrashLooping?)",
            "Independent signals or namespaces in parallel",
          ],
          [
            "Exploratory — you still need to steer",
            "Cross-ns suspicion (Namespace Agent → Coordinator → probe)",
          ],
          [
            "Every hop truly depends on the last",
            "Events ∥ metrics ∥ logs with an explicit merge",
          ],
          [
            "Tight human oversight of each hop",
            "Width with Role-scoped workers",
          ],
        ],
      },
      {
        type: "p",
        text: "If you cannot find two boxes with no arrow between them, there is no graph to build. Stay a loop. Forcing a fleet onto a true chain only burns money and invents failure modes.",
      },
      {
        type: "h2",
        text: "The gated Investigation Graph",
      },
      {
        type: "code",
        caption: "Same DNA for CLI and in-cluster runtime",
        code: `Signal nodes (Events / logs / Endpoints / …)
    → Reason nodes (RCA / findings)
    → Verify edge (independent EvidenceRef / probe / hard deny)
    → Merge artifact (Investigation / Report)
    → optional PlanResult + safety
    → approve → apply → post-apply verify`,
      },
      {
        type: "p",
        text: "CLI path (on-demand): investigate multi-hop → Investigation JSON → optional suggested PlanResult → approve → apply → verify. Runtime path (always-on): Observe → Detect/RCA → InvestigationReport → Coordinator handoff → probe/verify → merge → notify → optional Autopilot propose (never silent apply). Soft product illustration — the contract matters more than the binary name.",
        links: [
          {
            label: "Investigation Graph docs",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/investigation-graph.md",
          },
          {
            label: "Reality anchors",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/reality-anchors.md",
          },
        ],
      },
      {
        type: "h2",
        text: "Independent verify — the part that actually breaks",
      },
      {
        type: "p",
        text: "When an agent checks its own work in the same conversation, it goes easy on itself. A graph of agents sharing one context is a single loop in a costume — it fails later, more expensively, with more green lights on the way down. Verify edges must rest on anchors the optimizer cannot invent: fresh EvidenceRef / probe reads, schema and risk stamps, hard denies in policy code, post-apply readiness checks. A second LLM in the same session is agreement in a different font.",
      },
      {
        type: "ul",
        items: [
          "Shipped: Coordinator merge caps soft-agree without probe EvidenceRef (confidence ≤ 0.4)",
          "Shipped: CLI pre-trust (`internal/pretrust`) clamps high confidence without EvidenceRef / contradicting re-read",
          "Shipped: suggested-fix approve UX withheld when pre-trust fails; T-070 after apply",
          "Non-goal: “looks good” as a substitute for EvidenceRef",
        ],
      },
      {
        type: "h2",
        text: "Worker isolation",
      },
      {
        type: "p",
        text: "Parallelism without isolation races. Namespace Agents stay Role-scoped. Coordinator mutate stays off by default. Foreign-ns facts travel only via CoordinatorHandoff / reply — not inventing peer root cause locally. Two writers sharing one mutable workspace is an anti-pattern; forbid it structurally.",
      },
      {
        type: "h2",
        text: "What we parallelize (and what we do not)",
      },
      {
        type: "p",
        text: "On investigate today: Explain (Deployment → RS → Pods) runs beside Service/Endpoints discovery when both only need the target identity. Endpoints Gets fan out per matching Service. After pods are known, Events and Logs fan out — no fake “and then.” The Deployment → ReplicaSet → Pods chain stays sequential because each hop reads the last.",
      },
      {
        type: "code",
        caption: "Typed walk, not chat scroll",
        code: `kprompt "investigate api" -n payments
kprompt "investigate api" -n payments -o json | jq '{summary, confidence, degraded, findings: [.findings[].code]}'
kprompt "why is api crashlooping" -n payments`,
      },
      {
        type: "h2",
        text: "What this is not",
      },
      {
        type: "ul",
        items: [
          "Not Claude-style “1000 agents in one window” / free-form dynamic workflow fleets",
          "Not competing with Kagent as a general multi-agent framework",
          "Not silent or default LLM-said-so apply",
          "Not treating chat transcript as the IR",
          "Not uploading raw cluster dumps to a control plane by default",
        ],
      },
      {
        type: "h2",
        text: "Why this belongs in an AI SRE series",
      },
      {
        type: "p",
        text: "Episode 3 said every production AI agent needs an approval boundary. Episode 4 said the boundary is empty without a typed plan to guard. Investigation Graph says the investigation that feeds that plan must itself be honest under width: independent verify, frozen anchors, isolated workers. Otherwise you scale confidence theater — more agents, more green lights, same Goodhart failure.",
      },
      {
        type: "h2",
        text: "What ships vs building",
      },
      {
        type: "ul",
        items: [
          "Shipped: investigate / why / timeline → Investigation; PlanResult → approve → apply → verify",
          "Shipped: Observe → InvestigationReport → Coordinator handoff + probe + independent merge",
          "Shipped: named Investigation Graph + reality-anchors docs; pre-trust; hop parallelization",
          "Building: richer Prom/OTel hops still listed in degraded[] until wired",
          "Non-goal: agent-fleet chat product; unsupervised Autopilot",
        ],
      },
      {
        type: "h2",
        text: "Try the shape",
      },
      {
        type: "code",
        caption: "Non-prod drill",
        code: `# kind + a broken workload (see kprompt-examples)
kprompt "investigate api" -n payments
kprompt "investigate api" -n payments -o json | jq '.confidence, .degraded, .suggestedPlanHint'
# Review PlanResult if a suggested fix appears — never --approve blind`,
      },
      {
        type: "p",
        text: "If your “multi-agent ops” story cannot show the last Investigation a human refused as data — and a wipe-class prompt that cannot apply — you still have a chatbot with kubeconfig. Draw the graph. Keep the anchors frozen.",
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 7 is AI Timeline — ordered EvidenceRef chronology as a first-class artifact, not a chat scroll of “what we tried.” The hub tracks the rest of the arc.",
        links: [
          {
            label: "Episode 7: AI Timeline",
            href: "/blog/building-ai-sre-07-timeline",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Investigate docs",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/investigate.md",
          },
          { label: "Plan → approve", href: "/blog/kubernetes-safety-plan-approve" },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  };

export default post;
