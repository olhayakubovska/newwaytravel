'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, Users as UsersIcon, Calendar, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import styles from './TourCard.module.scss'
import { Config } from '@/payload-types'

type Locale = Config['locale']

interface TourCardProps {
  id: string
  slug?: string
  image: string
  title: any
  destination: any
  duration?: any
  groupSize: any
  price: number | string
  category?: any
  description?: any
  tourDates?: any[]
}

export function TourCard({
  id,
  slug,
  image,
  title,
  destination,
  duration,
  groupSize,
  price,
  category,
  description,
  tourDates = [],
}: TourCardProps) {
  const params = useParams()
  const locale = (params?.locale as Locale) || 'uk'

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const t = (field: any): string => {
    if (!field) return ''
    if (typeof field === 'string') return field
    if (typeof field === 'object') {
      return field[locale] || field['uk'] || field['en'] || ''
    }
    return String(field)
  }

  const tourSlug = slug || id

  return (
    <motion.div className={styles.card}>
      <Link href={`/${locale}/tours/${tourSlug}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={t(title)} className={styles.image} loading="lazy" />

          <div className={styles.descriptionOverlay}>
            <p className={styles.shortDescHover}>{t(description)}</p>
          </div>
        </div>
      </Link>

      <div className={styles.content}>
        <h3 className={styles.cardTitle}>{t(title)}</h3>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <MapPin size={16} />
            <span className={styles.truncate}>{t(destination)}</span>
          </div>

          <div className={styles.infoItem}>
            <Clock size={16} />
            <span>
              {t(duration) || '—'} {locale === 'en' ? 'days' : 'дн.'}
            </span>
          </div>

          <div className={styles.infoItem}>
            <UsersIcon size={16} />
            <span>{t(groupSize)}</span>
          </div>

          <div className={styles.infoItem}>
            <Calendar size={16} />
            <div className={styles.datesWrapper}>
              <button
                className={styles.datesToggle}
                onClick={(e) => {
                  e.preventDefault()
                  setIsDropdownOpen(!isDropdownOpen)
                }}
              >
                <span>
                  {selectedDate ? selectedDate.split(' - ')[0] : locale === 'en' ? 'Dates' : 'Дати'}
                </span>
                <ChevronDown size={14} className={isDropdownOpen ? styles.rotate : ''} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={styles.datesDropdown}
                  >
                    {tourDates?.map((dateObj: any, idx: number) => {
                      const dateText = t(dateObj.dateRange)
                      return (
                        <div
                          key={idx}
                          className={styles.dateOption}
                          onClick={() => {
                            setSelectedDate(dateText)
                            setIsDropdownOpen(false)
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
          <span className={styles.priceValue}>{price}</span>
          <Link href={`/${locale}/tours/${tourSlug}`} className={styles.detailsBtn}>
            {locale === 'en' ? 'Details' : 'Деталі'}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
