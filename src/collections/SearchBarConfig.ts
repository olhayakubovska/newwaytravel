// src/globals/SearchBarConfig.ts
import { autoTranslate } from '@/hooks/autoTranslate'
import { GlobalConfig } from 'payload'

export const SearchBarConfig: GlobalConfig = {
  slug: 'searchBar',
  label: 'Налаштування пошуку',
  hooks: {
    // Используем afterChange для надежности
    afterChange: [autoTranslate(['categories', 'destinations', 'months'])],
  },
  fields: [
    {
      name: 'categories',
      label: 'Категорії',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          // value НЕ локализуем
        },
      ],
    },
    {
      name: 'destinations',
      label: 'Напрямки',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'months',
      label: 'Місяці',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}
