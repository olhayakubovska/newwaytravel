import { ConsultationBlock } from '@/blocks/Consultation'
import { HeroSectionBlock } from '@/blocks/HeroSection'
import { SearchBarBlock } from '@/blocks/SearchBar'
import { TestimonialsBlock } from '@/blocks/Testimonials'
import { ToursBlock } from '@/blocks/Tours'
import { VideoBlock } from '@/blocks/Video'
import { CollectionConfig } from 'payload'
import { autoTranslate } from '../hooks/autoTranslate'

export const Pages: CollectionConfig = {
  slug: 'pages',

  admin: {
    useAsTitle: 'title',

    livePreview: {
      url: ({ data, locale }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

        const slug = data.slug === 'home' ? '' : data.slug

        return `${baseUrl}/${locale.code}/${slug}`
      },
    },
  },

  // versions: {
  //   drafts: true,
  // },

  hooks: {
    afterChange: [autoTranslate(['title', 'layout'])],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      // required: true,
      // unique: true,
      localized: true,
    },
    {
      name: 'layout',
      label: 'Конструктор сторінки',
      type: 'blocks',
      localized: true,
      blocks: [
        ToursBlock,
        HeroSectionBlock,
        SearchBarBlock,
        ConsultationBlock,
        VideoBlock,
        TestimonialsBlock,
      ],
    },
  ],
}
