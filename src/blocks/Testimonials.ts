import { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Testimonials',
      defaultValue: 'Відгуки наших туристів',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Підзаголовок',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Відгуки',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', label: 'Ім’я клієнта', required: true },
        { name: 'avatar', type: 'upload', relationTo: 'media', label: 'Аватар' },
        { name: 'date', type: 'text', label: 'Дата (напр. 2 роки тому)' },
        { name: 'rating', type: 'number', label: 'Рейтинг (1-5)', defaultValue: 5 },
        { name: 'text', type: 'textarea', label: 'Текст відгуку', required: true },
      ],
    },
  ],
}
