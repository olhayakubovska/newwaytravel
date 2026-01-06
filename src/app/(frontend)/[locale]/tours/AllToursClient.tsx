'use client'

import { useMemo, useState, useEffect, Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { SearchBar, TourFilters } from '@/components/blocks/SearchBar/SearchBar'
import { TourCard } from '@/components/blocks/TourCard/TourCard'
import { Tour as PayloadTour, Page, Config, Media } from '@/payload-types'
import styles from './AllToursPage.module.scss'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export type Locale = Config['locale']

type SearchBarBlock = Extract<NonNullable<Page['layout']>[number], { blockType: 'searchBar' }>

interface AllToursProps {
  initialTours: PayloadTour[]
  searchBarData: SearchBarBlock | null | undefined
}

function AllToursContent({ initialTours, searchBarData }: AllToursProps) {
  const [filteredTours, setFilteredTours] = useState<PayloadTour[]>(initialTours)

  const params = useParams()
  const searchParams = useSearchParams()
  const locale = (params?.locale as Locale) || 'uk'

  // Хелпер для локализации
  const t = (
    field: string | Record<string, string> | null | undefined,
    fallback: string = '',
  ): string => {
    if (!field) return fallback
    if (typeof field === 'object') {
      return field[locale] || field.uk || field.en || Object.values(field)[0] || fallback
    }
    return String(field)
  }

  const finalSearchData = useMemo(() => {
    // 1. Собираем уникальные категории из туров
    const toursCategories = Array.from(
      new Set(initialTours.map((tour) => tour.category).filter(Boolean)),
    ).map((cat) => ({ label: String(cat), value: String(cat) }))

    // 2. Собираем уникальные направления из туров (поле location)
    const toursDestinations = Array.from(
      new Set(initialTours.map((tour) => t(tour.location)).filter(Boolean)),
    ).map((loc) => ({ label: loc, value: loc }))

    // 3. Собираем уникальные месяцы из дат туров
    const toursMonths = Array.from(
      new Set(
        initialTours
          .map((tour) => {
            if (!tour.startDate) return null
            return new Date(tour.startDate).getMonth() + 1
          })
          .filter(Boolean),
      ),
    )
      .sort((a, b) => (a as number) - (b as number))
      .map((m) => ({
        label: new Date(2026, (m as number) - 1).toLocaleString(locale, { month: 'long' }),
        value: String(m),
      }))

    const mergeData = (manual: any[], auto: any[]) => {
      const map = new Map()
      auto.forEach((item) => map.set(item.value, item))
      manual.forEach((item) => map.set(item.value, item))
      return Array.from(map.values())
    }

    return {
      categoryLabel: t(searchBarData?.categoryLabel, locale === 'uk' ? 'Категорія' : 'Category'),
      destinationLabel: t(
        searchBarData?.destinationLabel,
        locale === 'uk' ? 'Напрямок' : 'Destination',
      ),
      monthLabel: t(searchBarData?.monthLabel, locale === 'uk' ? 'Місяць' : 'Month'),
      searchBtnLabel: t(searchBarData?.searchBtnLabel, locale === 'uk' ? 'Шукати' : 'Search'),
      resetBtnLabel: t(searchBarData?.resetBtnLabel, locale === 'uk' ? 'Скинути' : 'Reset'),

      categories: mergeData(
        searchBarData?.categories?.map((cat) => ({ label: t(cat.label), value: cat.value })) || [],
        toursCategories,
      ),

      destinations: mergeData(
        searchBarData?.destinations?.map((dest) => ({ label: t(dest.label), value: dest.value })) ||
          [],
        toursDestinations,
      ),

      months: mergeData(
        searchBarData?.months?.map((m) => ({ label: t(m.label), value: m.value })) || [],
        toursMonths,
      ),
    }
  }, [searchBarData, initialTours, locale])

  const handleFilterChange = (filters: TourFilters) => {
    let result = [...initialTours]

    if (filters.category) {
      result = result.filter((tour) => tour.category === filters.category)
    }

    if (filters.destination) {
      result = result.filter((tour) => t(tour.location) === filters.destination)
    }

    if (filters.month) {
      result = result.filter((tour) => {
        if (!tour.startDate) return false
        const date = new Date(tour.startDate)
        return date.getMonth() + 1 === Number(filters.month)
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
          filteredTours.map((tour) => {
            const tourMedia = tour.mainImage as Media | null | undefined
            const imageUrl = tourMedia?.url
              ? `${SERVER_URL}${tourMedia.url}`
              : '/placeholder-tour.jpg'

            return (
              <TourCard
                key={tour.id}
                id={tour.id}
                image={imageUrl}
                title={t(tour.name)}
                destination={t(tour.location)}
                duration={tour.duration || ''}
                groupSize={t(tour.groupSize)}
                price={`${tour.price}€`}
                alt={t(tour.name)}
              />
            )
          })
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

export default function AllToursClient({ initialTours, searchBarData }: AllToursProps) {
  return (
    <Suspense fallback={<div className={styles.loader}>Завантаження...</div>}>
      <AllToursContent initialTours={initialTours} searchBarData={searchBarData} />
    </Suspense>
  )
}
