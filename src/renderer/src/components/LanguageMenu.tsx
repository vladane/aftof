import { useEffect, useRef, useState } from 'react'
import { LOCALES, LOCALE_NAMES, type Locale } from '@shared/i18n'
import { useI18n } from '../lib/i18n'
import { CheckIcon, GlobeIcon } from './Icons'

export function LanguageMenu(): JSX.Element {
  const { locale, setLocale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent): void => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const choose = (next: Locale): void => {
    setLocale(next)
    setOpen(false)
  }

  return (
    <div className="language" ref={containerRef}>
      <button
        className={`language__button${open ? ' language__button--open' : ''}`}
        onClick={() => setOpen((current) => !current)}
        title={t('language.title')}
        aria-haspopup="listbox"
        aria-expanded={open}
        type="button"
      >
        <GlobeIcon size={17} />
        <span className="language__code">{locale.toUpperCase()}</span>
      </button>

      {open && (
        <ul className="language__menu" role="listbox" aria-label={t('language.title')}>
          {LOCALES.map((id) => (
            <li key={id}>
              <button
                className={`language__item${id === locale ? ' language__item--active' : ''}`}
                onClick={() => choose(id)}
                role="option"
                aria-selected={id === locale}
                type="button"
              >
                <span className="language__name" lang={id}>
                  {LOCALE_NAMES[id]}
                </span>
                <span className="language__badge">{id.toUpperCase()}</span>
                {id === locale && <CheckIcon size={15} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
