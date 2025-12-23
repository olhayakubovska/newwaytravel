'use client'

import { motion } from 'framer-motion'
import styles from './HeroSection.module.scss'

// Добавляем пропсы: subtitle, title, description
export function HeroSection({
  subtitle,
  title,
  description,
}: {
  subtitle?: string
  title: string
  description?: string
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop"
          alt="Travel background"
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          <div className={styles.title}>{title}</div>
          {description && <p className={styles.description}>{description}</p>}
        </motion.div>
      </div>
    </section>
  )
}
