import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "building-ai-sre-07-timeline",
    title: "Building AI SRE in Public #7: AI Timeline",
    description:
      "Incident chronology as typed EvidenceRef[], not chat folklore. Events, rollout revisions, and HPA in one Investigation artifact — with honest degraded[] when Prom/OTel/mesh are missing.",
    publishedAt: "2026-08-02",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "architecture",
      "devops",
      "platform engineering",
      "observability",
    ],
    keywords: [
      "kubernetes incident timeline",
      "building ai sre timeline",
      "ai sre chronology",
      "kubernetes events timeline",
      "investigation timeline evidence",
      "what happened to deployment",
      "kprompt timeline",
      "sre incident chronology",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "This is episode 7 of Building AI SRE in Public. Episode 6 framed investigation as a gated graph — fan-out, independent verify, merge into a refuse-able artifact. Timeline answers a different question operators ask every night: not “what is broken?” but “in what order did the world change?” Chat scroll is a terrible chronology. Typed EvidenceRef[] is not.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 6: Investigation Graph",
            href: "/blog/building-ai-sre-06-investigation-graph",
          },
          {
            label: "Episode 3: PlanResult",
            href: "/blog/building-ai-sre-03-planresult",
          },
          {
            label: "Timeline docs",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/timeline.md",
          },
        ],
      },
      {
        type: "h2",
        text: "The claim",
      },
      {
        type: "p",
        text: "Postmortems and handoffs need an ordered evidence trail: Events, controller revisions, HPA transitions — pointers to signals, not a novel. AI SRE should emit that trail as data (Investigation.timeline[]), degrade honestly when Prom/OTel/mesh are missing, and never invent timestamps to make the story prettier.",
      },
      {
        type: "h2",
        text: "Chat is folklore with timestamps",
      },
      {
        type: "p",
        text: "A forty-turn agent session can contain the truth and still fail institutional memory. “We looked at events, then logs, then scaled” is not reviewable in CI, not mergeable across tools, and not comparable across incidents. Folklore does not jq. Chronology does.",
      },
      {
        type: "table",
        headers: ["Chat chronology", "Typed timeline"],
        rows: [
          ["Scroll order = claim order", "time-sorted EvidenceRef[]"],
          ["Hard to put in a ticket", "Same Investigation envelope as investigate/why"],
          ["Invented narrative glue", "degraded[] when signals are missing"],
          ["Dies with the session", "JSON artifact for humans and pipelines"],
        ],
      },
      {
        type: "h2",
        text: "What a timeline walks (MVP)",
      },
      {
        type: "ul",
        items: [
          "Events on the target workload (Deployment, StatefulSet, DaemonSet, or Pod) and related pods",
          "ReplicaSet revisions for Deployments (deployment.kubernetes.io/revision)",
          "ControllerRevision history for StatefulSets and DaemonSets where available",
          "HPA targeting the Deployment (status + condition transitions)",
        ],
      },
      {
        type: "p",
        text: "Primary payload is timeline[] of EvidenceRef — the same ADR-0014 Investigation kind used by investigate and why. Findings may be thin; chronology is the product. Window defaults to something like 1h so “what happened” stays bounded.",
      },
      {
        type: "code",
        caption: "Chronology, not chat",
        code: `kprompt "timeline for api" -n payments
kprompt "what happened to ledger" -n payments -o json
kprompt "timeline for StatefulSet db" -n payments

kprompt "timeline for api" -n payments -o json \\
  | jq '{summary, degraded, timeline: [.timeline[] | {type, reason, message, ts: .timestamp}]}'`,
      },
      {
        type: "h2",
        text: "vs investigate / why",
      },
      {
        type: "table",
        headers: ["", "investigate", "why", "timeline"],
        rows: [
          ["Focus", "Multi-hop RCA", "Cause tree", "Chronology"],
          ["Primary field", "findings", "Symptom→Cause", "timeline[]"],
          ["Trigger", "“investigate X”", "“why is X pending”", "“timeline / what happened”"],
        ],
      },
      {
        type: "p",
        text: "Same envelope, different jobs. Investigation Graph (ep.6) may fan out signals; Timeline orders what already happened. Neither replaces PlanResult for mutate — chronology informs the plan; approval still gates apply.",
      },
      {
        type: "h2",
        text: "Honesty: degraded beats fiction",
      },
      {
        type: "p",
        text: "MVP lists prometheus, otel, and mesh in Investigation.degraded. Timeline does not invent metric spikes or trace spans to fill gaps. That is the same compiler temperament as PlanResult: refuse to fake structure. When those hops land, they append EvidenceRef kinds — they do not rewrite the past into a prettier story.",
      },
      {
        type: "h2",
        text: "Why this belongs in an AI SRE series",
      },
      {
        type: "p",
        text: "Classic AIOps dashboards had timelines and still burned trust when they auto-acted. LLM agents have narratives and still burn trust when they skip artifacts. AI SRE needs both: a time-ordered evidence trail and a refuse-able plan. Timeline is the trail. PlanResult is the proposal. Approval is the boundary. Verify closes the loop (ep.6 / Medium “Investigate → Verify”).",
      },
      {
        type: "h2",
        text: "What ships vs building",
      },
      {
        type: "ul",
        items: [
          "Shipped: timeline / what happened → Investigation with timeline[] (Events, RS/ControllerRevision, HPA)",
          "Shipped: same --output json contract as investigate/why; degraded[] for Prom/OTel/mesh",
          "Building: metric/trace/mesh hops on the chronology",
          "Building: richer app/timeline viewer surfaces on Team (when enrolled)",
          "Non-goal: chat-only RCA as the source of truth; inventing signals to fill gaps",
        ],
      },
      {
        type: "h2",
        text: "Try the chronology",
      },
      {
        type: "code",
        caption: "Non-prod drill",
        code: `# kind + a broken workload (see kprompt-examples)
make break SCENARIO=01-crashloop
kprompt "timeline for api" -n payments
kprompt "investigate api" -n payments   # RCA beside chronology
# Prefer reading JSON timeline[] before any suggested mutate`,
      },
      {
        type: "p",
        text: "If your AI ops tool cannot export “what happened” as ordered evidence without scraping a chat UI, you still have folklore — just with better English.",
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 8 is Cluster Memory — durable local facts that bias Observe context without becoming sole proof. The hub tracks the rest of the arc.",
        links: [
          {
            label: "Episode 8: Cluster Memory",
            href: "/blog/building-ai-sre-08-cluster-memory",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Timeline docs",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/timeline.md",
          },
          {
            label: "Investigation Graph (ep.6)",
            href: "/blog/building-ai-sre-06-investigation-graph",
          },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  };

export default post;
