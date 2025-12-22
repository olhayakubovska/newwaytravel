'use client'

import React from 'react'
import { Send } from 'lucide-react'
import styles from './About.module.scss'

// Описываем тип данных для безопасности
interface AboutPageClientProps {
  data: any
  locale: string
}

export default function AboutPageClient({ data, locale }: AboutPageClientProps) {
  // Хелпер для получения текста (используем данные из пропса data)
  const i18n = {
    title: data.title || (locale === 'en' ? 'ABOUT US' : 'ПРО НАС'),
    historyTitle:
      data.historyTitle || (locale === 'en' ? 'How it all started' : 'Як все починалося'),
    specsTitle:
      locale === 'en' ? 'Specifics of New Way Travel tours' : 'Специфіка турів New Way Travel',
  }

  // Получаем изображения из Payload (если они загружены в массив mainImages)
  const img1 = data.mainImages?.[0]?.image?.url || '/images/about-1.jpg'
  const img2 = data.mainImages?.[1]?.image?.url || '/images/about-2.jpg'

  return (
    <main className={styles.wrapper}>
      {/* 1. HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1>{i18n.title}</h1>
        </div>
      </section>

      <div className={styles.container}>
        {/* 2. HISTORY BLOCK */}
        <section className={styles.whiteCard}>
          <h2 className={styles.sectionTitle}>{i18n.historyTitle}</h2>
          <div className={styles.textContent}>
            {/* Если historyContent — это richText, для него нужен сериализатор. 
                 Для простоты выведем заглушку или описание, если оно есть */}
            {data.historyContent ? (
              <p>Данные из RichText (используйте RichText компонент Payload)</p>
            ) : (
              <p>{locale === 'en' ? 'Loading history...' : 'Завантаження історії...'}</p>
            )}
          </div>
        </section>

        {/* 3. SPECIFICS GRID */}
        <section className={styles.gridSection}>
          <div className={styles.imageColumn}>
            <img src={img1} alt="Team" className={styles.sideImage} />
            <img src={img2} alt="Vans" className={styles.sideImage} />
          </div>

          <div className={styles.detailsColumn}>
            <h2 className={styles.sectionTitle}>{i18n.specsTitle}</h2>
            <ul className={styles.specsList}>
              {/* Рендерим массив features из админки Payload */}
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
