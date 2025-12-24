'use client'

import { useEffect, useRef } from 'react'
import styles from './TourInformation.module.scss'
import { Button } from '@payloadcms/ui'
import { Tour } from '@/app/(frontend)/[locale]/tours/[tourId]/TourDetailClient'
import { RichText } from '../RichText'

interface Props {
  tour: Tour
  locale: 'uk' | 'en'
}

export const TourInformation = ({ tour, locale }: Props) => {
  const imagesRef = useRef<HTMLDivElement>(null)

  const handleBookClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion && imagesRef.current) {
      const imageElements = imagesRef.current.querySelectorAll(`.${styles.imageWrapper}`)

      imageElements.forEach((img, index) => {
        // Анимация через GSAP
        import('gsap').then(({ default: gsap }) => {
          import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
            gsap.registerPlugin(ScrollTrigger)
            gsap.fromTo(
              img,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: img,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              },
            )
          })
        })
      })
    }
  }, [tour.gallery])

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        {locale === 'en' ? 'Tour Information' : 'Інформація про тур'}
      </h2>

      <div className={styles.grid}>
        {/* Текстовая информация о туре */}
        <div className={styles.textContent}>
          {tour.description && <RichText content={tour.description} />}
          <Button onClick={handleBookClick} className={styles.bookBtn}>
            {locale === 'en' ? 'Book Now' : 'ЗАБРОНЮВАТИ'}
          </Button>
        </div>

        {/* Галерея изображений */}
        {tour.gallery && tour.gallery.length > 0 && (
          <div ref={imagesRef} className={styles.imageGrid}>
            {tour.gallery.map((img, idx) => (
              <div key={idx} className={styles.imageWrapper}>
                <img src={img.image.url} alt={img.image.url || ''} className={styles.image} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
