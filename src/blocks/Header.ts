import { GlobalConfig } from 'payload'

export const HeaderConfig: GlobalConfig = {
  slug: 'header',
  admin: {
    livePreview: {
      url: ({ locale }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/${locale.code}`
      },
    },
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      localized: true,
      defaultValue: 'NEW WAY',
    },
    {
      name: 'navItems', // Новое поле для динамического меню
      type: 'array',
      label: 'Навигационное меню',
      labels: {
        singular: 'Пункт меню',
        plural: 'Пункты меню',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Название ссылки',
          localized: true, // Позволяет переводить название для каждого языка
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Путь (например: /tours или /about)',
          required: true,
        },
      ],
    },
    {
      name: 'chatText',
      type: 'text',
      localized: true,
      defaultValue: 'ОНЛАЙН ЧАТ',
    },
    {
      name: 'telegramChatLink',
      type: 'text',
      label: 'Посилання для кнопки Чат (Telegram)',
      defaultValue: 'https://t.me/your_account',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Соціальні мережі (іконки)',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'youtube', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'telegram', type: 'text' },
      ],
    },
  ],
}
