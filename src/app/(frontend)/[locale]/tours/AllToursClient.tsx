'use client'

import { useMemo, useState, useEffect, Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { SearchBar, TourFilters } from '@/components/blocks/SearchBar/SearchBar'
import { TourCard } from '@/components/blocks/TourCard/TourCard'
import styles from './AllToursPage.module.scss'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export type Locale = 'uk' | 'en' | 'ru'

interface Tour {
  id: string
  name: any
  location: any
  category: string
  duration?: string
  groupSize: any
  price: number
  mainImage?: { url: string } | null
}

function AllToursContent({
  initialTours,
  searchBarData,
}: {
  initialTours: Tour[]
  searchBarData: any
}) {
  const [filteredTours, setFilteredTours] = useState(initialTours)

  const params = useParams()
  const searchParams = useSearchParams()
  const locale = (params?.locale as Locale) || 'uk'

  const resolveField = (field: any) => {
    if (field && typeof field === 'object') {
      return field[locale] || field.uk || field.en || ''
    }
    return String(field || '')
  }

  const t = (field: any) => {
    if (!field) return ''
    if (typeof field === 'object') {
      return field[locale] || field.uk || field.en || ''
    }
    return field
  }

  const finalSearchData = useMemo(() => {
    return {
      categoryLabel: t(searchBarData?.categoryLabel),
      destinationLabel: t(searchBarData?.destinationLabel),
      monthLabel: t(searchBarData?.monthLabel),
      searchBtnLabel: t(searchBarData?.searchBtnLabel),
      resetBtnLabel: t(searchBarData?.resetBtnLabel),

      categories:
        searchBarData?.categories?.map((cat: any) => ({
          label: t(cat.label),
          value: cat.value,
        })) || [],

      destinations:
        searchBarData?.destinations?.map((dest: any) => ({
          label: t(dest.label),
          value: dest.value,
        })) || [],

      months:
        searchBarData?.months?.map((m: any) => ({
          label: t(m.label),
          value: m.value,
        })) || [],
    }
  }, [searchBarData, locale])

  const handleFilterChange = (filters: TourFilters) => {
    let result = [...initialTours]

    if (filters.category) {
      result = result.filter((t) => t.category === filters.category)
    }

    if (filters.destination) {
      result = result.filter((t) => resolveField(t.location) === filters.destination)
    }

    if (filters.month) {
      result = result.filter((t) => {
        if (!t.duration) return false
        const match = t.duration.match(/\d{2}\.(\d{2})/)
        if (!match) return false
        const monthNum = parseInt(match[1], 10)
        return monthNum === Number(filters.month)
      })
    }

    setFilteredTours(result)
  }

  useEffect(() => {
    handleFilterChange({
      category: searchParams.get('category') || undefined,
      destination: searchParams.get('destination') || undefined,
      month: searchParams.get('month') || undefined,
    })
  }, [searchParams, initialTours])

  return (
    <div className={styles.pageContainer}>
      <SearchBar searchData={finalSearchData} onChange={handleFilterChange} />

      <div className={styles.tourGrid}>
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              id={tour.id}
              image={
                tour.mainImage?.url ? `${SERVER_URL}${tour.mainImage.url}` : '/placeholder-tour.jpg'
              }
              title={resolveField(tour.name)}
              destination={resolveField(tour.location)}
              duration={tour.duration}
              groupSize={resolveField(tour.groupSize)}
              price={`${tour.price}€`}
              alt={resolveField(tour.name)}
            />
          ))
        ) : (
          <div className={styles.noResults}>
            <h3>{locale === 'en' ? 'Tours not found' : 'Турів не знайдено'}</h3>
            <p>
              {locale === 'en' ? 'Try changing your search' : 'Спробуйте змінити параметри пошуку'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AllToursClient({
  initialTours,
  searchBarData,
}: {
  initialTours: Tour[]
  searchBarData: any
}) {
  return (
    <Suspense fallback={<div className={styles.loader}>Завантаження...</div>}>
      <AllToursContent initialTours={initialTours} searchBarData={searchBarData} />
    </Suspense>
  )
}
