'use client'
import Image from 'next/image'
import { RichText } from '../RichText'
import styles from './ItineraryAccordion.module.scss'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export const ItineraryAccordion = ({
  day,
  dayNumber,
  t,
}: {
  day: any
  dayNumber: number
  t: any
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        duration: 0.4,
        ease: 'power2.out',
        opacity: 1,
      })
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        opacity: 0,
      })
    }
  }, [isOpen])

  // Получаем URL первой картинки из массива images (согласно вашей схеме)
  const firstImage = day.images?.[0]?.image
  const imageUrl = typeof firstImage === 'object' ? firstImage?.url : null
  const imageAlt = typeof firstImage === 'object' ? firstImage?.alt : ''

  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.active : ''}`}>
      <button
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h4 className={styles.dayTitle}>
          День {dayNumber}. {t(day.dayTitle)}
        </h4>
        <div className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>

      <div
        className={styles.accordionContent}
        ref={contentRef}
        style={{ height: 0, opacity: 0, overflow: 'hidden' }}
      >
        <div className={styles.contentInner}>
          {imageUrl && (
            <div className={styles.dayImageWrapper}>
              <Image
                src={imageUrl}
                alt={imageAlt || ''}
                width={800}
                height={450}
                className={styles.dayImage}
              />
            </div>
          )}
          <div className={styles.dayDescription}>
            {/* Поле в Payload называется 'content' */}
            <RichText content={t(day.content)} />
          </div>
        </div>
      </div>
    </div>
  )
}
