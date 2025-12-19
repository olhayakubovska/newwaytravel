// import { Block } from 'payload'

// export const SearchBarBlock: Block = {
//   slug: 'searchBar',
//   fields: [
//     {
//       name: 'placeholderText',
//       type: 'text',
//     },
//     {
//       name: 'categories',
//       label: 'Категории',
//       type: 'array',
//       fields: [
//         { name: 'label', type: 'text', required: true },
//         { name: 'value', type: 'text', required: true },
//       ],
//     },
//     {
//       name: 'destinations',
//       label: 'Направления',
//       type: 'array',
//       fields: [
//         { name: 'label', type: 'text', required: true },
//         { name: 'value', type: 'text', required: true },
//       ],
//     },
//     {
//       name: 'months',
//       label: 'Месяцы',
//       type: 'array',
//       fields: [
//         { name: 'label', type: 'text', required: true },
//         { name: 'value', type: 'text', required: true },
//       ],
//     },
//   ],
// }
import { Block } from 'payload'

export const SearchBarBlock: Block = {
  slug: 'searchBar',
  labels: {
    singular: 'Пошуковий рядок',
    plural: 'Пошукові рядки',
  },
  fields: [
    {
      name: 'placeholderText',
      type: 'text',
      label: 'Текст підказки (Placeholder)',
    },
    // Все массивы (categories, destinations, months) отсюда УДАЛЯЕМ.
    // Они будут подтягиваться из Глобала автоматически через RenderBlocks.
  ],
}
