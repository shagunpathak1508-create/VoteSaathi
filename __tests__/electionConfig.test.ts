import { electionState } from "@/lib/electionConfig";

describe("electionConfig", () => {
  it("has currentStage field", () => {
    expect(electionState).toHaveProperty("currentStage");
    expect(typeof electionState.currentStage).toBe("string");
  });

  it("has votingDeadline field", () => {
    expect(electionState).toHaveProperty("votingDeadline");
    expect(typeof electionState.votingDeadline).toBe("string");
  });

  it("has resultsDate field", () => {
    expect(electionState).toHaveProperty("resultsDate");
    expect(typeof electionState.resultsDate).toBe("string");
  });

  it("currentStage is a valid stage", () => {
    const validStages = ["announced", "voting_ongoing", "counting", "results"];
    expect(validStages).toContain(electionState.currentStage);
  });

  it("has electionName field", () => {
    expect(electionState).toHaveProperty("electionName");
    expect(electionState.electionName.length).toBeGreaterThan(0);
  });
});
