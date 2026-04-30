"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export const newVoterStepKeys = [
  { id: "eligibility", labelKey: "step.eligibility", icon: "✅", emoji: "🎂" },
  { id: "registration", labelKey: "step.register", icon: "📝", emoji: "📋" },
  { id: "verification", labelKey: "step.verification", icon: "🔍", emoji: "🔎" },
  { id: "voter-id", labelKey: "step.voterID", icon: "🪪", emoji: "🪪" },
];

// Keep backward-compatible export for NextStepBanner
export const newVoterSteps = newVoterStepKeys.map((s) => ({
  ...s,
  label: s.id === "eligibility" ? "Eligibility" : s.id === "registration" ? "Register" : s.id === "verification" ? "Verification" : "Get Voter ID",
}));

interface StepTrackerProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function StepTracker({ currentStep, onStepClick }: StepTrackerProps) {
  const { t } = useLanguage();
  const progressPercent = (currentStep / (newVoterStepKeys.length - 1)) * 100;

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-white font-rajdhani">{t("newVoter.journeyTitle")}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Step {currentStep + 1} {t("newVoter.stepOf")} {newVoterStepKeys.length}
          </p>
        </div>
        <span className="text-sm font-semibold text-[#138808]">
          {Math.round(progressPercent)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #138808, #1AA80A)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Steps */}
      <div className="flex justify-between gap-1">
        {newVoterStepKeys.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <button
              key={step.id}
              id={`step-${step.id}`}
              onClick={() => onStepClick(idx)}
              className="flex flex-col items-center gap-2 flex-1 group"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * idx, type: "spring" }}
                className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-all ${
                  isDone
                    ? "bg-[#138808] border-[#138808]"
                    : isCurrent
                    ? "bg-[#138808]/20 border-[#138808] stage-active"
                    : "bg-white/5 border-white/15 group-hover:border-[#138808]/40"
                }`}
              >
                {isDone ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-lg">{step.emoji}</span>
                )}
              </motion.div>
              <span
                className={`text-[10px] font-medium text-center leading-tight ${
                  isCurrent ? "text-[#138808]" : isDone ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {t(step.labelKey)}
              </span>
              {isCurrent && (
                <span className="text-[9px] bg-[#138808]/20 text-[#138808] px-1.5 py-0.5 rounded-full -mt-1">
                  {t("step.now")}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
