import { DiagramFrame, FlowRail, type FlowNode } from "@/components/diagrams/flow-rail";

const RUNTIME: FlowNode[] = [
  { id: "nl", label: "Natural Language", hint: "Developer intent", tone: "brand" },
  { id: "plan", label: "Planning Engine", hint: "Reason + actions" },
  { id: "graph", label: "Execution Graph", hint: "Ordered steps" },
  { id: "policy", label: "Policy Validation", hint: "Hard deny + risk", tone: "warn" },
  { id: "k8s", label: "Kubernetes", hint: "Apply / observe", tone: "gate" },
  { id: "learn", label: "Learn", hint: "Incident memory", tone: "muted" },
];

export function RuntimePipelineDiagram({ className }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="AI Runtime"
      caption="Not a dashboard. Not a workflow tool. A reasoning loop over live Kubernetes."
    >
      <FlowRail nodes={RUNTIME} ariaLabel="AI Runtime pipeline" />
    </DiagramFrame>
  );
}

const PIPELINE: FlowNode[] = [
  { id: "prompt", label: "Prompt", hint: "Plain English", tone: "brand" },
  { id: "intent", label: "Intent", hint: "Typed schema" },
  { id: "plan", label: "Plan", hint: "Actions + diffs" },
  { id: "safety", label: "Safety", hint: "Hard deny + risk", tone: "warn" },
  { id: "approve", label: "Approve", hint: "TTY y/N or --approve", tone: "gate" },
  { id: "apply", label: "Apply", hint: "client-go SSA", tone: "muted" },
];

/** Laptop mutate path — still the PlanResult contract under the runtime. */
export function IntentPipelineDiagram({ className }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="PlanResult contract"
      caption="Natural language becomes a reviewable PlanResult. Nothing mutates until you approve."
    >
      <FlowRail nodes={PIPELINE} ariaLabel="Intent to PlanResult pipeline" />
    </DiagramFrame>
  );
}
