import { GlobalConfig } from 'payload'

export const SearchBarConfig: GlobalConfig = {
  slug: 'searchBar', // Тот самый слаг
  label: 'Налаштування пошуку',
  fields: [
    {
      name: 'categories',
      label: 'Категорії',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'destinations',
      label: 'Напрямки',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'months',
      label: 'Місяці',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}
