'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import styles from './Header.module.scss'
import { Globe, MessageCircle, Facebook, Youtube, Instagram } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

interface HeaderProps {
  logoText?: string | any | null
  navItems?:
    | {
        label: string | any
        link: string
        id?: string | null
      }[]
    | null
  locale: string
}

export const Header = ({ logoText, navItems, locale }: HeaderProps) => {
  const router = useRouter()
  const pathname = usePathname()

  // Универсальная функция для извлечения строки из данных Payload
  const getText = (field: any): string => {
    if (typeof field === 'object' && field !== null) {
      // Если пришел объект локализации { uk: '...', en: '...' }
      return field[locale] || field['uk'] || field['en'] || ''
    }
    return typeof field === 'string' ? field : ''
  }

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return

    // Заменяем сегмент локали в URL
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  const navigation = navItems || []

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <Link href={`/${locale}`} className={styles.logo}>
          {getText(logoText) || 'NEW WAY'}
        </Link>

        {/* Навигация */}
        <nav className={styles.nav}>
          {navigation.map((item: any) => (
            <Link
              key={item.id || item.link}
              href={`/${locale}${item.link.startsWith('/') ? item.link : '/' + item.link}`}
              className={styles.navLink}
            >
              {getText(item.label)}
            </Link>
          ))}
        </nav>

        {/* Блок действий */}
        <div className={styles.actions}>
          {/* Выбор языка */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={styles.localeButton}>
                <Globe className={styles.icon} />
                <span className={styles.localeText}>{locale.toUpperCase()}</span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className={styles.dropdownContent}
              align="end"
              style={{
                background: 'white',
                padding: '8px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 100,
              }}
            >
              <DropdownMenuItem
                style={{ cursor: 'pointer', padding: '8px', outline: 'none' }}
                onClick={() => changeLanguage('uk')}
              >
                Українська
              </DropdownMenuItem>
              <DropdownMenuItem
                style={{ cursor: 'pointer', padding: '8px', outline: 'none' }}
                onClick={() => changeLanguage('en')}
              >
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Кнопка чата */}
          <button className={styles.chatButton}>
            <MessageCircle className={styles.icon} />
            <span className={styles.chatText}>
              {locale === 'en' ? 'Online Chat' : 'Онлайн чат'}
            </span>
          </button>

          {/* Соцсети */}
          <div className={styles.socials}>
            <Facebook className={styles.icon} />
            <Youtube className={styles.icon} />
            <Instagram className={styles.icon} />
          </div>
        </div>
      </div>
    </header>
  )
}
