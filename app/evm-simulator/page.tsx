"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { trackEvent } from "@/lib/firebase";
import Navbar from "@/components/shared/Navbar";

const candidates = [
  { id: 1, name: "Rajesh Kumar", party: "Progressive Alliance", color: "#FF6B00" },
  { id: 2, name: "Priya Sharma", party: "National Democratic Front", color: "#138808" },
  { id: 3, name: "Amit Verma", party: "People's Justice Party", color: "#3b82f6" },
  { id: 4, name: "Sunita Devi", party: "United Citizens Party", color: "#a855f7" },
  { id: 5, name: "Mohammed Irfan", party: "Socialist Workers' Union", color: "#ef4444" },
  { id: 6, name: "NOTA", party: "None of the Above", color: "#6b7280", isNota: true },
];

type EvmState = "idle" | "selected" | "confirming" | "done";

export default function EvmSimulatorPage() {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [evmState, setEvmState] = useState<EvmState>("idle");

  const handleSelect = (id: number) => {
    if (evmState === "done" || evmState === "confirming") return;
    setSelectedId(id);
    setEvmState("selected");
  };

  const handleVote = useCallback(() => {
    if (!selectedId || evmState === "confirming" || evmState === "done") return;
    setEvmState("confirming");

    // Play beep using Web Audio API
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 1200;
      osc.type = "sine";
      gain.gain.value = 0.15;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.stop(ctx.currentTime + 0.3);
    } catch {}

    setTimeout(() => {
      setEvmState("done");
      void trackEvent('evm_vote_cast', { candidate_selected: true });
    }, 1200);
  }, [selectedId, evmState]);

  const handleReset = () => {
    setSelectedId(null);
    setEvmState("idle");
  };

  return (
    <div className="animated-bg min-h-screen">
      <div className="circuit-grid" />
      <div className="india-map-bg" />
      <Navbar
        title={t("nav.evmSimulator")}
        subtitle={t("nav.evmSubtitle")}
        accentColor="#000080"
      />

      <main role="main" className="relative z-10 max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-2 pb-4"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white font-rajdhani">
            {t("evm.title")}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {t("evm.instruction")}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {evmState === "done" ? (
            /* ✓ Vote Recorded Screen */
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card rounded-2xl p-8 border border-[#138808]/30 text-center"
            >
              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(19,136,8,0.2), rgba(19,136,8,0.1))",
                  border: "3px solid rgba(19,136,8,0.5)",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <motion.path
                      d="M12 24L20 32L36 16"
                      stroke="#22c55e"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                    />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ delay: 0.4, duration: 1.5 }}
              >
                <div className="w-32 h-32 rounded-full border-2 border-[#138808]/30" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-2xl font-bold text-[#22c55e] mb-2"
              >
                {t("evm.recorded")}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm text-slate-400 mb-6"
              >
                {t("evm.recordedDesc")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex gap-3 justify-center"
              >
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm font-medium text-white px-6 py-2.5 rounded-xl transition-all hover:opacity-90 focus-visible:ring-2 focus-visible:ring-orange-500"
                  style={{ background: "linear-gradient(135deg, #FF6B00, #E55A00)" }}
                  id="evm-try-again-btn"
                  aria-label="Try EVM voting again"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  {t("evm.tryAgain")}
                </button>
                <Link
                  href="/registered"
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            /* EVM Machine UI */
            <motion.div
              key="evm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              {/* EVM Panel */}
              <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                {/* EVM Header */}
                <div
                  className="px-5 py-3 text-center border-b border-white/10"
                  style={{ background: "linear-gradient(135deg, rgba(0,0,128,0.2), rgba(0,0,128,0.08))" }}
                >
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-rajdhani">
                    Electronic Voting Machine
                  </p>
                  <p className="text-[10px] text-slate-600 mt-0.5 font-mono-data">Ballot Unit — Practice Mode</p>
                </div>

                {/* Candidate List */}
                <div className="divide-y divide-white/5">
                  {candidates.map((c, i) => (
                    <motion.button
                      key={c.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.2 }}
                      onClick={() => handleSelect(c.id)}
                      className={`w-full flex items-center gap-4 px-5 py-3.5 transition-all text-left ${
                        selectedId === c.id
                          ? "bg-[#FF6B00]/10 ring-1 ring-inset ring-[#FF6B00]/40"
                          : "hover:bg-white/5"
                      }`}
                      id={`evm-candidate-${c.id}`}
                    >
                      {/* Serial No */}
                      <span className="text-xs font-mono-data text-slate-600 w-4">{i + 1}</span>

                      {/* Party Symbol (colored circle) */}
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border"
                        style={{
                          background: `${c.color}20`,
                          borderColor: `${c.color}50`,
                        }}
                      >
                        {c.isNota ? (
                          <span className="text-xs font-bold text-slate-400">✕</span>
                        ) : (
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ background: c.color }}
                          />
                        )}
                      </div>

                      {/* Name + Party */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${selectedId === c.id ? "text-white" : "text-slate-200"}`}>
                          {c.isNota ? t("evm.nota") : c.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {c.isNota ? t("evm.notaFull") : c.party}
                        </p>
                      </div>

                      {/* Selection Indicator */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedId === c.id
                            ? "border-[#FF6B00] bg-[#FF6B00]"
                            : "border-white/20"
                        }`}
                      >
                        {selectedId === c.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* VOTE Button */}
              <motion.button
                onClick={handleVote}
                disabled={!selectedId || evmState === "confirming"}
                className={`w-full py-4 rounded-2xl text-lg font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-3 tactile-btn font-rajdhani ${
                  selectedId
                    ? "text-white shadow-lg hover:opacity-90"
                    : "text-slate-600 cursor-not-allowed"
                }`}
                style={{
                  background: selectedId
                    ? "linear-gradient(135deg, #FF6B00, #E55A00)"
                    : "rgba(255,255,255,0.05)",
                  border: selectedId ? "none" : "1px solid rgba(255,255,255,0.1)",
                }}
                whileTap={selectedId ? { scale: 0.97 } : {}}
                id="evm-vote-btn"
              >
                {evmState === "confirming" ? (
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="w-5 h-5 rounded-full bg-white/30"
                    />
                    Recording...
                  </motion.div>
                ) : selectedId ? (
                  t("evm.voteButton")
                ) : (
                  t("evm.selectFirst")
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-10" />
      </main>
    </div>
  );
}
