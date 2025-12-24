'use client'

import styles from './TripDetails.module.scss'
import { Tour } from '@/app/(frontend)/[locale]/tours/[tourId]/TourDetailClient'

interface Props {
  tour: Tour
  locale: 'uk' | 'en'
}

export default function TripDetails({ tour, locale }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {/* DETAILS CARD */}
        <div className={styles.card}>
          <div className={styles.details}>
            {tour.duration && (
              <div className={styles.item}>
                <p className={styles.label}>{locale === 'en' ? 'Dates' : 'ДАТИ'}</p>
                <p className={styles.value}>{tour.duration}</p>
              </div>
            )}

            {tour.price && (
              <div className={styles.item}>
                <p className={styles.label}>{locale === 'en' ? 'Price' : 'ВАРТІСТЬ'}</p>
                <p className={styles.value}>{tour.price}€</p>
              </div>
            )}

            {tour.groupSize && (
              <div className={styles.item}>
                <p className={styles.label}>{locale === 'en' ? 'Group size' : 'РОЗМІР ГРУПИ'}</p>
                <p className={styles.value}>{tour.groupSize}</p>
              </div>
            )}

            {tour.duration && (
              <div className={styles.item}>
                <p className={styles.label}>{locale === 'en' ? 'Duration' : 'ТРИВАЛІСТЬ'}</p>
                <p className={styles.value}>{tour.duration}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
