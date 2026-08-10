import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "building-ai-sre-01-why",
    title: "Building AI SRE in Public #1: Why AI SRE",
    description:
      "AI kubectl is not enough. Production needs investigate, why, blast radius, and verify — still behind an approval boundary. Why the AI SRE category exists, what failed in classic AIOps, and what we ship first.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "platform engineering",
      "devops",
      "aiops",
    ],
    keywords: [
      "why ai sre",
      "ai sre vs ai kubectl",
      "aiops failed kubernetes",
      "approval boundary sre",
      "kubernetes incident ai",
      "building ai sre in public",
      "intent compiler vs chat",
      "human in the loop kubernetes",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "This is episode 1 of Building AI SRE in Public. The series hub lists the full arc — from intent compiler to why we still refuse unsupervised auto-remediation.",
        links: [
          {
            label: "Building AI SRE in Public",
            href: "/blog/building-ai-sre-in-public",
          },
        ],
      },
      {
        type: "p",
        text: "Most “AI for Kubernetes” products today are AI kubectl: natural language that emits or runs kubectl-shaped actions. That is useful. It is not SRE. SRE is the craft of keeping systems reliable under change — detecting symptoms, forming hypotheses, bounding blast radius, changing one thing at a time, and verifying the goal. An AI that only shortens the typing does not change that craft. An AI that participates in that craft — still under your credentials and your approval — is the category we call AI SRE.",
      },
      {
        type: "h2",
        text: "The sentence that defines the category",
      },
      {
        type: "p",
        text: "Imagine an assistant that can say: “Error rate on payment rose after yesterday’s rollout; the Service still selects the old pods; here is a rollback plan with affected namespaces.” That sentence requires investigation graph, timeline, and a typed plan — not a chat transcript. Dashboards show charts. Fleet scanners dump findings. Chat CLIs race to the next kubectl. AI SRE is the system that proposes a reviewable next step.",
        links: [
          {
            label: "Beyond AI kubectl (positioning)",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
        ],
      },
      {
        type: "h2",
        text: "Why classic AIOps struggled",
      },
      {
        type: "p",
        text: "AIOps promised correlation and auto-remediation years before LLMs. Many deployments stalled for boring reasons: brittle rules, noisy alerts, opaque black boxes, and remediation that operators did not trust. The models were weak at intent; the systems were strong at false confidence.",
      },
      {
        type: "ul",
        items: [
          "Rules and ML that could not explain themselves in operator language",
          "Auto-remediation that skipped human judgment on shared clusters",
          "Tools that lived beside kubectl instead of composing with GitOps and metrics",
          "No shared artifact — only tickets, runbooks, and tribal memory",
        ],
      },
      {
        type: "p",
        text: "LLMs change the input side: they parse messy human intent and narrate evidence. They do not magically make unsupervised mutate safe. What changes is the chance to build an intentional loop — compile intent into a typed plan, attach risk and denies, require approval, then verify — instead of a chatbot that “just ran it.”",
      },
      {
        type: "h2",
        text: "Approval boundary is the product",
      },
      {
        type: "p",
        text: "Every production AI agent that can change state needs an approval boundary. Human-in-the-loop is not theater; it is how you keep blast radius conscious. In kprompt the boundary is concrete: PlanResult on stdout (and JSON for CI), safety scoring, hard denies for wipe-class intents, interactive y/N or explicit --approve, and no silent multi-context apply from one flag.",
        links: [
          { label: "Safety docs", href: "/docs/safety" },
          {
            label: "Plan → approve post",
            href: "/blog/kubernetes-safety-plan-approve",
          },
        ],
      },
      {
        type: "code",
        caption: "The contract does not disappear for “smart” features",
        code: `kprompt "scale api to 3" -n staging
# → Plan + risk → Apply? [y/N]

kprompt "optimize my cluster"
# → Report first; mutate follow-ups still need approve`,
      },
      {
        type: "h2",
        text: "What we ship first (wedge, not wish)",
      },
      {
        type: "p",
        text: "AI SRE is the destination. The wedge is already usable: day-2 ops and investigation-shaped reads under the same plan → safety → approve → apply loop, plus integrations (Helm, Prom, OTel, GitOps, …) that keep one approval surface. Optimize reports and dependency graphs are early “think about the cluster” features — still not auto-remediation.",
        links: [
          { label: "Integrations", href: "/docs/integrations" },
          {
            label: "optimize my cluster",
            href: "/blog/optimize-my-cluster",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Shipped: intent → PlanResult → approve; explain/logs; multi-tool routes; namespace memory priors; service-graph MVP",
          "Building: deeper investigate / why / timeline / post-apply verify; richer Knowledge Graph topology UI",
          "Exploring: ADR/docs knowledge nodes — never silent mutate",
        ],
      },
      {
        type: "h2",
        text: "What this episode is not",
      },
      {
        type: "ul",
        items: [
          "Not a claim that kprompt is a finished AI SRE product",
          "Not a pitch for unsupervised auto-remediation",
          "Not “chat replaces kubectl forever” — compilers need escape hatches",
        ],
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 2 digs into the Intent Compiler — why Kubernetes deserves a compiler, not a chatbot, and how Intent → Action → PlanResult becomes the IR. Read it next, or revisit the hub for the full arc.",
        links: [
          {
            label: "Episode 2: Intent Compiler",
            href: "/blog/building-ai-sre-02-intent-compiler",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "intent compiler (short form)",
            href: "/blog/intent-compiler-not-chat",
          },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  };

export default post;
