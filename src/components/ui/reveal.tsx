"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/**
 * Lightweight scroll reveal — CSS only (no framer-motion).
 * useLayoutEffect arms opacity:0 before paint for below-fold nodes only.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.92) {
      return;
    }

    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed]);

  return (
    <div
      ref={ref}
      className={cn(
        armed && "reveal",
        armed && visible && "reveal-visible",
        className
      )}
      style={
        armed
          ? ({
              "--reveal-delay": `${delay}s`,
              "--reveal-y": `${y}px`,
            } as CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
