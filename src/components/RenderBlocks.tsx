// // src/components/RenderBlocks.tsx
// // import { Hero } from './blocks/Hero' // Путь к твоему Hero
// // import { Tours } from './blocks/Tours' // Путь к твоему Tours

// import { Header } from './blocks/Header/Header'
// import { Tours } from './blocks/FeatureTours/Tours'
// import { HeroSection } from './blocks/HeroSection/HeroSection'
// import { SearchBar } from './blocks/SearchBar/SearchBar'
// import { ConsultationSection } from './blocks/ConsultationSection/ConsultationSection'
// import { VideoSection } from './blocks/VideoSection/VideoSection'
// import { TestimonialsSection } from './blocks/TestimonialsSection/TestimonialsSection'

// const components = {
//   header: Header,
//   tours: Tours,
//   heroSection: HeroSection,
//   searchBar: SearchBar,
//   consultation: ConsultationSection,
//   videoSection: VideoSection,
//   testimonials: TestimonialsSection,
// }

// export const RenderBlocks = ({ blocks }: { blocks: any[] }) => {
//   if (!blocks) return null

//   // const page = result.docs[0];

//   console.log('--- DATA FROM DATABASE ---')
//   console.log(JSON.stringify(blocks)) // Посмотрим, что в массиве блоков

//   return (
//     <>
//       {blocks.map((block, index) => {
//         const BlockComponent = components[block.blockType as keyof typeof components]

//         if (BlockComponent) {
//           return <BlockComponent key={index} {...block} />
//         }

//         return (
//           <div key={index} className="p-4 bg-red-100 text-red-600">
//             Блок "{block.blockType}" еще не создан в коде.
//           </div>
//         )
//       })}
//     </>
//   )
// }
// src/components/RenderBlocks.tsx
import { Header } from './blocks/Header/Header'
import { FeaturedTours } from './blocks/FeatureTours/FeaturedTours'
import { HeroSection } from './blocks/HeroSection/HeroSection'
import { SearchBar } from './blocks/SearchBar/SearchBar'
import { ConsultationSection } from './blocks/ConsultationSection/ConsultationSection'
import { VideoSection } from './blocks/VideoSection/VideoSection'
import { TestimonialsSection } from './blocks/TestimonialsSection/TestimonialsSection'

const components = {
  header: Header,
  tours: FeaturedTours,
  heroSection: HeroSection,
  searchBar: SearchBar,
  consultation: ConsultationSection,
  videoSection: VideoSection,
  testimonials: TestimonialsSection,
}

// 1. Обновляем типы пропсов
interface RenderBlocksProps {
  blocks: any[]
  searchData?: {
    categories: any[]
    destinations: any[]
    months: any[]
  }
}

export const RenderBlocks = ({ blocks, searchData }: RenderBlocksProps) => {
  if (!blocks) return null

  return (
    <>
      {blocks.map((block, index) => {
        const BlockComponent = components[block.blockType as keyof typeof components]

        if (BlockComponent) {
          // 2. Если это блок поиска, передаем в него данные из глобала
          if (block.blockType === 'searchBar') {
            return (
              <BlockComponent
                key={index}
                {...block}
                categories={searchData?.categories}
                destinations={searchData?.destinations}
                months={searchData?.months}
              />
            )
          }

          return <BlockComponent key={index} {...block} />
        }

        return (
          <div key={index} className="p-4 bg-red-100 text-red-600">
            {/* Блок "{block.blockType}" ще не створений. */}
          </div>
        )
      })}
    </>
  )
}
