import {
  extractHeadings,
  type DocsBlock,
  type Heading,
} from "@/lib/docs-content";
import { BLOG_POSTS } from "@/content/blog";
import type { BlogPost } from "@/lib/blog-types";
import {
  EMIRE_BARIS,
  HARUN_TEMEL,
  MUHTALIP_DEDE,
  type BlogAuthor,
} from "@/lib/team";

export type { BlogAuthor, BlogPost };
export { EMIRE_BARIS, HARUN_TEMEL, MUHTALIP_DEDE };
export { BLOG_POSTS };

function postSortTime(post: BlogPost): number {
  return new Date(post.updatedAt ?? post.publishedAt).getTime();
}

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS.map((post, index) => ({ post, index }))
    .sort(
      (a, b) =>
        postSortTime(b.post) - postSortTime(a.post) || b.index - a.index
    )
    .map(({ post }) => post);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

/** Minimal, client-safe shape for the navbar search palette (no heavy blocks). */
export type BlogSearchItem = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  publishedAt: string;
};

/**
 * Lightweight blog index intended to be serialized to the client (navbar search).
 * Excludes the large `blocks` payload to keep the client bundle small.
 */
export function getBlogSearchIndex(): BlogSearchItem[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    tags: post.tags,
    publishedAt: post.publishedAt,
  }));
}

export function blogTagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAllBlogTags(): string[] {
  return [...new Set(BLOG_POSTS.flatMap((post) => post.tags))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getBlogTagBySlug(slug: string): string | undefined {
  return getAllBlogTags().find((tag) => blogTagSlug(tag) === slug);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.publishedAt).getTime() -
          new Date(a.post.publishedAt).getTime()
    )
    .slice(0, limit)
    .map(({ post: relatedPost }) => relatedPost);
}

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const WORDS_PER_MINUTE = 220;

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

/** Rough reading time in minutes for a set of docs/blog blocks. */
export function readingMinutes(blocks: DocsBlock[]): number {
  let words = 0;
  for (const block of blocks) {
    switch (block.type) {
      case "p":
      case "h2":
      case "h3":
        words += countWords(block.text);
        break;
      case "ul":
        words += countWords(block.items.join(" "));
        break;
      case "table":
        words += countWords(block.rows.flat().join(" "));
        break;
      case "code":
        // Code scans faster than prose; weight it down.
        words += Math.round(countWords(block.code) * 0.5);
        break;
    }
  }
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Top-level (h2) headings, for an on-this-page table of contents. */
export function getPostHeadings(post: BlogPost): Heading[] {
  return extractHeadings(post.blocks);
}
