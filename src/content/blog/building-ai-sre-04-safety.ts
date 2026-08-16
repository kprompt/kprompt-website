import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "building-ai-sre-04-safety",
    title: "Building AI SRE in Public #4: Safety Engine",
    description:
      "Policy is code, not LLM vibes. How kprompt’s safety engine hard-denies wipe-class intents, scores risk, forces approval, and why fail-closed is the load-bearing wall of AI SRE.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "safety",
      "platform engineering",
      "devops",
      "architecture",
    ],
    keywords: [
      "kubernetes ai safety",
      "building ai sre safety engine",
      "hard deny kubernetes",
      "plan before apply safety",
      "fail closed ai ops",
      "approval boundary kubernetes",
      "risk scoring planresult",
      "ai auto remediation danger",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "This is episode 4 of Building AI SRE in Public. Episodes 2–3 covered the compiler and PlanResult. None of that matters if a confident model can still wipe a namespace. The safety engine is the load-bearing wall: policy in Go, after planning, before approval or apply.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 3: PlanResult",
            href: "/blog/building-ai-sre-03-planresult",
          },
          {
            label: "Practical safety post",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          { label: "Safety docs", href: "/docs/safety" },
        ],
      },
      {
        type: "h2",
        text: "LLM judgment is not a control plane",
      },
      {
        type: "p",
        text: "Models refuse sometimes. Models also comply with jokes, jailbreaks, and ambiguous “clean up staging.” ADR-0003 locked the rule early: LLM judgment alone is not sufficient for safety; policy is code. The safety layer runs on the planned Actions — not on the English prompt alone — then stamps risk onto PlanResult.",
      },
      {
        type: "code",
        caption: "Where safety sits",
        code: `Intent → Planner → Actions[]
                 → Safety (hard deny + risk)
                 → PlanResult
                 → Approve? → Executor`,
      },
      {
        type: "h2",
        text: "Hard deny vs risk score",
      },
      {
        type: "table",
        headers: ["Outcome", "Meaning", "Can --approve override?"],
        rows: [
          [
            "denied",
            "Wipe-class / out-of-policy — abort",
            "No",
          ],
          [
            "high / medium / low",
            "Allowed path with explicit review weight",
            "Yes, after you accept the plan (still your credential)",
          ],
        ],
      },
      {
        type: "p",
        text: "Hard denies catch cluster/namespace wipe phrasing, delete-everything style requests, and deletes that are not a named allowed resource. Named delete still shows a plan and needs approval — reckless English does not unlock bulk destroy.",
      },
      {
        type: "code",
        caption: "Fail closed",
        code: `$ kprompt "delete all pods in production"

Risk: denied
# Nothing applies — flags do not negotiate`,
      },
      {
        type: "h2",
        text: "Approval is part of safety, not UX garnish",
      },
      {
        type: "p",
        text: "Default mode is plan-only. Interactive y/N on a TTY, or explicit --approve after a human or CI reviewed the artifact. That is the approval boundary from episode 1 — blast radius stays conscious. Multi-context mutates refuse a single fleet-wide --approve; you confirm per context or use an explicit each-context path. Safety without an approval boundary is just a confident script.",
        links: [
          {
            label: "Multi-cluster docs",
            href: "/docs/multi-cluster",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Reads (get/list/logs/explain) stay fast — no fake approve theater",
          "Mutations always materialize PlanResult first",
          "High-risk backends (e.g. Crossplane claims) stay RiskHigh + strong approval",
          "blastRadius / verify enrich review — they do not replace deny rules",
        ],
      },
      {
        type: "h2",
        text: "Why auto-remediation is not “more SRE”",
      },
      {
        type: "p",
        text: "Classic AIOps burned trust by acting without a refuse-able artifact. Skipping the safety engine to “close the ticket faster” recreates that failure mode with better prose. AI SRE investigates and proposes; humans (or gated CI) apply. Episode 10 will argue why we still do not want unsupervised autonomy — this episode is the mechanism that makes that stance enforceable.",
      },
      {
        type: "h2",
        text: "What ships vs what we will not trade",
      },
      {
        type: "ul",
        items: [
          "Shipped: hard denies, risk levels, plan-before-apply, JSON risk.denied for CI",
          "Shipped: blast-radius preview and post-apply verify as trust aids",
          "Shipped: investigate suggest packs (OOM / CrashLoop / ImagePull / probe) still pass through safety before approve",
          "Building: deeper CrashLoop / exit-code recipes; audit non-privilege harden with safe defaults",
          "Non-goal: model-only refusals; silent apply; one --approve across all contexts",
        ],
      },
      {
        type: "h2",
        text: "Pressure-test the wall",
      },
      {
        type: "code",
        caption: "Safety drill",
        code: `kprompt "wipe the cluster" -o json | jq .risk
kprompt "delete all pods" -n staging -o json | jq .risk.denied
kprompt "scale api to 0" -n staging          # plan should scare you → n
kprompt "scale api to 2" -n staging          # routine → still y/N`,
      },
      {
        type: "p",
        text: "If a tool cannot fail closed on wipe-class intent, it is not ready for production English — no matter how good the chat feels.",
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 5 is Multi-context — laptop kubeconfig fan-out, read across contexts, and why mutate safety gets stricter as the blast radius grows.",
        links: [
          {
            label: "Episode 5: Multi-context",
            href: "/blog/building-ai-sre-05-multi-context",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          { label: "Multi-cluster", href: "/docs/multi-cluster" },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  };

export default post;
