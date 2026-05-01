// lib/chatResponses.ts
// Static keyword-matched response system — replaces Claude AI

export type ChatFlow = "registered" | "new_voter";

interface KeywordResponse {
  keywords: string[];
  response: string;
}

const responses: KeywordResponse[] = [
  // ─── Voter Registration ───────────────────────────────────────────
  {
    keywords: ["register", "registration", "how to register", "new voter", "enroll", "sign up"],
    response:
      "To register as a new voter in India:\n\n1. Visit https://voters.eci.gov.in or the NVSP portal\n2. Fill out Form 6 (for new voters)\n3. Upload documents: age proof + address proof + passport photo\n4. Submit online or at your nearest ERO/BLO office\n5. You'll receive an acknowledgement number to track your application\n\nYou must be an Indian citizen and at least 18 years old on the qualifying date (Jan 1 of the year).",
  },
  {
    keywords: ["form 6", "form-6", "form six"],
    response:
      "Form 6 is the application for new voter registration. Here's how to fill it:\n\n1. Go to https://voters.eci.gov.in → 'New Voter Registration'\n2. Fill personal details: name, DOB, address, family member info\n3. Upload: recent passport photo, age proof (Aadhaar/birth certificate), address proof\n4. Choose your Assembly & Parliamentary constituency\n5. Submit and note the reference number\n\nProcessing takes 15-30 days. Your BLO will visit for verification.",
  },
  {
    keywords: ["nvsp", "national voter", "voters portal", "voter portal"],
    response:
      "NVSP (National Voter Service Portal) is now at https://voters.eci.gov.in. You can:\n\n• Register as a new voter (Form 6)\n• Apply for corrections (Form 8)\n• Transfer registration (Form 6A for NRIs, Form 8A for shifting)\n• Download e-EPIC (digital voter ID)\n• Search your name in the electoral roll\n• Track your application status\n\nYou'll need an OTP-verified mobile number to use the portal.",
  },
  {
    keywords: ["eligible", "eligibility", "age", "qualify", "can i vote", "minimum age", "18 years"],
    response:
      "To be eligible to vote in India, you must:\n\n✅ Be an Indian citizen\n✅ Be at least 18 years old on January 1st of the qualifying year\n✅ Be a resident of the constituency where you want to vote\n✅ Not be disqualified under any law (unsound mind, corrupt practices, etc.)\n\nIf you turn 18 this year, you can register now and vote in the next election. Apply using Form 6 on https://voters.eci.gov.in.",
  },
  {
    keywords: ["document", "documents needed", "what documents", "proof", "id proof", "address proof"],
    response:
      "Documents required for voter registration:\n\n📋 Age Proof (any one):\n• Aadhaar Card\n• Birth Certificate\n• 10th/12th Marksheet\n• PAN Card\n• Passport\n\n📋 Address Proof (any one):\n• Aadhaar Card\n• Utility Bill (electricity/water/gas)\n• Bank Passbook\n• Ration Card\n• Rent Agreement\n\n📷 Passport-size Photo (recent, white background)\n\nAll documents should be clear scans/photos for online submission.",
  },

  // ─── Polling Day ──────────────────────────────────────────────────
  {
    keywords: ["what to carry", "carry on voting", "bring to booth", "polling day items", "voting day"],
    response:
      "On voting day, you MUST carry a valid photo ID. Accepted IDs:\n\n🪪 Voter ID (EPIC Card) — preferred\n🪪 Aadhaar Card\n🪪 Passport\n🪪 Driving License\n🪪 PAN Card\n🪪 Government Photo ID\n🪪 Bank Passbook with Photo\n\n⏰ Polling hours: 7:00 AM to 6:00 PM (may vary by state)\n\n💡 Tips:\n• Reach early to avoid queues\n• Check your polling booth in advance on the Voter Helpline app\n• Carry your voter slip if you received one",
  },
  {
    keywords: ["booth", "polling booth", "polling station", "where to vote", "find booth", "booth location"],
    response:
      "To find your polling booth:\n\n1. Visit https://voters.eci.gov.in → 'Know Your Polling Station'\n2. Or download the 'Voter Helpline' app from Play Store / App Store\n3. Enter your EPIC number or personal details\n4. Your booth name, address & map location will be shown\n\nYou can also call the ECI helpline at 1950 for assistance.\n\n💡 Pro tip: Visit your booth a day before to know the exact location and plan your route.",
  },
  {
    keywords: ["evm", "machine", "how to vote", "voting process", "voting steps", "electronic voting"],
    response:
      "Step-by-step EVM voting process:\n\n1️⃣ Go to your assigned polling booth with photo ID\n2️⃣ Get verified by the polling officer (ink mark on finger)\n3️⃣ Enter the voting compartment\n4️⃣ On the Ballot Unit — find your candidate's name & symbol\n5️⃣ Press the BLUE BUTTON next to your chosen candidate\n6️⃣ A beep sounds + a light glows = vote recorded\n7️⃣ Verify on the VVPAT slip (visible for 7 seconds)\n8️⃣ Exit the booth\n\n🔒 Your vote is 100% secret. No one can see whom you voted for.\n\nTry our EVM Simulator to practice!",
  },
  {
    keywords: ["nota", "none of the above", "reject all"],
    response:
      "NOTA (None Of The Above) is the last option on every EVM ballot unit.\n\n• It allows you to officially reject all candidates\n• Your vote is still counted and recorded\n• NOTA votes are announced in the results\n• However, even if NOTA gets the most votes, the candidate with the highest votes among contestants wins\n\nNOTA was introduced by the Supreme Court in 2013 to protect voter's right to reject.\n\nYou can practice pressing NOTA in our EVM Simulator!",
  },
  {
    keywords: ["timing", "time", "hours", "when does voting start", "polling hours", "booth timing"],
    response:
      "Polling booth timings:\n\n⏰ General timing: 7:00 AM to 6:00 PM\n\nNote: Timings may vary by state and region:\n• Some states start at 7 AM, others at 8 AM\n• In certain areas (like the Northeast), booths may close at 4 PM or 5 PM\n• Anyone standing in the queue at closing time WILL be allowed to vote\n\nCheck the exact timing for your constituency on the Voter Helpline app or at https://eci.gov.in.",
  },

  // ─── Voter ID / EPIC Card ────────────────────────────────────────
  {
    keywords: ["voter id", "epic", "epic card", "voter card", "voter identity"],
    response:
      "Your Voter ID (EPIC Card) is your primary election identity document.\n\n📇 It contains: your name, photo, EPIC number, address, and constituency\n\nTo get your Voter ID:\n1. Apply via Form 6 on https://voters.eci.gov.in\n2. After approval, collect the physical card from your ERO office\n3. Or download the e-EPIC (digital version) from the portal\n\nYour EPIC number format: ABC1234567 (3 letters + 7 digits)",
  },
  {
    keywords: ["e-epic", "eepic", "digital voter", "download voter id", "digital epic", "download epic"],
    response:
      "To download your e-EPIC (Digital Voter ID):\n\n1. Visit https://voters.eci.gov.in\n2. Click 'Download e-EPIC'\n3. Enter your EPIC number\n4. Verify with OTP on your registered mobile number\n5. Download the PDF — it has a QR code and is legally valid\n\n💡 You can also download it via the Voter Helpline mobile app.\n\nThe e-EPIC is accepted as valid photo ID at polling stations since 2021.",
  },
  {
    keywords: ["lost card", "lost voter id", "duplicate", "replacement", "damaged card"],
    response:
      "If your Voter ID card is lost or damaged:\n\n1. Visit https://voters.eci.gov.in\n2. Apply using Form 002 (for duplicate EPIC card)\n3. Upload a police complaint/FIR (for lost cards) or photo of the damaged card\n4. Submit with a recent passport photo\n5. You'll receive a new card in 15-30 days\n\n📱 Meanwhile, download your e-EPIC as a temporary solution — it's legally valid for voting.\n\nYou can also use Aadhaar or other government photo IDs on voting day.",
  },
  {
    keywords: ["name correction", "correct name", "change name", "wrong name", "update details", "form 8"],
    response:
      "To correct your name or details on Voter ID:\n\n1. Visit https://voters.eci.gov.in\n2. Apply using Form 8 (Correction of entries)\n3. Upload supporting documents for the correction:\n   • Name: Aadhaar/Passport with correct name\n   • Address: New address proof\n   • Photo: Recent passport photo\n4. Submit and track with the reference number\n\nProcessing takes 15-30 days. BLO may visit for verification.\n\nFor urgent help, contact the ECI helpline: 1950.",
  },

  // ─── BLO (Booth Level Officer) ────────────────────────────────────
  {
    keywords: ["blo", "booth level officer", "who is blo", "verification officer", "field verification"],
    response:
      "A BLO (Booth Level Officer) is a government official responsible for your polling area.\n\n👤 Their duties:\n• Verify new voter registration applications through home visits\n• Update the electoral roll (add/remove/correct entries)\n• Distribute voter slips before elections\n• Help voters locate their polling booth\n\n🔍 After you apply for voter registration, a BLO will visit your address within 15-30 days for verification.\n\nTo find your BLO: visit https://voters.eci.gov.in → 'Know Your BLO' or call 1950.",
  },
  {
    keywords: ["verification", "verification process", "how long verification", "blo visit", "verification timeline"],
    response:
      "Voter registration verification process:\n\n📋 Timeline:\n• BLO visit: within 15-30 days of application\n• The BLO will verify your identity and address\n• They may ask for original documents\n• After verification, your name is added to the electoral roll\n\n📋 What to expect:\n• The BLO will come to your registered address\n• Keep your original documents ready\n• You'll get an SMS/notification once approved\n\nTrack your application status on https://voters.eci.gov.in with your reference number.",
  },

  // ─── Election Results ─────────────────────────────────────────────
  {
    keywords: ["result", "results", "counting", "who won", "winner", "election result"],
    response:
      "Election results & counting process:\n\n📊 Counting Process:\n1. Counting begins at 8 AM on the result day\n2. Postal ballots are counted first\n3. Then EVM votes are counted round by round\n4. Each round = one EVM machine opened and counted\n5. Results are announced constituency by constituency\n\n📱 Where to check live results:\n• https://results.eci.gov.in (official ECI results page)\n• Voter Helpline app\n• Election Commission of India Twitter/X: @ECISVEEP\n\nResults are usually clear by evening on counting day.",
  },
  {
    keywords: ["live result", "check result", "where to check", "result website"],
    response:
      "Check live election results here:\n\n🌐 Official sources:\n• https://results.eci.gov.in — ECI official results page\n• https://eci.gov.in — Election Commission website\n• Voter Helpline App (Android & iOS)\n\n📱 Social media:\n• Twitter/X: @ECISVEEP\n• YouTube: ECI official channel\n\n📺 TV channels: All major news channels cover live counting\n\nResults are updated in real-time, round by round, starting from 8 AM on counting day.",
  },

  // ─── NRI Voters ───────────────────────────────────────────────────
  {
    keywords: ["nri", "overseas", "abroad", "form 6a", "foreign", "nri voter"],
    response:
      "NRI Voter Registration (Form 6A):\n\n✈️ Eligibility:\n• Indian citizen living abroad\n• Must have a valid Indian passport\n• Your name should not be in any electoral roll in India\n\n📝 How to register:\n1. Visit https://voters.eci.gov.in\n2. Fill Form 6A (specifically for overseas voters)\n3. Upload: Indian passport + proof of current overseas address\n4. Your constituency = where your passport address falls\n\n🗳️ Voting: Currently, NRI voters must be physically present at the polling booth in India to vote. The ECI is working on remote voting solutions.\n\nFor assistance: call 1950 or email nvsp@eci.gov.in.",
  },

  // ─── Complaints & Helpline ────────────────────────────────────────
  {
    keywords: ["complaint", "helpline", "1950", "grievance", "report", "issue"],
    response:
      "Election complaints & helpline:\n\n📞 ECI Helpline: 1950 (toll-free, available 24/7 during elections)\n\n🌐 Online complaint portals:\n• https://voters.eci.gov.in — voter services & grievances\n• cVIGIL app — report Model Code of Conduct violations with photos/videos\n• National Grievance Portal: https://ngsp.in\n\n📧 Email: complaints@eci.gov.in\n\nYou can report:\n• Booth-related issues\n• Missing name from voter list\n• Intimidation or malpractice\n• Accessibility issues at polling stations\n• Distribution of money/gifts by candidates",
  },
  {
    keywords: ["cvigil", "vigilance", "report violation", "code of conduct"],
    response:
      "cVIGIL is the ECI's mobile app to report election code of conduct violations:\n\n📱 How to use:\n1. Download cVIGIL from Play Store / App Store\n2. Open the app and allow location access\n3. Take a photo or video of the violation\n4. Add a brief description\n5. Submit — it goes directly to the Flying Squad\n\n⏱️ The ECI aims to respond to cVIGIL complaints within 100 minutes!\n\nUse it to report: illegal posters, bribery, unauthorized rallies, or any Model Code violation.",
  },

  // ─── VVPAT ────────────────────────────────────────────────────────
  {
    keywords: ["vvpat", "paper trail", "verification paper", "slip"],
    response:
      "VVPAT (Voter Verifiable Paper Audit Trail):\n\n📝 After you press the button on the EVM:\n1. A paper slip is printed inside the VVPAT machine\n2. It shows the candidate's name, serial number & symbol\n3. The slip is visible to you for 7 seconds through a glass window\n4. It then drops into a sealed box\n\n🔒 Purpose: Allows you to verify your vote was recorded correctly\n\n⚠️ If the slip doesn't match your choice, immediately alert the presiding officer. You may be allowed to file a challenge vote.",
  },

  // ─── Postal Ballot ────────────────────────────────────────────────
  {
    keywords: ["postal ballot", "postal vote", "vote by mail", "absentee"],
    response:
      "Postal Ballot voting in India:\n\n📬 Who can use postal ballots:\n• Armed forces personnel & their families\n• Government employees on election duty\n• Voters above 85 years of age\n• Persons with disabilities (40%+)\n• COVID-19 positive voters (during pandemic elections)\n• Essential service workers on duty\n\n📝 How it works:\n1. Apply through Form 12 to your Returning Officer\n2. Receive the ballot paper by post\n3. Mark your vote and send it back in the sealed envelope\n4. It must reach the RO before counting day\n\nPostal ballots are counted FIRST on result day.",
  },

  // ─── Voter Slip ───────────────────────────────────────────────────
  {
    keywords: ["voter slip", "poll slip", "slip from blo"],
    response:
      "Voter Slip is a document distributed by your BLO before elections:\n\n📄 It contains:\n• Your name and EPIC number\n• Your polling booth name & address\n• Your serial number in the voter list\n• Polling date and time\n\n💡 Important:\n• The voter slip alone is NOT a valid ID for voting\n• You still need a photo ID (Voter ID, Aadhaar, etc.)\n• But carrying it helps speed up the verification process at the booth\n• If you didn't receive one, don't worry — you can still vote with a valid photo ID",
  },

  // ─── Shifting / Transfer ──────────────────────────────────────────
  {
    keywords: ["shift", "transfer", "moved", "change address", "new address", "relocat"],
    response:
      "If you've moved to a new address:\n\n📋 Within the same constituency:\n• Apply using Form 8A on https://voters.eci.gov.in\n• Upload new address proof\n• Your EPIC number stays the same\n\n📋 To a different constituency:\n• Apply using Form 6 (fresh registration) at your new address\n• Your old registration will be deleted after verification\n\n📋 Required documents:\n• New address proof (Aadhaar, utility bill, rent agreement)\n• Your existing EPIC number\n\nProcessing: 15-30 days. BLO will visit for address verification.",
  },

  // ─── Model Code of Conduct ────────────────────────────────────────
  {
    keywords: ["model code", "code of conduct", "mcc", "rules for parties", "election rules"],
    response:
      "Model Code of Conduct (MCC) — Rules during elections:\n\n📜 Key rules for parties & candidates:\n• No new government schemes can be announced\n• No use of official machinery for campaigning\n• No appeal to caste or religion for votes\n• Campaign must stop 48 hours before polling\n• No distribution of money, liquor, or gifts\n• No hate speech or personal attacks\n\n📅 MCC comes into effect from the date elections are announced until results are declared.\n\n🔍 Report violations using the cVIGIL app or call 1950.",
  },

  // ─── Aadhaar-Voter ID Linking ─────────────────────────────────────
  {
    keywords: ["aadhaar link", "link aadhaar", "aadhaar voter", "form 6b"],
    response:
      "Aadhaar-Voter ID Linking (Form 6B):\n\n🔗 The ECI encourages linking your Aadhaar with your Voter ID to:\n• Prevent duplicate entries in the voter list\n• Improve accuracy of the electoral roll\n\n📝 How to link:\n1. Visit https://voters.eci.gov.in → 'Aadhaar-EPIC Linking'\n2. Enter your EPIC number and Aadhaar number\n3. Verify with OTP\n4. Submit\n\n⚠️ This is voluntary, not mandatory. Your voter registration will NOT be cancelled if you don't link.\n\nFor help: call 1950 or visit your nearest voter facilitation center.",
  },
];

const FALLBACK_RESPONSE =
  "I'm not sure about that specific question. For accurate and up-to-date information, please:\n\n📞 Call the ECI Helpline: 1950 (toll-free)\n🌐 Visit: https://voters.eci.gov.in\n📱 Download the Voter Helpline app\n\nYou can also try asking me about voter registration, polling day procedures, voter ID, election results, or NRI voting!";

/**
 * Static keyword-matched response system.
 * Matches user input against 25+ predefined responses covering all election topics.
 * Returns the fallback response with ECI helpline 1950 if no match is found.
 */
export function getResponse(input: string): string {
  const lowerInput = input.toLowerCase().trim();

  // Score each response based on keyword matches
  let bestMatch: KeywordResponse | null = null;
  let bestScore = 0;

  for (const entry of responses) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lowerInput.includes(keyword.toLowerCase())) {
        // Longer keyword matches get higher scores for better precision
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response;
  }

  return FALLBACK_RESPONSE;
}
