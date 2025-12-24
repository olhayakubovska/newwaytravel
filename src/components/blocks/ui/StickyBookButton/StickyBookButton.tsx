'use client'

import { Button } from '@payloadcms/ui'
import styles from './StickyBookButton.module.scss'
import { Tour } from '@/app/(frontend)/[locale]/tours/[tourId]/TourDetailClient'
// import { Tour } from '@/types/tour'

interface Props {
  tour: Tour
  locale: 'uk' | 'en'
}

const StickyBookButton = ({ tour }: Props) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.wrapper}>
      <Button onClick={handleClick} className={styles.button}>
        ЗАБРОНЮВАТИ ТУР
      </Button>
    </div>
  )
}

export default StickyBookButton
