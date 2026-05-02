import { formatAssets } from "@/lib/formatters";

describe("formatAssets", () => {
  it("returns 'Not Declared' for zero", () => {
    expect(formatAssets("0")).toBe("Not Declared");
  });

  it("returns 'Not Declared' for Nil", () => {
    expect(formatAssets("Nil")).toBe("Not Declared");
  });

  it("formats values in lakhs", () => {
    expect(formatAssets("1234567")).toBe("₹12.3 L");
  });

  it("formats values in crores", () => {
    expect(formatAssets("234567890")).toBe("₹23.5 Cr");
  });

  it("formats large numbers in crores", () => {
    expect(formatAssets("5500000000")).toBe("₹550.0 Cr");
  });

  it("handles comma-separated strings", () => {
    expect(formatAssets("23,45,67,890")).toBe("₹23.5 Cr");
  });
});
