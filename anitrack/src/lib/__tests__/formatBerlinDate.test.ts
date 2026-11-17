import { describe, expect, it } from "vitest";
import { formatWeekdayBerlin } from "../formatBerlinDate";

describe("formatWeekdayBerlin", () => {
  it("formats the supplied calendar date in Berlin time", () => {
    expect(formatWeekdayBerlin("2026-11-17", "en")).toBe("Tue");
    expect(formatWeekdayBerlin("2026-11-17", "zh")).toContain("周二");
  });

  it("falls back to the original value for malformed input", () => {
    expect(formatWeekdayBerlin("not-a-date", "en")).toBe("not-a-date");
  });
});
