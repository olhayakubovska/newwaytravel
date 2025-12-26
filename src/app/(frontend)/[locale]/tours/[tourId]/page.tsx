import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import TourDetailClient from './TourDetailClient'

export default async function TourPage({
  params,
}: {
  params: Promise<{ tourId: string; locale: 'uk' | 'en' }>
}) {
  const { tourId, locale } = await params
  const payload = await getPayload({ config: configPromise })

  // Ищем тур по SLUG, потому что tourId в строке адреса — это slug
  const result = await payload.find({
    collection: 'tours',
    limit: 1,
    locale: locale,
    where: {
      or: [
        {
          slug: {
            equals: tourId,
          },
        },
        {
          id: {
            equals: tourId,
          },
        },
      ],
    },
  })
  const tour = result.docs[0]

  // Если тур не найден или мы ввели /undefined в URL
  if (!tour || tourId === 'undefined') {
    return notFound()
  }

  // Превращаем в чистый объект для Client Component
  const serializedTour = JSON.parse(JSON.stringify(tour))

  return <TourDetailClient tour={serializedTour} locale={locale} />
}
