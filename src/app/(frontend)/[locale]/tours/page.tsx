// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import { notFound } from 'next/navigation'
// import { RenderBlocks } from '@/components/RenderBlocks'
// import AllToursClient from './AllToursClient'

// interface Props {
//   params: Promise<{ locale: string }>
// }

// export default async function ToursPage({ params }: Props) {
//   const { locale } = await params
//   const payload = await getPayload({ config: configPromise })

//   // 1. Получаем настройки страницы "tours" из Payload
//   const pageResult = await payload.find({
//     collection: 'pages',
//     where: { slug: { equals: 'tours' } },
//     limit: 1,
//     depth: 2,
//     locale: locale as any,
//   })

//   const page = pageResult.docs[0]
//   if (!page) return notFound()

//   // 2. Получаем все туры для передачи в клиентский компонент
//   const toursData = await payload.find({
//     collection: 'tours',
//     limit: 100,
//     locale: locale as any,
//   })

//   // Исправленный маппинг: явно перечисляем поля
//   const tours = toursData.docs.map((doc: any) => ({
//     id: doc.id,
//     name: doc.name || '',
//     location: doc.location || '',
//     month: doc.month || '',
//     category: doc.category || '',
//     duration: doc.duration || '',
//     groupSize: doc.groupSize || '',
//     price: doc.price || 0,
//     description: doc.description || '',
//     mainImage: doc.mainImage || null,
//   }))

//   return (
//     <>
//       {/* Рендерим блоки из админки (например, HeroSection) */}
//       <RenderBlocks blocks={page.layout || []} />

//       {/* Рендерим сетку туров с фильтрами */}
//       <AllToursClient initialTours={tours} />
//     </>
//   )
// }

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks'
import AllToursClient from './AllToursClient'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function ToursPage({ params }: Props) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  // 1. Получаем настройки страницы "tours"
  const pageResult = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'tours' } },
    limit: 1,
    depth: 2,
    locale: locale as any,
  })

  const page = pageResult.docs[0]
  if (!page) return notFound()

  // 2. Ищем данные блока SearchBar в лейауте страницы, чтобы передать их фильтрам
  const searchBarBlockData = page.layout?.find((block: any) => block.blockType === 'searchBar')

  // 3. Фильтруем блоки, чтобы RenderBlocks не рисовал SearchBar дважды
  // (один раз через RenderBlocks, второй раз внутри AllToursClient)
  const otherBlocks = page.layout?.filter((block: any) => block.blockType !== 'searchBar')

  // 4. Получаем все туры
  const toursData = await payload.find({
    collection: 'tours',
    limit: 100,
    locale: locale as any,
  })

  const tours = toursData.docs.map((doc: any) => ({
    id: doc.id,
    name: doc.name || '',
    location: doc.location || '',
    month: doc.month || '',
    category: doc.category || '',
    duration: doc.duration || '',
    groupSize: doc.groupSize || '',
    price: doc.price || 0,
    description: doc.description || '',
    mainImage: doc.mainImage || null,
  }))

  return (
    <>
      <RenderBlocks blocks={otherBlocks || []} />

      <AllToursClient initialTours={tours} searchBarData={searchBarBlockData} />
    </>
  )
}
