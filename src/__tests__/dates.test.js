import { describe, it, expect } from "vitest";
import { format } from "date-fns";
import { formatDateRange, getDateInfo, getDateInterval } from "../dates.js";





// Q-a
describe("formatDateRange", () => {
    it("formats date range using shortDate", () => {
      const result = formatDateRange(
        "2025-01-01",
        "2025-01-25",
        "shortDate"
      );
  
      expect(result).toBe("01/01/25 - 25/01/25");
    });
  });

  
// Q-b
describe("getDateInfo", () => {
  it("returns basic fields (year, month, day)", () => {
    const info = getDateInfo("2025-01-02T10:20:30Z");
    expect(info.year).toBe(2025);
    expect(info.month).toBe(1);
    expect(info.day).toBe(2);
  });
});


// Q-c
describe("getDateInterval", () => {
  it("returns weekly interval including end date", () => {
    const result = getDateInterval("2025-01-01", "2025-01-25", "week");
    const formatted = result.map((d) => format(d, "dd/MM/yyyy"));

    expect(formatted).toEqual([
      "01/01/2025",
      "08/01/2025",
      "15/01/2025",
      "22/01/2025",
      "25/01/2025",
    ]);
  });
});