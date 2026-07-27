import { DiagramFrame, FlowRail, type FlowNode } from "@/components/diagrams/flow-rail";

const PIPELINE: FlowNode[] = [
  { id: "prompt", label: "Prompt", hint: "Plain English", tone: "brand" },
  { id: "intent", label: "Intent", hint: "Typed schema" },
  { id: "plan", label: "Plan", hint: "Actions + diffs" },
  { id: "safety", label: "Safety", hint: "Hard deny + risk", tone: "warn" },
  { id: "approve", label: "Approve", hint: "TTY y/N or --approve", tone: "gate" },
  { id: "apply", label: "Apply", hint: "client-go SSA", tone: "muted" },
];

export function IntentPipelineDiagram({ className }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="Intent compiler"
      caption="Natural language becomes a reviewable PlanResult. Nothing mutates until you approve."
    >
      <FlowRail nodes={PIPELINE} ariaLabel="Intent compiler pipeline" />
    </DiagramFrame>
  );
}
