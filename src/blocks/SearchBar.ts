import { Block } from 'payload'

export const SearchBarBlock: Block = {
  slug: 'searchBar',
  labels: {
    singular: 'SearchBar',
    plural: 'Пошукові рядки',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'categoryLabel',
          label: 'Плейсхолдер категорій',
          type: 'text',
          localized: true,
          admin: { width: '33%' },
        },
        {
          name: 'destinationLabel',
          label: 'Плейсхолдер напрямків',
          type: 'text',
          localized: true,
          admin: { width: '33%' },
        },
        {
          name: 'monthLabel',
          label: 'Плейсхолдер місяців',
          type: 'text',
          localized: true,
          admin: { width: '33%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'searchBtnLabel',
          label: 'Текст кнопки пошуку',
          type: 'text',
          localized: true,
          admin: { width: '50%' },
        },
        {
          name: 'resetBtnLabel',
          label: 'Текст кнопки скидання',
          type: 'text',
          localized: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'categories',
      label: 'Категорії',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'destinations',
      label: 'Напрямки',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'months',
      label: 'Місяці',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}
