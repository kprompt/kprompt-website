import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import type { BlogPost } from "@/lib/blog-posts";

export function blogIndexMetadata(): Metadata {
  const url = `${SITE.url}/blog`;
  const description =
    "Updates, design notes, and release news from the kprompt team — the open-source CLI for Kubernetes.";
  return {
    title: "Blog",
    description,
    alternates: { canonical: url },
    openGraph: {
      title: "Blog · kprompt.ai",
      description,
      url,
    },
  };
}

export function blogPostMetadata(post: BlogPost): Metadata {
  const url = `${SITE.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    authors: [{ name: post.author.name, url: post.author.github ?? post.author.linkedin }],
    openGraph: {
      title: `${post.title} · kprompt.ai`,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      tags: post.tags,
      authors: [post.author.name],
    },
  };
}
