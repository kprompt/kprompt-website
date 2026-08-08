import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/utils";

describe("slugify", () => {
  it("lowercases and hyphenates words", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("collapses non-alphanumerics and trims edge hyphens", () => {
    expect(slugify("  Plan → Apply!  ")).toBe("plan-apply");
    expect(slugify("CI / JSON")).toBe("ci-json");
  });

  it("returns an empty string for symbol-only input", () => {
    expect(slugify("—")).toBe("");
  });
});
