import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kprompt-v0-5-observe-agent",
    title: "kprompt v0.5: optional Observe agent, still no silent Autopilot",
    description:
      "v0.5 ships the namespace-scoped Observe agent — watch → Incident → gated Slack/webhook — plus Operator, memory, patterns, and Autopilot propose-only under ADR-0015. The laptop CLI stays plan → approve → apply.",
    publishedAt: "2026-07-25",
    updatedAt: "2026-07-25",
    author: MUHTALIP_DEDE,
    tags: ["announcement", "release", "observe", "agent"],
    keywords: [
      "kprompt v0.5",
      "kubernetes observe agent",
      "in-cluster AI SRE",
      "slack kubernetes alerts",
      "autopilot propose-only",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "kprompt v0.5 is out. The headline is an optional in-cluster Observe agent: continuously watch one namespace, correlate Incidents, optionally analyze with your BYOK LLM, and notify Slack or a webhook — without turning into a silent auto-healer.",
        links: [
          { label: "GitHub release", href: "https://github.com/kprompt/kprompt/releases/tag/v0.5.0" },
          { label: "Observe agent docs", href: "/docs/agent" },
        ],
      },
      {
        type: "h2",
        text: "What shipped",
      },
      {
        type: "ul",
        items: [
          "kprompt agent run — Pods/Events (and optional workloads) → Incidents → gated AgentAlert",
          "Helm chart charts/kprompt-agent + Operator charts/kprompt-operator for KpromptAgent CRs",
          "Namespace memory (--memory) and pattern learning (--patterns / “seen before”)",
          "Autopilot propose-only (--autopilot-propose) under ADR-0015 — Applied stays false",
          "Same laptop CLI as v0.4: plan → safety → approve → apply, day-2 integrations, multi-context",
        ],
      },
      {
        type: "h2",
        text: "Honest positioning",
      },
      {
        type: "table",
        headers: ["Peer", "Their job", "Ours in v0.5"],
        rows: [
          [
            "K8sGPT",
            "On-demand analyzer / scan → explain",
            "Always-on watch → correlated Incident → confidence-gated alert",
          ],
          [
            "Kagent",
            "In-cluster multi-agent framework",
            "One kprompt-native Observe pipeline — not a general agent platform",
          ],
          [
            "kubectl-ai",
            "NL CLI / agentic kubectl fluency",
            "Same NL-CLI lane; mutate stays PlanResult → approve",
          ],
        ],
      },
      {
        type: "p",
        text: "Default install is still Observe (read Role). Autopilot is opt-in and propose-only: allowlisted rollbackFailedRollout proposals plus a local audit log. No silent apply. Details: ADR-0013 (Observe) and ADR-0015 (Autopilot).",
        links: [
          {
            label: "ADR-0013",
            href: "https://github.com/kprompt/kprompt-architecture/blob/main/decisions/ADR-0013-in-cluster-agent.md",
          },
          {
            label: "ADR-0015",
            href: "https://github.com/kprompt/kprompt-architecture/blob/main/decisions/ADR-0015-autopilot-mode.md",
          },
        ],
      },
      {
        type: "h2",
        text: "Try it",
      },
      {
        type: "code",
        caption: "Install v0.5 + laptop smoke",
        code: `curl -fsSL https://kprompt.ai/install | bash
# or pin: brew install kprompt/tap/kprompt

kprompt agent run -n payments --analyze --fetch-logs --health --heuristic
kprompt agent run -n payments --analyze --heuristic --memory --patterns --autopilot-propose`,
      },
      {
        type: "code",
        caption: "Broken demo cluster (kind)",
        code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make up && make break SCENARIO=01-crashloop && make verify
kprompt agent run -n payments --analyze --health --heuristic`,
      },
      {
        type: "code",
        caption: "Helm Observe agent",
        code: `kubectl -n payments create secret generic kprompt-agent \\
  --from-literal=OPENAI_API_KEY="$OPENAI_API_KEY"
helm upgrade --install kprompt-agent ./charts/kprompt-agent \\
  -n payments --create-namespace \\
  --set image.tag=0.5.0`,
      },
      {
        type: "p",
        text: "Full flags, RBAC, LLM cost notes, and CRD status sync live on the Observe agent docs page. For a reproducible broken namespace, use kprompt-examples. The CLI remains experimental — review every mutating plan before apply.",
        links: [
          { label: "Observe agent docs", href: "/docs/agent" },
          {
            label: "kprompt-examples",
            href: "https://github.com/kprompt/kprompt-examples",
          },
          { label: "Install", href: "/docs/install" },
          { label: "Roadmap", href: "/docs/roadmap" },
        ],
      },
    ],
  };

export default post;
