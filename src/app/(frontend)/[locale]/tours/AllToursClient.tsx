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
  category: any
  duration: any
  groupSize: any
  price: number
  description: any
  mainImage?: { url: string } | null
}

// Интерфейс для словаря, который можно будет менять вручную
interface AllToursDictionary {
  noResults: string
  loading: string
  priceFromRequest: string
  months: { label: string; value: string }[]
}

function AllToursContent({
  initialTours = [],
  dictionary,
}: {
  initialTours: Tour[]
  dictionary: AllToursDictionary
}) {
  const [filteredTours, setFilteredTours] = useState<Tour[]>(initialTours)
  const searchParams = useSearchParams()
  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  // Универсальный резолвер полей
  const resolveField = (field: any) => {
    if (field && typeof field === 'object') {
      return field[locale] || field['uk'] || Object.values(field)[0] || ''
    }
    return String(field || '')
  }

  const categories = useMemo(() => {
    const uniqueCats = new Set<string>()
    initialTours.forEach((t) => {
      const catText = resolveField(t.category)
      if (catText) uniqueCats.add(catText)
    })
    return Array.from(uniqueCats).map((cat) => ({ label: cat, value: cat }))
  }, [initialTours, locale])

  const destinations = useMemo(() => {
    const uniqueLocs = new Set<string>()
    initialTours.forEach((t) => {
      const locText = resolveField(t.location)
      if (locText) uniqueLocs.add(locText)
    })
    return Array.from(uniqueLocs).map((loc) => ({ label: loc, value: loc }))
  }, [initialTours, locale])

  // Месяцы теперь берутся из переданного словаря
  const months = useMemo(() => dictionary.months, [dictionary])

  const handleFilterChange = (filters: TourFilters) => {
    let result = [...initialTours]
    if (filters.category) {
      result = result.filter((t) => resolveField(t.category) === filters.category)
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
      <SearchBar searchData={{ categories, destinations, months }} onChange={handleFilterChange} />
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
                // Цена теперь берет текст "по запросу" из словаря
                price={tour.price ? `${tour.price}€` : dictionary.priceFromRequest}
                alt={resolveField(tour.name)}
              />
            )
          })
        ) : (
          <div className={styles.noResults}>
            <h3>{dictionary.noResults}</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AllToursClient({ initialTours }: { initialTours: Tour[] }) {
  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  // Этот объект можно вынести в отдельный JSON файл или получать из Payload CMS
  const dictionaries: Record<string, AllToursDictionary> = {
    uk: {
      noResults: 'Турів не знайдено',
      loading: 'Завантаження...',
      priceFromRequest: 'Ціна за запитом',
      months: [
        { label: 'Січень', value: '01' },
        { label: 'Лютий', value: '02' },
        { label: 'Березень', value: '03' },
        { label: 'Квітень', value: '04' },
        { label: 'Травень', value: '05' },
        { label: 'Червень', value: '06' },
        { label: 'Липень', value: '07' },
        { label: 'Серпень', value: '08' },
        { label: 'Вересень', value: '09' },
        { label: 'Жовтень', value: '10' },
        { label: 'Листопад', value: '11' },
        { label: 'Грудень', value: '12' },
      ],
    },
    en: {
      noResults: 'No tours found',
      loading: 'Loading...',
      priceFromRequest: 'Price on request',
      months: [
        { label: 'January', value: '01' },
        { label: 'February', value: '02' },
        { label: 'March', value: '03' },
        { label: 'April', value: '04' },
        { label: 'May', value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'August', value: '08' },
        { label: 'September', value: '09' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
      ],
    },
  }

  const currentDict = dictionaries[locale] || dictionaries['uk']

  return (
    <Suspense fallback={<div>{currentDict.loading}</div>}>
      <AllToursContent initialTours={initialTours} dictionary={currentDict} />
    </Suspense>
  )
}
