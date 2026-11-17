import { describe, expect, it } from "vitest";
import {
  AnimeEntryBase,
  assertAllowedStatusTransition,
} from "../animeEntryValidation";

describe("anime entry validation", () => {
  it("accepts the documented status transitions", () => {
    expect(() =>
      assertAllowedStatusTransition("PLANNED", "WATCHING"),
    ).not.toThrow();
    expect(() =>
      assertAllowedStatusTransition("COMPLETED", "WATCHING"),
    ).not.toThrow();
  });

  it("rejects transitions that skip the state machine", () => {
    expect(() =>
      assertAllowedStatusTransition("DROPPED", "WATCHING"),
    ).toThrow("Invalid status transition");
  });

  it("applies defaults and rejects ratings above ten", () => {
    const parsed = AnimeEntryBase.parse({
      malId: 1,
      title: "Frieren",
    });

    expect(parsed.status).toBe("PLANNED");
    expect(parsed.completedDates).toEqual([]);
    expect(() =>
      AnimeEntryBase.parse({ malId: 1, title: "Frieren", rating: 11 }),
    ).toThrow();
  });
});
