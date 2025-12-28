'use client'

import { Tour } from '@/payload-types'
import { RichText } from '../RichText'
// import { Tour } from '@/app/(frontend)/[locale]/tours/[tourId]/TourDetailClient'
import styles from './AdditionalInfo.module.scss'
import { Locale } from '@/app/(frontend)/[locale]/page'

interface Props {
  tour: Tour
  locale: Locale
}

export default function AdditionalInfo({ tour, locale }: Props) {
  const card = tour.additionalInfoCard

  if (!card || (!card.title && !card.content)) return null

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        {card.title || (locale === 'en' ? 'Additional Information' : 'Додаткова інформація')}
      </h3>
      <div className={styles.content}>{card.content && <RichText content={card.content} />}</div>
    </div>
  )
}
