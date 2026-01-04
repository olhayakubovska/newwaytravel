'use client'

import React from 'react'
import styles from './About.module.scss'
import { RichText } from '../ui/RichText'
import { motion } from 'framer-motion'
import { Page, Config, Media } from '@/payload-types'

type AboutSectionBlock = Extract<NonNullable<Page['layout']>[number], { blockType: 'aboutSection' }>

interface AboutPageClientProps extends AboutSectionBlock {
  locale?: Config['locale']
}

export default function AboutPageClient({
  heroImage,
  heroTitle,
  historyTitle,
  historyContent,
  specsTitle,
  teamTitle,
  features,
  mainImages,
  team,
  locale = 'uk',
}: AboutPageClientProps) {
  const t = (
    field: string | Record<string, string> | null | undefined,
    fallback: string = '',
  ): string => {
    if (!field) return fallback
    if (typeof field === 'object') {
      return field[locale] || field.uk || field.en || Object.values(field)[0] || fallback
    }
    return String(field)
  }

  // Безопасно извлекаем URL изображений с проверкой типа Media
  const heroUrl = (heroImage as Media)?.url || ''
  const img1 = (mainImages?.[0]?.image as Media)?.url || '/images/about-1.jpg'
  const img2 = (mainImages?.[1]?.image as Media)?.url || '/images/about-2.jpg'

  return (
    <main className={styles.wrapper}>
      <section className={styles.localHero}>
        <div className={styles.heroBg}>
          {heroUrl && <img src={heroUrl} alt={t(heroTitle)} />}
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
            {historyContent ? (
              <RichText content={historyContent} />
            ) : (
              <p>{locale === 'en' ? 'Loading...' : 'Завантаження...'}</p>
            )}
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
              {features?.map((item, idx) => (
                <li key={item.id || idx} className={styles.specItem}>
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
              {team.map((member, idx) => (
                <div key={member.id || idx} className={styles.teamCard}>
                  <div className={styles.teamImageWrapper}>
                    <img
                      src={(member.photo as Media)?.url || '/images/avatar-placeholder.jpg'}
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
        aria-label="Telegram"
      />
    </main>
  )
}
