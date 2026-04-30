"use client";

import { motion } from "framer-motion";
import { ExternalLink, PartyPopper } from "lucide-react";

interface VoterIdStepProps {
  onRestart: () => void;
}

export default function VoterIdStep({ onRestart }: VoterIdStepProps) {
  return (
    <div className="space-y-5">
      <div className="text-center mb-4">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-16 h-16 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-3xl mx-auto mb-3"
        >
          🪪
        </motion.div>
        <h3 className="text-xl font-bold text-white">Get Your Voter ID</h3>
        <p className="text-sm text-slate-400 mt-1">After verification, your EPIC card will be issued.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-5 border border-purple-500/30 bg-purple-500/10 flex items-start gap-3"
      >
        <PartyPopper className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-purple-300 font-semibold">Almost there! 🎉</p>
          <p className="text-slate-400 text-sm mt-1">Once verification is complete, your voter registration is confirmed and your EPIC card will be processed.</p>
        </div>
      </motion.div>

      <div>
        <p className="text-sm font-semibold text-white mb-3">How Will You Receive It?</p>
        <div className="space-y-2">
          {[
            { icon: "📮", title: "By Post", desc: "EPIC card mailed to your registered address within 4–6 weeks of verification.", color: "#FF6B00", link: null },
            { icon: "🏛️", title: "ERO Office", desc: "Collect your card from the local Electoral Registration Officer's office.", color: "#138808", link: null },
            { icon: "📱", title: "Digital e-EPIC", desc: "Download your voter ID as a PDF instantly from voters.eci.gov.in. Legally valid!", color: "#8b5cf6", link: "https://voters.eci.gov.in" },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-xl p-4 border border-white/10 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer" id="download-epic-link" className="flex items-center gap-1 text-xs text-purple-400 hover:underline mt-1.5">
                    Download e-EPIC <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-4 border border-white/10">
        <p className="text-sm font-semibold text-white mb-3">⏱ Timeline Summary</p>
        <div className="space-y-2">
          {[
            ["Form submission", "Day 1"],
            ["BLO verification visit", "2–4 weeks"],
            ["ERO approval", "+1 week"],
            ["Physical EPIC delivery", "+2–4 weeks"],
            ["e-EPIC available", "Immediately after approval"],
          ].map(([phase, time]) => (
            <div key={phase} className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{phase}</span>
              <span className="text-white font-medium">{time}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="https://voters.eci.gov.in" target="_blank" rel="noreferrer" id="track-status-link"
        className="flex items-center justify-between w-full bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-4 py-3 border border-white/10 group">
        <span className="text-sm font-medium text-slate-300">Track Application Status on ECI Portal</span>
        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
      </a>

      <div className="pt-2 text-center">
        <button id="restart-journey-btn" onClick={onRestart} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
          ← Start over
        </button>
      </div>
    </div>
  );
}
