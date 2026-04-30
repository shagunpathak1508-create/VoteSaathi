"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";

interface EligibilityStepProps {
  onNext: () => void;
}

export default function EligibilityStep({ onNext }: EligibilityStepProps) {
  const [age, setAge] = useState("");
  const [citizen, setCitizen] = useState<"yes" | "no" | null>(null);
  const [resident, setResident] = useState<"yes" | "no" | null>(null);
  const [result, setResult] = useState<"eligible" | "ineligible" | null>(null);

  const checkEligibility = () => {
    const ageNum = parseInt(age);
    if (ageNum >= 18 && citizen === "yes" && resident === "yes") {
      setResult("eligible");
    } else {
      setResult("ineligible");
    }
  };

  const canCheck = age !== "" && citizen !== null && resident !== null;

  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-[#138808]/15 border border-[#138808]/30 flex items-center justify-center text-3xl mx-auto mb-3">
          🎂
        </div>
        <h3 className="text-xl font-bold text-white">Check Your Eligibility</h3>
        <p className="text-sm text-slate-400 mt-1">Answer a few quick questions to see if you can register.</p>
      </div>

      <div className="space-y-4">
        {/* Age */}
        <div className="glass-card rounded-xl p-4 border border-white/10">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            How old are you?
          </label>
          <input
            id="eligibility-age-input"
            type="number"
            min={0}
            max={120}
            value={age}
            onChange={(e) => { setAge(e.target.value); setResult(null); }}
            placeholder="Enter your age"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 outline-none focus:border-[#138808]/60 transition-colors"
          />
          {age !== "" && parseInt(age) < 18 && (
            <p className="text-xs text-red-400 mt-1.5">⚠️ You must be at least 18 years old to register.</p>
          )}
        </div>

        {/* Citizenship */}
        <div className="glass-card rounded-xl p-4 border border-white/10">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Are you a citizen of India?
          </label>
          <div className="flex gap-3">
            {(["yes", "no"] as const).map((v) => (
              <button
                key={v}
                id={`citizen-${v}`}
                onClick={() => { setCitizen(v); setResult(null); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                  citizen === v
                    ? v === "yes"
                      ? "bg-[#138808]/20 border-[#138808] text-[#138808]"
                      : "bg-red-500/20 border-red-500 text-red-400"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                {v === "yes" ? "✅ Yes" : "❌ No"}
              </button>
            ))}
          </div>
        </div>

        {/* Resident */}
        <div className="glass-card rounded-xl p-4 border border-white/10">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Are you ordinarily resident in your constituency?
          </label>
          <div className="flex gap-3">
            {(["yes", "no"] as const).map((v) => (
              <button
                key={v}
                id={`resident-${v}`}
                onClick={() => { setResident(v); setResult(null); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                  resident === v
                    ? v === "yes"
                      ? "bg-[#138808]/20 border-[#138808] text-[#138808]"
                      : "bg-red-500/20 border-red-500 text-red-400"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                {v === "yes" ? "✅ Yes" : "❌ No"}
              </button>
            ))}
          </div>
        </div>

        {/* Check button */}
        <button
          id="check-eligibility-btn"
          onClick={checkEligibility}
          disabled={!canCheck}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: canCheck ? "linear-gradient(135deg, #138808, #1AA80A)" : undefined, backgroundColor: canCheck ? undefined : "rgba(255,255,255,0.05)", color: "white" }}
        >
          Check My Eligibility
        </button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-xl p-5 border ${
              result === "eligible"
                ? "bg-[#138808]/12 border-[#138808]/30"
                : "bg-red-500/12 border-red-500/30"
            }`}
          >
            {result === "eligible" ? (
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#138808] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#138808] font-semibold">🎉 You are Eligible!</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Great news! You meet all requirements to register as a voter. Proceed to the next step to register.
                  </p>
                  <button
                    id="eligibility-next-btn"
                    onClick={onNext}
                    className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-[#138808] hover:underline"
                  >
                    Proceed to Registration <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-semibold">Not Eligible Yet</p>
                  <p className="text-slate-400 text-sm mt-1">
                    You do not currently meet all voter registration requirements. You must be 18+, an Indian citizen, and a resident of the constituency.
                  </p>
                  <p className="text-slate-500 text-xs mt-2">
                    Tip: If you turn 18 before January 1 of the next year, you can register in advance.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
