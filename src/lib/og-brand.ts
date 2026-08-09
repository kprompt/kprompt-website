import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/constants";

/** Native logo aspect (matches `Logo` in components/ui/logo.tsx). */
const LOGO_ASPECT = 141 / 160;
const LOGO_FILE = "kprompt-logo.png";

export function ogLogoSize(height: number) {
  return { height, width: Math.round(height * LOGO_ASPECT) };
}

/**
 * Logo src for next/og ImageResponse (native `<img>`).
 * Local dev uses a data URL; on Vercel, `public/` is not in the OG serverless bundle,
 * so fall back to the static CDN URL (always deployed with the site).
 */
export async function loadLogoDataUrl(): Promise<string> {
  try {
    const file = await readFile(join(process.cwd(), "public", LOGO_FILE));
    return `data:image/png;base64,${file.toString("base64")}`;
  } catch {
    return `${SITE.url}/${LOGO_FILE}`;
  }
}
