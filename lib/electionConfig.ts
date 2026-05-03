// lib/electionConfig.ts

/** The four possible stages of an election cycle. */
export type ElectionStage =
  | "announced"
  | "voting_ongoing"
  | "counting"
  | "results";

/** Current election state — dates, stage, and name for the active election. */
export const electionState = {
  currentStage: "voting_ongoing" as ElectionStage,
  votingDeadline: "May 15, 2026",
  resultsDate: "May 18, 2026",
  electionName: "Lok Sabha General Elections 2026",
  announcedDate: "April 1, 2026",
  countingDate: "May 16, 2026",
};

/** User-facing guidance messages for each election stage. */
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

/** Ordered list of timeline stages with their labels and emoji icons. */
export const stages = [
  { id: "announced", label: "Announced", icon: "📢" },
  { id: "voting_ongoing", label: "Voting Ongoing", icon: "🗳️" },
  { id: "counting", label: "Counting", icon: "📊" },
  { id: "results", label: "Results Declared", icon: "🏆" },
] as const;
