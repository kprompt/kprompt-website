import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { BlogPostJsonLd } from "@/components/seo/blog-post-json-ld";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { blogPostMetadata } from "@/lib/blog-meta";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog-posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return blogPostMetadata(post);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <BlogPostJsonLd post={post} />
      <BlogArticle post={post} />
    </>
  );
}
