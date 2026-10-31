import { describe, it, expect } from "vitest";
import { PRESENTATIONS, getPresentationBySlug } from "../app/data/presentations";

describe("presentations data", () => {
  it("should have at least one presentation", () => {
    expect(PRESENTATIONS.length).toBeGreaterThan(0);
  });

  it("should find presentation by slug", () => {
    const deck = getPresentationBySlug("why-is-the-night-sky-dark");
    expect(deck).toBeDefined();
    expect(deck?.title).toBe("Why Is the Night Sky Dark?");
  });

  it("should return undefined for non-existent slug", () => {
    const deck = getPresentationBySlug("non-existent-presentation");
    expect(deck).toBeUndefined();
  });
});
