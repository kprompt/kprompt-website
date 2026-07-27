import { AgentDocs } from "@/components/docs/agent-docs";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("agent", "/docs/agent");

export default function DocsAgentPage() {
  return <AgentDocs />;
}
