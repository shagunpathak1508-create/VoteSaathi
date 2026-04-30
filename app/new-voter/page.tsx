"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import StepTracker from "@/components/new-voter/StepTracker";
import NextStepBanner from "@/components/new-voter/NextStepBanner";
import EligibilityStep from "@/components/new-voter/steps/EligibilityStep";
import RegistrationStep from "@/components/new-voter/steps/RegistrationStep";
import VerificationStep from "@/components/new-voter/steps/VerificationStep";
import VoterIdStep from "@/components/new-voter/steps/VoterIdStep";
import ChatAssistant from "@/components/shared/ChatAssistant";
import { useLanguage } from "@/lib/LanguageContext";
import { RotateCcw } from "lucide-react";

const STEP_KEY = "votesaathi_step";

export default function NewVoterPage() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Restore step from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STEP_KEY);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 3) {
        setCurrentStep(parsed);
      }
    }
    setMounted(true);
  }, []);

  const goNext = useCallback(() => {
    setCurrentStep((s) => {
      const next = Math.min(s + 1, 3);
      localStorage.setItem(STEP_KEY, next.toString());
      return next;
    });
    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  const restart = useCallback(() => {
    setCurrentStep(0);
    localStorage.removeItem(STEP_KEY);
  }, []);

  const handleStepClick = useCallback((step: number) => {
    setCurrentStep(step);
    localStorage.setItem(STEP_KEY, step.toString());
  }, []);

  const stepComponents = [
    <EligibilityStep key="eligibility" onNext={goNext} />,
    <RegistrationStep key="registration" onNext={goNext} />,
    <VerificationStep key="verification" onNext={goNext} />,
    <VoterIdStep key="voter-id" onRestart={restart} />,
  ];

  if (!mounted) return null;

  return (
    <div className="animated-bg min-h-screen">
      <div className="circuit-grid" />
      <div className="india-map-bg" />
      <Navbar
        title={t("nav.firstTimeVoter")}
        subtitle={t("nav.stepByStep")}
        accentColor="#138808"
      />

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-2 pb-1"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white font-rajdhani">
            {t("newVoter.title")}{" "}
            <span className="text-[#138808]">{t("newVoter.titleHighlight")}</span>{" "}
            {t("newVoter.titleSuffix")}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {t("newVoter.subtitle")}
          </p>
        </motion.div>

        {/* Step Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StepTracker
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        </motion.div>

        {/* Next Step Banner */}
        <NextStepBanner currentStep={currentStep} onNext={goNext} />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl p-6 border border-white/10"
          >
            {stepComponents[currentStep]}
          </motion.div>
        </AnimatePresence>

        {/* Reset Journey Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={restart}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors"
            id="reset-journey-btn"
          >
            <RotateCcw className="w-3 h-3" />
            {t("newVoter.resetJourney")}
          </button>
        </motion.div>

        {/* Bottom padding for chat */}
        <div className="h-20" />
      </main>

      {/* Progress Saved Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full text-xs font-medium"
            style={{
              background: "rgba(19,136,8,0.9)",
              color: "white",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(19,136,8,0.5)",
            }}
          >
            {t("newVoter.progressSaved")}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Assistant */}
      <ChatAssistant flow="new_voter" />
    </div>
  );
}
