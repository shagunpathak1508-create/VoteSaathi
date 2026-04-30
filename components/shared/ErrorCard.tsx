"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Phone } from "lucide-react";

interface ErrorCardProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorCard({
  title = "Something went wrong",
  message = "Please try again. If the issue persists, call the ECI helpline at 1950.",
  onRetry,
}: ErrorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-6 border border-red-500/20 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-red-400" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
        </div>

        <div className="flex items-center gap-3 mt-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 text-sm font-medium text-white px-5 py-2.5 rounded-xl transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #FF6B00, #E55A00)",
              }}
              id="error-retry-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry
            </button>
          )}
          <a
            href="tel:1950"
            className="flex items-center gap-2 text-sm font-medium text-slate-300 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            Call 1950
          </a>
        </div>
      </div>
    </motion.div>
  );
}
