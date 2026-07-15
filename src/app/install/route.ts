import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Serves the install script from this repo's public/ copy.
 * Avoids depending on raw.githubusercontent.com / jsDelivr CDN lag.
 */
export async function GET() {
  try {
    const body = await readFile(
      join(process.cwd(), "public", "install.sh"),
      "utf8"
    );
    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch {
    return new Response("# install.sh missing from deploy\n", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
