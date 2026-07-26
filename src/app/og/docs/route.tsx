import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";
import { DOCS_PAGES } from "@/lib/docs-content";
import { DOCS_FULL_INDEX } from "@/lib/llms-full";

export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

function resolveDocsPage(path: string) {
  const normalized = path === "" || path === "/" ? "/docs" : path;
  const match = DOCS_FULL_INDEX.find((item) => item.href === normalized);
  if (!match) return null;
  return {
    path: match.href,
    page: DOCS_PAGES[match.key],
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") ?? "/docs";
  const resolved = resolveDocsPage(path);

  const title = resolved?.page.title ?? "kprompt docs";
  const description =
    resolved?.page.description ??
    "Open-source Kubernetes CLI: natural language → reviewable plans → approve before apply.";
  const pathLabel = (resolved?.path ?? "/docs").replace(/^\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#f8fafc",
          background:
            "radial-gradient(circle at 85% 10%, rgba(124,58,237,.35), transparent 34%), radial-gradient(circle at 10% 90%, rgba(37,99,235,.28), transparent 40%), #0f172a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,
                color: "#fff",
                background: "#2563eb",
                fontSize: 25,
              }}
            >
              k
            </div>
            {SITE.name}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#94a3b8" }}>
            kprompt.ai/{pathLabel}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#60a5fa",
              fontWeight: 650,
            }}
          >
            Docs
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 1040,
              fontSize: title.length > 48 ? 52 : 60,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              fontWeight: 750,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 980,
              fontSize: 24,
              lineHeight: 1.4,
              color: "#cbd5e1",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex" }}>Plan → safety → approve → apply</div>
          <div style={{ display: "flex" }}>Apache-2.0 · Experimental</div>
        </div>
      </div>
    ),
    size
  );
}
