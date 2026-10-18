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

const BOARD_CHUNK = 4;

function chunkNodes<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

function FlowNodeCard({
  node,
  index,
  compact,
}: {
  node: FlowNode;
  index: number;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col justify-center rounded-lg border",
        compact ? "px-2.5 py-2" : "px-3 py-2.5",
        "lg:min-w-0",
        TONE[node.tone ?? "default"]
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
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
  );
}

function RailArrow({ orientation }: { orientation: "down" | "right" }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center text-muted-foreground/50",
        orientation === "down" ? "py-1" : "px-1.5 py-0"
      )}
      aria-hidden
    >
      {orientation === "down" ? (
        <ArrowDown className="size-3.5" />
      ) : (
        <ArrowRight className="size-3.5" />
      )}
    </div>
  );
}

function FlowRailStacked({
  nodes,
  className,
  ariaLabel,
}: {
  nodes: FlowNode[];
  className?: string;
  ariaLabel: string;
}) {
  return (
    <ol aria-label={ariaLabel} className={cn("flex flex-col gap-2", className)}>
      {nodes.map((node, i) => (
        <li key={node.id} className="flex flex-col">
          <FlowNodeCard node={node} index={i} />
          {i < nodes.length - 1 ? <RailArrow orientation="down" /> : null}
        </li>
      ))}
    </ol>
  );
}

function FlowRailHorizontal({
  nodes,
  className,
  ariaLabel,
  startIndex = 0,
}: {
  nodes: FlowNode[];
  className?: string;
  ariaLabel?: string;
  startIndex?: number;
}) {
  return (
    <ol
      aria-label={ariaLabel}
      className={cn("flex min-w-0 flex-row items-stretch gap-0", className)}
    >
      {nodes.map((node, i) => (
        <li
          key={node.id}
          className="flex min-w-0 flex-1 flex-row items-stretch"
        >
          <FlowNodeCard node={node} index={startIndex + i} compact />
          {i < nodes.length - 1 ? <RailArrow orientation="right" /> : null}
        </li>
      ))}
    </ol>
  );
}

function FlowRailBoard({
  nodes,
  className,
  ariaLabel,
}: {
  nodes: FlowNode[];
  className?: string;
  ariaLabel: string;
}) {
  const rows = chunkNodes(nodes, BOARD_CHUNK);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Mobile: single vertical stack */}
      <div className="lg:hidden">
        <FlowRailStacked nodes={nodes} ariaLabel={ariaLabel} />
      </div>

      {/* Desktop: intentional rows of four */}
      <div className="hidden lg:block" role="group" aria-label={ariaLabel}>
        {rows.map((row, rowIndex) => (
          <div key={row.map((n) => n.id).join("-")}>
            <FlowRailHorizontal
              nodes={row}
              startIndex={rowIndex * BOARD_CHUNK}
            />
            {rowIndex < rows.length - 1 ? (
              <div className="flex justify-start py-1.5 pl-3">
                <RailArrow orientation="down" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowRailRail({
  nodes,
  className,
  ariaLabel,
}: {
  nodes: FlowNode[];
  className?: string;
  ariaLabel: string;
}) {
  return (
    <div className={cn(className)}>
      <div className="lg:hidden">
        <FlowRailStacked nodes={nodes} ariaLabel={ariaLabel} />
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <FlowRailHorizontal
          nodes={nodes}
          ariaLabel={ariaLabel}
          className="min-w-max [&_li]:flex-none [&_li>div:first-child]:w-[8.5rem] [&_li>div:first-child]:flex-none"
        />
      </div>
    </div>
  );
}

export function FlowRail({
  nodes,
  className,
  ariaLabel,
  layout = "rail",
}: {
  nodes: FlowNode[];
  className?: string;
  ariaLabel: string;
  layout?: "rail" | "board";
}) {
  if (layout === "board") {
    return (
      <FlowRailBoard nodes={nodes} className={className} ariaLabel={ariaLabel} />
    );
  }

  return (
    <FlowRailRail nodes={nodes} className={className} ariaLabel={ariaLabel} />
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
