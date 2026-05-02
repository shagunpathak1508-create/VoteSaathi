import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
}

/**
 * All Firestore operations are wrapped in try/catch.
 * They never throw — they fail silently and return sensible defaults.
 * All writes use setDoc with merge: true to avoid overwriting unrelated fields.
 * Firestore path: users/{uid} (single document per user with nested fields).
 */

// ─── Voter Readiness Checklist ──────────────────────────────────────

export async function saveReadiness(
  uid: string,
  checklist: Record<string, boolean>
): Promise<void> {
  try {
    const ref = doc(db, "users", uid);
    await setDoc(ref, { readiness: checklist, lastSeen: serverTimestamp() }, { merge: true });
  } catch {
    // Fail silently
  }
}

export async function loadReadiness(
  uid: string
): Promise<Record<string, boolean> | null> {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists() && snap.data().readiness) {
      return snap.data().readiness as Record<string, boolean>;
    }
    return null;
  } catch {
    return null;
  }
}

// ─── New Voter Journey Step ─────────────────────────────────────────

export async function saveJourneyStep(
  uid: string,
  step: number
): Promise<void> {
  try {
    const ref = doc(db, "users", uid);
    await setDoc(ref, { journeyStep: step, lastSeen: serverTimestamp() }, { merge: true });
  } catch {
    // Fail silently
  }
}

export async function loadJourneyStep(uid: string): Promise<number> {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists() && typeof snap.data().journeyStep === "number") {
      return snap.data().journeyStep;
    }
    return 0;
  } catch {
    return 0;
  }
}

// ─── Language Preference ────────────────────────────────────────────

export async function saveLanguage(
  uid: string,
  lang: "en" | "hi"
): Promise<void> {
  try {
    const ref = doc(db, "users", uid);
    await setDoc(ref, { language: lang, lastSeen: serverTimestamp() }, { merge: true });
  } catch {
    // Fail silently
  }
}

export async function loadLanguage(uid: string): Promise<"en" | "hi"> {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const lang = snap.data().language;
      if (lang === "en" || lang === "hi") return lang;
    }
    return "en";
  } catch {
    return "en";
  }
}

// ─── Chat History (last 20 messages) ────────────────────────────────

export async function saveChatHistory(
  uid: string,
  messages: ChatMessage[]
): Promise<void> {
  try {
    const ref = doc(db, "users", uid);
    // Only save the last 20 messages
    const trimmed = messages.slice(-20);
    await setDoc(ref, { chatHistory: trimmed, lastSeen: serverTimestamp() }, { merge: true });
  } catch {
    // Fail silently
  }
}

export async function loadChatHistory(
  uid: string
): Promise<ChatMessage[]> {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists() && Array.isArray(snap.data().chatHistory)) {
      return snap.data().chatHistory as ChatMessage[];
    }
    return [];
  } catch {
    return [];
  }
}

// ─── Constituency Selection ─────────────────────────────────────────

export interface ConstituencySelection {
  state: string;
  district: string;
  constituencyKey: string;
}

export async function saveConstituency(
  uid: string,
  data: ConstituencySelection
): Promise<void> {
  try {
    const ref = doc(db, "users", uid);
    await setDoc(ref, { constituency: { ...data, savedAt: serverTimestamp() }, lastSeen: serverTimestamp() }, { merge: true });
  } catch {
    // Fail silently
  }
}

export async function loadConstituency(
  uid: string
): Promise<ConstituencySelection | null> {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists() && snap.data().constituency) {
      return snap.data().constituency as ConstituencySelection;
    }
    return null;
  } catch {
    return null;
  }
}

