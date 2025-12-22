'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Plus } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/blocks/ui/Tabs/Tabs'
import { BookingModal } from '@/components/blocks/BookingModal/BookingModal'
import styles from './TourDetailPage.module.scss'

export default function TourDetailClient({ tour }: { tour: any }) {
  const [consultationOpen, setConsultationOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  // 1. Получаем текущую локаль из параметров URL
  const params = useParams()
  const locale = (params?.locale as 'uk' | 'en') || 'uk'

  // 2. Универсальная функция локализации данных из Payload
  const t = (field: any) => {
    if (field && typeof field === 'object') {
      // Выбираем значение на текущем языке, либо берем украинский как запасной
      return field[locale] || field['uk'] || field['en'] || ''
    }
    return field || ''
  }

  // 3. Словарь для перевода статичного интерфейса страницы
  const i18n = {
    infoTitle: locale === 'en' ? 'Tour Information:' : 'Інформація про тур:',
    bookBtn: locale === 'en' ? 'Book Now' : 'Забронювати',
    consultBtn: locale === 'en' ? 'Consultation' : 'Консультація',
    priceLabel: locale === 'en' ? 'Cost' : 'Вартість',
    groupLabel: locale === 'en' ? 'Group Size' : 'Розмір групи',
    durationLabel: locale === 'en' ? 'Duration' : 'Тривалість',
    bookingTitle: locale === 'en' ? 'Tour Booking*' : 'Бронь тура*',
    bookingNote: locale === 'en' ? 'Advance — 50% / Person' : 'Аванс — 50% / Людина',
    smallNote:
      locale === 'en'
        ? '*Deposit is non-refundable. The second part is paid upon arrival.'
        : '*Передоплата не повертається. Другу частину вносять в аеропорту після прильоту.',
    installment: locale === 'en' ? '→ Installment plan' : '→ Розстрочка на тур',
    tabs: {
      program: locale === 'en' ? 'Program' : 'Програма туру',
      details: locale === 'en' ? 'Details' : 'Деталі',
      day: locale === 'en' ? 'Day' : 'День',
    },
  }

  return (
    <main className={styles.wrapper}>
      {/* 1. БАННЕР (HERO) */}
      <section className={styles.hero}>
        <div className={styles.imageContainer}>
          <img
            src={tour.mainImage?.url}
            alt={t(tour.name)}
            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
          />
        </div>
        <div className={styles.heroContent}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {t(tour.name) || t(tour.title)}
          </motion.h1>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.btn} ${styles.primary}`}
              onClick={() => setBookingOpen(true)}
            >
              {i18n.bookBtn}
            </button>
            <button
              className={`${styles.btn} ${styles.secondary}`}
              onClick={() => setConsultationOpen(true)}
            >
              {i18n.consultBtn}
            </button>
          </div>
        </div>
      </section>

      {/* 2. ОСНОВНАЯ СЕТКА */}
      <div className={styles.mainGrid}>
        {/* Левая часть (Контент) */}
        <section>
          <div className={styles.card}>
            <h2>{i18n.infoTitle}</h2>
            <div className={styles.description}>
              {/* Рендерим HTML описание, используя перевод */}
              <div
                dangerouslySetInnerHTML={{ __html: t(tour.descriptionHtml) || t(tour.description) }}
              />
            </div>
            <button
              className={`${styles.btn} ${styles.primary}`}
              style={{ marginTop: '20px' }}
              onClick={() => setBookingOpen(true)}
            >
              {i18n.bookBtn}
            </button>
          </div>

          <div className={styles.tabsWrapper}>
            <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className={styles.customTabsList}>
                <TabsTrigger value="itinerary" className={styles.customTrigger}>
                  {i18n.tabs.program}
                </TabsTrigger>
                <TabsTrigger value="details" className={styles.customTrigger}>
                  {i18n.tabs.details}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="itinerary">
                <div className={styles.program}>
                  {/* Здесь предполагается массив программы из базы, пока статика */}
                  {[1, 2, 3, 4, 5, 6].map((day) => (
                    <div key={day} className={styles.programDay}>
                      <span>
                        {i18n.tabs.day} {day}
                      </span>
                      <Plus size={18} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details">
                <div className={styles.card}>
                  <p>{t(tour.additionalInfo) || '...'}</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Правая часть (Боковая панель) */}
        <aside>
          <div className={styles.sideCard}>
            <div className={styles.badge}>50€ для ЗСУ</div>
            <div className={styles.label}>{i18n.priceLabel}</div>
            <div className={styles.value}>{tour.price}€</div>
          </div>

          <div className={styles.sideCard}>
            <div className={styles.label}>{i18n.groupLabel}</div>
            <div className={styles.value}>{t(tour.groupSize)}</div>
          </div>

          <div className={styles.sideCard}>
            <div className={styles.label}>{i18n.durationLabel}</div>
            <div className={styles.value}>{t(tour.duration)}</div>
          </div>

          <div className={`${styles.sideCard} ${styles.highlight}`}>
            <div className={styles.label} style={{ color: '#f9a825' }}>
              {i18n.bookingTitle}
            </div>
            <div className={styles.value}>{i18n.bookingNote}</div>
            <p className={styles.smallNote}>{i18n.smallNote}</p>
          </div>

          <div className={styles.sideCard} style={{ cursor: 'pointer', textAlign: 'center' }}>
            <span className={styles.installmentLink}>{i18n.installment}</span>
          </div>
        </aside>
      </div>

      {/* Модальные окна */}
      {bookingOpen && (
        <BookingModal tourName={t(tour.name)} onClose={() => setBookingOpen(false)} />
      )}
    </main>
  )
}
