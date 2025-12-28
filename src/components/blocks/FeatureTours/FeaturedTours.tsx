'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react'
import styles from './FeaturedTours.module.scss'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Tour, Media } from '@/payload-types'

interface LocalizedString {
  uk?: string
  en?: string
  ru?: string
}

interface FeaturedToursProps {
  title?: LocalizedString
  selectedTours: Tour[]
  allToursLabel?: LocalizedString
  detailsLabel?: LocalizedString
}

export function FeaturedTours({
  title,
  selectedTours,
  allToursLabel,
  detailsLabel,
}: FeaturedToursProps) {
  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  const t = (field?: LocalizedString | string | null): string => {
    if (!field) return ''
    if (typeof field === 'object') {
      return field[locale] || field['uk'] || Object.values(field)[0] || ''
    }
    return String(field)
  }

  const getImageUrl = (image?: string | Media | null) => {
    if (!image) return '/placeholder-tour.jpg'
    if (typeof image === 'string') return image
    return image.url || '/placeholder-tour.jpg'
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t(title)}</h2>
          <Link href={`/${locale}/tours`} className={styles.calendarLink}>
            {t(allToursLabel)} <ArrowRight size={18} />
          </Link>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={3}
          pagination={{ clickable: true }}
          className={styles.swiper}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {selectedTours.map((tour, index) => {
            const tourId = tour.id

            return (
              <SwiperSlide key={tourId}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/tours/${tourId}`} className={styles.cardLink}>
                    <div className={styles.card}>
                      <div className={styles.imageWrapper}>
                        <img
                          src={getImageUrl(tour.mainImage)}
                          alt={t(tour.name)}
                          className={styles.image}
                        />
                        <div className={styles.priceTag}>{tour.price}€</div>
                      </div>

                      <div className={styles.content}>
                        <h3 className={styles.cardTitle}>{t(tour.name)}</h3>

                        <div className={styles.infoGrid}>
                          {tour.location && (
                            <div className={styles.infoRow}>
                              <MapPin size={14} />
                              <span>{t(tour.location)}</span>
                            </div>
                          )}
                          {tour.startDate && (
                            <div className={styles.infoRow}>
                              <Calendar size={14} />
                              <span>{tour.startDate}</span>
                            </div>
                          )}
                          {tour.duration && (
                            <div className={styles.infoRow}>
                              <Clock size={14} />
                              <span>{tour.duration}</span>
                            </div>
                          )}
                        </div>

                        {detailsLabel && (
                          <div className={styles.footer}>
                            <span className={styles.detailsText}>{t(detailsLabel)} →</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
