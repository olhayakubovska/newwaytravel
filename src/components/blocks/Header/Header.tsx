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

  const getText = (field: any): string => {
    if (typeof field === 'object' && field !== null) {
      return field[locale] || field['uk'] || field['en'] || ''
    }
    return typeof field === 'string' ? field : ''
  }

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  const defaultNavItems = [
    {
      label: { uk: 'ГОЛОВНА', en: 'HOME' },
      link: '/',
    },
    {
      label: { uk: 'КАЛЕНДАР ТУРІВ', en: 'TOUR CALENDAR' },
      link: '/tours',
    },
    {
      label: { uk: 'ПРО НАС', en: 'ABOUT US' },
      link: '/about',
    },
  ]

  const navigation = navItems && navItems.length > 0 ? navItems : defaultNavItems

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={`/${locale}`} className={styles.logo}>
          {getText(logoText) || 'NEW WAY'}
        </Link>

        <nav className={styles.nav}>
          {navigation.map((item: any, idx: number) => (
            <Link
              key={item.id || `nav-${idx}`}
              href={`/${locale}${item.link.startsWith('/') ? item.link : '/' + item.link}`}
              className={styles.navLink}
            >
              {getText(item.label)}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={styles.chatButton}>
            <MessageCircle className={styles.icon} />
            <span className={styles.chatText}>
              {locale === 'en' ? 'ONLINE CHAT' : 'ОНЛАЙН ЧАТ'}
            </span>
          </button>

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
        <div className={styles.socialsLeft}>
          <Facebook className={styles.icon} />
          <Youtube className={styles.icon} />
          <Send className={styles.icon} />
          <Instagram className={styles.icon} />
        </div>
      </div>
    </header>
  )
}
