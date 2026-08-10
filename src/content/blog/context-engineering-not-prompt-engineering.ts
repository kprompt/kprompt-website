import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "context-engineering-not-prompt-engineering",
    title:
      "Prompt engineering is dead. Context engineering begins",
    description:
      "For Kubernetes AI, clever prompts lose to curated context: live cluster facts, tool detection, local history, and a typed PlanResult. Why the next leap is what you feed the model — not how you word the sentence.",
    publishedAt: "2026-07-28",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "architecture",
      "platform engineering",
      "devops",
    ],
    keywords: [
      "context engineering",
      "prompt engineering is dead",
      "context engineering vs prompt engineering",
      "llm context kubernetes",
      "ai kubernetes context",
      "planresult context",
      "kubernetes llm context window",
      "tools detect llm",
      "prompt history kubernetes",
      "ai sre context engineering",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "For a few years, “prompt engineering” meant the craft of wording: system instructions, few-shot examples, magic phrases that coaxed better answers. That craft still matters at the margins. It is no longer the main lever for production AI on Kubernetes.",
      },
      {
        type: "p",
        text: "When the model is supposed to help operate a cluster, the bottleneck is almost never the English. It is whether the model sees the right facts — namespace, Deployment status, recent events, whether Helm and Prometheus exist, what you asked last Tuesday — before it proposes a change. That discipline is context engineering: designing what enters the model, what stays out, and what becomes a reviewable artifact after.",
        links: [
          {
            label: "intent compiler",
            href: "/blog/intent-compiler-not-chat",
          },
          {
            label: "PlanResult deep dive",
            href: "/blog/planresult-json-deep-dive",
          },
        ],
      },
      {
        type: "h2",
        text: "Prompt engineering optimized sentences. Ops needs state.",
      },
      {
        type: "p",
        text: "A beautiful prompt that says “you are a careful SRE” does not know that payment-api is CrashLooping in staging, that the last rollout was three hours ago, or that Prometheus is installed but the ServiceMonitor is missing. Without that state, the model invents a plausible story — or asks you to paste kubectl output by hand.",
      },
      {
        type: "table",
        headers: ["Prompt engineering instinct", "Context engineering instinct"],
        rows: [
          [
            "Better wording → better answer",
            "Better evidence → better plan",
          ],
          [
            "System prompt is the product",
            "Retrieved / gathered facts are the product",
          ],
          [
            "Optimize for chat quality",
            "Optimize for a refuse-able change",
          ],
          [
            "Hide tool mess from the user",
            "Surface tools, risk, and diffs before apply",
          ],
        ],
      },
      {
        type: "p",
        text: "Operators already practice a crude form of context engineering: they open three terminals, scrape events, copy logs into a ticket, and only then ask a colleague “what do you think?” An AI CLI that skips that step and jumps straight to mutate is not clever — it is ungrounded.",
      },
      {
        type: "h2",
        text: "What “context” means for a Kubernetes CLI",
      },
      {
        type: "p",
        text: "In kprompt, context is not a vague vibe. It is a stack of concrete inputs the planner and LLM can use — always under the same plan → safety → approve contract:",
      },
      {
        type: "ul",
        items: [
          "Live cluster reads — status, events, logs, selectors — gathered for the intent, not pasted from memory",
          "Tool detection — which day-2 backends exist (Helm, Prometheus, GitOps, mesh, …) so plans do not invent CLIs you do not have",
          "Local history — ~/.kprompt/history.jsonl for replay and “what did I ask?” without shipping secrets to a SaaS memory store",
          "Explicit scopes — namespace, context alias, multi-context fan-out rules so the model does not silently widen blast radius",
          "Typed PlanResult — the output context humans and CI actually gate on",
        ],
      },
      {
        type: "p",
        text: "doctor and integrations detection are part of that stack: they tell you (and the tool) what is available before a fancy prompt pretends every CNCF project is installed. Multi-context makes the same point at cluster scope — read fan-out is allowed; one --approve must not mutate everywhere.",
        links: [
          { label: "doctor / install", href: "/docs/install" },
          { label: "Integrations", href: "/docs/integrations" },
          {
            label: "Multi-context (series ep.5)",
            href: "/blog/building-ai-sre-05-multi-context",
          },
        ],
      },
      {
        type: "code",
        caption: "Same sentence, different context → different honesty",
        code: `# No cluster facts: the model guesses.
kprompt "why is api slow?"

# Scoped + tools present: plan can cite real reads / Prom paths.
kprompt "why is my api slow?" -n production
kprompt doctor   # which keys, which integrations, which context`,
      },
      {
        type: "h2",
        text: "Four layers of context (and what not to dump)",
      },
      {
        type: "p",
        text: "Context engineering fails in two opposite ways: starving the model, or stuffing the entire cluster into the window. A useful mental model:",
      },
      {
        type: "table",
        headers: ["Layer", "Examples", "Rule"],
        rows: [
          [
            "Session",
            "Current prompt, -n / --context, flags",
            "Always explicit; never imply production from habit",
          ],
          [
            "Live evidence",
            "get/describe/logs/events for the named objects",
            "Fetch for the intent; truncate; no secret values",
          ],
          [
            "Environment profile",
            "tools detect, doctor, kubeconfig context name",
            "Shape which backends the planner may propose",
          ],
          [
            "Memory",
            "Local history, future ADRs / cluster profile",
            "Local-first; opt-in; never silent mutate from memory",
          ],
        ],
      },
      {
        type: "p",
        text: "What stays out of the prompt by design: kubeconfig files, API keys (beyond the BYOK call to your provider), full manifests in history, and “remember this forever in our cloud.” If memory ships, it should be local or org-governed — not a free-form chat log that becomes the control plane.",
        links: [
          {
            label: "BYOK providers",
            href: "/blog/kubernetes-llm-providers-byok",
          },
          { label: "Safety docs", href: "/docs/safety" },
        ],
      },
      {
        type: "h2",
        text: "The artifact is context too",
      },
      {
        type: "p",
        text: "People treat “context” as only model input. For ops, the output is equally part of the contract. A PlanResult — intent, ordered actions, risk, denied, applied — is context for the next human, the next CI job, and the next history rerun. Chat narration that evaporates after the session is not.",
      },
      {
        type: "code",
        caption: "Output context CI can gate",
        code: `kprompt "scale api to 3" -n staging -o json | \\
  jq '{intent:.plan.intent, risk:.risk, denied:.risk.denied}'

kprompt history
kprompt history rerun 2   # replay with the same gate`,
      },
      {
        type: "p",
        text: "That is why an intent compiler and context engineering are the same bet: you engineer what the model sees so the plan is grounded, and you engineer what the tool emits so a human can refuse it. Prompt magic without either side is theater.",
        links: [
          {
            label: "CI plan gates",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
          { label: "CI docs", href: "/docs/ci" },
        ],
      },
      {
        type: "h2",
        text: "Observe agents raise the stakes",
      },
      {
        type: "p",
        text: "Always-on agents make context engineering mandatory. An Observe loop that correlates CrashLoops and fires Slack must ground alerts in live evidence — not in a system prompt that says “be accurate.” Autopilot that proposes remediations still has to attach a gated plan; silent apply from a fat context window is still silent apply.",
        links: [
          {
            label: "Observe agent release notes",
            href: "/blog/kprompt-v0-5-observe-agent",
          },
          { label: "Agent docs", href: "/docs/agent" },
          {
            label: "Building AI SRE in Public",
            href: "/blog/building-ai-sre-in-public",
          },
        ],
      },
      {
        type: "p",
        text: "The series path — Intent Compiler → PlanResult → Safety → Multi-context — is really a context architecture: compile intent, attach evidence, score risk, respect cluster boundaries. Investigation graphs and timelines are the next context layers (building / exploring), not a reason to skip the gate.",
      },
      {
        type: "h2",
        text: "What still is prompt craft",
      },
      {
        type: "p",
        text: "Context engineering does not delete good prompts. Operators still benefit from clear intents: name the object, name the namespace, say the goal (“explain why,” “scale to 3,” “install redis”). Ambiguous wipe jokes and unscoped deletes are bad prompts and bad context — safety hard-denies help, but precise asks make better plans.",
        links: [
          {
            label: "Error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          {
            label: "Edge-case prompts",
            href: "/blog/kubernetes-edge-case-prompts",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Do: “explain why payment-api is CrashLooping in staging”",
          "Don’t: “fix prod” and hope the model hesitates",
          "Do: rerun from history when the plan shape is known",
          "Don’t: treat --approve as a substitute for reading the plan",
        ],
      },
      {
        type: "h2",
        text: "Try the context loop, not a magic phrase",
      },
      {
        type: "code",
        caption: "Install → doctor → grounded explain",
        code: `brew install kprompt/tap/kprompt
# or: curl -fsSL https://kprompt.ai/install | bash

export KPROMPT_GEMINI_API_KEY="..."
kprompt doctor
kprompt "list deployments" -n default
kprompt "explain why api is crashing" -n staging`,
      },
      {
        type: "p",
        text: "Score the tool on whether the plan cites real cluster state and whether you can refuse it — not on whether a clever system prompt made the chat feel smart. Prompt engineering is not evil; for Kubernetes AI it is no longer the product. Context is.",
        links: [
          { label: "Quickstart", href: "/docs/quickstart" },
          {
            label: "AI SRE positioning",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  };

export default post;
