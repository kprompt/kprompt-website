import type { DocsBlock } from "@/lib/docs-content";
import type { BlogAuthor } from "@/lib/team";

export type { BlogAuthor };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: BlogAuthor;
  tags: string[];
  /** Extra SEO keywords beyond display tags. */
  keywords?: string[];
  blocks: DocsBlock[];
  /** Shown prominently on the blog index. */
  featured?: boolean;
};
