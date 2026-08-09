import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import {
  getAllPostSlugs,
  getPostBySlug,
} from "@/lib/blog-posts";
import { loadLogoDataUrl, ogLogoSize } from "@/lib/og-brand";

export const alt = "kprompt blog article";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

type ImageProps = {
  params: Promise<{ slug: string }>;
};

async function loadAvatarDataUrl(avatarPath?: string) {
  if (!avatarPath?.startsWith("/")) return undefined;
  try {
    const file = await readFile(join(process.cwd(), "public", avatarPath.slice(1)));
    return `data:image/png;base64,${file.toString("base64")}`;
  } catch {
    return undefined;
  }
}

export default async function OpenGraphImage({ params }: ImageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "kprompt blog";
  const description =
    post?.description ??
    "Kubernetes, AI, and practical operator notes from kprompt.";
  const tags = post?.tags.slice(0, 4) ?? ["kubernetes", "ai"];
  const author = post?.author;
  const avatar = await loadAvatarDataUrl(author?.avatar);
  const logo = await loadLogoDataUrl();
  const logoSize = ogLogoSize(44);

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
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(124,58,237,0.35), transparent 34%), radial-gradient(circle at 10% 90%, rgba(37,99,235,0.28), transparent 40%)",
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
            {logo ? (
              <img
                src={logo}
                alt=""
                width={logoSize.width}
                height={logoSize.height}
                style={{ objectFit: "contain" }}
              />
            ) : (
              <div
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                  color: "#fff",
                  backgroundColor: "#2563eb",
                  fontSize: 25,
                }}
              >
                k
              </div>
            )}
            kprompt
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#94a3b8" }}>
            kprompt.ai/blog
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 1040,
              fontSize: title.length > 72 ? 48 : 58,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              fontWeight: 700,
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
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {avatar ? (
              // ImageResponse requires a native img element.
              <img
                src={avatar}
                alt=""
                width={48}
                height={48}
                style={{
                  borderRadius: 999,
                  objectFit: "cover",
                  border: "1px solid rgba(148,163,184,0.35)",
                }}
              />
            ) : null}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <div style={{ display: "flex", fontSize: 19, fontWeight: 600 }}>
                {author?.name ?? "kprompt team"}
              </div>
              <div style={{ display: "flex", fontSize: 15, color: "#94a3b8" }}>
                {author?.role ?? "Open-source Kubernetes CLI"}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 13px",
                  borderRadius: 999,
                  border: "1px solid rgba(148,163,184,0.22)",
                  backgroundColor: "rgba(15,23,42,0.5)",
                  color: "#bfdbfe",
                  fontSize: 15,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
