import { BlogCard } from "@/components/blog/blog-card";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { getAllPosts } from "@/lib/blog-posts";
import { blogIndexMetadata } from "@/lib/blog-meta";

export const metadata = blogIndexMetadata();

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts.find((post) => post.featured);
  const regular = posts.filter((post) => post.slug !== featured?.slug);

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
          Release updates, design notes, and practical Kubernetes ops from the
          kprompt team. Starting with our launch post — more soon.
        </p>
      </header>

      {featured ? (
        <section className="mt-12" aria-labelledby="featured-post">
          <h2 id="featured-post" className="sr-only">
            Featured post
          </h2>
          <BlogCard post={featured} />
        </section>
      ) : null}

      {regular.length > 0 ? (
        <section className="mt-12" aria-labelledby="all-posts">
          <h2
            id="all-posts"
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            {featured ? "More posts" : "All posts"}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {regular.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      {posts.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">No posts yet.</p>
      ) : null}
    </div>
  );
}
