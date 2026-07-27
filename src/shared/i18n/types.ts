export const LOCALES = ['ru', 'en', 'de', 'es', 'fr', 'pt', 'zh', 'ja'] as const

export type Locale = (typeof LOCALES)[number]

export const LOCALE_NAMES: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
  zh: '中文',
  ja: '日本語'
}

/** Варианты формы слова по числу; ключ 'other' обязателен. */
export interface PluralForms {
  zero?: string
  one?: string
  two?: string
  few?: string
  many?: string
  other: string
}

export type MessageValue = string | PluralForms

export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** 'ru-RU' → 'ru'; неизвестные языки уходят на английский. */
export function normalizeLocale(raw: string | undefined | null): Locale {
  if (!raw) return DEFAULT_LOCALE
  const base = raw.toLowerCase().split(/[-_]/)[0]
  return isLocale(base) ? base : DEFAULT_LOCALE
}
