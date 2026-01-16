import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, User, Award } from 'lucide-react'
import { RichText } from '@/components/blocks/ui/RichText'
import styles from './MapAndLeaderSection.module.css'

export default function MapAndLeaderSection({ tour, locale }: { tour: any; locale: string }) {
  // Функція локалізації
  const t = (field: any): any => {
    if (!field) return ''
    if (typeof field === 'object' && 'root' in field) return field
    if (typeof field === 'object') {
      return field[locale] || field.en || Object.values(field)[0]
    }
    return String(field)
  }

  const leader = tour?.leader

  // Динамічні заголовки
  const labels = {
    mapTitle:
      t(tour.uiLabels?.mapSectionTitle) || (locale === 'en' ? 'Travel Route' : 'Маршрут подорожі'),
    leaderTitle: t(tour.uiLabels?.leaderTitle) || (locale === 'en' ? 'Your Guide' : 'Ваш гід'),
  }

  const getMapSrc = (input: string) => {
    if (!input) return ''
    if (input.includes('<iframe')) {
      const match = input.match(/src="([^"]+)"/)
      return match ? match[1] : ''
    }
    return input
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* MAP SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.headerGroup}>
              <MapPin className={styles.icon} />
              <h2 className={styles.title}>{labels.mapTitle}</h2>
            </div>
            <div className={styles.mapWrapper}>
              <iframe
                src={getMapSrc(tour.mapIframe)}
                width="100%"
                height="400"
                className={styles.iframe}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* LEADER SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.headerGroup}>
              <User className={styles.icon} />
              <h2 className={styles.title}>{labels.leaderTitle}</h2>
            </div>

            <div className={styles.leaderCard}>
              <div className={styles.leaderContent}>
                {leader?.photo && (
                  <div className={styles.photoWrapper}>
                    <img
                      src={typeof leader.photo === 'object' ? leader.photo.url : leader.photo}
                      alt={t(leader.name)}
                      className={styles.photo}
                    />
                  </div>
                )}

                <h3 className={styles.leaderName}>{t(leader?.name)}</h3>

                <div className={styles.badge}>
                  {/* <Award className={styles.icon} style={{ width: '1rem', height: '1rem' }} /> */}
                  <p className={styles.roleText}>{t(leader?.role)}</p>
                </div>

                <div className={styles.bio}>
                  {/* Використання RichText для біографії з адмінки */}
                  <RichText content={t(leader?.bio)} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
