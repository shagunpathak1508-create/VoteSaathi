<p align="center">
  <img src="https://img.shields.io/badge/🗳️-VoteSaathi-FF6B00?style=for-the-badge&labelColor=0A0A14" alt="VoteSaathi" />
</p>

<h1 align="center">VoteSaathi – Your Election Companion</h1>

<p align="center">
  <strong"Built entirely with AI prompts — a cinematic election assistant for 970 million Indian voters."</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-FF0055?style=flat-square&logo=framer&logoColor=white" />
</p>

---

## ✨ Features

### 🗳️ For Registered Voters
- **Election Timeline** — Live status tracker with power-on sequential animation
- **Voter Readiness Score** — Interactive checklist with neon glow progress ring
- **Quick Actions** — What to carry, how to vote, find polling booth
- **Election Results** — Real-time results section with ECI portal integration
- **AI Chat Assistant** — Powered by Claude AI for instant election queries

### 🆕 For First-Time Voters
- **Step-by-Step Registration Journey** — Eligibility → Register → Verification → Voter ID
- **Progress Persistence** — Journey progress saved to localStorage
- **Interactive Guidance** — Detailed instructions for Form 6, BLO verification, e-EPIC

### 🗳️ EVM Practice Simulator
- **Realistic EVM Interface** — Practice casting votes on a simulated Electronic Voting Machine
- **Web Audio Feedback** — Authentic beep sound on vote confirmation
- **Tactile Button Animation** — Physical press feel with CSS micro-interactions

### 🌐 Bilingual Support
- Full **English** and **Hindi** translations
- Language preference persisted across sessions

---

## 🎨 Design: "Digital India War Room"

VoteSaathi features a cinematic, control-room-style interface:

| Element | Detail |
|---------|--------|
| **Background** | Deep space black (`#0A0A14`) with circuit grid overlay |
| **Accent Colors** | Saffron (`#FF6B00`), India Green (`#138808`), Navy (`#000080`) |
| **Cards** | Glassmorphism with `backdrop-blur`, glow-on-hover |
| **Typography** | Rajdhani (headings), Inter (body), Fira Code (data) |
| **Landing Page** | Particle canvas + typing hero + classified dossier cards |
| **Animations** | Power-on timeline, briefing panel chat, neon progress ring |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/shagunpathak1508-create/VoteSaathi.git
cd VoteSaathi

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

To enable the AI Chat Assistant, create a `.env.local` file:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

> The chat feature uses the Claude API. Without the key, the assistant will show an error message but the rest of the app works perfectly.

---

## 📁 Project Structure

```
VoteSaathi/
├── app/
│   ├── api/chat/          # AI chat API route (Claude)
│   ├── evm-simulator/     # EVM practice page
│   ├── new-voter/         # First-time voter journey
│   ├── registered/        # Registered voter dashboard
│   ├── globals.css        # War Room theme styles
│   ├── layout.tsx         # Root layout + fonts
│   └── page.tsx           # Landing page (particles + typing hero)
├── components/
│   ├── new-voter/         # Step tracker, step components
│   ├── registered/        # Timeline, readiness, quick actions, results
│   └── shared/            # Navbar, ChatAssistant, Modal, ErrorCard
├── lib/
│   ├── i18n.ts            # EN/HI translations
│   ├── LanguageContext.tsx # Language provider
│   ├── electionConfig.ts  # Election state configuration
│   └── chatResponses.ts   # Chat flow types
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework with App Router |
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS 3** | Utility-first styling |
| **Framer Motion** | Animations and transitions |
| **Lucide React** | Icon library |
| **Claude AI (Anthropic)** | Chat assistant backend |

---

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — choose Registered or New Voter |
| `/registered` | Voter dashboard with timeline, actions, readiness |
| `/new-voter` | 4-step registration journey |
| `/evm-simulator` | Practice EVM with audio feedback |

---

## 🔑 Key Design Decisions

- **No heavy particle libraries** — Custom lightweight `<canvas>` with ~40 particles
- **CSS-first animations** — Minimal JS, maximum performance
- **Framer Motion** only where React state integration is needed
- **localStorage persistence** — Language, step progress, readiness checklist
- **ECI-aligned content** — All voter information follows Election Commission guidelines

---

## 📜 Disclaimer

> **VoteSaathi** is an informational assistant aligned with ECI (Election Commission of India) guidelines. It is **not** an official government portal. For official services, visit [voters.eci.gov.in](https://voters.eci.gov.in) or call the ECI helpline at **1950**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>VoteSaathi</strong> — Know your vote. Own your democracy. 🇮🇳
</p>
