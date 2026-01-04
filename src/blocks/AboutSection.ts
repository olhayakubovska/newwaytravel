// import { Block } from 'payload'

// export const AboutSectionBlock: Block = {
//   slug: 'aboutSection',
//   labels: {
//     singular: 'Секція Про нас',
//     plural: 'Секції Про нас',
//   },
//   fields: [
//     // { name: 'title', type: 'text', localized: true },
//     // { name: 'subtitle', type: 'text', localized: true }, // Добавлено для Hero
//     // { name: 'description', type: 'textarea', localized: true }, // Добавлено для Hero

//     { name: 'historyTitle', type: 'text', localized: true },
//     { name: 'historyContent', type: 'richText', localized: true },

//     {
//       name: 'mainImages', // Поле для двух больших фото слева
//       type: 'array',
//       fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
//     },

//     { name: 'specsTitle', type: 'text', localized: true }, // Заголовок для "Чому подорожують з нами"
//     {
//       name: 'features',
//       type: 'array',
//       fields: [
//         { name: 'label', type: 'text', localized: true },
//         { name: 'value', type: 'textarea', localized: true },
//       ],
//     },

//     { name: 'teamTitle', type: 'text', localized: true }, // Заголовок "Наша команда"
//     {
//       name: 'team',
//       type: 'array',
//       fields: [
//         { name: 'photo', type: 'upload', relationTo: 'media', required: true },
//         { name: 'name', type: 'text', required: true },
//         { name: 'role', type: 'text', localized: true },
//         { name: 'bio', type: 'textarea', localized: true }, // Добавлено описание участника
//       ],
//     },
//   ],
// }

import { Block } from 'payload'

export const AboutSectionBlock: Block = {
  slug: 'aboutSection',
  labels: {
    singular: 'Секція Про нас',
    plural: 'Секції Про нас',
  },
  fields: [
    // Поля для локального Hero, специфичного для этой страницы
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Фонове зображення (Hero)',
    },
    {
      name: 'heroTitle',
      type: 'text',
      localized: true,
      label: 'Головний заголовок на фото',
    },
    // Остальные поля
    { name: 'historyTitle', type: 'text', localized: true },
    { name: 'historyContent', type: 'richText', localized: true },
    {
      name: 'mainImages',
      type: 'array',
      minRows: 2,
      maxRows: 2,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    { name: 'specsTitle', type: 'text', localized: true },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'value', type: 'textarea', localized: true },
      ],
    },
    { name: 'teamTitle', type: 'text', localized: true },
    {
      name: 'team',
      type: 'array',
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', localized: true },
        { name: 'bio', type: 'textarea', localized: true },
      ],
    },
  ],
}
