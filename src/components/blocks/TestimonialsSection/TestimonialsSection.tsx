'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import styles from './TestimonialsSection.module.scss'

interface TestimonialItem {
  id: string
  name: string
  avatar?: { url: string }
  rating: number
  date?: string
  text: string
}

export function TestimonialsSection({ title, items }: { title: string; items: TestimonialItem[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const totalItems = items?.length || 0

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalItems)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)

  React.useEffect(() => {
    if (totalItems <= 1) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [totalItems])

  if (!items || items.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.titleUnderline} />
          </div>
        </motion.div>

        <div className={styles.sliderWrapper}>
          <div
            className={styles.sliderTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((testimonial) => (
              <div key={testimonial.id} className={styles.slide}>
                <div className={styles.card}>
                  <div className={styles.userInfo}>
                    {testimonial.avatar?.url ? (
                      <img src={testimonial.avatar.url} alt={testimonial.name} />
                    ) : (
                      <div className={styles.placeholderAvatar}>{testimonial.name[0]}</div>
                    )}
                    <div>
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.date}</p>
                    </div>
                  </div>
                  <div className={styles.rating}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className={styles.star} fill="currentColor" />
                    ))}
                  </div>
                  <p className={styles.text}>{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>

          {totalItems > 1 && (
            <>
              <button className={`${styles.navButton} ${styles.prev}`} onClick={prevSlide}>
                <span>&lt;</span>
              </button>
              <button className={`${styles.navButton} ${styles.next}`} onClick={nextSlide}>
                <span>&gt;</span>
              </button>

              <div className={styles.dots}>
                {items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
