import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { FAQ } from "@/lib/faq";

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Questions operators ask first
          </h2>
          <p className="mt-3 text-muted-foreground">
            Straight answers about approval, credentials, and what is still
            experimental.
          </p>
        </Reveal>

        <div className="mt-10 max-w-3xl divide-y divide-border border-y border-border">
          {FAQ.map((entry, i) => (
            <Reveal key={entry.question} delay={Math.min(i, 4) * 0.04}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="flex-1 font-heading text-base font-semibold tracking-tight">
                    {entry.question}
                  </h3>
                  <ChevronDown
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </summary>
                <div className="pb-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {entry.answer}
                  </p>
                  {entry.more ? (
                    <Link
                      href={entry.more.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
                    >
                      {entry.more.label}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  ) : null}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
