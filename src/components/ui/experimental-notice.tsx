import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ExperimentalNoticeProps = {
  className?: string;
  /** Compact single-line under hero logo */
  compact?: boolean;
};

export function ExperimentalNotice({
  className,
  compact = false,
}: ExperimentalNoticeProps) {
  if (compact) {
    return (
      <p
        className={cn(
          "mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground",
          className
        )}
      >
        <span className="text-brand">{SITE.maturityLabel}</span>
        <span className="mx-2 text-border">·</span>
        Review every plan before apply
      </p>
    );
  }

  return (
    <aside
      className={cn(
        "rounded-lg border border-border bg-muted/70 px-4 py-3 text-sm leading-relaxed text-muted-foreground",
        className
      )}
      role="note"
    >
      <p>
        <span className="font-medium text-foreground">{SITE.maturityLabel}.</span>{" "}
        {SITE.maturityNotice}{" "}
        <Link href="/docs/safety" className="text-brand underline-offset-4 hover:underline">
          Safety docs
        </Link>
        .
      </p>
    </aside>
  );
}
