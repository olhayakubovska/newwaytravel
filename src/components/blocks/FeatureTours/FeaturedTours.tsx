// 'use client'

// import { motion } from 'framer-motion'
// import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react'
// import styles from './FeaturedTours.module.scss'
// import Link from 'next/link'
// import { useParams } from 'next/navigation'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Pagination } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/pagination'
// interface TourData {
//   id: any
//   name: any
//   subtitle?: any
//   description?: any
//   location: any
//   month?: any
//   groupSize?: any
//   duration: any
//   price: any
//   mainImage?: {
//     url: string
//     alt?: string
//   }
// }

// export function FeaturedTours({
//   title,
//   selectedTours,
// }: {
//   title: string
//   selectedTours: TourData[]
// }) {
//   const params = useParams()
//   const locale = (params?.locale as 'uk' | 'en') || 'uk'

//   const t = (field: any): string => {
//     if (!field) return ''
//     if (typeof field === 'object') {
//       return field[locale] || field['uk'] || field['en'] || ''
//     }
//     return String(field)
//   }

//   const i18n = {
//     allTours: locale === 'en' ? 'Tour Calendar' : 'Календар турів',
//     details: locale === 'en' ? 'Details' : 'Деталі',
//     from: locale === 'en' ? 'from' : 'від',
//   }

//   return (
//     <section className={styles.section}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h2 className={styles.title}>
//             {title || (locale === 'en' ? 'Upcoming Tours' : 'Найближчі тури')}
//           </h2>

//           <Link href={`/${locale}/tours`} className={styles.calendarLink}>
//             {i18n.allTours} <ArrowRight size={18} />
//           </Link>
//         </div>

//         <Swiper
//           modules={[Pagination]}
//           spaceBetween={24}
//           slidesPerView={3}
//           pagination={{ clickable: true }}
//           className={styles.swiper}
//           breakpoints={{
//             320: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//         >
//           {selectedTours?.map((tour, index) => {
//             const tourId = typeof tour.id === 'object' ? tour.id[locale] || tour.id['uk'] : tour.id
//             const imageUrl = tour.mainImage?.url || '/placeholder-tour.jpg'

//             return (
//               <SwiperSlide key={tourId}>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                 >
//                   <Link href={`/${locale}/tours/${tourId}`} className={styles.cardLink}>
//                     <div className={styles.card}>
//                       <div className={styles.imageWrapper}>
//                         <img src={imageUrl} alt={t(tour.name)} className={styles.image} />
//                         <div className={styles.priceTag}>{t(tour.price)}€</div>
//                       </div>

//                       <div className={styles.content}>
//                         <h3 className={styles.cardTitle}>{t(tour.name)}</h3>

//                         <div className={styles.infoGrid}>
//                           <div className={styles.infoRow}>
//                             <MapPin size={14} />
//                             <span>{t(tour.location)}</span>
//                           </div>

//                           <div className={styles.infoRow}>
//                             <Calendar size={14} />
//                             <span>{t(tour.month)}</span>
//                           </div>

//                           <div className={styles.infoRow}>
//                             <Clock size={14} />
//                             <span>{t(tour.duration)}</span>
//                           </div>
//                         </div>

//                         <div className={styles.footer}>
//                           <span className={styles.detailsText}>{i18n.details} →</span>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               </SwiperSlide>
//             )
//           })}
//         </Swiper>
//       </div>
//     </section>
//   )
// }

'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react'
import styles from './FeaturedTours.module.scss'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface TourData {
  id: any
  name: any
  location: any
  month?: any
  duration: any
  price: any
  mainImage?: {
    url: string
    alt?: string
  }
}

interface FeaturedToursProps {
  title?: any // Теперь может быть объектом {uk: "", en: ""}
  selectedTours: TourData[]
  allToursLabel?: any // Текст ссылки (вводится в админке)
  detailsLabel?: any // Текст кнопки (вводится в админке)
}

export function FeaturedTours({
  title,
  selectedTours,
  allToursLabel,
  detailsLabel,
}: FeaturedToursProps) {
  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  // Универсальная функция перевода
  const t = (field: any): string => {
    if (!field) return ''
    if (typeof field === 'object') {
      // Ищем текущий язык, если нет - берем украинский, если нет - первый попавшийся
      return field[locale] || field['uk'] || Object.values(field)[0] || ''
    }
    return String(field)
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t(title)}</h2>

          <Link href={`/${locale}/tours`} className={styles.calendarLink}>
            {t(allToursLabel)} <ArrowRight size={18} />
          </Link>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={3}
          pagination={{ clickable: true }}
          className={styles.swiper}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {selectedTours?.map((tour, index) => {
            // Исправленная логика ID для ссылок
            const tourId =
              typeof tour.id === 'object'
                ? tour.id[locale] || tour.id['uk'] || Object.values(tour.id)[0]
                : tour.id

            const imageUrl = tour.mainImage?.url || '/placeholder-tour.jpg'

            return (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/tours/${tourId}`} className={styles.cardLink}>
                    <div className={styles.card}>
                      <div className={styles.imageWrapper}>
                        <img src={imageUrl} alt={t(tour.name)} className={styles.image} />
                        <div className={styles.priceTag}>{t(tour.price)}€</div>
                      </div>

                      <div className={styles.content}>
                        <h3 className={styles.cardTitle}>{t(tour.name)}</h3>

                        <div className={styles.infoGrid}>
                          <div className={styles.infoRow}>
                            <MapPin size={14} />
                            <span>{t(tour.location)}</span>
                          </div>

                          <div className={styles.infoRow}>
                            <Calendar size={14} />
                            <span>{t(tour.month)}</span>
                          </div>

                          <div className={styles.infoRow}>
                            <Clock size={14} />
                            <span>{t(tour.duration)}</span>
                          </div>
                        </div>

                        <div className={styles.footer}>
                          <span className={styles.detailsText}>{t(detailsLabel)} →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
