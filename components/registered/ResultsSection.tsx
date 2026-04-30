"use client";

import { motion } from "framer-motion";
import { ExternalLink, Clock } from "lucide-react";
import { electionState } from "@/lib/electionConfig";
import { useLanguage } from "@/lib/LanguageContext";
import EmptyState from "@/components/shared/EmptyState";

export default function ResultsSection() {
  const { t } = useLanguage();
  const isResultsDeclared = electionState.currentStage === "results";
  const isCounting = electionState.currentStage === "counting";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass-card rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white mb-1 font-rajdhani">{t("results.title")}</h2>
          <p className="text-xs text-slate-500">{electionState.electionName}</p>
        </div>
        <div
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
            isResultsDeclared
              ? "bg-green-500/15 text-green-400 border-green-500/30"
              : isCounting
              ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
              : "bg-slate-700/40 text-slate-400 border-slate-600/30"
          }`}
        >
          {isResultsDeclared ? (
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block status-live" />
              {t("results.live")}
            </span>
          ) : isCounting ? (
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full inline-block status-live" />
              {t("results.counting")}
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {t("results.pending")}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5">
        {isResultsDeclared ? (
          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="text-green-400 font-semibold">{t("results.liveTitle")}</p>
                <p className="text-slate-400 text-xs mt-0.5">{t("results.liveDesc")}</p>
              </div>
            </div>
            <a
              href="https://results.eci.gov.in"
              target="_blank"
              rel="noreferrer"
              id="results-link"
              className="flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-4 py-3 border border-white/10 group"
            >
              <span className="text-sm text-slate-300 font-medium">{t("results.checkECI")}</span>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#FF6B00] transition-colors" />
            </a>
          </div>
        ) : isCounting ? (
          <div className="space-y-3">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <div>
                <p className="text-yellow-400 font-semibold">{t("results.countingTitle")}</p>
                <p className="text-slate-400 text-xs mt-0.5">{t("results.countingDesc")} {electionState.resultsDate}.</p>
              </div>
            </div>
            <a
              href="https://results.eci.gov.in"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-4 py-3 border border-white/10 group"
            >
              <span className="text-sm text-slate-300 font-medium">{t("results.followLive")}</span>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-yellow-400 transition-colors" />
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            <EmptyState
              variant="no-results"
              title={t("results.emptyTitle")}
              description={t("results.emptyDesc")}
            />
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
              <div className="bg-white/5 rounded-xl px-3 py-2 border border-white/8">
                <p className="text-slate-400 font-medium">{t("results.countingDate")}</p>
                <p className="text-white mt-0.5">{electionState.countingDate}</p>
              </div>
              <div className="bg-white/5 rounded-xl px-3 py-2 border border-white/8">
                <p className="text-slate-400 font-medium">{t("results.resultsExpected")}</p>
                <p className="text-white mt-0.5">{electionState.resultsDate}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
