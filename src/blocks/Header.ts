import { GlobalConfig } from 'payload'

export const HeaderConfig: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      label: 'Текст логотипу',
      localized: true,
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
          localized: true,
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
