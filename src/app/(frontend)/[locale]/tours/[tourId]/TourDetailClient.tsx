'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { BookingModal } from '@/components/blocks/modal/BookingModal/BookingModal'
import { ConsultationModal } from '@/components/blocks/modal/ConsultationModal/ConsultationModal'
import styles from './TourDetailPage.module.scss'
import { RichText } from '@/components/blocks/ui/RichText'

interface Tour {
  name: any
  mainImage?: { url: string }
  description?: any
  price: number
  groupSize?: any
  duration?: any
  itinerary?: any[]
  leaders?: any[]
}

export default function TourDetailClient({ tour, locale }: { tour: Tour; locale: 'uk' | 'en' }) {
  const [consultationOpen, setConsultationOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [openDay, setOpenDay] = useState<number | null>(0)

  const t = (field: any) => {
    if (typeof field === 'object' && field !== null) {
      return field[locale] || field.uk || field.en || ''
    }
    return field || ''
  }

  return (
    <main className={styles.wrapper}>
      {/* 1. HERO БАННЕР */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${tour.mainImage?.url || ''})` }}
      >
        <div className={styles.heroContent}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {t(tour.name)}
          </motion.h1>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.btn} ${styles.primary}`}
              onClick={() => setBookingOpen(true)}
            >
              {locale === 'en' ? 'Book Now' : 'Забронювати'}
            </button>
            <button
              className={`${styles.btn} ${styles.secondary}`}
              onClick={() => setConsultationOpen(true)}
            >
              {locale === 'en' ? 'Consultation' : 'Консультація'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. ИНФОРМАЦИЯ И САЙДБАР */}
      <div className={styles.mainGrid}>
        <section>
          <div className={styles.card}>
            <h2>{locale === 'en' ? 'Tour Information:' : 'Інформація про тур:'}</h2>
            <div className={styles.description}>
              <RichText content={tour.description} />
            </div>
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <div className={styles.badge}>50€ для ЗСУ</div>
            <div className={styles.label}>{locale === 'en' ? 'Cost' : 'Вартість'}</div>
            <div className={styles.value}>{tour.price}€</div>
          </div>
          <div className={styles.sideCard}>
            <div className={styles.label}>{locale === 'en' ? 'Group Size' : 'Розмір групи'}</div>
            <div className={styles.value}>{t(tour.groupSize)}</div>
          </div>
          <div className={styles.sideCard}>
            <div className={styles.label}>{locale === 'en' ? 'Duration' : 'Тривалість'}</div>
            <div className={styles.value}>{t(tour.duration)}</div>
          </div>
          <div className={`${styles.sideCard} ${styles.highlight}`}>
            <div className={styles.label} style={{ color: '#f9a825' }}>
              Бронь тура*
            </div>
            <div className={styles.value}>Аванс — 50% / Людина</div>
            <p className={styles.smallNote}>*Передоплата не повертається.</p>
          </div>
        </aside>
      </div>

      {/* 3. ПРОГРАММА ТУРА (Как на фото) */}
      <section className={styles.programSection}>
        <h2 className={styles.sectionTitle}>
          {locale === 'en' ? 'Tour Program' : 'Програма туру'}
        </h2>
        <div className={styles.programLayout}>
          {/* Левая карточка консультации */}
          <div className={styles.consultCard}>
            <h3>Тільки найяскравіші враження!</h3>
            <p>New Way зробить кожен день вашої подорожі незабутнім.</p>
            <button className={styles.orangeBtn} onClick={() => setConsultationOpen(true)}>
              Консультація
            </button>
          </div>

          {/* Правая часть — Аккордеон */}
          <div className={styles.accordionContainer}>
            {tour.itinerary?.map((day: any, idx: number) => (
              <div key={idx} className={styles.dayItem}>
                <div
                  className={styles.dayHeader}
                  onClick={() => setOpenDay(openDay === idx ? null : idx)}
                >
                  <span>{day.dayTitle || `День ${idx + 1}`}</span>
                  <Plus className={openDay === idx ? styles.rotate : ''} />
                </div>
                <AnimatePresence>
                  {openDay === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className={styles.dayContent}
                    >
                      <RichText content={day.content} />
                      <div className={styles.dayImages}>
                        {day.images?.map((imgObj: any, i: number) => (
                          <img key={i} src={imgObj.image?.url} alt="Travel" />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.leaderSection}>
        <h2 className={styles.sectionTitle}>
          {locale === 'en' ? 'Route & Team' : 'Карта турлідер'}
        </h2>
        {/* <div className={styles.mapPlaceholder}>
            <h3>Маршрут Туру</h3>
            <button className={styles.orangeBtn} onClick={() => setBookingOpen(true)}>
              Забронювати
            </button>
          </div> */}

        {/* Список лидеров */}
        <div className={styles.leadersWrapper}>
          {tour.leaders?.map((leader, index) => (
            <div key={index} className={styles.leaderCard}>
              <div className={styles.leaderHeader}>{leader.name}</div>
              <img src={leader.photo?.url} alt={leader.name} className={styles.leaderImg} />
              <div className={styles.leaderFooter}>
                <strong>{t(leader.role)}</strong>
                <p>{t(leader.bio)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {bookingOpen && (
        <BookingModal tourName={t(tour.name)} onClose={() => setBookingOpen(false)} />
      )}
      {consultationOpen && (
        <ConsultationModal locale={locale} onClose={() => setConsultationOpen(false)} />
      )}
    </main>
  )
}
