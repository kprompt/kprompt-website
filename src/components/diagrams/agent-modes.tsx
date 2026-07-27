import { DiagramFrame } from "@/components/diagrams/flow-rail";

const MODES = [
  {
    id: "cli",
    label: "CLI",
    scope: "kubeconfig",
    artifact: "PlanResult",
    mutate: "After approve",
  },
  {
    id: "observe",
    label: "Observe",
    scope: "One namespace",
    artifact: "Incident / Alert",
    mutate: "Never",
  },
  {
    id: "na",
    label: "Namespace Agent",
    scope: "One namespace",
    artifact: "Report v2",
    mutate: "Propose-first",
  },
  {
    id: "coord",
    label: "Coordinator",
    scope: "Cross-ns",
    artifact: "Handoff",
    mutate: "Default off",
  },
] as const;

export function AgentModesDiagram({ className }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="Modes at a glance"
      caption="Namespace Agent is not a new binary — it is the Observe runtime with RCA, memory, and handoff under ADR-0016."
    >
      <div className="-mx-1 overflow-x-auto px-1">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Surface", "Scope", "Artifact", "Mutate?"].map((h) => (
                <th
                  key={h}
                  className="py-2 pr-3 font-heading text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODES.map((row) => (
              <tr key={row.id} className="border-b border-border/60 align-top">
                <td className="py-2.5 pr-3 font-heading text-sm font-semibold tracking-tight">
                  {row.label}
                </td>
                <td className="py-2.5 pr-3 font-mono text-[12px] text-muted-foreground">
                  {row.scope}
                </td>
                <td className="py-2.5 pr-3 font-mono text-[12px] text-foreground">
                  {row.artifact}
                </td>
                <td className="py-2.5 pr-3 font-mono text-[12px] text-muted-foreground">
                  {row.mutate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DiagramFrame>
  );
}
