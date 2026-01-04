'use client'

import React from 'react'
import styles from './TripDetails.module.scss'
import { RichText } from '@/components/blocks/ui/RichText'
import { Locale } from '@/app/(frontend)/[locale]/page'
import { Tour } from '@/payload-types'

interface Props {
  tour: Tour
  locale: Locale
}

export default function TripDetails({ tour, locale }: Props) {
  const t = (field: any) => {
    if (!field) return ''
    if (typeof field === 'object' && field.root) return field
    return typeof field === 'object' ? field[locale] || field.uk || field.en : field
  }

  const details = tour.tripDetailsCard

  return (
    <div className={styles.mainCard}>
      <div className={styles.contentGrid}>
        <div className={styles.mainInfo}>
          <div className={styles.infoBlock}>
            <span className={styles.label}>{locale === 'en' ? 'DATES' : 'ДАТИ'}</span>
            <div className={styles.value}>{t(tour.duration)}</div>
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
              {details?.bookingConditions && (
                <RichText
                  content={details.bookingConditions[locale] || details.bookingConditions}
                />
              )}
              {details?.bookingNote && <small>{t(details.bookingNote)}</small>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
