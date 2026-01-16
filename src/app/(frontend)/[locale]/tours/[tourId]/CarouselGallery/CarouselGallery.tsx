// import React, { useState } from 'react'
// import { ChevronLeft, ChevronRight, X } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'
// import styles from './CarouselGallery.module.css'

// interface CarouselGalleryProps {
//   images?: string[]
// }

// export default function CarouselGallery({ images }: CarouselGalleryProps) {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isFullscreen, setIsFullscreen] = useState(false)

//   const gallery = images || []

//   const next = () => setCurrentIndex((prev) => (prev + 1) % gallery.length)
//   const prev = () => setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length)

//   return (
//     <>
//       <div className={styles.carouselContainer}>
//         {/* Main Image */}
//         <div className={styles.mainImageContainer}>
//           <AnimatePresence mode="wait">
//             <motion.img
//               key={currentIndex}
//               src={gallery[currentIndex]}
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -100 }}
//               transition={{ duration: 0.3 }}
//               className={styles.mainImage}
//               onClick={() => setIsFullscreen(true)}
//             />
//           </AnimatePresence>

//           {/* Navigation Arrows */}
//           <button className={styles.navButton} onClick={prev}>
//             <ChevronLeft className={styles.navIcon} />
//           </button>
//           <button className={styles.navButton} onClick={next}>
//             <ChevronRight className={styles.navIcon} />
//           </button>

//           {/* Counter */}
//           <div className={styles.counter}>
//             {currentIndex + 1} / {gallery.length}
//           </div>
//         </div>

//         {/* Thumbnails */}
//         <div className={styles.thumbnailsContainer}>
//           {gallery.map((img, idx) => (
//             <button
//               key={idx}
//               onClick={() => setCurrentIndex(idx)}
//               className={`${styles.thumbnail} ${idx === currentIndex ? styles.activeThumbnail : styles.inactiveThumbnail}`}
//             >
//               <img src={img} className={styles.thumbnailImage} />
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Fullscreen */}
//       <AnimatePresence>
//         {isFullscreen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className={styles.fullscreenOverlay}
//           >
//             <button className={styles.closeButton} onClick={() => setIsFullscreen(false)}>
//               <X className={styles.closeIcon} />
//             </button>
//             <button
//               className={`${styles.fullscreenNavButton} ${styles.fullscreenNavButtonLeft}`}
//               onClick={prev}
//             >
//               <ChevronLeft className={styles.fullscreenNavIcon} />
//             </button>
//             <img src={gallery[currentIndex]} className={styles.fullscreenImage} />
//             <button
//               className={`${styles.fullscreenNavButton} ${styles.fullscreenNavButtonRight}`}
//               onClick={next}
//             >
//               <ChevronRight className={styles.fullscreenNavIcon} />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CarouselGallery.module.css'

interface CarouselGalleryProps {
  images?: string[]
}

export default function SliderVariant3({ images }: CarouselGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const gallery = images || []

  const next = () => setCurrentIndex((prev) => (prev + 1) % gallery.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length)

  const getVisibleThumbnails = () => {
    const visible = []
    for (let i = -1; i <= 1; i++) {
      const idx = (currentIndex + i + gallery.length) % gallery.length
      visible.push({ index: idx, offset: i })
    }
    return visible
  }

  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>Галерея</h3>
            <p className={styles.subtitle}>{gallery.length} фотографій</p>
          </div>
          <div className={styles.controls}>
            <button onClick={prev} className={`${styles.navButton} styles.prevButton`}>
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className={`${styles.navButton} ${styles.nextButton}`}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Cards layout */}
        <div className={styles.cardsLayout}>
          <AnimatePresence mode="popLayout">
            {getVisibleThumbnails().map(({ index, offset }) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: offset * 100, scale: 0.8 }}
                animate={{
                  opacity: offset === 0 ? 1 : 0.5,
                  x: offset * 280,
                  scale: offset === 0 ? 1 : 0.75,
                  zIndex: offset === 0 ? 10 : 5,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={styles.card}
                onClick={() => (offset === 0 ? setIsFullscreen(true) : setCurrentIndex(index))}
                style={{
                  width: offset === 0 ? '400px' : '300px',
                  height: offset === 0 ? '350px' : '280px',
                  border: offset === 0 ? '4px solid #FFAB1E' : '2px solid #e2e8f0',
                }}
              >
                <img src={gallery[index]} className={styles.cardImage} alt="" />
                {offset === 0 && (
                  <div className={styles.cardOverlay}>
                    <div className={styles.overlayText}>
                      <p>Фото</p>
                      <p>
                        {index + 1} з {gallery.length}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className={styles.dotsContainer}>
          {gallery.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={styles.dot}
              style={{
                width: idx === currentIndex ? '2rem' : '0.5rem',
                backgroundColor: idx === currentIndex ? '#FFAB1E' : '#3B3D83',
                opacity: idx === currentIndex ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.fullscreenOverlay}
          >
            <button className={styles.closeButton} onClick={() => setIsFullscreen(false)}>
              <X size={32} />
            </button>

            <button
              onClick={prev}
              className={`${styles.fullscreenNav} ${styles.fullscreenNavLeft}`}
            >
              <ChevronLeft size={28} />
            </button>

            <motion.img
              key={currentIndex}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={gallery[currentIndex]}
              className={styles.fullscreenImage}
              alt=""
            />

            <button
              onClick={next}
              className={`${styles.fullscreenNav} ${styles.fullscreenNavRight}`}
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
