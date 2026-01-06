
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

export function VideoSection({ title, videos }: { title?: any; videos?: any[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isRelatedClosed, setIsRelatedClosed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (activeIndex !== null) {
      setIsPaused(false)
      setIsRelatedClosed(false)
    }
  }, [activeIndex])

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

  const handlePlayVideo = () => {
    videoRef.current?.play()
    setIsPaused(false)
    setIsRelatedClosed(false)
  }

  if (!mounted || !videos?.length) return null

  const activeVideo = activeIndex !== null ? videos[activeIndex] : null

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {title && <h2 className={styles.mainTitle}>{t(title)}</h2>}

        <div className={styles.swiperContainer}>
          {/* Стрелки по бокам */}
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
            {videos.map((video: any, index: number) => (
              <SwiperSlide key={video.id || index}>
                <motion.div className={styles.card} onClick={() => setActiveIndex(index)}>
                  <div className={styles.imageContainer}>
                    <img src={getMediaUrl(video.thumbnail)} className={styles.thumbnail} alt="" />
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
                  autoPlay
                  className={styles.mainVideo}
                  onPause={() => setIsPaused(true)}
                  onPlay={() => {
                    setIsPaused(false)
                    setIsRelatedClosed(false)
                  }}
                />

                {isPaused && (
                  <div className={styles.centerPlayBtn} onClick={handlePlayVideo}>
                    <div className={styles.playIconCircleLarge}>
                      <Play size={40} fill="white" color="white" />
                    </div>
                  </div>
                )}
              </div>

              {activeVideo.relatedVideos?.length > 0 && (
                <div
                  className={`${styles.relatedVideosBlock} ${isPaused && !isRelatedClosed ? styles.visibleOnPause : ''}`}
                >
                  <div className={styles.relatedHeader}>
                    <p className={styles.relatedLabel}>Пов’язані відео</p>
                    <button
                      className={styles.closeRelatedBtn}
                      onClick={() => setIsRelatedClosed(true)}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className={styles.relatedGrid}>
                    {activeVideo.relatedVideos.map((rel: any) => {
                      if (typeof rel === 'string') return null
                      return (
                        <div
                          key={rel.id}
                          className={styles.relatedItem}
                          onClick={() => {
                            const idx = videos.findIndex((v: any) => v.id === rel.id)
                            if (idx !== -1) setActiveIndex(idx)
                          }}
                        >
                          <div className={styles.relThumbWrapper}>
                            <img
                              src={getMediaUrl(rel.thumbnail)}
                              className={styles.relThumbImg}
                              alt=""
                            />
                            <div className={styles.relPlayOverlay}>
                              <Play size={16} fill="white" />
                            </div>
                          </div>
                          <p className={styles.relTitle}>{t(rel.title)}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
