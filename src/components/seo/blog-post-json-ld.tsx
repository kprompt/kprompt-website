import { SITE } from "@/lib/constants";
import type { BlogPost } from "@/lib/blog-posts";

export function BlogPostJsonLd({ post }: { post: BlogPost }) {
  const url = `${SITE.url}/blog/${post.slug}`;
  const sameAs = [post.author.github, post.author.linkedin].filter(
    (link): link is string => Boolean(link)
  );
  const authorImage = post.author.avatar
    ? `${SITE.url}${post.author.avatar}`
    : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(authorImage ? { image: authorImage } : {}),
      ...(post.author.email ? { email: post.author.email } : {}),
      ...(sameAs.length > 0 ? { sameAs } : {}),
      ...(post.author.github ? { url: post.author.github } : {}),
      ...(post.author.role ? { jobTitle: post.author.role } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/kprompt-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    keywords: post.tags.join(", "),
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
