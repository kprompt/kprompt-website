"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BookOpen, FileText, Search, SearchX, X } from "lucide-react";
import type { BlogSearchItem } from "@/lib/blog-posts";
import type { DocsSearchItem } from "@/lib/docs-meta";
import {
  buildSearchEntries,
  filterSearchEntries,
  type SearchEntry,
} from "@/lib/search";

type Props = {
  blogItems: BlogSearchItem[];
  docsItems: DocsSearchItem[];
};

function Highlight({ text, query }: { text: string; query: string }): ReactNode {
  if (!query) return text;
  const index = text.toLowerCase().indexOf(query);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded bg-brand/15 px-0.5 text-foreground">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  );
}

function ResultRow({
  entry,
  query,
}: {
  entry: SearchEntry;
  query: string;
}) {
  const Icon = entry.kind === "docs" ? BookOpen : FileText;
  return (
    <li>
      <Link
        href={entry.href}
        className="group flex items-start gap-3 rounded-xl border border-border bg-card/40 px-4 py-3.5 transition-colors hover:border-brand/30 hover:bg-card"
      >
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground group-hover:border-brand/25 group-hover:bg-brand/10 group-hover:text-brand">
          <Icon className="size-4" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-heading text-sm font-semibold tracking-tight text-foreground group-hover:text-brand">
            <Highlight text={entry.title} query={query} />
          </span>
          <span className="mt-0.5 block truncate text-xs text-muted-foreground">
            {entry.subtitle}
          </span>
        </span>
      </Link>
    </li>
  );
}

export function SearchResults({ blogItems, docsItems }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const deferredRaw = useDeferredValue(query);
  const deferredQuery = deferredRaw.trim().toLowerCase();

  const entries = useMemo(
    () => buildSearchEntries(blogItems, docsItems),
    [blogItems, docsItems]
  );

  const { docs, blog, total } = useMemo(() => {
    const pool = filterSearchEntries(entries, deferredQuery);
    const docsList = pool.filter((e) => e.kind === "docs");
    const blogList = pool.filter((e) => e.kind === "blog");
    return { docs: docsList, blog: blogList, total: pool.length };
  }, [entries, deferredQuery]);

  useEffect(() => {
    const params = new URLSearchParams();
    const q = deferredRaw.trim();
    if (q) params.set("q", q);
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [deferredRaw, pathname, router]);

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Search docs and blog</span>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search docs and blog…"
          className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-11 text-base outline-none ring-brand/30 placeholder:text-muted-foreground focus:border-brand/40 focus:ring-2"
          autoComplete="off"
          spellCheck={false}
        />
        {query ? (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Clear search"
            onClick={() => setQuery("")}
          >
            <X className="size-4" />
          </button>
        ) : null}
      </label>

      <p className="mt-4 font-mono text-xs text-muted-foreground">
        {deferredQuery
          ? `${total} result${total === 1 ? "" : "s"} for “${deferredRaw.trim()}”`
          : "Type to search across documentation and the blog."}
      </p>

      {total === 0 && deferredQuery ? (
        <div className="mt-12 flex flex-col items-center gap-2 text-center">
          <SearchX className="size-7 text-muted-foreground" aria-hidden />
          <p className="text-sm text-muted-foreground">
            No results. Try a different term.
          </p>
        </div>
      ) : null}

      {docs.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Docs
          </h2>
          <ul className="mt-4 space-y-2">
            {docs.map((entry) => (
              <ResultRow key={entry.href} entry={entry} query={deferredQuery} />
            ))}
          </ul>
        </section>
      ) : null}

      {blog.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {deferredQuery ? "Blog" : "Latest posts"}
          </h2>
          <ul className="mt-4 space-y-2">
            {blog.map((entry) => (
              <ResultRow key={entry.href} entry={entry} query={deferredQuery} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
