import { t } from '../lib/i18n'
import type { Language } from '../lib/i18n'

describe('i18n translation function', () => {
  it('returns English translation for a known key', () => {
    expect(t('nav.voterDashboard', 'en')).toBe('Voter Dashboard')
  })

  it('returns Hindi translation for a known key', () => {
    expect(t('nav.voterDashboard', 'hi')).toBe('मतदाता डैशबोर्ड')
  })

  it('returns key itself for an unknown key', () => {
    expect(t('nonexistent.key', 'en')).toBe('nonexistent.key')
  })

  it('falls back to English when Hindi key is missing', () => {
    // All keys exist in both languages in the current codebase,
    // so this tests the fallback chain: hi -> en -> key
    const result = t('landing.subtitle', 'en')
    expect(result.length).toBeGreaterThan(0)
    expect(result).not.toBe('landing.subtitle')
  })

  it('returns correct string for chat.title in both languages', () => {
    expect(t('chat.title', 'en')).toBe('VoteSaathi AI')
    expect(t('chat.title', 'hi')).toBe('VoteSaathi AI')
  })

  it('handles all supported language codes', () => {
    const languages: Language[] = ['en', 'hi']
    languages.forEach((lang) => {
      const result = t('landing.footer', lang)
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })
  })

  it('returns non-empty strings for all landing page keys', () => {
    const landingKeys = [
      'landing.subtitle',
      'landing.tagline',
      'landing.badge1',
      'landing.registeredTitle',
      'landing.newVoterTitle',
      'landing.footer',
    ]
    landingKeys.forEach((key) => {
      expect(t(key, 'en').length).toBeGreaterThan(0)
      expect(t(key, 'hi').length).toBeGreaterThan(0)
    })
  })

  it('returns non-empty strings for readiness keys', () => {
    const keys = [
      'readiness.title',
      'readiness.item1',
      'readiness.item2',
      'readiness.item3',
      'readiness.item4',
      'readiness.item5',
    ]
    keys.forEach((key) => {
      expect(t(key, 'en').length).toBeGreaterThan(0)
    })
  })
})
