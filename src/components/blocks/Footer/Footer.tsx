'use client'
import React from 'react'
import Link from 'next/link'
import { Facebook, Youtube, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react'
import styles from './Footer.module.scss'

interface FooterProps {
  // Текстовые данные из Payload (локализованные поля)
  description?: any
  address?: any
  phone?: string | null
  email?: string | null

  // Заголовки колонок (для ручного ввода)
  menuTitle?: any
  contactTitle?: any
  socialTitle?: any
  copyrightText?: any

  // Соцсети и ссылки
  socials?: {
    facebook?: string | null
    youtube?: string | null
    instagram?: string | null
  } | null

  // Массив ссылок, как в Header
  navItems?: { label: any; link: string }[]

  locale: string
}

export function Footer({
  description,
  phone,
  email,
  address,
  menuTitle,
  contactTitle,
  socialTitle,
  copyrightText,
  socials,
  navItems,
  locale,
}: FooterProps) {
  // Универсальная функция перевода
  const t = (field: any, fallback: string = ''): string => {
    if (!field) return fallback
    if (typeof field === 'object') {
      return field[locale] || field.uk || field.en || Object.values(field)[0] || fallback
    }
    return String(field)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* 1. Лого и описание */}
          <div>
            <div className={styles.logoBlock}>
              <div className={styles.logoText}>NEW WAY</div>
              <div className={styles.logoSub}>TRAVEL</div>
            </div>
            <p className={styles.description}>{t(description)}</p>
          </div>

          {/* 2. Динамическое меню */}
          <div>
            <h3 className={styles.heading}>{t(menuTitle, locale === 'en' ? 'Menu' : 'Меню')}</h3>
            <nav className={styles.nav}>
              {navItems?.map((item, idx) => (
                <Link key={idx} href={`/${locale}${item.link}`} className={styles.navLink}>
                  {t(item.label)}
                </Link>
              )) || (
                // Запасной вариант, если navItems не передан
                <>
                  <Link href={`/${locale}`} className={styles.navLink}>
                    {locale === 'en' ? 'Home' : 'Головна'}
                  </Link>
                  <Link href={`/${locale}/tours`} className={styles.navLink}>
                    {locale === 'en' ? 'Tours' : 'Тури'}
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* 3. Контакты */}
          <div>
            <h3 className={styles.heading}>
              {t(contactTitle, locale === 'en' ? 'Contact Us' : "Зворотній зв'язок")}
            </h3>
            <div className={styles.contact}>
              {phone && (
                <a href={`tel:${phone}`} className={styles.contactItem}>
                  <Phone className={styles.icon} />
                  <span>{phone}</span>
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className={styles.contactItem}>
                  <Mail className={styles.icon} />
                  <span>{email}</span>
                </a>
              )}
              {address && (
                <div className={styles.contactItem}>
                  <MapPin className={styles.icon} />
                  <span>{t(address)}</span>
                </div>
              )}
            </div>
          </div>

          {/* 4. Соцсети */}
          <div>
            <h3 className={styles.heading}>
              {t(socialTitle, locale === 'en' ? 'Social Media' : 'Соціальні мережі')}
            </h3>
            <div className={styles.socials}>
              {socials?.facebook && (
                <a href={socials.facebook} target="_blank" className={styles.socialLink}>
                  <Facebook className={styles.socialIcon} />
                </a>
              )}
              {socials?.instagram && (
                <a href={socials.instagram} target="_blank" className={styles.socialLink}>
                  <Instagram className={styles.socialIcon} />
                </a>
              )}
              {socials?.youtube && (
                <a href={socials.youtube} target="_blank" className={styles.socialLink}>
                  <Youtube className={styles.socialIcon} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          © {new Date().getFullYear()} New Way Travel.{' '}
          {t(copyrightText, locale === 'en' ? 'All rights reserved.' : 'Всі права захищені.')}
        </div>
      </div>
    </footer>
  )
}
