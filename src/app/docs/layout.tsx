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
      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <DocsSidebar />
        </aside>
        <div className="min-w-0">
          <ExperimentalNotice className="mb-6 max-w-3xl sm:mb-8" />
          {children}
        </div>
      </div>
    </div>
  );
}
