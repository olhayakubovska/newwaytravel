'use client'

import React from 'react'
import { Send } from 'lucide-react'
import styles from './About.module.scss'
import { RichText } from '../ui/RichText'
import { HeroSection } from '../HeroSection/HeroSection'

interface AboutData {
  title?: any
  subtitle?: any
  description?: any
  historyTitle?: any
  historyContent?: any
  specsTitle?: any // Добавьте это поле в Payload
  teamTitle?: any // Добавьте это поле в Payload
  features?: { label: any; value: any }[]
  mainImages?: { image?: { url?: string } }[]
  team?: { name: any; role?: any; bio?: any; photo?: { url?: string } }[]
}

export default function AboutPageClient({ data, locale }: { data: AboutData; locale: string }) {
  // Универсальная функция перевода внутри компонента
  const t = (field: any, fallback: string = '') => {
    if (!field) return fallback
    if (typeof field === 'object') {
      return field[locale] || field.uk || field.en || Object.values(field)[0] || fallback
    }
    return String(field)
  }

  const i18n = {
    historyTitle: t(
      data.historyTitle,
      locale === 'en' ? 'How it all started' : 'Як все починалося',
    ),
    specsTitle: t(
      data.specsTitle,
      locale === 'en' ? 'Why travel with us' : 'Чому подорожують з нами',
    ),
    teamTitle: t(data.teamTitle, locale === 'en' ? 'Our Team' : 'Наша команда'),
    loading: locale === 'en' ? 'Loading...' : 'Завантаження...',
  }

  const img1 = data.mainImages?.[0]?.image?.url || '/images/about-1.jpg'
  const img2 = data.mainImages?.[1]?.image?.url || '/images/about-2.jpg'

  return (
    <main className={styles.wrapper}>
      <section className={styles.hero}>
        {/* Теперь Hero получает реальные данные из админки About */}
        <HeroSection
          title={t(data.title)}
          subtitle={t(data.subtitle)}
          description={t(data.description)}
        />
      </section>

      <div className={styles.container}>
        <section className={styles.whiteCard}>
          <h2 className={styles.sectionTitle}>{i18n.historyTitle}</h2>
          <div className={styles.textContent}>
            {data.historyContent ? (
              <RichText content={data.historyContent} />
            ) : (
              <p>{i18n.loading}</p>
            )}
          </div>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.imageColumn}>
            <img src={img1} alt="Travel" className={styles.sideImage} />
            <img src={img2} alt="Vans" className={styles.sideImage} />
          </div>

          <div className={styles.detailsColumn}>
            <h2 className={styles.sectionTitle}>{i18n.specsTitle}</h2>
            <ul className={styles.specsList}>
              {data.features?.map((item, idx) => (
                <li key={idx}>
                  <strong>{t(item.label)}</strong>
                  <p>{t(item.value)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {data.team && data.team.length > 0 && (
          <section className={styles.teamSection}>
            <h2 className={styles.sectionTitle}>{i18n.teamTitle}</h2>
            <div className={styles.teamGrid}>
              {data.team.map((member, idx) => (
                <div key={idx} className={styles.teamCard}>
                  <div className={styles.teamImageWrapper}>
                    <img
                      src={member.photo?.url || '/images/avatar-placeholder.jpg'}
                      alt={t(member.name)}
                    />
                  </div>
                  <h3>{t(member.name)}</h3>
                  {member.role && <span className={styles.teamRole}>{t(member.role)}</span>}
                  {member.bio && <p className={styles.teamBio}>{t(member.bio)}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
