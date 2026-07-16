"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Menu,
  Newspaper,
  Users,
  X,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/github-icon";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_ICONS = {
  Docs: BookOpen,
  Blog: Newspaper,
  Team: Users,
} as const;

function isNavActive(pathname: string, href: string) {
  if (href === "/docs") {
    return pathname === "/docs" || pathname.startsWith("/docs/");
  }
  if (href === "/blog") {
    return pathname === "/blog" || pathname.startsWith("/blog/");
  }
  if (href === "/team") {
    return pathname === "/team" || pathname.startsWith("/team/");
  }
  return pathname === href;
}

function DesktopNavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group relative px-3 py-2 text-sm font-medium transition-colors",
          active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {label}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand transition-transform duration-200",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          )}
        />
      </Link>
    </li>
  );
}

function MobileNavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate: () => void;
}) {
  const Icon = NAV_ICONS[label as keyof typeof NAV_ICONS];

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-4 rounded-2xl border px-4 py-4 transition-colors",
        active
          ? "border-brand/25 bg-brand/5 text-foreground"
          : "border-border/70 bg-muted/20 text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground"
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl border",
          active
            ? "border-brand/20 bg-brand/10 text-brand"
            : "border-border bg-background text-muted-foreground"
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="flex-1">
        <span className="block font-heading text-base font-semibold tracking-tight">
          {label}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {label === "Docs"
            ? "Install, commands, safety, CI"
            : label === "Blog"
              ? "Updates and notes from the team"
              : "People building kprompt"}
        </span>
      </span>
      <ArrowRight className="size-4 shrink-0 opacity-50" aria-hidden />
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled || open ? "glass shadow-sm" : "border-b border-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6"
        aria-label="Primary"
      >
        <Link href="/" aria-label="kprompt.ai home" className="shrink-0">
          <Logo size={28} priority />
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <DesktopNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isNavActive(pathname, link.href)}
            />
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <ThemeToggle />
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "ghost" })}
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
          <Link href={SITE.getStarted} className={buttonVariants()}>
            Get Started
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <Link
            href={SITE.getStarted}
            className={cn(buttonVariants({ size: "sm" }), "hidden min-[420px]:inline-flex")}
          >
            Get Started
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              open && "border-brand/30 bg-brand/5 text-brand"
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-40 bg-background/70 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
            />

            <motion.div
              id="mobile-menu"
              initial={reduced ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-16 z-50 border-b border-border glass md:hidden"
            >
              <div className="mx-auto max-w-6xl space-y-3 px-4 py-5 sm:px-6">
                {NAV_LINKS.map((link) => (
                  <MobileNavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    active={isNavActive(pathname, link.href)}
                    onNavigate={closeMenu}
                  />
                ))}

                <div className="grid grid-cols-1 gap-2 border-t border-border/70 pt-4 min-[420px]:grid-cols-2">
                  <a
                    href={SITE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-11 w-full justify-center"
                    )}
                    onClick={closeMenu}
                  >
                    <GithubIcon className="size-4" />
                    GitHub
                  </a>
                  <Link
                    href={SITE.getStarted}
                    className={cn(buttonVariants(), "h-11 w-full justify-center gap-1.5")}
                    onClick={closeMenu}
                  >
                    Get Started
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
