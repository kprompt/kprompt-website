import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/blog-card";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import {
  blogTagSlug,
  getAllBlogTags,
  getBlogTagBySlug,
  getPostsByTag,
} from "@/lib/blog-posts";
import { SITE } from "@/lib/constants";

type PageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllBlogTags().map((tag) => ({ tag: blogTagSlug(tag) }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = getBlogTagBySlug(slug);
  if (!tag) return {};

  const url = `${SITE.url}/blog/tag/${slug}`;
  const description = `Articles about ${tag}, Kubernetes operations, and kprompt.`;

  return {
    title: `${tag} articles`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${tag} articles · kprompt.ai`,
      description,
      url,
    },
  };
}

export default async function BlogTagPage({ params }: PageProps) {
  const { tag: slug } = await params;
  const tag = getBlogTagBySlug(slug);
  if (!tag) notFound();

  const posts = getPostsByTag(tag);
  const path = `/blog/tag/${slug}`;

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: tag, path },
        ]}
      />

      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Blog topic
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {tag}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {posts.length} {posts.length === 1 ? "article" : "articles"} about {tag},
          Kubernetes operations, and kprompt.
        </p>
      </header>

      <section className="mt-10 grid gap-6 sm:grid-cols-2" aria-label={`${tag} posts`}>
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
