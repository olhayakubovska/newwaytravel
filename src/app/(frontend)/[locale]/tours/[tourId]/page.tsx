import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import TourDetailClient from './TourDetailClient'
import { Locale } from '../../page'

export default async function TourPage({
  params,
}: {
  params: Promise<{ tourId: string; locale: Locale }>
}) {
  const { tourId, locale } = await params

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'tours',
    limit: 1,
    locale: locale as Locale,
    where: {
      or: [{ slug: { equals: tourId } }, { id: { equals: tourId } }],
    },
  })

  const tour = result.docs[0]

  if (!tour) {
    return notFound()
  }

  return <TourDetailClient tour={tour} locale={locale} />
}
