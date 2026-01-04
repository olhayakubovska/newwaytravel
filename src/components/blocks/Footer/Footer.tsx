'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Youtube, Instagram, Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import styles from './Footer.module.scss'

interface FooterProps {
  description?: any
  address?: any
  phone?: string | null
  email?: string | null
  hours?: any // Добавлено

  menuTitle?: any
  contactTitle?: any
  socialTitle?: any
  copyrightText?: any

  socials?: {
    facebook?: string | null
    youtube?: string | null
    instagram?: string | null
    telegram?: string | null
  } | null

  navItems?: { label: any; link: string }[]
  locale: string
}

export function Footer({
  description,
  phone,
  email,
  address,
  hours,
  menuTitle,
  contactTitle,
  socialTitle,
  copyrightText,
  socials,
  navItems,
  locale,
}: FooterProps) {
  const t = (field: any, fallback: string = ''): string => {
    if (!field) return fallback
    if (typeof field === 'object') {
      return field[locale] || field.uk || field.en || Object.values(field)[0] || fallback
    }
    return String(field)
  }

  console.log(navItems, 'navItems')

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <div className={styles.logoBlock}>
              <div className={styles.logoText}>NEW WAY</div>
              <div className={styles.logoSub}>TRAVEL</div>
            </div>
            <p className={styles.description}>{t(description)}</p>
          </div>

          <div>
            <h3 className={styles.heading}>{t(menuTitle, 'Меню')}</h3>
            <nav className={styles.nav}>
              {navItems?.map((item, idx) => (
                <Link key={idx} href={`/${locale}${item.link}`} className={styles.navLink}>
                  {t(item.label)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className={styles.heading}>{t(contactTitle, "Зворотній зв'язок")}</h3>
            <div className={styles.contact}>
              {phone && (
                <a href={`tel:${phone}`} className={styles.contactItem}>
                  <Phone size={18} className={styles.icon} />
                  <span>{phone}</span>
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className={styles.contactItem}>
                  <Mail size={18} className={styles.icon} />
                  <span>{email}</span>
                </a>
              )}
              {address && (
                <div className={styles.contactItem}>
                  <MapPin size={18} className={styles.icon} />
                  <span>{t(address)}</span>
                </div>
              )}
              {hours && (
                <div className={styles.contactItem}>
                  <Clock size={18} className={styles.icon} />
                  <span>{t(hours)}</span>
                </div>
              )}
            </div>
          </div>

          {/* 4. Соцсети */}
          <div>
            <h3 className={styles.heading}>{t(socialTitle, 'Соціальні мережі')}</h3>
            <div className={styles.socials}>
              {socials?.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Facebook size={20} />
                </a>
              )}
              {socials?.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Instagram size={20} />
                </a>
              )}
              {socials?.youtube && (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Youtube size={20} />
                </a>
              )}
              {socials?.telegram && (
                <a
                  href={socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Send size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <div className={styles.divider} />
          <p>
            NEW WAY TRAVEL © 2011 — {new Date().getFullYear()} UA.{' '}
            {t(copyrightText, 'Всі права захищені.')}
          </p>
        </div>
      </div>
    </footer>
  )
}
