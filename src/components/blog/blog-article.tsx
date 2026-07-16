import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogAuthorByline } from "@/components/blog/blog-author-byline";
import { BlogTagLink } from "@/components/blog/blog-tag-link";
import { RelatedPosts } from "@/components/blog/related-posts";
import { DocsBlocks } from "@/components/docs/docs-article";
import type { BlogPost } from "@/lib/blog-posts";
import { formatBlogDate } from "@/lib/blog-posts";

export function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <article className="max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        All posts
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <BlogAuthorByline author={post.author} variant="compact" />
        </div>

        <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        {post.tags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag}>
                <BlogTagLink
                  tag={tag}
                  className="border border-border bg-muted/50"
                />
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mt-10 border-t border-border pt-10">
        <DocsBlocks blocks={post.blocks} />
      </div>

      <footer className="mt-12">
        <BlogAuthorByline author={post.author} variant="full" />
      </footer>

      <RelatedPosts post={post} />
    </article>
  );
}
