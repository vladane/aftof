/** Авторство и реквизиты поддержки. Единственное место, где они заданы. */
export const AUTHOR = {
  name: 'Vladislav Bondarev',
  nickname: 'vladane',
  year: 2026,
  github: 'https://github.com/vladane/aftof'
} as const

export type SupportServiceId = 'boosty' | 'donationAlerts'

export interface SupportService {
  id: SupportServiceId
  label: string
  url: string
}

export const SUPPORT_SERVICES: SupportService[] = [
  { id: 'boosty', label: 'Boosty', url: 'https://boosty.to/vladane' },
  {
    id: 'donationAlerts',
    label: 'DonationAlerts',
    url: 'https://www.donationalerts.com/r/vladane'
  }
]

export interface CryptoWallet {
  /** Сеть в виде, привычном для кошельков: подписи не переводятся. */
  network: string
  address: string
}

export const CRYPTO_WALLETS: CryptoWallet[] = [
  { network: 'USDT · TRC20', address: 'TL6AfmtNGQuCd7ZmWUNyBtWUEFsiyb91DY' },
  { network: 'USDT · TON', address: 'UQAJGG3Uq18NZBygcZBKj2uBj-yTa4QXOAHeTOu4thfSsKxD' },
  { network: 'USDT · SPL', address: '6rqMCopTfznvWCf3wHB3ak9GFEW4R1Z1qodyidRL41To' },
  { network: 'USDT · ERC20', address: '0x0535593d80E3AA24dFF7173F2ADc87e1aF039FE0' },
  { network: 'USDT · BEP20', address: '0x0535593d80E3AA24dFF7173F2ADc87e1aF039FE0' }
]

/** Ссылки, которые приложению разрешено открывать во внешнем браузере. */
export const ALLOWED_LINK_HOSTS = [
  'github.com',
  'boosty.to',
  'www.donationalerts.com',
  'donationalerts.com'
]
