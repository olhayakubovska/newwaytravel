'use client'

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './VideoSection.module.scss'

export function VideoSection({ title, videos }: { title?: any; videos?: any[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  useEffect(() => {
    setMounted(true)
  }, [])

  const t = (field: any) => {
    if (!field) return ''
    if (typeof field === 'object') return field[locale] || field.uk || Object.values(field)[0] || ''
    return String(field)
  }

  const getMediaUrl = (media: any) => {
    if (!media) return null
    if (typeof media === 'object' && media.url) return media.url
    return typeof media === 'string' ? media : null
  }

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  if (!mounted || !videos?.length) return null

  const activeVideo = activeIndex !== null ? videos[activeIndex] : null
  const videoId = activeVideo?.youtubeUrl ? getYoutubeId(activeVideo.youtubeUrl) : null

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {title && <h2 className={styles.mainTitle}>{t(title)}</h2>}

        <div className={styles.swiperContainer}>
          <button className={`${styles.navBtn} ${styles.prevBtn}`}>
            <ChevronLeft size={24} />
          </button>

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
            navigation={{ prevEl: `.${styles.prevBtn}`, nextEl: `.${styles.nextBtn}` }}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1281: { slidesPerView: 3 },
            }}
            className={styles.mySwiper}
          >
            {videos.map((video: any, index: number) => (
              <SwiperSlide key={video.id || index}>
                <div className={styles.card} onClick={() => setActiveIndex(index)}>
                  <div className={styles.imageContainer}>
                    <img src={getMediaUrl(video.thumbnail)} className={styles.thumbnail} alt="" />
                    <div className={styles.playOverlay}>
                      <div className={styles.playIconCircle}>
                        <Play size={28} fill="white" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.cardInfo}>
                    <p className={styles.videoTitle}>{t(video.title)}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className={`${styles.navBtn} ${styles.nextBtn}`}>
            <ChevronRight size={24} />
          </button>
          <div className={styles.controlsContainer}>
            <div className={styles.paginationWrapper}></div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && videoId && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Оверлей закрывает при клике в любое место вне видео */}
            <div className={styles.overlay} onClick={() => setActiveIndex(null)} />

            {/* Кнопка закрытия ВНЕ окна видео */}
            <button className={styles.globalCloseBtn} onClick={() => setActiveIndex(null)}>
              <X size={40} />
            </button>

            <div className={styles.modalContent}>
              <div className={styles.iframeWrapper}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
