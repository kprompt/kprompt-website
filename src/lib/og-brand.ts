import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Native logo aspect (matches `Logo` in components/ui/logo.tsx). */
const LOGO_ASPECT = 141 / 160;

export function ogLogoSize(height: number) {
  return { height, width: Math.round(height * LOGO_ASPECT) };
}

/** Load `/kprompt-logo.png` for next/og ImageResponse (requires native `<img>`). */
export async function loadLogoDataUrl(): Promise<string | undefined> {
  try {
    const file = await readFile(join(process.cwd(), "public", "kprompt-logo.png"));
    return `data:image/png;base64,${file.toString("base64")}`;
  } catch {
    return undefined;
  }
}
