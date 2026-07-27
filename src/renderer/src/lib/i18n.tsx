import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { createTranslator, normalizeLocale, type Locale, type Translator } from '@shared/i18n'
import { usePersistentState } from './usePersistentState'

interface I18nValue extends Translator {
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }): JSX.Element {
  const [locale, setLocale] = usePersistentState<Locale>(
    'locale',
    normalizeLocale(window.api.systemLocale)
  )

  const translator = useMemo(() => createTranslator(locale), [locale])

  useEffect(() => {
    document.documentElement.lang = locale
    // Главный процесс рисует системные диалоги и заголовок окна на своей копии словаря.
    void window.api.setLocale(locale)
  }, [locale])

  const value = useMemo(() => ({ ...translator, setLocale }), [translator, setLocale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n вызван вне I18nProvider')
  return value
}
