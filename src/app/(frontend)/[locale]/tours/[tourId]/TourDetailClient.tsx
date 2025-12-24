// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Plus } from 'lucide-react'
// import { BookingModal } from '@/components/blocks/modal/BookingModal/BookingModal'
// import { ConsultationModal } from '@/components/blocks/modal/ConsultationModal/ConsultationModal'
// import styles from './TourDetailPage.module.scss'
// import { RichText } from '@/components/blocks/ui/RichText'

// interface Tour {
//   name: any
//   mainImage?: { url: string }
//   description?: any
//   price: number
//   groupSize?: any
//   duration?: any
//   itinerary?: any[]
//   leaders?: any[]
// }

// export default function TourDetailClient({ tour, locale }: { tour: Tour; locale: 'uk' | 'en' }) {
//   const [consultationOpen, setConsultationOpen] = useState(false)
//   const [bookingOpen, setBookingOpen] = useState(false)
//   const [openDay, setOpenDay] = useState<number | null>(0)

//   const t = (field: any) => {
//     if (typeof field === 'object' && field !== null) {
//       return field[locale] || field.uk || field.en || ''
//     }
//     return field || ''
//   }

//   return (
//     <main className={styles.wrapper}>
//       {/* 1. HERO БАННЕР */}
//       <section
//         className={styles.hero}
//         style={{ backgroundImage: `url(${tour.mainImage?.url || ''})` }}
//       >
//         <div className={styles.heroContent}>
//           <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//             {t(tour.name)}
//           </motion.h1>
//           <div className={styles.buttonGroup}>
//             <button
//               className={`${styles.btn} ${styles.primary}`}
//               onClick={() => setBookingOpen(true)}
//             >
//               {locale === 'en' ? 'Book Now' : 'Забронювати'}
//             </button>
//             <button
//               className={`${styles.btn} ${styles.secondary}`}
//               onClick={() => setConsultationOpen(true)}
//             >
//               {locale === 'en' ? 'Consultation' : 'Консультація'}
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 2. ИНФОРМАЦИЯ И САЙДБАР */}
//       <div className={styles.mainGrid}>
//         <section>
//           <div className={styles.card}>
//             <h2>{locale === 'en' ? 'Tour Information:' : 'Інформація про тур:'}</h2>
//             <div className={styles.description}>
//               <RichText content={tour.description} />
//             </div>
//           </div>
//         </section>

//         <aside className={styles.sidebar}>
//           <div className={styles.sideCard}>
//             <div className={styles.badge}>50€ для ЗСУ</div>
//             <div className={styles.label}>{locale === 'en' ? 'Cost' : 'Вартість'}</div>
//             <div className={styles.value}>{tour.price}€</div>
//           </div>
//           <div className={styles.sideCard}>
//             <div className={styles.label}>{locale === 'en' ? 'Group Size' : 'Розмір групи'}</div>
//             <div className={styles.value}>{t(tour.groupSize)}</div>
//           </div>
//           <div className={styles.sideCard}>
//             <div className={styles.label}>{locale === 'en' ? 'Duration' : 'Тривалість'}</div>
//             <div className={styles.value}>{t(tour.duration)}</div>
//           </div>
//           <div className={`${styles.sideCard} ${styles.highlight}`}>
//             <div className={styles.label} style={{ color: '#f9a825' }}>
//               Бронь тура*
//             </div>
//             <div className={styles.value}>Аванс — 50% / Людина</div>
//             <p className={styles.smallNote}>*Передоплата не повертається.</p>
//           </div>
//         </aside>
//       </div>

//       {/* 3. ПРОГРАММА ТУРА (Как на фото) */}
//       <section className={styles.programSection}>
//         <h2 className={styles.sectionTitle}>
//           {locale === 'en' ? 'Tour Program' : 'Програма туру'}
//         </h2>
//         <div className={styles.programLayout}>
//           {/* Левая карточка консультации */}
//           <div className={styles.consultCard}>
//             <h3>Тільки найяскравіші враження!</h3>
//             <p>New Way зробить кожен день вашої подорожі незабутнім.</p>
//             <button className={styles.orangeBtn} onClick={() => setConsultationOpen(true)}>
//               Консультація
//             </button>
//           </div>

//           {/* Правая часть — Аккордеон */}
//           <div className={styles.accordionContainer}>
//             {tour.itinerary?.map((day: any, idx: number) => (
//               <div key={idx} className={styles.dayItem}>
//                 <div
//                   className={styles.dayHeader}
//                   onClick={() => setOpenDay(openDay === idx ? null : idx)}
//                 >
//                   <span>{day.dayTitle || `День ${idx + 1}`}</span>
//                   <Plus className={openDay === idx ? styles.rotate : ''} />
//                 </div>
//                 <AnimatePresence>
//                   {openDay === idx && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       className={styles.dayContent}
//                     >
//                       <RichText content={day.content} />
//                       <div className={styles.dayImages}>
//                         {day.images?.map((imgObj: any, i: number) => (
//                           <img key={i} src={imgObj.image?.url} alt="Travel" />
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className={styles.leaderSection}>
//         <h2 className={styles.sectionTitle}>
//           {locale === 'en' ? 'Route & Team' : 'Карта турлідер'}
//         </h2>
//         {/* <div className={styles.mapPlaceholder}>
//             <h3>Маршрут Туру</h3>
//             <button className={styles.orangeBtn} onClick={() => setBookingOpen(true)}>
//               Забронювати
//             </button>
//           </div> */}

//         {/* Список лидеров */}
//         <div className={styles.leadersWrapper}>
//           {tour.leaders?.map((leader, index) => (
//             <div key={index} className={styles.leaderCard}>
//               <div className={styles.leaderHeader}>{leader.name}</div>
//               <img src={leader.photo?.url} alt={leader.name} className={styles.leaderImg} />
//               <div className={styles.leaderFooter}>
//                 <strong>{t(leader.role)}</strong>
//                 <p>{t(leader.bio)}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {bookingOpen && (
//         <BookingModal tourName={t(tour.name)} onClose={() => setBookingOpen(false)} />
//       )}
//       {consultationOpen && (
//         <ConsultationModal locale={locale} onClose={() => setConsultationOpen(false)} />
//       )}
//     </main>
//   )
// }
/////////////////////////////////////////

// 'use client'

// import { useEffect, useRef } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import TripItinerary from '@/components/blocks/ui/TripItinerary/TripItinerary'
// import StickyBookButton from '@/components/blocks/ui/StickyBookButton/StickyBookButton'
// import { TourInformation } from '@/components/blocks/ui/TourInformation/TourInformation'
// import styles from './TourDetailPage.module.scss'
// import TripDetails from '@/components/blocks/ui/TripDetails/TripDetails'
// import { HeroSection } from '@/components/blocks/HeroSection/HeroSection'
// // Тип для туров
// export interface Tour {
//   id: string
//   title: string
//   subtitle?: string
//   mainImage?: { url: string }
//   description?: any
//   gallery?: { image: { url: string } }[]
//   itinerary?: {
//     dayTitle?: string
//     content?: any
//   }[]
//   leader?: {
//     name: string
//     role?: any
//     bio?: any
//     photo?: { url: string }
//   }
//   location?: string
//   dates?: string
//   groupSize?: string
//   duration?: string
//   price?: string
// }

// interface Props {
//   tour: Tour
//   locale: 'uk' | 'en'
// }

// gsap.registerPlugin(ScrollTrigger)

// export default function TourDetailClient({ tour, locale }: Props) {
//   const mainRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

//     if (!prefersReducedMotion && mainRef.current) {
//       const sections = mainRef.current.querySelectorAll(`.${styles.animateSection}`)

//       sections.forEach((section) => {
//         gsap.fromTo(
//           section,
//           { y: 30, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 0.8,
//             ease: 'power2.out',
//             scrollTrigger: {
//               trigger: section,
//               start: 'top 80%',
//               toggleActions: 'play none none none',
//             },
//           },
//         )
//       })
//     }
//   }, [tour.id]) // анимация при смене тура

//   return (
//     <div className={styles.wrapper}>
//       <HeroSection subtitle={'subtitle'} title={'title'} description={'description'} />
//       <main ref={mainRef} className={styles.main}>
//         <div className={styles.container}>
//           {/* Детали тура */}
//           <section className={`${styles.section} ${styles.animateSection}`}>
//             <TripDetails tour={tour} locale={locale} />
//           </section>

//           {/* Информация про тур */}
//           <section className={`${styles.section} ${styles.animateSection}`}>
//             <TourInformation tour={tour} locale={locale} />
//           </section>

//           {/* Программа / Маршрут */}
//           <section className={`${styles.section} ${styles.animateSection}`}>
//             <TripItinerary tour={tour} locale={locale} />
//           </section>
//         </div>
//       </main>

//       {/* Липкая кнопка */}
//       <StickyBookButton tour={tour} locale={locale} />
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { RichText } from '@/components/blocks/ui/RichText'
import TripDetails from '@/components/blocks/ui/TripDetails/TripDetails'
import TripItinerary from '@/components/blocks/ui/TripItinerary/TripItinerary'
import { BookingModal } from '@/components/blocks/modal/BookingModal/BookingModal'
import { ConsultationModal } from '@/components/blocks/modal/ConsultationModal/ConsultationModal'
import styles from './TourDetailPage.module.scss'
import { HeroSection } from '@/components/blocks/HeroSection/HeroSection'

export interface Media {
  createdAt: string
  updatedAt: string
  alt?: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  focalX?: number
  focalY?: number
  id: string
  url: string
  thumbnailURL?: string | null
}

export interface Leader {
  id: string
  name: string
  role?: string
  bio?: string
  photo?: Media
}

export interface ItineraryDay {
  id: string
  dayTitle?: string
  content?: any
  images?: Media[]
}

export interface GalleryItem {
  id: string
  image: Media
}

export interface Tour {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  slug: string
  price: number
  category?: string
  location?: string
  duration?: string
  groupSize?: string
  description?: any
  mainImage?: Media
  itinerary?: ItineraryDay[]
  leaders?: Leader[]
  gallery?: GalleryItem[]
}

interface Props {
  tour: Tour
  locale: 'uk' | 'en'
}

interface Props {
  tour: Tour
  locale: 'uk' | 'en'
}

// export default function TourDetailClient({ tour, locale }: Props) {
//   const [bookingOpen, setBookingOpen] = useState(false)
//   const [consultationOpen, setConsultationOpen] = useState(false)

//   /** безопасный перевод */
//   const t = (field: any) => {
//     if (typeof field === 'object' && field !== null) {
//       return field[locale] || field.uk || field.en || ''
//     }
//     return field || ''
//   }

//   console.log(tour, 'tour')
//   return (
//     <main className={styles.wrapper}>
//       {/* HERO */}
//       <section
//         className={styles.hero}
//         style={{ backgroundImage: `url(${tour.mainImage?.url || ''})` }}
//       >
//         <div className={styles.heroContent}>
//           <h1>{t(tour.name)}</h1>

//           <div className={styles.actions}>
//             <button className={styles.primaryBtn} onClick={() => setBookingOpen(true)}>
//               {locale === 'en' ? 'Book now' : 'Забронювати'}
//             </button>
//             <button className={styles.secondaryBtn} onClick={() => setConsultationOpen(true)}>
//               {locale === 'en' ? 'Consultation' : 'Консультація'}
//             </button>
//           </div>
//         </div>
//       </section>
//       {/* INFO */}
//       <section className={styles.section}>
//         <h2 className={styles.sectionTitle}>
//           {locale === 'en' ? 'Tour information' : 'Інформація про тур'}
//         </h2>

//         {tour.description && <RichText content={tour.description} />}
//       </section>
//       {/* DETAILS */}
//       <section className={styles.section}>
//         <TripDetails tour={tour} locale={locale} />
//       </section>
//       {/* ITINERARY */}
//       <section className={styles.section}>
//         <TripItinerary tour={tour} locale={locale} />
//       </section>
//       {tour.leaders && tour.leaders.length > 0 && (
//         <section className={styles.section}>
//           <h2 className={styles.sectionTitle}>
//             {locale === 'en' ? 'Tour leader(s)' : 'Турлідер(и)'}
//           </h2>

//           <div className={styles.leadersWrapper}>
//             {tour.leaders.map((leader, index) => (
//               <div key={index} className={styles.leaderCard}>
//                 {leader.photo?.url && (
//                   <img src={leader.photo.url} alt={leader.name} className={styles.leaderImg} />
//                 )}
//                 <h3 className={styles.leaderName}>{leader.name}</h3>
//                 {leader.role && <strong>{t(leader.role)}</strong>}
//                 {leader.bio && <RichText content={leader.bio} />}
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* GALLERY */}
//       {tour.gallery && tour.gallery.length > 0 && (
//         <section className={styles.section}>
//           <h2 className={styles.sectionTitle}>{locale === 'en' ? 'Gallery' : 'Галерея'}</h2>
//           <div className={styles.galleryWrapper}>
//             {tour.gallery.map((item) => (
//               <div key={item.id} className={styles.galleryCard}>
//                 <img src={item.image.url} alt={item.image.alt || 'Gallery image'} />
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {bookingOpen && (
//         <BookingModal tourName={t(tour.name)} onClose={() => setBookingOpen(false)} />
//       )}
//       {consultationOpen && (
//         <ConsultationModal locale={locale} onClose={() => setConsultationOpen(false)} />
//       )}
//     </main>
//   )
// }
export default function TourDetailClient({ tour, locale }: Props) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [consultationOpen, setConsultationOpen] = useState(false)

  const t = (field: any) => {
    if (typeof field === 'object' && field !== null) {
      return field[locale] || field.uk || field.en || ''
    }
    return field || ''
  }

  return (
    <main className={styles.wrapper}>
      {/* HERO */}
      {/* <section>
        <HeroSection subtitle={'subtitle'} title={'title'} description={'description'} />
        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={() => setBookingOpen(true)}>
            {locale === 'en' ? 'Book now' : 'Забронювати'}
          </button>
          <button className={styles.secondaryBtn} onClick={() => setConsultationOpen(true)}>
            {locale === 'en' ? 'Consultation' : 'Консультація'}
          </button>
        </div>
      </section> */}
      <section className={styles.hero}>
        <HeroSection
          title={t(tour.name)}
          subtitle={tour.location}
          description={tour.duration}
          // backgroundImage={tour.mainImage?.url}
        />

        <div className={styles.heroActions}>
          <button className={styles.primaryBtn} onClick={() => setBookingOpen(true)}>
            {locale === 'en' ? 'Book now' : 'Забронювати'}
          </button>
          <button className={styles.secondaryBtn} onClick={() => setConsultationOpen(true)}>
            {locale === 'en' ? 'Consultation' : 'Консультація'}
          </button>
        </div>
      </section>
      {/* DETAILS */}
      <section className={styles.section}>
        {/* <h2 className={styles.title}>{locale === 'en' ? 'Trip Details' : 'ТРІП ДЕТАЛІ'}</h2> */}
        <div className={styles.cardWrapper}>
          <TripDetails tour={tour} locale={locale} />
          <TripDetails tour={tour} locale={locale} />
        </div>
      </section>

      {/* INFO + GALLERY */}
      <section className={styles.section}>
        <div className={styles.infoGrid}>
          {/* LEFT */}
          <div className={styles.infoCard}>
            <h3>{locale === 'en' ? 'Tour information' : 'Інформація про тур'}</h3>

            {tour.description && <RichText content={tour.description} />}

            <button
              className={styles.primaryBtn}
              style={{ marginTop: '20px' }}
              onClick={() => setBookingOpen(true)}
            >
              {locale === 'en' ? 'Book now' : 'Забронювати'}
            </button>
          </div>

          {/* RIGHT */}
          {tour.gallery && (
            <div className={styles.galleryWrapper}>
              {tour.gallery.slice(0, 6).map((item) => (
                <div key={item.id} className={styles.galleryCard}>
                  <img src={item.image.url} alt={item.image.alt || ''} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PROGRAM */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {locale === 'en' ? 'Tour program' : 'Програма туру'}
        </h2>

        <div className={styles.programLayout}>
          {/* LEFT */}
          <div className={styles.consultCard}>
            <h3>{locale === 'en' ? 'Only best impressions' : 'Тільки найяскравіші враження!'}</h3>
            <p>
              {locale === 'en'
                ? 'We are open to suggestions and can adjust the program for you.'
                : 'Ми відкриті до пропозицій та можемо адаптувати програму під вас.'}
            </p>

            <button className={styles.orangeBtn} onClick={() => setConsultationOpen(true)}>
              {locale === 'en' ? 'Consultation' : 'Консультація'}
            </button>
          </div>

          {/* RIGHT */}
          <TripItinerary tour={tour} locale={locale} />
        </div>
      </section>

      {/* LEADERS */}
      {tour.leaders && tour.leaders.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{locale === 'en' ? 'Tour leaders' : 'Турлідери'}</h2>

          <div className={styles.leadersWrapper}>
            {tour.leaders.map((leader) => (
              <div key={leader.id} className={styles.leaderCard}>
                {leader.photo?.url && (
                  <img className={styles.leaderImg} src={leader.photo.url} alt={leader.name} />
                )}
                <h3 className={styles.leaderName}>{leader.name}</h3>
                {leader.role && <strong>{t(leader.role)}</strong>}
                {leader.bio && <RichText content={leader.bio} />}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MODALS */}
      {bookingOpen && (
        <BookingModal tourName={t(tour.name)} onClose={() => setBookingOpen(false)} />
      )}
      {consultationOpen && (
        <ConsultationModal locale={locale} onClose={() => setConsultationOpen(false)} />
      )}
    </main>
  )
}
