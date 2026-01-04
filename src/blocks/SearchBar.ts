import { Block } from 'payload'

export const SearchBarBlock: Block = {
  slug: 'searchBar',
  labels: {
    singular: 'SearchBar',
    plural: 'Пошукові рядки',
  },
  fields: [
    // --- Поля для локализации интерфейса (внутри блока) ---
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
    // --- Списки выбора (теперь они настраиваются в каждом блоке) ---
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
