// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import AllToursClient from './AllToursClient'
// import { HeroSection } from '@/components/blocks/HeroSection/HeroSection'

// export default async function AllToursPage() {
//   const payload = await getPayload({ config: configPromise })

//   const toursData = await payload.find({
//     collection: 'tours',
//     limit: 100,
//   })

//   // Приводим данные к формату, который ожидает AllToursClient
//   const tours = toursData.docs.map((doc: any) => ({
//     id: doc.id,
//     name: doc.name, // оставляем name
//     location: doc.location, // оставляем location
//     month: doc.month,
//     category: doc.category,
//     duration: doc.duration,
//     groupSize: doc.groupSize,
//     price: doc.price || '',
//     description: doc.description || '',
//     mainImage: doc.mainImage || null,
//   }))

//   return (
//     <>
//       <HeroSection title="ALL TOURS" subtitle="Our journeys" />
//       <AllToursClient initialTours={tours} />
//     </>
//   )
// }
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HeroSection } from '@/components/blocks/HeroSection/HeroSection'
import { SearchBar } from '@/components/blocks/SearchBar/SearchBar'
import AllToursClient from './AllToursClient'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const toursData = await payload.find({
    collection: 'tours',
    limit: 100,
  })

  // 1. Преобразуем данные из базы в чистый массив объектов (сериализация)
  // Это гарантирует, что TypeScript не будет ругаться на сложные объекты Payload
  const tours = toursData.docs.map((doc: any) => ({
    id: doc.id,
    name: doc.name || '',
    location: doc.location || '',
    month: doc.month || '', // Обеспечиваем пустую строку вместо undefined
    category: doc.category || '',
    duration: doc.duration || '',
    groupSize: doc.groupSize || '',
    price: doc.price || '',
    description: doc.description || '',
    mainImage: doc.mainImage || null,
  }))

  //   const categories = Array.from(new Set(tours.map((t) => t.category)))
  //     .filter(Boolean)
  //     .map((c) => ({ label: c, value: c }))

  //   const destinations = Array.from(new Set(tours.map((t) => t.location)))
  //     .filter(Boolean)
  //     .map((d) => ({ label: d, value: d }))

  //   const months = Array.from(new Set(tours.map((t) => t.month)))
  //     .filter(Boolean)
  //     .map((m) => ({ label: m, value: m }))

  return (
    <>
      <HeroSection title="АВТОРСЬКІ ТУРИ" subtitle="Твій найкращий помічник у пошуках вражень!" />

      {/* <SearchBar categories={categories} destinations={destinations} months={months} /> */}

      {/* Теперь ошибки не будет, так как типы совпадают */}
      <AllToursClient initialTours={tours} />
    </>
  )
}
