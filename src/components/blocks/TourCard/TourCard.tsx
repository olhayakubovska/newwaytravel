'use client'

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Clock, Users as UsersIcon } from 'lucide-react'
import styles from './TourCard.module.scss'
import { Button } from '@payloadcms/ui'

interface TourCardProps {
  id: any
  image: string
  title: any
  destination: any
  duration: any
  groupSize: any
  price: any
  alt: any
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

  const tourId = typeof id === 'object' ? id[locale] || id['uk'] : id

  return (
    <Link href={`/${locale}/tours/${tourId}`} className={styles.cardLink}>
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt={getText(alt) || getText(title)}
            className={styles.image}
            loading="lazy"
          />
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{getText(title)}</h3>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <MapPin className={styles.icon} />
              <span>{getText(destination)}</span>
            </div>

            <div className={styles.infoItem}>
              <Clock className={styles.icon} />
              <span>{getText(duration)}</span>
            </div>

            <div className={styles.infoItem}>
              <UsersIcon className={styles.icon} />
              <span>{getText(groupSize)}</span>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.priceContainer}>
              <span className={styles.priceLabel}>{locale === 'en' ? 'from' : 'від'}</span>
              <span className={styles.priceValue}>{getText(price)} €</span>
            </div>
            <Button className={styles.button}>{locale === 'en' ? 'Details' : 'Деталі'}</Button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
