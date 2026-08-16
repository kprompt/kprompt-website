import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "observe-agent-alert-fatigue",
  title: "Stop paging on every kubelet Event: Incidents + confidence gates",
  description:
    "Always-on Kubernetes watch only helps if you correlate into Incidents and gate by severity and confidence — not one Slack message per BackOff.",
  publishedAt: "2026-08-16",
  author: MUHTALIP_DEDE,
  tags: ["observe", "sre", "alerting", "kubernetes"],
  keywords: [
    "kubernetes alert fatigue",
    "observe agent incidents",
    "kubelet event slack noise",
    "min-severity min-confidence",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "Wiring kubectl get events into Slack feels productive for about a day. Then CrashLoop storms reopen the same fingerprint every few seconds, ImagePull retries spam the channel, and nobody trusts the bot. Always-on watch is only useful if the product artifact is a correlated Incident — not a raw Event dump.",
      links: [{ label: "Observe agent docs", href: "/docs/agent" }],
    },
    {
      type: "h2",
      text: "The failure mode: Event → page",
    },
    {
      type: "ul",
      items: [
        "One message per kubelet Event → thread death under restart storms",
        "LLM called on every raw API event → cost and latency spikes with no extra truth",
        "No durable “open incident” → you cannot ask why later or mark false positive",
        "No severity/confidence gate → low-signal noise trains the team to ignore alerts",
      ],
    },
    {
      type: "h2",
      text: "Observe pipeline (gated)",
    },
    {
      type: "p",
      text: "kprompt’s optional Observe agent watches Pods/Events (and optional workloads) in one namespace, correlates into durable Incidents, optionally analyzes with your BYOK LLM, then notifies Discord, Slack, or a webhook only after a severity + confidence gate. Default Observe never applies, patches, or deletes.",
      links: [
        {
          label: "ADR-0013",
          href: "https://github.com/kprompt/kprompt-architecture/blob/main/decisions/ADR-0013-in-cluster-agent.md",
        },
      ],
    },
    {
      type: "code",
      caption: "watch → Incident → gate → notify (laptop smoke)",
      code: `kprompt agent run -n payments \\
  --emit-initial --analyze --fetch-logs --health \\
  --min-severity medium --min-confidence 0.7`,
    },
    {
      type: "h2",
      text: "Levers that cut fatigue",
    },
    {
      type: "table",
      headers: ["Lever", "What it does"],
      rows: [
        [
          "--heuristic",
          "Zero token spend; deterministic detectors for demos and many day-2 signals",
        ],
        [
          "--min-severity / --min-confidence",
          "Defaults medium / 0.7 — raise both to cut noise and LLM burn",
        ],
        [
          "Incident batching",
          "One analysis per evidence fingerprint, not per raw Event",
        ],
        [
          "--memory / --patterns",
          "Namespace facts + “seen before” bias confidence — never sole proof of root cause",
        ],
        [
          "Slack threads",
          "Prefer bot + channel update-in-thread over a new webhook post per pulse",
        ],
      ],
    },
    {
      type: "p",
      text: "Rough expectation from the ops runbook: busy namespace with LLM on and gate at medium/0.7 → a handful of completions per real incident, not hundreds per hour. If spend spikes, check the gate and whether CrashLoop storms reopen fingerprints.",
      links: [
        {
          label: "agent-ops (cost + fatigue)",
          href: "https://github.com/kprompt/kprompt/blob/main/docs/agent-ops.md",
        },
      ],
    },
    {
      type: "h2",
      text: "Memory and patterns are bias, not proof",
    },
    {
      type: "p",
      text: "Namespace memory and pattern learning can boost confidence when a signature looks familiar, and Slack false-positive feedback can dampen repeat noise. They must not invent root cause alone. If Prom, OTel, or GitOps evidence is missing, Observe degrades honestly — it does not fabricate metrics.",
      links: [
        { label: "Cluster memory", href: "/blog/building-ai-sre-08-cluster-memory" },
      ],
    },
    {
      type: "h2",
      text: "Autopilot stays propose-only",
    },
    {
      type: "p",
      text: "Optional --autopilot-propose emits PlanResult-shaped remediations with Applied false. Silent heal is not the goal. Apply remains policy + allowlist + explicit approve under ADR-0015.",
      links: [
        {
          label: "Autonomous not yet",
          href: "/blog/building-ai-sre-10-autonomous-not-yet",
        },
        {
          label: "ADR-0015",
          href: "https://github.com/kprompt/kprompt-architecture/blob/main/decisions/ADR-0015-autopilot-mode.md",
        },
      ],
    },
    {
      type: "h2",
      text: "Try it without paging anyone",
    },
    {
      type: "code",
      caption: "Break kind on purpose, then watch gated Incidents ($0)",
      code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make walkthrough`,
    },
    {
      type: "p",
      text: "Heuristic mode needs no API key. For a Slack path, add --slack (or Discord webhook) only after the gate settings match your tolerance. Experimental — prefer kind / non-prod first.",
      links: [
        { label: "Observe on kind", href: "/blog/observe-agent-kind-demo" },
        { label: "v0.5 release notes", href: "/blog/kprompt-v0-5-observe-agent" },
        {
          label: "kprompt-examples",
          href: "https://github.com/kprompt/kprompt-examples",
        },
      ],
    },
  ],
};

export default post;
