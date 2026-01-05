'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Clock, ArrowRight, Users, ShoppingCart, ChevronDown } from 'lucide-react'
import styles from './FeaturedTours.module.scss'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Tour, Media, Config } from '@/payload-types'

type Locale = Config['locale']

interface LocalizedString {
  uk?: string
  en?: string
  ru?: string
}

interface FeaturedToursProps {
  title?: LocalizedString
  selectedTours: (string | Tour)[]
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
  const locale = (params?.locale as Locale) || 'uk'

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

  const formatMonth = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, { month: 'short' }).format(date)
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>{t(title)}</h2>
            <div className={styles.titleUnderline} />
          </div>
          <Link href={`/${locale}/tours`} className={styles.allToursLink}>
            <span>{t(allToursLabel)}</span>
            <div className={styles.iconCircle}>
              <ArrowRight size={24} />
            </div>
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
          {selectedTours.map((tourItem, index) => {
            if (typeof tourItem === 'string') return null
            const tour = tourItem as Tour

            return (
              <SwiperSlide key={tour.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/tours/${tour.id}`} className={styles.cardLink}>
                    <div className={styles.card}>
                      <div className={styles.imageWrapper}>
                        <img
                          src={getImageUrl(tour.mainImage)}
                          alt={t(tour.name)}
                          className={styles.image}
                        />
                        <div className={styles.titleOverlay}>
                          <h3 className={styles.cardTitle}>{t(tour.name)}</h3>
                        </div>
                      </div>

                      <div className={styles.content}>
                        <div className={styles.category}>{t(tour.category)}</div>

                        <p className={styles.shortDesc}>
                          {locale === 'en'
                            ? 'Unforgettable adventures and nature'
                            : 'Природа поза часом та неймовірні пригоди'}
                        </p>

                        <div className={styles.infoGrid}>
                          <div className={styles.infoItem}>
                            <MapPin size={16} className={styles.icon} />
                            <span>{t(tour.location)}</span>
                          </div>

                          {/* <div className={styles.infoItem}>
                            <Calendar size={16} className={styles.icon} />
                            <span>{formatMonth(tour.startDate)}</span>
                          </div> */}
                          <div className={styles.infoItem}>
                            <Users size={16} className={styles.icon} />
                            <span>{t(tour.groupSize)}</span>
                          </div>
                          <div className={styles.infoItem}>
                            <Clock size={16} className={styles.icon} />
                            <span>{t(tour.duration)}</span>
                          </div>
                          <div className={styles.infoItem}>
                            <ShoppingCart size={16} className={styles.icon} />
                            <span>{tour.price}€</span>
                          </div>
                        </div>

                        <div className={styles.footer}>
                          <button className={styles.detailsBtn}>
                            {t(detailsLabel) || (locale === 'en' ? 'Details' : 'Деталі')}
                          </button>
                        </div>
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

//                            {t(detailsLabel) || (locale === 'en' ? 'Details' : 'Деталі')}
