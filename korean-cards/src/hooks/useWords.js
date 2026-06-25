import { useState, useEffect, useCallback } from 'react'
import defaultWords from '../data/defaultWords'

const STORAGE_KEY = 'korean-cards-words'

function loadWords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultWords))
  return defaultWords
}

function saveWords(words) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words))
}

export default function useWords() {
  const [words, setWords] = useState(loadWords)

  useEffect(() => {
    saveWords(words)
  }, [words])

  const addWord = useCallback((word) => {
    const newWord = {
      ...word,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      status: 'new',
      createdAt: new Date().toISOString().slice(0, 10),
      reviewedAt: '',
      reviewCount: 0,
    }
    setWords(prev => [newWord, ...prev])
  }, [])

  const deleteWord = useCallback((id) => {
    setWords(prev => prev.filter(w => w.id !== id))
  }, [])

  const updateWord = useCallback((id, updates) => {
    setWords(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w))
  }, [])

  const categories = [...new Set(words.map(w => w.cat))]

  return { words, setWords, addWord, deleteWord, updateWord, categories }
}
