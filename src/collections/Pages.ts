// src/collections/Pages.ts
import { ConsultationBlock } from '@/blocks/Consultation'
import { HeroSectionBlock } from '@/blocks/HeroSection'
import { SearchBarBlock } from '@/blocks/SearchBar'
import { TestimonialsBlock } from '@/blocks/Testimonials'
import { ToursBlock } from '@/blocks/Tours'
import { VideoBlock } from '@/blocks/Video'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'layout', // Сюда мы будем складывать блоки
      type: 'blocks',
      blocks: [
        // HeaderBlock,
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
