'use client'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import styles from './ConsultationSection.module.scss'

interface ConsultationProps {
  title?: any
  text?: any
  buttonText?: any
  backgroundImage?: any
  phoneNumber?: any // Изменили на any, так как Payload может вернуть объект локализации
}

export function ConsultationSection({
  title,
  text,
  buttonText,
  backgroundImage,
  phoneNumber,
}: ConsultationProps) {
  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  const t = (field: any): string => {
    if (!field) return ''
    if (typeof field === 'object') {
      return field[locale] || field['uk'] || Object.values(field)[0] || ''
    }
    return String(field)
  }

  const imageUrl = typeof backgroundImage === 'object' ? backgroundImage?.url : backgroundImage

  // 1. Сначала переводим (получаем строку из объекта Payload)
  const phoneString = t(phoneNumber)

  // 2. Безопасно очищаем номер. Если номера нет, используем заглушку или пустую строку.
  const cleanNumber = phoneString ? phoneString.replace(/\s+/g, '') : ''

  return (
    <section className={styles.section}>
      <div className={styles.bgWrapper}>
        {imageUrl ? (
          <img src={imageUrl} alt={t(title) || 'Background'} className={styles.image} />
        ) : (
          <div
            className={styles.placeholder}
            style={{ backgroundColor: '#333', width: '100%', height: '100%' }}
          />
        )}
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
          <h2 className={styles.title}>
            {t(title) || (locale === 'en' ? 'Not sure what to choose?' : 'Не знаєш що вибрати?')}
          </h2>

          {text && <p className={styles.text}>{t(text)}</p>}

          {/* Добавляем условие: рендерить ссылку, только если номер существует */}
          {cleanNumber && (
            <a
              href={`tel:${cleanNumber}`}
              className={styles.button}
              style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
            >
              {t(buttonText) || (locale === 'en' ? 'Contact us' : 'Зв’язатися з нами')}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
