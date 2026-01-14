import React from 'react'
import { Star, Calendar, Clock, MapPin, Users, Plane } from 'lucide-react'
import { motion } from 'framer-motion'
import styles from './HeroSectionTour.module.css'
import { Tour } from '@/payload-types'

interface HeroSectionTourProps {
  tour: Tour
  locale: string
  onBook: () => void
  onConsultation: () => void
}

export default function HeroSectionTour({
  tour,
  locale,
  onBook,
  onConsultation,
}: HeroSectionTourProps) {
  const t = (field: any): any => {
    if (!field) return ''
    if (typeof field === 'object' && 'root' in field) return field
    if (typeof field === 'object') {
      return field[locale] || field.en || Object.values(field)[0]
    }
    return String(field)
  }

  const getImageUrl = (media: any) => (typeof media === 'object' ? media?.url || '' : media || '')

  return (
    <section className={styles.section}>
      {/* Background Image */}
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${getImageUrl(tour.mainImage)})` }}
      >
        <div className={styles.overlay} />
      </div>

      {/* Animated Plane */}
      {/* <motion.div
        className={styles.animatedPlane}
        animate={{ x: [0, 100, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Plane className={styles.planeIcon} />
      </motion.div> */}

      {/* Content */}
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.motionDiv}
        >
      
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={styles.heroTitle}
          >
            {t(tour.name)}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={styles.heroButtons}
          >
            <button onClick={onBook} className={styles.heroButtonBook}>
              {locale === 'uk' ? 'ЗАБРОНЮВАТИ' : 'BOOK NOW'}
            </button>
            <button onClick={onConsultation} className={styles.heroButtonConsult}>
              {locale === 'uk' ? 'КОНСУЛЬТАЦІЯ' : 'CONSULTATION'}
            </button>
          </motion.div>
        </motion.div>
      </div>


    </section>
  )
}
