"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DOCS_NAV_SECTIONS } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/docs"
    ? pathname === "/docs"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function DocsSidebar() {
  const pathname = usePathname();
  const router = useRouter();

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
        <div className="mt-4 space-y-5">
          {DOCS_NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="mb-1.5 px-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
                {section.title}
              </p>
              <ul className="space-y-0.5">
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
          ))}
        </div>
      </nav>
    </>
  );
}
