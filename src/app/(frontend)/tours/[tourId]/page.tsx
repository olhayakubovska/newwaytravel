import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import TourDetailClient from './TourDetailClient'

// Добавляем Promise в определение типов для params
export default async function TourPage({ params }: { params: Promise<{ tourId: string }> }) {
  // 1. Ожидаем params перед использованием
  const resolvedParams = await params
  const tourId = resolvedParams.tourId

  const payload = await getPayload({ config: configPromise })

  // 2. Получаем данные тура из Payload
  const tour = await payload
    .findByID({
      collection: 'tours',
      id: tourId,
    })
    .catch(() => null)

  if (!tour) {
    return notFound()
  }
  console.log(tour, 'tourtourtourtour')

  // Превращаем объект из базы в чистый JSON для клиентского компонента
  const serializedTour = JSON.parse(JSON.stringify(tour))

  return <TourDetailClient tour={serializedTour} />
}
