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

  if (!tour || tourId === 'undefined') {
    return notFound()
  }

  const serializedTour = JSON.parse(JSON.stringify(tour))

  return <TourDetailClient tour={serializedTour} locale={locale} />
}
