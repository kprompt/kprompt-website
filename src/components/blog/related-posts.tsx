import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogTagLink } from "@/components/blog/blog-tag-link";
import type { BlogPost } from "@/lib/blog-posts";
import { getRelatedPosts } from "@/lib/blog-posts";

export function RelatedPosts({ post }: { post: BlogPost }) {
  const relatedPosts = getRelatedPosts(post);
  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="related-posts">
      <h2
        id="related-posts"
        className="font-heading text-xl font-semibold tracking-tight"
      >
        Related posts
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {relatedPosts.map((relatedPost) => (
          <article
            key={relatedPost.slug}
            className="group flex flex-col rounded-xl border border-border bg-card/40 p-5 transition-colors hover:border-brand/30 hover:bg-card"
          >
            <h3 className="font-heading text-base font-semibold tracking-tight group-hover:text-brand">
              <Link href={`/blog/${relatedPost.slug}`}>
                {relatedPost.title}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {relatedPost.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {relatedPost.tags
                .filter((tag) => post.tags.includes(tag))
                .slice(0, 2)
                .map((tag) => (
                  <BlogTagLink key={tag} tag={tag} />
                ))}
            </div>
            <Link
              href={`/blog/${relatedPost.slug}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand"
            >
              Read article
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
