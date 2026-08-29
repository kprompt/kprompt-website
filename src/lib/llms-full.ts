import { SITE } from "@/lib/constants";
import { DOCS_PAGES, type DocsBlock, type DocsPage } from "@/lib/docs-content";
import { FAQ } from "@/lib/faq";
import { getPostBySlug } from "@/lib/blog-posts";

/** Bump when docs copy changes so sitemap / TechArticle stay fresh. */
export const DOCS_CONTENT_UPDATED_AT = "2026-08-13";

/** Docs pages in canonical nav order, keyed for DOCS_PAGES lookup. */
export const DOCS_FULL_INDEX = [
  { href: "/docs", key: "overview" },
  { href: "/docs/install", key: "install" },
  { href: "/docs/quickstart", key: "quickstart" },
  { href: "/docs/adopt", key: "adopt" },
  { href: "/docs/commands", key: "commands" },
  { href: "/docs/dash", key: "dash" },
  { href: "/docs/multi-cluster", key: "multiCluster" },
  { href: "/docs/themes", key: "themes" },
  { href: "/docs/integrations", key: "integrations" },
  { href: "/docs/setup", key: "setup" },
  { href: "/docs/architecture", key: "architecture" },
  { href: "/docs/agent", key: "agent" },
  { href: "/docs/roadmap", key: "roadmap" },
  { href: "/docs/team", key: "team" },
  { href: "/docs/runs", key: "runs" },
  { href: "/docs/safety", key: "safety" },
  { href: "/docs/providers", key: "providers" },
  { href: "/docs/init", key: "init" },
  { href: "/docs/demo", key: "demo" },
  { href: "/docs/ci", key: "ci" },
  { href: "/docs/mcp", key: "mcp" },
] as const satisfies ReadonlyArray<{
  href: string;
  key: keyof typeof DOCS_PAGES;
}>;

const HIGH_SIGNAL_SLUGS = [
  "kubectl-vs-k9s",
  "k9s-vs-kubernetes",
  "k9s-alternatives",
  "kubectl-alternatives",
  "kubegpt-vs-k8sgpt",
  "kubectl-ai-alternatives",
  "ai-kubernetes-pod-diagnose",
  "chat-with-kubernetes-cluster",
  "best-ai-tools-kubernetes-troubleshooting",
  "kubernetes-ai-tools-comparison",
  "what-is-kubernetes-ai",
  "kubernetes-pods-vs-deployments",
  "what-is-a-kubernetes-deployment",
  "kubectl-get-pods-explained",
  "kubernetes-service-vs-deployment",
  "kprompt-vs-kubectl-ai",
  "kprompt-vs-kagent",
  "kprompt-kagent-integration",
  "kagent-alternatives",
  "kprompt-vs-agentgateway",
  "agentgateway-alternatives",
  "ai-runtime-vs-ai-gateway-vs-agent-platform",
  "kprompt-vs-ark",
  "kprompt-mcp-tool-provider",
  "brownfield-kprompt-in-15-minutes",
  "kprompt-helm-deep-dive",
  "kprompt-prometheus",
  "top-100-kubernetes-prompts",
  "ai-runtime-for-kubernetes",
  "context-engineering-not-prompt-engineering",
  "observe-vs-investigate",
  "observe-agent-alert-fatigue",
  "observe-agent-kind-demo",
  "kprompt-v0-5-observe-agent",
  "building-ai-sre-in-public",
  "building-ai-sre-01-why",
  "building-ai-sre-02-intent-compiler",
  "building-ai-sre-03-planresult",
  "building-ai-sre-04-safety",
  "building-ai-sre-05-multi-context",
  "intent-compiler-not-chat",
  "ai-sre-not-ai-kubectl",
  "optimize-my-cluster",
  "planresult-json-deep-dive",
  "kubernetes-ci-cd-plan-gates",
  "kubernetes-oomkilled",
  "kubernetes-crashloopbackoff",
  "kubernetes-imagepullbackoff",
  "kubectl-cheat-sheet-natural-language",
  "kubernetes-error-prompt-playbook",
  "kubernetes-troubleshooting-guide",
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
    "- Category: AI Runtime for Kubernetes — understands your environment; turns intent into operate / investigate / recommend with plan-before-apply. Triangle hub (Runtime vs Gateway vs Platform): https://kprompt.ai/blog/ai-runtime-vs-ai-gateway-vs-agent-platform",
    "- Experienced engineers are a target: augment expertise by reducing context you must gather manually.",
    "- Investigation/AI SRE packs and Observe are capability lanes — not the entire product.",
    "- Signals (Prom/OTel/logs) enrich the runtime when present; no bespoke per-database connectors.",
    "- Not McKinsey ARK (Agentic Runtime): hosts agent apps as CRDs — https://kprompt.ai/blog/kprompt-vs-ark",
    "- Not agentgateway (AI/MCP/A2A gateway): LLM/MCP traffic data plane vs PlanResult ops — https://kprompt.ai/blog/kprompt-vs-agentgateway · https://kprompt.ai/blog/agentgateway-alternatives",
    "- Not kagent (CNCF agent platform): Agents/MCP/A2A on K8s vs PlanResult ops — https://kprompt.ai/blog/kprompt-vs-kagent · https://kprompt.ai/blog/kagent-alternatives",
    "- Compose with kagent (architecture invite): kagent hosts Agents; kprompt MCP tools return PlanResult; apply stays out-of-band — https://kprompt.ai/blog/kprompt-kagent-integration",
    "- MCP tool provider (`kprompt mcp serve`): editor assistants (Cursor, Claude Desktop) call read/plan-only tools over stdio; mutations return a PlanResult and never auto-apply. IDE interop, not an MCP/A2A agent platform (that stays kagent's lane) — https://kprompt.ai/docs/mcp",
    "- Same NL-CLI lane as kubectl-ai for day-2 mutate; different mutate contract (plan → safety → approve) plus in-cluster Observe path.",
    "- Not a K8sGPT fleet scanner; not a hosted Lens clone.",
    "- Optional in-cluster Observe agent (Helm): namespace watch → Incident → gated notify.",
    "- Autopilot (ADR-0015) is propose-only by default — never silent apply.",
    "- Shipped v0.12.2: investigate + impact walk Istio VirtualServices with honest mesh degrade (on top of v0.12.1 SEC-007 / Ingress / Prom / Flux inventory / kind e2e).",
    "- Shipped v0.12.1: SEC-007 hardening + doctor advisories, investigate Ingress/Prometheus, Flux inventory drift, Coordinator Deployment probe, kind e2e in CI (on top of v0.12.0 provider/GitOps pack).",
    "- Shipped v0.11.0: `kprompt mcp serve` (read/plan-only IDE interop, ADR-0024), Azure OpenAI preset (P-006), DaemonSet `--wait`.",
    "- Shipped AI Runtime closure v0.10.0 (ADR-0023): closed Learn loop, policy-gated Autopilot apply (product path), continuous Coordinator (proactive tick + opt-in mesh/OTel blast-radius), topology Knowledge Graph edges, Incident→PlanResult bridge, durable cluster memory (cross-ns outcome ring + fleet read) — default stays propose-only, never silent auto-heal.",
    "- Building / next: deeper continuous multi-agent reasoning, interactive Team topology / timeline UI, sandbox/chaos Simulation lab, richer Prom/OTel/mesh hops — do not claim Secret-value CMDB or unsupervised auto-heal.",
    "- Shipped Team GitHub App install MVP: GET/PUT/DELETE /v1/org/github + Setup URL auto-bind (A-067) + App JWT installation tokens (A-068) + app /integrations.",
    "- Shipped Team connected repos: GET/POST/DELETE /v1/org/repos + bind/unbind UI (metadata only).",
    "- Shipped Team pipeline bindings: GET/POST/DELETE /v1/org/repos/{id}/pipelines (github_actions/tekton/argo metadata + deep links; never in-cluster mutate).",
    "- Shipped Team CI ingest: POST /v1/webhooks/github (HMAC) + POST /v1/ci/planresults → plan artifacts + audit reported.",
    "- Shipped Team CI PlanResult viewer: app /ci + /ci/[id] (safety vocabulary + raw JSON; never auto-apply; subsumes A-033).",
    "- Shipped Coordinator blast-radius MVP: GET /v1/blast-radius + `agent coordinator blast-radius` (handoff hops with risk; not mesh/OTel; see /docs/coordinator-knowledge).",
    "- Shipped Namespace Agent intelligence brief: `kprompt agent status -n <ns>` (health + incidents + patterns + memory; quota/HPA detectors; see /docs/agent-status).",
    "- Shipped Knowledge Graph: service graph + Ingress/PVC + Secret/ConfigMap name-only mounts + impact + memory deps (never Secret.data; see /docs/graph).",
    "- Shipped Namespace Agent fleet UX MVP: `kprompt agent list -A` (KpromptAgent CRs + labeled Deployments; see /docs/agent-fleet).",
    "- Shipped Coordinator Shared Knowledge: GET /v1/knowledge + optional file/ConfigMap durable handoff ring (Helm knowledge.enabled; see /docs/coordinator-knowledge).",
    "- Shipped Simulation MVP: change preview = PlanResult dry-run + blastRadius + impact + Helm dry-run (not a sandbox; see /docs/simulation).",
    "- Shipped Cost Intelligence MVP: optimize idle/rightsizing/HPA + labeled $/carbon notes (not a cloud bill; see /docs/optimize).",
    "- Shipped GitHub Integration MVP: CLI --gitops PR mode + Flux/Argo status + agent gitops evidence (Team SCM A-061…A-069 shipped including Setup URL, App JWT tokens, /ci viewer, Checks annotate upsert).",
    "- Shipped Incident Memory: namespace facts + patterns + durable incidents (local/ConfigMap; never auto-mutate).",
    "- Shipped thin Coordinator: cross-ns handoff + optional kube probe + InvestigationReport merge (mutate off).",
    "- Architecture diagrams: AI Runtime pipeline + PlanResult contract + dual path — /docs/architecture.",
    "- Long-term direction: continuous reasoning under the same approval DNA — see roadmap.",
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
