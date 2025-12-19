'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Clock, Users as UsersIcon } from 'lucide-react'
import styles from './TourCard.module.scss'
import { Button } from '@payloadcms/ui'

interface TourCardProps {
  id: string
  image: string
  title: string
  destination: string
  duration: string
  groupSize: string
  price: string
  alt: string
}

export function TourCard({
  id,
  image,
  title,
  destination,
  duration,
  groupSize,
  price,
  alt,
}: TourCardProps) {
  return (
    <Link href={`/tours/${id}`} className={styles.cardLink}>
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className={styles.card}>
        {/* Изображение */}
        <div className={styles.imageWrapper}>
          <img
            src={image || '/placeholder-tour.jpg'}
            alt={alt || title}
            className={styles.image}
            loading="lazy"
          />
        </div>

        {/* Контентная часть */}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <MapPin className={styles.icon} />
              <span>{destination}</span>
            </div>

            <div className={styles.infoItem}>
              <Clock className={styles.icon} />
              <span>{duration}</span>
            </div>

            <div className={styles.infoItem}>
              <UsersIcon className={styles.icon} />
              <span>{groupSize}</span>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.priceContainer}>
              <span className={styles.priceLabel}>від</span>
              <span className={styles.priceValue}>{price}</span>
            </div>
            <Button className={styles.button}>Деталі</Button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
