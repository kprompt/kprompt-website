"use client";

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  BookOpen,
  CornerDownLeft,
  FileText,
  Search,
  SearchX,
  X,
} from "lucide-react";
import type { BlogSearchItem } from "@/lib/blog-posts";
import type { DocsSearchItem } from "@/lib/docs-meta";
import {
  buildSearchEntries,
  filterSearchEntries,
  type SearchEntry,
} from "@/lib/search";
import { cn } from "@/lib/utils";

type SearchCommandProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blogItems: BlogSearchItem[];
  docsItems: DocsSearchItem[];
};

const GROUP_LIMIT = 6;

/** Bold the matched substring of `text` (case-insensitive) for the given query. */
function Highlight({ text, query }: { text: string; query: string }): ReactNode {
  if (!query) return text;
  const index = text.toLowerCase().indexOf(query);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-transparent font-semibold text-foreground">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  );
}

export function SearchCommand({
  open,
  onOpenChange,
  blogItems,
  docsItems,
}: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const listRef = useRef<HTMLDivElement>(null);

  const entries = useMemo(
    () => buildSearchEntries(blogItems, docsItems),
    [blogItems, docsItems]
  );

  const { docsShown, blogShown, flat } = useMemo(() => {
    const pool = filterSearchEntries(entries, deferredQuery);
    const docs = pool.filter((e) => e.kind === "docs").slice(0, GROUP_LIMIT);
    const blog = pool.filter((e) => e.kind === "blog").slice(0, GROUP_LIMIT);
    return { docsShown: docs, blogShown: blog, flat: [...docs, ...blog] };
  }, [entries, deferredQuery]);

  useEffect(() => {
    setActiveIndex(0);
  }, [deferredQuery]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const go = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router]
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (flat.length ? (i + 1) % flat.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) =>
        flat.length ? (i - 1 + flat.length) % flat.length : 0
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = flat[activeIndex];
      if (target) {
        go(target.href);
      } else if (deferredQuery) {
        go(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const renderItem = (entry: SearchEntry, index: number) => {
    const active = index === activeIndex;
    const Icon = entry.kind === "docs" ? BookOpen : FileText;
    return (
      <li key={entry.href}>
        <button
          type="button"
          data-index={index}
          onClick={() => go(entry.href)}
          onMouseMove={() => setActiveIndex(index)}
          className={cn(
            "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
            active
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted/60"
          )}
        >
          <span
            className={cn(
              "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border",
              active
                ? "border-brand/25 bg-brand/10 text-brand"
                : "border-border bg-background text-muted-foreground"
            )}
          >
            <Icon className="size-4" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-foreground">
              <Highlight text={entry.title} query={deferredQuery} />
            </span>
            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
              {entry.subtitle}
            </span>
          </span>
          {active ? (
            <CornerDownLeft
              className="mt-1.5 size-3.5 shrink-0 text-muted-foreground"
              aria-hidden
            />
          ) : null}
        </button>
      </li>
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-60 bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          onKeyDown={onKeyDown}
          className={cn(
            "fixed left-1/2 top-[12vh] z-70 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2",
            "overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          <Dialog.Title className="sr-only">Search kprompt</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search documentation and blog posts.
          </Dialog.Description>

          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search docs and blog…"
              className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              autoComplete="off"
              spellCheck={false}
            />
            <Dialog.Close
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close search"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <div
            ref={listRef}
            className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain p-2"
          >
            {flat.length > 0 ? (
              <>
                {docsShown.length > 0 ? (
                  <>
                    <p className="px-2 pb-1.5 pt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      Docs
                    </p>
                    <ul className="space-y-1">
                      {docsShown.map((entry, i) => renderItem(entry, i))}
                    </ul>
                  </>
                ) : null}

                {blogShown.length > 0 ? (
                  <>
                    <p className="px-2 pb-1.5 pt-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {deferredQuery ? "Blog" : "Latest posts"}
                    </p>
                    <ul className="space-y-1">
                      {blogShown.map((entry, i) =>
                        renderItem(entry, docsShown.length + i)
                      )}
                    </ul>
                  </>
                ) : null}
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                <SearchX className="size-6 text-muted-foreground" aria-hidden />
                <p className="text-sm text-muted-foreground">
                  No results for{" "}
                  <span className="font-mono text-foreground">
                    {query.trim()}
                  </span>
                </p>
              </div>
            )}
          </div>

          {deferredQuery ? (
            <button
              type="button"
              onClick={() => go(`/search?q=${encodeURIComponent(query.trim())}`)}
              className="flex w-full items-center justify-between gap-2 border-t border-border px-4 py-2.5 text-left text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              <span>
                See all results for{" "}
                <span className="font-mono text-foreground">{query.trim()}</span>
              </span>
              <CornerDownLeft className="size-3.5 shrink-0" aria-hidden />
            </button>
          ) : (
            <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">
                  ↑↓
                </kbd>
                navigate
                <kbd className="ml-1.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono">
                  ↵
                </kbd>
                open
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">
                  esc
                </kbd>
                close
              </span>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
