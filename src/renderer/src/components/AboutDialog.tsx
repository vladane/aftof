import { useEffect, useState } from 'react'
import { AUTHOR, CRYPTO_WALLETS, SUPPORT_SERVICES } from '@shared/author'
import { useI18n } from '../lib/i18n'
import { CheckIcon, CloseIcon, CopyIcon, ExternalIcon, HeartIcon, TargetFolderIcon } from './Icons'

export function AboutDialog({ onClose }: { onClose: () => void }): JSX.Element {
  const { t } = useI18n()
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(null), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copyAddress = (address: string): void => {
    void window.api.copyText(address)
    setCopied(address)
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="dialog dialog--about"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="dialog__close icon-button" onClick={onClose} type="button">
          <CloseIcon size={16} />
        </button>

        <div className="about__body">
          <div className="about__head">
            <span className="logo logo--large" aria-hidden="true">
              <TargetFolderIcon size={26} />
            </span>
            <div>
              <h2 className="dialog__title">Aftof</h2>
              <p className="about__tagline">{t('app.tagline')}</p>
              <p className="about__version">
                {t('about.version', { version: window.api.appVersion })}
              </p>
            </div>
          </div>

          <div className="about__author">
            <span className="about__label">{t('about.author')}</span>
            <span className="about__name">
              {AUTHOR.name} <span className="about__nickname">({AUTHOR.nickname})</span>
            </span>
            <button
              className="link-button link-button--icon"
              onClick={() => void window.api.openExternal(AUTHOR.github)}
              type="button"
            >
              {t('about.github')}
              <ExternalIcon size={13} />
            </button>
            <span className="about__legal">
              {t('about.legal', { year: AUTHOR.year, author: AUTHOR.name })}
            </span>
          </div>

          <section className="about__support">
            <h3 className="about__section-title">
              <HeartIcon size={15} />
              {t('support.title')}
            </h3>
            <p className="about__text">{t('support.text')}</p>

            <div className="support-grid">
              {SUPPORT_SERVICES.map((service) => (
                <button
                  key={service.id}
                  className="support-card"
                  onClick={() => void window.api.openExternal(service.url)}
                  type="button"
                >
                  <span className="support-card__title">
                    {service.label}
                    <ExternalIcon size={13} />
                  </span>
                  <span className="support-card__hint">{t(`support.${service.id}Hint`)}</span>
                </button>
              ))}
            </div>

            <h4 className="about__crypto-title">
              {t('support.cryptoTitle')}
              <span className="about__crypto-hint">{t('support.cryptoHint')}</span>
            </h4>

            <ul className="wallet-list">
              {CRYPTO_WALLETS.map((wallet) => (
                <li className="wallet" key={wallet.network}>
                  <span className="wallet__network">{wallet.network}</span>
                  <span className="wallet__address" title={wallet.address}>
                    {wallet.address}
                  </span>
                  <button
                    className={`wallet__copy${
                      copied === wallet.address ? ' wallet__copy--done' : ''
                    }`}
                    onClick={() => copyAddress(wallet.address)}
                    title={copied === wallet.address ? t('support.copied') : t('support.copy')}
                    type="button"
                  >
                    {copied === wallet.address ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="dialog__actions">
          <button className="button" onClick={onClose} type="button">
            {t('result.close')}
          </button>
        </div>
      </div>
    </div>
  )
}
