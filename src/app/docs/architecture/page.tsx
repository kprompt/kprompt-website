import { ArchitectureDocs } from "@/components/docs/architecture-docs";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("architecture", "/docs/architecture");

export default function DocsArchitecturePage() {
  return <ArchitectureDocs />;
}
