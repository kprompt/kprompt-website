import { BlogIndex } from "@/components/blog/blog-index";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { getAllPosts } from "@/lib/blog-posts";
import { blogIndexMetadata } from "@/lib/blog-meta";

export const metadata = blogIndexMetadata();

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Blog
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          News &amp; notes
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Design notes, comparisons, and practical Kubernetes ops — plan-before-apply,
          CI PlanResult, optimize reports, and where we are headed on AI SRE.
        </p>
      </header>

      <BlogIndex posts={posts} />
    </div>
  );
}
