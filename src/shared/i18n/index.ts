import { de } from './locales/de'
import { en } from './locales/en'
import { es } from './locales/es'
import { fr } from './locales/fr'
import { ja } from './locales/ja'
import { pt } from './locales/pt'
import { ru } from './locales/ru'
import { zh } from './locales/zh'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_NAMES,
  normalizeLocale,
  type Locale,
  type MessageValue
} from './types'
import type { Dictionary, MessageKey } from './locales/ru'

const DICTIONARIES: Record<Locale, Dictionary> = { ru, en, de, es, fr, pt, zh, ja }

export type TranslateParams = Record<string, string | number>

function selectForm(value: MessageValue, locale: Locale, count: number | undefined): string {
  if (typeof value === 'string') return value
  if (count === undefined) return value.other
  const rule = new Intl.PluralRules(locale).select(count)
  return value[rule] ?? value.other
}

function interpolate(template: string, params: TranslateParams | undefined): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match
  )
}

export interface Translator {
  locale: Locale
  /** Перевод по ключу; `count` в параметрах выбирает форму множественного числа. */
  t: (key: MessageKey, params?: TranslateParams) => string
  formatBytes: (bytes: number) => string
  formatDate: (timestamp: number) => string
  formatDuration: (ms: number) => string
}

const BYTE_UNIT_KEYS = [
  'unit.byte',
  'unit.kilobyte',
  'unit.megabyte',
  'unit.gigabyte',
  'unit.terabyte'
] as const

export function createTranslator(locale: Locale): Translator {
  const dictionary = DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE]

  const t = (key: MessageKey, params?: TranslateParams): string => {
    const value = dictionary[key] ?? DICTIONARIES[DEFAULT_LOCALE][key]
    if (value === undefined) return key
    const count = typeof params?.count === 'number' ? params.count : undefined
    return interpolate(selectForm(value, locale, count), params)
  }

  // Считаем по 1024, поэтому подписи берём из словаря: Intl в этом случае
  // предлагает единицы СИ (kB, MB) и не даёт привычных «КБ» или «Ko».
  const formatBytes = (bytes: number): string => {
    let value = bytes
    let unitIndex = 0
    while (value >= 1024 && unitIndex < BYTE_UNIT_KEYS.length - 1) {
      value /= 1024
      unitIndex += 1
    }
    const number = new Intl.NumberFormat(locale, {
      maximumFractionDigits: unitIndex === 0 || value >= 10 ? 0 : 1
    }).format(value)
    return `${number} ${t(BYTE_UNIT_KEYS[unitIndex])}`
  }

  const formatDate = (timestamp: number): string =>
    new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(timestamp))

  const formatDuration = (ms: number): string => {
    const seconds = Math.round(ms / 1000)
    if (seconds < 60) return t('duration.seconds', { value: seconds })
    return t('duration.minutesSeconds', {
      minutes: Math.floor(seconds / 60),
      seconds: seconds % 60
    })
  }

  return { locale, t, formatBytes, formatDate, formatDuration }
}

export {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_NAMES,
  normalizeLocale,
  type Dictionary,
  type Locale,
  type MessageKey
}
