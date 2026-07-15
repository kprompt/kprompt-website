"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HERO_DEMOS, type DemoCommand } from "@/lib/demo-commands";

type AnimatedTerminalProps = {
  demos?: DemoCommand[];
  className?: string;
  /** Fixed single demo — disables rotation */
  fixed?: DemoCommand;
};

export function AnimatedTerminal({
  demos = HERO_DEMOS,
  className,
  fixed,
}: AnimatedTerminalProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "hold">("typing");

  const current = fixed ?? demos[index % demos.length];
  const isOpener = !fixed && index === 0;

  useEffect(() => {
    if (reduced) {
      setTyped(current.command);
      setVisibleLines(current.lines.length);
      setPhase("hold");
      return;
    }

    setTyped("");
    setVisibleLines(0);
    setPhase("typing");

    let i = 0;
    const typeMs = isOpener ? 42 : 28;
    const typeTimer = window.setInterval(() => {
      i += 1;
      setTyped(current.command.slice(0, i));
      if (i >= current.command.length) {
        window.clearInterval(typeTimer);
        setPhase("output");
      }
    }, typeMs);

    return () => window.clearInterval(typeTimer);
  }, [current, reduced, isOpener]);

  useEffect(() => {
    if (phase !== "output" || reduced) return;

    let line = 0;
    const baseDelay = isOpener ? 720 : 420;
    let timeoutId: number;

    const showNext = () => {
      line += 1;
      setVisibleLines(line);
      if (line >= current.lines.length) {
        setPhase("hold");
        return;
      }
      // Beat before the punchline lands
      const pause =
        isOpener && line === current.lines.length - 1 ? 1100 : baseDelay;
      timeoutId = window.setTimeout(showNext, pause);
    };

    timeoutId = window.setTimeout(showNext, isOpener ? 500 : 280);

    return () => window.clearTimeout(timeoutId);
  }, [phase, current.lines, reduced, isOpener]);

  useEffect(() => {
    if (phase !== "hold" || fixed || reduced) return;

    const holdMs = 2800;
    const hold = window.setTimeout(() => {
      setIndex((v) => (v + 1) % demos.length);
    }, holdMs);

    return () => window.clearTimeout(hold);
  }, [phase, fixed, demos.length, reduced, index]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-navy/20 bg-navy terminal-glow",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="ml-3 font-mono text-[11px] tracking-wide text-white/45">
          kprompt — natural language
        </span>
      </div>

      <div className="relative min-h-[240px] bg-grid-dark px-4 py-5 sm:min-h-[260px] sm:px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="font-mono text-[13px] leading-relaxed sm:text-sm"
          >
            <p className="text-white/95">
              <span className="text-bright">›</span>{" "}
              <span>{typed}</span>
              <span
                className={cn(
                  "ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-bright align-baseline",
                  phase === "typing" && !reduced ? "animate-pulse" : "opacity-0"
                )}
                aria-hidden
              />
            </p>

            <div className="mt-4 space-y-2 text-white/80">
              {current.lines.slice(0, visibleLines).map((line) => {
                const isWarn =
                  line.startsWith("⚠") ||
                  line.toLowerCase().includes("denied") ||
                  line.toLowerCase().includes("risk: denied");
                const isOk =
                  line.startsWith("✓") ||
                  line.toLowerCase().includes("applied") ||
                  line.toLowerCase().includes("ready");

                return (
                  <motion.p
                    key={line}
                    initial={reduced ? false : { opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      isOk && "text-bright",
                      isWarn && "text-amber-400"
                    )}
                  >
                    {line}
                  </motion.p>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
