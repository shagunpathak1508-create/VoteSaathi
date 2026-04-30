// lib/electionConfig.ts
export type ElectionStage =
  | "announced"
  | "voting_ongoing"
  | "counting"
  | "results";

export const electionState = {
  currentStage: "voting_ongoing" as ElectionStage,
  votingDeadline: "May 15, 2026",
  resultsDate: "May 18, 2026",
  electionName: "Lok Sabha General Elections 2026",
  announcedDate: "April 1, 2026",
  countingDate: "May 16, 2026",
};

export const stageMessages: Record<ElectionStage, string> = {
  announced:
    "Elections have been announced! Start preparing — check your voter ID and find your polling booth.",
  voting_ongoing:
    "Voting is ongoing. Visit your polling booth before the deadline on " +
    electionState.votingDeadline +
    ".",
  counting:
    "Votes are being counted. Results are expected on " +
    electionState.resultsDate +
    ".",
  results:
    "Results have been declared! Check below to see the outcome of your constituency.",
};

export const stages = [
  { id: "announced", label: "Announced", icon: "📢" },
  { id: "voting_ongoing", label: "Voting Ongoing", icon: "🗳️" },
  { id: "counting", label: "Counting", icon: "📊" },
  { id: "results", label: "Results Declared", icon: "🏆" },
] as const;
