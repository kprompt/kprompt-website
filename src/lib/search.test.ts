import { describe, expect, it } from "vitest";
import type { BlogSearchItem } from "@/lib/blog-posts";
import type { DocsSearchItem } from "@/lib/docs-meta";
import {
  buildSearchEntries,
  filterSearchEntries,
  scoreEntry,
} from "@/lib/search";

const docs: DocsSearchItem[] = [
  {
    href: "/docs/install",
    title: "Install",
    description: "Install the kprompt CLI on macOS and Linux.",
    section: "Start",
  },
];

const blog: BlogSearchItem[] = [
  {
    slug: "crashloop-debugging",
    title: "Debugging CrashLoopBackOff",
    description: "A calm on-call walkthrough.",
    tags: ["kubernetes", "sre"],
    publishedAt: "2026-01-02",
  },
];

describe("buildSearchEntries", () => {
  it("puts docs before blog and derives blog hrefs", () => {
    const entries = buildSearchEntries(blog, docs);
    expect(entries[0].kind).toBe("docs");
    expect(entries[0].href).toBe("/docs/install");
    const blogEntry = entries.find((e) => e.kind === "blog");
    expect(blogEntry?.href).toBe("/blog/crashloop-debugging");
  });
});

describe("scoreEntry", () => {
  it("ranks title matches above body matches", () => {
    const [docEntry] = buildSearchEntries(blog, docs);
    const titleScore = scoreEntry(docEntry, "install");
    const bodyScore = scoreEntry(docEntry, "macos");
    expect(titleScore).toBeGreaterThan(bodyScore);
  });

  it("returns 0 when there is no match", () => {
    const [docEntry] = buildSearchEntries(blog, docs);
    expect(scoreEntry(docEntry, "nonexistent")).toBe(0);
  });
});

describe("filterSearchEntries", () => {
  it("returns all entries for an empty query", () => {
    const entries = buildSearchEntries(blog, docs);
    expect(filterSearchEntries(entries, "")).toHaveLength(entries.length);
  });

  it("matches across title, tags, and description", () => {
    const entries = buildSearchEntries(blog, docs);
    const byTag = filterSearchEntries(entries, "kubernetes");
    expect(byTag).toHaveLength(1);
    expect(byTag[0].href).toBe("/blog/crashloop-debugging");
  });

  it("is case-insensitive and drops non-matches", () => {
    const entries = buildSearchEntries(blog, docs);
    expect(filterSearchEntries(entries, "INSTALL")).toHaveLength(1);
    expect(filterSearchEntries(entries, "zzz")).toHaveLength(0);
  });
});
