'use client'

import { motion } from 'framer-motion'
import styles from './HeroSection.module.scss'

// Описываем структуру медиа-файла из Payload
interface Media {
  url?: string
  alt?: string
}

interface HeroSectionProps {
  subtitle?: string
  title: string
  description?: string
  backgroundImage?: Media | string // Payload может вернуть объект или ID (строку)
}

export function HeroSection({ subtitle, title, description, backgroundImage }: HeroSectionProps) {
  // Получаем URL: если backgroundImage это объект, берем .url, иначе — пусто
  const imageUrl = typeof backgroundImage === 'object' ? backgroundImage?.url : backgroundImage

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={typeof backgroundImage === 'object' ? backgroundImage?.alt : title}
            className={styles.image}
          />
        )}
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </motion.div>
      </div>
    </section>
  )
}
