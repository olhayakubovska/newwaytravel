import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import TourDetailClient from './TourDetailClient'

export default async function TourPage({
  params,
}: {
  params: Promise<{ tourId: string; locale: 'uk' | 'en' }>
}) {
  const resolvedParams = await params
  const { tourId, locale } = resolvedParams

  const payload = await getPayload({ config: configPromise })

  const tour = await payload
    .findByID({
      collection: 'tours',
      id: tourId,
    })
    .catch(() => null)

  if (!tour) {
    return notFound()
  }

  const serializedTour = JSON.parse(JSON.stringify(tour))

  return <TourDetailClient tour={serializedTour} locale={locale} />
}
