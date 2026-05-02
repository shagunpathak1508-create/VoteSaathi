// lib/types.ts

export interface Candidate {
  name: string;
  party: string;
  partyFull: string;
  criminalCases: number;
  totalAssets: string;
  totalLiabilities: string;
  education: string;
  winner: boolean;
}

export interface ConstituencyData {
  constituencyName: string;
  state: string;
  mynetaUrl: string;
  candidates: Candidate[];
}
