import { Block } from 'payload'

export const ToursBlock: Block = {
  slug: 'tours',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок секции (например: Популярные направления)',
    },
    {
      name: 'selectedTours',
      type: 'relationship',
      relationTo: 'tours',
      hasMany: true,
      label: 'Выберите туры для показа',
    },
  ],
}
