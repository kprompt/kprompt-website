"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { Heading } from "@/lib/docs-content";
import { cn } from "@/lib/utils";

type Props = {
  headings: Heading[];
  className?: string;
};

export function TableOfContents({ headings, className }: Props) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: [0, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="On this page"
      className={cn(
        "rounded-xl border border-border bg-muted/30 p-5",
        className
      )}
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
              aria-current={activeId === heading.id ? "location" : undefined}
              className={cn(
                "block text-sm underline-offset-4 transition-colors hover:text-brand hover:underline",
                activeId === heading.id
                  ? "font-medium text-brand"
                  : "text-muted-foreground"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
