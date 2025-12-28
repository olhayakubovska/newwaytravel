'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './TourInformation.module.scss'
import { Button } from '@payloadcms/ui'
import { RichText } from '../RichText'
import { Locale } from '@/app/(frontend)/[locale]/page'
import { Tour } from '@/payload-types'

interface Props {
  tour: Tour
  locale: Locale
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
          {tour.descriptionCard?.content && <RichText content={tour.descriptionCard.content} />}
          <Button onClick={handleBookClick} className={styles.bookBtn}>
            {locale === 'en' ? 'Book Now' : 'ЗАБРОНЮВАТИ'}
          </Button>
        </div>

        {/* Галерея изображений */}
        {tour.gallery && tour.gallery.length > 0 && (
          <div ref={imagesRef} className={styles.imageGrid}>
            {tour.gallery.map((img, idx) => {
              if (!img.image) return null

              const src =
                typeof img.image === 'object' && img.image.url
                  ? img.image.url
                  : (img.image as string) || '/placeholder.jpg'

              const alt = typeof img.image === 'object' ? img.image.alt || '' : ''

              return (
                <div key={idx} className={styles.imageWrapper}>
                  <Image
                    src={src}
                    alt={alt}
                    width={400} // или нужные тебе размеры
                    height={300}
                    className={styles.image}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
