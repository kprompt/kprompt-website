"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CopyCommandProps = {
  command?: string;
  className?: string;
  /** Compact single-line teaser vs. full install block */
  size?: "sm" | "lg";
};

export function CopyCommand({
  command = SITE.installCommand,
  className,
  size = "sm",
}: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        "group inline-flex max-w-full items-center gap-3 rounded-lg border border-border bg-muted/80 text-left transition-colors hover:border-brand/30 hover:bg-muted",
        size === "sm" && "px-3 py-2",
        size === "lg" && "w-full px-4 py-3.5 sm:px-5",
        className
      )}
      aria-label={copied ? "Copied" : "Copy install command"}
    >
      <code
        className={cn(
          "min-w-0 flex-1 truncate font-mono text-foreground",
          size === "sm" && "text-[12px] sm:text-[13px]",
          size === "lg" && "text-[13px] sm:text-sm"
        )}
      >
        <span className="text-brand">$</span> {command}
      </code>
      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 text-muted-foreground transition-colors group-hover:text-foreground",
          size === "sm" && "text-xs",
          size === "lg" && "text-sm"
        )}
      >
        {copied ? (
          <>
            <Check className="size-3.5 text-brand" strokeWidth={2} />
            <span className="hidden sm:inline">Copied</span>
          </>
        ) : (
          <>
            <Copy className="size-3.5" strokeWidth={1.75} />
            <span className="hidden sm:inline">Copy</span>
          </>
        )}
      </span>
    </button>
  );
}
