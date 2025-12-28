'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { SearchBar, TourFilters } from '@/components/blocks/SearchBar/SearchBar'
import { TourCard } from '@/components/blocks/TourCard/TourCard'
import styles from './AllToursPage.module.scss'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000'

interface Tour {
  id: string
  name: any
  location: any
  month: string
  category: string
  duration: any
  groupSize: any
  price: number
  description: any
  mainImage?: { url: string } | null
}

interface FilterOption {
  label: string
  value: string
}

// Теперь пропсы принимают готовые списки от админа
interface AllToursContentProps {
  initialTours: Tour[]
  adminCategories?: FilterOption[]
  adminMonths?: FilterOption[]
}

function AllToursContent({
  initialTours = [],
  adminCategories = [],
  adminMonths = [],
}: AllToursContentProps) {
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

  // 1. КАТЕГОРИИ: Используем только те, что добавил админ в SearchBarConfig
  const categories = useMemo(() => adminCategories, [adminCategories])

  // 2. НАПРАВЛЕНИЯ: Генерируем динамически из локаций реальных туров (админ решает, создавая тур)
  const destinations = useMemo(() => {
    const uniqueDestinations = new Map()
    initialTours.forEach((t) => {
      const filterKey = t.location?.uk || t.location?.en
      const label = resolveField(t.location)
      if (filterKey && !uniqueDestinations.has(filterKey)) {
        uniqueDestinations.set(filterKey, { label, value: filterKey })
      }
    })
    return Array.from(uniqueDestinations.values())
  }, [initialTours, locale])

  // 3. МЕСЯЦЫ: Используем только те, что добавил админ в SearchBarConfig
  const months = useMemo(() => adminMonths, [adminMonths])

  const handleFilterChange = (filters: TourFilters) => {
    let result = [...initialTours]
    if (filters.category) result = result.filter((t) => t.category === filters.category)
    if (filters.destination) {
      result = result.filter((t) => (t.location?.uk || t.location?.en) === filters.destination)
    }
    if (filters.month) result = result.filter((t) => t.month === filters.month)
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
        searchData={{
          categories: categories,
          destinations: destinations,
          months: months,
        }}
        onChange={handleFilterChange}
      />
      <div className={styles.tourGrid}>
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => {
            const imageUrl = tour.mainImage?.url
              ? `${SERVER_URL}${tour.mainImage.url}`
              : '/placeholder-tour.jpg'
            return (
              <TourCard
                key={tour.id}
                id={tour.id}
                image={imageUrl}
                title={resolveField(tour.name)}
                destination={resolveField(tour.location)}
                duration={resolveField(tour.duration)}
                groupSize={resolveField(tour.groupSize)}
                price={tour.price ? `${tour.price}€` : 'Ціна за запитом'}
                alt={resolveField(tour.name)}
              />
            )
          })
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

// Обертка с передачей данных
export default function AllToursClient({
  initialTours,
  searchConfig,
}: {
  initialTours: Tour[]
  searchConfig?: any
}) {
  return (
    <Suspense fallback={<div className={styles.loader}>Завантаження...</div>}>
      <AllToursContent
        initialTours={initialTours}
        adminCategories={searchConfig?.categories}
        adminMonths={searchConfig?.months}
      />
    </Suspense>
  )
}
