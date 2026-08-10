import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "building-ai-sre-08-cluster-memory",
    title: "Building AI SRE in Public #8: Cluster Memory",
    description:
      "Namespace dependency facts that bias Observe without becoming root-cause proof. Local or in-cluster stores — never cloud dumps as fake authority — with AG-034 confidence caps.",
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
      "kubernetes cluster memory",
      "namespace memory ai sre",
      "building ai sre cluster memory",
      "ai agent memory kubernetes",
      "evidence not proof memory",
      "kprompt namespace memory",
      "sre dependency facts",
      "observability priors",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "This is episode 8 of Building AI SRE in Public. Episode 7 ordered what already happened. Memory answers a quieter question: what should the agent already know about this namespace before the next incident? Chat RAG that forgets between sessions is not institutional knowledge. A typed fact store that never pretends to be proof is.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 7: AI Timeline",
            href: "/blog/building-ai-sre-07-timeline",
          },
          {
            label: "Episode 6: Investigation Graph",
            href: "/blog/building-ai-sre-06-investigation-graph",
          },
          {
            label: "Agent docs — namespace memory",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/agent.md",
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
        text: "AI SRE needs durable, namespace-scoped priors — “payments uses Redis for sessions” — that bias Explain and Observe. Those priors must stay local or in-cluster by default, inject as labeled evidence-not-proof blocks, and never raise confidence when Events, logs, metrics, and traces are empty. Memory is a prior. EvidenceRef is proof. PlanResult still needs approval.",
      },
      {
        type: "h2",
        text: "Chat memory is not cluster memory",
      },
      {
        type: "p",
        text: "A model that “remembers” last Tuesday’s Slack thread inside one session is not the same as a store an on-call can list, edit, and audit. Session memory dies with the process. Cloud dumps of cluster state as “memory” invent a fake authority. Namespace memory is boring on purpose: dependency and note facts with ids, sources, and updatedAt.",
      },
      {
        type: "table",
        headers: ["Chat / cloud “memory”", "Namespace memory"],
        rows: [
          ["Folklore in the prompt window", "Typed Fact[] (dependency | note)"],
          ["Often leaves the cluster boundary", "File (~/.config/kprompt/memory) or ConfigMap kprompt-namespace-memory"],
          ["Sounds sure without Events", "AG-034: memory alone caps confidence (≤0.35)"],
          ["Hard to correct after a wrong prior", "agent memory set / list / discover"],
        ],
      },
      {
        type: "h2",
        text: "What ships (AG-015)",
      },
      {
        type: "ul",
        items: [
          "Fact kinds: dependency (redis, kafka, postgres, …) and note (operator free-form)",
          "Discover: read-only scan of Services / Deployments for known dependency signals",
          "Inject: relevant facts filtered into AgentContext when incident text mentions the key or infra failure patterns",
          "Backends: file by default; ConfigMap in-cluster (Helm agent.memoryBackend=configmap)",
          "Privacy: never uploaded to api.kprompt.ai by default",
        ],
      },
      {
        type: "code",
        caption: "Priors you can audit",
        code: `# Discover + inject while watching (Observe)
kprompt agent run -n payments --analyze --heuristic --memory

# Manual facts
kprompt agent memory set -n payments --kind dependency --key redis --value "cache for sessions"
kprompt agent memory discover -n payments
kprompt agent memory list -n payments

# In-cluster store
kprompt agent memory list -n payments --memory-backend configmap`,
      },
      {
        type: "h2",
        text: "Evidence, not proof (AG-034)",
      },
      {
        type: "p",
        text: "The prompt block is explicit: namespace_memory (evidence, not proof). Confidence calibration refuses to treat memory as root cause: if Memory is non-empty and live evidence count is zero, confidence is capped and the note is memory is not proof. Patterns (AG-016) can annotate Seen before (N×) the same way — boost explainability, never auto-mutate.",
      },
      {
        type: "p",
        text: "That rule is a reality anchor: humans own the store and the cap; the LLM may cite facts, not waive them into certainty. Soft-agree in the same session does not override an empty Events/logs/metrics/traces set.",
        links: [
          {
            label: "Reality anchors registry",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/reality-anchors.md",
          },
        ],
      },
      {
        type: "h2",
        text: "Where memory sits in the graph",
      },
      {
        type: "table",
        headers: ["Artifact", "Job", "Memory’s role"],
        rows: [
          ["Investigation / timeline", "What happened / what’s broken", "Hint which deps to probe — not a substitute for EvidenceRef"],
          ["PlanResult", "Proposed mutate", "May bias Explain; never skips approve"],
          ["Knowledge Graph (ep.9)", "Service graph + impact + deps", "Memory deps are one thin input — not a full topology product yet"],
        ],
      },
      {
        type: "p",
        text: "Investigation Graph (ep.6) fans out and verifies. Timeline (ep.7) orders signals. Memory keeps namespace priors between runs so the next Observe pass does not rediscover “we use Kafka” from scratch — without letting that prior close the case alone.",
      },
      {
        type: "h2",
        text: "What ships vs building",
      },
      {
        type: "ul",
        items: [
          "Shipped: namespace memory CRUD + discover + --memory inject (AG-015)",
          "Shipped: AG-034 evidence-not-proof confidence cap; patterns as Observe-only priors (AG-016)",
          "Shipped: file and ConfigMap backends; local/in-cluster privacy default",
          "Building: richer Knowledge Graph topology (service graph + impact beyond memory deps)",
          "Non-goal: uploading raw cluster dumps to the cloud as authority; memory-driven silent apply",
        ],
      },
      {
        type: "h2",
        text: "Try the prior",
      },
      {
        type: "code",
        caption: "Non-prod drill",
        code: `# kind + dependency scenario (see kprompt-examples/07-dependencies)
kprompt agent memory discover -n payments
kprompt agent memory list -n payments
kprompt agent run -n payments --analyze --heuristic --memory
# Read the namespace_memory block — then demand Events/logs before trusting RCA`,
      },
      {
        type: "p",
        text: "If your AI ops tool treats remembered chat as root cause, you have a confident prior wearing a badge. Cluster memory should wear a label: useful, local, and never sole proof.",
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 9 is Knowledge Graph — service graph, reverse impact, and memory deps as topology MVP, not a second chat brain. The hub tracks the rest of the arc.",
        links: [
          {
            label: "Episode 9: Knowledge Graph",
            href: "/blog/building-ai-sre-09-knowledge-graph",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Agent docs",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/agent.md",
          },
          {
            label: "Graph docs (thin MVP)",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/graph.md",
          },
          {
            label: "AI Timeline (ep.7)",
            href: "/blog/building-ai-sre-07-timeline",
          },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  };

export default post;
