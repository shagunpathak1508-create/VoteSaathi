"use client";

import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  variant?: "card" | "chat" | "list";
  lines?: number;
}

export default function LoadingSkeleton({
  variant = "card",
  lines = 3,
}: LoadingSkeletonProps) {
  if (variant === "chat") {
    return (
      <div className="space-y-3 p-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`rounded-2xl ${
                i % 2 === 0 ? "w-[70%]" : "w-[55%]"
              } space-y-2 p-4 bg-white/5 border border-white/8`}
            >
              <div className="h-3 bg-white/10 rounded-full animate-pulse" />
              <div
                className="h-3 bg-white/8 rounded-full animate-pulse"
                style={{ width: "75%" }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="space-y-3">
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/8"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div
                className="h-3 bg-white/10 rounded-full animate-pulse"
                style={{ width: `${70 + Math.random() * 20}%` }}
              />
              <div
                className="h-2.5 bg-white/6 rounded-full animate-pulse"
                style={{ width: `${40 + Math.random() * 30}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: card variant
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card rounded-2xl p-6 border border-white/10 space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/10 rounded-full animate-pulse w-1/3" />
          <div className="h-3 bg-white/6 rounded-full animate-pulse w-1/2" />
        </div>
      </div>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className="h-3 bg-white/8 rounded-full animate-pulse"
          style={{ width: `${85 - i * 15}%` }}
        />
      ))}
    </motion.div>
  );
}
