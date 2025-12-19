// src/components/blocks/Footer/Footer.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import { Facebook, Youtube, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react'
import styles from './Footer.module.scss'

interface FooterProps {
  description?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  hours?: string | null
  socials?: {
    facebook?: string | null
    youtube?: string | null
    instagram?: string | null
  } | null
  locale: string // Добавляем обязательный пропс locale
}

// Используем деструктуризацию: ({ description, phone, ... })
export function Footer({
  description,
  phone,
  email,
  address,
  hours,
  socials,
  locale,
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo and Description */}
          <div>
            <div className={styles.logoBlock}>
              <div className={styles.logoText}>NEW WAY</div>
              <div className={styles.logoSub}>TRAVEL</div>
            </div>
            <p className={styles.description}>{description || ''}</p>
          </div>

          {/* Menu */}
          <div>
            <h3 className={styles.heading}>{locale === 'en' ? 'Menu' : 'Меню'}</h3>
            <nav className={styles.nav}>
              {/* Добавляем префикс локали к ссылкам */}
              <Link href={`/${locale}`} className={styles.navLink}>
                {locale === 'en' ? 'Home' : 'Головна'}
              </Link>
              <Link href={`/${locale}/tours`} className={styles.navLink}>
                {locale === 'en' ? 'Tour Calendar' : 'Календар турів'}
              </Link>
              <Link href={`/${locale}/about`} className={styles.navLink}>
                {locale === 'en' ? 'About Us' : 'Про нас'}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className={styles.heading}>
              {locale === 'en' ? 'Contact Us' : "Зворотній зв'язок"}
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
                  <span>{address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className={styles.heading}>
              {locale === 'en' ? 'Social Media' : 'Соціальні мережі'}
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
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          © {new Date().getFullYear()} New Way Travel.{' '}
          {locale === 'en' ? 'All rights reserved.' : 'Всі права захищені.'}
        </div>
      </div>
    </footer>
  )
}
