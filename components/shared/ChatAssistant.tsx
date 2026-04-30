"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { ChatFlow } from "@/lib/chatResponses";
import { useLanguage } from "@/lib/LanguageContext";
import EmptyState from "@/components/shared/EmptyState";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

interface ChatAssistantProps {
  flow: ChatFlow;
}

const suggestedQuestions: Record<ChatFlow, { en: string[]; hi: string[] }> = {
  registered: {
    en: [
      "What to carry on voting day?",
      "How do I find my polling booth?",
      "How does voting work?",
      "When are results declared?",
    ],
    hi: [
      "मतदान दिवस पर क्या ले जाएँ?",
      "मेरा मतदान केंद्र कैसे खोजें?",
      "मतदान कैसे होता है?",
      "परिणाम कब घोषित होते हैं?",
    ],
  },
  new_voter: {
    en: [
      "Am I eligible to vote?",
      "What documents do I need?",
      "How to fill Form 6?",
      "How long does verification take?",
    ],
    hi: [
      "क्या मैं मतदान के लिए पात्र हूँ?",
      "मुझे किन दस्तावेज़ों की ज़रूरत है?",
      "फॉर्म 6 कैसे भरें?",
      "सत्यापन में कितना समय लगता है?",
    ],
  },
};

export default function ChatAssistant({ flow }: ChatAssistantProps) {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set welcome message based on language
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "bot",
        text:
          flow === "registered"
            ? t("chat.welcomeRegistered")
            : t("chat.welcomeNewVoter"),
      },
    ]);
  }, [flow, lang, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Send only last 10 messages as history to stay within token limits
      const history = messages
        .filter((m) => m.id !== "welcome")
        .slice(-10)
        .map((m) => ({ role: m.role, text: m.text }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), history }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: data.text || t("chat.errorMessage"),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: t("chat.errorMessage"),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const questions = suggestedQuestions[flow][lang] || suggestedQuestions[flow]["en"];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl glow-saffron ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ background: "linear-gradient(135deg, #FF6B00, #E55A00)" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400 }}
        aria-label="Open chat assistant"
        id="chat-open-btn"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a18] status-live" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 200, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 200, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="fixed bottom-6 right-6 z-50 w-[340px] md:w-[380px] h-[520px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(15,15,30,0.97)",
              border: "1px solid rgba(255,107,0,0.2)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,107,0,0.15), rgba(19,136,8,0.08))",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/40 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#FF6B00]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white font-rajdhani">
                    {t("chat.title")}
                  </p>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                    {t("chat.online")}
                  </p>
                </div>
              </div>
              <button
                id="chat-close-btn"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.length <= 1 && (
                <EmptyState
                  variant="no-messages"
                  title={t("chat.emptyTitle")}
                  description={t("chat.emptyDesc")}
                />
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "chat-bubble-user text-white"
                        : "chat-bubble-bot text-slate-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="chat-bubble-bot px-4 py-3 flex items-center gap-1.5">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {questions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-[#FF6B00]/30 text-[#FF6B00] hover:bg-[#FF6B00]/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="px-4 py-3 shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2.5 border border-white/10">
                <input
                  type="text"
                  id="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("chat.placeholder")}
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                />
                <button
                  id="chat-send-btn"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #FF6B00, #E55A00)",
                  }}
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
