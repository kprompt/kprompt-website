import type { ReactNode } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FlowNode = {
  id: string;
  label: string;
  hint?: string;
  tone?: "default" | "brand" | "warn" | "muted" | "gate";
};

const TONE: Record<NonNullable<FlowNode["tone"]>, string> = {
  default: "border-border bg-background text-foreground",
  brand: "border-brand/40 bg-brand/5 text-foreground",
  warn: "border-amber-500/40 bg-amber-500/5 text-foreground",
  muted: "border-border/60 bg-muted/50 text-muted-foreground",
  gate: "border-bright/50 bg-bright/5 text-foreground",
};

export function FlowRail({
  nodes,
  className,
  ariaLabel,
}: {
  nodes: FlowNode[];
  className?: string;
  ariaLabel: string;
}) {
  return (
    <ol
      aria-label={ariaLabel}
      className={cn(
        "flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-0",
        className
      )}
    >
      {nodes.map((node, i) => (
        <li key={node.id} className="flex flex-col lg:flex-row lg:items-stretch">
          <div
            className={cn(
              "flex min-w-0 flex-1 flex-col justify-center rounded-lg border px-3 py-2.5 lg:min-w-[7.5rem] lg:max-w-[9.5rem]",
              TONE[node.tone ?? "default"]
            )}
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-1 font-heading text-sm font-semibold leading-snug tracking-tight">
              {node.label}
            </span>
            {node.hint ? (
              <span className="mt-1 text-[11px] leading-snug text-muted-foreground">
                {node.hint}
              </span>
            ) : null}
          </div>
          {i < nodes.length - 1 ? (
            <div
              className="flex items-center justify-center py-1 text-muted-foreground/50 lg:px-1.5 lg:py-0"
              aria-hidden
            >
              <ArrowDown className="size-3.5 lg:hidden" />
              <ArrowRight className="hidden size-3.5 lg:block" />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function DiagramFrame({
  title,
  caption,
  children,
  className,
}: {
  title: string;
  caption?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-muted/30",
        className
      )}
    >
      <figcaption className="border-b border-border/80 px-4 py-2.5 sm:px-5">
        <p className="font-heading text-sm font-semibold tracking-tight">{title}</p>
        {caption ? (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {caption}
          </p>
        ) : null}
      </figcaption>
      <div className="px-3 py-4 sm:px-5 sm:py-5">{children}</div>
    </figure>
  );
}
