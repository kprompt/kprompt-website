import Link from "next/link";
import { ArrowLeft, List } from "lucide-react";
import { BlogAuthorByline } from "@/components/blog/blog-author-byline";
import { BlogTagLink } from "@/components/blog/blog-tag-link";
import { RelatedPosts } from "@/components/blog/related-posts";
import { DocsBlocks } from "@/components/docs/docs-article";
import type { BlogPost } from "@/lib/blog-posts";
import { formatBlogDate, getPostHeadings, readingMinutes } from "@/lib/blog-posts";

export function BlogArticle({ post }: { post: BlogPost }) {
  const minutes = readingMinutes(post.blocks);
  const headings = getPostHeadings(post);

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
          <span aria-hidden>·</span>
          <span>{minutes} min read</span>
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

      {headings.length >= 3 ? (
        <nav
          aria-label="On this page"
          className="mt-8 rounded-xl border border-border bg-muted/30 p-5"
        >
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <List className="size-3.5" aria-hidden />
            On this page
          </p>
          <ol className="mt-3 space-y-1.5">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

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
