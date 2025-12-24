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
