'use client'

import React from 'react'
import styles from './TripDetails.module.scss'
import { Tour } from '@/app/(frontend)/[locale]/tours/[tourId]/TourDetailClient'
import { RichText } from '@/components/blocks/ui/RichText'

interface Props {
  tour: Tour
  locale: 'uk' | 'en'
}

export default function TripDetails({ tour, locale }: Props) {
  const t = (field: any) => {
    if (!field) return ''
    return typeof field === 'object' ? field[locale] || field.uk || field.en : field
  }

  const details = tour.tripDetails

  return (
    <div className={styles.mainCard}>
      <div className={styles.contentGrid}>
        <div className={styles.mainInfo}>
          <div className={styles.infoBlock}>
            <span className={styles.label}>{locale === 'en' ? 'DATES' : 'ДАТИ'}</span>
            <div className={styles.value}>{t(details?.dates) || t(tour.duration)}</div>
          </div>

          <div className={styles.infoBlock}>
            <span className={styles.label}>{locale === 'en' ? 'PRICE' : 'ВАРТІСТЬ'}</span>
            <div className={styles.priceWrapper}>
              <div className={styles.priceValue}>{tour.price}€</div>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <span className={styles.label}>{locale === 'en' ? 'GROUP SIZE' : 'РОЗМІР ГРУПИ'}</span>
            <div className={styles.value}>{t(tour.groupSize)}</div>
          </div>

          <div className={`${styles.infoBlock} ${styles.bookingSection}`}>
            <span className={styles.label} style={{ color: '#fcb12d' }}>
              {locale === 'en' ? 'BOOKING*' : 'БРОНЬ ТУРА*'}
            </span>
            <div className={styles.bookingText}>
              <RichText content={details?.bookingConditions} />
              {details?.bookingNote && <small>{t(details.bookingNote)}</small>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
