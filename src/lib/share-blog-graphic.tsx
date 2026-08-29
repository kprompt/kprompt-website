import {
  authorInitials,
  shareCardUrl,
  shareExcerptFontSize,
  shareTagLabel,
  shareTitleLineSize,
  splitShareTitle,
  truncateShareExcerpt,
} from "@/lib/share-graphic-text";

export type ShareBlogGraphicProps = {
  title: string;
  excerpt: string;
  authorName: string;
  avatarDataUrl?: string;
  tags: string[];
  readingMinutes: number;
  slug: string;
  logoDataUrl?: string;
  logoWidth: number;
  logoHeight: number;
};

function Corner({
  top,
  right,
  bottom,
  left,
}: {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}) {
  const bar = "#38bdf8";
  const box: Record<string, string | number> = {
    position: "absolute",
    display: "flex",
    width: 36,
    height: 36,
  };
  if (top !== undefined) box.top = top;
  if (right !== undefined) box.right = right;
  if (bottom !== undefined) box.bottom = bottom;
  if (left !== undefined) box.left = left;

  const hBar: Record<string, string | number> = {
    position: "absolute",
    display: "flex",
    width: 36,
    height: 3,
    backgroundColor: bar,
  };
  const vBar: Record<string, string | number> = {
    position: "absolute",
    display: "flex",
    width: 3,
    height: 36,
    backgroundColor: bar,
  };
  if (bottom !== undefined) {
    hBar.bottom = 0;
    vBar.bottom = 0;
  } else {
    hBar.top = 0;
    vBar.top = 0;
  }
  if (right !== undefined) {
    hBar.right = 0;
    vBar.right = 0;
  } else {
    hBar.left = 0;
    vBar.left = 0;
  }

  return (
    <div style={box}>
      <div style={hBar} />
      <div style={vBar} />
    </div>
  );
}

function titleLineStyle(line: string, index: number, baseSize: number) {
  const isParen = line.startsWith("(");
  const isLead = index === 0 && !isParen;
  return {
    display: "flex" as const,
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: isParen ? Math.round(baseSize * 0.5) : isLead ? baseSize + 8 : baseSize,
    lineHeight: 1.05,
    letterSpacing: isParen ? "-0.02em" : "-0.045em",
    color: isLead ? "#7dd3fc" : isParen ? "#94a3b8" : "#f8fafc",
  };
}

export function ShareBlogGraphic({
  title,
  excerpt,
  authorName,
  avatarDataUrl,
  tags,
  readingMinutes,
  slug,
  logoDataUrl,
  logoWidth,
  logoHeight,
}: ShareBlogGraphicProps) {
  const titleLines = splitShareTitle(title);
  const titleSize = shareTitleLineSize(titleLines.length) + 8;
  const pull = truncateShareExcerpt(excerpt, 280);
  const excerptSize = shareExcerptFontSize(pull);
  const tagLabels = tags.map(shareTagLabel).filter(Boolean);
  const urlLabel = shareCardUrl(slug);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        color: "#f8fafc",
        backgroundColor: "#030712",
        backgroundImage: [
          "linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px)",
          "linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px)",
          "radial-gradient(circle at 92% 0%, rgba(56,189,248,0.22), transparent 38%)",
          "radial-gradient(circle at 8% 100%, rgba(124,58,237,0.28), transparent 42%)",
        ].join(", "),
        backgroundSize: "48px 48px, 48px 48px, auto, auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          left: 0,
          top: 0,
          width: 10,
          height: 1350,
          backgroundImage:
            "linear-gradient(180deg, #38bdf8 0%, #2563eb 45%, #7c3aed 100%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          margin: "32px 32px 32px 42px",
          position: "relative",
          border: "1px solid rgba(148,163,184,0.22)",
          overflow: "hidden",
        }}
      >
        <Corner top={14} left={14} />
        <Corner top={14} right={14} />
        <Corner bottom={14} left={14} />
        <Corner bottom={14} right={14} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
            padding: "40px 44px 36px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {logoDataUrl ? (
                <img
                  src={logoDataUrl}
                  alt=""
                  width={logoWidth}
                  height={logoHeight}
                  style={{ objectFit: "contain" }}
                />
              ) : null}
              <div
                style={{
                  display: "flex",
                  fontFamily: "Syne",
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                kprompt
                <span style={{ color: "#38bdf8" }}>.ai</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 14px",
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.25)",
                backgroundColor: "rgba(15,23,42,0.7)",
                fontFamily: "JetBrains Mono",
                fontSize: 18,
                color: "#94a3b8",
              }}
            >
              {readingMinutes} min read
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {titleLines.map((line, index) => (
              <div key={`${index}-${line}`} style={titleLineStyle(line, index, titleSize)}>
                {line}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              paddingLeft: 20,
              borderLeft: "4px solid #38bdf8",
              fontFamily: "DM Sans",
              fontSize: excerptSize,
              lineHeight: 1.42,
              color: "#cbd5e1",
            }}
          >
            {pull}
          </div>

          {tagLabels.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              {tagLabels.map((label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    fontFamily: "JetBrains Mono",
                    fontSize: 22,
                    letterSpacing: "0.03em",
                    color: "#7dd3fc",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
              }}
            >
              {avatarDataUrl ? (
                <img
                  src={avatarDataUrl}
                  alt=""
                  width={72}
                  height={72}
                  style={{
                    borderRadius: 999,
                    objectFit: "cover",
                    border: "2px solid rgba(56,189,248,0.45)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#1e293b",
                    border: "2px solid rgba(56,189,248,0.45)",
                    fontFamily: "DM Sans",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#94a3b8",
                  }}
                >
                  {authorInitials(authorName)}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{
                    display: "flex",
                    fontFamily: "DM Sans",
                    fontSize: 28,
                    fontWeight: 600,
                    color: "#f1f5f9",
                  }}
                >
                  {authorName}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontFamily: "JetBrains Mono",
                    fontSize: 18,
                    color: "#64748b",
                  }}
                >
                  {urlLabel}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "18px 20px",
                borderRadius: 14,
                backgroundColor: "rgba(37,99,235,0.22)",
                border: "1px solid rgba(56,189,248,0.35)",
                fontFamily: "Syne",
                fontSize: 24,
                fontWeight: 700,
                color: "#e0f2fe",
              }}
            >
              Continue in article
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
