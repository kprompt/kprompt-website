import Image from "next/image";
import { GithubIcon } from "@/components/ui/github-icon";
import type { TeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function BlogAuthorAvatar({
  author,
  size = "md",
  className,
}: {
  author: TeamMember;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  if (!author.avatar) return null;

  const sizes = {
    sm: { box: "size-9", px: 36 },
    md: { box: "size-20", px: 80 },
    lg: { box: "size-28", px: 112 },
  } as const;

  const { box, px } = sizes[size];

  return (
    <Image
      src={author.avatar}
      alt={`${author.name} profile photo`}
      width={px}
      height={px}
      className={cn(
        "shrink-0 rounded-full border border-border object-cover",
        box,
        className
      )}
    />
  );
}

export function BlogAuthorName({ author }: { author: TeamMember }) {
  const profileUrl = author.github ?? author.linkedin;

  if (profileUrl) {
    return (
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-foreground transition-colors hover:text-brand"
      >
        {author.name}
      </a>
    );
  }

  return <span className="font-medium text-foreground">{author.name}</span>;
}

export function BlogAuthorByline({
  author,
  variant = "compact",
}: {
  author: TeamMember;
  variant?: "compact" | "full";
}) {
  if (variant === "compact") {
    return (
      <span className="inline-flex items-center gap-2">
        <BlogAuthorAvatar author={author} size="sm" />
        <span>
          <BlogAuthorName author={author} />
          {author.role ? (
            <span className="text-muted-foreground/80"> · {author.role}</span>
          ) : null}
        </span>
      </span>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        Written by
      </p>

      <div className="mt-4 flex items-start gap-4 sm:gap-5">
        <BlogAuthorAvatar author={author} size="lg" />

        <div className="min-w-0 flex-1">
          <p className="font-heading text-lg font-semibold tracking-tight sm:text-xl">
            <BlogAuthorName author={author} />
          </p>
          {author.role ? (
            <p className="mt-1 text-sm text-muted-foreground">{author.role}</p>
          ) : null}

          <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {author.email ? (
              <li>
                <a
                  href={`mailto:${author.email}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {author.email}
                </a>
              </li>
            ) : null}
            {author.github ? (
              <li>
                <a
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GithubIcon className="size-3.5" />
                  GitHub
                </a>
              </li>
            ) : null}
            {author.linkedin ? (
              <li>
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <LinkedInIcon className="size-3.5" />
                  LinkedIn
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export { BlogAuthorAvatar };
