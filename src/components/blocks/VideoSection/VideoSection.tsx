'use client'

import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './VideoSection.module.scss'
import { Config, Page, Media } from '@/payload-types'

type Block = NonNullable<Page['layout']>[number]
type VideoSectionBlock = Extract<Block, { blockType: 'videoSection' }>
type VideoObject = Exclude<VideoSectionBlock['videos'][number], string>

type Locale = Config['locale']

interface VideoSectionProps {
  title?: string | Record<string, string> | null
  videos?: VideoSectionBlock['videos'] | null
}

export function VideoSection({ title, videos }: VideoSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const params = useParams()
  const locale = (params?.locale as Locale) || 'uk'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (activeIndex !== null && videoRef.current) {
      videoRef.current.play().catch((err) => console.warn('Autoplay blocked:', err))
    }
  }, [activeIndex])

  const t = (field: string | Record<string, string> | null | undefined): string => {
    if (!field) return ''
    if (typeof field === 'object') {
      return field[locale] || field.uk || field.en || Object.values(field)[0] || ''
    }
    return String(field)
  }

  const getMediaUrl = (media: string | Media | null | undefined): string => {
    if (!media) return '/placeholder.jpg'
    return typeof media === 'object' ? media.url || '' : media
  }

  if (!mounted || !videos?.length) return null

  const rawActiveVideo = activeIndex !== null ? videos[activeIndex] : null
  const activeVideo = typeof rawActiveVideo === 'object' ? (rawActiveVideo as VideoObject) : null

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {title && <h2 className={styles.mainTitle}>{t(title)}</h2>}

        <div className={styles.swiperContainer}>
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            pagination={{
              clickable: true,
              el: `.${styles.paginationWrapper}`,
              bulletClass: styles.bullet,
              bulletActiveClass: styles.bulletActive,
            }}
            navigation={{
              prevEl: `.${styles.prevBtn}`,
              nextEl: `.${styles.nextBtn}`,
            }}
            breakpoints={{
              320: { slidesPerView: 1.2, centeredSlides: true, spaceBetween: 15 },
              768: { slidesPerView: 2, centeredSlides: false },
              1281: { slidesPerView: 3, centeredSlides: false },
            }}
            className={styles.mySwiper}
          >
            {videos.map((video, index) => {
              if (typeof video === 'string') return null

              return (
                <SwiperSlide key={video.id || index}>
                  <motion.div
                    className={styles.card}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className={styles.imageContainer}>
                      <img
                        src={getMediaUrl(video.thumbnail)}
                        className={styles.thumbnail}
                        alt={t(video.title)}
                      />
                      <div className={styles.playOverlay}>
                        <div className={styles.playIconCircle}>
                          <Play size={28} fill="white" color="white" />
                        </div>
                      </div>
                    </div>
                    <div className={styles.cardInfo}>
                      <p className={styles.videoTitle}>{t(video.title)}</p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              )
            })}
          </Swiper>

          <div className={styles.controlsContainer}>
            <button className={`${styles.navBtn} ${styles.prevBtn}`}>
              <ChevronLeft size={24} />
            </button>
            <div className={styles.paginationWrapper}></div>
            <button className={`${styles.navBtn} ${styles.nextBtn}`}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.overlay} onClick={() => setActiveIndex(null)} />
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>{t(activeVideo.title)}</span>
                <button className={styles.closeBtn} onClick={() => setActiveIndex(null)}>
                  <X size={28} />
                </button>
              </div>
              <div className={styles.videoWrapper}>
                <video
                  ref={videoRef}
                  src={getMediaUrl(activeVideo.videoFile)}
                  controls
                  playsInline
                  className={styles.mainVideo}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
