import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import styles from './GalleryAndProgram.module.css'
import { RichText } from '@/components/blocks/ui/RichText'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion/Accordion'
import { Dialog, DialogContent } from '@radix-ui/react-dialog'

export default function Program({ tour, locale }: { tour: any; locale: string }) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption?: string } | null>(null)

  // Функція для локалізації
  const t = (field: any): any => {
    if (!field) return ''
    if (typeof field === 'object' && 'root' in field) return field // для RichText
    if (typeof field === 'object') {
      return field[locale] || field.en || Object.values(field)[0]
    }
    return String(field)
  }

  // Отримуємо дані з об'єкта tour (Payload CMS)
  const itinerary = tour?.itinerary || []
  const gallery = tour?.gallery || []
  const itineraryTitle = t(tour?.uiLabels?.itineraryTitle) || 'Програма туру'

  return (
    <section>
      <div className={styles.container}>
        {/* Section Header */}

        <div className={styles.contentGrid}>
          {/* Program Accordion - Дані з поля itinerary (array) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className={styles.accordionContainer}>
              {itinerary.map((day: any, index: number) => (
                <AccordionItem key={index} value={`day-${index}`} className={styles.accordionItem}>
                  <AccordionTrigger className={styles.accordionTrigger}>
                    <div className={styles.dayHeader}>
                      <div className={styles.dayNumber}>
                        <span className={styles.dayNumberText}>{index + 1}</span>
                      </div>
                      <div className={styles.dayTextContainer}>
                        <p className={styles.dayTitle}>{t(day.dayTitle)}</p>
                        <p className={styles.dayLocation}>
                          <MapPin className={styles.locationIcon} />
                          {t(tour.location)}
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
                            <img
                              key={i}
                              src={imgItem.image?.url}
                              className={styles.daySmallImage}
                              alt="Day photo"
                              onClick={() => setSelectedImage({ url: imgItem.image?.url })}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className={styles.modal}>
          {selectedImage && (
            <div className={styles.modalContent}>
              <img src={selectedImage.url} alt="Full size view" className={styles.modalImage} />
              {selectedImage.caption && (
                <div className={styles.modalCaption}>
                  <p className={styles.modalCaptionText}>{selectedImage.caption}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
