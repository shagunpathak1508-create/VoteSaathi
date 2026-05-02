"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Vote, UserPlus, ChevronRight, Shield, Star, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { logEvent } from "@/lib/firebase";
import { useEffect, useRef, useState } from "react";

/* ========================================
   LIGHTWEIGHT PARTICLE CANVAS
   ======================================== */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    const PARTICLE_COUNT = 40;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 0, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 107, 0, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ========================================
   TYPING HERO TEXT
   ======================================== */
function TypingHero() {
  const text = "Know your vote. Own your democracy.";
  const [displayed, setDisplayed] = useState("");
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        // Keep caret blinking for a bit, then stop
        setTimeout(() => setShowCaret(false), 2000);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-rajdhani text-lg md:text-2xl text-slate-300 tracking-wide">
      {displayed}
      {showCaret && (
        <span className="inline-block w-0.5 h-5 md:h-7 bg-[#FF6B00] ml-1 animate-pulse align-middle" />
      )}
    </span>
  );
}

/* ========================================
   LANDING PAGE
   ======================================== */
export default function LandingPage() {
  const { t, lang, setLang } = useLanguage();

  return (
    <main role="main" className="animated-bg min-h-screen flex flex-col relative">
      {/* Background layers */}
      <ParticleBackground />
      <div className="circuit-grid" />
      <div className="india-map-bg" />

      {/* Tricolor top bar */}
      <div className="tricolor-bar h-1 w-full relative z-10" />

      {/* Language Toggle — top right */}
      <div className="absolute top-3 right-4 z-20">
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-orange-500"
          id="landing-lang-toggle"
          aria-label="Toggle language"
        >
          <Globe className="w-3 h-3 text-slate-400" />
          <span className="text-slate-300">{lang === "en" ? "हिं" : "EN"}</span>
        </button>
      </div>

      {/* Header */}
      <header className="relative z-10 flex flex-col items-center pt-16 pb-6 px-4 text-center">
        {/* Emblem / Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-6"
        >
          <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center glow-saffron mx-auto mb-4">
            <span className="text-4xl">🗳️</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-3 font-rajdhani tracking-tight"
        >
          <span className="text-[#FF6B00]">Vote</span>
          <span className="text-white">Saathi</span>
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-sm font-medium tracking-widest text-[#94a3b8] uppercase mb-3 font-rajdhani"
        >
          {t("landing.subtitle")}
        </motion.p>

        {/* Typing hero headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-1 mb-2 h-8 md:h-10 flex items-center"
        >
          <TypingHero />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base md:text-lg text-slate-400 max-w-xl mt-2"
        >
          {t("landing.tagline")}
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex items-center gap-4 mt-5 flex-wrap justify-center"
        >
          {[t("landing.badge1"), t("landing.badge2"), t("landing.badge3")].map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
            >
              <Shield className="w-3 h-3 text-[#138808]" />
              {tag}
            </span>
          ))}
        </motion.div>
      </header>

      {/* Flow selection cards — Classified Dossier Style */}
      <section className="relative z-10 flex flex-col md:flex-row gap-6 max-w-4xl mx-auto px-6 pb-12 w-full justify-center items-stretch">
        {/* Registered Voter Card */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex-1 max-w-sm mx-auto w-full"
        >
          <Link href="/registered" className="block h-full">
            <div className="classified-card glass-card rounded-3xl p-8 h-full group cursor-pointer border border-[#FF6B00]/20 relative overflow-hidden hover:glow-border-saffron">
              {/* Classified stamp */}
              <div className="classified-stamp">CLASSIFIED</div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center mb-6 group-hover:bg-[#FF6B00]/25 transition-colors">
                  <Vote className="w-8 h-8 text-[#FF6B00]" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 font-rajdhani">
                  {t("landing.registeredTitle")}<br />
                  <span className="text-[#FF6B00]">{t("landing.registeredHighlight")}</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {t("landing.registeredDesc")}
                </p>
                <ul className="space-y-2 mb-8">
                  {[t("landing.registeredFeature1"), t("landing.registeredFeature2"), t("landing.registeredFeature3")].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Star className="w-3.5 h-3.5 text-[#FF6B00] fill-[#FF6B00]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#FF6B00]">{t("landing.openDashboard")}</span>
                  <div className="w-10 h-10 rounded-full bg-[#FF6B00]/20 flex items-center justify-center group-hover:bg-[#FF6B00] transition-colors">
                    <ChevronRight className="w-5 h-5 text-[#FF6B00] group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* New Voter Card */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex-1 max-w-sm mx-auto w-full"
        >
          <Link href="/new-voter" className="block h-full">
            <div className="classified-card glass-card rounded-3xl p-8 h-full group cursor-pointer border border-[#138808]/20 relative overflow-hidden hover:glow-border-green">
              {/* Classified stamp */}
              <div className="classified-stamp" style={{ color: "rgba(19,136,8,0.12)", borderColor: "rgba(19,136,8,0.10)" }}>CLASSIFIED</div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-[#138808]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#138808]/15 border border-[#138808]/30 flex items-center justify-center mb-6 group-hover:bg-[#138808]/25 transition-colors">
                  <UserPlus className="w-8 h-8 text-[#138808]" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 font-rajdhani">
                  {t("landing.newVoterTitle")}<br />
                  <span className="text-[#138808]">{t("landing.newVoterHighlight")}</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {t("landing.newVoterDesc")}
                </p>
                <ul className="space-y-2 mb-8">
                  {[t("landing.newVoterFeature1"), t("landing.newVoterFeature2"), t("landing.newVoterFeature3")].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Star className="w-3.5 h-3.5 text-[#138808] fill-[#138808]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#138808]">{t("landing.startJourney")}</span>
                  <div className="w-10 h-10 rounded-full bg-[#138808]/20 flex items-center justify-center group-hover:bg-[#138808] transition-colors">
                    <ChevronRight className="w-5 h-5 text-[#138808] group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-8 text-xs text-slate-600">
        <div className="tricolor-bar h-px w-32 mx-auto mb-4 opacity-30" />
        {t("landing.footer")}
      </footer>
    </main>
  );
}
