# VoteSaathi 🗳️🇮🇳
### *Know your vote. Own your democracy.*

> A cinematic, interactive election assistant built for India's 970 million voters — guiding them through every step of the democratic process with clarity, confidence, and real data.

**[Live Demo →](https://votesaathi-5a72b.web.app)** · **[GitHub →](https://github.com/shagunpathak1508-create/VoteSaathi)**

---

## What is VoteSaathi?

VoteSaathi is a full-stack web application that helps Indian voters — both registered and first-time — understand and navigate the entire election process. Built for a prompt war competition, it answers the challenge: *"How do you make 970 million people feel confident about voting?"*

The answer: a mission-control-style interface, real 2024 Lok Sabha candidate data, step-by-step guidance, a bilingual experience, and a smart chat assistant — all in one place.

---

## Features

### 🗳️ For Registered Voters

**Election Timeline** — A cinematic, sequential power-on tracker showing the four stages of an Indian election: Announced → Voting Ongoing → Counting → Results. The active stage pulses with a neon glow animation.

**Voter Readiness Score** — An interactive checklist with 5 items and an SVG progress ring that fills with a neon glow as you check off items. Hit 5/5 and unlock a shareable "I'm ready to vote" card with a copy-to-clipboard button. State persists across devices via Firebase Firestore.

**Quick Actions** — Three centered overlay modals covering the most common voter queries:
- What to carry on voting day
- Step-by-step EVM voting instructions
- How to find your polling booth

**Election Results** — A live results card that updates based on the current election stage configured in `electionConfig.ts`.

### 🆕 For First-Time Voters

**4-Step Registration Journey** — A guided flow across four stages: Eligibility check → Form 6 registration → BLO verification → e-EPIC voter ID. Each step includes detailed instructions aligned with ECI guidelines.

**Progress Persistence** — Journey step saved to Firebase Firestore so users resume exactly where they left off across sessions and devices.

**Eligibility Quiz** — Age and citizenship check that routes users to the correct next step or shows an ineligible result card.

### 🖥️ EVM Practice Simulator

A fully interactive mock Electronic Voting Machine with 5 candidates + NOTA:
- Candidate selection with row highlight
- Web Audio API beep on vote confirmation
- CSS micro-interaction press animation on the VOTE button
- "Vote Recorded ✓" confirmation screen
- Reset to try again

### 📍 Find Your Constituency & Candidates

Users select their state and district to instantly see:
- Their Lok Sabha constituency name
- Real 2024 candidate data for 10 major constituencies (Mumbai North, Mumbai South, New Delhi, Pune, Chennai Central, Bengaluru South, Hyderabad, Kolkata North, Lucknow, Ahmedabad East)
- For each candidate: declared assets, criminal cases, education qualification, and winner status
- NOTA option always shown at the bottom
- Deep link to MyNeta for full official affidavit details
- For all other constituencies, a direct link to the MyNeta 2024 Lok Sabha page

> ⚠️ **Data note:** Candidate data for the 10 featured constituencies is based on publicly reported ADR/MyNeta 2024 Lok Sabha analysis and ECI results. Figures are approximate. Always verify exact details at [myneta.info](https://myneta.info/LokSabha2024/).

### 💬 Smart Chat Assistant

A floating briefing-panel style chat assistant with 25+ pre-programmed responses covering:
- Voter registration (Form 6, NVSP, eligibility, documents)
- Polling day (what to carry, EVM usage, NOTA, booth timing)
- Voter ID (EPIC card, e-EPIC download, lost card, name correction)
- BLO verification process and timeline
- NRI voting (Form 6A, overseas process)
- Complaints and ECI helpline (1950)

Includes quick-reply chips, 800ms typing simulation, and chat history persisted via Firebase.

### 🌐 Bilingual — English & Hindi

Full translation coverage across all pages, components, labels, and chat strings. Language preference persisted in Firebase. One-tap toggle in the navbar.

---

## Design: Digital India War Room

VoteSaathi's visual identity is inspired by mission control centers — dark, data-dense, and cinematic. Every interaction feels urgent and important, because voting is.

| Element | Detail |
|---|---|
| Background | Deep space black `#0A0A14` with circuit-grid overlay |
| Primary Accent | Saffron `#FF6B00` — active states, CTAs, winner badges |
| Secondary Accent | India Green `#138808` — success states, verified badges |
| Tertiary | Navy `#000080` — borders, secondary elements |
| Cards | Glassmorphism — `backdrop-blur`, `bg-white/10`, glow on hover |
| Headings | Rajdhani (condensed, bold) |
| Body | Inter (clean, readable) |
| Data readouts | Fira Code (monospace — stat chips, counts) |
| Landing | Particle canvas + letter-by-letter typing hero + classified dossier cards |
| Animations | Framer Motion — power-on timeline, stagger candidate cards, slide-up chat |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | React framework, static export |
| TypeScript | Type safety throughout |
| Tailwind CSS v3 | Utility-first styling |
| Framer Motion | Animations and transitions |
| Lucide React | Icon library |
| Firebase Firestore | Cross-device data persistence |
| Firebase Auth (Anonymous) | Persistent user identity without login |
| Firebase Hosting | Static site deployment |

---

## Project Structure

```
VoteSaathi/
├── app/
│   ├── evm-simulator/        # EVM practice page
│   ├── new-voter/            # First-time voter 4-step journey
│   ├── registered/           # Registered voter dashboard
│   ├── globals.css           # War Room theme + animations
│   ├── layout.tsx            # Root layout, fonts, metadata
│   └── page.tsx              # Landing page — particles + typing hero
├── components/
│   ├── new-voter/            # StepTracker, step components
│   ├── registered/           # Timeline, ReadinessScore, QuickActions,
│   │                         # FindConstituency, Results
│   └── shared/               # Navbar, ChatAssistant, Modal, ErrorCard
├── lib/
│   ├── constituencyData.ts   # State → District → Constituency mapping
│   ├── electionConfig.ts     # Current election stage configuration
│   ├── firebase.ts           # Firebase app initialisation
│   ├── firestoreHelpers.ts   # Read/write helpers for all user data
│   ├── formatters.ts         # Asset value formatter (₹ Cr / L)
│   ├── i18n.ts               # EN + HI translation strings
│   ├── LanguageContext.tsx   # Language provider
│   ├── types.ts              # Shared TypeScript interfaces
│   ├── useCandidateData.ts   # JSON fetch hook with module-level cache
│   └── useFirebaseUser.ts    # Anonymous auth hook
├── public/
│   └── data/
│       └── candidates2024.json  # 2024 Lok Sabha candidate data
├── firebase.json             # Firebase Hosting config
├── .firebaserc               # Firebase project link
└── next.config.mjs           # Static export config
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing — choose Registered Voter or First-Time Voter |
| `/registered` | Dashboard — timeline, readiness, quick actions, constituency finder, results |
| `/new-voter` | 4-step registration journey with progress persistence |
| `/evm-simulator` | Interactive EVM practice with audio feedback |

---

## Getting Started

**Prerequisites:** Node.js 18+, npm 9+, Firebase CLI

```bash
# Clone the repository
git clone https://github.com/shagunpathak1508-create/VoteSaathi.git
cd VoteSaathi

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Firebase config values

# Start development server
npm run dev
```

Open `http://localhost:3000`

**Environment Variables (.env.local):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## Deployment

```bash
# Build and deploy in one command
npm run deploy
```

Or separately:
```bash
npm run build
firebase deploy
```

---

## Data & Attribution

Candidate data for the 10 featured constituencies is sourced from publicly reported ADR/MyNeta analysis of the 2024 Lok Sabha election and ECI declared results. All voter guidance content follows official ECI guidelines.

**Attribution:**
- Candidate affidavit information: [MyNeta](https://myneta.info) by Association for Democratic Reforms (ADR)
- Official voter services: [Election Commission of India](https://voters.eci.gov.in)

---

## Future Roadmap

The candidate data feature is currently limited to 10 major constituencies with approximate figures. Here is what becomes possible with official data access:

**Full 543 constituency coverage** — ADR provides API access to media organisations upon request at info@adrindia.org. With API access, all constituencies can be covered with verified affidavit data including exact asset breakdowns, liabilities, and IPC section-wise criminal case details.

**Real-time data sync** — A Firebase Cloud Function that periodically fetches updated ADR data and refreshes the candidate JSON automatically before each election cycle, so no manual update is needed.

**State Assembly elections** — MyNeta covers all 28 state assemblies. The same constituency finder can be extended to show MLA candidates for Vidhan Sabha elections, making VoteSaathi relevant year-round and not just during Lok Sabha cycles.

**Historical wealth comparison** — ADR data goes back to 2004. A view showing how a candidate's declared assets changed across elections would be a powerful transparency feature unique to VoteSaathi.

**Live counting results** — ECI publishes live counting data at results.eci.gov.in during counting day. A Firebase Cloud Function polling this endpoint could power a real-time results dashboard inside the app.

**Multilingual expansion** — The current bilingual (EN/HI) system is built to scale. Adding Tamil, Telugu, Bengali, Marathi, and Kannada would make VoteSaathi accessible to the majority of India's electorate in their native language.

---

## Disclaimer

VoteSaathi is an independent informational assistant and is not an official government portal. Candidate data figures are approximate and based on publicly reported ADR analysis — always verify exact details at [myneta.info](https://myneta.info/LokSabha2024/). For official voter services visit [voters.eci.gov.in](https://voters.eci.gov.in) or call the ECI Helpline at **1950**.

---

## License

MIT License — open source and free to use.

---

*VoteSaathi — Know your vote. Own your democracy. 🇮🇳*
