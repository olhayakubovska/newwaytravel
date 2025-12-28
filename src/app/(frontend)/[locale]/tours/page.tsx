import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HeroSection } from '@/components/blocks/HeroSection/HeroSection'
import AllToursClient from './AllToursClient'

// 1. Добавляем Promise в типы пропсов
interface Props {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  // 2. Обязательно ожидаем params (даже если locale используется только внутри)
  const { locale } = await params 

  const payload = await getPayload({ config: configPromise })

  const toursData = await payload.find({
    collection: 'tours',
    limit: 100,
    // Рекомендую добавить locale в запрос, если у вас мультиязычность на уровне БД
    locale: locale as any 
  })

  const tours = toursData.docs.map((doc: any) => ({
    id: doc.id,
    name: doc.name || '',
    location: doc.location || '',
    month: doc.month || '',
    category: doc.category || '',
    duration: doc.duration || '',
    groupSize: doc.groupSize || '',
    price: doc.price || '',
    description: doc.description || '',
    mainImage: doc.mainImage || null,
  }))

  return (
    <>
      <HeroSection 
        title={locale === 'en' ? "AUTHOR TOURS" : "АВТОРСЬКІ ТУРИ"} 
        subtitle={locale === 'en' ? "Your best assistant!" : "Твій найкращий помічник!"} 
      />

      <AllToursClient initialTours={tours} />
    </>
  )
}