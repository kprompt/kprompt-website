import { Check, X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const TRADITIONAL = [
  "Hand-write YAML for routine changes",
  "Memorize kubectl flags under pressure",
  "Guess risk from a long diff alone",
  "No shared trail of who applied what locally",
] as const;

const KPROMPT = [
  "Describe the change; get a concrete plan",
  "Review diffs and risk before apply",
  "Hard denies for wipe-class prompts",
  "History + JSON PlanResult for CI gates",
  "Same loop for optimize, graphs, and day-2 tools",
] as const;

export function WhyKprompt() {
  return (
    <section id="why" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Why kprompt
          </h2>
          <p className="mt-3 text-muted-foreground">
            Less ceremony. More reviewable cluster control.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12">
          <Reveal>
            <div>
              <h3 className="font-heading text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Traditional Kubernetes
              </h3>
              <ul className="mt-6 space-y-3">
                {TRADITIONAL.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <X
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground/55"
                      strokeWidth={1.75}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <h3 className="font-heading text-sm font-medium uppercase tracking-wider text-brand">
                kprompt
              </h3>
              <ul className="mt-6 space-y-3">
                {KPROMPT.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      strokeWidth={1.75}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
