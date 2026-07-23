"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPost } from "@/lib/blog-posts";
import { cn } from "@/lib/utils";

type Props = {
  posts: BlogPost[];
};

function matchesQuery(post: BlogPost, q: string) {
  if (!q) return true;
  const hay = [
    post.title,
    post.description,
    ...post.tags,
    ...(post.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

export function BlogIndex({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      for (const t of post.tags) {
        counts.set(t, (counts.get(t) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name]) => name);
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (tag && !post.tags.includes(tag)) return false;
      return matchesQuery(post, deferredQuery);
    });
  }, [posts, tag, deferredQuery]);

  const featured =
    !deferredQuery && !tag
      ? filtered.find((post) => post.featured)
      : undefined;
  const regular = filtered.filter((post) => post.slug !== featured?.slug);
  const filtering = Boolean(deferredQuery || tag);

  return (
    <div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="relative block min-w-0 flex-1">
          <span className="sr-only">Search posts</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, tags, keywords…"
            className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-10 text-sm outline-none ring-brand/30 placeholder:text-muted-foreground focus:border-brand/40 focus:ring-2"
            autoComplete="off"
            spellCheck={false}
          />
          {query ? (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </label>
        <p className="shrink-0 font-mono text-xs text-muted-foreground sm:text-right">
          {filtered.length} of {posts.length}
        </p>
      </div>

      {allTags.length > 0 ? (
        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label="Filter by tag"
        >
          <li>
            <button
              type="button"
              onClick={() => setTag(null)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                tag === null
                  ? "border-brand/30 bg-brand/10 text-brand"
                  : "border-border text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              All
            </button>
          </li>
          {allTags.map((name) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => setTag((current) => (current === name ? null : name))}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs transition-colors",
                  tag === name
                    ? "border-brand/30 bg-brand/10 text-brand"
                    : "border-border text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {featured ? (
        <section className="mt-12" aria-labelledby="featured-post">
          <h2 id="featured-post" className="sr-only">
            Featured post
          </h2>
          <BlogCard post={featured} />
        </section>
      ) : null}

      {regular.length > 0 ? (
        <section className="mt-12" aria-labelledby="all-posts">
          <h2
            id="all-posts"
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            {filtering ? "Matching posts" : featured ? "More posts" : "All posts"}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {regular.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      {filtered.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">
          No posts match
          {deferredQuery ? (
            <>
              {" "}
              <span className="font-mono text-foreground">{query.trim()}</span>
            </>
          ) : null}
          {tag ? (
            <>
              {" "}
              in tag <span className="font-mono text-foreground">{tag}</span>
            </>
          ) : null}
          .{" "}
          <button
            type="button"
            className="text-brand underline-offset-2 hover:underline"
            onClick={() => {
              setQuery("");
              setTag(null);
            }}
          >
            Clear filters
          </button>
        </p>
      ) : null}
    </div>
  );
}
