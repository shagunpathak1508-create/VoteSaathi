# 🗳️ VoteSaathi — Your Election Companion

**VoteSaathi** is an intelligent, bilingual (English & Hindi) election assistant for Indian voters. Built with a futuristic "Digital India War Room" design, it guides both registered and first-time voters through every step of the election process.

## ✨ Features

- **Smart Chat Assistant** — Instant answers to 25+ election queries (voter registration, polling day, voter ID, BLO, results, NRI voting, complaints & more)
- **EVM Simulator** — Practice voting on a realistic Electronic Voting Machine with sound and animations
- **Voter Readiness Checklist** — Track your election-day preparation with cloud-synced progress
- **New Voter Journey** — Step-by-step guidance from eligibility check to getting your voter ID
- **Election Timeline** — Live status of upcoming elections
- **Bilingual Support** — Full English & Hindi interface with persistent language preference
- **Cloud Persistence** — All user data (checklist, journey progress, language, chat history) synced via Firebase Firestore
- **Anonymous Auth** — No login required; every visitor gets a persistent anonymous identity

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (Static Export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS (Glassmorphism, War Room theme)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Firebase (Firestore + Anonymous Auth)
- **Hosting:** Firebase Hosting
- **Fonts:** Inter, Rajdhani, Fira Code

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project (see Firebase Setup below)

### Installation

```bash
git clone <your-repo-url>
cd VoteSaathi
npm install
```

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Firestore Database** (Start in test mode)
4. Enable **Authentication** → Sign-in method → **Anonymous** (toggle ON)
5. Go to Project Settings → Your apps → Add a Web app
6. Copy the config values into `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Deploy

```bash
# Build static export
npm run build

# Deploy to Firebase Hosting
firebase deploy

# Or do both in one command
npm run deploy
```

## 📁 Project Structure

```
VoteSaathi/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Global styles & War Room theme
│   ├── registered/           # Registered voter dashboard
│   ├── new-voter/            # New voter journey
│   └── evm-simulator/        # EVM practice simulator
├── components/
│   ├── shared/               # ChatAssistant, Navbar, Modal, etc.
│   ├── registered/           # VoterReadiness, QuickActions, etc.
│   └── new-voter/            # Step components & trackers
├── lib/
│   ├── firebase.ts           # Firebase initialization
│   ├── useFirebaseUser.ts    # Anonymous auth hook
│   ├── firestoreHelpers.ts   # Firestore CRUD functions
│   ├── chatResponses.ts      # 25+ keyword-matched responses
│   ├── LanguageContext.tsx    # Bilingual context provider
│   ├── i18n.ts               # Translation strings
│   └── electionConfig.ts     # Election date configuration
├── firebase.json             # Firebase Hosting config
├── .firebaserc               # Firebase project alias
└── .env.local                # Firebase credentials (not committed)
```

## 🔥 Firestore Data Model

```
users/{uid}
├── readiness: { item1: bool, item2: bool, ... }
├── journeyStep: number
├── language: 'en' | 'hi'
├── chatHistory: ChatMessage[]
└── lastSeen: timestamp
```

## 📞 Help & Support

- **ECI Helpline:** 1950 (toll-free)
- **Voter Portal:** https://voters.eci.gov.in
- **Voter Helpline App:** Available on Play Store & App Store

## 📄 License

This project is for educational and civic engagement purposes.
