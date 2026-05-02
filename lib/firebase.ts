import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics, logEvent as firebaseLogEvent, isSupported as isAnalyticsSupported } from 'firebase/analytics'
import { getPerformance } from 'firebase/performance'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getFirestore(app)
export const auth = getAuth(app)

// Enable Firestore offline persistence
enableIndexedDbPersistence(db).catch(() => {})

// Firebase Analytics — only in browser
let analytics: ReturnType<typeof getAnalytics> | null = null
if (typeof window !== 'undefined') {
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  })
}

// Firebase Performance Monitoring — only in browser
if (typeof window !== 'undefined') {
  try {
    getPerformance(app)
  } catch {
    // Performance monitoring not available
  }
}

/**
 * Log an analytics event. Safe to call on server — silently no-ops.
 */
export function logEvent(eventName: string, params?: Record<string, string | number>) {
  if (analytics) {
    firebaseLogEvent(analytics, eventName, params)
  }
}
