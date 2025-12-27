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
  const { locale } = await params
  const localeTyped = locale as 'uk' | 'en'

  const payload = await getPayload({ config: configPromise })

  // --- Получаем страницу с layout, видео подтянутся через depth:2 ---
  const pageResult = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    locale: localeTyped,
    depth: 2, // подтягивает videos → videoFile, thumbnail, relatedVideos
  })

  const page = pageResult.docs[0]
  if (!page) return notFound()

  // --- Фильтры для поиска ---
  const toursResult = await payload.find({
    collection: 'tours',
    limit: 100,
    locale: localeTyped,
  })
  const tours = toursResult.docs

  const searchData = {
    categories: Array.from(new Set(tours.map((t: any) => t.category)))
      .filter(Boolean)
      .map((cat) => ({ label: String(cat), value: String(cat) })),
    destinations: Array.from(new Set(tours.map((t: any) => t.location)))
      .filter(Boolean)
      .map((loc) => ({ label: String(loc), value: String(loc) })),
    months: Object.entries(MONTH_LABELS).map(([value, labels]) => ({
      label: labels[localeTyped] || labels.uk,
      value,
    })),
  }

  return (
    <main>
      <RenderBlocks blocks={page.layout ?? []} searchData={searchData} />
    </main>
  )
}
