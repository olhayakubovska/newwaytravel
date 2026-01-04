import { GlobalConfig } from 'payload'

export const FooterConfig: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание компании',
      localized: true,
    },
    // --- НОВОЕ ПОЛЕ: Список меню ---
    {
      name: 'navItems',
      type: 'array',
      label: 'Пункты меню',
      labels: {
        singular: 'Пункт меню',
        plural: 'Пункты меню',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Название ссылки',
              localized: true,
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'link',
              type: 'text',
              label: 'URL (например: /tours)',
              required: true,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
    // --- Конец блока меню ---
    {
      type: 'row',
      fields: [
        {
          name: 'menuTitle',
          type: 'text',
          label: 'Заголовок колонки Меню',
          localized: true,
          admin: { placeholder: 'Меню' },
        },
        {
          name: 'contactTitle',
          type: 'text',
          label: 'Заголовок колонки Контакты',
          localized: true,
          admin: { placeholder: "Зворотній зв'язок" },
        },
        {
          name: 'socialTitle',
          type: 'text',
          label: 'Заголовок колонки Соцсети',
          localized: true,
          admin: { placeholder: 'Соціальні мережи' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', label: 'Телефон' },
        { name: 'email', type: 'text', label: 'Email' },
      ],
    },
    {
      name: 'address',
      type: 'text',
      label: 'Адрес',
      localized: true,
    },
    {
      name: 'hours',
      type: 'text',
      label: 'Часы работы',
      localized: true,
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Текст копирайта',
      localized: true,
      admin: { placeholder: 'Всі права захищені.' },
    },
    {
      name: 'socials',
      type: 'group',
      label: 'Социальные сети',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'youtube', type: 'text', label: 'YouTube URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'telegram', type: 'text', label: 'Telegram URL' },
      ],
    },
  ],
}
