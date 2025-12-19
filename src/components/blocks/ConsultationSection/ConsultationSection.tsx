'use client'
import { motion } from 'framer-motion'
import styles from './ConsultationSection.module.scss'
import { Button } from '@payloadcms/ui'

interface ConsultationProps {
  title?: string
  text?: string
  buttonText?: string
}

export function ConsultationSection({ title, text, buttonText }: ConsultationProps) {
  return (
    <section className={styles.section}>
      <div className={styles.bgWrapper}>
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=600&fit=crop"
          alt="Mountains"
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.inner}
        >
          <h2 className={styles.title}>{title || 'Не знаєш що вибрати?'}</h2>
          {text && <p className={styles.text}>{text}</p>}
          <Button className={styles.button}>{buttonText || 'Зв’язатися з нами'}</Button>
        </motion.div>
      </div>
    </section>
  )
}
