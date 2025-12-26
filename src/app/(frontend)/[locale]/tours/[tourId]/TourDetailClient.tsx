'use client'

import { useState } from 'react'
import { RichText } from '@/components/blocks/ui/RichText'
import TripDetails from '@/components/blocks/ui/TripDetails/TripDetails'
import TripItinerary from '@/components/blocks/ui/TripItinerary/TripItinerary'
import { BookingModal } from '@/components/blocks/modal/BookingModal/BookingModal'
import { ConsultationModal } from '@/components/blocks/modal/ConsultationModal/ConsultationModal'
import styles from './TourDetailPage.module.scss'
import { HeroSection } from '@/components/blocks/HeroSection/HeroSection'
import TripAdditionalInfo from '@/components/blocks/ui/TripAdditionalInfo/TripAdditionalInfo'
import AdditionalInfo from '@/components/blocks/ui/AdditionalInfo/AdditionalInfo'

export interface Media {
  id: string
  url: string
  alt?: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  focalX?: number
  focalY?: number
  createdAt: string
  updatedAt: string
  thumbnailURL?: string | null
}

export interface Leader {
  id: string
  name: string
  role?: string
  bio?: any
  photo?: Media
}

export interface ItineraryDay {
  id: string
  dayTitle?: string
  content?: any
  images?: Media[]
}

export interface GalleryItem {
  id: string
  image: Media
}

export interface Tour {
  id: string
  name: string
  slug: string
  price: number
  location?: string
  duration?: string
  groupSize?: string
  description?: any
  mainImage?: Media
  itinerary?: ItineraryDay[]
  leader?: Leader // <-- теперь это объект
  gallery?: GalleryItem[]
  tripDetails?: {
    dates?: string
    priceLabel?: string
    bookingConditions?: any
    bookingNote?: string
    additionalInfo?: any
  }
  // Новые карточки
  tripDetailsCard?: {
    title?: any
    content?: any
  }
  tripAdditionalInfoCard?: {
    title?: any
    content?: any
  }
  additionalInfoCard?: {
    title?: any
    content?: any
  }
}

interface Props {
  tour: Tour
  locale: 'uk' | 'en'
}

export default function TourDetailClient({ tour, locale }: Props) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [consultationOpen, setConsultationOpen] = useState(false)

  const t = (field: any) => {
    if (!field) return ''
    if (typeof field === 'object') {
      return field[locale] || field.uk || field.en || ''
    }
    return field
  }

  return (
    <main className={styles.wrapper}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <HeroSection
          title={t(tour.name)}
          subtitle={t(tour.location)}
          description={t(tour.duration)}
        />

        <div className={styles.heroActions}>
          <button className={styles.primaryBtn} onClick={() => setBookingOpen(true)}>
            {locale === 'en' ? 'Book now' : 'Забронювати'}
          </button>
          <button className={styles.secondaryBtn} onClick={() => setConsultationOpen(true)}>
            {locale === 'en' ? 'Consultation' : 'Консультація'}
          </button>
        </div>
      </section>

      {/* DETAILS & ADDITIONAL INFO */}
      <section className={styles.section}>
        <div className={styles.cardWrapper}>
          {tour.tripDetailsCard && <TripDetails tour={tour} locale={locale} />}
          {tour.tripAdditionalInfoCard && <TripAdditionalInfo tour={tour} locale={locale} />}
          {tour.additionalInfoCard && <AdditionalInfo tour={tour} locale={locale} />}
        </div>
      </section>

      {/* TOUR INFORMATION */}
      <section className={styles.section}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>{locale === 'en' ? 'Tour information' : 'Інформація про тур'}</h3>
            {tour.description && <RichText content={t(tour.description)} />}
            <button
              className={styles.primaryBtn}
              style={{ marginTop: '20px' }}
              onClick={() => setBookingOpen(true)}
            >
              {locale === 'en' ? 'Book now' : 'Забронювати'}
            </button>
          </div>

          {tour.gallery && (
            <div className={styles.galleryWrapper}>
              {tour.gallery.slice(0, 3).map((item) => (
                <div key={item.id} className={styles.galleryCard}>
                  <img src={item.image.url} alt={item.image.alt || ''} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PROGRAM */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {locale === 'en' ? 'Tour program' : 'Програма туру'}
        </h2>

        <div className={styles.programLayout}>
          <div className={styles.consultCard}>
            <h3>{locale === 'en' ? 'Only best impressions!' : 'Тільки найяскравіші враження!'}</h3>
            <p>
              {locale === 'en'
                ? 'We are open to suggestions and can adjust the program for you.'
                : 'Ми відкриті до пропозицій та можемо адаптувати программу під вас.'}
            </p>
            <button className={styles.orangeBtn} onClick={() => setConsultationOpen(true)}>
              {locale === 'en' ? 'Consultation' : 'Консультація'}
            </button>
          </div>

          <TripItinerary tour={tour} locale={locale} />
        </div>
      </section>

      {/* LEADER */}
      {tour.leader && (
        <section className={styles.sectionLeader}>
          <h2 className={styles.sectionTitle}>{locale === 'en' ? 'Tour leader' : 'Турлідер'}</h2>

          <div className={styles.leaderCardWrapper}>
            {/* Фото слева */}
            {tour.leader.photo?.url && (
              <div className={styles.leaderImageWrapper}>
                <img
                  src={tour.leader.photo.url}
                  alt={t(tour.leader.name)}
                  className={styles.leaderImage}
                />
              </div>
            )}

            {/* Текст справа */}
            <div className={styles.leaderText}>
              <h3 className={styles.leaderName}>{t(tour.leader.name)}</h3>
              {tour.leader.role && <p className={styles.leaderRole}>{t(tour.leader.role)}</p>}
              {tour.leader.bio && <RichText content={t(tour.leader.bio)} />}
            </div>
          </div>
        </section>
      )}

      {/* MODALS */}
      {bookingOpen && (
        <BookingModal tourName={t(tour.name)} onClose={() => setBookingOpen(false)} />
      )}
      {consultationOpen && (
        <ConsultationModal locale={locale} onClose={() => setConsultationOpen(false)} />
      )}
    </main>
  )
}
