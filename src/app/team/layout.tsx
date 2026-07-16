export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[70vh] pt-24 pb-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </div>
  );
}
