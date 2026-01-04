'use client'

import React from 'react'
import styles from './About.module.scss'
import { RichText } from '../ui/RichText'
import { motion } from 'framer-motion'

export default function AboutPageClient({
  heroImage, // Новое поле из админки
  heroTitle, // Новое поле из админки
  historyTitle,
  historyContent,
  specsTitle,
  teamTitle,
  features,
  mainImages,
  team,
  locale = 'uk',
}: any) {
  const t = (field: any, fallback: string = '') => {
    if (!field) return fallback
    if (typeof field === 'object') return field[locale] || field.uk || field.en || fallback
    return String(field)
  }

  const heroUrl = heroImage?.url || ''
  const img1 = mainImages?.[0]?.image?.url || '/images/about-1.jpg'
  const img2 = mainImages?.[1]?.image?.url || '/images/about-2.jpg'

  return (
    <main className={styles.wrapper}>
      {/* Локальный Hero, управляемый из админки этой страницы */}
      <section className={styles.localHero}>
        <div className={styles.heroBg}>
          {heroUrl && <img src={heroUrl} alt="Hero" />}
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.mainTitle}
          >
            {t(heroTitle)}
          </motion.h1>
        </div>
      </section>

      <div className={styles.container}>
        <section className={styles.whiteCard}>
          <h2 className={styles.sectionTitle}>{t(historyTitle)}</h2>
          <div className={styles.textContent}>
            {historyContent ? <RichText content={historyContent} /> : <p>Завантаження...</p>}
          </div>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <img src={img1} alt="About 1" className={styles.sideImage} />
            </div>
            <div className={styles.imageWrapper}>
              <img src={img2} alt="About 2" className={styles.sideImage} />
            </div>
          </div>

          <div className={styles.detailsColumn}>
            <h2 className={styles.sectionTitle}>{t(specsTitle)}</h2>
            <ul className={styles.specsList}>
              {features?.map((item: any, idx: number) => (
                <li key={idx} className={styles.specItem}>
                  <strong className={styles.specLabel}>{t(item.label)}</strong>
                  <p className={styles.specValue}>{t(item.value)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {team && team.length > 0 && (
          <section className={styles.teamSection}>
            <h2 className={styles.sectionTitleCenter}>{t(teamTitle)}</h2>
            <div className={styles.teamGrid}>
              {team.map((member: any, idx: number) => (
                <div key={idx} className={styles.teamCard}>
                  <div className={styles.teamImageWrapper}>
                    <img
                      src={member.photo?.url || '/images/avatar-placeholder.jpg'}
                      alt={t(member.name)}
                    />
                  </div>
                  <h3 className={styles.memberName}>{t(member.name)}</h3>
                  {member.role && <span className={styles.teamRole}>{t(member.role)}</span>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <a
        href="https://t.me/yourname"
        className={styles.floatingTg}
        target="_blank"
        rel="noreferrer"
      />
    </main>
  )
}
