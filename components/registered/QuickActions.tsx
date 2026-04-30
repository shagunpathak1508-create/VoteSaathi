"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, HelpCircle, MapPin, Monitor } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Modal from "@/components/shared/Modal";
import Link from "next/link";

export default function QuickActions() {
  const { t } = useLanguage();
  const [openModal, setOpenModal] = useState<string | null>(null);

  const actions = [
    {
      id: "carry",
      icon: Briefcase,
      label: t("quickActions.carry"),
      color: "#FF6B00",
      emoji: "🎒",
      title: "What to Carry on Voting Day",
      sub: t("quickActions.tapToLearn"),
      content: (
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p className="text-white font-medium">Carry any ONE valid Photo ID:</p>
          <ul className="space-y-2">
            {[
              ["🪪", "Voter ID Card (EPIC) — preferred"],
              ["🔵", "Aadhaar Card"],
              ["💳", "PAN Card"],
              ["🚗", "Driving Licence"],
              ["📘", "Passport"],
              ["🏗️", "MGNREGS Job Card"],
              ["📋", "Service/Bank/Post Office Photo ID"],
            ].map(([icon, text]) => (
              <li key={text} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5 border border-white/8">
                <span>{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-xl p-4 mt-4">
            <p className="text-[#FF6B00] font-medium mb-1">⚠️ Important</p>
            <p className="text-slate-400 text-xs">Your name must be on the electoral roll at your polling station. The photo ID alone does not guarantee entry if you are not registered.</p>
          </div>
          <p className="text-xs text-slate-500">Also carry your voter slip if received — it makes the process faster.</p>
        </div>
      ),
    },
    {
      id: "how-to-vote",
      icon: HelpCircle,
      label: t("quickActions.howToVote"),
      color: "#138808",
      emoji: "📋",
      title: "How to Vote — Step by Step",
      sub: t("quickActions.tapToLearn"),
      content: (
        <div className="space-y-3 text-sm">
          {[
            { step: "1", title: "Go to your polling station", desc: "Find it at voters.eci.gov.in or on your voter slip. Arrive during polling hours (7 AM – 6 PM).", color: "#FF6B00" },
            { step: "2", title: "Show your identity", desc: "Present your photo ID to the Presiding Officer. They'll verify your name on the electoral roll.", color: "#FF8C33" },
            { step: "3", title: "Get the indelible ink mark", desc: "Your left index finger will be marked with indelible ink. This prevents duplicate voting.", color: "#fbbf24" },
            { step: "4", title: "Enter the voting compartment", desc: "You'll be directed to the Electronic Voting Machine (EVM) in a private compartment.", color: "#22c55e" },
            { step: "5", title: "Press your choice on the EVM", desc: "Find your candidate's name and symbol, then press the button next to it.", color: "#138808" },
            { step: "6", title: "Wait for the beep ✅", desc: "A beep confirms your vote is recorded. The VVPAT will show your choice for 7 seconds.", color: "#06b6d4" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/8">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: `${item.color}22`, color: item.color, border: `1px solid ${item.color}44` }}
              >
                {item.step}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "find-booth",
      icon: MapPin,
      label: t("quickActions.findBooth"),
      color: "#8b5cf6",
      emoji: "📍",
      title: "Find Your Polling Booth",
      sub: t("quickActions.tapToLearn"),
      content: (
        <div className="space-y-4 text-sm">
          <p className="text-slate-300 leading-relaxed">Use any of these official methods to find your assigned polling booth:</p>
          {[
            { icon: "🌐", title: "Official Voter Portal", desc: "voters.eci.gov.in → Search Electoral Roll", link: "https://voters.eci.gov.in", linkText: "Open Portal →" },
            { icon: "📱", title: "Voter Helpline App", desc: "Download from Play Store or App Store — search 'Voter Helpline'", link: null, linkText: null },
            { icon: "📞", title: "Helpline Number", desc: "Call 1950 (toll-free) for live assistance", link: "tel:1950", linkText: "Call 1950 →" },
            { icon: "✉️", title: "SMS Service", desc: "SMS your Voter ID to 1950 to get booth details", link: null, linkText: null },
          ].map((item) => (
            <div key={item.title} className="bg-white/5 rounded-xl p-4 border border-white/8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target={item.link.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-xs text-[#FF6B00] hover:underline mt-2 inline-block"
                    >
                      {item.linkText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const activeAction = actions.find((a) => a.id === openModal);

  return (
    <>
      <div>
        <h2 className="text-lg font-bold text-white mb-4 font-rajdhani">{t("quickActions.title")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {actions.map((action, i) => (
            <motion.button
              key={action.id}
              id={`quick-action-${action.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
              onClick={() => setOpenModal(action.id)}
              className="glass-card rounded-2xl p-5 text-left card-hover border border-white/10 group relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `radial-gradient(circle at top left, ${action.color}12, transparent 70%)` }}
              />
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: `${action.color}18`, border: `1px solid ${action.color}33` }}
              >
                {action.emoji}
              </div>
              <p className="text-sm font-semibold text-white">{action.label}</p>
              <p className="text-xs text-slate-500 mt-1">{action.sub}</p>
              <div
                className="absolute bottom-4 right-4 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `${action.color}22` }}
              >
                <action.icon className="w-3.5 h-3.5" style={{ color: action.color }} />
              </div>
            </motion.button>
          ))}

          {/* Practice on EVM — links to /evm-simulator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/evm-simulator"
              className="glass-card rounded-2xl p-5 text-left card-hover border border-white/10 group relative overflow-hidden block h-full"
              id="quick-action-evm"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "radial-gradient(circle at top left, #00008012, transparent 70%)" }}
              />
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: "#00008018", border: "1px solid #00008033" }}
              >
                🗳️
              </div>
              <p className="text-sm font-semibold text-white">{t("quickActions.evmPractice")}</p>
              <p className="text-xs text-slate-500 mt-1">{t("quickActions.tapToPractice")}</p>
              <div
                className="absolute bottom-4 right-4 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "#00008022" }}
              >
                <Monitor className="w-3.5 h-3.5 text-[#6666ff]" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {activeAction && (
        <Modal
          isOpen={!!openModal}
          onClose={() => setOpenModal(null)}
          title={activeAction.title}
        >
          {activeAction.content}
        </Modal>
      )}
    </>
  );
}
