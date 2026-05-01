// lib/candidateData.ts

export interface Candidate {
  name: string;
  party: string;
  partyShort: string;
  partyColor: string;
  symbol: string;
  incumbent: boolean;
}

export interface ConstituencyData {
  constituencyName: string;
  state: string;
  district: string;
  totalVoters: string;
  candidates: Candidate[];
}

export const candidateDatabase: Record<string, ConstituencyData> = {
  "Mumbai North": {
    constituencyName: "Mumbai North",
    state: "Maharashtra",
    district: "Mumbai",
    totalVoters: "18,94,342",
    candidates: [
      { name: "Piyush Goyal", party: "Bharatiya Janata Party", partyShort: "BJP", partyColor: "#FF6B00", symbol: "\u{1FAB7}", incumbent: true },
      { name: "Bhausaheb Nawale", party: "Indian National Congress", partyShort: "INC", partyColor: "#138808", symbol: "\u270B", incumbent: false },
      { name: "Vinod Shelar", party: "Shiv Sena (UBT)", partyShort: "SS-UBT", partyColor: "#FF4500", symbol: "\uD83D\uDD25", incumbent: false },
      { name: "Rajesh Patil", party: "Aam Aadmi Party", partyShort: "AAP", partyColor: "#0066FF", symbol: "\uD83E\uDDF9", incumbent: false },
      { name: "Independent Candidate", party: "Independent", partyShort: "IND", partyColor: "#888888", symbol: "\u2696\uFE0F", incumbent: false },
    ],
  },
  "Mumbai South": {
    constituencyName: "Mumbai South",
    state: "Maharashtra",
    district: "Mumbai",
    totalVoters: "17,23,891",
    candidates: [
      { name: "Arvind Sawant", party: "Shiv Sena (UBT)", partyShort: "SS-UBT", partyColor: "#FF4500", symbol: "\uD83D\uDD25", incumbent: true },
      { name: "Rahul Shewale", party: "Shiv Sena", partyShort: "SHS", partyColor: "#FF6B00", symbol: "\u{1FAB7}", incumbent: false },
      { name: "Milind Deora", party: "Indian National Congress", partyShort: "INC", partyColor: "#138808", symbol: "\u270B", incumbent: false },
      { name: "Bala Nandgaonkar", party: "Maharashtra Navnirman Sena", partyShort: "MNS", partyColor: "#CC0000", symbol: "\uD83D\uDEE4\uFE0F", incumbent: false },
    ],
  },
  "Mumbai North Central": {
    constituencyName: "Mumbai North Central",
    state: "Maharashtra",
    district: "Mumbai",
    totalVoters: "16,85,120",
    candidates: [
      { name: "Ujjwal Nikam", party: "Bharatiya Janata Party", partyShort: "BJP", partyColor: "#FF6B00", symbol: "\u{1FAB7}", incumbent: false },
      { name: "Varsha Gaikwad", party: "Indian National Congress", partyShort: "INC", partyColor: "#138808", symbol: "\u270B", incumbent: false },
      { name: "Sachin Sawant", party: "Shiv Sena (UBT)", partyShort: "SS-UBT", partyColor: "#FF4500", symbol: "\uD83D\uDD25", incumbent: false },
    ],
  },
  "New Delhi": {
    constituencyName: "New Delhi",
    state: "Delhi",
    district: "New Delhi",
    totalVoters: "15,64,278",
    candidates: [
      { name: "Bansuri Swaraj", party: "Bharatiya Janata Party", partyShort: "BJP", partyColor: "#FF6B00", symbol: "\u{1FAB7}", incumbent: true },
      { name: "Somnath Bharti", party: "Aam Aadmi Party", partyShort: "AAP", partyColor: "#0066FF", symbol: "\uD83E\uDDF9", incumbent: false },
      { name: "Ajay Maken", party: "Indian National Congress", partyShort: "INC", partyColor: "#138808", symbol: "\u270B", incumbent: false },
      { name: "Shreyas Sinha", party: "Bahujan Samaj Party", partyShort: "BSP", partyColor: "#0000CC", symbol: "\uD83D\uDC18", incumbent: false },
    ],
  },
  "Pune": {
    constituencyName: "Pune",
    state: "Maharashtra",
    district: "Pune",
    totalVoters: "21,37,559",
    candidates: [
      { name: "Murlidhar Mohol", party: "Bharatiya Janata Party", partyShort: "BJP", partyColor: "#FF6B00", symbol: "\u{1FAB7}", incumbent: true },
      { name: "Ravindra Dhangekar", party: "Indian National Congress", partyShort: "INC", partyColor: "#138808", symbol: "\u270B", incumbent: false },
      { name: "Vasant More", party: "Nationalist Congress Party", partyShort: "NCP", partyColor: "#00AAFF", symbol: "\u23F0", incumbent: false },
      { name: "Siddharth Shirole", party: "Independent", partyShort: "IND", partyColor: "#888888", symbol: "\u2696\uFE0F", incumbent: false },
    ],
  },
  "Chennai Central": {
    constituencyName: "Chennai Central",
    state: "Tamil Nadu",
    district: "Chennai",
    totalVoters: "14,82,113",
    candidates: [
      { name: "Dayanidhi Maran", party: "Dravida Munnetra Kazhagam", partyShort: "DMK", partyColor: "#CC0000", symbol: "\uD83C\uDF05", incumbent: true },
      { name: "Vinoj P. Selvam", party: "All India Anna DMK", partyShort: "AIADMK", partyColor: "#008000", symbol: "\uD83C\uDF3F", incumbent: false },
      { name: "K. Subbarayan", party: "Communist Party of India", partyShort: "CPI", partyColor: "#FF0000", symbol: "\u2692\uFE0F", incumbent: false },
      { name: "A. Saravanan", party: "Bharatiya Janata Party", partyShort: "BJP", partyColor: "#FF6B00", symbol: "\u{1FAB7}", incumbent: false },
    ],
  },
  "Bengaluru South": {
    constituencyName: "Bengaluru South",
    state: "Karnataka",
    district: "Bengaluru",
    totalVoters: "19,45,672",
    candidates: [
      { name: "Tejasvi Surya", party: "Bharatiya Janata Party", partyShort: "BJP", partyColor: "#FF6B00", symbol: "\u{1FAB7}", incumbent: true },
      { name: "Sowmya Reddy", party: "Indian National Congress", partyShort: "INC", partyColor: "#138808", symbol: "\u270B", incumbent: false },
      { name: "Namma Rajkumar", party: "Janata Dal (Secular)", partyShort: "JD(S)", partyColor: "#006400", symbol: "\uD83C\uDF3E", incumbent: false },
      { name: "Priya Krishnamurthy", party: "Aam Aadmi Party", partyShort: "AAP", partyColor: "#0066FF", symbol: "\uD83E\uDDF9", incumbent: false },
    ],
  },
  "Hyderabad": {
    constituencyName: "Hyderabad",
    state: "Telangana",
    district: "Hyderabad",
    totalVoters: "17,28,394",
    candidates: [
      { name: "Asaduddin Owaisi", party: "All India Majlis-E-Ittehadul Muslimeen", partyShort: "AIMIM", partyColor: "#006400", symbol: "\uD83C\uDF19", incumbent: true },
      { name: "Madhavi Latha", party: "Bharatiya Janata Party", partyShort: "BJP", partyColor: "#FF6B00", symbol: "\u{1FAB7}", incumbent: false },
      { name: "Feroz Khan", party: "Indian National Congress", partyShort: "INC", partyColor: "#138808", symbol: "\u270B", incumbent: false },
      { name: "Suresh Kumar", party: "Bharat Rashtra Samithi", partyShort: "BRS", partyColor: "#FF69B4", symbol: "\uD83D\uDE97", incumbent: false },
    ],
  },
  "Kolkata North": {
    constituencyName: "Kolkata North",
    state: "West Bengal",
    district: "Kolkata",
    totalVoters: "16,93,847",
    candidates: [
      { name: "Sudip Bandyopadhyay", party: "All India Trinamool Congress", partyShort: "TMC", partyColor: "#00AAFF", symbol: "\uD83C\uDF38", incumbent: true },
      { name: "Tapas Roy", party: "Bharatiya Janata Party", partyShort: "BJP", partyColor: "#FF6B00", symbol: "\u{1FAB7}", incumbent: false },
      { name: "Santosh Pathak", party: "Indian National Congress", partyShort: "INC", partyColor: "#138808", symbol: "\u270B", incumbent: false },
      { name: "Palash Das", party: "Communist Party of India (Marxist)", partyShort: "CPI(M)", partyColor: "#CC0000", symbol: "\u2692\uFE0F", incumbent: false },
    ],
  },
  "Ahmedabad East": {
    constituencyName: "Ahmedabad East",
    state: "Gujarat",
    district: "Ahmedabad",
    totalVoters: "20,14,563",
    candidates: [
      { name: "Hasmukhbhai Patel", party: "Bharatiya Janata Party", partyShort: "BJP", partyColor: "#FF6B00", symbol: "\u{1FAB7}", incumbent: true },
      { name: "Himmatsinh Patel", party: "Indian National Congress", partyShort: "INC", partyColor: "#138808", symbol: "\u270B", incumbent: false },
      { name: "Amit Shah Jr.", party: "Aam Aadmi Party", partyShort: "AAP", partyColor: "#0066FF", symbol: "\uD83E\uDDF9", incumbent: false },
      { name: "Dinesh Makwana", party: "Bahujan Samaj Party", partyShort: "BSP", partyColor: "#0000CC", symbol: "\uD83D\uDC18", incumbent: false },
    ],
  },
  "Lucknow": {
    constituencyName: "Lucknow",
    state: "Uttar Pradesh",
    district: "Lucknow",
    totalVoters: "18,76,234",
    candidates: [
      { name: "Rajnath Singh", party: "Bharatiya Janata Party", partyShort: "BJP", partyColor: "#FF6B00", symbol: "\u{1FAB7}", incumbent: true },
      { name: "Ravidas Mehrotra", party: "Samajwadi Party", partyShort: "SP", partyColor: "#FF0000", symbol: "\uD83D\uDEB2", incumbent: false },
      { name: "Nakul Dubey", party: "Indian National Congress", partyShort: "INC", partyColor: "#138808", symbol: "\u270B", incumbent: false },
      { name: "Satyadev Tripathi", party: "Bahujan Samaj Party", partyShort: "BSP", partyColor: "#0000CC", symbol: "\uD83D\uDC18", incumbent: false },
    ],
  },
};

// Districts that have candidate data available
export const districtsWithCandidateData = new Set([
  "Mumbai", "New Delhi", "Pune", "Chennai",
  "Bengaluru", "Hyderabad", "Kolkata", "Ahmedabad", "Lucknow",
]);

/** Look up candidate data from a constituency string (may be slash-separated). */
export function findCandidateData(constituencyString: string): ConstituencyData | null {
  if (candidateDatabase[constituencyString]) return candidateDatabase[constituencyString];
  const parts = constituencyString.split(" / ").map((s) => s.trim());
  for (const part of parts) {
    if (candidateDatabase[part]) return candidateDatabase[part];
  }
  return null;
}
