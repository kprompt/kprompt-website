#!/usr/bin/env node
/**
 * Historical one-shot — already applied.
 *
 * Blog posts live at: src/content/blog/<slug>.ts
 * Registry:           src/content/blog/index.ts
 * Helpers / API:      src/lib/blog-posts.ts
 * Types:              src/lib/blog-types.ts
 *
 * New post:
 *   1. Create src/content/blog/<slug>.ts (default export BlogPost)
 *   2. Import + append in src/content/blog/index.ts
 */
console.error(
  "split-blog-posts.mjs already ran. Add posts under src/content/blog/ instead."
);
process.exit(1);
