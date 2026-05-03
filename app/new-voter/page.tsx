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
import { useFirebaseUser } from "@/lib/useFirebaseUser";
import { saveJourneyStep, loadJourneyStep } from "@/lib/firestoreHelpers";
import { trackEvent } from "@/lib/firebase";
import { RotateCcw } from "lucide-react";

export default function NewVoterPage() {
  const { t } = useLanguage();
  const { uid } = useFirebaseUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [mounted, setMounted] = useState(false);

  const stepNames: Record<number, string> = {
    0: 'eligibility',
    1: 'registration',
    2: 'verification',
    3: 'voter_id',
  };

  // Load journey step from Firestore on mount
  useEffect(() => {
    if (!uid) return;
    loadJourneyStep(uid).then((saved) => {
      if (saved >= 0 && saved <= 3) {
        setCurrentStep(saved);
      }
      setMounted(true);
    });
  }, [uid]);

  // Fallback mount if uid loads but Firestore is slow/unavailable
  useEffect(() => {
    if (uid && !mounted) {
      const timer = setTimeout(() => setMounted(true), 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [uid, mounted]);

  const goNext = useCallback(() => {
    setCurrentStep((s) => {
      const next = Math.min(s + 1, 3);
      void trackEvent('step_completed', { step_number: next, step_name: stepNames[next] ?? 'unknown' });
      // Save to Firestore (fire-and-forget)
      if (uid) {
        saveJourneyStep(uid, next).then().catch(() => {});
      }
      return next;
    });
    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, [uid]);

  const restart = useCallback(() => {
    setCurrentStep(0);
    // Save reset to Firestore (fire-and-forget)
    if (uid) {
      saveJourneyStep(uid, 0).then().catch(() => {});
    }
  }, [uid]);

  const handleStepClick = useCallback((step: number) => {
    setCurrentStep(step);
    // Save to Firestore (fire-and-forget)
    if (uid) {
      saveJourneyStep(uid, step).then().catch(() => {});
    }
  }, [uid]);

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

      <main role="main" className="relative z-10 max-w-2xl mx-auto px-4 py-6 space-y-5">
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
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
            id="reset-journey-btn"
            aria-label="Reset voter registration journey"
          >
            <RotateCcw className="w-3 h-3" aria-hidden="true" />
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
