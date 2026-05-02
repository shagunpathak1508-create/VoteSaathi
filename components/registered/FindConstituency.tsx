"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Landmark, Loader2, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useFirebaseUser } from "@/lib/useFirebaseUser";
import { saveConstituency, loadConstituency } from "@/lib/firestoreHelpers";
import { stateDistrictMap, districtConstituencyMap } from "@/lib/constituencyData";
import { useCandidateData } from "@/lib/useCandidateData";
import { formatAssets } from "@/lib/formatters";
import { logEvent } from "@/lib/firebase";
import type { ConstituencyData } from "@/lib/types";

// Respect prefers-reduced-motion
const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const staggerDelay = prefersReducedMotion ? 0 : 0.06;

export default function FindConstituency() {
  const { t } = useLanguage();
  const { uid } = useFirebaseUser();
  const { data: candidateDb, loading: dataLoading } = useCandidateData();

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [constituency, setConstituency] = useState<string | null>(null);
  const [constituencyKey, setConstituencyKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sortedStates = useMemo(() => Object.keys(stateDistrictMap).sort(), []);
  const districts = selectedState ? stateDistrictMap[selectedState] || [] : [];

  // Find constituency data from the JSON
  const constituencyData: ConstituencyData | null = useMemo(() => {
    if (!constituencyKey || !candidateDb) return null;
    return candidateDb[constituencyKey] ?? null;
  }, [constituencyKey, candidateDb]);

  // Resolve a constituency key from the candidate database
  const resolveConstituencyKey = useCallback(
    (district: string, state: string): string | null => {
      if (!candidateDb) return null;
      // Direct match by district name
      const directKey = Object.keys(candidateDb).find(
        (key) =>
          key.toLowerCase().includes(district.toLowerCase()) ||
          (candidateDb[key].state.toLowerCase() === state.toLowerCase() &&
            key.toLowerCase().includes(district.toLowerCase()))
      );
      return directKey ?? null;
    },
    [candidateDb]
  );

  // Load saved constituency from Firestore on mount
  useEffect(() => {
    if (!uid) return;
    loadConstituency(uid).then((saved) => {
      if (saved && saved.state && saved.district) {
        setSelectedState(saved.state);
        setSelectedDistrict(saved.district);
        const result =
          districtConstituencyMap[saved.district] ||
          `${saved.district} Parliamentary Constituency`;
        setConstituency(result);
        if (saved.constituencyKey) {
          setConstituencyKey(saved.constituencyKey);
        } else {
          setConstituencyKey(resolveConstituencyKey(saved.district, saved.state));
        }
      }
    });
  }, [uid, resolveConstituencyKey]);

  const handleStateChange = useCallback((value: string) => {
    setSelectedState(value);
    setSelectedDistrict("");
    setConstituency(null);
    setConstituencyKey(null);
  }, []);

  const handleDistrictChange = useCallback((value: string) => {
    setSelectedDistrict(value);
    setConstituency(null);
    setConstituencyKey(null);
  }, []);

  const handleFind = useCallback(() => {
    if (!selectedState || !selectedDistrict) return;
    setLoading(true);

    setTimeout(() => {
      const result =
        districtConstituencyMap[selectedDistrict] ||
        `${selectedDistrict} Parliamentary Constituency`;
      const resolvedKey = resolveConstituencyKey(selectedDistrict, selectedState);

      setConstituency(result);
      setConstituencyKey(resolvedKey);
      setLoading(false);

      logEvent("constituency_searched", { state: selectedState, district: selectedDistrict });

      if (uid) {
        saveConstituency(uid, {
          state: selectedState,
          district: selectedDistrict,
          constituencyKey: resolvedKey || "",
        });
      }
    }, 600);
  }, [selectedState, selectedDistrict, uid, resolveConstituencyKey]);

  const handleReset = useCallback(() => {
    setSelectedState("");
    setSelectedDistrict("");
    setConstituency(null);
    setConstituencyKey(null);
  }, []);

  const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23FF6B00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

  // Sort candidates: winner first, then alphabetical by party
  const sortedCandidates = useMemo(() => {
    if (!constituencyData?.candidates?.length) return [];
    return [...constituencyData.candidates].sort((a, b) => {
      if (a.winner && !b.winner) return -1;
      if (!a.winner && b.winner) return 1;
      return a.party.localeCompare(b.party);
    });
  }, [constituencyData]);

  const mynetaUrl = constituencyData?.mynetaUrl || "https://myneta.info/LokSabha2024/";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass-card rounded-2xl p-6 border border-white/10"
    >
      {/* Card Title */}
      <div className="flex items-center gap-3 mb-1">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "#FF6B0018", border: "1px solid #FF6B0033" }}
        >
          <MapPin className="w-5 h-5 text-[#FF6B00]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white font-rajdhani">
            {t("constituency.findConstituency")}
          </h2>
          <p className="text-xs text-slate-500 leading-snug">
            {t("constituency.findSubtitle")}
          </p>
        </div>
      </div>

      <div className="mb-5" />

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
              <label htmlFor="constituency-state-select" id="state-label" className="text-xs text-slate-400 mb-1.5 block font-medium">
                {t("constituency.selectState")}
              </label>
              <select
                id="constituency-state-select"
                aria-label={t("constituency.selectState")}
                aria-describedby="state-label"
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none cursor-pointer outline-none transition-all focus:border-[#FF6B00]/60 focus:ring-2 focus:ring-[#FF6B00]/20 focus-visible:ring-2 focus-visible:ring-orange-500 backdrop-blur-md"
                style={{
                  backgroundImage: chevronSvg,
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
              <label htmlFor="constituency-district-select" id="district-label" className="text-xs text-slate-400 mb-1.5 block font-medium">
                {t("constituency.selectDistrict")}
              </label>
              <select
                id="constituency-district-select"
                aria-label={t("constituency.selectDistrict")}
                aria-describedby="district-label"
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                disabled={!selectedState}
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm appearance-none outline-none transition-all backdrop-blur-md ${
                  !selectedState
                    ? "text-slate-600 cursor-not-allowed opacity-50"
                    : "text-white cursor-pointer focus:border-[#FF6B00]/60 focus:ring-2 focus:ring-[#FF6B00]/20 focus-visible:ring-2 focus-visible:ring-orange-500"
                }`}
                style={{
                  backgroundImage: chevronSvg,
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
            {/* Constituency Header */}
            <div className="bg-[#FF6B00]/8 border border-[#FF6B00]/20 rounded-xl p-4 flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "#FF6B0020", border: "1px solid #FF6B0040" }}
              >
                <Landmark className="w-4 h-4 text-[#FF6B00]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">
                      {t("constituency.yourConstituency")}
                    </p>
                    <p className="text-[#FF6B00] font-bold text-base font-rajdhani leading-snug">
                      📍 {constituencyData?.constituencyName || constituency}
                      <span className="text-slate-500 font-normal text-sm">
                        {" "}
                        — {selectedState}
                      </span>
                    </p>
                  </div>
                  {sortedCandidates.length > 0 && (
                    <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/8 shrink-0">
                      {sortedCandidates.length} {t("constituency.candidateList").split(" ")[0]}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Loading skeleton while JSON fetches */}
            {dataLoading ? (
              <div className="space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] animate-pulse"
                    style={{ height: "76px" }}
                  >
                    <div className="flex items-center gap-3 h-full">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.08]" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-white/[0.08] rounded w-1/3" />
                        <div className="h-2 bg-white/[0.05] rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedCandidates.length > 0 ? (
              <>
                {/* Candidate List Header */}
                <p className="text-xs text-slate-400 font-medium">
                  {t("constituency.candidateList")}
                </p>

                {/* Candidate Cards */}
                <div className="space-y-2">
                  {sortedCandidates.map((candidate, i) => (
                    <motion.div
                      key={candidate.name}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: staggerDelay * i, duration: 0.25 }}
                      className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
                      style={{
                        borderLeft: candidate.winner
                          ? "3px solid #FF6B00"
                          : "3px solid #555555",
                      }}
                    >
                      {/* Top row: name + winner badge */}
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-sm font-semibold text-white font-rajdhani truncate">
                          {candidate.name}
                        </p>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {candidate.winner && (
                            <span className="text-[10px] font-semibold bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/25 px-2 py-0.5 rounded-full whitespace-nowrap">
                              {t("constituency.winner2024")}
                            </span>
                          )}
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                            {candidate.party}
                          </span>
                        </div>
                      </div>

                      {/* Party full name */}
                      <p className="text-[11px] text-slate-500 mb-2 truncate">
                        {candidate.partyFull}
                      </p>

                      {/* Stat chips */}
                      <div className="flex flex-wrap gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${
                            candidate.criminalCases > 0
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-white/[0.04] text-slate-400 border-white/[0.08]"
                          }`}
                        >
                          ⚖️ {t("constituency.criminalCases")}: {candidate.criminalCases}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.08]">
                          💰 {t("constituency.totalAssets")}: {formatAssets(candidate.totalAssets)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.08]">
                          🎓 {candidate.education}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* NOTA Row */}
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: staggerDelay * sortedCandidates.length,
                      duration: 0.25,
                    }}
                    className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.04]"
                    style={{ borderLeft: "3px solid #666666" }}
                  >
                    <p className="text-sm font-semibold text-slate-400 font-rajdhani">
                      🗳️ {t("constituency.nota")}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {t("constituency.notaSubtext")}
                    </p>
                  </motion.div>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-500/[0.06] border border-yellow-500/15 rounded-xl p-3 flex items-start gap-2.5">
                  <span className="text-sm shrink-0 mt-0.5">⚠️</span>
                  <p className="text-[11px] text-yellow-500/80 leading-relaxed">
                    {t("constituency.dataDisclaimer")}
                  </p>
                </div>

                {/* View Full Details on MyNeta */}
                <a
                  id="myneta-full-details-link"
                  href={mynetaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-transparent border border-[#FF6B00]/30 hover:bg-[#FF6B00] hover:border-[#FF6B00] text-slate-300 hover:text-white rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group"
                >
                  <span className="text-xs sm:text-sm">
                    {t("constituency.viewFullDetails")}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#FF6B00] group-hover:text-white transition-colors shrink-0 ml-2" />
                </a>

                {/* Attribution */}
                <p className="text-[10px] text-slate-600 text-center leading-relaxed">
                  <a
                    href="https://myneta.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-400 underline decoration-slate-700 transition-colors"
                  >
                    {t("constituency.dataSource")}
                  </a>
                </p>
              </>
            ) : (
              /* No data fallback */
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center space-y-3">
                <p className="text-2xl">📭</p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t("constituency.noDataDistrict")}
                </p>
                <a
                  id="myneta-fallback-link"
                  href="https://myneta.info/LokSabha2024/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 shadow-lg shadow-[#FF6B00]/20 active:scale-[0.98]"
                >
                  <span>{t("constituency.viewOnMyneta")}</span>
                </a>
              </div>
            )}

            {/* Search Again */}
            <button
              id="constituency-search-again"
              onClick={handleReset}
              className="w-full text-center text-xs text-[#FF6B00]/70 hover:text-[#FF6B00] transition-colors py-1"
            >
              {t("constituency.searchAgain")} {"\u21BA"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
