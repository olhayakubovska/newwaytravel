// import { Block } from 'payload'

// export const HeroSectionBlock: Block = {
//   slug: 'heroSection',
//   fields: [
//     {
//       name: 'subtitle',
//       type: 'text',
//       label: 'Подзаголовок',
//     },
//     {
//       name: 'title',
//       type: 'text',
//       label: 'Главный заголовок',
//       required: true,
//     },
//     {
//       name: 'description',
//       type: 'text',
//       label: 'Описание',
//     },
//   ],
// }

import { Block } from 'payload'

export const HeroSectionBlock: Block = {
  slug: 'heroSection',
  labels: {
    singular: 'Hero Секция',
    plural: 'Hero Секции',
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Подзаголовок',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Главный заголовок',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea', // Используем textarea для длинного описания
      label: 'Описание',
    },
    {
      name: 'backgroundImage', // Название поля
      type: 'upload', // Тип поля для выбора файла
      relationTo: 'media', // Slug коллекции, где хранятся фото (обычно 'media')
      label: 'Изображение',
      required: true,
    },
  ],
}
