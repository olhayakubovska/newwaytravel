'use client'

import React from 'react'
import styles from './About.module.scss'
import { RichText } from '../ui/RichText'
import { motion } from 'framer-motion'
import { Page, Config, Media } from '@/payload-types'
import { Send } from 'lucide-react'
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
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.944 0C5.346 0 0 5.348 0 11.944C0 18.54 5.348 23.888 11.944 23.888C18.54 23.888 23.888 18.54 23.888 11.944C23.888 5.348 18.54 0 11.944 0ZM17.91 8.358L15.936 17.674C15.786 18.334 15.394 18.498 14.842 18.188L11.832 15.97L10.38 17.368C10.22 17.528 10.086 17.662 9.778 17.662L9.994 14.614L15.544 9.602C15.786 9.386 15.49 9.266 15.168 9.48L8.308 13.798L5.352 12.874C4.71 12.672 4.698 12.232 5.486 11.924L17.022 7.476C17.556 7.28 18.024 7.6 17.91 8.358Z" />
        </svg>{' '}
      </a>
      {/* 

        <motion.a
        href="https://t.me/yourname"
        className={styles.floatingTg}
        target="_blank"
        rel="noreferrer"
        aria-label="Telegram"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.944 0C5.346 0 0 5.348 0 11.944C0 18.54 5.348 23.888 11.944 23.888C18.54 23.888 23.888 18.54 23.888 11.944C23.888 5.348 18.54 0 11.944 0ZM17.91 8.358L15.936 17.674C15.786 18.334 15.394 18.498 14.842 18.188L11.832 15.97L10.38 17.368C10.22 17.528 10.086 17.662 9.778 17.662L9.994 14.614L15.544 9.602C15.786 9.386 15.49 9.266 15.168 9.48L8.308 13.798L5.352 12.874C4.71 12.672 4.698 12.232 5.486 11.924L17.022 7.476C17.556 7.28 18.024 7.6 17.91 8.358Z" />
        </svg>

        <motion.div
          className={styles.pulse}
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.a> */}
    </main>
  )
}
