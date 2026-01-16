'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, Clock, Users, ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import styles from './FeaturedTours.module.scss'
import { Tour, Media, Config } from '@/payload-types'

type Locale = Config['locale']

interface FeaturedToursProps {
  title?: any
  selectedTours: (string | Tour)[]
  allToursLabel?: any
  detailsLabel?: any
}

export function FeaturedTours({
  title,
  selectedTours,
  allToursLabel,
  detailsLabel,
}: FeaturedToursProps) {
  const params = useParams()
  const locale = (params?.locale as Locale) || 'uk'

  const [openDatesId, setOpenDatesId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<{ [key: string]: string }>({})

  // Функция для безопасного извлечения строки из локализованного объекта
  const t = (field: any): string => {
    if (!field) return ''
    if (typeof field === 'string') return field
    if (typeof field === 'object') {
      return field[locale] || field['uk'] || field['en'] || ''
    }
    return String(field)
  }

  const getImageUrl = (image?: string | Media | null) => {
    if (!image || typeof image === 'string') return '/placeholder-tour.jpg'
    return image.url || '/placeholder-tour.jpg'
  }
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Хедер секції */}
        {/* <div className={styles.header}>
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
        </div> */}
        <div className={styles.header}>
          {/* Пустий блок для балансу сітки зліва (grid-column: 1) */}
          <div />

          {/* Заголовок по центру (grid-column: 2) */}
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>{t(title)}</h2>
            <div className={styles.titleUnderline} />
          </div>

          {/* Кругла кнопка справа (grid-column: 3) */}
          <Link href={`/${locale}/tours`} className={styles.allToursLink}>
            <span>{t(allToursLabel)}</span> {/* Текст сховається через CSS */}
            <div className={styles.iconCircle}>
              <ArrowRight size={28} />
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
          {selectedTours.map((tourItem) => {
            if (typeof tourItem === 'string') return null
            const tour = tourItem as Tour
            const isDropdownOpen = openDatesId === tour.id
            const currentSelectedDate = selectedDate[tour.id] || ''

            return (
              <SwiperSlide key={tour.id}>
                <motion.div className={styles.card}>
                  {/* Верхня частина: Картинка + Опис при ховері */}
                  <Link href={`/${locale}/tours/${tour.slug}`} className={styles.imageLink}>
                    <div className={styles.imageWrapper}>
                      <img
                        src={getImageUrl(tour.mainImage)}
                        alt={t(tour.name)}
                        className={styles.image}
                      />
                      <div className={styles.category}>{t(tour.category)}</div>

                      {/* Оверлей з описом, який з'являється при hover */}
                      <div className={styles.descriptionOverlay}>
                        <p className={styles.shortDescHover}>{t(tour.shortDescription)}</p>
                      </div>
                    </div>
                  </Link>

                  {/* Контент під картинкою */}
                  <div className={styles.content}>
                    <h3 className={styles.cardTitle}>{t(tour.name)}</h3>

                    <div className={styles.infoGrid}>
                      <div className={styles.infoItem}>
                        <MapPin size={16} />
                        <span>{t(tour.location)}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <Clock size={16} />
                        <span>
                          {t((tour as any).duration) || '—'} {locale === 'en' ? 'days' : 'дн.'}
                        </span>
                      </div>
                      <div className={styles.infoItem}>
                        <Users size={16} />
                        <span>{t(tour.groupSize)}</span>
                      </div>

                      {/* Селектор дат */}
                      <div className={styles.infoItem}>
                        <Calendar size={16} />
                        <div className={styles.datesWrapper}>
                          <button
                            className={styles.datesToggle}
                            onClick={(e) => {
                              e.preventDefault()
                              setOpenDatesId(isDropdownOpen ? null : tour.id)
                            }}
                          >
                            <span>
                              {currentSelectedDate
                                ? currentSelectedDate.split(' - ')[0]
                                : locale === 'en'
                                  ? 'Dates'
                                  : 'Дати'}
                            </span>
                            <ChevronDown
                              size={14}
                              className={isDropdownOpen ? styles.rotate : ''}
                            />
                          </button>
                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={styles.datesDropdown}
                              >
                                {tour.tourDates?.map((dateObj: any, idx: number) => {
                                  const dateText = t(dateObj.dateRange)
                                  return (
                                    <div
                                      key={idx}
                                      className={styles.dateOption}
                                      onClick={() => {
                                        setSelectedDate({ ...selectedDate, [tour.id]: dateText })
                                        setOpenDatesId(null)
                                      }}
                                    >
                                      <span>{dateText}</span>
                                    </div>
                                  )
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    <div className={styles.priceSection}>
                      <span className={styles.priceValue}>{tour.price}€</span>
                      <Link href={`/${locale}/tours/${tour.slug}`} className={styles.detailsBtn}>
                        {t(detailsLabel) || (locale === 'en' ? 'Details' : 'Деталі')}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
