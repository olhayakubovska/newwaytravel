'use client'

import { useState } from 'react'
import styles from './TourDetailPage.module.scss'

import { HeroSection } from '@/components/blocks/HeroSection/HeroSection'
import { RichText } from '@/components/blocks/ui/RichText'
import TripItinerary from '@/components/blocks/ui/TripItinerary/TripItinerary'
import TripAdditionalInfo from '@/components/blocks/ui/TripAdditionalInfo/TripAdditionalInfo'
import AdditionalInfo from '@/components/blocks/ui/AdditionalInfo/AdditionalInfo'
import TripDetails from '@/components/blocks/ui/TripDetails/TripDetails'

import { BookingModal } from '@/components/blocks/modal/BookingModal/BookingModal'
import { ConsultationModal } from '@/components/blocks/modal/ConsultationModal/ConsultationModal'
import { Locale } from '../../page'
import { Tour } from '@/payload-types'
import Image from 'next/image'

type Props = {
  tour: Tour
  locale: Locale
}

/**
 * Универсальный helper для локализованных полей Payload
 */
const getLocalizedValue = (field: any, locale: Locale): any => {
  if (!field) return ''

  // RichText
  if (field?.root) return field

  // Localized object
  if (typeof field === 'object') {
    return field[locale] || field.uk || field.en || ''
  }

  return field
}

export default function TourDetailClient({ tour, locale }: Props) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [consultationOpen, setConsultationOpen] = useState(false)

  const t = (field: any) => getLocalizedValue(field, locale)

  const labels = {
    bookBtn: t(tour.uiTexts?.bookBtn) || (locale === 'en' ? 'Book now' : 'Забронювати'),
    consultBtn: t(tour.uiTexts?.consultBtn) || (locale === 'en' ? 'Consultation' : 'Консультація'),

    itineraryTitle:
      t(tour.uiLabels?.itineraryTitle) || (locale === 'en' ? 'Tour program' : 'Програма туру'),

    leaderTitle: t(tour.uiLabels?.leaderTitle) || (locale === 'en' ? 'Tour leader' : 'Турлідер'),

    consultCardTitle: t(tour.consultationCard?.title),
    consultCardText: t(tour.consultationCard?.text),

    descriptionTitle:
      t(tour.descriptionCard?.title) ||
      (locale === 'en' ? 'Tour information' : 'Інформація про тур'),
  }

  return (
    <main className={styles.wrapper}>
      {/* HERO */}
      <section className={styles.hero}>
        <HeroSection
          title={t(tour.name)}
          subtitle={t(tour.location)}
          description={`${t(tour.duration)}${tour.groupSize ? ` • ${t(tour.groupSize)}` : ''}`}
        />

        <div className={styles.heroActions}>
          <button className={styles.primaryBtn} onClick={() => setBookingOpen(true)}>
            {labels.bookBtn}
          </button>
          <button className={styles.secondaryBtn} onClick={() => setConsultationOpen(true)}>
            {labels.consultBtn}
          </button>
        </div>
      </section>

      {/* DETAILS */}
      <section className={styles.section}>
        <div className={styles.cardWrapper}>
          {tour.tripDetailsCard && <TripDetails tour={tour} locale={locale} />}
          {tour.tripAdditionalInfoCard && <TripAdditionalInfo tour={tour} locale={locale} />}
          {tour.additionalInfoCard && <AdditionalInfo tour={tour} locale={locale} />}
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className={styles.section}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>{labels.descriptionTitle}</h3>

            {tour.descriptionCard?.content && (
              <RichText content={t(tour.descriptionCard.content)} />
            )}

            <button
              className={styles.primaryBtn}
              style={{ marginTop: 20 }}
              onClick={() => setBookingOpen(true)}
            >
              {labels.bookBtn}
            </button>
          </div>
          {tour.gallery && tour.gallery.length > 0 && (
            <div className={styles.galleryWrapper}>
              {tour.gallery.slice(0, 3).map((item) => {
                if (!item.image) return null

                const src =
                  typeof item.image === 'object' && item.image
                    ? item.image.url || '/placeholder.jpg'
                    : (item.image as string) || '/placeholder.jpg'

                const alt = typeof item.image === 'object' && item.image ? item.image.alt || '' : ''

                return (
                  <div key={item.id || src} className={styles.galleryCard}>
                    <Image src={src} alt={alt} width={400} height={300} />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ITINERARY */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{labels.itineraryTitle}</h2>

        <div className={styles.programLayout}>
          <div className={styles.consultCard}>
            <h3>{labels.consultCardTitle}</h3>
            <p>{labels.consultCardText}</p>

            <button className={styles.orangeBtn} onClick={() => setConsultationOpen(true)}>
              {labels.consultBtn}
            </button>
          </div>

          <TripItinerary tour={tour} locale={locale} />
        </div>
      </section>

      {/* LEADER */}
      {tour.leader && (
        <section className={styles.sectionLeader}>
          <h2 className={styles.sectionTitle}>{labels.leaderTitle}</h2>

          <div className={styles.leaderCardWrapper}>
            {tour.leader?.photo && (
              <div className={styles.leaderImageWrapper}>
                <Image
                  src={
                    typeof tour.leader.photo === 'object' && tour.leader.photo.url
                      ? tour.leader.photo.url
                      : (tour.leader.photo as string) // если это строка
                  }
                  alt={typeof tour.leader.photo === 'object' ? tour.leader.photo.alt || '' : ''}
                  width={400} // укажи нужные размеры
                  height={400}
                  className={styles.leaderImage}
                />
              </div>
            )}

            <div className={styles.leaderText}>
              <h3 className={styles.leaderName}>{t(tour.leader.name)}</h3>
              <p className={styles.leaderRole}>{t(tour.leader.role)}</p>
              {tour.leader.bio && <div className={styles.leaderBio}>{t(tour.leader.bio)}</div>}
            </div>
          </div>
        </section>
      )}

      {bookingOpen && (
        <BookingModal tourName={t(tour.name)} onClose={() => setBookingOpen(false)} />
      )}

      {consultationOpen && (
        <ConsultationModal locale={locale} onClose={() => setConsultationOpen(false)} />
      )}
    </main>
  )
}
