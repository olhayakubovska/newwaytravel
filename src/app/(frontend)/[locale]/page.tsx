// // // app/(frontend)/[locale]/page.tsx
// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import { RenderBlocks } from '@/components/RenderBlocks'
// import { notFound } from 'next/navigation'

// // export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
// //   const { locale } = await params // Ожидаем промис
// //   const payload = await getPayload({ config: configPromise })

// //   // 1. Получаем структуру страницы для конкретного языка
// //   const result = await payload.find({
// //     collection: 'pages',
// //     where: { slug: { equals: 'home' } },
// //     locale: locale as any, // Используем локаль из URL
// //   })

// //   const page = result.docs[0]
// //   if (!page) return notFound()

// //   // 2. Получаем туры для этого же языка
// //   const toursData = await payload.find({
// //     collection: 'tours',
// //     limit: 100,
// //     locale: locale as any,
// //   })

// //   const tours = toursData.docs

// //   // Формируем данные для поиска (они теперь автоматически будут на нужном языке)
// //   const searchData = {
// //     categories: Array.from(new Set(tours.map((t: any) => t.category)))
// //       .filter(Boolean)
// //       .map((c) => ({ label: String(c), value: String(c) })),
// //     destinations: Array.from(new Set(tours.map((t: any) => t.location)))
// //       .filter(Boolean)
// //       .map((d) => ({ label: String(d), value: String(d) })),
// //     months: Array.from(new Set(tours.map((t: any) => t.month)))
// //       .filter(Boolean)
// //       .map((m) => ({ label: String(m), value: String(m) })),
// //   }
// //   console.log(searchData, 'searchData')

// //   return (
// //     <main>
// //       <RenderBlocks blocks={page.layout ?? []} searchData={searchData} />
// //     </main>
// //   )
// // }
// // app/(frontend)/[locale]/page.tsx

// // 1. Создаем словари для соответствия "значение -> украинская метка"
// const CATEGORY_LABELS: Record<string, string> = {
//   'cold-countries': 'Холодні країни',
//   islands: 'Острови',
//   'hot-countries': 'Спекотні країни',
//   extreme: 'Екстремальні тури',
//   neutral: 'Нейтральний клімат',
//   trailers: 'Трейлери',
//   wildlife: 'Дика природа',
//   cruise: 'Круїз',
// }

// const MONTH_LABELS: Record<string, string> = {
//   jan: 'Січень',
//   feb: 'Лютий',
//   mar: 'Березень',
//   apr: 'Квітень',
//   may: 'Травень',
//   jun: 'Червень',
//   jul: 'Липень',
//   aug: 'Серпень',
//   sep: 'Вересень',
//   oct: 'Жовтень',
//   nov: 'Листопад',
//   dec: 'Грудень',
// }

// export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
//   const { locale } = await params
//   const payload = await getPayload({ config: configPromise })

//   const result = await payload.find({
//     collection: 'pages',
//     where: { slug: { equals: 'home' } },
//     locale: locale as any,
//   })

//   const page = result.docs[0]
//   if (!page) return notFound()

//   const toursData = await payload.find({
//     collection: 'tours',
//     limit: 100,
//     locale: locale as any,
//   })

//   const tours = toursData.docs

//   // 2. Исправленное формирование searchData
//   const searchData = {
//     categories: Array.from(new Set(tours.map((t: any) => t.category)))
//       .filter(Boolean)
//       .map((c) => {
//         const val = typeof c === 'object' ? c.value || '' : String(c)
//         return {
//           label: CATEGORY_LABELS[val] || val, // Если есть в словаре - берем укр, если нет - само значение
//           value: val,
//         }
//       }),

//     destinations: Array.from(
//       new Set(
//         tours.map((t: any) => {
//           const loc = t.location
//           // Если локация пришла объектом { uk: '...', en: '...' }, берем текущую локаль
//           return typeof loc === 'object' ? loc[locale] || loc['uk'] : loc
//         }),
//       ),
//     )
//       .filter(Boolean)
//       .map((d) => ({ label: String(d), value: String(d) })),

//     months: Array.from(new Set(tours.map((t: any) => t.month)))
//       .filter(Boolean)
//       .map((m) => {
//         const val = typeof m === 'object' ? m.value || '' : String(m)
//         return {
//           label: MONTH_LABELS[val] || val,
//           value: val,
//         }
//       }),
//   }

//   console.log(searchData, 'searchData')

//   return (
//     <main>
//       <RenderBlocks blocks={page.layout ?? []} searchData={searchData} />
//     </main>
//   )
// }
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { notFound } from 'next/navigation'

// Словари с поддержкой двух языков
const CATEGORY_LABELS: Record<string, { uk: string; en: string }> = {
  coldСountries: { uk: 'Холодні країни', en: 'Cold countries' },
  islands: { uk: 'Острови', en: 'Islands' },
  hotСountries: { uk: 'Спекотні країни', en: 'Hot countries' },
  extreme: { uk: 'Екстремальні тури', en: 'Extreme tours' },
  neutral: { uk: 'Нейтральний клімат', en: 'Neutral climate' },
  trailers: { uk: 'Трейлери', en: 'Trailers' },
  wildlife: { uk: 'Дика природа', en: 'Wildlife' },
  cruise: { uk: 'Круїз', en: 'Cruise' },
}

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

  // Получаем туры только для формирования списка уникальных направлений
  const toursData = await payload.find({
    collection: 'tours',
    limit: 100,
    locale: locale,
  })
  const tours = toursData.docs

  const searchData = {
    // 1. Всегда возвращаем ВСЕ категории из словаря
    categories: Object.entries(CATEGORY_LABELS).map(([value, labels]) => ({
      label: labels[locale] || labels.uk,
      value: value,
    })),

    // 2. Направления берем динамически из существующих туров
    destinations: Array.from(
      new Set(
        tours.map((t: any) => {
          const loc = t.location
          return typeof loc === 'object' ? loc[locale] || loc['uk'] : loc
        }),
      ),
    )
      .filter(Boolean)
      .map((d) => ({ label: String(d), value: String(d) })),

    // 3. Всегда возвращаем ВСЕ 12 месяцев
    months: Object.entries(MONTH_LABELS).map(([value, labels]) => ({
      label: labels[locale] || labels.uk,
      value: value,
    })),
  }

  // console.log(toursData)

  return (
    <main>
      <RenderBlocks blocks={page.layout ?? []} searchData={searchData} />
    </main>
  )
}
