'use client'

import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { Play, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './VideoSection.module.scss'

export function VideoSection({ title, videos }: any) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [showRelated, setShowRelated] = useState(false)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  useEffect(() => {
    setMounted(true)
  }, [])

  // ГАРАНТИРОВАННЫЙ ЗАПУСК ЗВУКА
  useEffect(() => {
    if (activeIndex !== null && videoRef.current) {
      const video = videoRef.current

      // Сбрасываем громкость на максимум и выключаем беззвучный режим
      video.muted = false
      video.volume = 1.0

      const playPromise = video.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Звук заблокирован. Проверьте, нажали ли вы на карточку:', error)
        })
      }
    }
  }, [activeIndex])

  const t = (field: any) => {
    if (!field) return ''
    if (typeof field === 'string') return field
    return field[locale] || field.uk || field.en || Object.values(field)[0] || ''
  }

  const getImageUrl = (media: any) => {
    if (!media) return null
    if (typeof media === 'object' && media.url) return media.url
    if (typeof media === 'string') return `/media/${media}`
    return null
  }

  const handleResume = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  if (!mounted || !videos?.length) return null

  const activeVideo = activeIndex !== null ? videos[activeIndex] : null

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {title && <h2 className={styles.mainTitle}>{t(title)}</h2>}

        <div className={styles.swiperWrapper}>
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={3}
            navigation={{
              prevEl: `.${styles.prevBtn}`,
              nextEl: `.${styles.nextBtn}`,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {videos.map((video: any, index: number) => (
              <SwiperSlide key={video.id}>
                <div
                  className={styles.card}
                  onClick={() => {
                    setActiveIndex(index)
                    setShowRelated(false)
                  }}
                >
                  <img src={getImageUrl(video.thumbnail)} className={styles.thumbnail} alt="" />
                  <div className={styles.playBtn}>
                    <div className={styles.playIconCircle}>
                      <Play size={30} fill="white" color="white" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className={`${styles.navBtn} ${styles.prevBtn}`}>
            <ChevronLeft size={32} />
          </button>
          <button className={`${styles.navBtn} ${styles.nextBtn}`}>
            <ChevronRight size={32} />
          </button>
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
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalTitleLink}
                >
                  <span className={styles.modalTitle}>{t(activeVideo.title)}</span>
                  <ExternalLink size={18} className={styles.externalIcon} />
                </a>

                <button className={styles.closeBtn} onClick={() => setActiveIndex(null)}>
                  <X size={28} />
                </button>
              </div>

              <div className={styles.videoWrapper}>
                <video
                  ref={videoRef}
                  src={activeVideo.videoFile?.url}
                  controls
                  playsInline
                  // ВАЖНО: Убрали autoPlay и muted из атрибутов совсем!
                  className={styles.mainVideo}
                  onPause={() => setShowRelated(true)}
                  onPlay={() => setShowRelated(false)}
                  key={activeVideo.id}
                />

                <AnimatePresence>
                  {showRelated && (
                    <motion.div
                      className={styles.pausedCenterIcon}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      onClick={handleResume}
                    >
                      <Play size={60} fill="white" color="white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showRelated && activeVideo.relatedVideos?.length > 0 && (
                    <motion.div
                      className={styles.relatedOverlay}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: '100%', opacity: 0 }}
                    >
                      <div className={styles.relatedHeader}>
                        <span>Другие видео</span>
                        <button className={styles.relClose} onClick={() => setShowRelated(false)}>
                          <X size={18} />
                        </button>
                      </div>

                      <div className={styles.relatedGrid}>
                        {activeVideo.relatedVideos.map((relVideo: any) => {
                          if (typeof relVideo === 'string') return null
                          return (
                            <div
                              key={relVideo.id}
                              className={styles.relatedItem}
                              onClick={() => {
                                const idx = videos.findIndex((v: any) => v.id === relVideo.id)
                                if (idx !== -1) {
                                  setActiveIndex(idx)
                                  setShowRelated(false)
                                }
                              }}
                            >
                              <div className={styles.relThumb}>
                                <img src={getImageUrl(relVideo.thumbnail)} alt="" />
                              </div>
                              <p>{t(relVideo.title)}</p>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
