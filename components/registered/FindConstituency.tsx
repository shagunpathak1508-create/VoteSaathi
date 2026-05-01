"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Landmark, ExternalLink, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useFirebaseUser } from "@/lib/useFirebaseUser";
import { saveConstituency, loadConstituency } from "@/lib/firestoreHelpers";
import { stateDistrictMap, districtConstituencyMap } from "@/lib/constituencyData";

export default function FindConstituency() {
  const { t } = useLanguage();
  const { uid } = useFirebaseUser();

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [constituency, setConstituency] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const sortedStates = Object.keys(stateDistrictMap).sort();
  const districts = selectedState ? stateDistrictMap[selectedState] || [] : [];

  // Load saved constituency from Firestore on mount
  useEffect(() => {
    if (!uid) return;
    loadConstituency(uid).then((saved) => {
      if (saved && saved.state && saved.district) {
        setSelectedState(saved.state);
        setSelectedDistrict(saved.district);
        if (saved.constituency) {
          setConstituency(saved.constituency);
        }
      }
      setHydrated(true);
    });
  }, [uid]);

  const handleStateChange = useCallback((value: string) => {
    setSelectedState(value);
    setSelectedDistrict("");
    setConstituency(null);
  }, []);

  const handleDistrictChange = useCallback((value: string) => {
    setSelectedDistrict(value);
    setConstituency(null);
  }, []);

  const handleFind = useCallback(() => {
    if (!selectedState || !selectedDistrict) return;

    setLoading(true);

    // Brief loading spinner for 600ms before showing results
    setTimeout(() => {
      const result = districtConstituencyMap[selectedDistrict] || `${selectedDistrict} Parliamentary Constituency`;
      setConstituency(result);
      setLoading(false);

      // Save to Firestore
      if (uid) {
        saveConstituency(uid, {
          state: selectedState,
          district: selectedDistrict,
          constituency: result,
        });
      }
    }, 600);
  }, [selectedState, selectedDistrict, uid]);

  const handleReset = useCallback(() => {
    setSelectedState("");
    setSelectedDistrict("");
    setConstituency(null);
  }, []);

  const actionLinks = [
    {
      label: t("constituency.viewCandidates"),
      href: "https://affidavit.eci.gov.in",
      id: "view-candidates-link",
    },
    {
      label: t("constituency.checkVoterList"),
      href: "https://electoralsearch.eci.gov.in",
      id: "check-voter-list-link",
    },
    {
      label: t("constituency.pollingBoothInfo"),
      href: "https://booth.eci.gov.in",
      id: "polling-booth-info-link",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass-card rounded-2xl p-6 border border-white/10"
    >
      {/* Card Title */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "#FF6B0018", border: "1px solid #FF6B0033" }}
        >
          <MapPin className="w-5 h-5 text-[#FF6B00]" />
        </div>
        <h2 className="text-lg font-bold text-white font-rajdhani">
          {t("constituency.findConstituency")}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {!constituency ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* State Dropdown */}
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">
                {t("constituency.selectState")}
              </label>
              <select
                id="constituency-state-select"
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none cursor-pointer outline-none transition-all focus:border-[#FF6B00]/60 focus:ring-2 focus:ring-[#FF6B00]/20 backdrop-blur-md"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23FF6B00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="" disabled className="bg-[#0f172a] text-slate-400">
                  {t("constituency.selectState")}
                </option>
                {sortedStates.map((state) => (
                  <option key={state} value={state} className="bg-[#0f172a] text-white">
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* District Dropdown */}
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">
                {t("constituency.selectDistrict")}
              </label>
              <select
                id="constituency-district-select"
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                disabled={!selectedState}
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm appearance-none outline-none transition-all backdrop-blur-md ${
                  !selectedState
                    ? "text-slate-600 cursor-not-allowed opacity-50"
                    : "text-white cursor-pointer focus:border-[#FF6B00]/60 focus:ring-2 focus:ring-[#FF6B00]/20"
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23FF6B00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="" disabled className="bg-[#0f172a] text-slate-400">
                  {t("constituency.selectDistrict")}
                </option>
                {districts.map((district) => (
                  <option key={district} value={district} className="bg-[#0f172a] text-white">
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Find Button */}
            <button
              id="constituency-find-btn"
              onClick={handleFind}
              disabled={!selectedState || !selectedDistrict || loading}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                !selectedState || !selectedDistrict
                  ? "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5"
                  : "bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white shadow-lg shadow-[#FF6B00]/20 active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                t("constituency.findButton")
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* Constituency Result */}
            <div className="bg-[#FF6B00]/8 border border-[#FF6B00]/20 rounded-xl p-4 flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "#FF6B0020", border: "1px solid #FF6B0040" }}
              >
                <Landmark className="w-4.5 h-4.5 text-[#FF6B00]" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">{t("constituency.yourConstituency")}</p>
                <p className="text-[#FF6B00] font-bold text-base font-rajdhani leading-snug">
                  {constituency}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedDistrict}, {selectedState}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {actionLinks.map((link) => (
                <a
                  key={link.id}
                  id={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-transparent border border-[#FF6B00]/30 hover:bg-[#FF6B00] hover:border-[#FF6B00] text-slate-300 hover:text-white rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group"
                >
                  <span className="text-xs sm:text-sm">{link.label}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#FF6B00] group-hover:text-white transition-colors shrink-0 ml-2" />
                </a>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-slate-600 text-center leading-relaxed">
              {t("constituency.officialSource")}
            </p>

            {/* Search Again */}
            <button
              id="constituency-search-again"
              onClick={handleReset}
              className="w-full text-center text-xs text-[#FF6B00]/70 hover:text-[#FF6B00] transition-colors py-1"
            >
              {t("constituency.searchAgain")} ↺
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
