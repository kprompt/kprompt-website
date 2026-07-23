import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { DOCS_NAV } from "@/lib/docs-nav";
import {
  blogTagSlug,
  getAllBlogTags,
  getAllPosts,
  getPostsByTag,
} from "@/lib/blog-posts";

const STATIC_CONTENT_UPDATED_AT = new Date("2026-07-23T00:00:00.000Z");

function contentDate(value: string): Date {
  return new Date(value.includes("T") ? value : `${value}T00:00:00.000Z`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const blogLastModified = posts.reduce(
    (latest, post) => {
      const modified = contentDate(post.updatedAt ?? post.publishedAt);
      return modified > latest ? modified : latest;
    },
    new Date(0)
  );

  return [
    {
      url: SITE.url,
      lastModified: STATIC_CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...DOCS_NAV.map((item) => ({
      url: `${SITE.url}${item.href}`,
      lastModified: STATIC_CONTENT_UPDATED_AT,
      changeFrequency: "weekly" as const,
      priority: item.href === "/docs" ? 0.9 : 0.8,
    })),
    {
      url: `${SITE.url}/blog`,
      lastModified: blogLastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...getAllBlogTags().map((tag) => {
      const postsForTag = getPostsByTag(tag);
      const lastModified = postsForTag.reduce(
        (latest, post) => {
          const modified = contentDate(post.updatedAt ?? post.publishedAt);
          return modified > latest ? modified : latest;
        },
        new Date(0)
      );

      return {
        url: `${SITE.url}/blog/tag/${blogTagSlug(tag)}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.65,
      };
    }),
    {
      url: `${SITE.url}/team`,
      lastModified: STATIC_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...posts.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: contentDate(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
