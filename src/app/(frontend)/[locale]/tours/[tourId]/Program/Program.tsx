

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ZoomIn } from 'lucide-react'
import styles from './Program.module.css'
import { RichText } from '@/components/blocks/ui/RichText'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion/Accordion'
import { Dialog, DialogContent } from '@radix-ui/react-dialog'

export default function Program({ tour, locale }: { tour: any; locale: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const t = (field: any): any => {
    if (!field) return ''
    if (typeof field === 'object' && 'root' in field) return field
    if (typeof field === 'object') {
      return field[locale] || field.en || Object.values(field)[0]
    }
    return String(field)
  }

  const itinerary = tour?.itinerary || []

  return (
    <div className={styles.programLayoutInner}>
      {/* Ліва колонка (Sticky) */}
      <div className={styles.stickyWrapper}>
        <div className={styles.consultCard}>
          <div className={styles.consultHeader}>
            <h3>{locale === 'en' ? 'Booking Conditions' : 'Умови бронювання'}</h3>
          </div>
          <div className={styles.consultContent}>
            <RichText content={t(tour.tripDetailsCard?.bookingConditions)} />
          </div>
          <button
            className={styles.orangeBtn}
            onClick={() => window.dispatchEvent(new CustomEvent('openConsultation'))}
          >
            {locale === 'en' ? 'Get Consultation' : 'Отримати консультацію'}
          </button>
        </div>
      </div>

      {/* Права колонка (Акордеон) */}
      <div className={styles.itineraryColumn}>
        <Accordion type="single" collapsible className={styles.accordionContainer}>
          {itinerary.map((day: any, index: number) => (
            <AccordionItem key={index} value={`day-${index}`} className={styles.accordionItem}>
              <AccordionTrigger className={styles.accordionTrigger}>
                <div className={styles.dayHeader}>
                  <div className={styles.dayNumberCircle}>
                    <span className={styles.dayNumberText}>{index + 1}</span>
                  </div>
                  <div className={styles.dayTextContainer}>
                    <p className={styles.dayTitle}>{t(day.dayTitle)}</p>
                    <p className={styles.dayLocation}>
                      <MapPin className={styles.locationIcon} />
                      {t(day.location) || t(tour.location)}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className={styles.accordionContent}>
                <div className={styles.contentWrapper}>
                  <div className={styles.description}>
                    <RichText content={t(day.content)} />
                  </div>

                  {day.images && day.images.length > 0 && (
                    <div className={styles.dayImagesGrid}>
                      {day.images.map((imgItem: any, i: number) => (
                        <div
                          key={i}
                          className={styles.imageThumbWrapper}
                          onClick={() => setSelectedImage(imgItem.image?.url)}
                        >
                          <img
                            src={imgItem.image?.url}
                            className={styles.daySmallImage}
                            alt={`Day ${index + 1} photo ${i + 1}`}
                          />
                          <div className={styles.imageHover}>
                            <ZoomIn size={20} color="#fff" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Модалка для фото */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className={styles.imageModal}>
            <img src={selectedImage} alt="Preview" className={styles.fullImage} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
