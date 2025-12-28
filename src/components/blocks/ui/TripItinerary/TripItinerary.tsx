'use client'

import { useState } from 'react'
import styles from './TripItinerary.module.scss'
import { ChevronDown } from 'lucide-react'
import { RichText } from '../RichText'
import { Tour } from '@/payload-types'
import { Locale } from '@/app/(frontend)/[locale]/page'
import Image from 'next/image'

interface Props {
  tour: Tour
  locale: Locale
}

export default function TripItinerary({ tour, locale }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(0)

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
                        if (!img.image) return null

                        // безопасный src
                        const src =
                          typeof img.image === 'object'
                            ? img.image.url || '/placeholder.jpg'
                            : img.image || '/placeholder.jpg'

                        // безопасный alt
                        const alt = typeof img.image === 'object' ? img.image.alt || '' : ''

                        return (
                          <div key={img.id || src} className={styles.imageWrapper}>
                            <Image
                              src={src}
                              alt={alt}
                              width={400}
                              height={300}
                              className={styles.image}
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
