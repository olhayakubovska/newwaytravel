// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import { RenderBlocks } from '@/components/RenderBlocks'

// export default async function HomePage() {
//   const payload = await getPayload({ config: configPromise })

//   // 1. Получаем страницу (для Layout)
//   const result = await payload.find({
//     collection: 'pages',
//     where: { slug: { equals: 'home' } },
//     depth: 2,
//   })

//   // 2. Получаем все туры (для автоматического извлечения категорий)
//   const toursData = await payload.find({
//     collection: 'tours',
//     limit: 100,
//   })

//   // 3. Получаем ручные настройки из Глобала
//   const searchSettings = await payload.findGlobal({
//     slug: 'searchBar' as any,
//     draft: true,
//   })
//   console.log(searchSettings, 'searchSettings')
//   const page = result.docs[0]
//   if (!page) return <div>Сторінку не знайдено</div>

//   // --- ЛОГИКА СБОРА ДАННЫХ ДЛЯ ПОИСКА ---

//   // А. Собираем значения из существующих туров (автоматика)
//   const tours = toursData.docs
//   const autoCategories = Array.from(new Set(tours.map((t: any) => t.category)))
//     .filter(Boolean)
//     .map((c) => ({ label: String(c), value: String(c) }))

//   const autoDestinations = Array.from(new Set(tours.map((t: any) => t.location)))
//     .filter(Boolean)
//     .map((d) => ({ label: String(d), value: String(d) }))

//   const autoMonths = Array.from(new Set(tours.map((t: any) => t.month)))
//     .filter(Boolean)
//     .map((m) => ({ label: String(m), value: String(m) }))

//   // Б. Объединяем данные из Глобала и Автоматические (убираем дубликаты по value)
//   const mergeOptions = (manual: any[], auto: any[]) => {
//     const combined = [...(manual || []), ...auto]
//     const uniqueValues = new Set()
//     return combined.filter((item) => {
//       if (!item.value || uniqueValues.has(item.value)) return false
//       uniqueValues.add(item.value)
//       return true
//     })
//   }

//   const searchData = {
//     categories: mergeOptions(searchSettings.categories, autoCategories),
//     destinations: mergeOptions(searchSettings.destinations, autoDestinations),
//     months: mergeOptions(searchSettings.months, autoMonths),
//   }

//   return (
//     <main>
//       {/* Теперь RenderBlocks получит "умные" данные: ручные + автоматические */}
//       <RenderBlocks blocks={page.layout ?? []} searchData={searchData} />
//     </main>
//   )
// }
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/RenderBlocks'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // 1. Получаем структуру страницы (layout)
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    depth: 1,
  })

  // 2. Получаем все туры для динамического формирования фильтров
  const toursData = await payload.find({
    collection: 'tours',
    limit: 100, // Берем достаточное количество для сбора категорий
  })

  const page = result.docs[0]
  if (!page) return <div>Сторінку не знайдено</div>

  // --- АВТОМАТИЧЕСКАЯ ЛОГИКА СБОРА ДАННЫХ ---
  const tours = toursData.docs

  // Извлекаем уникальные категории из существующих туров
  const categories = Array.from(new Set(tours.map((t: any) => t.category)))
    .filter(Boolean)
    .map((c) => ({ label: String(c), value: String(c) }))

  // Извлекаем уникальные направления
  const destinations = Array.from(new Set(tours.map((t: any) => t.location)))
    .filter(Boolean)
    .map((d) => ({ label: String(d), value: String(d) }))

  // Извлекаем уникальные месяцы
  const months = Array.from(new Set(tours.map((t: any) => t.month)))
    .filter(Boolean)
    .map((m) => ({ label: String(m), value: String(m) }))

  const searchData = {
    categories,
    destinations,
    months,
  }

  return (
    <main>
      {/* RenderBlocks теперь передаст эти динамические списки в SearchBar.
        Данные берутся напрямую из ваших туров в БД!
      */}
      <RenderBlocks blocks={page.layout ?? []} searchData={searchData} />
    </main>
  )
}
