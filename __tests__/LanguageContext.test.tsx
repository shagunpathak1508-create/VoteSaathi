import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '../lib/LanguageContext'

// Mock Firestore helpers and Firebase user so provider works in tests
jest.mock('../lib/firebase', () => ({ db: {}, auth: {} }))
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn().mockResolvedValue(undefined),
  getDoc: jest.fn().mockResolvedValue({
    exists: () => false,
    data: () => null,
  }),
  serverTimestamp: jest.fn(),
}))
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn((_auth: unknown, cb: (user: null) => void) => {
    cb(null)
    return () => {}
  }),
  signInAnonymously: jest.fn().mockRejectedValue(new Error('auth unavailable')),
  getAuth: jest.fn(),
}))

/**
 * TestComponent uses the real useLanguage hook so we test the actual context API.
 * The LanguageContext exposes `lang` and `setLang` (not `language`/`setLanguage`).
 */
function TestComponent() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}>Toggle</button>
      <span data-testid="label">{t('constituency.findConstituency')}</span>
    </div>
  )
}

describe('LanguageContext', () => {
  it('defaults to English', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    expect(screen.getByTestId('lang').textContent).toBe('en')
  })

  it('toggles to Hindi on button click', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    fireEvent.click(screen.getByText('Toggle'))
    expect(screen.getByTestId('lang').textContent).toBe('hi')
  })

  it('toggles back to English from Hindi', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    fireEvent.click(screen.getByText('Toggle'))
    fireEvent.click(screen.getByText('Toggle'))
    expect(screen.getByTestId('lang').textContent).toBe('en')
  })

  it('t() returns a non-empty string for known keys', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    expect(screen.getByTestId('label').textContent?.length).toBeGreaterThan(0)
  })
})
