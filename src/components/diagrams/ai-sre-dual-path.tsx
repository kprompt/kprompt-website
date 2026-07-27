import type { ReactNode } from "react";
import Link from "next/link";
import { DiagramFrame } from "@/components/diagrams/flow-rail";
import { cn } from "@/lib/utils";

const CLI_PACK = [
  { cmd: "investigate", artifact: "Investigation" },
  { cmd: "why", artifact: "Cause findings" },
  { cmd: "timeline", artifact: "Ordered events" },
  { cmd: "impact", artifact: "Blast radius" },
  { cmd: "audit / drift", artifact: "Hygiene · sync" },
] as const;

const AGENT_LAYERS = [
  {
    name: "Observe",
    detail: "Watch → Incident → gated alert",
    mutate: "Never",
  },
  {
    name: "Namespace Agent",
    detail: "RCA · memory · report v2 · learn",
    mutate: "Propose-first",
  },
  {
    name: "Coordinator",
    detail: "Cross-ns handoff fan-in",
    mutate: "Off by default",
  },
  {
    name: "Autopilot",
    detail: "Allowlisted remediations",
    mutate: "policyAuto only",
  },
] as const;

export function AiSreDualPathDiagram({
  className,
  showDocsLink = false,
}: {
  className?: string;
  showDocsLink?: boolean;
}) {
  return (
    <DiagramFrame
      className={className}
      title="AI SRE — two surfaces, one contract"
      caption="Reactive CLI intelligence and the optional in-cluster agent share Investigation / Incident types. Neither silently mutates."
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <PathColumn
          eyebrow="On demand · laptop"
          title="AI SRE CLI"
          blurb="You ask. kprompt walks Service → Endpoints → Deploy → Pods → Events → Logs and returns a typed artifact."
          footer="Same PlanResult path if a fix is suggested."
        >
          <ul className="mt-4 space-y-2">
            {CLI_PACK.map((item) => (
              <li
                key={item.cmd}
                className="flex items-baseline justify-between gap-3 border-t border-border/60 pt-2 first:border-t-0 first:pt-0"
              >
                <code className="font-mono text-xs text-brand">{item.cmd}</code>
                <span className="text-right text-[11px] text-muted-foreground">
                  {item.artifact}
                </span>
              </li>
            ))}
          </ul>
        </PathColumn>

        <PathColumn
          eyebrow="Always on · in-cluster"
          title="Observe / Namespace Agent"
          blurb="Helm (or Operator) deploys a Role-scoped watcher. Correlates Incidents, analyzes once per window, notifies with confidence."
          footer="Same binary: kprompt agent run"
        >
          <ul className="mt-4 space-y-2">
            {AGENT_LAYERS.map((layer) => (
              <li
                key={layer.name}
                className="border-t border-border/60 pt-2 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-heading text-sm font-semibold tracking-tight">
                    {layer.name}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {layer.mutate}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  {layer.detail}
                </p>
              </li>
            ))}
          </ul>
        </PathColumn>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Shared core:{" "}
          <code className="font-mono text-[11px] text-foreground">
            internal/incident
          </code>{" "}
          — Investigation · Incident · AgentAlert · InvestigationReport
        </p>
        {showDocsLink ? (
          <Link
            href="/docs/architecture"
            className="shrink-0 text-xs font-medium text-brand underline-offset-4 hover:underline"
          >
            Full architecture →
          </Link>
        ) : null}
      </div>
    </DiagramFrame>
  );
}

function PathColumn({
  eyebrow,
  title,
  blurb,
  footer,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
  footer: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-brand">
        {eyebrow}
      </p>
      <h3 className="mt-1.5 font-heading text-base font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
      {children}
      <p className="mt-4 font-mono text-[11px] text-muted-foreground">{footer}</p>
    </div>
  );
}
