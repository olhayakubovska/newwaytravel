'use client'

import { useState } from 'react'
import { useRouter, usePathname, useParams } from 'next/navigation'
import styles from './SearchBar.module.scss'
import { Config, Page } from '@/payload-types'

type SearchBarBlock = Extract<NonNullable<Page['layout']>[number], { blockType: 'searchBar' }>
type Locale = Config['locale']

export interface TourFilters {
  category?: string
  destination?: string
  month?: string
}

interface SearchBarProps extends Partial<SearchBarBlock> {
  searchData?: Partial<SearchBarBlock>
  onChange?: (filters: TourFilters) => void
}

export function SearchBar({ searchData, onChange, ...restProps }: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const locale = (params?.locale as Locale) || 'uk'

  const data = searchData || restProps

  const categories = data.categories || []
  const destinations = data.destinations || []
  const months = data.months || []

  const t = (
    field: string | Record<string, string> | null | undefined,
    defaultText: string = '',
  ): string => {
    if (!field) return defaultText
    if (typeof field === 'object') {
      return field[locale] || field['uk'] || field['en'] || Object.values(field)[0] || defaultText
    }
    return String(field)
  }

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDestination, setSelectedDestination] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')

  const handleSearch = () => {
    const filters: TourFilters = {
      category: selectedCategory,
      destination: selectedDestination,
      month: selectedMonth,
    }

    const baseToursPath = `/${locale}/tours`

    if (!pathname.includes('/tours')) {
      const searchParams = new URLSearchParams()
      if (selectedCategory) searchParams.set('category', selectedCategory)
      if (selectedDestination) searchParams.set('destination', selectedDestination)
      if (selectedMonth) searchParams.set('month', selectedMonth)
      router.push(`${baseToursPath}?${searchParams.toString()}`)
    } else {
      if (onChange) onChange(filters)
    }
  }

  const handleClear = () => {
    setSelectedCategory('')
    setSelectedDestination('')
    setSelectedMonth('')
    if (onChange) onChange({})
    if (pathname.includes('/tours')) router.push(`/${locale}/tours`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Категории */}
        <select
          className={styles.select}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">{t(data.categoryLabel, 'Категорія')}</option>
          {categories.map((c, i) => (
            <option key={c.id || i} value={c.value}>
              {t(c.label)}
            </option>
          ))}
        </select>

        {/* Направления */}
        <select
          className={styles.select}
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
        >
          <option value="">{t(data.destinationLabel, 'Напрямок')}</option>
          {destinations.map((d, i) => (
            <option key={d.id || i} value={d.value}>
              {t(d.label)}
            </option>
          ))}
        </select>

        {/* Месяцы */}
        <select
          className={styles.select}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">{t(data.monthLabel, 'Місяць')}</option>
          {months.map((m, i) => (
            <option key={m.id || i} value={m.value}>
              {t(m.label)}
            </option>
          ))}
        </select>

        <button className={styles.searchButton} onClick={handleSearch}>
          {t(data.searchBtnLabel, 'ШУКАТИ')}
        </button>

        <button className={styles.clearButton} onClick={handleClear}>
          {t(data.resetBtnLabel, 'Скинути')}
        </button>
      </div>
    </div>
  )
}
