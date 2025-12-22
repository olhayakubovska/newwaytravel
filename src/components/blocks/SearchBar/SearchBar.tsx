'use client'

import { useState } from 'react'
import { useRouter, usePathname, useParams } from 'next/navigation'
import styles from './SearchBar.module.scss'

export interface TourFilters {
  category?: string
  destination?: string
  month?: string
}

interface SearchBarProps {
  // Прямые пропсы (используются на странице /tours)
  categories?: { label: any; value: string }[]
  destinations?: { label: any; value: string }[]
  months?: { label: any; value: string }[]
  // Пропсы из Payload блоков (используются на главной)
  searchData?: {
    categories?: { label: any; value: string }[]
    destinations?: { label: any; value: string }[]
    months?: { label: any; value: string }[]
  }
  onChange?: (filters: TourFilters) => void
}

export function SearchBar(props: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const locale = (params?.locale as string) || 'uk'

  // 1. УНИВЕРСАЛЬНОЕ ПОЛУЧЕНИЕ ДАННЫХ
  // Берем данные либо из searchData (блоки), либо из прямых пропсов (страница туров)
  const categories = props.searchData?.categories || props.categories || []
  const destinations = props.searchData?.destinations || props.destinations || []
  const months = props.searchData?.months || props.months || []
  const { onChange } = props

  // 2. ЛОГИКА ПЕРЕВОДА (чтобы корректно отображать и объекты и строки)
  const getTranslatedLabel = (label: any) => {
    if (!label) return ''
    if (typeof label === 'object' && label !== null) {
      return label[locale] || label['uk'] || label['en'] || ''
    }
    return label
  }

  const i18n = {
    categoryPlaceholder: locale === 'en' ? 'Category' : 'Категорія',
    destinationPlaceholder: locale === 'en' ? 'Destination' : 'Напрямок',
    monthPlaceholder: locale === 'en' ? 'Month' : 'Місяць',
    searchBtn: locale === 'en' ? 'SEARCH TOUR' : 'ШУКАТИ ТУР',
    resetBtn: locale === 'en' ? 'Reset' : 'Скинути',
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
      // На главной: переходим на страницу туров с параметрами
      const searchParams = new URLSearchParams()
      if (selectedCategory) searchParams.set('category', selectedCategory)
      if (selectedDestination) searchParams.set('destination', selectedDestination)
      if (selectedMonth) searchParams.set('month', selectedMonth)
      router.push(`${baseToursPath}?${searchParams.toString()}`)
    } else {
      // На странице туров: просто вызываем фильтрацию
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
          <option value="">{i18n.categoryPlaceholder}</option>
          {categories.map((c, i) => (
            <option key={i} value={c.value}>
              {getTranslatedLabel(c.label)}
            </option>
          ))}
        </select>

        {/* Направления */}
        <select
          className={styles.select}
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
        >
          <option value="">{i18n.destinationPlaceholder}</option>
          {destinations.map((d, i) => (
            <option key={i} value={d.value}>
              {getTranslatedLabel(d.label)}
            </option>
          ))}
        </select>

        {/* Месяцы */}
        <select
          className={styles.select}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">{i18n.monthPlaceholder}</option>
          {months.map((m, i) => (
            <option key={i} value={m.value}>
              {getTranslatedLabel(m.label)}
            </option>
          ))}
        </select>

        <button className={styles.searchButton} onClick={handleSearch}>
          {i18n.searchBtn}
        </button>

        <button className={styles.clearButton} onClick={handleClear}>
          {i18n.resetBtn}
        </button>
      </div>
    </div>
  )
}
