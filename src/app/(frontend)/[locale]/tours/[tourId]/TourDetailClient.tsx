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

export default function TourDetailClient({ tour, locale }: Props) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [consultationOpen, setConsultationOpen] = useState(false)

  const t = (field: any): any => {
    if (!field) return ''

    if (field && typeof field === 'object' && 'root' in field) {
      return field
    }

    if (typeof field === 'object' && field !== null) {
      return field[locale] || field['uk'] || field['en'] || Object.values(field)[0] || ''
    }

    return String(field)
  }

  const getImageUrl = (media: any) => {
    if (typeof media === 'object' && media !== null) return media.url || ''
    return typeof media === 'string' ? media : ''
  }

  const getImageAlt = (media: any) => {
    if (typeof media === 'object' && media !== null) return media.alt || ''
    return ''
  }

  const labels = {
    bookBtn: t(tour.uiTexts?.bookBtn),
    consultBtn: t(tour.uiTexts?.consultBtn),
    itineraryTitle: t(tour.uiLabels?.itineraryTitle),
    leaderTitle: t(tour.uiLabels?.leaderTitle),
    descriptionTitle: t(tour.descriptionCard?.title),
    consultCardTitle: t(tour.consultationCard?.title),
    consultCardText: t(tour.consultationCard?.text),
  }

  return (
    <main className={styles.wrapper}>
      <section className={styles.hero}>
        <HeroSection
          title={t(tour.name)}
          subtitle={t(tour.location)}
          description={`${t(tour.duration)}${tour.groupSize ? ` • ${t(tour.groupSize)}` : ''}`}
          backgroundImage={tour.mainImage ?? undefined}
        />

        <div className={styles.heroActions}>
          {labels.bookBtn && (
            <button className={styles.primaryBtn} onClick={() => setBookingOpen(true)}>
              {labels.bookBtn}
            </button>
          )}
          {labels.consultBtn && (
            <button className={styles.secondaryBtn} onClick={() => setConsultationOpen(true)}>
              {labels.consultBtn}
            </button>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.cardWrapper}>
          {tour.tripDetailsCard && <TripDetails tour={tour} locale={locale} />}
          {tour.tripAdditionalInfoCard && <TripAdditionalInfo tour={tour} locale={locale} />}
          {tour.additionalInfoCard && <AdditionalInfo tour={tour} locale={locale} />}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            {labels.descriptionTitle && <h3>{labels.descriptionTitle}</h3>}

            {tour.descriptionCard?.content && (
              <RichText content={t(tour.descriptionCard.content)} />
            )}

            {labels.bookBtn && (
              <button
                className={styles.primaryBtn}
                style={{ marginTop: '20px' }}
                onClick={() => setBookingOpen(true)}
              >
                {labels.bookBtn}
              </button>
            )}
          </div>

          {tour.gallery && tour.gallery.length > 0 && (
            <div className={styles.galleryWrapper}>
              {tour.gallery.slice(0, 3).map((item: any, index: number) => {
                const url = getImageUrl(item.image)
                if (!url) return null
                return (
                  <div key={item.id || index} className={styles.galleryCard}>
                    <Image
                      src={url}
                      alt={getImageAlt(item.image)}
                      width={400}
                      height={300}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className={styles.section}>
        {labels.itineraryTitle && <h2 className={styles.sectionTitle}>{labels.itineraryTitle}</h2>}

        <div className={styles.programLayout}>
          <div className={styles.consultCard}>
            {labels.consultCardTitle && <h3>{labels.consultCardTitle}</h3>}
            {labels.consultCardText && <p>{labels.consultCardText}</p>}

            {labels.consultBtn && (
              <button className={styles.orangeBtn} onClick={() => setConsultationOpen(true)}>
                {labels.consultBtn}
              </button>
            )}
          </div>

          <TripItinerary tour={tour} locale={locale} />
        </div>
      </section>

      {tour.leader && (
        <section className={styles.sectionLeader}>
          {labels.leaderTitle && <h2 className={styles.sectionTitle}>{labels.leaderTitle}</h2>}

          <div className={styles.leaderCardWrapper}>
            {tour.leader?.photo && (
              <div className={styles.leaderImageWrapper}>
                <Image
                  src={getImageUrl(tour.leader.photo)}
                  alt={getImageAlt(tour.leader.photo)}
                  width={400}
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
