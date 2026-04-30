"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface VerificationStepProps {
  onNext: () => void;
}

const statusStages = [
  { id: "submitted", label: "Application Submitted", desc: "Your Form 6 has been received.", done: true },
  { id: "blo", label: "BLO Visit Pending", desc: "A Booth Level Officer will visit your address to verify your details.", done: true },
  { id: "review", label: "Under Review", desc: "Your documents are being checked by the Electoral Registration Officer.", done: false },
  { id: "verified", label: "Verified ✅", desc: "Your registration is confirmed! Your name will appear on the electoral roll.", done: false },
];

export default function VerificationStep({ onNext }: VerificationStepProps) {
  const [simulatedStatus, setSimulatedStatus] = useState(1);

  return (
    <div className="space-y-5">
      <div className="text-center mb-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-3xl mx-auto mb-3">
          🔎
        </div>
        <h3 className="text-xl font-bold text-white">Verification Process</h3>
        <p className="text-sm text-slate-400 mt-1">
          After you submit Form 6, your application goes through a verification process.
        </p>
      </div>

      {/* BLO explanation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-5 border border-blue-500/20"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">👤</span>
          <div>
            <p className="text-white font-semibold">Who is a BLO?</p>
            <p className="text-slate-400 text-sm mt-1 leading-relaxed">
              A <strong className="text-blue-400">Booth Level Officer (BLO)</strong> is a government official assigned to your polling booth area. They will visit your registered address to confirm your identity and residence details. This visit usually happens within <strong className="text-white">2–4 weeks</strong> of submitting Form 6.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tips for BLO visit */}
      <div className="glass-card rounded-xl p-4 border border-white/10">
        <p className="text-sm font-semibold text-white mb-3">📌 Tips for the BLO Visit</p>
        <ul className="space-y-2">
          {[
            "Ensure someone is available at your address on weekdays between 10 AM – 5 PM",
            "Keep your original age proof and address proof ready",
            "The BLO may also verify your form online — so ensure all details are correctly entered",
            "You can check BLO contact info on voters.eci.gov.in",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-xs text-slate-400">
              <span className="text-[#138808] mt-0.5">→</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mock Status Tracker */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-white">Application Status Tracker</p>
          <button
            id="simulate-status-btn"
            onClick={() => setSimulatedStatus((s) => Math.min(s + 1, statusStages.length - 1))}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#138808]/15 text-[#138808] border border-[#138808]/30 hover:bg-[#138808]/25 transition-colors"
          >
            Simulate Update ▶
          </button>
        </div>

        <div className="space-y-2">
          {statusStages.map((stage, idx) => {
            const isReached = idx <= simulatedStatus;
            const isCurrent = idx === simulatedStatus;
            return (
              <motion.div
                key={stage.id}
                initial={false}
                animate={{ opacity: isReached ? 1 : 0.35 }}
                className={`rounded-xl p-4 border flex items-start gap-3 transition-all ${
                  isCurrent
                    ? "border-[#138808]/40 bg-[#138808]/10"
                    : isReached
                    ? "border-white/10 bg-white/5"
                    : "border-white/8 bg-white/3"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 border ${
                    isReached
                      ? "bg-[#138808] border-[#138808] text-white"
                      : "bg-white/5 border-white/15 text-slate-600"
                  }`}
                >
                  {isReached ? "✓" : idx + 1}
                </div>
                <div>
                  <p className={`text-sm font-medium ${isCurrent ? "text-[#138808]" : isReached ? "text-white" : "text-slate-600"}`}>
                    {stage.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{stage.desc}</p>
                </div>
                {isCurrent && (
                  <span className="ml-auto text-[10px] bg-[#138808]/20 text-[#138808] px-2 py-0.5 rounded-full shrink-0">
                    Current
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <button
        id="verification-next-btn"
        onClick={onNext}
        className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all"
        style={{ background: "linear-gradient(135deg, #138808, #1AA80A)" }}
      >
        My Verification is Done → Next
      </button>
    </div>
  );
}
