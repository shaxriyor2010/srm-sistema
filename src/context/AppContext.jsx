import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources, supportedLanguages } from '../locales/translations'

const AppContext = createContext()

const storedTheme = localStorage.getItem('theme') || 'dark'
const storedLanguage = localStorage.getItem('language') || 'uz'

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: storedLanguage,
    fallbackLng: 'uz',
    interpolation: { escapeValue: false },
  })
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(storedTheme)
  const [language, setLanguage] = useState(storedLanguage)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
  }, [language])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
      language,
      setLanguage,
      supportedLanguages,
    }),
    [theme, language],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
