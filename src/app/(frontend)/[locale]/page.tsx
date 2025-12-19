// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import { RenderBlocks } from '@/components/RenderBlocks'

// export default async function HomePage() {
//   const payload = await getPayload({ config: configPromise })

//   // Указываем язык, который хотим отобразить (например, 'uk')
//   // В будущем сюда можно передавать переменную из параметров URL
//   const currentLocale = 'uk'

//   // 1. Получаем структуру страницы + добавляем параметр locale
//   const result = await payload.find({
//     collection: 'pages',
//     where: { slug: { equals: 'home' } },
//     depth: 1,
//     locale: currentLocale, // <--- МАГИЯ ТУТ
//   })

//   // 2. Получаем все туры + добавляем параметр locale
//   const toursData = await payload.find({
//     collection: 'tours',
//     limit: 100,
//     locale: currentLocale, // <--- И ТУТ
//   })

//   const page = result.docs[0]
//   if (!page) return <div>Сторінку не знайдено</div>

//   const tours = toursData.docs

//   // Теперь t.category, t.location и t.month будут СТРОКАМИ, а не объектами
//   const categories = Array.from(new Set(tours.map((t: any) => t.category)))
//     .filter(Boolean)
//     .map((c) => ({ label: String(c), value: String(c) }))

//   const destinations = Array.from(new Set(tours.map((t: any) => t.location)))
//     .filter(Boolean)
//     .map((d) => ({ label: String(d), value: String(d) }))

//   const months = Array.from(new Set(tours.map((t: any) => t.month)))
//     .filter(Boolean)
//     .map((m) => ({ label: String(m), value: String(m) }))

//   const searchData = {
//     categories,
//     destinations,
//     months,
//   }

//   return (
//     <main>
//       <RenderBlocks blocks={page.layout ?? []} searchData={searchData} />
//     </main>
//   )
// }
// app/(frontend)/[locale]/page.tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { notFound } from 'next/navigation'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params // Ожидаем промис
  const payload = await getPayload({ config: configPromise })

  // 1. Получаем структуру страницы для конкретного языка
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    locale: locale as any, // Используем локаль из URL
  })

  const page = result.docs[0]
  if (!page) return notFound()

  // 2. Получаем туры для этого же языка
  const toursData = await payload.find({
    collection: 'tours',
    limit: 100,
    locale: locale as any,
  })

  const tours = toursData.docs

  // Формируем данные для поиска (они теперь автоматически будут на нужном языке)
  const searchData = {
    categories: Array.from(new Set(tours.map((t: any) => t.category)))
      .filter(Boolean)
      .map((c) => ({ label: String(c), value: String(c) })),
    destinations: Array.from(new Set(tours.map((t: any) => t.location)))
      .filter(Boolean)
      .map((d) => ({ label: String(d), value: String(d) })),
    months: Array.from(new Set(tours.map((t: any) => t.month)))
      .filter(Boolean)
      .map((m) => ({ label: String(m), value: String(m) })),
  }

  return (
    <main>
      <RenderBlocks blocks={page.layout ?? []} searchData={searchData} />
    </main>
  )
}
