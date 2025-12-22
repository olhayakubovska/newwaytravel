// 'use client'

// import { useState } from 'react'
// import styles from './TourDetailPage.module.scss'
// import { motion } from 'framer-motion'
// import { Calendar, Clock, DollarSign, Users } from 'lucide-react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/blocks/ui/Tabs/Tabs'
// import { Button } from '@payloadcms/ui'
// import { BookingModal } from '@/components/blocks/BookingModal/BookingModal'

// export default function TourDetailClient({ tour }: { tour: any }) {
//   const [consultationOpen, setConsultationOpen] = useState(false)
//   const [bookingOpen, setBookingOpen] = useState(false)

//   // Вспомогательная функция для безопасного вывода текста (локализация)
//   const t = (field: any) => {
//     if (typeof field === 'object' && field !== null) {
//       return field.uk || field.en || '' // Берем украинский, иначе английский
//     }
//     return field || ''
//   }

//   return (
//     <div className={styles.page}>
//       <div className={styles.banner}>
//         <img
//           src={
//             tour.mainImage?.url ||
//             'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&h=1080&fit=crop'
//           }
//           alt={t(tour.title)}
//         />
//         <div className={styles.overlay} />
//         <div className={styles.content}>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={styles.title}
//           >
//             {t(tour.title)}
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className={styles.subtitle}
//           >
//             {t(tour.destination)}
//           </motion.p>
//           <div className={styles.buttons}>
//             {/* Используем обычную кнопку, чтобы onClick точно сработал */}
//             <button className={styles.mainBtn} onClick={() => setBookingOpen(true)}>
//               Забронювати
//             </button>
//             <button className={styles.secondaryBtn} onClick={() => setConsultationOpen(true)}>
//               Консультація
//             </button>
//           </div>
//         </div>
//       </div>

//       {bookingOpen && (
//         <BookingModal tourName={t(tour.title)} onClose={() => setBookingOpen(false)} />
//       )}

//       <div className={styles.info}>
//         <div className="container">
//           <div className={styles.grid}>
//             <div className={styles.item}>
//               <Clock className="h-8 w-8 text-primary" />
//               <div className="text">
//                 <p>Тривалість</p>
//                 <p>{t(tour.duration)}</p>
//               </div>
//             </div>
//             <div className={styles.item}>
//               <Users className="h-8 w-8 text-primary" />
//               <div className="text">
//                 <p>Група</p>
//                 <p>{t(tour.groupSize)}</p>
//               </div>
//             </div>
//             <div className={styles.item}>
//               <DollarSign className="h-8 w-8 text-primary" />
//               <div className="text">
//                 <p>Ціна</p>
//                 <p>{tour.price}€</p>
//               </div>
//             </div>
//             <div className={styles.item}>
//               <Calendar className="h-8 w-8 text-primary" />
//               <div className="text">
//                 <p>Найближча дата</p>
//                 <p>{t(tour.month)}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={styles.tabsWrapper}>
//         <Tabs defaultValue="overview" className="w-full">
//           <TabsList>
//             <TabsTrigger value="overview">Огляд</TabsTrigger>
//             <TabsTrigger value="itinerary">Маршрут</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className={styles.tabsContent}>
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//               {/* Рендерим HTML безопасно */}
//               <div
//                 dangerouslySetInnerHTML={{ __html: t(tour.descriptionHtml) || t(tour.description) }}
//               />
//             </motion.div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, DollarSign, Users, Plus } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/blocks/ui/Tabs/Tabs'
import { BookingModal } from '@/components/blocks/BookingModal/BookingModal'
import styles from './TourDetailPage.module.scss'

export default function TourDetailClient({ tour }: { tour: any }) {
  const [consultationOpen, setConsultationOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  // Вспомогательная функция для локализации
  const t = (field: any) => {
    if (typeof field === 'object' && field !== null) {
      return field.uk || field.en || ''
    }
    return field || ''
  }

  console.log(tour)

  return (
    <main className={styles.wrapper}>
      {/* 1. БАННЕР (HERO) */}
      <section
        className={styles.hero}
        // style={{
        //   backgroundImage: tour.mainImage?.url ? `url(${tour.mainImage.url})` : 'none',
        // }}
      >
        <img src={tour.mainImage?.url} alt="test" style={{ width: '200px', height: 'auto' }} />
        <div className={styles.heroContent}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {t(tour.title)}
          </motion.h1>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.btn} ${styles.primary}`}
              onClick={() => setBookingOpen(true)}
            >
              Забронювати
            </button>
            <button
              className={`${styles.btn} ${styles.secondary}`}
              onClick={() => setConsultationOpen(true)}
            >
              Консультація
            </button>
          </div>
        </div>
      </section>

      {/* 2. ОСНОВНАЯ СЕТКА */}
      <div className={styles.mainGrid}>
        {/* Левая часть */}
        <section>
          <div className={styles.card}>
            <h2>Інформація про тур:</h2>
            <div className={styles.description}>
              <div
                dangerouslySetInnerHTML={{ __html: t(tour.descriptionHtml) || t(tour.description) }}
              />
            </div>
            <button
              className={`${styles.btn} ${styles.primary}`}
              style={{ marginTop: '20px' }}
              onClick={() => setBookingOpen(true)}
            >
              Забронювати
            </button>
          </div>

          <div className={styles.tabsWrapper}>
            <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className={styles.customTabsList}>
                <TabsTrigger value="itinerary" className={styles.customTrigger}>
                  Програма туру
                </TabsTrigger>
                <TabsTrigger value="details" className={styles.customTrigger}>
                  Деталі
                </TabsTrigger>
              </TabsList>

              <TabsContent value="itinerary">
                <div className={styles.program}>
                  {/* Если у вас в объекте tour есть массив программы, замените итерацию ниже */}
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((day) => (
                    <div key={day} className={styles.programDay}>
                      <span>День {day}</span>
                      <Plus size={18} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details">
                <div className={styles.card}>
                  <p>Додаткова інформація про перельоти та страхування...</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Правая часть (Боковая панель) */}
        <aside>
          <div className={styles.sideCard}>
            <div className={styles.badge}>50€ для ЗСУ</div>
            <div className={styles.label}>Вартість</div>
            <div className={styles.value}>{tour.price}€</div>
          </div>

          <div className={styles.sideCard}>
            <div className={styles.label}>Розмір групи</div>
            <div className={styles.value}>{t(tour.groupSize)}</div>
          </div>

          <div className={styles.sideCard}>
            <div className={styles.label}>Тривалість</div>
            <div className={styles.value}>{t(tour.duration)}</div>
          </div>

          <div className={`${styles.sideCard} ${styles.highlight}`}>
            <div className={styles.label} style={{ color: '#f9a825' }}>
              Бронь тура*
            </div>
            <div className={styles.value}>Аванс — 50% / Людина</div>
            <p className={styles.smallNote}>
              *Передоплата не повертається. Другу частину вносять в аеропорту після прильоту.
            </p>
          </div>

          <div className={styles.sideCard} style={{ cursor: 'pointer', textAlign: 'center' }}>
            <span className={styles.installmentLink}>→ Розстрочка на тур</span>
          </div>
        </aside>
      </div>

      {/* Модальные окна */}
      {bookingOpen && (
        <BookingModal tourName={t(tour.title)} onClose={() => setBookingOpen(false)} />
      )}
    </main>
  )
}
