'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import styles from './Header.module.scss'
import { Globe, MessageCircle, Facebook, Youtube, Instagram, Send } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

interface HeaderProps {
  data?: any // Данные из Payload Global Header
  locale: 'uk' | 'en'
}

export const Header = ({ data, locale }: HeaderProps) => {
  const router = useRouter()
  const pathname = usePathname()

  // Функция для безопасного извлечения текста (лечит ошибку [object Object])
  const t = (field: any, fallback: string): string => {
    if (!field) return fallback
    if (typeof field === 'object') {
      return field[locale] || field.uk || field.en || fallback
    }
    return typeof field === 'string' ? field : fallback
  }

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  // Хардкод навигация
  const navigation = [
    { label: locale === 'en' ? 'HOME' : 'ГОЛОВНА', link: '/' },
    { label: locale === 'en' ? 'TOUR CALENDAR' : 'КАЛЕНДАР ТУРІВ', link: '/tours' },
    { label: locale === 'en' ? 'ABOUT US' : 'ПРО НАС', link: '/about' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип из админки */}
        <Link href={`/${locale}`} className={styles.logo}>
          {t(data?.logoText, 'NEW WAY')}
        </Link>

        {/* Навигация (Хардкод) */}
        <nav className={styles.nav}>
          {navigation.map((item, idx) => (
            <Link key={idx} href={`/${locale}${item.link}`} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {/* Ссылка на телеграм из админки для кнопки ЧАТ */}
          <a
            href={data?.telegramChatLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chatLink}
          >
            <button className={styles.chatButton}>
              <MessageCircle className={styles.icon} />
              <span className={styles.chatText}>
                {t(data?.chatText, locale === 'en' ? 'ONLINE CHAT' : 'ОНЛАЙН ЧАТ')}
              </span>
            </button>
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={styles.localeButton}>
                <span className={styles.localeText}>{locale === 'uk' ? 'Ua' : 'En'}</span>
                <Globe className={styles.iconSmall} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={styles.dropdownContent} align="end">
              <DropdownMenuItem
                className={styles.dropdownItem}
                onClick={() => changeLanguage('uk')}
              >
                Ua
              </DropdownMenuItem>
              <DropdownMenuItem
                className={styles.dropdownItem}
                onClick={() => changeLanguage('en')}
              >
                En
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Соцсети из группы в админке */}
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
