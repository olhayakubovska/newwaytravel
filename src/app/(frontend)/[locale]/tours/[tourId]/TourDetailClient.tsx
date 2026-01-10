'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './TourDetailPage.module.scss'

import { HeroSection } from '@/components/blocks/HeroSection/HeroSection'
import { RichText } from '@/components/blocks/ui/RichText'
import { BookingModal } from '@/components/blocks/modal/BookingModal/BookingModal'
import { ConsultationModal } from '@/components/blocks/modal/ConsultationModal/ConsultationModal'
import { Locale } from '../../page'
import { Tour } from '@/payload-types'
import Image from 'next/image'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ItineraryAccordion } from '@/components/blocks/ui/ItineraryAccordion/ItineraryAccordion'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  tour: Tour
  locale: Locale
}

export default function TourDetailClient({ tour, locale }: Props) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [consultationOpen, setConsultationOpen] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          },
        )
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  const t = (field: any): any => {
    if (!field) return ''
    if (typeof field === 'object' && 'root' in field) return field
    if (typeof field === 'object') {
      return field[locale] || field.en || Object.values(field)[0]
    }
    return String(field)
  }

  const getImageUrl = (media: any) => (typeof media === 'object' ? media?.url || '' : media || '')

  const getImageAlt = (media: any) => (typeof media === 'object' ? media?.alt || '' : '')

  const labels = {
    bookBtn: t(tour.uiTexts?.bookBtn) || 'Забронювати',
    consultBtn: t(tour.uiTexts?.consultBtn) || 'Консультація',
    itineraryTitle: t(tour.uiLabels?.itineraryTitle),
    leaderTitle: t(tour.uiLabels?.leaderTitle) || 'Організатор туру',
    descriptionTitle: t(tour.descriptionCard?.title),
    mapTitle: locale === 'en' ? 'Travel Route' : 'Маршрут подорожі',
  }

  const getMapSrc = (input: string) => {
    if (!input) return ''
    if (input.includes('<iframe')) {
      const match = input.match(/src="([^"]+)"/)
      return match ? match[1] : ''
    }
    return input
  }

  return (
    <main className={styles.wrapper} ref={mainRef}>
      {/* HERO */}
      <section className={styles.hero}>
        <HeroSection
          title={t(tour.name)}
          subtitle={t(tour.location)}
          description={t(tour.duration)}
          backgroundImage={tour.mainImage ?? undefined}
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

      {/* === TRIP DETAILS GRID — ВОЗВРАЩЕНО ПОЛНОСТЬЮ === */}
      <section className={`${styles.section} ${styles.detailsGridSection} animate-section`}>
        <div className={styles.topInfoGrid}>
          <div className={styles.columnLeft}>
            <div className={styles.whiteCard}>
              <span className={styles.labelCap}>ДАТИ</span>
              <div className={styles.dateRow}>
                <span>{t(tour.duration)}</span>
              </div>
            </div>

            <div className={`${styles.whiteCard} ${styles.priceCard}`}>
              <span className={styles.labelCap}>ВАРТІСТЬ</span>
              <div className={styles.priceValue}>{tour.price}€</div>
            </div>

            <div className={styles.whiteCard}>
              <span className={styles.labelCap}>РОЗМІР ГРУПИ</span>
              <div className={styles.valueLarge}>{t(tour.groupSize)}</div>
            </div>

            <div className={styles.whiteCard}>
              <span className={styles.labelCap}>БРОНЬ ТУРА*</span>
              <p>*Предоплата не повертається</p>
            </div>
          </div>

          <div className={styles.columnCenter}>
            <div className={styles.whiteCardFull}>
              <h3>У ВАРТІСТЬ ВКЛЮЧЕНО:</h3>
              {tour.tripAdditionalInfoCard?.content && (
                <RichText content={tour.tripAdditionalInfoCard.content} />
              )}
            </div>
          </div>

          <div className={styles.columnRight}>
            <div className={styles.whiteCardFull}>
              <h3>ДОДАТКОВО:</h3>
              {tour.additionalInfoCard?.content && (
                <RichText content={tour.additionalInfoCard.content} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* === INFO + GALLERY === */}
      <section className={`${styles.section} animate-section`}>
        <div className={styles.infoGrid}>
          <div className={styles.stickyWrapper}>
            <div className={styles.infoCard}>
              <h3>{labels.descriptionTitle}</h3>
              <RichText content={t(tour.descriptionCard?.content)} />
            </div>
          </div>

          <div className={styles.galleryWrapper}>
            {tour.gallery?.slice(0, 4).map((item, i) => (
              <div key={i} className={styles.galleryCard}>
                <Image src={getImageUrl(item.image)} alt="" width={500} height={400} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === PROGRAM === */}
      <section className={`${styles.section} animate-section`}>
        <div className={styles.programLayout}>
          <div className={styles.stickyWrapper}>
            <div className={styles.consultCard}>
              <RichText content={t(tour.tripDetailsCard?.bookingConditions)} />
            </div>
          </div>

          <div className={styles.itineraryList}>
            {(tour.itinerary as any[])?.map((day, idx) => (
              <ItineraryAccordion key={idx} day={day} dayNumber={idx + 1} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* MAP + LEADER */}
      <section className={`${styles.section} animate-section`}>
        <div className={styles.infoGrid}>
          <div>
            <h2 className={styles.sectionTitleSmall}>{labels.mapTitle}</h2>
            <div className={styles.infoCard} style={{ padding: 0 }}>
              <iframe
                src={getMapSrc((tour as any).mapIframe)}
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

          {tour.leader && (
            <div>
              <h2 className={styles.sectionTitleSmall}>{labels.leaderTitle}</h2>
              <div className={styles.leaderCardBlue}>
                {tour.leader.photo && (
                  <Image
                    src={getImageUrl(tour.leader.photo)}
                    alt={getImageAlt(tour.leader.photo)}
                    width={140}
                    height={140}
                  />
                )}
                <h3>{t(tour.leader.name)}</h3>
                <p>{t(tour.leader.role)}</p>
                {tour.leader.bio && <RichText content={t(tour.leader.bio)} />}
              </div>
            </div>
          )}
        </div>
      </section>

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
