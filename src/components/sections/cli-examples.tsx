"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { CLI_DEMO_OUTPUT, CLI_EXAMPLES } from "@/lib/demo-commands";
import { cn } from "@/lib/utils";

export function CliExamples() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const command = CLI_EXAMPLES[active];
  const output = CLI_DEMO_OUTPUT[command] ?? [];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % CLI_EXAMPLES.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <section id="cli" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            CLI interface
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            One binary into the runtime.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Natural language in. Context-aware plan out. Mutate only after you
            approve — operate, investigate, and analyze from the same CLI.
          </p>
        </Reveal>

        <div className="mt-12 grid min-w-0 gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <Reveal className="min-w-0">
            <div
              className="flex min-w-0 flex-col gap-1.5"
              role="group"
              aria-label="CLI examples"
            >
              {CLI_EXAMPLES.map((example, i) => (
                <button
                  key={example}
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full min-w-0 break-all rounded-lg border px-3.5 py-2.5 text-left font-mono text-[12px] transition-colors sm:text-[13px]",
                    i === active
                      ? "border-brand/35 bg-brand/10 text-brand"
                      : "border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground"
                  )}
                >
                  {example}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <div className="min-w-0 overflow-hidden rounded-xl border border-navy/20 bg-navy terminal-glow">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="ml-3 font-mono text-[11px] text-white/45">
                  terminal
                </span>
              </div>
              <div className="min-h-[240px] min-w-0 bg-grid-dark px-4 py-5 font-mono text-[13px] leading-relaxed sm:px-5 sm:text-sm">
                <p className="break-all text-white/95">
                  <span className="text-bright">›</span> {command}
                  <span
                    className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] animate-pulse bg-bright align-baseline"
                    aria-hidden
                  />
                </p>
                <div className="mt-4 space-y-1.5 text-white/80" aria-live="polite">
                  {output.map((line) => (
                    <p
                      key={`${command}-${line}`}
                      className={cn(
                        "break-all",
                        line.startsWith("✓") && "text-bright",
                        line.startsWith("⚠") && "text-amber-400"
                      )}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
