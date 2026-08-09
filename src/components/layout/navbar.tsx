"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  LayoutDashboard,
  Menu,
  Newspaper,
  Search,
  Tag,
  Users,
  X,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/github-icon";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { BlogSearchItem } from "@/lib/blog-posts";
import type { DocsSearchItem } from "@/lib/docs-meta";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SearchCommand = dynamic(() =>
  import("@/components/layout/search-command").then((m) => m.SearchCommand)
);

const NAV_ICONS = {
  Docs: BookOpen,
  Pricing: Tag,
  Blog: Newspaper,
  Team: Users,
  App: LayoutDashboard,
} as const;

const NAV_BLURBS: Record<(typeof NAV_LINKS)[number]["label"], string> = {
  Docs: "Install, commands, safety, CI",
  Pricing: "CLI is free forever — BYOK",
  Blog: "Updates and notes from the team",
  Team: "People building kprompt",
  App: "Team console at app.kprompt.ai",
};

function isExternal(link: (typeof NAV_LINKS)[number]) {
  return "external" in link && link.external === true;
}

function isNavActive(pathname: string, href: string) {
  if (href.startsWith("http")) {
    return false;
  }
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
  external,
}: {
  href: string;
  label: string;
  active: boolean;
  external?: boolean;
}) {
  const className = cn(
    "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
    active
      ? "bg-muted/70 text-foreground"
      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
  );

  return (
    <li>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {label}
        </a>
      ) : (
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={className}
        >
          {label}
        </Link>
      )}
    </li>
  );
}

function MobileNavLink({
  href,
  label,
  active,
  external,
  onNavigate,
}: {
  href: string;
  label: keyof typeof NAV_BLURBS;
  active: boolean;
  external?: boolean;
  onNavigate: () => void;
}) {
  const Icon = NAV_ICONS[label];
  const className = cn(
    "flex items-center gap-4 rounded-2xl border px-4 py-4 transition-colors",
    active
      ? "border-brand/25 bg-brand/5 text-foreground"
      : "border-border/70 bg-muted/40 text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground"
  );
  const body = (
    <>
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
          {NAV_BLURBS[label]}
        </span>
      </span>
      <ArrowRight className="size-4 shrink-0 opacity-50" aria-hidden />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {body}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={className}
    >
      {body}
    </Link>
  );
}

export function Navbar({
  blogIndex = [],
  docsIndex = [],
}: {
  blogIndex?: BlogSearchItem[];
  docsIndex?: DocsSearchItem[];
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoaded, setSearchLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(false);
        setSearchOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const { documentElement, body } = document;
    const previous = {
      htmlOverflow: documentElement.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };
    const scrollbarGap = window.innerWidth - documentElement.clientWidth;

    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }

    return () => {
      documentElement.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.width = previous.bodyWidth;
      body.style.paddingRight = previous.bodyPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (searchOpen) setSearchLoaded(true);
  }, [searchOpen]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      <nav
        className={cn(
          "mx-auto mt-2 flex h-14 w-full min-w-0 max-w-5xl items-center gap-2 rounded-2xl border px-2.5 transition-[background-color,box-shadow,border-color] duration-300 sm:mt-3 sm:gap-3 sm:px-3",
          open
            ? "border-border bg-background"
            : scrolled
              ? "border-border/70 bg-background/70 shadow-lg shadow-black/3 backdrop-blur-xl supports-backdrop-filter:bg-background/60 dark:shadow-black/20"
              : "border-transparent bg-transparent"
        )}
        aria-label="Primary"
      >
        <Link
          href="/"
          aria-label="kprompt.ai home"
          className="min-w-0 shrink overflow-hidden pl-1"
          onClick={closeMenu}
        >
          <Logo size={26} priority />
        </Link>

        <ul className="hidden min-w-0 items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <DesktopNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isNavActive(pathname, link.href)}
              external={isExternal(link)}
            />
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search the blog"
            className="group inline-flex h-9 w-52 items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:border-border hover:bg-muted/70 hover:text-foreground"
          >
            <Search className="size-4 shrink-0" aria-hidden />
            <span className="flex-1 text-left">Search…</span>
            <kbd className="pointer-events-none flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              <span className="text-[11px]">⌘</span>K
            </kbd>
          </button>
          <ThemeToggle />
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
            aria-label="GitHub repository"
          >
            <GithubIcon className="size-4" />
          </a>
          <Link href={SITE.getStarted} className={buttonVariants()}>
            {SITE.ctaPrimary}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className={buttonVariants({ variant: "outline", size: "icon" })}
            aria-label="Search the blog"
          >
            <Search className="size-4" />
          </button>
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

      <div
        className={cn(
          "fixed inset-0 top-16 z-40 md:hidden",
          open
            ? "visible pointer-events-auto"
            : "invisible pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          className={cn(
            "absolute inset-0 bg-background/95 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={closeMenu}
        />

        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile"
          inert={!open}
          className={cn(
            "absolute inset-x-0 top-0 z-10 max-h-[min(100%,calc(100dvh-4rem))] overflow-y-auto overscroll-contain border-b border-border bg-background shadow-lg transition-[opacity,transform] duration-200 ease-out",
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0"
          )}
        >
          <div className="mx-auto max-w-6xl space-y-3 px-4 py-5 sm:px-6">
            {NAV_LINKS.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isNavActive(pathname, link.href)}
                external={isExternal(link)}
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
              <a
                href={SITE.app}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-11 w-full justify-center"
                )}
                onClick={closeMenu}
              >
                App
              </a>
              <Link
                href={SITE.getStarted}
                className={cn(
                  buttonVariants(),
                  "h-11 w-full justify-center gap-1.5 min-[420px]:col-span-2"
                )}
                onClick={closeMenu}
              >
                {SITE.ctaPrimary}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {searchLoaded ? (
        <SearchCommand
          open={searchOpen}
          onOpenChange={setSearchOpen}
          blogItems={blogIndex}
          docsItems={docsIndex}
        />
      ) : null}
    </header>
  );
}
