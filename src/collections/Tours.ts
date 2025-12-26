// import { autoTranslate } from '../hooks/autoTranslate'
// import { CollectionConfig } from 'payload'

// export const Tours: CollectionConfig = {
//   slug: 'tours',
//   admin: {
//     useAsTitle: 'name',
//     defaultColumns: ['name', 'category', 'location', 'price'],
//     livePreview: {
//       url: ({ data, locale }) => {
//         const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
//         return `${baseUrl}/${locale.code}/tours/${data?.slug || ''}`
//       },
//     },
//   },
//   access: { read: () => true },
//   hooks: {
//     beforeValidate: [
//       ({ data }) => {
//         if (data?.name && !data?.slug) {
//           return {
//             ...data,
//             slug: data.name
//               .toLowerCase()
//               .trim()
//               .replace(/[^\w\s-]/g, '')
//               .replace(/[\s_-]+/g, '-'),
//           }
//         }
//         return data
//       },
//     ],
//     afterChange: [
//       autoTranslate([
//         'name',
//         'description',
//         'location',
//         'duration',
//         'groupSize',
//         'category',
//         'itinerary',
//         'tripDetails',
//         'leaders',
//         'uiTexts',
//         'tripDetailsCard',
//         'tripAdditionalInfoCard',
//         'additionalInfoCard',
//       ]),
//     ],
//   },
//   fields: [
//     { name: 'name', type: 'text', required: true, localized: true },
//     {
//       name: 'slug',
//       type: 'text',
//       required: true,
//       unique: true,
//       admin: { position: 'sidebar' },
//       label: 'URL Slug',
//     },
//     { name: 'price', type: 'number', required: true, label: 'Ціна (€)' },
//     {
//       type: 'tabs',
//       tabs: [
//         {
//           label: 'Контент туру',
//           fields: [
//             {
//               name: 'uiTexts',
//               type: 'group',
//               label: 'Тексти кнопок та заголовків',
//               fields: [
//                 {
//                   name: 'Кнопка забронювати',
//                   type: 'text',
//                   localized: true,
//                   defaultValue: 'Забронювати',
//                 },
//                 {
//                   name: 'Кнопка консультація',
//                   type: 'text',
//                   localized: true,
//                   defaultValue: 'Консультація',
//                 },
//                 {
//                   name: 'Програма туру',
//                   type: 'text',
//                   localized: true,
//                   defaultValue: 'Програма туру',
//                 },
//                 { name: 'leaderTitle', type: 'text', localized: true, defaultValue: 'Турлідер' },
//                 {
//                   name: 'consultCardTitle',
//                   type: 'text',
//                   localized: true,
//                   defaultValue: 'Тільки найяскравіші враження!',
//                 },
//                 {
//                   name: 'consultCardText',
//                   type: 'text',
//                   localized: true,
//                   defaultValue: 'Ми відкриті до пропозицій.',
//                 },
//               ],
//             },
//             { name: 'location', type: 'text', localized: true },
//             { name: 'duration', type: 'text', localized: true },
//             { name: 'category', type: 'text', localized: true },
//             { name: 'description', type: 'richText', localized: true },
//             { name: 'mainImage', type: 'upload', relationTo: 'media' },
//             {
//               name: 'gallery',
//               type: 'array',
//               fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
//             },
//           ],
//         },
//         {
//           label: 'Карточки туру', // Новая вкладка для трёх карточек
//           fields: [
//             {
//               name: 'tripDetailsCard',
//               type: 'group',
//               label: 'Trip Details',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//             {
//               name: 'tripAdditionalInfoCard',
//               type: 'group',
//               label: 'Trip Additional Info',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//             {
//               name: 'additionalInfoCard',
//               type: 'group',
//               // label: 'Additional Info',
//               label: 'Додаткова інформація',

//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Програма',
//           fields: [
//             {
//               name: 'itinerary',
//               type: 'array',
//               fields: [
//                 { name: 'dayTitle', type: 'text', localized: true },
//                 { name: 'content', type: 'richText', localized: true },
//                 {
//                   name: 'images',
//                   type: 'array',
//                   fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Турлідер',
//           fields: [
//             {
//               name: 'leader',
//               type: 'group',
//               fields: [
//                 { name: 'name', type: 'text', localized: true },
//                 { name: 'role', type: 'text', localized: true },
//                 { name: 'photo', type: 'upload', relationTo: 'media' },
//                 { name: 'bio', type: 'textarea', localized: true },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }
import { autoTranslate } from '../hooks/autoTranslate'
import { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'location', 'price'],
    livePreview: {
      url: ({ data, locale }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/${locale.code}/tours/${data?.slug || ''}`
      },
    },
  },
  access: { read: () => true },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.name && !data?.slug) {
          return {
            ...data,
            slug: data.name
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, '')
              .replace(/[\s_-]+/g, '-'),
          }
        }
        return data
      },
    ],
    afterChange: [
      autoTranslate([
        'name',
        'description',
        'location',
        'duration',
        'groupSize',
        'category',
        'itinerary',
        'tripDetails',
        'leaders',
        'uiTexts',
        'tripDetailsCard',
        'tripAdditionalInfoCard',
        'additionalInfoCard',
      ]),
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true, label: 'Назва' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      label: 'URL Slug',
    },
    { name: 'price', type: 'number', required: true, label: 'Ціна (€)' },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Контент туру',
          fields: [
            {
              name: 'uiTexts',
              type: 'group',
              label: 'Тексти кнопок та заголовків',
              fields: [
                {
                  name: 'Кнопка забронювати',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Забронювати',
                  label: 'Кнопка забронювати',
                },
                {
                  name: 'Кнопка консультація',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Консультація',
                  label: 'Кнопка консультація',
                },
                {
                  name: 'Програма туру',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Програма туру',
                  label: 'Програма туру',
                },
                {
                  name: 'leaderTitle',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Турлідер',
                  label: 'Заголовок турлідера',
                },
                {
                  name: 'consultCardTitle',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Тільки найяскравіші враження!',
                  label: 'Заголовок консультативної картки',
                },
                {
                  name: 'consultCardText',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Ми відкриті до пропозицій.',
                  label: 'Текст консультативної картки',
                },
              ],
            },
            { name: 'location', type: 'text', localized: true, label: 'Місце проведення' },
            { name: 'duration', type: 'text', localized: true, label: 'Тривалість' },
            { name: 'category', type: 'text', localized: true, label: 'Категорія' },
            { name: 'description', type: 'richText', localized: true, label: 'Опис' },
            { name: 'mainImage', type: 'upload', relationTo: 'media', label: 'Головне зображення' },
            {
              name: 'gallery',
              type: 'array',
              fields: [{ name: 'image', type: 'upload', relationTo: 'media', label: 'Зображення' }],
              label: 'Галерея',
            },
          ],
        },
        {
          label: 'Карточки туру',
          fields: [
            {
              name: 'tripDetailsCard',
              type: 'group',
              label: 'Деталі туру',
              fields: [
                { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
                { name: 'content', type: 'richText', localized: true, label: 'Контент' },
              ],
            },
            {
              name: 'tripAdditionalInfoCard',
              type: 'group',
              label: 'Додаткова інформація туру',
              fields: [
                { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
                { name: 'content', type: 'richText', localized: true, label: 'Контент' },
              ],
            },
            {
              name: 'additionalInfoCard',
              type: 'group',
              label: 'Додаткова інформація',
              fields: [
                { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
                { name: 'content', type: 'richText', localized: true, label: 'Контент' },
              ],
            },
          ],
        },
        {
          label: 'Програма',
          fields: [
            {
              name: 'itinerary',
              type: 'array',
              label: 'Програма по днях',
              fields: [
                { name: 'dayTitle', type: 'text', localized: true, label: 'Назва дня' },
                { name: 'content', type: 'richText', localized: true, label: 'Контент' },
                {
                  name: 'images',
                  type: 'array',
                  fields: [
                    { name: 'image', type: 'upload', relationTo: 'media', label: 'Зображення' },
                  ],
                  label: 'Зображення дня',
                },
              ],
            },
          ],
        },
        {
          label: 'Турлідер',
          fields: [
            {
              name: 'leader',
              type: 'group',
              label: 'Інформація про турлідера',
              fields: [
                { name: 'name', type: 'text', localized: true, label: 'Ім’я' },
                { name: 'role', type: 'text', localized: true, label: 'Роль' },
                { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
                { name: 'bio', type: 'textarea', localized: true, label: 'Біографія' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
