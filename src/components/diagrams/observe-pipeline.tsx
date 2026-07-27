import { DiagramFrame, FlowRail, type FlowNode } from "@/components/diagrams/flow-rail";

const OBSERVE: FlowNode[] = [
  { id: "watch", label: "Watch", hint: "Pods · Events · …", tone: "brand" },
  { id: "normalize", label: "Normalize", hint: "Typed signals" },
  { id: "dedupe", label: "Dedupe", hint: "Burst collapse" },
  { id: "incident", label: "Incident", hint: "Correlate window" },
  { id: "context", label: "Context", hint: "Logs · metrics · GitOps" },
  { id: "analyze", label: "Analyze", hint: "LLM or --heuristic" },
  { id: "gate", label: "Gate", hint: "Severity · confidence", tone: "warn" },
  { id: "notify", label: "Notify", hint: "Slack / webhook", tone: "gate" },
];

export function ObservePipelineDiagram({ className }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="Observe agent pipeline"
      caption="Always-on, namespace-scoped. Batches by open Incident — not one LLM call per raw event. Mutate stays off."
    >
      <FlowRail nodes={OBSERVE} ariaLabel="Observe agent pipeline" />
    </DiagramFrame>
  );
}
