/**
 * lang.jsx — bilingual content model.
 *
 * Every user-facing string in Paideia is a plain object shaped like:
 *     { en: 'Hello', sw: 'Hujambo' }
 * The `t()` helper picks the active language (falling back to English).
 * Exam vocabulary (numerator, denominator, ...) stays in English inside the
 * Swahili text too, because NECTA exams are English-medium.
 */
import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('paideia-lang') || 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('paideia-lang', lang)
    } catch {
      /* private mode etc. — app still works, preference just won't persist */
    }
    document.documentElement.lang = lang === 'sw' ? 'sw' : 'en'
  }, [lang])

  /** Translate a { en, sw } string object. Pass-through for plain values. */
  const t = (obj) => {
    if (obj && typeof obj === 'object' && ('en' in obj || 'sw' in obj)) {
      return obj[lang] ?? obj.en ?? ''
    }
    return obj
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
