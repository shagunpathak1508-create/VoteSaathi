"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Vote, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface NavbarProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
}

export default function Navbar({
  title,
  subtitle,
  accentColor = "#FF6B00",
}: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { lang, setLang } = useLanguage();

  return (
    <nav className="sticky top-0 z-40 glass-card border-b border-white/10">
      <div className="tricolor-bar h-0.5 w-full" />
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        {!isHome && (
          <Link
            href="/"
            className="w-9 h-9 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
            id="nav-back-btn"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
          </Link>
        )}

        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${accentColor}22`, border: `1px solid ${accentColor}44` }}
          >
            <Vote className="w-4 h-4" style={{ color: accentColor }} />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-sm truncate font-rajdhani">
              <span style={{ color: accentColor }}>Vote</span>Saathi
              <span className="ml-2 text-slate-400 font-normal">·</span>
              <span className="ml-2 text-slate-300 font-medium font-inter">{title}</span>
            </p>
            {subtitle && (
              <p className="text-xs text-slate-500 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors shrink-0"
          id="lang-toggle-btn"
          aria-label="Toggle language"
        >
          <Globe className="w-3 h-3 text-slate-400" />
          <span className="text-slate-300">
            {lang === "en" ? "हिं" : "EN"}
          </span>
        </button>

        <a
          href="tel:1950"
          className="hidden md:flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors shrink-0"
        >
          <span className="text-slate-600">Helpline:</span>
          <span className="font-mono font-semibold text-[#FF6B00]">1950</span>
        </a>
      </div>
    </nav>
  );
}
