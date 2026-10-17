import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations } from '../i18n/translations.js'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('zaren-lang') || 'fa'
  })

  useEffect(() => {
    localStorage.setItem('zaren-lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'fa' ? 'en' : 'fa')
  }, [])

  const t = useCallback((key) => {
    const dict = translations[lang] || translations.en
    return dict[key] || translations.en[key] || key
  }, [lang])

  const isRTL = lang === 'fa'

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
