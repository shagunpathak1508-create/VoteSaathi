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

/**
 * Saves the voter readiness checklist state for a user to Firestore.
 * Fails silently on network/auth errors to avoid breaking the UI.
 * @param uid - Firebase anonymous user ID
 * @param checklist - Map of checklist item keys to their checked state
 */
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

/**
 * Loads the voter readiness checklist state for a user from Firestore.
 * Returns null if no data exists or on error.
 * @param uid - Firebase anonymous user ID
 * @returns The checklist record or null if not found
 */
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

/**
 * Saves the current step index of the new voter registration journey to Firestore.
 * Fails silently on network/auth errors.
 * @param uid - Firebase anonymous user ID
 * @param step - The zero-based step index (0–3)
 */
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

/**
 * Loads the saved journey step for a user from Firestore.
 * Returns 0 (first step) if no data exists or on error.
 * @param uid - Firebase anonymous user ID
 * @returns The saved step index, or 0 as the default
 */
export async function loadJourneyStep(uid: string): Promise<number> {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists() && typeof snap.data().journeyStep === "number") {
      return snap.data().journeyStep as number;
    }
    return 0;
  } catch {
    return 0;
  }
}

// ─── Language Preference ────────────────────────────────────────────

/**
 * Saves the user's language preference ("en" or "hi") to Firestore.
 * Fails silently on network/auth errors.
 * @param uid - Firebase anonymous user ID
 * @param lang - The selected language code
 */
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

/**
 * Loads the user's language preference from Firestore.
 * Returns "en" as the default if no preference is saved or on error.
 * @param uid - Firebase anonymous user ID
 * @returns The saved language code, or "en" as the default
 */
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

/**
 * Saves up to the last 20 chat messages for a user to Firestore.
 * Trims older messages automatically. Fails silently on error.
 * @param uid - Firebase anonymous user ID
 * @param messages - Array of chat messages to persist
 */
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

/**
 * Loads the saved chat message history for a user from Firestore.
 * Returns an empty array if no history exists or on error.
 * @param uid - Firebase anonymous user ID
 * @returns Array of saved chat messages
 */
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

/**
 * Saves the user's selected constituency (state, district, key) to Firestore.
 * Fails silently on network/auth errors.
 * @param uid - Firebase anonymous user ID
 * @param data - The constituency selection to save
 */
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

/**
 * Loads the user's previously saved constituency selection from Firestore.
 * Returns null if no selection is saved or on error.
 * @param uid - Firebase anonymous user ID
 * @returns The saved constituency selection or null
 */
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
