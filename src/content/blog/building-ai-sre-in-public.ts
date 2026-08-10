import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "building-ai-sre-in-public",
    title: "Building AI SRE in Public",
    description:
      "A long-form series on building an AI SRE under an approval boundary — intent compiler, PlanResult, safety, multi-context, investigation, and why we refuse unsupervised auto-remediation. Episode index and honesty rules.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "platform engineering",
      "devops",
      "open source",
    ],
    keywords: [
      "building ai sre in public",
      "ai sre kubernetes series",
      "intent compiler kubernetes",
      "plan before apply",
      "aiops vs ai sre",
      "kubernetes approval boundary",
      "open source ai sre",
      "kprompt roadmap series",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "kprompt started as an AI Kubernetes CLI: natural language becomes a reviewable plan, then you approve before apply. That wedge still ships today. The longer bet is AI SRE — a system that can investigate, explain why, show blast radius, and verify outcomes without silently mutating production. This series is how we build that bet in public.",
        links: [
          {
            label: "Beyond AI kubectl",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
      {
        type: "p",
        text: "We are not writing weekly changelog fluff. Each episode is a durable essay: a design claim, what already exists in the CLI, what is still building or exploring, and what we explicitly refuse. Share it on Hacker News or in a CNCF channel if the idea is useful even if you never install the binary.",
      },
      {
        type: "h2",
        text: "Rules of the series",
      },
      {
        type: "ul",
        items: [
          "Shipped / building / exploring — never imply a demo is a product",
          "Approval boundary stays load-bearing — no silent apply across contexts",
          "Typed outputs over chat vibes — PlanResult, risk, hard denies",
          "Prefer non-production while you learn; experimental software",
          "CLI stays Apache-2.0; no “buy Team to make the series real”",
        ],
      },
      {
        type: "h2",
        text: "Episodes",
      },
      {
        type: "table",
        headers: ["#", "Topic", "Status"],
        rows: [
          ["1", "Why AI SRE", "Published"],
          ["2", "Intent Compiler", "Published"],
          ["3", "PlanResult", "Published"],
          ["4", "Safety Engine", "Published"],
          ["5", "Multi-context", "Published"],
          ["6", "Investigation Graph", "Published"],
          ["7", "AI Timeline", "Published"],
          ["8", "Cluster Memory", "Published"],
          ["9", "Knowledge Graph", "Published"],
          ["10", "Autonomous SRE — and why not yet", "Published"],
        ],
      },
      {
        type: "p",
        text: "Read episodes in order: Why AI SRE → Intent Compiler → PlanResult → Safety Engine → Multi-context → Investigation Graph → AI Timeline → Cluster Memory → Knowledge Graph → Autonomous SRE (why not yet). Earlier positioning posts (PlanResult JSON field guide, vs kubectl-ai, plan-approve) remain companions; this series goes deeper and stays chronological.",
        links: [
          {
            label: "Why AI SRE",
            href: "/blog/building-ai-sre-01-why",
          },
          {
            label: "Intent Compiler (ep.2)",
            href: "/blog/building-ai-sre-02-intent-compiler",
          },
          {
            label: "PlanResult (ep.3)",
            href: "/blog/building-ai-sre-03-planresult",
          },
          {
            label: "Safety Engine (ep.4)",
            href: "/blog/building-ai-sre-04-safety",
          },
          {
            label: "Multi-context (ep.5)",
            href: "/blog/building-ai-sre-05-multi-context",
          },
          {
            label: "Investigation Graph (ep.6)",
            href: "/blog/building-ai-sre-06-investigation-graph",
          },
          {
            label: "AI Timeline (ep.7)",
            href: "/blog/building-ai-sre-07-timeline",
          },
          {
            label: "Cluster Memory (ep.8)",
            href: "/blog/building-ai-sre-08-cluster-memory",
          },
          {
            label: "Knowledge Graph (ep.9)",
            href: "/blog/building-ai-sre-09-knowledge-graph",
          },
          {
            label: "Autonomous SRE (ep.10)",
            href: "/blog/building-ai-sre-10-autonomous-not-yet",
          },
          {
            label: "Plan → approve",
            href: "/blog/kubernetes-safety-plan-approve",
          },
        ],
      },
      {
        type: "h2",
        text: "Who this is for",
      },
      {
        type: "ul",
        items: [
          "Platform / SRE engineers evaluating AI tools that touch clusters",
          "Builders designing agentic ops who need fail-closed patterns",
          "CNCF practitioners who care about GitOps, Prom, OTel — not only chat CLIs",
        ],
      },
      {
        type: "h2",
        text: "Try the wedge while you read",
      },
      {
        type: "code",
        caption: "Safe read on a non-prod context",
        code: `brew install kprompt/tap/kprompt
# or: curl -fsSL https://kprompt.ai/install | bash

export KPROMPT_GEMINI_API_KEY="..."
kprompt "list deployments"
kprompt "optimize my cluster"`,
      },
      {
        type: "p",
        text: "Star the repo, open issues when an episode claims something the CLI cannot do yet, and follow the index as later episodes land.",
        links: [
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Docs", href: "/docs" },
        ],
      },
    ],
  };

export default post;
