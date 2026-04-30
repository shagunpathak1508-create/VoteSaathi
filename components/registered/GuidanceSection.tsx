"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { electionState, stageMessages } from "@/lib/electionConfig";
import { useLanguage } from "@/lib/LanguageContext";

const stageColors = {
  announced: { bg: "rgba(0,0,128,0.15)", border: "rgba(0,0,128,0.3)", text: "#6666ff", icon: "📢" },
  voting_ongoing: { bg: "rgba(255,107,0,0.12)", border: "rgba(255,107,0,0.3)", text: "#FF6B00", icon: "🗳️" },
  counting: { bg: "rgba(250,204,21,0.12)", border: "rgba(250,204,21,0.3)", text: "#fbbf24", icon: "📊" },
  results: { bg: "rgba(19,136,8,0.12)", border: "rgba(19,136,8,0.3)", text: "#22c55e", icon: "🏆" },
};

export default function GuidanceSection() {
  const { t } = useLanguage();
  const { currentStage } = electionState;
  const colors = stageColors[currentStage];
  const message = stageMessages[currentStage];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-2xl p-5 border"
      style={{ background: colors.bg, borderColor: colors.border }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl"
          style={{ background: `${colors.text}22`, border: `1px solid ${colors.text}44` }}
        >
          {colors.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4" style={{ color: colors.text }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: colors.text }}>
              {t("guidance.label")}
            </span>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed">{message}</p>

          {currentStage === "voting_ongoing" && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10">
                📅 Deadline: {electionState.votingDeadline}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10">
                📞 {t("nav.helpline")} 1950
              </span>
            </div>
          )}
          {currentStage === "counting" && (
            <div className="mt-3">
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10">
                📅 {t("results.resultsExpected")}: {electionState.resultsDate}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
