"use client";

import Navbar from "@/components/shared/Navbar";
import ElectionTimeline from "@/components/registered/ElectionTimeline";
import GuidanceSection from "@/components/registered/GuidanceSection";
import QuickActions from "@/components/registered/QuickActions";
import FindConstituency from "@/components/registered/FindConstituency";
import ResultsSection from "@/components/registered/ResultsSection";
import VoterReadinessChecklist from "@/components/registered/VoterReadinessChecklist";
import ChatAssistant from "@/components/shared/ChatAssistant";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { electionState } from "@/lib/electionConfig";

export default function RegisteredVoterPage() {
  const { t } = useLanguage();

  return (
    <div className="animated-bg min-h-screen">
      <div className="circuit-grid" />
      <div className="india-map-bg" />
      <Navbar
        title={t("nav.voterDashboard")}
        subtitle={electionState.electionName}
        accentColor="#FF6B00"
      />

      <main role="main" className="relative z-10 max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-2 pb-2"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white font-rajdhani">
            {t("registered.welcome")} <span className="text-[#FF6B00]">{t("registered.voter")}</span> 🗳️
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {t("registered.subtitle")}
          </p>
        </motion.div>

        {/* Election Status Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ElectionTimeline />
        </motion.div>

        {/* Personalized Guidance */}
        <GuidanceSection />

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <QuickActions />
        </motion.div>

        {/* Find Your Constituency */}
        <FindConstituency />

        {/* Voter Readiness Score */}
        <VoterReadinessChecklist />

        {/* Results Section */}
        <ResultsSection />

        {/* Bottom padding for chat button */}
        <div className="h-20" />
      </main>

      {/* Floating Chat Assistant */}
      <ChatAssistant flow="registered" />
    </div>
  );
}
