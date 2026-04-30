"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface RegistrationStepProps {
  onNext: () => void;
}

const documents = [
  {
    category: "📅 Age Proof (any one)",
    color: "#FF6B00",
    items: [
      "Birth Certificate issued by municipal authority",
      "Class 10 / Matriculation Certificate",
      "Passport",
      "Aadhaar Card (with DOB)",
    ],
  },
  {
    category: "🏠 Address Proof (any one)",
    color: "#138808",
    items: [
      "Aadhaar Card",
      "Electricity / Water / Gas bill (recent)",
      "Bank or Post Office Passbook",
      "Passport",
      "Rent Agreement (registered)",
    ],
  },
];

export default function RegistrationStep({ onNext }: RegistrationStepProps) {
  return (
    <div className="space-y-5">
      <div className="text-center mb-4">
        <div className="w-16 h-16 rounded-2xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-3xl mx-auto mb-3">
          📋
        </div>
        <h3 className="text-xl font-bold text-white">Register as a Voter</h3>
        <p className="text-sm text-slate-400 mt-1">
          Use <strong className="text-white">Form 6</strong> to apply for inclusion in the electoral roll.
        </p>
      </div>

      {/* Form 6 explainer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-5 border border-[#FF6B00]/20"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">📄</span>
          <div>
            <p className="text-white font-semibold">What is Form 6?</p>
            <p className="text-slate-400 text-sm mt-1 leading-relaxed">
              Form 6 is the official voter registration application. It is used by first-time voters to get their name added to the electoral roll of their constituency.
            </p>
          </div>
        </div>
      </motion.div>

      {/* How to apply */}
      <div>
        <p className="text-sm font-semibold text-white mb-3">How to Apply</p>
        <div className="space-y-2">
          {[
            { icon: "🌐", method: "Online (Recommended)", desc: "Visit voters.eci.gov.in → Click 'New Registration' → Fill Form 6 → Upload documents → Submit", link: "https://voters.eci.gov.in" },
            { icon: "📱", method: "Voter Helpline App", desc: "Download the app from Play Store / App Store and register directly from your phone.", link: null },
            { icon: "🏛️", method: "Visit ERO Office", desc: "Collect a physical Form 6 from your Electoral Registration Officer (ERO) or BLO office, fill it, and submit.", link: null },
          ].map((item) => (
            <motion.div
              key={item.method}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-xl p-4 border border-white/10 flex items-start gap-3"
            >
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{item.method}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-[#FF6B00] hover:underline mt-1.5"
                  >
                    Open Portal <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Documents required */}
      <div>
        <p className="text-sm font-semibold text-white mb-3">Documents Required</p>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.category}
              className="rounded-xl p-4 border"
              style={{ background: `${doc.color}0d`, borderColor: `${doc.color}30` }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: doc.color }}>
                {doc.category}
              </p>
              <ul className="space-y-1.5">
                {doc.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: doc.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <button
        id="registration-next-btn"
        onClick={onNext}
        className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all"
        style={{ background: "linear-gradient(135deg, #FF6B00, #E55A00)" }}
      >
        I've Submitted My Form → Next
      </button>
    </div>
  );
}
