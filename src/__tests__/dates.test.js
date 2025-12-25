import { describe, it, expect } from "vitest";
import { formatDateRange } from "../dates.js";


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


  