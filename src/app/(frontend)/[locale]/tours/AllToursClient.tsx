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
    return {
      categoryLabel: t(searchBarData?.categoryLabel),
      destinationLabel: t(searchBarData?.destinationLabel),
      monthLabel: t(searchBarData?.monthLabel),
      searchBtnLabel: t(searchBarData?.searchBtnLabel),
      resetBtnLabel: t(searchBarData?.resetBtnLabel),

      categories:
        searchBarData?.categories?.map((cat) => ({
          label: t(cat.label),
          value: cat.value,
        })) || [],

      destinations:
        searchBarData?.destinations?.map((dest) => ({
          label: t(dest.label),
          value: dest.value,
        })) || [],

      months:
        searchBarData?.months?.map((m) => ({
          label: t(m.label),
          value: m.value,
        })) || [],
    }
  }, [searchBarData, locale])

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
        const monthNum = date.getMonth() + 1
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
