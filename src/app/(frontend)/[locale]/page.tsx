import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { notFound } from 'next/navigation'

const MONTH_LABELS: Record<string, { uk: string; en: string }> = {
  jan: { uk: 'Січень', en: 'January' },
  feb: { uk: 'Лютий', en: 'February' },
  mar: { uk: 'Березень', en: 'March' },
  apr: { uk: 'Квітень', en: 'April' },
  may: { uk: 'Травень', en: 'May' },
  jun: { uk: 'Червень', en: 'June' },
  jul: { uk: 'Липень', en: 'July' },
  aug: { uk: 'Серпень', en: 'August' },
  sep: { uk: 'Вересень', en: 'September' },
  oct: { uk: 'Жовтень', en: 'October' },
  nov: { uk: 'Листопад', en: 'November' },
  dec: { uk: 'Грудень', en: 'December' },
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: 'uk' | 'en' }
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    locale: locale,
  })

  const page = result.docs[0]
  if (!page) return notFound()

  const toursData = await payload.find({
    collection: 'tours',
    limit: 100,
    locale: locale,
  })
  const tours = toursData.docs

  const searchData = {
    categories: Array.from(new Set(tours.map((t: any) => t.category)))
      .filter(Boolean)
      .map((cat) => ({
        label: String(cat),
        value: String(cat),
      })),

    destinations: Array.from(new Set(tours.map((t: any) => t.location)))
      .filter(Boolean)
      .map((loc) => ({
        label: String(loc),
        value: String(loc),
      })),

    months: Object.entries(MONTH_LABELS).map(([value, labels]) => ({
      label: labels[locale] || labels.uk,
      value: value,
    })),
  }

  return (
    <main>
      <RenderBlocks blocks={page.layout ?? []} searchData={searchData} />
    </main>
  )
}
