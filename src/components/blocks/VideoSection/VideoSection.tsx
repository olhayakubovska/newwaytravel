'use client'

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { Play, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './VideoSection.module.scss'

export interface Media {
  url: string
}

export interface Video {
  id: string
  title?: Record<string, string>
  youtubeUrl?: string
  videoFile?: Media
  thumbnail?: Media
  relatedVideos?: Video[]
}

export interface VideoSectionProps {
  title?: Record<string, string>
  videos?: Video[]
}

export function VideoSection({ title, videos }: VideoSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  useEffect(() => {
    setMounted(true)
  }, [])

  const safeVideos = Array.isArray(videos) ? videos : []
  if (safeVideos.length === 0 || !mounted) return null

  const t = (field: any) => field?.[locale] || field?.uk || ''

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>{t(title)}</h2>

        <div className={styles.swiperWrapper}>
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={3}
            pagination={{ clickable: true, el: `.${styles.paginationCustom}` }}
            navigation={{
              prevEl: '#prev_video',
              nextEl: '#next_video',
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className={styles.mySwiper}
          >
            {safeVideos.map((video, index) => (
              <SwiperSlide key={video.id}>
                <div className={styles.card} onClick={() => setActiveIndex(index)}>
                  <img src={video.thumbnail?.url} alt="" className={styles.thumbnail} />
                  <div className={styles.playBtn}>
                    <div className={styles.playIconCircle}>
                      <Play size={30} fill="white" color="white" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button id="prev_video" className={`${styles.navBtn} ${styles.prevBtn}`}>
            <ChevronLeft size={32} />
          </button>
          <button id="next_video" className={`${styles.navBtn} ${styles.nextBtn}`}>
            <ChevronRight size={32} />
          </button>

          <div className={styles.paginationCustom}></div>
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.overlay} onClick={() => setActiveIndex(null)} />
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                {/* Теперь заголовок — это ссылка на YouTube, если она есть */}
                {safeVideos[activeIndex]?.youtubeUrl ? (
                  <a
                    href={safeVideos[activeIndex].youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalTitleLink}
                  >
                    {t(safeVideos[activeIndex]?.title)}
                    <ExternalLink size={18} />
                  </a>
                ) : (
                  <span>{t(safeVideos[activeIndex]?.title)}</span>
                )}

                <button onClick={() => setActiveIndex(null)}>
                  <X size={32} />
                </button>
              </div>

              <div className={styles.videoWrapper}>
                <video src={safeVideos[activeIndex]?.videoFile?.url} controls autoPlay />
              </div>

              {/* Блок похожих видео ПРЯМО ПОД ВИДЕО */}
              {safeVideos[activeIndex]?.relatedVideos &&
                safeVideos[activeIndex].relatedVideos!.length > 0 && (
                  <div className={styles.relatedVideosBlock}>
                    <p className={styles.relatedLabel}>Похожие видео</p>
                    <div className={styles.relatedGrid}>
                      {safeVideos[activeIndex].relatedVideos!.map((relVideo) => (
                        <div
                          key={relVideo.id}
                          className={styles.relatedItem}
                          onClick={() => {
                            const newIndex = safeVideos.findIndex((v) => v.id === relVideo.id)
                            if (newIndex !== -1) setActiveIndex(newIndex)
                          }}
                        >
                          <div className={styles.relThumb}>
                            <img src={relVideo.thumbnail?.url} alt="" />
                          </div>
                          <p>{t(relVideo.title)}</p>
                        </div>
                      ))}
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
