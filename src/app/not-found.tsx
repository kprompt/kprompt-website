import Link from "next/link";
import { ArrowRight, BookOpen, Home, Newspaper } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DESTINATIONS = [
  {
    href: "/",
    label: "Home",
    blurb: "Product overview and install",
    icon: Home,
  },
  {
    href: "/docs",
    label: "Docs",
    blurb: "Install, safety, providers, Observe agent",
    icon: BookOpen,
  },
  {
    href: "/blog",
    label: "Blog",
    blurb: "Comparisons, playbooks, and release notes",
    icon: Newspaper,
  },
] as const;

export default function NotFound() {
  return (
    <main className="relative min-h-[70vh] pt-28 pb-20 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0 bg-glow opacity-50"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-xl">
          <Logo size={28} />
          <p className="mt-8 font-mono text-xs uppercase tracking-wider text-brand">
            404
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            This path is not on the cluster.
          </h1>
          <p className="mt-3 text-muted-foreground">
            The page may have moved, or the URL is incomplete. Try one of these
            instead — or install the CLI and talk to a real cluster.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
              Back home
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={SITE.getStarted}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Quickstart
            </Link>
          </div>
        </div>

        <ul className="mt-14 grid max-w-3xl gap-8 sm:grid-cols-3">
          {DESTINATIONS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group block">
                <item.icon
                  className="mb-3 size-5 text-brand transition-colors group-hover:text-bright"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <p className="font-heading text-base font-semibold tracking-tight group-hover:text-brand">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{item.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
