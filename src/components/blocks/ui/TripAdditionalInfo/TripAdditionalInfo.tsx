'use client'

import { RichText } from '../RichText'
import styles from './TripAdditionalInfo.module.scss'
import { Tour } from '@/app/(frontend)/[locale]/tours/[tourId]/TourDetailClient'

interface Props {
  tour: Tour
  locale: 'uk' | 'en'
}

export default function TripAdditionalInfo({ tour, locale }: Props) {
  // 1. Проверяем наличие данных
  if (!tour.tripDetails?.additionalInfo) return null

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        {locale === 'en' ? 'Additional Information' : 'Додаткова інформація'}
      </h3>
      <div className={styles.content}>
        {/* Используем RichText вместо dangerouslySetInnerHTML */}
        <RichText content={tour.tripDetails.additionalInfo} />
      </div>
    </div>
  )
}
