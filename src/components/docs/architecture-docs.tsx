import Link from "next/link";
import { AgentModesDiagram } from "@/components/diagrams/agent-modes";
import { AiSreDualPathDiagram } from "@/components/diagrams/ai-sre-dual-path";
import { CoordinatorHandoffDiagram } from "@/components/diagrams/coordinator-handoff";
import { IntentPipelineDiagram } from "@/components/diagrams/intent-pipeline";
import { ObservePipelineDiagram } from "@/components/diagrams/observe-pipeline";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { TechArticleJsonLd } from "@/components/seo/tech-article-json-ld";
import { DOCS_PAGES } from "@/lib/docs-content";

const page = DOCS_PAGES.architecture;

export function ArchitectureDocs() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Architecture", path: "/docs/architecture" },
        ]}
      />
      <TechArticleJsonLd
        title={page.title}
        description={page.description}
        path="/docs/architecture"
      />
      <article className="max-w-4xl min-w-0">
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {page.description}
        </p>

        <div className="mt-10 space-y-12">
          <section>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Intent compiler
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              kprompt is not a chat REPL that pipes model output to bash. A
              prompt becomes a typed Intent, then a PlanResult with actions,
              risk, and blast radius. Safety hard-denies wipe-class intents.
              Apply only after TTY confirmation or{" "}
              <code className="font-mono text-[13px] text-foreground">
                --approve
              </code>
              .
            </p>
            <div className="mt-5">
              <IntentPipelineDiagram />
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              AI SRE dual path
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              On-demand CLI packs (
              <code className="font-mono text-[13px] text-foreground">
                investigate
              </code>
              ,{" "}
              <code className="font-mono text-[13px] text-foreground">why</code>
              ,{" "}
              <code className="font-mono text-[13px] text-foreground">
                timeline
              </code>
              , …) and the optional in-cluster agent share the same incident
              contracts. One is reactive; the other is always-on. Neither is
              silent Autopilot.
            </p>
            <div className="mt-5">
              <AiSreDualPathDiagram />
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Observe agent pipeline
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Default mode watches one namespace with a Role (not ClusterRole),
              correlates into Incidents, builds context, analyzes once per
              window, then gates Slack/webhook on severity and confidence.
              Install guide:{" "}
              <Link
                href="/docs/agent"
                className="font-medium text-foreground underline decoration-border underline-offset-4 hover:text-brand hover:decoration-brand"
              >
                Observe agent
              </Link>
              .
            </p>
            <div className="mt-5">
              <ObservePipelineDiagram />
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Modes
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Observe never mutates. Namespace Agent adds multi-signal RCA,
              memory/patterns, and InvestigationReport v2 — still propose-first.
              Coordinator only verifies cross-namespace suspicion. Autopilot
              apply requires an explicit policy allowlist.
            </p>
            <div className="mt-5 space-y-5">
              <AgentModesDiagram />
              <CoordinatorHandoffDiagram />
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Honesty boundaries
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>No silent or default LLM-said-so remediations</li>
              <li>No cluster-wide god-mode SA on every namespace agent</li>
              <li>Missing Prom / OTel / GitOps backends degrade — they are not invented</li>
              <li>Memory and patterns boost confidence; they are not sole proof of root cause</li>
              <li>
                Not feature parity with K8sGPT (fleet scanner) or Kagent
                (multi-agent framework)
              </li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Positioning and shipped vs building:{" "}
              <Link
                href="/docs/roadmap"
                className="font-medium text-foreground underline decoration-border underline-offset-4 hover:text-brand hover:decoration-brand"
              >
                Roadmap &amp; vision
              </Link>
              . Series:{" "}
              <Link
                href="/blog/building-ai-sre-in-public"
                className="font-medium text-foreground underline decoration-border underline-offset-4 hover:text-brand hover:decoration-brand"
              >
                Building AI SRE in Public
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
