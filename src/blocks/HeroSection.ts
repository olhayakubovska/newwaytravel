import { Block } from 'payload'

export const HeroSectionBlock: Block = {
  slug: 'heroSection',
  labels: {
    singular: 'Hero Секция',
    plural: 'Hero Секции',
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Подзаголовок',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Главный заголовок',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Изображение',
      required: true,
    },
  ],
}
