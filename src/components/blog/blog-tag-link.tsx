import Link from "next/link";
import { blogTagSlug } from "@/lib/blog-posts";
import { cn } from "@/lib/utils";

export function BlogTagLink({
  tag,
  className,
}: {
  tag: string;
  className?: string;
}) {
  return (
    <Link
      href={`/blog/tag/${blogTagSlug(tag)}`}
      className={cn(
        "rounded-full bg-muted px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-brand/10 hover:text-brand",
        className
      )}
    >
      {tag}
    </Link>
  );
}
