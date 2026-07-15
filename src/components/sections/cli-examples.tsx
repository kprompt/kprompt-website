"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { CLI_DEMO_OUTPUT, CLI_EXAMPLES } from "@/lib/demo-commands";
import { cn } from "@/lib/utils";

export function CliExamples() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const command = CLI_EXAMPLES[active];
  const output = CLI_DEMO_OUTPUT[command] ?? [];

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
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            CLI that speaks Kubernetes.
          </h2>
          <p className="mt-3 text-muted-foreground">
            One binary. Natural language in. Cluster actions out.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <Reveal>
            <ul className="space-y-1.5" role="listbox" aria-label="CLI examples">
              {CLI_EXAMPLES.map((example, i) => (
                <li key={example}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    className={cn(
                      "w-full rounded-lg border px-3.5 py-2.5 text-left font-mono text-[12px] transition-colors sm:text-[13px]",
                      i === active
                        ? "border-brand/35 bg-brand/10 text-brand"
                        : "border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {example}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-xl border border-navy/20 bg-navy terminal-glow">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="ml-3 font-mono text-[11px] text-white/45">
                  terminal
                </span>
              </div>
              <div className="min-h-[240px] bg-grid-dark px-4 py-5 font-mono text-[13px] leading-relaxed sm:px-5 sm:text-sm">
                <p className="text-white/95">
                  <span className="text-bright">›</span> {command}
                  <span
                    className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] animate-pulse bg-bright align-baseline"
                    aria-hidden
                  />
                </p>
                <div className="mt-4 space-y-1.5 text-white/80">
                  {output.map((line) => (
                    <motion.p
                      key={`${command}-${line}`}
                      initial={reduced ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(line.startsWith("✓") && "text-bright")}
                    >
                      {line}
                    </motion.p>
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
