"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DOCS_NAV_SECTIONS } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/docs"
    ? pathname === "/docs"
    : pathname === href || pathname.startsWith(`${href}/`);
}

function sectionForPath(pathname: string) {
  return (
    DOCS_NAV_SECTIONS.find((section) =>
      section.items.some((item) => isActive(pathname, item.href))
    )?.title ?? DOCS_NAV_SECTIONS[0]?.title
  );
}

export function DocsSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openSection, setOpenSection] = useState(() => sectionForPath(pathname));

  useEffect(() => {
    setOpenSection(sectionForPath(pathname));
  }, [pathname]);

  return (
    <>
      <label className="mb-2 block lg:hidden">
        <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Docs
        </span>
        <select
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
          value={pathname}
          onChange={(e) => router.push(e.target.value)}
        >
          {DOCS_NAV_SECTIONS.map((section) => (
            <optgroup key={section.title} label={section.title}>
              {section.items.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <nav
        aria-label="Docs"
        className="hidden max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain pr-1 lg:block"
      >
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Docs
        </p>
        <div className="mt-3 space-y-1">
          {DOCS_NAV_SECTIONS.map((section) => {
            const open = openSection === section.title;
            const panelId = `docs-nav-${section.title.toLowerCase()}`;
            const hasActive = section.items.some((item) =>
              isActive(pathname, item.href)
            );

            return (
              <div key={section.title} className="rounded-md">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenSection((current) =>
                      current === section.title ? "" : section.title
                    )
                  }
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left font-mono text-[11px] uppercase tracking-wider transition-colors",
                    hasActive || open
                      ? "text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {section.title}
                  <ChevronDown
                    className={cn(
                      "size-3.5 shrink-0 transition-transform duration-200",
                      open ? "rotate-0" : "-rotate-90"
                    )}
                    aria-hidden
                  />
                </button>
                <div id={panelId} role="region" hidden={!open}>
                  <ul className="space-y-0.5 pb-1 pl-1">
                    {section.items.map((item) => {
                      const active = isActive(pathname, item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "block rounded-md px-2.5 py-1.5 text-sm transition-colors",
                              active
                                ? "bg-brand/10 font-medium text-brand"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
