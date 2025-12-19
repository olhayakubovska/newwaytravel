'use client'

import { useState } from 'react'
import styles from './TourDetailPage.module.scss'
import { motion } from 'framer-motion'
import { Calendar, Clock, DollarSign, Users } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/blocks/ui/Tabs/Tabs'
import { Button } from '@payloadcms/ui'
import { BookingModal } from '@/components/blocks/BookingModal/BookingModal'
// Важно: используйте свою кнопку, не @payloadcms/ui

export default function TourDetailClient({ tour }: { tour: any }) {
  const [consultationOpen, setConsultationOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <img
          src={
            tour.mainImage?.url ||
            'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&h=1080&fit=crop'
          }
          alt={tour.title}
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.title}
          >
            {tour.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.subtitle}
          >
            {tour.destination}
          </motion.p>
          <div className={styles.buttons}>
            <Button onClick={() => setBookingOpen(true)}>Забронювати</Button>
            <Button onClick={() => setConsultationOpen(true)}>Консультація</Button>
          </div>
        </div>
      </div>

      {bookingOpen && <BookingModal tourName={tour.title} onClose={() => setBookingOpen(false)} />}

      <div className={styles.info}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.item}>
              <Clock className="h-8 w-8 text-primary" />
              <div className="text">
                <p>Тривалість</p>
                <p>{tour.duration}</p>
              </div>
            </div>
            <div className={styles.item}>
              <Users className="h-8 w-8 text-primary" />
              <div className="text">
                <p>Група</p>
                <p>{tour.groupSize}</p>
              </div>
            </div>
            <div className={styles.item}>
              <DollarSign className="h-8 w-8 text-primary" />
              <div className="text">
                <p>Ціна</p>
                <p>{tour.price}€</p>
              </div>
            </div>
            <div className={styles.item}>
              <Calendar className="h-8 w-8 text-primary" />
              <div className="text">
                <p>Найближча дата</p>
                <p>{tour.month}</p> {/* Или другое поле даты */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tabsWrapper}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Огляд</TabsTrigger>
            <TabsTrigger value="itinerary">Маршрут</TabsTrigger>
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className={styles.tabsContent}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div dangerouslySetInnerHTML={{ __html: tour.descriptionHtml || tour.description }} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
