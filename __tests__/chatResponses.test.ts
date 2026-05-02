import { getResponse } from "@/lib/chatResponses";

describe("getResponse", () => {
  it("returns registration info for 'register'", () => {
    const response = getResponse("How do I register as a voter?");
    expect(response).toContain("Form 6");
  });

  it("returns polling booth info for 'booth'", () => {
    const response = getResponse("Where is my polling booth?");
    expect(response).toContain("polling booth");
  });

  it("returns EVM info for 'evm'", () => {
    const response = getResponse("How does the EVM work?");
    expect(response).toContain("EVM");
  });

  it("returns NOTA info for 'nota'", () => {
    const response = getResponse("What is NOTA?");
    expect(response).toContain("NOTA");
  });

  it("returns voter ID info for 'voter id'", () => {
    const response = getResponse("How to get voter id?");
    expect(response).toContain("EPIC");
  });

  it("returns eligibility info for 'eligible'", () => {
    const response = getResponse("Am I eligible to vote?");
    expect(response).toContain("18 years");
  });

  it("returns NRI info for 'nri'", () => {
    const response = getResponse("Can NRI voters participate?");
    expect(response).toContain("Form 6A");
  });

  it("returns helpline for 'complaint'", () => {
    const response = getResponse("I want to file a complaint");
    expect(response).toContain("1950");
  });

  it("is case insensitive", () => {
    const response = getResponse("REGISTER NEW VOTER");
    expect(response).toContain("Form 6");
  });

  it("returns fallback for unknown query", () => {
    const response = getResponse("xyzzy nonsense qwerty");
    expect(response).toContain("1950");
    expect(response).toContain("not sure");
  });
});
