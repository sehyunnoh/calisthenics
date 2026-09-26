import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Locale = 'ko' | 'en'

export type LocalizedText = Record<Locale, string>

const LOCALE_KEY = 'calisthenics.locale.v1'

function getStoredLocale(): Locale {
  try {
    const raw = localStorage.getItem(LOCALE_KEY)
    return raw === 'en' ? 'en' : 'ko'
  } catch {
    return 'ko'
  }
}

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (text: LocalizedText) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => getStoredLocale())

  useEffect(() => {
    try {
      localStorage.setItem(LOCALE_KEY, locale)
    } catch {
      // localStorage unavailable - the choice just won't persist across visits
    }
    document.documentElement.lang = locale
    document.title = locale === 'ko' ? '맨몸 홈트' : 'Calisthenics Home Workout'
  }, [locale])

  function t(text: LocalizedText): string {
    return text[locale]
  }

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
