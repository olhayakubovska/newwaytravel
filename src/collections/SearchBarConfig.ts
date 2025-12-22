import { autoTranslate } from '@/hooks/autoTranslate'
import { GlobalConfig } from 'payload'

export const SearchBarConfig: GlobalConfig = {
  slug: 'searchBar',
  label: 'Налаштування пошуку',
  hooks: {
    afterChange: [autoTranslate(['categories', 'destinations', 'months'])],
  },
  fields: [
    {
      name: 'categories',
      label: 'Категорії',
      type: 'array',
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
        },
      ],
    },
    {
      name: 'destinations',
      label: 'Напрямки',
      type: 'array',
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
