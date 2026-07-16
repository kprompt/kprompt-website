import Link from "next/link";
import { BlogAuthorAvatar, BlogAuthorName } from "@/components/blog/blog-author-byline";
import type { BlogPost } from "@/lib/blog-posts";
import { formatBlogDate } from "@/lib/blog-posts";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-card/50 p-6 transition-colors hover:border-brand/30 hover:bg-card">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-2">
          <BlogAuthorAvatar author={post.author} size="sm" />
          <BlogAuthorName author={post.author} />
        </span>
      </div>

      <h2 className="mt-3 font-heading text-xl font-semibold tracking-tight group-hover:text-brand">
        <Link href={`/blog/${post.slug}`} className="outline-offset-4">
          {post.title}
        </Link>
      </h2>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.description}
      </p>

      {post.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
