"use client";

import { motion } from "framer-motion";
import { Check, Radio } from "lucide-react";
import { stages, electionState, ElectionStage } from "@/lib/electionConfig";
import { useLanguage } from "@/lib/LanguageContext";

const stageIndex: Record<ElectionStage, number> = {
  announced: 0,
  voting_ongoing: 1,
  counting: 2,
  results: 3,
};

const stageLabelKeys: Record<string, string> = {
  announced: "timeline.announced",
  voting_ongoing: "timeline.votingOngoing",
  counting: "timeline.counting",
  results: "timeline.results",
};

export default function ElectionTimeline() {
  const { t } = useLanguage();
  const currentIdx = stageIndex[electionState.currentStage];

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white font-rajdhani">{t("timeline.title")}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{electionState.electionName}</p>
        </div>
        <span className="text-xs px-3 py-1.5 rounded-full bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 font-medium font-mono-data">
          {t("timeline.live")}
        </span>
      </div>

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Track */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-white/10" />
          {/* Progress fill */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentIdx / (stages.length - 1)) * 88 + 6}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute top-6 left-6 h-0.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8C33]"
          />

          <div className="relative flex justify-between">
            {stages.map((stage, idx) => {
              const isDone = idx < currentIdx;
              const isCurrent = idx === currentIdx;
              return (
                <div key={stage.id} className="flex flex-col items-center gap-3 flex-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * idx + 0.3, type: "spring" }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 relative z-10 transition-all power-on ${
                      isDone
                        ? "bg-[#FF6B00] border-[#FF6B00]"
                        : isCurrent
                        ? "bg-[#FF6B00]/20 border-[#FF6B00] stage-active"
                        : "bg-[#0a0a18] border-white/20"
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : isCurrent ? (
                      <Radio className="w-5 h-5 text-[#FF6B00]" />
                    ) : (
                      <span className="text-xl">{stage.icon}</span>
                    )}
                  </motion.div>
                  <div className="text-center">
                    <p
                      className={`text-xs font-semibold ${
                        isCurrent ? "text-[#FF6B00]" : isDone ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {t(stageLabelKeys[stage.id])}
                    </p>
                    {isCurrent && (
                      <span className="text-[10px] bg-[#FF6B00]/20 text-[#FF6B00] px-2 py-0.5 rounded-full mt-1 inline-block">
                        {t("timeline.current")}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden space-y-4">
        {stages.map((stage, idx) => {
          const isDone = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          return (
            <div key={stage.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * idx + 0.3, type: "spring" }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 power-on ${
                    isDone
                      ? "bg-[#FF6B00] border-[#FF6B00]"
                      : isCurrent
                      ? "bg-[#FF6B00]/20 border-[#FF6B00] stage-active"
                      : "bg-[#0a0a18] border-white/20"
                  }`}
                >
                  {isDone ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : isCurrent ? (
                    <Radio className="w-4 h-4 text-[#FF6B00]" />
                  ) : (
                    <span className="text-lg">{stage.icon}</span>
                  )}
                </motion.div>
                {idx < stages.length - 1 && (
                  <div
                    className={`w-0.5 h-6 mt-1 ${idx < currentIdx ? "bg-[#FF6B00]" : "bg-white/10"}`}
                  />
                )}
              </div>
              <div className="pt-2">
                <p
                  className={`text-sm font-semibold ${
                    isCurrent ? "text-[#FF6B00]" : isDone ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {t(stageLabelKeys[stage.id])}
                </p>
                {isCurrent && (
                  <span className="text-[10px] bg-[#FF6B00]/20 text-[#FF6B00] px-2 py-0.5 rounded-full mt-1 inline-block">
                    {t("timeline.currentStage")}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
