"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  caption?: string;
};

export function CodeBlock({ code, caption }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      track("copy_code", { caption });
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-4">
      {caption ? (
        <p className="mb-2 font-mono text-xs text-muted-foreground">{caption}</p>
      ) : null}
      <div className="group relative">
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] font-medium text-white/80 backdrop-blur transition-colors hover:bg-white/20 hover:text-white",
            "opacity-0 focus-visible:opacity-100 group-hover:opacity-100",
            copied && "opacity-100"
          )}
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-300" strokeWidth={2} />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" strokeWidth={1.75} />
              Copy
            </>
          )}
        </button>
        <pre className="max-w-full overflow-x-auto rounded-lg border border-border bg-navy p-3 font-mono text-[12px] leading-relaxed text-white/90 sm:p-4 sm:text-[13px]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
