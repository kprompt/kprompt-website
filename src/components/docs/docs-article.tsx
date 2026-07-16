import Link from "next/link";
import type { ReactNode } from "react";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import type { DocsBlock, DocsPage } from "@/lib/docs-content";
import { DOCS_NAV } from "@/lib/docs-nav";

function LinkedText({
  text,
  links = [],
}: {
  text: string;
  links?: { label: string; href: string }[];
}) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const link of links) {
    const index = text.indexOf(link.label, cursor);
    if (index === -1) continue;

    nodes.push(text.slice(cursor, index));
    const className =
      "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand";

    nodes.push(
      link.href.startsWith("/") ? (
        <Link key={`${link.href}-${index}`} href={link.href} className={className}>
          {link.label}
        </Link>
      ) : (
        <a
          key={`${link.href}-${index}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {link.label}
        </a>
      )
    );
    cursor = index + link.label.length;
  }

  nodes.push(text.slice(cursor));
  return nodes;
}

export function DocsBlocks({ blocks }: { blocks: DocsBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: DocsBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base leading-relaxed text-muted-foreground">
          <LinkedText text={block.text} links={block.links} />
        </p>
      );
    case "h2":
      return (
        <h2 className="mt-10 font-heading text-xl font-semibold tracking-tight first:mt-0">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-6 font-heading text-base font-semibold tracking-tight">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div className="mt-4">
          {block.caption ? (
            <p className="mb-2 font-mono text-xs text-muted-foreground">
              {block.caption}
            </p>
          ) : null}
          <pre className="overflow-x-auto rounded-lg border border-border bg-navy p-4 font-mono text-[12px] leading-relaxed text-white/90 sm:text-[13px]">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case "table":
      return (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="py-2 pr-4 font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-border/70 align-top">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="py-2.5 pr-4 font-mono text-[12px] text-foreground sm:text-[13px]"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export function DocsArticle({ page }: { page: DocsPage }) {
  const path =
    DOCS_NAV.find((item) => item.label === page.title)?.href ?? "/docs";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          ...(path === "/docs" ? [] : [{ name: page.title, path }]),
        ]}
      />
      <article className="max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {page.description}
        </p>
        <div className="mt-10">
          <DocsBlocks blocks={page.blocks} />
        </div>
      </article>
    </>
  );
}
