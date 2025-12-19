'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import styles from './SearchBar.module.scss'

export interface TourFilters {
  category?: string
  destination?: string
  month?: string
}

interface SearchBarProps {
  categories?: { label: string; value: string }[]
  destinations?: { label: string; value: string }[]
  months?: { label: string; value: string }[]
  placeholderText?: string // Пропс из блока Payload
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

  // Состояние для фильтров
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDestination, setSelectedDestination] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')

  const handleSearch = () => {
    const filters: TourFilters = {
      category: selectedCategory,
      destination: selectedDestination,
      month: selectedMonth,
    }

    // Если мы на главной, уходим на /tours с параметрами
    if (pathname !== '/tours') {
      const params = new URLSearchParams()
      if (selectedCategory) params.set('category', selectedCategory)
      if (selectedDestination) params.set('destination', selectedDestination)
      if (selectedMonth) params.set('month', selectedMonth)

      router.push(`/tours?${params.toString()}`)
    } else {
      // Если на странице /tours, вызываем функцию фильтрации
      if (onChange) onChange(filters)
    }
  }

  const handleClear = () => {
    setSelectedCategory('')
    setSelectedDestination('')
    setSelectedMonth('')
    if (onChange) onChange({})
    if (pathname === '/tours') router.push('/tours')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Селект Категорий */}
        <select
          className={styles.select}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Категорія</option>
          {categories.map((c, i) => (
            <option key={i} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Селект Направлений */}
        <select
          className={styles.select}
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
        >
          <option value="">Напрямок</option>
          {destinations.map((d, i) => (
            <option key={i} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>

        {/* Селект Месяцев */}
        <select
          className={styles.select}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Місяць</option>
          {months.map((m, i) => (
            <option key={i} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <button className={styles.searchButton} onClick={handleSearch}>
          ШУКАТИ ТУР
        </button>

        <button className={styles.clearButton} onClick={handleClear}>
          Скинути
        </button>
      </div>
    </div>
  )
}
