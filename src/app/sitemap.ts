import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { DOCS_NAV } from "@/lib/docs-nav";

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
  ];
}
