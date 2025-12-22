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
  categories?: { label: any; value: string }[]
  destinations?: { label: any; value: string }[]
  months?: { label: any; value: string }[]
  onChange?: (filters: TourFilters) => void
}

export function SearchBar({
  categories = [],
  destinations = [],
  months = [],
  onChange,
}: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  // 1. Определяем текущий язык (по умолчанию uk)
  const locale = (params?.locale as string) || 'uk'

  // 2. ВСТАВЛЕННЫЙ ФРАГМЕНТ: Логика перевода меток
  const getTranslatedLabel = (label: any) => {
    if (!label) return ''

    // Если Payload вернул объект (локализацию), выбираем текущий язык
    if (typeof label === 'object' && label !== null) {
      return label[locale] || label['uk'] || label['en'] || ''
    }

    // Если Payload вернул просто строку (уже отфильтрованную на сервере)
    return label
  }

  // Тексты интерфейса зависят от локали
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

    // Путь к странице всех туров с учетом языка
    const baseToursPath = `/${locale}/tours`

    if (!pathname.includes('/tours')) {
      // Если мы на главной, формируем URL и перенаправляем
      const searchParams = new URLSearchParams()
      if (selectedCategory) searchParams.set('category', selectedCategory)
      if (selectedDestination) searchParams.set('destination', selectedDestination)
      if (selectedMonth) searchParams.set('month', selectedMonth)

      router.push(`${baseToursPath}?${searchParams.toString()}`)
    } else {
      // Если мы уже на странице туров, просто вызываем фильтрацию
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
        {/* Селект Категории */}
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

        {/* Селект Направления */}
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

        {/* Селект Месяца */}
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
