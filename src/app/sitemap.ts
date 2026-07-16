import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { DOCS_NAV } from "@/lib/docs-nav";
import { getAllPosts } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...DOCS_NAV.map((item) => ({
      url: `${SITE.url}${item.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: item.href === "/docs" ? 0.9 : 0.8,
    })),
    {
      url: `${SITE.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE.url}/team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...getAllPosts().map((post) => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
