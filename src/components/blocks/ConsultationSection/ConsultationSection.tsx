// 'use client'
// import { motion } from 'framer-motion'
// import { useParams } from 'next/navigation'
// import styles from './ConsultationSection.module.scss'
// import { Media, Config } from '@/payload-types'

// type Locale = Config['locale']

// interface ConsultationProps {
//   title?: string | Record<string, string> | null
//   text?: string | Record<string, string> | null
//   buttonText?: string | Record<string, string> | null
//   phoneNumber?: string | Record<string, string> | null
//   backgroundImage?: string | Media | null
// }

// export function ConsultationSection({
//   title,
//   text,
//   buttonText,
//   backgroundImage,
//   phoneNumber,
// }: ConsultationProps) {
//   const params = useParams()
//   const locale = (params?.locale as Locale) || 'uk'

//   const t = (field: string | Record<string, string> | null | undefined): string => {
//     if (!field) return ''
//     if (typeof field === 'object') {
//       return field[locale] || field['uk'] || field['en'] || Object.values(field)[0] || ''
//     }
//     return String(field)
//   }

//   const imageUrl = typeof backgroundImage === 'object' ? backgroundImage?.url : backgroundImage

//   const phoneString = t(phoneNumber)
//   const cleanNumber = phoneString ? phoneString.replace(/\s+/g, '') : ''

//   return (
//     <section className={styles.section}>
//       <div className={styles.bgWrapper}>
//         {imageUrl ? (
//           <img src={imageUrl} alt={t(title)} className={styles.image} />
//         ) : (
//           <div className={styles.placeholder} />
//         )}
//         <div className={styles.overlay} />
//       </div>

//       <div className={styles.content}>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className={styles.inner}
//         >
//           <h2 className={styles.title}>
//             {t(title) || (locale === 'en' ? 'Not sure what to choose?' : 'Не знаєш що вибрати?')}
//           </h2>

//           {text && <p className={styles.text}>{t(text)}</p>}

//           {cleanNumber && (
//             <a href={`tel:${cleanNumber}`} className={styles.button}>
//               {t(buttonText) || (locale === 'en' ? 'Contact us' : 'Зв’язатися з нами')}
//             </a>
//           )}
//         </motion.div>
//       </div>
//     </section>
//   )
// }

'use client'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import styles from './ConsultationSection.module.scss'
import { Media, Config } from '@/payload-types'

type Locale = Config['locale']

interface ConsultationProps {
  title?: any // Используем any для гибкости входящих данных из Payload
  text?: any
  buttonText?: any
  phoneNumber?: any
  backgroundImage?: string | Media | null
}

export function ConsultationSection({
  title,
  text,
  buttonText,
  backgroundImage,
  phoneNumber,
}: ConsultationProps) {
  const params = useParams()
  const locale = (params?.locale as Locale) || 'uk'

  // Универсальная функция перевода
  const t = (field: any): string => {
    if (!field) return ''
    if (typeof field === 'string') return field
    if (typeof field === 'object') {
      return field[locale] || field['uk'] || field['en'] || Object.values(field)[0] || ''
    }
    return String(field)
  }

  const imageUrl = typeof backgroundImage === 'object' ? backgroundImage?.url : backgroundImage

  const phoneString = t(phoneNumber)
  const cleanNumber = phoneString ? phoneString.replace(/\s+/g, '') : ''

  return (
    <section className={styles.section}>
      <div className={styles.bgWrapper}>
        {imageUrl ? (
          <img src={imageUrl} alt={t(title)} className={styles.image} />
        ) : (
          <div className={styles.placeholder} />
        )}
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={styles.inner}
        >
          <h2 className={styles.title}>
            {t(title) || (locale === 'en' ? 'Not sure what to choose?' : 'Не знаєш що вибрати?')}
          </h2>

          {text && <p className={styles.text}>{t(text)}</p>}

          <a href={cleanNumber ? `tel:${cleanNumber}` : '#'} className={styles.button}>
            {t(buttonText) || (locale === 'en' ? 'Contact us' : 'Зв’язатися з нами')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
