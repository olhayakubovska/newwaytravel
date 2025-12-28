'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import styles from './Header.module.scss'
import { Globe, MessageCircle, Facebook, Youtube, Instagram, Send } from 'lucide-react'
import { Locale } from '@/app/(frontend)/[locale]/page'

interface HeaderProps {
  data?: any
  locale: Locale
}

export const Header = ({ data, locale }: HeaderProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [localeOpen, setLocaleOpen] = useState(false)

  const t = (field: any, fallback: string): string => {
    if (!field) return fallback
    if (typeof field === 'object') {
      return field[locale] || field.uk || field.en || fallback
    }
    return typeof field === 'string' ? field : fallback
  }

  const changeLanguage = (newLocale: 'uk' | 'en' | 'ru') => {
    if (newLocale === locale) return
    const segments = pathname.split('/')

    // segments[1] — это текущая локаль, заменяем её на новую
    if (['uk', 'en', 'ru'].includes(segments[1])) {
      segments[1] = newLocale
    } else {
      segments.splice(1, 0, newLocale) // если локаль не указана, вставляем
    }

    const newPath = segments.join('/') || `/${newLocale}`
    router.push(newPath)
    setLocaleOpen(false)
  }

  const navigation = [
    { label: locale === 'en' ? 'HOME' : locale === 'ru' ? 'ГЛАВНАЯ' : 'ГОЛОВНА', link: '/' },
    {
      label:
        locale === 'en' ? 'TOUR CALENDAR' : locale === 'ru' ? 'КАЛЕНДАРЬ ТУРОВ' : 'КАЛЕНДАР ТУРІВ',
      link: '/tours',
    },
    {
      label: locale === 'en' ? 'ABOUT US' : locale === 'ru' ? 'О НАС' : 'ПРО НАС',
      link: '/about',
    },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={`/${locale}`} className={styles.logo}>
          {t(data?.logoText, 'NEW WAY')}
        </Link>

        <nav className={styles.nav}>
          {navigation.map((item, idx) => (
            <Link key={idx} href={`/${locale}${item.link}`} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            href={data?.telegramChatLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chatLink}
          >
            <button className={styles.chatButton}>
              <MessageCircle className={styles.icon} />
              <span className={styles.chatText}>
                {t(
                  data?.chatText,
                  locale === 'en' ? 'ONLINE CHAT' : locale === 'ru' ? 'ОНЛАЙН ЧАТ' : 'ОНЛАЙН ЧАТ',
                )}
              </span>
            </button>
          </a>

          {/* Выпадающее меню для выбора языка */}
          <div className={styles.localeWrapper}>
            <button className={styles.localeButton} onClick={() => setLocaleOpen((prev) => !prev)}>
              <span className={styles.localeText}>
                {locale === 'uk' ? 'Ua' : locale === 'en' ? 'En' : 'Ru'}
              </span>
              <Globe className={styles.iconSmall} />
            </button>
            {localeOpen && (
              <div className={styles.dropdownContent}>
                <div className={styles.dropdownItem} onClick={() => changeLanguage('uk')}>
                  Ua
                </div>
                <div className={styles.dropdownItem} onClick={() => changeLanguage('en')}>
                  En
                </div>
                <div className={styles.dropdownItem} onClick={() => changeLanguage('ru')}>
                  Ru
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.socialsLeft}>
          <a href={data?.socialLinks?.facebook || '#'} target="_blank">
            <Facebook className={styles.icon} />
          </a>
          <a href={data?.socialLinks?.youtube || '#'} target="_blank">
            <Youtube className={styles.icon} />
          </a>
          <a href={data?.socialLinks?.telegram || '#'} target="_blank">
            <Send className={styles.icon} />
          </a>
          <a href={data?.socialLinks?.instagram || '#'} target="_blank">
            <Instagram className={styles.icon} />
          </a>
        </div>
      </div>
    </header>
  )
}
