'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './TourDetailPage.module.scss'

import HeroSectionTour from './HeroSectionTour/HeroSectionTour'
import { BookingModal } from '@/components/blocks/modal/BookingModal/BookingModal'
import { ConsultationModal } from '@/components/blocks/modal/ConsultationModal/ConsultationModal'
import { Locale } from '../../page'
import { Tour } from '@/payload-types'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ElegantBentoCard from './ElegantBentoCard/ElegantBentoCard'
import Program from './Program/Program'
import CarouselGallery from './CarouselGallery/CarouselGallery'

import MapAndLeaderSection from './MapAndLeaderSection/MapAndLeaderSection'

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

  return (
    <main className={styles.wrapper} ref={mainRef}>
      {/* HERO */}
      <HeroSectionTour
        tour={tour}
        locale={locale}
        onBook={() => setBookingOpen(true)}
        onConsultation={() => setConsultationOpen(true)}
      />

      <ElegantBentoCard tour={tour} locale={locale} />

      <Program tour={tour} locale={locale} />

      <section className={styles.caruselGallerySection}>
        <CarouselGallery images={tour.gallery?.map((item) => getImageUrl(item.image))} />
      </section>

      <MapAndLeaderSection tour={tour} locale={locale} />

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
