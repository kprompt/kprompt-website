import type { DocsBlock } from "@/lib/docs-content";
import { MUHTALIP_DEDE, type BlogAuthor } from "@/lib/team";

export type { BlogAuthor };
export { MUHTALIP_DEDE };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: BlogAuthor;
  tags: string[];
  blocks: DocsBlock[];
  /** Shown prominently on the blog index. */
  featured?: boolean;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "introducing-kprompt",
    title: "Introducing kprompt: talk to your cluster",
    description:
      "We built an open-source CLI that turns plain English into a reviewable Kubernetes plan — then applies with your approval. Here's why, what shipped, and how to try it.",
    publishedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: ["announcement", "open source", "kubernetes"],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "If you operate Kubernetes, you already know the drill: kubectl for reads, manifests or Helm for changes, dashboards when something breaks, and a mental map of which namespace, context, and deployment name you actually mean. kprompt is our bet that a single sentence should be enough to start — as long as what happens next is visible, reviewable, and under your control.",
      },
      {
        type: "p",
        text: "kprompt is an experimental, MIT-licensed CLI. You type what you want in natural language. The tool turns that into a structured plan against your existing kubeconfig, runs safety checks, asks you to approve on a TTY (unless you pass --approve), and only then executes. No hosted agent in your cluster. No vendor lock-in on the model — bring your own API keys.",
      },
      {
        type: "h2",
        text: "The problem we're solving",
      },
      {
        type: "p",
        text: "LLMs are good at intent: “scale payment-api to three replicas”, “roll back redis”, “why is this pod crash-looping?”. They're not good enough to trust with blind apply. Operators need speed without giving up accountability — especially on shared clusters where a wrong command has blast radius.",
      },
      {
        type: "ul",
        items: [
          "You shouldn't need to memorize kubectl flag order for routine day-2 work",
          "You shouldn't auto-apply model output without seeing the plan first",
          "You shouldn't send cluster credentials to a SaaS control plane just to run a prompt",
        ],
      },
      {
        type: "h2",
        text: "How it works",
      },
      {
        type: "p",
        text: "Every interaction follows the same loop: Prompt → Plan → Safety → Apply. Reads (list, get, logs, describe, explain) run immediately. Mutations always produce a plan first — with live diffs when the API allows — then risk scoring and hard denies before anything touches the cluster.",
      },
      {
        type: "code",
        caption: "Typical flow",
        code: `$ kprompt "scale redis to 2" -n staging

Plan
  1. kubectl scale deployment/redis --replicas=2 -n staging

Risk: low
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "What's in v0.2 today",
      },
      {
        type: "ul",
        items: [
          "Deploy, scale, rollback, and named delete",
          "Read path: get/list, explain, logs, describe",
          "Plan → safety → approve → apply with optional --wait on rollouts",
          "Local prompt history (~/.kprompt/history.jsonl) — no manifests or keys stored",
          "CI-stable JSON PlanResult output for pipeline gates",
          "Multiple LLM providers (Gemini, OpenAI, Anthropic, Groq, Ollama, and others) via BYOK",
        ],
      },
      {
        type: "h2",
        text: "What we're not claiming",
      },
      {
        type: "p",
        text: "kprompt is early software. Plans can be incomplete or wrong. Hard-deny rules catch known-dangerous patterns, but they don't replace your judgment. We don't ship Helm orchestration, GitOps, or in-cluster agents yet — those are on the public roadmap, not hidden behind a paywall.",
      },
      {
        type: "ul",
        items: [
          "Not production-hardened — start on kind or a non-production cluster",
          "Not a replacement for code review of manifests you care about",
          "Not a hosted team product today — org policy and audit are explored for later",
        ],
      },
      {
        type: "h2",
        text: "Try it in five minutes",
      },
      {
        type: "code",
        caption: "Install",
        code: "curl -fsSL https://kprompt.ai/install | bash",
      },
      {
        type: "code",
        caption: "Configure provider and run a read",
        code: `export KPROMPT_GEMINI_API_KEY="..."
kprompt config set provider gemini
kprompt config set namespace default
kprompt "list deployments"`,
      },
      {
        type: "p",
        text: "Full install, provider, safety, and CI docs live at kprompt.ai/docs. Source and issues are on GitHub — contributions and feedback welcome. We'll publish more here as we ship Helm depth, Homebrew, and the next integration layers.",
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
