import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { notFound } from 'next/navigation'

export type Locale = 'uk' | 'en' | 'ru'

function getMonthLabel(monthIndex: number, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2025, monthIndex, 1))
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const localeTyped = locale as Locale

  const payload = await getPayload({ config: configPromise })

  // --- Получаем страницу ---
  const pageResult = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    locale: localeTyped,
    depth: 3,
  })

  const page = pageResult.docs[0]
  if (!page) return notFound()

  // --- Получаем туры ---
  const toursResult = await payload.find({
    collection: 'tours',
    limit: 100,
    locale: localeTyped,
  })

  const tours = toursResult.docs

  // --- Месяцы ТОЛЬКО из туров ---
  const monthIndexes = Array.from(
    new Set(
      tours
        .map((t: any) => {
          if (!t.startDate) return null
          return new Date(t.startDate).getMonth() // 0–11
        })
        .filter((m): m is number => m !== null),
    ),
  ).sort((a, b) => a - b)

  const searchData = {
    categories: Array.from(new Set(tours.map((t: any) => t.category)))
      .filter(Boolean)
      .map((cat) => ({ label: String(cat), value: String(cat) })),

    destinations: Array.from(new Set(tours.map((t: any) => t.location)))
      .filter(Boolean)
      .map((loc) => ({ label: String(loc), value: String(loc) })),

    months: monthIndexes.map((monthIndex) => ({
      value: String(monthIndex + 1), // 1–12
      label: getMonthLabel(monthIndex, localeTyped),
    })),
  }

  return (
    <main>
      <RenderBlocks blocks={page.layout ?? []} searchData={searchData} />
    </main>
  )
}
