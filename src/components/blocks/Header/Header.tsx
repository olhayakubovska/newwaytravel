'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import styles from './Header.module.scss'
import { Globe, MessageCircle, Facebook, Youtube, Instagram, Send, Menu, X } from 'lucide-react'
// Импортируем типы из сгенерированного файла
import { Header as PayloadHeaderType, Config } from '@/payload-types'

interface HeaderProps {
  data: PayloadHeaderType | null | undefined
  locale: Config['locale']
}

export const Header = ({ data, locale }: HeaderProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [localeOpen, setLocaleOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  /**
   * Универсальная функция перевода.
   * Т.к. мы используем PayloadHeaderType, TS знает, что field может быть объектом локалей.
   */
  const t = (
    field: string | Record<string, string> | null | undefined,
    fallback: string,
  ): string => {
    if (!field) return fallback
    if (typeof field === 'object') {
      return field[locale] || field.uk || field.en || Object.values(field)[0] || fallback
    }
    return typeof field === 'string' ? field : fallback
  }

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return
    const segments = pathname.split('/')
    // Заменяем сегмент локали (например, /uk/tours -> /en/tours)
    segments[1] = newLocale
    const newPath = segments.join('/')
    router.push(newPath)
    setLocaleOpen(false)
  }

  const navigation = data?.navItems || []

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href={`/${locale}`} className={styles.logo}>
            {t(data?.logoText, 'NEW WAY')}
          </Link>

          <nav className={styles.nav}>
            {navigation.map((item, idx) => (
              <Link key={item.id || idx} href={`/${locale}${item.link}`} className={styles.navLink}>
                {t(item.label, '')}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <a
              href={data?.telegramChatLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.chatLinkDesktop}
            >
              <button className={styles.chatButton}>
                <MessageCircle size={18} />
                <span>{t(data?.chatText, 'ЧАТ')}</span>
              </button>
            </a>

            <div className={styles.localeWrapper}>
              <button className={styles.localeButton} onClick={() => setLocaleOpen(!localeOpen)}>
                {locale.toUpperCase()} <Globe size={14} />
              </button>
              {localeOpen && (
                <div className={styles.dropdownContent}>
                  {(['uk', 'en', 'ru'] as const).map((lang) => (
                    <div
                      key={lang}
                      className={styles.dropdownItem}
                      onClick={() => changeLanguage(lang)}
                    >
                      {lang.toUpperCase()}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className={styles.burgerBtn} onClick={() => setIsMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.active : ''}`}>
        <div className={styles.mobileHeader}>
          <div className={styles.logo}>{t(data?.logoText, 'NEW WAY')}</div>
          <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {navigation.map((item, idx) => (
            <Link
              key={item.id || idx}
              href={`/${locale}${item.link}`}
              className={styles.mobileLink}
            >
              {t(item.label, '')}
            </Link>
          ))}
        </nav>

        <div className={styles.mobileFooter}>
          <a
            href={data?.telegramChatLink || '#'}
            className={styles.mobileChatBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={22} />
            {t(data?.chatText, 'ОНЛАЙН ЧАТ')}
          </a>
          <div className={styles.mobileSocials}>
            {data?.socialLinks?.facebook && (
              <a href={data.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                <Facebook size={24} />
              </a>
            )}
            {data?.socialLinks?.instagram && (
              <a href={data.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram size={24} />
              </a>
            )}
            {data?.socialLinks?.telegram && (
              <a href={data.socialLinks.telegram} target="_blank" rel="noopener noreferrer">
                <Send size={24} />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
