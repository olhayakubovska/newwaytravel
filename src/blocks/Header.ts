import { GlobalConfig } from 'payload'

export const HeaderConfig: GlobalConfig = {
  slug: 'header',
  admin: {
    // group: 'Налаштування сайту',
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
      defaultValue: { uk: 'NEW WAY', en: 'NEW WAY' },
    },
    {
      name: 'chatText',
      type: 'text',
      localized: true,
      defaultValue: { uk: 'ОНЛАЙН ЧАТ', en: 'ONLINE CHAT' },
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
        { name: 'facebook', type: 'text', defaultValue: 'https://facebook.com/' },
        { name: 'youtube', type: 'text', defaultValue: 'https://youtube.com/' },
        { name: 'instagram', type: 'text', defaultValue: 'https://instagram.com/' },
        { name: 'telegram', type: 'text', defaultValue: 'https://t.me/' },
      ],
    },
  ],
}
