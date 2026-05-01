// lib/i18n.ts

export type Language = "en" | "hi";

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.voterDashboard": "Voter Dashboard",
    "nav.firstTimeVoter": "First-Time Voter",
    "nav.stepByStep": "Step-by-step registration guide",
    "nav.helpline": "Helpline:",
    "nav.evmSimulator": "EVM Simulator",
    "nav.evmSubtitle": "Practice casting your vote",

    // Landing page
    "landing.subtitle": "Your Election Companion · India",
    "landing.tagline": "Let's guide you through your election journey.",
    "landing.badge1": "ECI Aligned",
    "landing.badge2": "Beginner Friendly",
    "landing.badge3": "Free & Trusted",
    "landing.registeredTitle": "I am a",
    "landing.registeredHighlight": "Registered Voter",
    "landing.registeredDesc": "View the election timeline, find your polling booth, understand what to carry, and check results.",
    "landing.registeredFeature1": "Election status tracker",
    "landing.registeredFeature2": "Voting day guide",
    "landing.registeredFeature3": "Live results",
    "landing.openDashboard": "Open Dashboard",
    "landing.newVoterTitle": "I am a",
    "landing.newVoterHighlight": "New Voter",
    "landing.newVoterDesc": "First time voting? We'll walk you through eligibility, registration, verification, and getting your Voter ID.",
    "landing.newVoterFeature1": "Check eligibility",
    "landing.newVoterFeature2": "Step-by-step registration",
    "landing.newVoterFeature3": "Track your application",
    "landing.startJourney": "Start Journey",
    "landing.footer": "VoteSaathi – Your Election Companion. An informational assistant aligned with ECI guidelines. Not an official government portal.",

    // Registered dashboard
    "registered.welcome": "Welcome back,",
    "registered.voter": "Voter",
    "registered.subtitle": "Here's everything you need for the current election.",

    // Election Timeline
    "timeline.title": "Election Status",
    "timeline.live": "Live",
    "timeline.current": "Current",
    "timeline.currentStage": "Current Stage",
    "timeline.announced": "Announced",
    "timeline.votingOngoing": "Voting Ongoing",
    "timeline.counting": "Counting",
    "timeline.results": "Results Declared",

    // Guidance
    "guidance.label": "Your Guidance",

    // Quick Actions
    "quickActions.title": "Quick Actions",
    "quickActions.carry": "What to Carry",
    "quickActions.howToVote": "How to Vote",
    "quickActions.findBooth": "Find Polling Booth",
    "quickActions.evmPractice": "Practice on EVM",
    "quickActions.tapToLearn": "Tap to learn more",
    "quickActions.tapToPractice": "Tap to practice",

    // Results
    "results.title": "Election Results",
    "results.live": "Live",
    "results.counting": "Counting",
    "results.pending": "Pending",
    "results.liveTitle": "Results are Live!",
    "results.liveDesc": "All constituency results have been declared.",
    "results.checkECI": "Check Results on ECI Portal",
    "results.countingTitle": "Vote Counting in Progress",
    "results.countingDesc": "Results expected by",
    "results.followLive": "Follow Live Count on ECI",
    "results.notDeclared": "Results Not Declared Yet",
    "results.notDeclaredDesc": "Results will be announced after counting on",
    "results.countingDate": "Counting Date",
    "results.resultsExpected": "Results Expected",
    "results.emptyTitle": "Results will appear here",
    "results.emptyDesc": "Check back after counting begins.",

    // New Voter Journey
    "newVoter.title": "Your Voter",
    "newVoter.titleHighlight": "Registration",
    "newVoter.titleSuffix": "Journey",
    "newVoter.subtitle": "We'll guide you through every step — simply and clearly.",
    "newVoter.journeyTitle": "Your Registration Journey",
    "newVoter.stepOf": "of",
    "newVoter.progressSaved": "✓ Progress saved",
    "newVoter.resetJourney": "Reset journey & start over",
    "newVoter.nextStep": "Your next step:",
    "newVoter.journeyComplete": "🎉 Journey Complete!",
    "newVoter.allSet": "You're all set! Your Voter ID is on its way.",
    "newVoter.next": "Next",

    // Step names
    "step.eligibility": "Eligibility",
    "step.register": "Register",
    "step.verification": "Verification",
    "step.voterID": "Get Voter ID",
    "step.now": "Now",

    // Readiness Checklist
    "readiness.title": "Voter Readiness Score",
    "readiness.subtitle": "Track your election day preparation",
    "readiness.item1": "Voter ID / EPIC card ready",
    "readiness.item2": "Polling booth location confirmed",
    "readiness.item3": "Voting date and time noted",
    "readiness.item4": "Know your candidate / constituency",
    "readiness.item5": "Informed about NOTA option",
    "readiness.ready": "You're 100% ready to vote! 🎉",
    "readiness.shareText": "I'm ready to vote on {date}! 🗳️ #VoteSaathi",
    "readiness.copyCard": "Copy to Clipboard",
    "readiness.copied": "Copied!",
    "readiness.emptyTitle": "Start your preparation",
    "readiness.emptyDesc": "Check off items as you prepare for election day.",

    // Chat
    "chat.title": "VoteSaathi AI",
    "chat.online": "Online",
    "chat.placeholder": "Ask me anything…",
    "chat.welcomeRegistered": "👋 Hi! I'm VoteSaathi, your election companion. Ask me anything about voting, polling booths, or election results!",
    "chat.welcomeNewVoter": "👋 Hi! I'm here to guide you through voter registration. What would you like to know?",
    "chat.errorMessage": "Sorry, I couldn't connect right now. Please try again or call the ECI helpline at 1950.",
    "chat.emptyTitle": "Ask me anything!",
    "chat.emptyDesc": "I can help with voter registration, polling booths, EVMs, and more.",

    // EVM Simulator
    "evm.title": "EVM Practice Simulator",
    "evm.instruction": "Select a candidate, then press VOTE to cast your practice vote.",
    "evm.candidateLabel": "Candidate",
    "evm.voteButton": "VOTE",
    "evm.recorded": "✓ Vote Recorded",
    "evm.recordedDesc": "Your practice vote has been successfully recorded.",
    "evm.tryAgain": "Try Again",
    "evm.selectFirst": "Select a candidate first",
    "evm.nota": "NOTA",
    "evm.notaFull": "None of the Above",

    // Shared
    "shared.retry": "Retry",
    "shared.errorTitle": "Something went wrong",
    "shared.errorDesc": "Please try again. If the issue persists, call the ECI helpline at 1950.",
    "shared.loading": "Loading…",

    // Find Constituency
    "constituency.findConstituency": "Find Your Constituency",
    "constituency.selectState": "Select State",
    "constituency.selectDistrict": "Select District",
    "constituency.findButton": "Find",
    "constituency.yourConstituency": "Your Constituency",
    "constituency.viewCandidates": "View Candidates & Affidavits",
    "constituency.checkVoterList": "Check Voter List",
    "constituency.pollingBoothInfo": "Polling Booth Info",
    "constituency.officialSource": "Candidate data is sourced directly from the official ECI portal",
    "constituency.searchAgain": "Search again",
  },

  hi: {
    // Navigation
    "nav.voterDashboard": "मतदाता डैशबोर्ड",
    "nav.firstTimeVoter": "पहली बार मतदाता",
    "nav.stepByStep": "चरण-दर-चरण पंजीकरण गाइड",
    "nav.helpline": "हेल्पलाइन:",
    "nav.evmSimulator": "EVM सिम्युलेटर",
    "nav.evmSubtitle": "अपना वोट डालने का अभ्यास करें",

    // Landing page
    "landing.subtitle": "आपका चुनाव साथी · भारत",
    "landing.tagline": "आइए, आपकी चुनाव यात्रा में मार्गदर्शन करें।",
    "landing.badge1": "ECI अनुरूप",
    "landing.badge2": "शुरुआत के लिए आसान",
    "landing.badge3": "मुफ़्त और विश्वसनीय",
    "landing.registeredTitle": "मैं हूँ एक",
    "landing.registeredHighlight": "पंजीकृत मतदाता",
    "landing.registeredDesc": "चुनाव टाइमलाइन देखें, अपना मतदान केंद्र खोजें, क्या ले जाना है समझें, और परिणाम देखें।",
    "landing.registeredFeature1": "चुनाव स्थिति ट्रैकर",
    "landing.registeredFeature2": "मतदान दिवस गाइड",
    "landing.registeredFeature3": "लाइव परिणाम",
    "landing.openDashboard": "डैशबोर्ड खोलें",
    "landing.newVoterTitle": "मैं हूँ एक",
    "landing.newVoterHighlight": "नया मतदाता",
    "landing.newVoterDesc": "पहली बार मतदान? हम आपको पात्रता, पंजीकरण, सत्यापन और वोटर ID प्राप्त करने में मार्गदर्शन करेंगे।",
    "landing.newVoterFeature1": "पात्रता जांचें",
    "landing.newVoterFeature2": "चरण-दर-चरण पंजीकरण",
    "landing.newVoterFeature3": "अपने आवेदन को ट्रैक करें",
    "landing.startJourney": "यात्रा शुरू करें",
    "landing.footer": "VoteSaathi – आपका चुनाव साथी। ECI दिशानिर्देशों के अनुरूप एक सूचनात्मक सहायक। यह कोई आधिकारिक सरकारी पोर्टल नहीं है।",

    // Registered dashboard
    "registered.welcome": "वापसी पर स्वागत,",
    "registered.voter": "मतदाता",
    "registered.subtitle": "वर्तमान चुनाव के लिए आपकी सभी ज़रूरी जानकारी।",

    // Election Timeline
    "timeline.title": "चुनाव स्थिति",
    "timeline.live": "लाइव",
    "timeline.current": "वर्तमान",
    "timeline.currentStage": "वर्तमान चरण",
    "timeline.announced": "घोषित",
    "timeline.votingOngoing": "मतदान जारी",
    "timeline.counting": "मतगणना",
    "timeline.results": "परिणाम घोषित",

    // Guidance
    "guidance.label": "आपके लिए मार्गदर्शन",

    // Quick Actions
    "quickActions.title": "त्वरित कार्य",
    "quickActions.carry": "क्या ले जाएँ",
    "quickActions.howToVote": "वोट कैसे करें",
    "quickActions.findBooth": "मतदान केंद्र खोजें",
    "quickActions.evmPractice": "EVM पर अभ्यास करें",
    "quickActions.tapToLearn": "अधिक जानने के लिए टैप करें",
    "quickActions.tapToPractice": "अभ्यास के लिए टैप करें",

    // Results
    "results.title": "चुनाव परिणाम",
    "results.live": "लाइव",
    "results.counting": "मतगणना",
    "results.pending": "लंबित",
    "results.liveTitle": "परिणाम लाइव हैं!",
    "results.liveDesc": "सभी निर्वाचन क्षेत्रों के परिणाम घोषित हो चुके हैं।",
    "results.checkECI": "ECI पोर्टल पर परिणाम देखें",
    "results.countingTitle": "मतगणना जारी है",
    "results.countingDesc": "परिणाम अपेक्षित तिथि:",
    "results.followLive": "ECI पर लाइव गणना देखें",
    "results.notDeclared": "परिणाम अभी घोषित नहीं हुए",
    "results.notDeclaredDesc": "मतगणना के बाद परिणाम घोषित होंगे",
    "results.countingDate": "मतगणना तिथि",
    "results.resultsExpected": "परिणाम अपेक्षित",
    "results.emptyTitle": "परिणाम यहाँ दिखाई देंगे",
    "results.emptyDesc": "मतगणना शुरू होने के बाद वापस आएँ।",

    // New Voter Journey
    "newVoter.title": "आपकी मतदाता",
    "newVoter.titleHighlight": "पंजीकरण",
    "newVoter.titleSuffix": "यात्रा",
    "newVoter.subtitle": "हम हर चरण में आपका मार्गदर्शन करेंगे — सरल और स्पष्ट रूप से।",
    "newVoter.journeyTitle": "आपकी पंजीकरण यात्रा",
    "newVoter.stepOf": "का",
    "newVoter.progressSaved": "✓ प्रगति सहेजी गई",
    "newVoter.resetJourney": "यात्रा रीसेट करें और फिर से शुरू करें",
    "newVoter.nextStep": "आपका अगला कदम:",
    "newVoter.journeyComplete": "🎉 यात्रा पूरी!",
    "newVoter.allSet": "आप तैयार हैं! आपका मतदाता पहचान पत्र रास्ते में है।",
    "newVoter.next": "अगला",

    // Step names
    "step.eligibility": "पात्रता",
    "step.register": "पंजीकरण",
    "step.verification": "सत्यापन",
    "step.voterID": "वोटर ID प्राप्त करें",
    "step.now": "अभी",

    // Readiness Checklist
    "readiness.title": "मतदाता तत्परता स्कोर",
    "readiness.subtitle": "चुनाव दिवस की तैयारी ट्रैक करें",
    "readiness.item1": "वोटर ID / EPIC कार्ड तैयार",
    "readiness.item2": "मतदान केंद्र का स्थान पुष्टि",
    "readiness.item3": "मतदान की तारीख और समय नोट किया",
    "readiness.item4": "अपने उम्मीदवार / निर्वाचन क्षेत्र की जानकारी",
    "readiness.item5": "NOTA विकल्प की जानकारी",
    "readiness.ready": "आप 100% मतदान के लिए तैयार हैं! 🎉",
    "readiness.shareText": "मैं {date} को मतदान के लिए तैयार हूँ! 🗳️ #VoteSaathi",
    "readiness.copyCard": "क्लिपबोर्ड पर कॉपी करें",
    "readiness.copied": "कॉपी हो गया!",
    "readiness.emptyTitle": "अपनी तैयारी शुरू करें",
    "readiness.emptyDesc": "चुनाव दिवस की तैयारी करते हुए आइटम चेक करें।",

    // Chat
    "chat.title": "VoteSaathi AI",
    "chat.online": "ऑनलाइन",
    "chat.placeholder": "मुझसे कुछ भी पूछें…",
    "chat.welcomeRegistered": "👋 नमस्ते! मैं VoteSaathi हूँ, आपका चुनाव साथी। मतदान, मतदान केंद्र, या चुनाव परिणामों के बारे में कुछ भी पूछें!",
    "chat.welcomeNewVoter": "👋 नमस्ते! मैं आपको मतदाता पंजीकरण में मार्गदर्शन करने के लिए यहाँ हूँ। आप क्या जानना चाहेंगे?",
    "chat.errorMessage": "क्षमा करें, अभी कनेक्ट नहीं हो पा रहा। कृपया पुनः प्रयास करें या ECI हेल्पलाइन 1950 पर कॉल करें।",
    "chat.emptyTitle": "मुझसे कुछ भी पूछें!",
    "chat.emptyDesc": "मैं मतदाता पंजीकरण, मतदान केंद्र, EVM और अन्य विषयों में सहायता कर सकता हूँ।",

    // EVM Simulator
    "evm.title": "EVM अभ्यास सिम्युलेटर",
    "evm.instruction": "एक उम्मीदवार चुनें, फिर अभ्यास वोट डालने के लिए VOTE दबाएँ।",
    "evm.candidateLabel": "उम्मीदवार",
    "evm.voteButton": "वोट दें",
    "evm.recorded": "✓ वोट दर्ज हुआ",
    "evm.recordedDesc": "आपका अभ्यास वोट सफलतापूर्वक दर्ज हो गया है।",
    "evm.tryAgain": "फिर से प्रयास करें",
    "evm.selectFirst": "पहले एक उम्मीदवार चुनें",
    "evm.nota": "NOTA",
    "evm.notaFull": "इनमें से कोई नहीं",

    // Shared
    "shared.retry": "पुनः प्रयास",
    "shared.errorTitle": "कुछ गड़बड़ हो गई",
    "shared.errorDesc": "कृपया पुनः प्रयास करें। यदि समस्या बनी रहे, तो ECI हेल्पलाइन 1950 पर कॉल करें।",
    "shared.loading": "लोड हो रहा है…",

    // Find Constituency
    "constituency.findConstituency": "अपना निर्वाचन क्षेत्र खोजें",
    "constituency.selectState": "राज्य चुनें",
    "constituency.selectDistrict": "जिला चुनें",
    "constituency.findButton": "खोजें",
    "constituency.yourConstituency": "आपका निर्वाचन क्षेत्र",
    "constituency.viewCandidates": "उम्मीदवार और शपथपत्र देखें",
    "constituency.checkVoterList": "मतदाता सूची जांचें",
    "constituency.pollingBoothInfo": "मतदान केंद्र की जानकारी",
    "constituency.officialSource": "उम्मीदवार डेटा सीधे आधिकारिक ECI पोर्टल से लिया गया है",
    "constituency.searchAgain": "फिर से खोजें",
  },
};

export function t(key: string, lang: Language): string {
  return translations[lang]?.[key] || translations["en"]?.[key] || key;
}

export default translations;
