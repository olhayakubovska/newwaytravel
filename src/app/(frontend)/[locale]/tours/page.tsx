import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HeroSection } from '@/components/blocks/HeroSection/HeroSection'
import AllToursClient from './AllToursClient'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const toursData = await payload.find({
    collection: 'tours',
    limit: 100,
  })

  const tours = toursData.docs.map((doc: any) => ({
    id: doc.id,
    name: doc.name || '',
    location: doc.location || '',
    month: doc.month || '', // Обеспечиваем пустую строку вместо undefined
    category: doc.category || '',
    duration: doc.duration || '',
    groupSize: doc.groupSize || '',
    price: doc.price || '',
    description: doc.description || '',
    mainImage: doc.mainImage || null,
  }))

  return (
    <>
      <HeroSection title="АВТОРСЬКІ ТУРИ" subtitle="Твій найкращий помічник у пошуках вражень!" />

      <AllToursClient initialTours={tours} />
    </>
  )
}
