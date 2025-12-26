'use client'

import { useState } from 'react'
import styles from './TripItinerary.module.scss'
import { Tour } from '@/app/(frontend)/[locale]/tours/[tourId]/TourDetailClient'
import { ChevronDown } from 'lucide-react'
import { RichText } from '../RichText'

interface Props {
  tour: Tour
  locale: 'uk' | 'en'
}

export default function TripItinerary({ tour, locale }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(0)

  // Базовый URL сервера из окружения или пустая строка
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''

  if (!tour || !tour.itinerary || !Array.isArray(tour.itinerary)) return null

  return (
    <section className={styles.wrapper}>
      <div className={styles.accordion}>
        {tour.itinerary.map((day, idx) => {
          const isOpen = openDay === idx
          const hasImages = day.images && Array.isArray(day.images) && day.images.length > 0

          return (
            <div key={day.id || idx} className={`${styles.card} ${isOpen ? styles.open : ''}`}>
              <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpenDay(isOpen ? null : idx)}
              >
                <span className={styles.dayTitle}>
                  {day.dayTitle || `${locale === 'en' ? 'Day' : 'День'} ${idx + 1}`}
                </span>
                <ChevronDown
                  size={20}
                  className={`${styles.icon} ${isOpen ? styles.rotate : ''}`}
                />
              </button>

              <div className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}>
                <div className={styles.inner}>
                  {day.content && (
                    <div className={styles.textContent}>
                      <RichText content={day.content} />
                    </div>
                  )}
                  {hasImages && (
                    <div className={styles.imageGrid}>
                      {day.images?.map((img) => {
                        const image = img.image
                        if (!image?.url) return null

                        return (
                          <div key={img.id} className={styles.imageWrapper}>
                            <img
                              src={`${serverUrl}${image.url}`}
                              alt={image.alt || ''}
                              className={styles.itineraryImage}
                              loading="lazy"
                              onError={() =>
                                console.error('Не удалось загрузить:', `${serverUrl}${image.url}`)
                              }
                            />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
