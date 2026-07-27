import { DiagramFrame } from "@/components/diagrams/flow-rail";

const STEPS = [
  {
    from: "Namespace Agent",
    to: "Humans / SIEM",
    via: "Slack · webhook · ask",
    note: "InvestigationReport v2 — read path",
  },
  {
    from: "Namespace Agent",
    to: "Coordinator",
    via: "CoordinatorHandoff",
    note: "Suspect outside my ns? Hand off — don’t invent cross-ns root cause",
  },
  {
    from: "Coordinator",
    to: "Namespace Agent",
    via: "CoordinatorReply",
    note: "Thin verify / fan-in. Mutate stays off by default",
  },
] as const;

export function CoordinatorHandoffDiagram({ className }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="Coordinator handoff"
      caption="Cross-namespace suspicion is a handoff, not a god-mode agent."
    >
      <ol className="space-y-3" aria-label="Coordinator handoff flow">
        {STEPS.map((step, i) => (
          <li
            key={step.via}
            className="grid gap-1 border-l-2 border-brand/40 pl-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center sm:gap-3 sm:border-l-0 sm:pl-0"
          >
            <span className="font-heading text-sm font-semibold tracking-tight">
              <span className="mr-2 font-mono text-[10px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step.from}
            </span>
            <span className="font-mono text-[11px] text-brand sm:text-center">
              → {step.via} →
            </span>
            <span className="font-heading text-sm font-semibold tracking-tight sm:text-right">
              {step.to}
            </span>
            <p className="text-xs leading-relaxed text-muted-foreground sm:col-span-3">
              {step.note}
            </p>
          </li>
        ))}
      </ol>
    </DiagramFrame>
  );
}
