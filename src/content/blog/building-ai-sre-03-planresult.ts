import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "building-ai-sre-03-planresult",
    title: "Building AI SRE in Public #3: PlanResult",
    description:
      "PlanResult is the IR of AI SRE: one typed document for humans and CI. Why JSON, what applied means vs verify, how blastRadius attaches, what never gets stored, and how investigate/why must extend the same artifact.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "ci/cd",
      "platform engineering",
      "devops",
      "architecture",
    ],
    keywords: [
      "planresult ai sre",
      "building ai sre planresult",
      "kubernetes plan json",
      "ci plan gate kubernetes",
      "blast radius planresult",
      "post apply verify kubernetes",
      "typed outputs llm ops",
      "kprompt -o json",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "This is episode 3 of Building AI SRE in Public. Episode 2 described the compiler pipeline. This episode is about the artifact that makes the pipeline real: PlanResult — the intermediate representation operators and CI can refuse.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 2: Intent Compiler",
            href: "/blog/building-ai-sre-02-intent-compiler",
          },
          {
            label: "Field guide (schema + jq)",
            href: "/blog/planresult-json-deep-dive",
          },
        ],
      },
      {
        type: "h2",
        text: "One artifact, two audiences",
      },
      {
        type: "p",
        text: "Terminal UX and pipeline gates must share a contract. If humans see one story and CI scrapes another, you have two products. PlanResult is the shared story: intent, ordered actions, risk, denial, applied flag — printable in the TTY, stable as JSON on stdout with --output json (human noise on stderr).",
      },
      {
        type: "code",
        caption: "Same prompt, machine-readable gate",
        code: `kprompt "scale api to 3" -n staging -o json | \\
  jq '{intent:.plan.intent, risk:.risk, denied:.risk.denied, applied:.applied}'`,
      },
      {
        type: "p",
        text: "Platform muscle memory already trusts diffs, PRs, and admission. A chat scroll does not. A PlanResult does. That is why the AI SRE bet grows fields on this document instead of inventing a second “agent transcript” product.",
        links: [
          {
            label: "CI plan gates",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
          { label: "CI / JSON docs", href: "/docs/ci" },
        ],
      },
      {
        type: "h2",
        text: "Why JSON (not YAML) for the public IR",
      },
      {
        type: "ul",
        items: [
          "jq / languages already treat JSON as the default gate format",
          "Strict schemaVersion bumps beat “almost YAML” drift in CI",
          "Kubernetes YAML stays where it belongs — in actions/manifests you review, not as the envelope",
          "Stdout can stay a single document; stderr keeps confirmations and wait lines",
        ],
      },
      {
        type: "p",
        text: "Operators still see a human plan. Machines get JSON. Both must describe the same change.",
      },
      {
        type: "h2",
        text: "applied is not verified",
      },
      {
        type: "p",
        text: "Classic automation lies with success bits. applied means “we executed the approved actions.” It does not mean “replicas are ready” or “error rate recovered.” AI SRE needs a second signal: verify — did the goal hold after --wait? That field is part of the trust loop (T-070): ok / pending / failed / skipped — still on PlanResult, still reviewable in logs.",
      },
      {
        type: "table",
        headers: ["Signal", "Means", "Does not mean"],
        rows: [
          [
            "risk.denied",
            "Safety refused before apply",
            "The cluster is healthy",
          ],
          [
            "applied: true",
            "Approved actions ran",
            "The incident is over",
          ],
          [
            "verify",
            "Post-apply goal check",
            "Permission to skip approval next time",
          ],
        ],
      },
      {
        type: "h2",
        text: "blastRadius: review aid, not a dashboard",
      },
      {
        type: "p",
        text: "Before you type y, you should see who else gets hit: namespaces, owners/labels, related HPA / Service / NetworkPolicy. blastRadius on PlanResult is that preview (T-069) — a mutate review aid, not Lens. It belongs on the plan you approve, not in a separate GUI you forget to open.",
        links: [{ label: "Safety", href: "/docs/safety" }],
      },
      {
        type: "h2",
        text: "What never belongs in PlanResult",
      },
      {
        type: "ul",
        items: [
          "API keys, tokens, kubeconfig contents",
          "Full secret object data",
          "Unbounded log dumps as the primary contract",
          "Model chain-of-thought as a required field for apply",
        ],
      },
      {
        type: "p",
        text: "Local history is intentionally thin for the same reason. CI archives PlanResult; it must not become a secret store. The field guide spells the schema; this series rule is cultural: if it is dangerous to paste into Slack, it does not belong in the IR.",
        links: [
          {
            label: "PlanResult JSON deep dive",
            href: "/blog/planresult-json-deep-dive",
          },
        ],
      },
      {
        type: "h2",
        text: "Growing AI SRE on the same document",
      },
      {
        type: "p",
        text: "Investigate, why trees, timelines, and suggested fixes must attach as structured fields (or nested result payloads) — evidence refs, root-cause summary, optional fix plan that still requires approval. If a feature cannot show up in PlanResult (or a clear read-only report), it is probably not a kprompt feature yet.",
      },
      {
        type: "ul",
        items: [
          "Shipped: core PlanResult + JSON gates; optional blastRadius / verify",
          "Building: richer investigate/why/timeline shapes on the same envelope",
          "Exploring: memory / knowledge feeding planning — still never silent apply",
        ],
      },
      {
        type: "h2",
        text: "Pressure-test as a CI citizen",
      },
      {
        type: "code",
        caption: "Refuse high-risk or denied plans in a pipeline",
        code: `kprompt "scale api to 50" -n prod -o json > plan.json
jq -e '.risk.denied == false and .risk.level != "high"' plan.json
# then human or policy decides --approve`,
      },
      {
        type: "p",
        text: "Score tools on whether this loop is natural. Scraping ANSI from a chat REPL is not a gate; it is a smell.",
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 4 is the Safety Engine — hard denies, risk levels, and why fail-closed beats confident auto-remediation. Read it next.",
        links: [
          {
            label: "Episode 4: Safety Engine",
            href: "/blog/building-ai-sre-04-safety",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Plan → approve",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  };

export default post;
