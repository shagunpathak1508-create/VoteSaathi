import {
  saveReadiness,
  loadReadiness,
  saveJourneyStep,
  loadJourneyStep,
  saveLanguage,
  loadLanguage,
  saveChatHistory,
  loadChatHistory,
  saveConstituency,
  loadConstituency,
} from '../lib/firestoreHelpers'

// Mock Firebase
jest.mock('../lib/firebase', () => ({
  db: {},
  auth: {},
}))

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn().mockResolvedValue(undefined),
  getDoc: jest.fn().mockResolvedValue({
    exists: () => true,
    data: () => ({
      readiness: { 'readiness.item1': true, voterIdReady: true, boothConfirmed: false },
      journeyStep: 2,
      language: 'hi',
      chatHistory: [
        { id: '1', role: 'user', text: 'Hello' },
        { id: '2', role: 'bot', text: 'Hi there!' },
      ],
      constituency: {
        state: 'Maharashtra',
        district: 'Mumbai',
        constituencyKey: 'mumbai-north',
      },
    }),
  }),
  serverTimestamp: jest.fn(),
}))

describe('firestoreHelpers', () => {
  const testUid = 'test-user-123'

  // ─── Readiness ────────────────────────────────────────────

  it('saveReadiness resolves without throwing', async () => {
    await expect(saveReadiness(testUid, { voterIdReady: true })).resolves.not.toThrow()
  })

  it('loadReadiness returns checklist object', async () => {
    const result = await loadReadiness(testUid)
    expect(result).toHaveProperty('voterIdReady')
  })

  it('loadReadiness returns null gracefully when doc does not exist', async () => {
    const { getDoc } = require('firebase/firestore') as { getDoc: jest.Mock }
    getDoc.mockResolvedValueOnce({ exists: () => false, data: () => null })
    const result = await loadReadiness(testUid)
    expect(result).toBeNull()
  })

  it('saveReadiness fails silently on Firestore error', async () => {
    const { setDoc } = require('firebase/firestore') as { setDoc: jest.Mock }
    setDoc.mockRejectedValueOnce(new Error('Network error'))
    await expect(saveReadiness(testUid, {})).resolves.not.toThrow()
  })

  // ─── Journey Step ─────────────────────────────────────────

  it('saveJourneyStep resolves without throwing', async () => {
    await expect(saveJourneyStep(testUid, 3)).resolves.not.toThrow()
  })

  it('loadJourneyStep returns a number', async () => {
    const result = await loadJourneyStep(testUid)
    expect(typeof result).toBe('number')
  })

  it('loadJourneyStep returns 0 when doc does not exist', async () => {
    const { getDoc } = require('firebase/firestore') as { getDoc: jest.Mock }
    getDoc.mockResolvedValueOnce({ exists: () => false, data: () => null })
    const result = await loadJourneyStep(testUid)
    expect(result).toBe(0)
  })

  it('loadJourneyStep returns 0 on error', async () => {
    const { getDoc } = require('firebase/firestore') as { getDoc: jest.Mock }
    getDoc.mockRejectedValueOnce(new Error('fail'))
    const result = await loadJourneyStep(testUid)
    expect(result).toBe(0)
  })

  // ─── Language ─────────────────────────────────────────────

  it('saveLanguage resolves without throwing', async () => {
    await expect(saveLanguage(testUid, 'hi')).resolves.not.toThrow()
  })

  it('loadLanguage returns en or hi', async () => {
    const result = await loadLanguage(testUid)
    expect(['en', 'hi']).toContain(result)
  })

  it('loadLanguage returns en when doc does not exist', async () => {
    const { getDoc } = require('firebase/firestore') as { getDoc: jest.Mock }
    getDoc.mockResolvedValueOnce({ exists: () => false, data: () => null })
    const result = await loadLanguage(testUid)
    expect(result).toBe('en')
  })

  it('loadLanguage returns en on error', async () => {
    const { getDoc } = require('firebase/firestore') as { getDoc: jest.Mock }
    getDoc.mockRejectedValueOnce(new Error('fail'))
    const result = await loadLanguage(testUid)
    expect(result).toBe('en')
  })

  it('loadLanguage returns en when stored language is invalid', async () => {
    const { getDoc } = require('firebase/firestore') as { getDoc: jest.Mock }
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ language: 'fr' }),
    })
    const result = await loadLanguage(testUid)
    expect(result).toBe('en')
  })

  // ─── Chat History ─────────────────────────────────────────

  it('saveChatHistory resolves without throwing', async () => {
    const msgs = [
      { id: '1', role: 'user' as const, text: 'Hello' },
      { id: '2', role: 'bot' as const, text: 'Hi' },
    ]
    await expect(saveChatHistory(testUid, msgs)).resolves.not.toThrow()
  })

  it('saveChatHistory fails silently on error', async () => {
    const { setDoc } = require('firebase/firestore') as { setDoc: jest.Mock }
    setDoc.mockRejectedValueOnce(new Error('fail'))
    await expect(saveChatHistory(testUid, [])).resolves.not.toThrow()
  })

  it('loadChatHistory returns array of messages', async () => {
    const result = await loadChatHistory(testUid)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)
    expect(result[0]).toHaveProperty('text')
  })

  it('loadChatHistory returns empty array when doc does not exist', async () => {
    const { getDoc } = require('firebase/firestore') as { getDoc: jest.Mock }
    getDoc.mockResolvedValueOnce({ exists: () => false, data: () => null })
    const result = await loadChatHistory(testUid)
    expect(result).toEqual([])
  })

  it('loadChatHistory returns empty array on error', async () => {
    const { getDoc } = require('firebase/firestore') as { getDoc: jest.Mock }
    getDoc.mockRejectedValueOnce(new Error('fail'))
    const result = await loadChatHistory(testUid)
    expect(result).toEqual([])
  })

  it('loadChatHistory returns empty array when chatHistory field is not array', async () => {
    const { getDoc } = require('firebase/firestore') as { getDoc: jest.Mock }
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ chatHistory: 'not-an-array' }),
    })
    const result = await loadChatHistory(testUid)
    expect(result).toEqual([])
  })

  // ─── Constituency ─────────────────────────────────────────

  it('saveConstituency resolves without throwing', async () => {
    await expect(
      saveConstituency(testUid, {
        state: 'Maharashtra',
        district: 'Mumbai',
        constituencyKey: 'mumbai-north',
      })
    ).resolves.not.toThrow()
  })

  it('saveConstituency fails silently on error', async () => {
    const { setDoc } = require('firebase/firestore') as { setDoc: jest.Mock }
    setDoc.mockRejectedValueOnce(new Error('fail'))
    await expect(
      saveConstituency(testUid, {
        state: 'X',
        district: 'Y',
        constituencyKey: 'z',
      })
    ).resolves.not.toThrow()
  })

  it('loadConstituency returns constituency object', async () => {
    const result = await loadConstituency(testUid)
    expect(result).toHaveProperty('state')
    expect(result).toHaveProperty('district')
    expect(result).toHaveProperty('constituencyKey')
  })

  it('loadConstituency returns null when doc does not exist', async () => {
    const { getDoc } = require('firebase/firestore') as { getDoc: jest.Mock }
    getDoc.mockResolvedValueOnce({ exists: () => false, data: () => null })
    const result = await loadConstituency(testUid)
    expect(result).toBeNull()
  })

  it('loadConstituency returns null on error', async () => {
    const { getDoc } = require('firebase/firestore') as { getDoc: jest.Mock }
    getDoc.mockRejectedValueOnce(new Error('fail'))
    const result = await loadConstituency(testUid)
    expect(result).toBeNull()
  })

  it('loadConstituency returns null when constituency field is missing', async () => {
    const { getDoc } = require('firebase/firestore') as { getDoc: jest.Mock }
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ someOtherField: true }),
    })
    const result = await loadConstituency(testUid)
    expect(result).toBeNull()
  })
})
