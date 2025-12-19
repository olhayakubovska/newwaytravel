import { GlobalConfig } from 'payload'

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
      defaultValue: 'NEW WAY TRAVEL',
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