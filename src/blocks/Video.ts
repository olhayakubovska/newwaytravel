import { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'videoSection',
  labels: {
    singular: 'Секция видео',
    plural: 'Секции видео',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true, // Это позволит передавать объект с переводами { uk: "...", en: "..." }
      label: 'Заголовок секции',
    },
    {
      name: 'videos',
      type: 'relationship',
      relationTo: 'videos',
      hasMany: true,
      required: true,
      label: 'Видео для слайдера',
    },
  ],
}
