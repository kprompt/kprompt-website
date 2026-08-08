import { Suspense } from "react";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { SearchResults } from "@/components/search/search-results";
import { getBlogSearchIndex } from "@/lib/blog-posts";
import { SITE } from "@/lib/constants";
import { getDocsSearchIndex } from "@/lib/docs-meta";

export const metadata: Metadata = {
  title: "Search",
  description: "Search kprompt documentation and blog posts.",
  alternates: { canonical: `${SITE.url}/search` },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const blogItems = getBlogSearchIndex();
  const docsItems = getDocsSearchIndex();

  return (
    <main className="relative min-h-[70vh] pt-24 pb-20 sm:pt-28">
      <div
        className="pointer-events-none absolute inset-0 bg-glow opacity-50"
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <BreadcrumbJsonLd
          items={[
            { name: "Home", path: "/" },
            { name: "Search", path: "/search" },
          ]}
        />
        <header className="mb-8">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Search
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Find anything
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Search across the documentation and the blog. Tip: press{" "}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
              ⌘K
            </kbd>{" "}
            anywhere on the site.
          </p>
        </header>

        <Suspense fallback={null}>
          <SearchResults blogItems={blogItems} docsItems={docsItems} />
        </Suspense>
      </div>
    </main>
  );
}
