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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.textWrapper}
        >
          {/* Используем данные из пропсов */}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </motion.div>
      </div>
    </section>
  )
}
