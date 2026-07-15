"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DOCS_NAV } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <label className="mb-6 block md:hidden">
        <span className="sr-only">Docs section</span>
        <select
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          value={pathname}
          onChange={(e) => router.push(e.target.value)}
        >
          {DOCS_NAV.map((item) => (
            <option key={item.href} value={item.href}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <nav aria-label="Docs" className="hidden md:block">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Docs
        </p>
        <ul className="mt-4 space-y-1">
          {DOCS_NAV.map((item) => {
            const active =
              item.href === "/docs"
                ? pathname === "/docs"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
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
      </nav>
    </>
  );
}
