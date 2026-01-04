'use client'

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  MapPin,
  Clock,
  Users as UsersIcon,
  Calendar,
  ShoppingCart,
  ChevronDown,
} from 'lucide-react'
import styles from './TourCard.module.scss'

interface TourCardProps {
  id: any
  image: string
  title: any
  destination: any
  duration: any
  groupSize: any
  price: any
  alt: any
  category?: any
  description?: any
  startDate?: string
}

export function TourCard({
  id,
  image,
  title,
  destination,
  duration,
  groupSize,
  price,
  alt,
  category,
  description,
  startDate,
}: TourCardProps) {
  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  const getText = (field: any): string => {
    if (!field) return ''
    if (typeof field === 'object') {
      return field[locale] || field['uk'] || field['en'] || ''
    }
    return String(field)
  }

  // Красивое форматирование месяца
  const formatMonth = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const month = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date)
    return month.charAt(0).toUpperCase() + month.slice(1).replace('.', '')
  }

  const tourId = typeof id === 'object' ? id[locale] || id['uk'] : id

  const t = {
    details: locale === 'en' ? 'Details' : locale === 'ru' ? 'Детали' : 'Деталі',
  }

  return (
    <Link href={`/${locale}/tours/${tourId}`} className={styles.cardLink}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={styles.card}
      >
        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt={getText(alt) || getText(title)}
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.titleOverlay}>
            <h3 className={styles.title}>{getText(title)}</h3>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.category}>{getText(category)}</div>

          <p className={styles.description}>
            {getText(description) ||
              (locale === 'en'
                ? 'Untouched nature and authentic experiences'
                : 'Природа поза часом та неймовірні пригоди')}
          </p>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <MapPin size={17} className={styles.icon} />
              <span className={styles.truncate}>{getText(destination)}</span>
            </div>

            <div className={styles.infoItem}>
              <Calendar size={17} className={styles.icon} />
              <div className={styles.dateWrapper}>
                <span>20.01 - 27.01</span>
                <ChevronDown size={14} className={styles.chevron} />
              </div>
            </div>

            <div className={styles.infoItem}>
              <Calendar size={17} className={styles.icon} />
              <span>{formatMonth(startDate)}</span>
            </div>

            <div className={styles.infoItem}>
              <UsersIcon size={17} className={styles.icon} />
              <span>{getText(groupSize)}</span>
            </div>

            <div className={styles.infoItem}>
              <Clock size={17} className={styles.icon} />
              <span>{getText(duration)}</span>
            </div>

            <div className={styles.infoItem}>
              <ShoppingCart size={17} className={styles.icon} />
              <span className={styles.priceHighlight}>{price}€</span>
            </div>
          </div>

          <div className={styles.footer}>
            <button className={styles.detailsBtn}>{t.details}</button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
