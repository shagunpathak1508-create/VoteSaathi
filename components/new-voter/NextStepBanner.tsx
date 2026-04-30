"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { newVoterStepKeys } from "@/components/new-voter/StepTracker";
import { useLanguage } from "@/lib/LanguageContext";

interface NextStepBannerProps {
  currentStep: number;
  onNext: () => void;
}

export default function NextStepBanner({ currentStep, onNext }: NextStepBannerProps) {
  const { t } = useLanguage();
  const isLast = currentStep >= newVoterStepKeys.length - 1;
  const nextStep = !isLast ? newVoterStepKeys[currentStep + 1] : null;
  const currentStepData = newVoterStepKeys[currentStep];

  return (
    <motion.div
      key={currentStep}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-4 border border-[#138808]/30 flex items-center justify-between gap-4"
      style={{ background: "linear-gradient(135deg, rgba(19,136,8,0.12), rgba(19,136,8,0.06))" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-[#138808]/20 border border-[#138808]/40 flex items-center justify-center text-xl shrink-0">
          {currentStepData.emoji}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-[#138808] font-medium">
            {isLast ? t("newVoter.journeyComplete") : t("newVoter.nextStep")}
          </p>
          <p className="text-sm font-semibold text-white truncate">
            {isLast
              ? t("newVoter.allSet")
              : nextStep
              ? t(nextStep.labelKey)
              : ""}
          </p>
        </div>
      </div>
      {!isLast && (
        <button
          id="next-step-banner-btn"
          onClick={onNext}
          className="flex items-center gap-1.5 text-xs font-semibold text-white px-4 py-2 rounded-xl shrink-0 transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #138808, #1AA80A)" }}
        >
          {t("newVoter.next")} <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </motion.div>
  );
}
