// 'use client'

// import { useState } from 'react'
// import { RichText } from '@/components/blocks/ui/RichText'
// import TripItinerary from '@/components/blocks/ui/TripItinerary/TripItinerary'
// import { BookingModal } from '@/components/blocks/modal/BookingModal/BookingModal'
// import { ConsultationModal } from '@/components/blocks/modal/ConsultationModal/ConsultationModal'
// import styles from './TourDetailPage.module.scss'
// import { HeroSection } from '@/components/blocks/HeroSection/HeroSection'
// import TripAdditionalInfo from '@/components/blocks/ui/TripAdditionalInfo/TripAdditionalInfo'
// import AdditionalInfo from '@/components/blocks/ui/AdditionalInfo/AdditionalInfo'
// import TripDetails from '@/components/blocks/ui/TripDetails/TripDetails'

// export default function TourDetailClient({ tour, locale }: { tour: any; locale: 'uk' | 'en' }) {
//   const [bookingOpen, setBookingOpen] = useState(false)
//   const [consultationOpen, setConsultationOpen] = useState(false)

//   const t = (field: any) => {
//     if (!field) return ''
//     if (typeof field === 'object' && !field.root) return field[locale] || field.uk || field.en || ''
//     return field
//   }

//   const labels = {
//     bookBtn: t(tour.uiTexts?.bookBtn) || (locale === 'en' ? 'Book now' : 'Забронювати'),
//     consultBtn: t(tour.uiTexts?.consultBtn) || (locale === 'en' ? 'Consultation' : 'Консультація'),
//     itineraryTitle:
//       t(tour.uiLabels?.itineraryTitle) || (locale === 'en' ? 'Tour program' : 'Програма туру'),
//     leaderTitle: t(tour.uiLabels?.leaderTitle) || (locale === 'en' ? 'Tour leader' : 'Турлідер'),
//     consultCardTitle: t(tour.uiLabels?.consultCardTitle),
//     consultCardText: t(tour.uiLabels?.consultCardText),
//     descriptionTitle:
//       t(tour.descriptionTitle) || (locale === 'en' ? 'Tour information' : 'Інформація про тур'),
//   }

//   return (
//     <main className={styles.wrapper}>
//       <section className={styles.hero}>
//         <HeroSection
//           title={t(tour.name)}
//           subtitle={t(tour.location)}
//           description={`${t(tour.duration)}${tour.groupSize ? ` • ${t(tour.groupSize)}` : ''}`}
//         />
//         <div className={styles.heroActions}>
//           <button className={styles.primaryBtn} onClick={() => setBookingOpen(true)}>
//             {labels.bookBtn}
//           </button>
//           <button className={styles.secondaryBtn} onClick={() => setConsultationOpen(true)}>
//             {labels.consultBtn}
//           </button>
//         </div>
//       </section>

//       <section className={styles.section}>
//         <div className={styles.cardWrapper}>
//           {/* ВІДНОВЛЕНО: */}
//           {tour.tripDetailsCard && <TripDetails tour={tour} locale={locale} />}
//           {tour.tripAdditionalInfoCard && <TripAdditionalInfo tour={tour} locale={locale} />}
//           {tour.additionalInfoCard && <AdditionalInfo tour={tour} locale={locale} />}
//         </div>
//       </section>

//       <section className={styles.section}>
//         <div className={styles.infoGrid}>
//           <div className={styles.infoCard}>
//             <h3>{labels.descriptionTitle}</h3>
//             {tour.description && <RichText content={t(tour.description)} />}
//             <button
//               className={styles.primaryBtn}
//               style={{ marginTop: '20px' }}
//               onClick={() => setBookingOpen(true)}
//             >
//               {labels.bookBtn}
//             </button>
//           </div>
//           {tour.gallery && (
//             <div className={styles.galleryWrapper}>
//               {tour.gallery.slice(0, 3).map((item: any) => (
//                 <div key={item.id} className={styles.galleryCard}>
//                   {item.image?.url && <img src={item.image.url} alt="" />}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       <section className={styles.section}>
//         <h2 className={styles.sectionTitle}>{labels.itineraryTitle}</h2>
//         <div className={styles.programLayout}>
//           <div className={styles.consultCard}>
//             <h3>{labels.consultCardTitle}</h3>
//             <p>{labels.consultCardText}</p>
//             <button className={styles.orangeBtn} onClick={() => setConsultationOpen(true)}>
//               {labels.consultBtn}
//             </button>
//           </div>
//           <TripItinerary tour={tour} locale={locale} />
//         </div>
//       </section>

//       {tour.leader && (
//         <section className={styles.sectionLeader}>
//           <h2 className={styles.sectionTitle}>{labels.leaderTitle}</h2>
//           <div className={styles.leaderCardWrapper}>
//             {tour.leader.photo?.url && (
//               <img src={tour.leader.photo.url} alt="" className={styles.leaderImage} />
//             )}
//             <div className={styles.leaderText}>
//               <h3 className={styles.leaderName}>{t(tour.leader.name)}</h3>
//               <p className={styles.leaderRole}>{t(tour.leader.role)}</p>
//               {tour.leader.bio && <div className={styles.leaderBio}>{t(tour.leader.bio)}</div>}
//             </div>
//           </div>
//         </section>
//       )}

//       {bookingOpen && (
//         <BookingModal tourName={t(tour.name)} onClose={() => setBookingOpen(false)} />
//       )}
//       {consultationOpen && (
//         <ConsultationModal locale={locale} onClose={() => setConsultationOpen(false)} />
//       )}
//     </main>
//   )
// }

'use client'

import { useState } from 'react'
import { RichText } from '@/components/blocks/ui/RichText'
import TripItinerary from '@/components/blocks/ui/TripItinerary/TripItinerary'
import { BookingModal } from '@/components/blocks/modal/BookingModal/BookingModal'
import { ConsultationModal } from '@/components/blocks/modal/ConsultationModal/ConsultationModal'
import styles from './TourDetailPage.module.scss'
import { HeroSection } from '@/components/blocks/HeroSection/HeroSection'
import TripAdditionalInfo from '@/components/blocks/ui/TripAdditionalInfo/TripAdditionalInfo'
import AdditionalInfo from '@/components/blocks/ui/AdditionalInfo/AdditionalInfo'
import TripDetails from '@/components/blocks/ui/TripDetails/TripDetails'

export default function TourDetailClient({ tour, locale }: { tour: any; locale: 'uk' | 'en' }) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [consultationOpen, setConsultationOpen] = useState(false)

  const t = (field: any) => {
    if (!field) return ''
    if (typeof field === 'object' && !field.root) return field[locale] || field.uk || field.en || ''
    return field
  }

  const labels = {
    bookBtn: t(tour.uiTexts?.bookBtn) || (locale === 'en' ? 'Book now' : 'Забронювати'),
    consultBtn: t(tour.uiTexts?.consultBtn) || (locale === 'en' ? 'Consultation' : 'Консультація'),
    itineraryTitle:
      t(tour.uiLabels?.itineraryTitle) || (locale === 'en' ? 'Tour program' : 'Програма туру'),
    leaderTitle: t(tour.uiLabels?.leaderTitle) || (locale === 'en' ? 'Tour leader' : 'Турлідер'),
    // Данные из отдельной группы "consultationCard"
    consultCardTitle: t(tour.consultationCard?.title),
    consultCardText: t(tour.consultationCard?.text),
    // Заголовок из группы "descriptionCard"
    descriptionTitle:
      t(tour.descriptionCard?.title) ||
      (locale === 'en' ? 'Tour information' : 'Інформація про тур'),
  }

  return (
    <main className={styles.wrapper}>
      <section className={styles.hero}>
        <HeroSection
          title={t(tour.name)}
          subtitle={t(tour.location)}
          description={`${t(tour.duration)}${tour.groupSize ? ` • ${t(tour.groupSize)}` : ''}`}
        />
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn} onClick={() => setBookingOpen(true)}>
            {labels.bookBtn}
          </button>
          <button className={styles.secondaryBtn} onClick={() => setConsultationOpen(true)}>
            {labels.consultBtn}
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.cardWrapper}>
          {tour.tripDetailsCard && <TripDetails tour={tour} locale={locale} />}
          {tour.tripAdditionalInfoCard && <TripAdditionalInfo tour={tour} locale={locale} />}
          {tour.additionalInfoCard && <AdditionalInfo tour={tour} locale={locale} />}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>{labels.descriptionTitle}</h3>
            {tour.descriptionCard?.content && (
              <RichText content={t(tour.descriptionCard.content)} />
            )}
            <button
              className={styles.primaryBtn}
              style={{ marginTop: '20px' }}
              onClick={() => setBookingOpen(true)}
            >
              {labels.bookBtn}
            </button>
          </div>
          {tour.gallery && (
            <div className={styles.galleryWrapper}>
              {tour.gallery.slice(0, 3).map((item: any) => (
                <div key={item.id} className={styles.galleryCard}>
                  {item.image?.url && <img src={item.image.url} alt="" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{labels.itineraryTitle}</h2>
        <div className={styles.programLayout}>
          <div className={styles.consultCard}>
            <h3>{labels.consultCardTitle}</h3>
            <p>{labels.consultCardText}</p>
            <button className={styles.orangeBtn} onClick={() => setConsultationOpen(true)}>
              {labels.consultBtn}
            </button>
          </div>
          <TripItinerary tour={tour} locale={locale} />
        </div>
      </section>

      {tour.leader && (
        <section className={styles.sectionLeader}>
          <h2 className={styles.sectionTitle}>{labels.leaderTitle}</h2>
          <div className={styles.leaderCardWrapper}>
            {tour.leader.photo?.url && (
              <img src={tour.leader.photo.url} alt="" className={styles.leaderImage} />
            )}
            <div className={styles.leaderText}>
              <h3 className={styles.leaderName}>{t(tour.leader.name)}</h3>
              <p className={styles.leaderRole}>{t(tour.leader.role)}</p>
              {tour.leader.bio && <div className={styles.leaderBio}>{t(tour.leader.bio)}</div>}
            </div>
          </div>
        </section>
      )}

      {bookingOpen && (
        <BookingModal tourName={t(tour.name)} onClose={() => setBookingOpen(false)} />
      )}
      {consultationOpen && (
        <ConsultationModal locale={locale} onClose={() => setConsultationOpen(false)} />
      )}
    </main>
  )
}
