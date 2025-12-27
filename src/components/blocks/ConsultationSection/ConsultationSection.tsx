'use client'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import styles from './ConsultationSection.module.scss'

interface ConsultationProps {
  title?: any // Теперь принимает и строку, и объект {uk: "", en: ""}
  text?: any // Аналогично
  buttonText?: any // Аналогично
  backgroundImage?: any
}

export function ConsultationSection({
  title,
  text,
  buttonText,
  backgroundImage,
}: ConsultationProps) {
  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  // Универсальная функция перевода
  const t = (field: any): string => {
    if (!field) return ''
    if (typeof field === 'object') {
      // Ищем текущий язык -> потом украинский -> потом первый доступный ключ
      return field[locale] || field['uk'] || Object.values(field)[0] || ''
    }
    return String(field)
  }

  const imageUrl = typeof backgroundImage === 'object' ? backgroundImage?.url : backgroundImage

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
          {/* Если title не заполнен в админке, выведется пустая строка или можно задать дефолт через t(title) || 'Дефолт' */}
          <h2 className={styles.title}>
            {t(title) || (locale === 'en' ? 'Not sure what to choose?' : 'Не знаєш що вибрати?')}
          </h2>

          {text && <p className={styles.text}>{t(text)}</p>}

          <button className={styles.button}>
            {t(buttonText) || (locale === 'en' ? 'Contact us' : 'Зв’язатися з нами')}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
