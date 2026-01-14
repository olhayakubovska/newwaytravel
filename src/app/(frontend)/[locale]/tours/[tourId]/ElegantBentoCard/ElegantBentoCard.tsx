

import React from 'react'
import { Calendar, Users } from 'lucide-react'
import styles from './ElegantBentoCard.module.css'
import { RichText } from '@/components/blocks/ui/RichText'

export default function ElegantBentoCard({ tour, locale }: { tour: any; locale: string }) {
  // Функція для отримання локалізованих даних
  const t = (field: any): any => {
    if (!field) return ''
    if (typeof field === 'object' && 'root' in field) return field // для RichText
    if (typeof field === 'object') {
      return field[locale] || field.en || Object.values(field)[0]
    }
    return String(field)
  }

  // Визначаємо змінні на основі вашої структури в Payload
  const booking = tour.bookingDetailsCard // Окремий об'єкт для картки бронювання
  const price = tour.price || 0
  const groupSize = t(tour.groupSize) || 'Уточнюється'
  const currentDates = t(tour.tourDates?.[0]?.dateRange) || 'Дати уточнюються'

  return (
    <div className={`${styles.container} animate-section`}>
      {/* SECTION: Price & Booking */}
      <div className={`${styles.mainCard} ${styles.mainCardSpan}`}>
        <div className={styles.mainCardInner}>
          {/* Картка з ціною та датами */}
          <div className={styles.priceSection}>
            <p className={styles.priceLabel}>Вартість туру</p>
            <p className={styles.price}>{price}€</p>

            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <Calendar className={styles.infoCardIcon} />
                <div>
                  <p className={styles.infoCardLabelSmall}>Дати</p>
                  <p className={styles.infoCardValue}>{currentDates}</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <Users className={styles.infoCardIcon} />
                <div>
                  <p className={styles.infoCardLabelSmall}>Група</p>
                  <p className={styles.infoCardValue}>{groupSize}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ОКРЕМА КАРТКА БРОНЮВАННЯ (Дизайн зі скриншоту) */}
          <div className={styles.bookingSection}>
            {/* Головний заголовок (напр. БРОНЬ ТУРА*) */}
            <p className={styles.bookingMainTitle}>{t(booking?.title) || 'БРОНЬ ТУРА*'}</p>

            <div className={styles.bookingContent}>
              {/* Аванс (напр. Аванс — 50% / Людина) */}
              <p className={styles.prepaymentText}>{t(booking?.prepayment)}</p>

              <div className={styles.divider} />

              {/* Розстрочка заголовок */}
              <p className={styles.installmentHeader}>
                {t(booking?.installmentTitle) || 'РОЗСТРОЧКА'}
              </p>

              {/* Список пунктів розстрочки з жовтими цятками */}
              <ul className={styles.installmentList}>
                {booking?.installmentList?.map((item: any, idx: number) => (
                  <li key={idx} className={styles.installmentItem}>
                    <span className={styles.yellowDot} />
                    {t(item.text)}
                  </li>
                ))}
              </ul>

              {/* Примітка внизу курсивом */}
              {booking?.note && <p className={styles.bookingNote}>{t(booking.note)}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: Included + Additional */}
      <div className={styles.mainContent}>
        {/* У ВАРТІСТЬ ВКЛЮЧЕНО */}
        <div className={`${styles.includedCard} ${styles.includedCardSpan}`}>
          <h3 className={styles.includedTitle}>
            <span className={styles.includedDot} />
            {t(tour.tripAdditionalInfoCard?.title) || 'У ВАРТІСТЬ ВКЛЮЧЕНО'}
          </h3>
          <div className={styles.includedRichText}>
            <RichText content={t(tour.tripAdditionalInfoCard?.content)} />
          </div>
        </div>

        {/* ДОДАТКОВО */}
        <div className={styles.additionalCard}>
          <h3 className={styles.additionalTitle}>
            <span className={styles.additionalDot} />
            {t(tour.additionalInfoCard?.title) || 'ДОДАТКОВО'}
          </h3>
          <div className={styles.additionalRichText}>
            <RichText content={t(tour.additionalInfoCard?.content)} />
          </div>
        </div>
      </div>

      {/* SECTION: Optional (За бажанням) */}
      {tour.optionalInfoCard && (
        <div className={styles.optionalCard}>
          <h3 className={styles.optionalTitle}>
            <span className={styles.optionalDot} />
            {t(tour.optionalInfoCard?.title) || 'ЗА БАЖАННЯМ'}
          </h3>
          <div className={styles.optionalRichText}>
            <RichText content={t(tour.optionalInfoCard?.content)} />
          </div>
        </div>
      )}
    </div>
  )
}
