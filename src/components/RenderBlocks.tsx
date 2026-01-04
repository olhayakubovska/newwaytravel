import { Header } from './blocks/Header/Header'
import { FeaturedTours } from './blocks/FeatureTours/FeaturedTours'
import { HeroSection } from './blocks/HeroSection/HeroSection'
import { SearchBar } from './blocks/SearchBar/SearchBar'
import { ConsultationSection } from './blocks/ConsultationSection/ConsultationSection'
import { VideoSection } from './blocks/VideoSection/VideoSection'
import { TestimonialsSection } from './blocks/TestimonialsSection/TestimonialsSection'
import AboutPageClient from './blocks/AboutPageClient/AboutPageClient'
import { Page } from '@/payload-types'

type Block = NonNullable<Page['layout']>[number]

const components: Record<string, React.ComponentType<any>> = {
  header: Header,
  tours: FeaturedTours,
  heroSection: HeroSection,
  searchBar: SearchBar,
  consultation: ConsultationSection,
  videoSection: VideoSection,
  testimonials: TestimonialsSection,
  aboutSection: AboutPageClient,
}

interface RenderBlocksProps {
  blocks: Block[]
  searchData?: {
    categories: { label: string; value: string }[]
    destinations: { label: string; value: string }[]
    months: { label: string; value: string }[]
  }
}

export const RenderBlocks = ({ blocks, searchData }: RenderBlocksProps) => {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const BlockComponent = components[block.blockType]

        if (!BlockComponent) {
          // Выводим только в режиме разработки
          if (process.env.NODE_ENV === 'development') {
            return (
              <div
                key={index}
                style={{ padding: '20px', backgroundColor: '#fee2e2', color: '#dc2626' }}
              >
                Block {block.blockType} is not implemented yet.
              </div>
            )
          }
          return null
        }

        if (block.blockType === 'searchBar') {
          return (
            <BlockComponent
              key={block.id || index}
              {...block}
              categories={searchData?.categories || block.categories}
              destinations={searchData?.destinations || block.destinations}
              months={searchData?.months || block.months}
            />
          )
        }

        return <BlockComponent key={block.id || index} {...block} />
      })}
    </>
  )
}
