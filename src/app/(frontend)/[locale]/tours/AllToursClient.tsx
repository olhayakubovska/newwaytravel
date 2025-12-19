// // 'use client'

// // import { useState, useEffect } from 'react'
// // import { useSearchParams } from 'next/navigation'
// // import { SearchBar, TourFilters } from '@/components/blocks/SearchBar/SearchBar'
// // import { TourCard } from '@/components/blocks/TourCard/TourCard'
// // // ... ваши импорты

// // export default function AllToursClient({ initialTours = [] }: { initialTours: any[] }) {
// //   const [filteredTours, setFilteredTours] = useState(initialTours)
// //   const searchParams = useSearchParams()

// //   // Функция фильтрации
// //   const applyFilters = (filters: TourFilters) => {
// //     let result = [...initialTours]
// //     if (filters.category) result = result.filter((t) => t.category === filters.category)
// //     if (filters.destination) result = result.filter((t) => t.location === filters.destination)
// //     if (filters.month) result = result.filter((t) => t.month === filters.month)
// //     setFilteredTours(result)
// //   }

// //   const handleFilterChange = (filters: TourFilters) => {
// //     let result = [...initialTours]

// //     if (filters.category) {
// //       // Сравниваем значение селекта с полем category из Payload
// //       result = result.filter((t) => t.category === filters.category)
// //     }

// //     if (filters.destination) {
// //       // Сравниваем Напрямок (location).
// //       // Важно: в селекте должно быть то же слово, что введено в поле Напрямок в админке
// //       result = result.filter((t) => t.location === filters.destination)
// //     }

// //     if (filters.month) {
// //       result = result.filter((t) => t.month === filters.month)
// //     }

// //     setFilteredTours(result)
// //   }

// //   // При загрузке страницы проверяем URL
// //   useEffect(() => {
// //     const category = searchParams.get('category')
// //     const destination = searchParams.get('destination')
// //     const month = searchParams.get('month')

// //     if (category || destination || month) {
// //       applyFilters({
// //         category: category || undefined,
// //         destination: destination || undefined,
// //         month: month || undefined,
// //       })
// //     }
// //   }, [searchParams, initialTours])

// //   return (
// //     <>
// //       <SearchBar
// //         // Опции генерируются динамически из initialTours
// //         categories={Array.from(new Set(initialTours.map((t) => t.category)))
// //           .filter(Boolean)
// //           .map((c) => ({ label: c, value: c }))}
// //         destinations={Array.from(new Set(initialTours.map((t) => t.location)))
// //           .filter(Boolean)
// //           .map((d) => ({ label: d, value: d }))}
// //         months={Array.from(new Set(initialTours.map((t) => t.month)))
// //           .filter(Boolean)
// //           .map((m) => ({ label: m, value: m }))}
// //         onChange={handleFilterChange}
// //       />

// //       {/* Сетка туров */}
// //       <div style={{ display: 'grid', gap: '20px', padding: '20px' }}>
// //         {filteredTours.map((tour) => (
// //           <TourCard
// //             key={tour.id}
// //             id={tour.id}
// //             image={tour.mainImage?.url || ''}
// //             title={tour.name}
// //             destination={tour.location}
// //             duration={tour.duration}
// //             groupSize={tour.groupSize}
// //             price={tour.price ? `${tour.price}€` : ''}
// //             alt={tour.name}
// //           />
// //         ))}
// //       </div>
// //     </>
// //   )
// // }
// 'use client'

// import { useState, useMemo, useEffect, Suspense } from 'react'
// import { useSearchParams } from 'next/navigation'
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

// function AllToursContent({ initialTours = [] }: { initialTours: Tour[] }) {
//   const [filteredTours, setFilteredTours] = useState<Tour[]>(initialTours)
//   const searchParams = useSearchParams()

//   // 1. ДИНАМИЧЕСКИЕ ОПЦИИ: Берутся напрямую из данных админки (initialTours)
//   const categories = useMemo(() => {
//     return Array.from(new Set(initialTours.map((t) => t.category)))
//       .filter(Boolean)
//       .map((c) => ({ label: c, value: c }))
//   }, [initialTours])

//   const destinations = useMemo(() => {
//     return Array.from(new Set(initialTours.map((t) => t.location)))
//       .filter(Boolean)
//       .map((d) => ({ label: d, value: d }))
//   }, [initialTours])

//   const months = useMemo(() => {
//     return Array.from(new Set(initialTours.map((t) => t.month)))
//       .filter(Boolean)
//       .map((m) => ({ label: m, value: m }))
//   }, [initialTours])

//   // 2. ФУНКЦИЯ ФИЛЬТРАЦИИ
//   const handleFilterChange = (filters: TourFilters) => {
//     let result = [...initialTours]

//     if (filters.category) {
//       result = result.filter((t) => t.category === filters.category)
//     }
//     if (filters.destination) {
//       result = result.filter((t) => t.location === filters.destination)
//     }
//     if (filters.month) {
//       result = result.filter((t) => t.month === filters.month)
//     }

//     setFilteredTours(result)
//   }

//   // 3. ОБРАБОТКА URL: Если пользователь пришел с поиском с другой страницы
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
//       {/* Секция поиска */}
//       <SearchBar
//         categories={categories}
//         destinations={destinations}
//         months={months}
//         onChange={handleFilterChange}
//       />

//       {/* Сетка/Список туров */}
//       <div className={styles.tourList}>
//         {filteredTours.length > 0 ? (
//           filteredTours.map((tour) => (
//             <TourCard
//               key={tour.id}
//               id={tour.id}
//               image={tour.mainImage?.url || ''}
//               title={tour.name}
//               destination={tour.location}
//               duration={tour.duration}
//               groupSize={tour.groupSize}
//               price={tour.price ? `${tour.price}€` : 'Ціна за запитом'}
//               alt={tour.name}
//             />
//           ))
//         ) : (
//           <div className={styles.noResults}>
//             <h3>Турів не знайдено</h3>
//             <p>Спробуйте змінити параметри фільтрів</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// // Экспортируем с Suspense, так как используем useSearchParams (требование Next.js)
// export default function AllToursClient({ initialTours }: { initialTours: Tour[] }) {
//   return (
//     <Suspense fallback={<div className={styles.loading}>Завантаження...</div>}>
//       <AllToursContent initialTours={initialTours} />
//     </Suspense>
//   )
// }
'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
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

function AllToursContent({ initialTours = [] }: { initialTours: Tour[] }) {
  const [filteredTours, setFilteredTours] = useState<Tour[]>(initialTours)
  const searchParams = useSearchParams()

  // 1. ДИНАМИЧЕСКИЕ ОПЦИИ: Извлекаем только те значения, которые реально есть в админке
  const categories = useMemo(() => {
    return Array.from(new Set(initialTours.map((t) => t.category)))
      .filter(Boolean) 
      .map((c) => ({ label: c, value: c }))
  }, [initialTours])

  const destinations = useMemo(() => {
    return Array.from(new Set(initialTours.map((t) => t.location)))
      .filter(Boolean)
      .map((d) => ({ label: d, value: d }))
  }, [initialTours])

  const months = useMemo(() => {
    return Array.from(new Set(initialTours.map((t) => t.month)))
      .filter(Boolean)
      .map((m) => ({ label: m, value: m }))
  }, [initialTours])

  // 2. ФУНКЦИЯ ФИЛЬТРАЦИИ
  const handleFilterChange = (filters: TourFilters) => {
    let result = [...initialTours]

    if (filters.category) {
      result = result.filter((t) => t.category === filters.category)
    }
    if (filters.destination) {
      result = result.filter((t) => t.location === filters.destination)
    }
    if (filters.month) {
      result = result.filter((t) => t.month === filters.month)
    }

    setFilteredTours(result)
  }

  // 3. ОБРАБОТКА URL: Применяем фильтры, если они пришли из параметров (например, с главной)
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
              title={tour.name}
              destination={tour.location}
              duration={tour.duration}
              groupSize={tour.groupSize}
              price={tour.price ? `${tour.price}€` : 'Ціна за запитом'}
              alt={tour.name}
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
