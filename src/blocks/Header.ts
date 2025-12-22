// import { GlobalConfig } from 'payload'

// export const HeaderConfig: GlobalConfig = {
//   slug: 'header',
//   label: 'Шапка сайту',
//   access: {
//     read: () => true,
//   },
//   fields: [
//     {
//       name: 'logoText',
//       type: 'text',
//       label: 'Текст логотипу',
//       defaultValue: 'NEW WAY TRAVEL',
//     },
//     {
//       name: 'navItems',
//       type: 'array',
//       label: 'Навігація',
//       minRows: 1,
//       fields: [
//         {
//           name: 'label',
//           type: 'text',
//           label: 'Назва посилання',
//           required: true,
//         },
//         {
//           name: 'link',
//           type: 'text',
//           label: 'URL (напр. /tours)',
//           required: true,
//         },
//       ],
//     },
//   ],
// }
import { GlobalConfig } from 'payload'
// import { AutoTranslateButton } from '@/admin/AutoTranslateButton'

export const HeaderConfig: GlobalConfig = {
  slug: 'header',
  label: 'Шапка сайту',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      label: 'Текст логотипу',
      localized: true, // делаем мультиязычным
      defaultValue: { uk: 'NEW WAY TRAVEL', en: '' },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Навігація',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Назва посилання',
          localized: true, // делаем мультиязычным
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'URL (напр. /tours)',
          required: true,
        },
      ],
    },
  ],
}
