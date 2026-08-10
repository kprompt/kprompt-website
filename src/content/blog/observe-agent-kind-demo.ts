import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "observe-agent-kind-demo",
    title: "Break a kind cluster on purpose, then watch the Observe agent",
    description:
      "One command from kprompt-examples: kind up, seven failure scenarios, verify they actually broke, then run the Observe agent offline in heuristic mode.",
    publishedAt: "2026-07-26",
    author: MUHTALIP_DEDE,
    tags: ["observe", "demo", "kind", "tutorial"],
    keywords: [
      "kprompt examples",
      "kubernetes observe agent demo",
      "kind crashloop demo",
      "make walkthrough",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "v0.5 shipped the optional Observe agent. The missing piece for a live walkthrough was a payments namespace that actually misbehaves — not a slide claiming CrashLoopBackOff. kprompt-examples is that fixture set.",
        links: [
          {
            label: "kprompt-examples",
            href: "https://github.com/kprompt/kprompt-examples",
          },
          { label: "Observe agent docs", href: "/docs/agent" },
        ],
      },
      {
        type: "h2",
        text: "One command",
      },
      {
        type: "code",
        caption: "up → break-all → verify → agent-full (~45s)",
        code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make walkthrough`,
      },
      {
        type: "p",
        text: "Needs Docker, kind, kubectl, and kprompt v0.5+ (the agent subcommand). Heuristic mode — no LLM API key, no spend. DEMO_SECONDS=60 stretches the agent window for recordings.",
      },
      {
        type: "h2",
        text: "What you should see",
      },
      {
        type: "ul",
        items: [
          "CrashLoop, ImagePull, OOM, stalled rollout, unbound PVC, failing CronJob, missing Redis hostname",
          "Health score move while baseline web stays Ready (so the score has something healthy to weigh against)",
          "Correlated incidents and gated alerts — not one Slack message per kubelet Event",
          "With --autopilot-propose: a propose-only rollback suggestion on the stalled checkout rollout (Applied stays false)",
        ],
      },
      {
        type: "h2",
        text: "Honest limits",
      },
      {
        type: "p",
        text: "Heuristic analysis is deterministic and offline — useful for demos and CI, not a substitute for a real LLM run. Autopilot remains propose-only. Redis/Postgres in the dependency scenario are busybox stubs for Service-name discovery, not databases. Full caveats live in the examples README.",
        links: [
          {
            label: "Examples README",
            href: "https://github.com/kprompt/kprompt-examples#readme",
          },
          { label: "v0.5 release notes", href: "/blog/kprompt-v0-5-observe-agent" },
        ],
      },
    ],
  };

export default post;
