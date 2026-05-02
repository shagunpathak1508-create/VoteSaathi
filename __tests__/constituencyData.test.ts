import { stateDistrictMap } from "@/lib/constituencyData";

describe("constituencyData", () => {
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
  ];

  const uts = [
    "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
  ];

  it("contains all 28 states", () => {
    for (const state of states) {
      expect(stateDistrictMap).toHaveProperty(state);
    }
  });

  it("contains all 8 union territories", () => {
    for (const ut of uts) {
      expect(stateDistrictMap).toHaveProperty(ut);
    }
  });

  it("has exactly 36 entries (28 states + 8 UTs)", () => {
    expect(Object.keys(stateDistrictMap)).toHaveLength(36);
  });

  it("has no empty district arrays", () => {
    for (const [key, districts] of Object.entries(stateDistrictMap)) {
      expect(districts.length).toBeGreaterThan(0);
    }
  });

  it("all district values are non-empty strings", () => {
    for (const [, districts] of Object.entries(stateDistrictMap)) {
      for (const d of districts) {
        expect(typeof d).toBe("string");
        expect(d.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
