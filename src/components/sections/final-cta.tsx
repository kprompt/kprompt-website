import { ArrowRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { CopyCommand } from "@/components/ui/copy-command";
import { INSTALL_STEPS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section
      id="get-started"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-glow" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Ready to talk to your cluster?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Install the CLI, set an LLM API key, connect kubeconfig, then prompt.
          </p>

          <CopyCommand className="mx-auto mt-8 max-w-xl text-left" size="lg" />

          <ol className="mx-auto mt-8 flex max-w-lg flex-col gap-2.5 text-left sm:flex-row sm:justify-center sm:gap-8 sm:text-center">
            {INSTALL_STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-2.5 text-sm text-muted-foreground sm:flex-col sm:gap-1.5"
              >
                <span className="font-mono text-xs text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              View on GitHub
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#usage"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <BookOpen className="size-4" />
              Usage guide
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
