// 'use client'

// import { useState } from 'react'
// import styles from './TripItinerary.module.scss'
// import { Tour } from '@/app/(frontend)/[locale]/tours/[tourId]/TourDetailClient'

// interface Props {
//   tour: Tour
//   locale: 'uk' | 'en'
// }

// export default function TripItinerary({ tour }: Props) {
//   const [openDay, setOpenDay] = useState<number | null>(null)

//   if (!tour.itinerary || tour.itinerary.length === 0) return null

//   return (
//     <div className={styles.wrapper}>
//       <h2 className={styles.title}>{'ДЕННИЙ МАРШРУТ'}</h2>

//       {tour.itinerary.map((day, idx) => (
//         <div key={idx} className={styles.item}>
//           <div className={styles.trigger} onClick={() => setOpenDay(openDay === idx ? null : idx)}>
//             {day.dayTitle}
//             <span className={styles.plus}>{openDay === idx ? '-' : '+'}</span>
//           </div>

//           {openDay === idx && (
//             <div className={styles.content}>{day.content && <p>{day.content}</p>}</div>
//           )}
//         </div>
//       ))}
//     </div>
//   )
// }
'use client'

import { useState } from 'react'
import styles from './TripItinerary.module.scss'
import { Tour } from '@/app/(frontend)/[locale]/tours/[tourId]/TourDetailClient'
import { ChevronDown } from 'lucide-react'
import { RichText } from '../RichText'

interface Props {
  tour: Tour
  locale: 'uk' | 'en'
}

export default function TripItinerary({ tour, locale }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(0)

  if (!tour.itinerary || tour.itinerary.length === 0) return null

  return (
    <section className={styles.wrapper}>
      {/* <h2 className={styles.title}>{locale === 'en' ? 'Daily Itinerary' : 'ДЕННИЙ МАРШРУТ'}</h2> */}

      <div className={styles.accordion}>
        {tour.itinerary.map((day, idx) => {
          const isOpen = openDay === idx

          return (
            <div key={idx} className={`${styles.card} ${isOpen ? styles.open : ''}`}>
              {/* Header */}
              <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpenDay(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span className={styles.dayTitle}>
                  {day.dayTitle || `${locale === 'en' ? 'Day' : 'День'} ${idx + 1}`}
                </span>

                <ChevronDown
                  size={20}
                  className={`${styles.icon} ${isOpen ? styles.rotate : ''}`}
                />
              </button>

              {/* Content */}
              <div
                className={styles.content}
                style={{
                  maxHeight: isOpen ? '1500px' : '0',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className={styles.inner}>
                  {day.content && <RichText content={day.content} />}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
