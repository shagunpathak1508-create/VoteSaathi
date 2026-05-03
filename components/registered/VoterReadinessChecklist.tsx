"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, CheckCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { electionState } from "@/lib/electionConfig";
import { useFirebaseUser } from "@/lib/useFirebaseUser";
import { saveReadiness, loadReadiness } from "@/lib/firestoreHelpers";
import EmptyState from "@/components/shared/EmptyState";
import { trackEvent } from "@/lib/firebase";

const checklistKeys = [
  "readiness.item1",
  "readiness.item2",
  "readiness.item3",
  "readiness.item4",
  "readiness.item5",
];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface VoterReadinessChecklistProps {}

const VoterReadinessChecklist: React.FC<VoterReadinessChecklistProps> = () => {
  const { t } = useLanguage();
  const { uid, loading: uidLoading } = useFirebaseUser();
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false, false]);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    if (!uid) return;
    loadReadiness(uid).then((saved) => {
      if (saved) {
        const arr = checklistKeys.map((key) => !!saved[key]);
        setChecked(arr);
      }
      setMounted(true);
    });
  }, [uid]);

  useEffect(() => {
    if (!uidLoading && !mounted) {
      const timer = setTimeout(() => setMounted(true), 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [uidLoading, mounted]);

  const toggle = (index: number): void => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      const newScore = next.filter(Boolean).length;
      void trackEvent('readiness_score_updated', { score: newScore, total: 5 });
      if (uid) {
        const record: Record<string, boolean> = {};
        checklistKeys.forEach((key, i) => {
          record[key] = i === index ? !prev[i] : prev[i];
        });
        saveReadiness(uid, record).then(() => {
          setSavedToast(true);
          setTimeout(() => setSavedToast(false), 1500);
        }).catch(() => {});
      }
      return next;
    });
  };

  const score = checked.filter(Boolean).length;
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (score / 5) * circumference;

  const handleCopy = () => {
    const shareText = t("readiness.shareText").replace("{date}", electionState.votingDeadline);
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (uidLoading || !mounted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card rounded-2xl p-6 border border-white/10"
      >
        <div className="animate-pulse space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-5 w-40 bg-white/10 rounded" />
              <div className="h-3 w-28 bg-white/5 rounded" />
            </div>
            <div className="w-[72px] h-[72px] rounded-full bg-white/5" />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-white/5 rounded-xl" />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass-card rounded-2xl p-6 border border-white/10 relative"
    >
      <AnimatePresence>
        {savedToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-[10px] font-medium"
            style={{
              background: "rgba(19,136,8,0.9)",
              color: "white",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(19,136,8,0.5)",
            }}
          >
            Saved ✓
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-white font-rajdhani">{t("readiness.title")}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{t("readiness.subtitle")}</p>
        </div>
        <div className="relative w-[72px] h-[72px] shrink-0">
          <svg className={`w-full h-full -rotate-90 ${score === 5 ? "neon-ring-green" : "neon-ring-saffron"}`} viewBox="0 0 88 88">
            <circle cx="44" cy="44" r="40" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
            <motion.circle cx="44" cy="44" r="40" stroke={score === 5 ? "#138808" : "#FF6B00"} strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: dashOffset }} transition={{ duration: 0.6, ease: "easeOut" }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-bold font-mono-data ${score === 5 ? "text-[#138808]" : "text-[#FF6B00]"}`}>{score}/5</span>
          </div>
        </div>
      </div>

      {score === 0 ? (
        <EmptyState variant="checklist-empty" title={t("readiness.emptyTitle")} description={t("readiness.emptyDesc")} />
      ) : null}

      <div className="space-y-2">
        {checklistKeys.map((key, i) => (
          <motion.button
            key={key}
            onClick={() => toggle(i)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
              checked[i] ? "bg-[#138808]/10 border-[#138808]/30" : "bg-white/5 border-white/8 hover:border-white/15"
            }`}
            whileTap={{ scale: 0.98 }}
            id={`readiness-item-${i}`}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border-2 transition-all ${checked[i] ? "bg-[#138808] border-[#138808]" : "border-white/20 bg-white/5"}`}>
              <AnimatePresence>
                {checked[i] && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
                    <Check className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className={`text-sm transition-colors ${checked[i] ? "text-slate-300 line-through" : "text-slate-200"}`}>{t(key)}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {score === 5 && (
          <motion.div initial={{ opacity: 0, y: 10, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: 10, height: 0 }} className="mt-4 overflow-hidden">
            <div className="rounded-xl p-4 border border-[#138808]/30" style={{ background: "linear-gradient(135deg, rgba(19,136,8,0.15), rgba(19,136,8,0.05))" }}>
              <p className="text-sm font-semibold text-[#138808] mb-1">{t("readiness.ready")}</p>
              <p className="text-xs text-slate-300 mb-3">{t("readiness.shareText").replace("{date}", electionState.votingDeadline)}</p>
              <button onClick={handleCopy} className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg transition-all" style={{ background: copied ? "rgba(19,136,8,0.3)" : "rgba(19,136,8,0.2)", border: "1px solid rgba(19,136,8,0.4)", color: "#22c55e" }} id="readiness-copy-btn">
                {copied ? (<><CheckCheck className="w-3.5 h-3.5" />{t("readiness.copied")}</>) : (<><Copy className="w-3.5 h-3.5" />{t("readiness.copyCard")}</>)}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VoterReadinessChecklist;
