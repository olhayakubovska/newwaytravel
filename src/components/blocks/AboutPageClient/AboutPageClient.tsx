'use client'

import React from 'react'
import { Send } from 'lucide-react'
import styles from './About.module.scss'
import { RichText } from '../ui/RichText'

interface AboutPageClientProps {
  data: any
  locale: string
}

export default function AboutPageClient({ data, locale }: AboutPageClientProps) {
  const i18n = {
    title: data.title || (locale === 'en' ? 'ABOUT US' : 'ПРО НАС'),
    historyTitle:
      data.historyTitle || (locale === 'en' ? 'How it all started' : 'Як все починалося'),
    specsTitle:
      locale === 'en' ? 'Specifics of New Way Travel tours' : 'Специфіка турів New Way Travel',
  }

  const img1 = data.mainImages?.[0]?.image?.url || '/images/about-1.jpg'
  const img2 = data.mainImages?.[1]?.image?.url || '/images/about-2.jpg'

  return (
    <main className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1>{i18n.title}</h1>
        </div>
      </section>

      <div className={styles.container}>
        <section className={styles.whiteCard}>
          <h2 className={styles.sectionTitle}>{i18n.historyTitle}</h2>
          <div className={styles.textContent}>
            {data.historyContent ? (
              <RichText content={data.historyContent} />
            ) : (
              <p>{locale === 'en' ? 'Loading history...' : 'Завантаження історії...'}</p>
            )}
          </div>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.imageColumn}>
            <img src={img1} alt="Team" className={styles.sideImage} />
            <img src={img2} alt="Vans" className={styles.sideImage} />
          </div>

          <div className={styles.detailsColumn}>
            <h2 className={styles.sectionTitle}>{i18n.specsTitle}</h2>
            <ul className={styles.specsList}>
              {data.features?.map((item: any, idx: number) => (
                <li key={idx}>
                  <strong>{item.label}</strong>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <a href="https://t.me/your_bot" className={styles.floatingTg}>
          <Send size={24} />
        </a>
      </div>
    </main>
  )
}
