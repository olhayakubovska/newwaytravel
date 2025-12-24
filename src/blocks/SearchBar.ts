import { Block } from 'payload'

export const SearchBarBlock: Block = {
  slug: 'searchBar',
  labels: {
    singular: 'SearchBar',
    plural: 'Пошукові рядки',
  },
  fields: [
    {
      name: 'placeholderText',
      type: 'text',
      label: 'Текст підказки (Placeholder)',
    },
  ],
}
