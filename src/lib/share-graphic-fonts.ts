import { readFile } from "node:fs/promises";
import { join } from "node:path";

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 600 | 700;
  style: "normal";
};

const LOCAL_FONTS: { file: string; name: string; weight: OgFont["weight"] }[] = [
  { file: "syne-bold.ttf", name: "Syne", weight: 700 },
  { file: "dm-sans.ttf", name: "DM Sans", weight: 400 },
  { file: "jetbrains-mono.ttf", name: "JetBrains Mono", weight: 500 },
];

const GOOGLE_FONTS_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function loadLocalFont(
  file: string,
  name: string,
  weight: OgFont["weight"]
): Promise<OgFont | null> {
  try {
    const data = await readFile(
      join(process.cwd(), "public", "fonts", "share", file)
    );
    return {
      name,
      data: data.buffer.slice(
        data.byteOffset,
        data.byteOffset + data.byteLength
      ),
      weight,
      style: "normal",
    };
  } catch {
    return null;
  }
}

async function loadGoogleFont(
  family: string,
  weight: number
): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
      { headers: { "User-Agent": GOOGLE_FONTS_UA } }
    ).then((res) => res.text());

    const match =
      css.match(/src:\s*url\(([^)]+\.woff2)\)/) ??
      css.match(/src:\s*url\(([^)]+\.ttf)\)/);
    if (!match?.[1]) return null;

    return fetch(match[1]).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

/** Fonts for share-image ImageResponse — local files first, then Google CDN. */
export async function loadShareGraphicFonts(): Promise<OgFont[]> {
  const local = await Promise.all(
    LOCAL_FONTS.map(({ file, name, weight }) =>
      loadLocalFont(file, name, weight)
    )
  );
  const fromDisk = local.filter((font): font is OgFont => font !== null);
  if (fromDisk.length > 0) return fromDisk;

  const [syneBold, dmSans, jetbrains] = await Promise.all([
    loadGoogleFont("Syne", 700),
    loadGoogleFont("DM Sans", 400),
    loadGoogleFont("JetBrains Mono", 500),
  ]);

  const fonts: OgFont[] = [];
  if (syneBold) {
    fonts.push({ name: "Syne", data: syneBold, weight: 700, style: "normal" });
  }
  if (dmSans) {
    fonts.push({ name: "DM Sans", data: dmSans, weight: 400, style: "normal" });
  }
  if (jetbrains) {
    fonts.push({
      name: "JetBrains Mono",
      data: jetbrains,
      weight: 500,
      style: "normal",
    });
  }

  if (fonts.length === 0) {
    throw new Error(
      "Share graphic fonts missing. Add files under public/fonts/share/."
    );
  }

  return fonts;
}
