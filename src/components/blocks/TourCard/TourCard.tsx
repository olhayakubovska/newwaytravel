// // 'use client'

// // import React from 'react'
// // import Link from 'next/link'
// // import { motion } from 'framer-motion'
// // import { MapPin, Clock, Users as UsersIcon } from 'lucide-react'
// // import styles from './TourCard.module.scss'
// // import { Button } from '@payloadcms/ui'

// // interface TourCardProps {
// //   id: string
// //   image: string
// //   title: string
// //   destination: string
// //   duration: string
// //   groupSize: string
// //   price: string
// //   alt: string
// // }

// // export function TourCard({
// //   id,
// //   image,
// //   title,
// //   destination,
// //   duration,
// //   groupSize,
// //   price,
// //   alt,
// // }: TourCardProps) {
// //   return (
// //     <Link href={`/tours/${id}`} className={styles.cardLink}>
// //       <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className={styles.card}>
// //         {/* Изображение */}
// //         <div className={styles.imageWrapper}>
// //           <img
// //             src={image || '/placeholder-tour.jpg'}
// //             alt={alt || title}
// //             className={styles.image}
// //             loading="lazy"
// //           />
// //         </div>

// //         {/* Контентная часть */}
// //         <div className={styles.content}>
// //           <h3 className={styles.title}>{title}</h3>

// //           <div className={styles.info}>
// //             <div className={styles.infoItem}>
// //               <MapPin className={styles.icon} />
// //               <span>{destination}</span>
// //             </div>

// //             <div className={styles.infoItem}>
// //               <Clock className={styles.icon} />
// //               <span>{duration}</span>
// //             </div>

// //             <div className={styles.infoItem}>
// //               <UsersIcon className={styles.icon} />
// //               <span>{groupSize}</span>
// //             </div>
// //           </div>

// //           <div className={styles.footer}>
// //             <div className={styles.priceContainer}>
// //               <span className={styles.priceLabel}>від</span>
// //               <span className={styles.priceValue}>{price}</span>
// //             </div>
// //             <Button className={styles.button}>Деталі</Button>
// //           </div>
// //         </div>
// //       </motion.div>
// //     </Link>
// //   )
// // }
// 'use client'

// import React from 'react'
// import Link from 'next/link'
// import { useParams } from 'next/navigation' // Добавлено
// import { motion } from 'framer-motion'
// import { MapPin, Clock, Users as UsersIcon } from 'lucide-react'
// import styles from './TourCard.module.scss'
// import { Button } from '@payloadcms/ui'

// interface TourCardProps {
//   id: string
//   image: string
//   title: any // Изменено на any, так как придет объект
//   destination: any // Изменено на any
//   duration: any // Изменено на any
//   groupSize: any // Изменено на any
//   price: string
//   alt: any // Изменено на any
// }

// export function TourCard({
//   id,
//   image,
//   title,
//   destination,
//   duration,
//   groupSize,
//   price,
//   alt,
// }: TourCardProps) {
//   const params = useParams()
//   const locale = (params?.locale as string) || 'uk'

//   // Универсальный хелпер для извлечения текста
//   const getText = (field: any) => {
//     if (typeof field === 'object' && field !== null) {
//       return field[locale] || field['uk'] || field['en'] || ''
//     }
//     return field
//   }

//   return (
//     <Link href={`/${locale}/tours/${id}`} className={styles.cardLink}>
//       <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className={styles.card}>
//         <div className={styles.imageWrapper}>
//           <img
//             src={image || '/placeholder-tour.jpg'}
//             alt={getText(alt) || getText(title)}
//             className={styles.image}
//             loading="lazy"
//           />
//         </div>

//         <div className={styles.content}>
//           <h3 className={styles.title}>{getText(title)}</h3>

//           <div className={styles.info}>
//             <div className={styles.infoItem}>
//               <MapPin className={styles.icon} />
//               <span>{getText(destination)}</span>
//             </div>

//             <div className={styles.infoItem}>
//               <Clock className={styles.icon} />
//               <span>{getText(duration)}</span>
//             </div>

//             <div className={styles.infoItem}>
//               <UsersIcon className={styles.icon} />
//               <span>{getText(groupSize)}</span>
//             </div>
//           </div>

//           <div className={styles.footer}>
//             <div className={styles.priceContainer}>
//               <span className={styles.priceLabel}>{locale === 'en' ? 'from' : 'від'}</span>
//               <span className={styles.priceValue}>{price} €</span>
//             </div>
//             <Button className={styles.button}>{locale === 'en' ? 'Details' : 'Деталі'}</Button>
//           </div>
//         </div>
//       </motion.div>
//     </Link>
//   )
// }
'use client'

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Clock, Users as UsersIcon } from 'lucide-react'
import styles from './TourCard.module.scss'
import { Button } from '@payloadcms/ui'

interface TourCardProps {
  id: any // Может прийти объект, если slug локализован
  image: string
  title: any
  destination: any
  duration: any
  groupSize: any
  price: any // Добавляем проверку и сюда
  alt: any
}

export function TourCard({
  id,
  image,
  title,
  destination,
  duration,
  groupSize,
  price,
  alt,
}: TourCardProps) {
  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  // Хелпер для извлечения текста из объекта {uk, en} или строки
  const getText = (field: any): string => {
    if (!field) return ''
    if (typeof field === 'object') {
      return field[locale] || field['uk'] || field['en'] || ''
    }
    return String(field)
  }

  // Безопасно получаем ID (если это slug и он локализован)
  const tourId = typeof id === 'object' ? id[locale] || id['uk'] : id

  return (
    <Link href={`/${locale}/tours/${tourId}`} className={styles.cardLink}>
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt={getText(alt) || getText(title)}
            className={styles.image}
            loading="lazy"
          />
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{getText(title)}</h3>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <MapPin className={styles.icon} />
              <span>{getText(destination)}</span>
            </div>

            <div className={styles.infoItem}>
              <Clock className={styles.icon} />
              <span>{getText(duration)}</span>
            </div>

            <div className={styles.infoItem}>
              <UsersIcon className={styles.icon} />
              <span>{getText(groupSize)}</span>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.priceContainer}>
              <span className={styles.priceLabel}>{locale === 'en' ? 'from' : 'від'}</span>
              <span className={styles.priceValue}>{getText(price)} €</span>
            </div>
            <Button className={styles.button}>{locale === 'en' ? 'Details' : 'Деталі'}</Button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
