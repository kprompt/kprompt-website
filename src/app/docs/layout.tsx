import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { ExperimentalNotice } from "@/components/ui/experimental-notice";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[70vh] pt-24 pb-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-50" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[13rem_1fr] lg:gap-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <DocsSidebar />
        </aside>
        <div>
          <ExperimentalNotice className="mb-8 max-w-3xl" />
          {children}
        </div>
      </div>
    </div>
  );
}
