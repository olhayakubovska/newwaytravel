'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react'
import styles from './FeaturedTours.module.scss'
import Link from 'next/link'
import { Button } from '@payloadcms/ui'

// Типизация для данных из Payload
interface TourData {
  id: string
  name: string
  subtitle?: string
  description?: string
  location: string
  month?: string
  groupSize?: string
  duration: string
  price: number
  image: {
    url: string
    alt?: string
  }
}

export function Tours({ title, selectedTours }: { title: string; selectedTours: TourData[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title || 'Найближчі тури'}</h2>

          <Link href="/tours">
            <Button className={styles.calendarBtn}>
              Календар турів <ArrowRight className={styles.icon} />
            </Button>
          </Link>
        </div>

        <div className={styles.grid}>
          {selectedTours?.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/tours/${tour.id}`}>
                <div className={styles.card}>
                  <div className={styles.imageWrapper}>
                    {tour.image?.url && (
                      <img src={tour.image.url} alt={tour.name} className={styles.image} />
                    )}
                  </div>

                  <div className={styles.content}>
                    <h3 className={styles.cardTitle}>{tour.name}</h3>
                    <p className={styles.subtitle}>{tour.subtitle}</p>
                    <p className={styles.description}>{tour.description}</p>

                    <div className={styles.info}>
                      <div className={styles.infoRow}>
                        <MapPin className={styles.infoIcon} />
                        <span>{tour.location}</span>
                      </div>

                      <div className={styles.infoRow}>
                        <Calendar className={styles.infoIcon} />
                        <span>{tour.month}</span>
                      </div>

                      <div className={styles.infoRow}>
                        <Users className={styles.infoIcon} />
                        <span>{tour.groupSize}</span>
                      </div>
                    </div>

                    <div className={styles.footer}>
                      <div>
                        <div className={styles.duration}>{tour.duration}</div>
                        <div className={styles.price}>{tour.price}€</div>
                      </div>

                      <Button className={styles.detailsBtn}>Деталі</Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
