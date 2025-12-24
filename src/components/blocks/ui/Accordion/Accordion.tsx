'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './Accordion.module.scss'

interface Day {
  dayTitle: string
  content?: string
}

interface Props {
  days: Day[]
}

export default function Accordion({ days }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.accordion}>
      {days.map((day, idx) => (
        <div key={idx} className={styles.item}>
          <button className={styles.trigger} onClick={() => toggle(idx)}>
            <span>{day.dayTitle}</span>
            <ChevronDown className={`${styles.icon} ${openIndex === idx ? styles.open : ''}`} />
          </button>
          {openIndex === idx && (
            <div className={styles.content}>{day.content && <p>{day.content}</p>}</div>
          )}
        </div>
      ))}
    </div>
  )
}
