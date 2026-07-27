import { SITE } from "@/lib/constants";
import { DOCS_PAGES, type DocsBlock, type DocsPage } from "@/lib/docs-content";
import { FAQ } from "@/lib/faq";
import { getPostBySlug } from "@/lib/blog-posts";

/** Bump when docs copy changes so sitemap / TechArticle stay fresh. */
export const DOCS_CONTENT_UPDATED_AT = "2026-07-27";

/** Docs pages in canonical nav order, keyed for DOCS_PAGES lookup. */
export const DOCS_FULL_INDEX = [
  { href: "/docs", key: "overview" },
  { href: "/docs/install", key: "install" },
  { href: "/docs/quickstart", key: "quickstart" },
  { href: "/docs/commands", key: "commands" },
  { href: "/docs/dash", key: "dash" },
  { href: "/docs/multi-cluster", key: "multiCluster" },
  { href: "/docs/themes", key: "themes" },
  { href: "/docs/integrations", key: "integrations" },
  { href: "/docs/architecture", key: "architecture" },
  { href: "/docs/agent", key: "agent" },
  { href: "/docs/roadmap", key: "roadmap" },
  { href: "/docs/team", key: "team" },
  { href: "/docs/safety", key: "safety" },
  { href: "/docs/providers", key: "providers" },
  { href: "/docs/ci", key: "ci" },
] as const satisfies ReadonlyArray<{
  href: string;
  key: keyof typeof DOCS_PAGES;
}>;

const HIGH_SIGNAL_SLUGS = [
  "observe-agent-kind-demo",
  "kprompt-v0-5-observe-agent",
  "building-ai-sre-in-public",
  "building-ai-sre-01-why",
  "building-ai-sre-02-intent-compiler",
  "building-ai-sre-03-planresult",
  "building-ai-sre-04-safety",
  "kprompt-vs-kubectl-ai",
  "intent-compiler-not-chat",
  "ai-sre-not-ai-kubectl",
  "what-is-kubernetes-ai",
  "kubernetes-ai-tools-comparison",
  "optimize-my-cluster",
  "planresult-json-deep-dive",
  "kubernetes-ci-cd-plan-gates",
  "kubernetes-oomkilled",
  "kubernetes-crashloopbackoff",
  "kubernetes-imagepullbackoff",
  "kubectl-cheat-sheet-natural-language",
  "kubernetes-error-prompt-playbook",
  "kubernetes-troubleshooting-guide",
  "kubectl-alternatives",
  "kubectl-vs-k9s",
  "kubernetes-safety-plan-approve",
  "kubernetes-llm-providers-byok",
] as const;

function blocksToMarkdown(blocks: DocsBlock[]): string {
  const lines: string[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "h2":
        lines.push(`## ${block.text}`, "");
        break;
      case "h3":
        lines.push(`### ${block.text}`, "");
        break;
      case "p":
        lines.push(block.text, "");
        break;
      case "ul":
        for (const item of block.items) {
          lines.push(`- ${item}`);
        }
        lines.push("");
        break;
      case "code":
        if (block.caption) lines.push(`(${block.caption})`);
        lines.push("```", block.code, "```", "");
        break;
      case "table": {
        lines.push(`| ${block.headers.join(" | ")} |`);
        lines.push(`| ${block.headers.map(() => "---").join(" | ")} |`);
        for (const row of block.rows) {
          lines.push(`| ${row.join(" | ")} |`);
        }
        lines.push("");
        break;
      }
      default:
        break;
    }
  }

  return lines.join("\n").trimEnd();
}

function pageToMarkdown(path: string, page: DocsPage): string {
  return [
    `# ${page.title}`,
    "",
    `URL: ${SITE.url}${path}`,
    "",
    page.description,
    "",
    blocksToMarkdown(page.blocks),
  ].join("\n");
}

/** Full plain-text corpus for AI crawlers (llms-full.txt). */
export function buildLlmsFullText(): string {
  const sections: string[] = [
    `# ${SITE.name} — full documentation for AI assistants`,
    "",
    `> ${SITE.description}`,
    "",
    `Canonical site: ${SITE.url}`,
    `llms.txt index: ${SITE.url}/llms.txt`,
    `GitHub: ${SITE.github}`,
    `X: ${SITE.twitter}`,
    `LinkedIn: ${SITE.linkedin}`,
    `Bluesky: ${SITE.bluesky}`,
    `Contact: ${SITE.email}`,
    `License: ${SITE.license}`,
    `Version: v${SITE.version}`,
    `Docs last updated: ${DOCS_CONTENT_UPDATED_AT}`,
    "",
    "## Positioning (honest)",
    "",
    "- Same NL-CLI lane as kubectl-ai; different mutate contract (plan → safety → approve).",
    "- Not a K8sGPT fleet scanner; not a Kagent multi-agent framework; not a hosted Lens clone.",
    "- Optional in-cluster Observe agent (Helm): namespace watch → Incident → gated notify.",
    "- Autopilot (ADR-0015) is propose-only by default — never silent apply.",
    "- Architecture diagrams: intent compiler + AI SRE dual path + Observe pipeline — /docs/architecture.",
    "- Long-term direction: AI SRE (investigate / why / timeline) still under approval — see roadmap.",
    "",
    "## FAQ",
    "",
  ];

  for (const entry of FAQ) {
    sections.push(`### ${entry.question}`, "", entry.answer, "");
    if (entry.more) {
      sections.push(
        `More: ${entry.more.href.startsWith("http") ? entry.more.href : `${SITE.url}${entry.more.href}`}`,
        ""
      );
    }
  }

  sections.push("---", "", "# Documentation", "");

  for (const item of DOCS_FULL_INDEX) {
    const page = DOCS_PAGES[item.key];
    sections.push(pageToMarkdown(item.href, page), "", "---", "");
  }

  sections.push("# High-signal articles (summaries)", "");

  for (const slug of HIGH_SIGNAL_SLUGS) {
    const post = getPostBySlug(slug);
    if (!post) continue;
    sections.push(
      `## ${post.title}`,
      "",
      `URL: ${SITE.url}/blog/${post.slug}`,
      `Published: ${post.publishedAt}`,
      "",
      post.description,
      ""
    );
  }

  sections.push(
    "## Optional Team app",
    "",
    `${SITE.app} — early; CLI stays free; nothing to buy as a public signup product today.`,
    ""
  );

  return sections.join("\n").trimEnd() + "\n";
}
