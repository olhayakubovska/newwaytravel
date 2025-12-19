// src/blocks/Tours.ts
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
      name: 'selectedTours', // Список выбранных туров
      type: 'relationship',
      relationTo: 'tours', // Указываем на нашу новую коллекцию
      hasMany: true, // Позволяет выбрать несколько туров
      label: 'Выберите туры для показа',
    },
  ],
}
