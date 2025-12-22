// 'use client'

// import { useState, useMemo, useEffect, Suspense } from 'react'
// import { useParams, useSearchParams } from 'next/navigation'
// import { SearchBar, TourFilters } from '@/components/blocks/SearchBar/SearchBar'
// import { TourCard } from '@/components/blocks/TourCard/TourCard'
// import styles from './AllToursPage.module.scss'

// interface Tour {
//   id: string
//   name: string
//   location: string
//   month: string
//   category: string
//   duration: string
//   groupSize: string
//   price: string
//   description: string
//   mainImage?: { url: string } | null
// }

// // Словари для перевода технических значений Select-полей, так как они localized: false
// const CATEGORY_LABELS: Record<string, string> = {
//   'cold-countries': 'Холодні країни',
//   islands: 'Острови',
//   'hot-countries': 'Спекотні країни',
//   extreme: 'Екстремальні тури',
//   neutral: 'Нейтральний клімат',
//   trailers: 'Трейлери',
//   wildlife: 'Дика природа',
//   cruise: 'Круїз',
// }

// const MONTH_LABELS: Record<string, string> = {
//   jan: 'Січень',
//   feb: 'Лютий',
//   mar: 'Березень',
//   apr: 'Квітень',
//   may: 'Травень',
//   jun: 'Червень',
//   jul: 'Липень',
//   aug: 'Серпень',
//   sep: 'Вересень',
//   oct: 'Жовтень',
//   nov: 'Листопад',
//   dec: 'Грудень',
// }

// function AllToursContent({ initialTours = [] }: { initialTours: Tour[] }) {
//   const [filteredTours, setFilteredTours] = useState<Tour[]>(initialTours)
//   const searchParams = useSearchParams()
//   const params = useParams()
//   const locale = (params?.locale as string) || 'uk'

//   // Хелпер для извлечения строки из локализованных полей (Name, Location)
//   const resolveField = (field: any) => {
//     if (field && typeof field === 'object') {
//       return field[locale] || field['uk'] || field['en'] || ''
//     }
//     return String(field || '')
//   }

//   // 1. ДИНАМИЧЕСКИЕ ОПЦИИ (Берем только те, что есть в текущих турах)
//   const categories = useMemo(() => {
//     return Array.from(new Set(initialTours.map((t) => t.category)))
//       .filter(Boolean)
//       .map((val) => ({
//         label: CATEGORY_LABELS[val] || val, // Берем из словаря или оставляем как есть
//         value: val,
//       }))
//   }, [initialTours])

//   console.log(categories, 'categories')

//   const destinations = useMemo(() => {
//     return Array.from(new Set(initialTours.map((t) => resolveField(t.location))))
//       .filter(Boolean)
//       .map((d) => ({ label: d, value: d }))
//   }, [initialTours, locale])

//   const months = useMemo(() => {
//     return Array.from(new Set(initialTours.map((t) => t.month)))
//       .filter(Boolean)
//       .map((val) => ({
//         label: MONTH_LABELS[val] || val,
//         value: val,
//       }))
//   }, [initialTours])

//   // 2. ФУНКЦИЯ ФИЛЬТРАЦИИ
//   const handleFilterChange = (filters: TourFilters) => {
//     let result = [...initialTours]

//     if (filters.category) {
//       result = result.filter((t) => t.category === filters.category)
//     }
//     if (filters.destination) {
//       result = result.filter((t) => resolveField(t.location) === filters.destination)
//     }
//     if (filters.month) {
//       result = result.filter((t) => t.month === filters.month)
//     }

//     setFilteredTours(result)
//   }

//   // 3. СИНХРОНИЗАЦИЯ С URL (например, при переходе с главной)
//   useEffect(() => {
//     const category = searchParams.get('category')
//     const destination = searchParams.get('destination')
//     const month = searchParams.get('month')

//     if (category || destination || month) {
//       handleFilterChange({
//         category: category || undefined,
//         destination: destination || undefined,
//         month: month || undefined,
//       })
//     } else {
//       setFilteredTours(initialTours)
//     }
//   }, [searchParams, initialTours])

//   return (
//     <div className={styles.pageContainer}>
//       <SearchBar
//         categories={categories}
//         destinations={destinations}
//         months={months}
//         onChange={handleFilterChange}
//       />

//       <div className={styles.tourList}>
//         {filteredTours.length > 0 ? (
//           filteredTours.map((tour) => (
//             <TourCard
//               key={tour.id}
//               id={tour.id}
//               image={tour.mainImage?.url || ''}
//               title={resolveField(tour.name)}
//               destination={resolveField(tour.location)}
//               duration={resolveField(tour.duration)}
//               groupSize={resolveField(tour.groupSize)}
//               price={tour.price ? `${tour.price}€` : 'Ціна за запитом'}
//               alt={resolveField(tour.name)}
//             />
//           ))
//         ) : (
//           <div className={styles.noResults}>
//             <h3>Турів не знайдено</h3>
//             <p>Спробуйте змінити параметри пошуку</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default function AllToursClient({ initialTours }: { initialTours: Tour[] }) {
//   return (
//     <Suspense fallback={<div>Завантаження...</div>}>
//       <AllToursContent initialTours={initialTours} />
//     </Suspense>
//   )
// }
'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { SearchBar, TourFilters } from '@/components/blocks/SearchBar/SearchBar'
import { TourCard } from '@/components/blocks/TourCard/TourCard'
import styles from './AllToursPage.module.scss'

interface Tour {
  id: string
  name: string
  location: string
  month: string
  category: string
  duration: string
  groupSize: string
  price: string
  description: string
  mainImage?: { url: string } | null
}

// 1. Копируем словари с поддержкой языков (как на главной)
const CATEGORY_LABELS: Record<string, { uk: string; en: string }> = {
  coldСountries: { uk: 'Холодні країни', en: 'Cold countries' },
  islands: { uk: 'Острови', en: 'Islands' },
  hotСountries: { uk: 'Спекотні країни', en: 'Hot countries' },
  extreme: { uk: 'Екстремальні тури', en: 'Extreme tours' },
  neutral: { uk: 'Нейтральний клімат', en: 'Neutral climate' },
  trailers: { uk: 'Трейлери', en: 'Trailers' },
  wildlife: { uk: 'Дика природа', en: 'Wildlife' },
  cruise: { uk: 'Круїз', en: 'Cruise' },
}

const MONTH_LABELS: Record<string, { uk: string; en: string }> = {
  jan: { uk: 'Січень', en: 'January' },
  feb: { uk: 'Лютий', en: 'February' },
  mar: { uk: 'Березень', en: 'March' },
  apr: { uk: 'Квітень', en: 'April' },
  may: { uk: 'Травень', en: 'May' },
  jun: { uk: 'Червень', en: 'June' },
  jul: { uk: 'Липень', en: 'July' },
  aug: { uk: 'Серпень', en: 'August' },
  sep: { uk: 'Вересень', en: 'September' },
  oct: { uk: 'Жовтень', en: 'October' },
  nov: { uk: 'Листопад', en: 'November' },
  dec: { uk: 'Грудень', en: 'December' },
}

function AllToursContent({ initialTours = [] }: { initialTours: Tour[] }) {
  const [filteredTours, setFilteredTours] = useState<Tour[]>(initialTours)
  const searchParams = useSearchParams()
  const params = useParams()
  const locale = (params?.locale as 'uk' | 'en') || 'uk'

  const resolveField = (field: any) => {
    if (field && typeof field === 'object') {
      return field[locale] || field['uk'] || field['en'] || ''
    }
    return String(field || '')
  }

  // 2. Генерируем ВСЕ категории из словаря (независимо от наличия туров)
  const categories = useMemo(() => {
    return Object.entries(CATEGORY_LABELS).map(([value, labels]) => ({
      label: labels[locale] || labels.uk,
      value: value,
    }))
  }, [locale])

  // 3. Направления оставляем динамическими (только те, где реально есть туры)
  const destinations = useMemo(() => {
    return Array.from(new Set(initialTours.map((t) => resolveField(t.location))))
      .filter(Boolean)
      .map((d) => ({ label: d, value: d }))
  }, [initialTours, locale])

  // 4. Генерируем ВСЕ 12 месяцев из словаря
  const months = useMemo(() => {
    return Object.entries(MONTH_LABELS).map(([value, labels]) => ({
      label: labels[locale] || labels.uk,
      value: value,
    }))
  }, [locale])

  const handleFilterChange = (filters: TourFilters) => {
    let result = [...initialTours]
    if (filters.category) {
      result = result.filter((t) => t.category === filters.category)
    }
    if (filters.destination) {
      result = result.filter((t) => resolveField(t.location) === filters.destination)
    }
    if (filters.month) {
      result = result.filter((t) => t.month === filters.month)
    }
    setFilteredTours(result)
  }

  useEffect(() => {
    const category = searchParams.get('category')
    const destination = searchParams.get('destination')
    const month = searchParams.get('month')

    if (category || destination || month) {
      handleFilterChange({
        category: category || undefined,
        destination: destination || undefined,
        month: month || undefined,
      })
    } else {
      setFilteredTours(initialTours)
    }
  }, [searchParams, initialTours])

  return (
    <div className={styles.pageContainer}>
      <SearchBar
        categories={categories}
        destinations={destinations}
        months={months}
        onChange={handleFilterChange}
      />

      <div className={styles.tourList}>
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              id={tour.id}
              image={tour.mainImage?.url || ''}
              title={resolveField(tour.name)}
              destination={resolveField(tour.location)}
              duration={resolveField(tour.duration)}
              groupSize={resolveField(tour.groupSize)}
              price={tour.price ? `${tour.price}€` : 'Ціна за запитом'}
              alt={resolveField(tour.name)}
            />
          ))
        ) : (
          <div className={styles.noResults}>
            <h3>Турів не знайдено</h3>
            <p>Спробуйте змінити параметри пошуку</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AllToursClient({ initialTours }: { initialTours: Tour[] }) {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <AllToursContent initialTours={initialTours} />
    </Suspense>
  )
}
