import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock all dependencies
jest.mock("@/lib/LanguageContext", () => ({
  useLanguage: () => ({
    lang: "en",
    t: (key: string) => {
      const map: Record<string, string> = {
        "constituency.findConstituency": "Find Your Constituency & Candidates",
        "constituency.findSubtitle": "Select your area",
        "constituency.selectState": "Select State",
        "constituency.selectDistrict": "Select District",
        "constituency.findButton": "Find",
      };
      return map[key] ?? key;
    },
  }),
}));

jest.mock("@/lib/useFirebaseUser", () => ({
  useFirebaseUser: () => ({ uid: null }),
}));

jest.mock("@/lib/firestoreHelpers", () => ({
  saveConstituency: jest.fn(),
  loadConstituency: jest.fn().mockResolvedValue(null),
}));

jest.mock("@/lib/useCandidateData", () => ({
  useCandidateData: () => ({ data: {}, loading: false, error: false }),
}));

jest.mock("@/lib/firebase", () => ({
  logEvent: jest.fn(),
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) =>
      React.createElement("div", { "data-testid": "motion-div", ...props }, children),
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) =>
      React.createElement("button", props, children),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => React.createElement(React.Fragment, null, children),
}));

import FindConstituency from "@/components/registered/FindConstituency";

describe("FindConstituency", () => {
  it("renders the component title", () => {
    render(<FindConstituency />);
    expect(screen.getByText("Find Your Constituency & Candidates")).toBeInTheDocument();
  });

  it("renders the state dropdown", () => {
    render(<FindConstituency />);
    const stateSelect = screen.getByRole("combobox", { name: /select state/i });
    expect(stateSelect).toBeInTheDocument();
  });

  it("renders the district dropdown as disabled initially", () => {
    render(<FindConstituency />);
    const districtSelect = screen.getByRole("combobox", { name: /select district/i });
    expect(districtSelect).toBeDisabled();
  });

  it("renders the Find button", () => {
    render(<FindConstituency />);
    expect(screen.getByText("Find")).toBeInTheDocument();
  });

  it("Find button is disabled when no state is selected", () => {
    render(<FindConstituency />);
    const findBtn = screen.getByText("Find").closest("button");
    expect(findBtn).toBeDisabled();
  });
});
