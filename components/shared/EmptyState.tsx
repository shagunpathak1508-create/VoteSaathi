"use client";

import { motion } from "framer-motion";

type EmptyVariant = "no-results" | "no-messages" | "checklist-empty";

interface EmptyStateProps {
  variant: EmptyVariant;
  title: string;
  description: string;
}

function NoResultsSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="12" width="40" height="56" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="rgba(255,255,255,0.03)" />
      <rect x="28" y="24" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
      <rect x="28" y="31" width="18" height="3" rx="1.5" fill="rgba(255,255,255,0.07)" />
      <rect x="28" y="38" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.07)" />
      <circle cx="40" cy="54" r="8" stroke="rgba(255,107,0,0.3)" strokeWidth="2" fill="rgba(255,107,0,0.05)" />
      <path d="M37 54L39.5 56.5L43.5 51.5" stroke="rgba(255,107,0,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NoMessagesSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 20C16 17.7909 17.7909 16 20 16H60C62.2091 16 64 17.7909 64 20V48C64 50.2091 62.2091 52 60 52H32L20 62V52H20C17.7909 52 16 50.2091 16 48V20Z" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="rgba(255,255,255,0.03)" />
      <circle cx="32" cy="34" r="2.5" fill="rgba(255,107,0,0.3)" />
      <circle cx="40" cy="34" r="2.5" fill="rgba(255,107,0,0.4)" />
      <circle cx="48" cy="34" r="2.5" fill="rgba(255,107,0,0.3)" />
    </svg>
  );
}

function ChecklistEmptySVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="10" width="44" height="60" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="rgba(255,255,255,0.03)" />
      <rect x="24" y="6" width="32" height="8" rx="3" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="rgba(10,10,24,1)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="26" y={24 + i * 11} width="8" height="8" rx="2" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
          <rect x="38" y={26 + i * 11} width={18 - i * 2} height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
        </g>
      ))}
    </svg>
  );
}

const illustrations: Record<EmptyVariant, () => JSX.Element> = {
  "no-results": NoResultsSVG,
  "no-messages": NoMessagesSVG,
  "checklist-empty": ChecklistEmptySVG,
};

export default function EmptyState({ variant, title, description }: EmptyStateProps) {
  const Illustration = illustrations[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-8 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="mb-4 opacity-60"
      >
        <Illustration />
      </motion.div>
      <h3 className="text-sm font-semibold text-slate-300 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-[220px] leading-relaxed">{description}</p>
    </motion.div>
  );
}
