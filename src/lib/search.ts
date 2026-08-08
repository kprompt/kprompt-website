import type { BlogSearchItem } from "@/lib/blog-posts";
import type { DocsSearchItem } from "@/lib/docs-meta";

export type SearchEntryKind = "docs" | "blog";

export type SearchEntry = {
  kind: SearchEntryKind;
  href: string;
  title: string;
  subtitle: string;
  /** Lowercased text used for matching. */
  haystack: string;
};

function blogSubtitle(item: BlogSearchItem): string {
  const date = new Date(item.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const tags = item.tags.slice(0, 3).join(" · ");
  return tags ? `${tags} — ${date}` : date;
}

/** Merge docs + blog into a single, client-safe, searchable list (docs first). */
export function buildSearchEntries(
  blogItems: BlogSearchItem[],
  docsItems: DocsSearchItem[]
): SearchEntry[] {
  const docs: SearchEntry[] = docsItems.map((item) => ({
    kind: "docs",
    href: item.href,
    title: item.title,
    subtitle: item.section,
    haystack: `${item.title} ${item.section} ${item.description}`.toLowerCase(),
  }));
  const blog: SearchEntry[] = blogItems.map((item) => ({
    kind: "blog",
    href: `/blog/${item.slug}`,
    title: item.title,
    subtitle: blogSubtitle(item),
    haystack:
      `${item.title} ${item.tags.join(" ")} ${item.description}`.toLowerCase(),
  }));
  return [...docs, ...blog];
}

/** Higher is better; 0 means no match. Title matches outrank body matches. */
export function scoreEntry(entry: SearchEntry, q: string): number {
  const index = entry.haystack.indexOf(q);
  if (index === -1) return 0;
  if (entry.title.toLowerCase().includes(q)) return 100 - index;
  return 50 - index;
}

/** Filter + rank entries by a raw query. Empty query returns all entries as-is. */
export function filterSearchEntries(
  entries: SearchEntry[],
  rawQuery: string
): SearchEntry[] {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return entries;
  return entries
    .map((entry) => ({ entry, score: scoreEntry(entry, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ entry }) => entry);
}
