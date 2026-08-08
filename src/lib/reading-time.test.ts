import { describe, expect, it } from "vitest";
import type { DocsBlock } from "@/lib/docs-content";
import { readingMinutes } from "@/lib/blog-posts";

function paragraph(words: number): DocsBlock {
  return { type: "p", text: Array.from({ length: words }, () => "word").join(" ") };
}

describe("readingMinutes", () => {
  it("returns at least 1 minute for short content", () => {
    expect(readingMinutes([paragraph(10)])).toBe(1);
  });

  it("scales roughly with word count (~220 wpm)", () => {
    expect(readingMinutes([paragraph(660)])).toBe(3);
  });

  it("counts list items and weights code lower than prose", () => {
    const list: DocsBlock = {
      type: "ul",
      items: Array.from({ length: 220 }, () => "item"),
    };
    expect(readingMinutes([list])).toBe(1);

    const code: DocsBlock = {
      type: "code",
      code: Array.from({ length: 440 }, () => "tok").join(" "),
    };
    // 440 code tokens * 0.5 weight = 220 words ≈ 1 minute.
    expect(readingMinutes([code])).toBe(1);
  });
});
