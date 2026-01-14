import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CarouselGallery.module.css'

interface CarouselGalleryProps {
  images?: string[]
}

export default function CarouselGallery({ images }: CarouselGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const gallery = images || []

  const next = () => setCurrentIndex((prev) => (prev + 1) % gallery.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length)

  return (
    <>
      <div className={styles.carouselContainer}>
        {/* Main Image */}
        <div className={styles.mainImageContainer}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={gallery[currentIndex]}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className={styles.mainImage}
              onClick={() => setIsFullscreen(true)}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button className={styles.navButton} onClick={prev}>
            <ChevronLeft className={styles.navIcon} />
          </button>
          <button className={styles.navButton} onClick={next}>
            <ChevronRight className={styles.navIcon} />
          </button>

          {/* Counter */}
          <div className={styles.counter}>
            {currentIndex + 1} / {gallery.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className={styles.thumbnailsContainer}>
          {gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`${styles.thumbnail} ${idx === currentIndex ? styles.activeThumbnail : styles.inactiveThumbnail}`}
            >
              <img src={img} className={styles.thumbnailImage} />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.fullscreenOverlay}
          >
            <button className={styles.closeButton} onClick={() => setIsFullscreen(false)}>
              <X className={styles.closeIcon} />
            </button>
            <button
              className={`${styles.fullscreenNavButton} ${styles.fullscreenNavButtonLeft}`}
              onClick={prev}
            >
              <ChevronLeft className={styles.fullscreenNavIcon} />
            </button>
            <img src={gallery[currentIndex]} className={styles.fullscreenImage} />
            <button
              className={`${styles.fullscreenNavButton} ${styles.fullscreenNavButtonRight}`}
              onClick={next}
            >
              <ChevronRight className={styles.fullscreenNavIcon} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
