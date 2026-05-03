// lib/formatters.ts

/**
 * Converts a raw numeric string (e.g. "234567890") into a formatted Indian currency string.
 * "234567890" → "₹23.4 Cr"
 * "1234567"   → "₹12.3 L"
 * "0" or "Nil" → "Not Declared"
 * @param rawValue - Raw numeric string from affidavit data (may include commas)
 * @returns Formatted string like "₹23.4 Cr", "₹12.3 L", "₹1,23,456", or "Not Declared"
 */
export function formatAssets(rawValue: string): string {
  const num = parseInt(rawValue.replace(/,/g, ""));
  if (isNaN(num) || num === 0) return "Not Declared";
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
  return `₹${num.toLocaleString("en-IN")}`;
}
