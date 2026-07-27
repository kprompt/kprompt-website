import { ObservePipelineDiagram } from "@/components/diagrams/observe-pipeline";
import { DocsBlocks } from "@/components/docs/docs-article";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { TechArticleJsonLd } from "@/components/seo/tech-article-json-ld";
import { DOCS_PAGES } from "@/lib/docs-content";

const page = DOCS_PAGES.agent;

export function AgentDocs() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Observe agent", path: "/docs/agent" },
        ]}
      />
      <TechArticleJsonLd
        title={page.title}
        description={page.description}
        path="/docs/agent"
      />
      <article className="max-w-3xl min-w-0">
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {page.description}
        </p>
        <div className="mt-8">
          <ObservePipelineDiagram />
        </div>
        <div className="mt-10">
          <DocsBlocks blocks={page.blocks} />
        </div>
      </article>
    </>
  );
}
